import React from "react";
import { Accordion, AccordionItemData } from "@/components/ui/Accordion";
import { FAQItem } from "@/content/faqs";

interface FAQBlockProps {
  faqs: FAQItem[];
  className?: string;
}

export const FAQBlock: React.FC<FAQBlockProps> = ({ faqs, className = "" }) => {
  const items: AccordionItemData[] = faqs.map((faq, idx) => ({
    id: `faq-${idx}`,
    title: faq.question,
    content: <p>{faq.answer}</p>,
  }));

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
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
