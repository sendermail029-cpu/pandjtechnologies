// Page content for each service page (hero wording, what we build, what's included).
// The page layout is shared (app/services/[slug]/page.tsx + components/ServiceBody.tsx); only this content differs.

// logo: a brand title from lib/brand-icons, shown as its real logo instead of the line icon
export type Card = { t: string; d: string; i: string; logo?: string };
export type ServicePage = {
  crumb: string;
  hero: { plain: string; accent: string };
  tags: { t: string; i: string }[]; // floating tags on the hero visual
  build: { label: string; plain: string; accent: string; intro: string; items: Card[] };
  included: { plain: string; accent: string; intro: string; items: Card[] };
};

// shared icon paths (24px grid)
const I = {
  globe: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9",
  page: "M3 5h18v14H3zM3 9h18M7 13h6M7 16h4",
  blocks: "M4 4h16v6H4zM4 14h7v6H4zM15 14h5v6h-5z",
  cart: "M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6.2M10 21h.01M17 21h.01",
  link: "M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 1 0-5.66-5.66l-1 1M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 1 0 5.66 5.66l1-1",
  mail: "M4 6h16v12H4zM4 7l8 6 8-6",
  search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.35-4.35",
  star: "M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.4 6.8 19.1l1-5.8L3.5 9.2l5.9-.9z",
  chart: "M4 19V5M4 19h16M8 15l3-4 3 2 5-6",
  shield: "M12 21s-7-4.4-7-10V5l7-3 7 3v6c0 5.6-7 10-7 10zM9 11l2 2 4-4",
  phone: "M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM11 18h2",
  bolt: "M13 2 4 14h7l-1 8 9-12h-7z",
  users: "M16 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 18.5V20M10 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM20 20v-1.5a3.5 3.5 0 0 0-2.5-3.4M15.5 4.2a3.5 3.5 0 0 1 0 6.6",
  bell: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.9 1.9 0 0 0 3.4 0",
  card: "M3 6h18v12H3zM3 10h18M7 15h3",
  store: "M4 9l1.5-5h13L20 9M4 9v11h16V9M4 9h16M9 20v-6h6v6",
  layers: "M12 3 3 8l9 5 9-5-9-5zM3 12.5l9 5 9-5M3 17l9 5 9-5",
  doc: "M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9zM14 3v6h6M8 13h8M8 17h5",
  box: "M21 8 12 3 3 8v8l9 5 9-5zM3 8l9 5 9-5M12 13v8",
  rupee: "M6 3h12M6 8h12M14 21 6 13h3a5 5 0 0 0 0-10",
  code: "M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16",
  gear: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z",
  megaphone: "M3 10v4h3l7 4V6L6 10H3zM17 9a4 4 0 0 1 0 6M19.5 6.5a7.5 7.5 0 0 1 0 11",
  target: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z",
  image: "M3 5h18v14H3zM3 16l5-5 4 4 3-3 6 6M15 9h.01",
  cloud: "M7 18a4 4 0 0 1-.5-8A6 6 0 0 1 18 9a4.5 4.5 0 0 1-.5 9z",
  lock: "M6 11V8a6 6 0 0 1 12 0v3M5 11h14v10H5zM12 15v2",
};

export const servicePages: Record<string, ServicePage> = {
  "website-design": {
    crumb: "Website design",
    hero: { plain: "Websites that", accent: "bring you enquiries." },
    tags: [
      { t: "Mobile-first", i: I.phone },
      { t: "Fast loading", i: I.bolt },
      { t: "Search-ready", i: I.search },
    ],
    build: {
      label: "What we build",
      plain: "Every kind of website,",
      accent: "built to perform.",
      intro: "From a clean company website to a full online store with live integrations, we build what your business needs.",
      items: [
        { t: "Business & static websites", d: "Fast, secure company websites that present your services clearly and turn visitors into enquiries.", i: I.page },
        { t: "Dynamic websites", d: "Sites your team updates without a developer, with blogs, galleries, events and content managed from a simple admin.", i: I.blocks },
        { t: "E-commerce stores", d: "Online stores with product catalogues, secure payments, order management and delivery tracking.", i: I.cart },
        { t: "Live integrations", d: "Payment gateways, WhatsApp, CRM, booking systems, maps and APIs connected so your website works with your business.", i: I.link },
      ],
    },
    included: {
      plain: "From a business",
      accent: "to a brand.",
      intro: "A website is only the start. We set up everything your business needs to look professional and be found online.",
      items: [
        { t: "Domain, hosting & SSL", d: "Registered, configured and secured, so your site is always online and trusted.", i: I.globe },
        { t: "Professional business email", d: "Company email addresses like info@ and sales@ on your own domain, set up for your whole team.", i: I.mail },
        { t: "Google Business Profile & SEO", d: "On-page SEO, Search Console and your Google Business Profile, so customers find you.", i: I.search },
        { t: "Brand consistency", d: "Your logo, colours and tone applied across the site, emails and social profiles.", i: I.star },
        { t: "Analytics & tracking", d: "Google Analytics and conversion tracking, so you can see where every enquiry comes from.", i: I.chart },
        { t: "Training & support", d: "A handover session for your team and ongoing support whenever you need a change.", i: I.shield },
      ],
    },
  },

  "app-development": {
    crumb: "Mobile app development",
    hero: { plain: "Apps your customers", accent: "keep coming back to." },
    tags: [
      { t: "Android & iOS", i: I.phone },
      { t: "Push notifications", i: I.bell },
      { t: "Secure payments", i: I.card },
    ],
    build: {
      label: "What we build",
      plain: "Apps for every",
      accent: "part of your business.",
      intro: "One codebase for Android and iOS, with an admin panel and backend built in, published to the stores for you.",
      items: [
        { t: "Customer & booking apps", d: "Appointments, orders and loyalty, so customers can reach your business from their phone.", i: I.users },
        { t: "E-commerce & delivery apps", d: "Product catalogues, carts, payments and live order tracking for shops and delivery services.", i: I.cart },
        { t: "Education & learning apps", d: "Courses, videos, quizzes and progress tracking for schools, coaching and training.", i: I.doc },
        { t: "Staff & field-team apps", d: "Attendance, tasks, visit reports and approvals for teams working on the move.", i: I.layers },
      ],
    },
    included: {
      plain: "From idea",
      accent: "to app store.",
      intro: "Everything it takes to design, build, launch and run a professional app, handled by one team.",
      items: [
        { t: "Prototype & UI design", d: "A clickable prototype and polished screens you approve before development starts.", i: I.image },
        { t: "Android & iOS apps", d: "One codebase for both platforms, so every update ships to all users together.", i: I.phone },
        { t: "Admin dashboard", d: "A web panel to manage users, content, orders and reports without touching code.", i: I.chart },
        { t: "Backend, APIs & cloud", d: "Secure database, APIs and hosting, set up to grow with your users.", i: I.cloud },
        { t: "Payments, login & notifications", d: "Razorpay or UPI payments, OTP and social login, and push notifications that work on day one.", i: I.bell },
        { t: "Store publishing & support", d: "Play Store and App Store listing, review and release, plus 90 days of post-launch support.", i: I.shield },
      ],
    },
  },

  "crm-software": {
    crumb: "CRM software",
    hero: { plain: "Never lose", accent: "another lead." },
    tags: [
      { t: "All leads, one inbox", i: I.users },
      { t: "Follow-up reminders", i: I.bell },
      { t: "Owner reports", i: I.chart },
    ],
    build: {
      label: "What we build",
      plain: "A CRM shaped around",
      accent: "how you sell.",
      intro: "Built for your sales process, not a template, with no per-seat licence fees.",
      items: [
        { t: "Lead capture", d: "Leads from Meta, Google, your website and WhatsApp land automatically in one place.", i: I.target },
        { t: "Pipeline & follow-ups", d: "Deal stages, assignments, reminders and call logs, so no enquiry is forgotten.", i: I.layers },
        { t: "Quotations & invoices", d: "Create quotes and invoices from the deal, with your branding and GST details.", i: I.doc },
        { t: "Reports & dashboards", d: "Conversion, source and team performance at a glance for owners and managers.", i: I.chart },
      ],
    },
    included: {
      plain: "From spreadsheets",
      accent: "to a sales system.",
      intro: "We set up the whole system around your team, then move your data in and train everyone to use it.",
      items: [
        { t: "Workflow mapping", d: "We study how your team sells today and design the CRM around it.", i: I.users },
        { t: "Lead, contact & task modules", d: "Everything about every customer and deal, in one organised place.", i: I.layers },
        { t: "WhatsApp & ad integrations", d: "WhatsApp Business and Meta Lead Ads connected, so leads flow in on their own.", i: I.link },
        { t: "Role-based access", d: "Each person sees what they need, from sales executives to owners.", i: I.lock },
        { t: "Data migration", d: "Your existing leads and customers moved in from Excel or your old system.", i: I.cloud },
        { t: "Training & support", d: "Hands-on training for your team and ongoing support after launch.", i: I.shield },
      ],
    },
  },

  "erp-software": {
    crumb: "ERP software",
    hero: { plain: "Your whole business,", accent: "in one system." },
    tags: [
      { t: "Real-time stock", i: I.box },
      { t: "GST billing", i: I.doc },
      { t: "Multi-branch", i: I.store },
    ],
    build: {
      label: "What we build",
      plain: "Every module your",
      accent: "operations need.",
      intro: "Rolled out module by module, so your business keeps running while it changes.",
      items: [
        { t: "Inventory & warehouse", d: "Real-time stock across branches and warehouses, with low-stock alerts.", i: I.box },
        { t: "Sales & GST billing", d: "Quotations, orders and GST-compliant invoices, with e-invoicing support.", i: I.doc },
        { t: "Purchase & vendors", d: "Purchase orders, vendor management and approvals in one flow.", i: I.cart },
        { t: "HR, payroll & accounts", d: "Attendance, payroll, expenses and accounts connected to everything else.", i: I.users },
      ],
    },
    included: {
      plain: "From scattered tools",
      accent: "to one connected system.",
      intro: "We plan the rollout with you, connect the tools you already use and train your staff along the way.",
      items: [
        { t: "Process study & roadmap", d: "We map how your business runs and plan the modules in the right order.", i: I.layers },
        { t: "Core modules", d: "Inventory, sales, purchase, accounts and HR built around your processes.", i: I.blocks },
        { t: "Tally & payment integrations", d: "Tally, payment gateways and e-invoicing connected to the ERP.", i: I.link },
        { t: "Multi-branch & roles", d: "Separate branches, warehouses and user roles, with owner-level reports.", i: I.store },
        { t: "Reports & dashboards", d: "Sales, stock, purchase and profit reports ready for owners and accountants.", i: I.chart },
        { t: "Phased rollout & training", d: "Module-by-module launch, staff training and ongoing support.", i: I.shield },
      ],
    },
  },

  "custom-software": {
    crumb: "SaaS & AI",
    hero: { plain: "Software that thinks,", accent: "connects and scales." },
    tags: [
      { t: "SaaS products", i: I.cloud },
      { t: "AI agents", i: I.bolt },
      { t: "Hardware + IoT", i: I.gear },
    ],
    build: {
      label: "What we build",
      plain: "Four ways we turn ideas",
      accent: "into products.",
      intro: "Beyond CRM and ERP: products you can sell, agents that work for you, devices that report live, and anything else you need.",
      items: [
        { t: "SaaS products", d: "Your own software product, sold on subscription to customers anywhere.", i: I.cloud },
        { t: "AI agents", d: "Agents that answer customers, qualify leads and update records on their own.", i: I.bolt },
        { t: "Hardware + software", d: "Sensors, scanners, biometric devices and trackers connected to live dashboards.", i: I.gear },
        { t: "Your requirement", d: "Portals, booking systems, automation and integrations, built to your exact needs.", i: I.code },
      ],
    },
    included: {
      plain: "From idea",
      accent: "to working product.",
      intro: "A clear process from the first workshop to launch and beyond, whatever we are building.",
      items: [
        { t: "Requirements workshop", d: "We understand your idea or process and write a clear specification together.", i: I.users },
        { t: "Scope & proposal", d: "Defined milestones, timeline and price before any work begins.", i: I.doc },
        { t: "Design & development", d: "Built in short cycles you review every week on a live link.", i: I.code },
        { t: "Testing & deployment", d: "Tested thoroughly, including devices and AI responses, then deployed securely.", i: I.cloud },
        { t: "Documentation & ownership", d: "Full source code, documentation and IP handed over to you.", i: I.lock },
        { t: "Maintenance & support", d: "An optional annual maintenance plan to keep everything running.", i: I.shield },
      ],
    },
  },

  "digital-marketing": {
    crumb: "Digital marketing",
    hero: { plain: "Digital marketing that brings", accent: "real enquiries." },
    tags: [
      { t: "Meta & Google Ads", i: I.megaphone },
      { t: "WhatsApp automation", i: I.bolt },
      { t: "AI calling agents", i: I.phone },
    ],
    build: {
      label: "What we run",
      plain: "Campaigns measured on",
      accent: "leads, not likes.",
      intro: "Every rupee of ad spend tracked to an enquiry, with leads flowing straight into your CRM.",
      items: [
        { t: "Meta Ads", d: "Facebook and Instagram campaigns targeted at the people most likely to buy.", i: I.megaphone, logo: "Meta" },
        { t: "Google Ads", d: "Search, display and YouTube ads that reach customers when they're looking.", i: I.search, logo: "Google Ads" },
        { t: "Landing pages", d: "Fast, focused pages designed to turn ad clicks into enquiries.", i: I.page, logo: "Google Analytics" },
        { t: "Social media & creatives", d: "Ad creatives, posts and videos that reflect your brand.", i: I.image, logo: "Canva" },
      ],
    },
    included: {
      plain: "From ad spend",
      accent: "to measurable growth.",
      intro: "Strategy, setup, creatives and reporting, so you always know what your budget is doing.",
      items: [
        { t: "Audience research & strategy", d: "Who your customers are, where they spend time and how to reach them.", i: I.users },
        { t: "Pixel & conversion tracking", d: "Meta Pixel, Google Tag Manager and GA4 set up so every lead is counted.", i: I.target },
        { t: "Creative design & copy", d: "Ad designs, videos and copy written and tested for your audience.", i: I.image },
        { t: "Weekly optimisation", d: "Budgets, audiences and ads adjusted every week to lower cost per lead.", i: I.bolt },
        { t: "WhatsApp & AI follow-up", d: "Auto-replies on WhatsApp and AI calls, so every lead hears back in minutes.", i: I.link },
        { t: "Monthly report", d: "A clear report you can read in five minutes, with honest advice.", i: I.chart },
      ],
    },
  },
};
