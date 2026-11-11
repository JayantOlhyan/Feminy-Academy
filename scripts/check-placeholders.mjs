#!/usr/bin/env node

/**
 * scripts/check-placeholders.mjs
 * Production guard script that validates rendered HTML files after `next build`.
 * Fails build if:
 * 1. Rendered content contains bracketed placeholder tokens: /\[[A-Z ]{3,}.*?\]|PHOTO:|Pending\]/
 * 2. Blocklisted claims appear in rendered text without explicit confirmation in content/confirmed.ts
 * 3. Any stat marked verified: false in content/site.ts appears in rendered plain text
 */

import fs from "node:fs";
import path from "node:path";
import { confirmedClaims } from "../content/confirmed.ts";
import { siteConfig } from "../content/site.ts";

const targetFiles = [
  ".next/server/app/index.html",
  ".next/server/app/offline-academy.html",
  ".next/server/app/courses/hydra-facial.html",
  ".next/server/app/courses/one-day.html",
  ".next/server/app/about.html",
  ".next/server/app/contact.html",
  ".next/server/app/pricing.html",
  ".next/server/app/privacy.html",
  ".next/server/app/refund-policy.html",
  ".next/server/app/terms.html",
  ".next/server/app/thank-you.html",
  ".next/server/app/_not-found.html",
];

// Keep existing token regex as instructed
const PLACEHOLDER_REGEX = /\[[A-Z ]{3,}.*?\]|PHOTO:|Pending\]/g;

const BLOCKLIST = [
  { key: "accessDuration", regex: /1\s*year/i, label: "1 year" },
  { key: "accessDuration", regex: /1\s*saal/i, label: "1 saal" },
  { key: "accessDuration", regex: /poora\s+access/i, label: "poora access" },
  { key: "accessDuration", regex: /lifetime/i, label: "lifetime" },
  { key: "gstIncluded", regex: /taxes\s+sammilit/i, label: "taxes sammilit" },
  { key: "verifiedCertificate", regex: /verified\s+certificate/i, label: "verified certificate" },
  { key: "softwareEngineer", regex: /software\s+engineer/i, label: "software engineer" },
  { key: "salonChalaRahi", regex: /salon\s+chala\s+rahi/i, label: "salon chala rahi" },
  { key: "lessonDurations", regex: /\b\d{1,2}:\d{2}\b/, label: "lesson duration (mm:ss)" },
  { key: "feminyAcademyDomain", regex: /feminyacademy\.com/i, label: "feminyacademy.com" },
];

function htmlToPlainText(html) {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
    .replace(/<svg\b[^<]*(?:(?!<\/svg>)<[^<]*)*<\/svg>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ");
}

let hasErrors = false;
let checkedCount = 0;

for (const relPath of targetFiles) {
  const fullPath = path.resolve(process.cwd(), relPath);
  if (!fs.existsSync(fullPath)) {
    console.warn(`[WARN] File not found to check: ${relPath}`);
    continue;
  }

  checkedCount++;
  const htmlContent = fs.readFileSync(fullPath, "utf-8");

  // Remove scripts and style tags to focus on user-facing DOM content
  const contentWithoutScripts = htmlContent
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "");

  const plainText = htmlToPlainText(htmlContent);

  // 1. Check for bracketed placeholder leaks
  const placeholderMatches = [...contentWithoutScripts.matchAll(PLACEHOLDER_REGEX)];
  if (placeholderMatches.length > 0) {
    hasErrors = true;
    console.error(`\n❌ [PLACEHOLDER LEAK] Found forbidden placeholder strings in ${relPath}:`);
    for (const match of placeholderMatches) {
      const index = match.index || 0;
      const snippet = contentWithoutScripts.substring(
        Math.max(0, index - 60),
        Math.min(contentWithoutScripts.length, index + match[0].length + 60)
      );
      console.error(`   - Match: "${match[0]}"`);
      console.error(`     Context: "...${snippet.trim()}..."\n`);
    }
  }

  // 2. Check BLOCKLIST phrases unless confirmed in content/confirmed.ts
  for (const item of BLOCKLIST) {
    if (confirmedClaims[item.key]) {
      continue; // Claim confirmed by Sunita
    }

    const matches = [...contentWithoutScripts.matchAll(new RegExp(item.regex, "gi"))];
    if (matches.length > 0) {
      hasErrors = true;
      console.error(
        `\n❌ [BLOCKLIST VIOLATION] Found unconfirmed claim "${item.label}" in ${relPath} (key "${item.key}" is false):`
      );
      for (const match of matches) {
        const index = match.index || 0;
        const snippet = contentWithoutScripts.substring(
          Math.max(0, index - 60),
          Math.min(contentWithoutScripts.length, index + match[0].length + 60)
        );
        console.error(`   - Match: "${match[0]}"`);
        console.error(`     Context: "...${snippet.trim()}..."\n`);
      }
    }
  }

  // 3. Check for unverified stats leaking into rendered text
  const unverifiedStats = siteConfig.stats.filter((s) => !s.verified);
  for (const stat of unverifiedStats) {
    const patterns = [stat.value];
    if (stat.value.includes("★")) {
      patterns.push(stat.value.replace("★", ""));
    }

    for (const pattern of patterns) {
      const escaped = pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const statRegex = new RegExp(`(^|\\s|["'>])${escaped}($|\\s|["'<])`, "g");
      const matches = [...plainText.matchAll(statRegex)];

      if (matches.length > 0) {
        hasErrors = true;
        console.error(`\n❌ [UNVERIFIED STAT LEAK] Found unverified stat "${pattern}" in ${relPath}:`);
        for (const match of matches) {
          const index = match.index || 0;
          const snippet = plainText.substring(
            Math.max(0, index - 60),
            Math.min(plainText.length, index + match[0].length + 60)
          );
          console.error(`   - Stat: "${pattern}" (verified: false)`);
          console.error(`     Context: "...${snippet.trim()}..."\n`);
        }
      }
    }
  }
}

if (hasErrors) {
  console.error("Build failed: Rendered HTML contains placeholder brackets, blocklisted claims, or unverified stats.");
  process.exit(1);
} else {
  console.log(`✓ Placeholder and claim integrity check passed: ${checkedCount} rendered HTML files verified.`);
  process.exit(0);
}
