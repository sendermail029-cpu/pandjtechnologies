# P & J Technologies — Website

Next.js 16 (App Router) + Tailwind CSS v4 + TypeScript.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start   # production
```

## Pages

| Route | What it is |
|---|---|
| `/` | Home: hero with the "how a lead flows" diagram, services explorer, commitments, process, clients, FAQs |
| `/services/[slug]` | One page per service (6 pages, generated from `lib/site.ts`) |
| `/about` | Company story, mission, vision, values, clients |
| `/contact` | Enquiry form + phones, email, address, hours. `?service=crm-software` preselects a service |

## Edit content in one place

All text — phones, email, address, services, process, FAQs, clients, commitments — lives in **`lib/site.ts`**.
Change it there and every page updates.

## Contact form email

The form posts to `app/api/contact/route.ts`, which emails enquiries through [Resend](https://resend.com).
Create `.env.local`:

```
RESEND_API_KEY=re_xxxxxxxx
CONTACT_TO=contact@pandjtechnologies.com
CONTACT_FROM=P & J Website <website@pandjtechnologies.com>
```

Until these are set, the form doesn't fail — it offers the visitor "Send on WhatsApp" or "Send by email" with their message prefilled.

## Before going live — please review

- **Claims to confirm** in `lib/site.ts`: timelines per service, "90 days of post-launch support" (app development), "proposal within three working days" (`components/CtaBand.tsx`), "reply within one working day", working hours, and the hero badge "Taking on new projects for this quarter" (`app/page.tsx`).
- **Logos**: client and partner names are shown as text. To use logos, add files to `/public` and swap them in on the home page trust strip.
- **Real proof** builds the most trust: add case studies (problem → what you built → result with numbers) and real client testimonials with names and permission.
- **Logo mark**: `components/Logo.tsx` is a typographic placeholder — replace with your brand logo SVG if you have one.

## Deploy

Push to GitHub and import into Vercel (zero config), or run `npm run build && npm start` on any Node 20+ server.
