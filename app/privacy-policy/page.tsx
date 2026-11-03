import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { company } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How P & J Technologies collects, uses and protects personal information shared through our website and services.",
};

const i = {
  noSell: "M12 21s-7-4.4-7-10V5l7-3 7 3v6c0 5.6-7 10-7 10zM9 12l2 2 4-4",
  cookie: "M12 3a9 9 0 1 0 9 9 4 4 0 0 1-4-4 4 4 0 0 1-5-5zM8.5 13h.01M12 16h.01M15 12.5h.01",
  user: "M16 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 18.5V20M10 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z",
  inbox: "M4 13h4l2 3h4l2-3h4M5 5h14l1 8v6H4v-6z",
  target: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  share: "M18 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM18 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM8.6 13.5l6.8 4M15.4 6.5l-6.8 4",
  lock: "M6 11V8a6 6 0 0 1 12 0v3M5 11h14v10H5zM12 15v2",
  clock: "M12 7v5l3 2M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z",
  edit: "M4 20h4L18.5 9.5a2.8 2.8 0 0 0-4-4L4 16zM13.5 6.5l4 4",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy"
      accent="policy."
      updated="3 November 2026"
      intro={`What personal information ${company.name} collects when you use our website or contact us, how we use it, and the choices you have.`}
      related={{ href: "/terms-and-conditions", label: "Terms & conditions" }}
      highlights={[
        { t: "We never sell your data", d: "Your details are used only to reply to you and deliver our services.", icon: i.noSell },
        { t: "No tracking cookies", d: "No advertising or analytics trackers on this website.", icon: i.cookie },
        { t: "You stay in control", d: "Ask us anytime to see, correct or delete your information.", icon: i.user },
      ]}
      sections={[
        {
          title: "Information we collect",
          icon: i.inbox,
          body: (
            <>
              <p>We only collect what you choose to share with us:</p>
              <ul>
                <li>
                  <strong>Enquiries:</strong> your name, phone number, email, company name, the service you&apos;re interested in and your
                  message.
                </li>
                <li>
                  <strong>Job applications:</strong> your name, email, phone number, the details in your application and the CV you upload.
                </li>
                <li>
                  <strong>Newsletter and job alerts:</strong> your email address.
                </li>
                <li>
                  <strong>Calls, emails and WhatsApp:</strong> the information you share in that conversation.
                </li>
              </ul>
            </>
          ),
        },
        {
          title: "How we use it",
          icon: i.target,
          body: (
            <ul>
              <li>To reply to your enquiry and prepare proposals or quotes</li>
              <li>To deliver and support the services you engage us for</li>
              <li>To review job applications and contact candidates</li>
              <li>To send the newsletter or job alerts you signed up for</li>
              <li>To meet legal, accounting and regulatory obligations</li>
            </ul>
          ),
        },
        {
          title: "Cookies",
          icon: i.cookie,
          body: (
            <p>
              This website does not use advertising or analytics cookies, and we don&apos;t track you across other sites. A single cookie is
              used only to keep our own team signed in to the website&apos;s admin area.
            </p>
          ),
        },
        {
          title: "Sharing your information",
          icon: i.share,
          body: (
            <p>
              We do not sell or rent your personal information. We share it only with service providers that help us run our business, such
              as the services that deliver contact-form enquiries and job applications to our inbox, and only as far as needed for that
              purpose, or where the law requires it.
            </p>
          ),
        },
        {
          title: "Data security",
          icon: i.lock,
          body: (
            <p>
              We use encrypted connections, limit access to the people who need it and keep regular backups. No method of transmission or
              storage is completely secure, but we take care to protect what you share with us.
            </p>
          ),
        },
        {
          title: "How long we keep it",
          icon: i.clock,
          body: <p>We keep enquiry, application and project information only as long as needed for the purposes above or as required by law.</p>,
        },
        {
          title: "Your choices",
          icon: i.user,
          body: (
            <p>
              You can ask us to access, correct or delete the personal information we hold about you, or unsubscribe from our emails at any
              time, by writing to <a href={`mailto:${company.email}`}>{company.email}</a>.
            </p>
          ),
        },
        {
          title: "Changes to this policy",
          icon: i.edit,
          body: <p>We may update this policy from time to time. The date at the top of this page shows when it last changed.</p>,
        },
      ]}
    />
  );
}
