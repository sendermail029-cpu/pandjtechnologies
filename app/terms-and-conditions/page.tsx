import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { company } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms & conditions",
  description: "Terms for using the P & J Technologies website and engaging our services.",
};

const i = {
  doc: "M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9zM14 3v6h6M8 13h8M8 17h5",
  code: "M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16",
  scale: "M12 3v18M7 21h10M5 7h14M5 7l-3 6a3 3 0 0 0 6 0zM19 7l-3 6a3 3 0 0 0 6 0z",
  globe: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z",
  image: "M3 5h18v14H3zM3 16l5-5 4 4 3-3 6 6M15 9h.01",
  link: "M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 1 0-5.66-5.66l-1 1M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 1 0 5.66 5.66l1-1",
  shield: "M12 21s-7-4.4-7-10V5l7-3 7 3v6c0 5.6-7 10-7 10z",
  edit: "M4 20h4L18.5 9.5a2.8 2.8 0 0 0-4-4L4 16zM13.5 6.5l4 4",
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms &"
      accent="conditions."
      updated="24 October 2026"
      intro={`These terms govern your use of the ${company.name} website. By using the site, you agree to them. Work we do for you is also covered by the written proposal or agreement for your project.`}
      related={{ href: "/privacy-policy", label: "Privacy policy" }}
      highlights={[
        { t: "Your project agreement comes first", d: "Scope, price and ownership are set in your written proposal.", icon: i.doc },
        { t: "Fair use of this website", d: "Use it lawfully, and please don't copy our content commercially.", icon: i.globe },
        { t: "Governed by Indian law", d: "Disputes fall under the courts of Vijayawada, Andhra Pradesh.", icon: i.scale },
      ]}
      sections={[
        {
          title: "Use of this website",
          icon: i.globe,
          body: (
            <p>
              You may browse and use this website for lawful purposes. Please do not attempt to disrupt the site, gain unauthorised access to
              it or use it to send spam or harmful content.
            </p>
          ),
        },
        {
          title: "Website content",
          icon: i.image,
          body: (
            <p>
              The text, design, logos and graphics on this site belong to {company.name} unless stated otherwise. You may not copy or reuse
              them for commercial purposes without our written permission. Information on the site is provided for general guidance and may
              change without notice.
            </p>
          ),
        },
        {
          title: "Projects and services",
          icon: i.code,
          body: (
            <p>
              Scope, pricing, milestones, payment terms, ownership and cancellation for any project are set out in the proposal or agreement
              we share with you. If anything in that document differs from these terms, the project agreement applies.
            </p>
          ),
        },
        {
          title: "Third-party links and services",
          icon: i.link,
          body: (
            <p>
              The site links to third-party platforms such as WhatsApp and social networks. We are not responsible for their content or
              privacy practices.
            </p>
          ),
        },
        {
          title: "Limitation of liability",
          icon: i.shield,
          body: (
            <p>
              To the extent permitted by law, {company.name} is not liable for any indirect or consequential loss arising from use of this
              website.
            </p>
          ),
        },
        {
          title: "Governing law",
          icon: i.scale,
          body: <p>These terms are governed by the laws of India, and disputes are subject to the courts of Vijayawada, Andhra Pradesh.</p>,
        },
        {
          title: "Changes to these terms",
          icon: i.edit,
          body: <p>We may update these terms from time to time. The date at the top of this page shows when they last changed.</p>,
        },
      ]}
    />
  );
}
