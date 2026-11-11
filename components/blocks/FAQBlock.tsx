import React from "react";
import { Accordion, AccordionItemData } from "@/components/ui/Accordion";
import { FAQItem } from "@/content/faqs";
import { isPlaceholder, PlaceholderNotice } from "@/components/ui/PlaceholderNotice";

interface FAQBlockProps {
  faqs: FAQItem[];
  className?: string;
}

export const FAQBlock: React.FC<FAQBlockProps> = ({ faqs, className = "" }) => {
  const isDev = process.env.NODE_ENV !== "production";
  const visibleFaqs = faqs.filter((faq) => {
    if (isDev) return true;
    return !isPlaceholder(faq.answer) && !faq.answer.includes("[");
  });

  if (visibleFaqs.length === 0) {
    return null;
  }

  const items: AccordionItemData[] = visibleFaqs.map((faq, idx) => ({
    id: `faq-${idx}`,
    title: faq.question,
    content: (
      <p>
        {isPlaceholder(faq.answer) ? (
          <PlaceholderNotice label={faq.question} fallbackText={faq.answer} />
        ) : (
          faq.answer
        )}
      </p>
    ),
  }));

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: visibleFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <div className={`max-w-3xl mx-auto ${className}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Accordion items={items} />
    </div>
  );
};
