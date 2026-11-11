#!/usr/bin/env node

/**
 * scripts/check-placeholders.mjs
 * Production guard script that validates rendered HTML files after `next build`.
 * Fails build if any rendered content matches:
 * /\[[A-Z ]{3,}.*\]|PHOTO:|Pending\]/
 */

import fs from "node:fs";
import path from "node:path";

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
];

const PLACEHOLDER_REGEX = /\[[A-Z ]{3,}.*?\]|PHOTO:|Pending\]/g;

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

  const matches = [...contentWithoutScripts.matchAll(PLACEHOLDER_REGEX)];

  if (matches.length > 0) {
    hasErrors = true;
    console.error(`\n❌ [PLACEHOLDER CHECK FAILED] Found forbidden placeholder strings in ${relPath}:`);
    for (const match of matches) {
      const index = match.index || 0;
      const snippet = contentWithoutScripts.substring(
        Math.max(0, index - 40),
        Math.min(contentWithoutScripts.length, index + match[0].length + 40)
      );
      console.error(`   - Match: "${match[0]}"`);
      console.error(`     Context: "...${snippet.trim()}..."\n`);
    }
  }
}

if (hasErrors) {
  console.error("Build failed: Rendered HTML contains placeholder brackets or unverified content.");
  process.exit(1);
} else {
  console.log(`✓ Placeholder check passed: ${checkedCount} rendered HTML files verified with zero placeholder leaks.`);
  process.exit(0);
}

