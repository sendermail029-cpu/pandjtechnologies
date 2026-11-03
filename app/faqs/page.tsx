import type { Metadata } from "next";
import { FaqExplorer } from "@/components/FaqExplorer";
import { faqCategories } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQs",
  description:
    "Answers about P & J Technologies: exam testing, websites and apps, digital marketing, BPO, recruitment, pricing, support and data security.",
};

// FAQPage structured data so search engines can show answers directly in results
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqCategories.flatMap((c) =>
    c.items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  ),
};

export default function FaqsPage() {
  return (
    <>
      <FaqExplorer categories={faqCategories} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </>
  );
}
