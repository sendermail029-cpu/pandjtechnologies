export const company = {
  name: "P & J Technologies",
  tagline: "Proctoring. Integrity. Innovation.",
  email: "contact@pandjtechnologies.com",
  phones: [
    { label: "Sales", number: "+91 84979 76017", tel: "+918497976017" },
    { label: "Support", number: "+91 91820 59570", tel: "+919182059570" },
  ],
  whatsapp: "917032559570",
  // contact form submissions go to this Formspree form (formspree.io dashboard)
  formspree: "https://formspree.io/f/xoeepqyr",
  address: ["49-1-126, 2nd Floor", "Opp. Vidyuth Soudha", "Vijayawada, Andhra Pradesh 520004"],
  offices: [
    {
      city: "Vijayawada",
      role: "Head office · Test center",
      lines: ["49-1-126, 2nd Floor", "Opp. Vidyuth Soudha", "Vijayawada, Andhra Pradesh 520004"],
    },
    {
      city: "Hyderabad",
      role: "Branch office",
      lines: ["Road No. 8, Sri Vivekananda Nagar", "Hyderabad, Telangana 500014"],
    },
  ],
  hours: "Mon–Sat, 9:30 am – 7:00 pm IST",
  // exact office pin in Vijayawada, so map links open this one place
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=16.52405399641806,80.6726894424868",
  social: {
    linkedin: "https://www.linkedin.com/in/pandj-technologies-835796368/",
    facebook: "https://www.facebook.com/profile.php?id=61577266389886",
    instagram: "https://www.instagram.com/technologiespj/",
    x: "https://x.com/pandjtech1437",
  },
};

export type Service = {
  slug: string;
  name: string;
  short: string;
  summary: string;
  outcomes: string[];
  deliverables: string[];
  stack: string[];
  timeline: string;
  idealFor: string;
};

export const services: Service[] = [
  {
    slug: "website-design",
    name: "Website design & development",
    short: "Fast, search-ready websites that turn visitors into enquiries.",
    summary:
      "We plan, design and build business websites around one goal: getting the right people to contact you. Every site is mobile-first, quick to load and fully managed by our team, with gallery and blog sections you can update yourself.",
    outcomes: [
      "A site that loads in under two seconds on a 4G phone",
      "Enquiry forms and WhatsApp routed straight to your sales team",
      "On-page SEO, Google Business Profile and Search Console set up at launch",
    ],
    deliverables: [
      "Sitemap, wireframes and visual design for approval",
      "Responsive build with gallery and blog sections your team can update",
      "Domain, hosting, SSL and business email, managed by us",
      "Analytics, conversion tracking and handover training",
    ],
    stack: ["Next.js", "React", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Node.js", "WordPress", "Shopify", "WooCommerce", "Figma", "Firebase", "MongoDB", "PostgreSQL", "Razorpay", "Google Analytics", "Search Console", "Cloudflare", "Hostinger", "GoDaddy", "Vercel / AWS"],
    timeline: "3–6 weeks",
    idealFor: "Clinics, schools, manufacturers, travel and service businesses",
  },
  {
    slug: "app-development",
    name: "Mobile app development",
    short: "Android and iOS apps your customers and staff actually keep using.",
    summary:
      "From customer booking apps to field-staff tools, we build cross-platform apps with one codebase, a proper admin panel and the backend to run it — then publish them to the Play Store and App Store for you.",
    outcomes: [
      "One codebase for Android and iOS, so updates ship together",
      "Push notifications, payments and login that work on day one",
      "Store listing, review and release handled end to end",
    ],
    deliverables: [
      "Product scoping and clickable prototype",
      "Android and iOS apps with an admin dashboard",
      "APIs, database and cloud hosting",
      "Store publishing and 90 days of post-launch support",
    ],
    stack: ["Flutter", "React Native", "Kotlin", "Swift", "Android Studio", "Xcode", "Figma", "Node.js", "Firebase", "MongoDB", "PostgreSQL", "Razorpay", "Google Maps API", "Firebase Cloud Messaging", "Google Play Console", "App Store Connect"],
    timeline: "8–16 weeks",
    idealFor: "Service bookings, e-commerce, delivery, education and internal staff tools",
  },
  {
    slug: "crm-software",
    name: "CRM software",
    short: "Every lead, follow-up and deal in one place your team will use.",
    summary:
      "We build CRMs shaped around how your sales team already works — lead capture from ads and your website, follow-up reminders, pipeline stages, quotations and reports for owners — without paying per-seat licence fees forever.",
    outcomes: [
      "Leads from Meta, Google, website and WhatsApp land in one inbox",
      "No missed follow-ups: reminders, assignments and call logs",
      "Owners see conversion and team performance at a glance",
    ],
    deliverables: [
      "Workflow mapping with your sales team",
      "Lead, contact, pipeline and task modules",
      "Quotations, invoices and role-based access",
      "Data migration from Excel or your old system",
    ],
    stack: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "MongoDB", "WhatsApp Business API", "Meta Lead Ads API", "Google Ads API", "Zoho", "Razorpay", "Google Cloud"],
    timeline: "6–10 weeks",
    idealFor: "Sales teams of 3 to 300 that are outgrowing spreadsheets",
  },
  {
    slug: "erp-software",
    name: "ERP software",
    short: "Inventory, billing, purchase, HR and accounts — connected.",
    summary:
      "Our ERP systems replace disconnected spreadsheets and single-purpose tools with one system for operations. We roll it out module by module so your business keeps running while it changes.",
    outcomes: [
      "Real-time stock, sales and purchase visibility across branches",
      "GST-compliant billing and reports ready for your accountant",
      "Payroll, attendance and approvals without paperwork",
    ],
    deliverables: [
      "Process study and module roadmap",
      "Inventory, sales, purchase, accounts and HR modules",
      "Integrations with Tally, payment gateways and e-invoicing",
      "Phased rollout, staff training and ongoing support",
    ],
    stack: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "Redis", "Odoo", "Tally integration", "GST e-invoicing", "Razorpay", "AWS", "Google Cloud"],
    timeline: "10–20 weeks, phased",
    idealFor: "Manufacturers, distributors, retail chains and multi-branch businesses",
  },
  {
    slug: "custom-software",
    name: "SaaS, AI & custom software",
    short: "SaaS products, AI agents, connected hardware and custom builds.",
    summary:
      "We build SaaS products, AI agents that handle real work, and software that connects with hardware like sensors, scanners and biometric devices, plus anything else your business needs, built to your exact requirements.",
    outcomes: [
      "Your own SaaS product, ready to sell on subscription",
      "AI agents that answer, qualify and update records for you",
      "Devices and software working together in real time",
      "Manual, repetitive work automated away",
      "Your existing tools connected instead of replaced",
      "Full source code and IP ownership on completion",
    ],
    deliverables: [
      "Requirements workshop and written specification",
      "Fixed-scope proposal with milestones",
      "Design, development, testing and deployment",
      "Documentation and an annual maintenance option",
    ],
    stack: ["TypeScript", "JavaScript", "Python", "Node.js", "Next.js", "React", "Flutter", "PostgreSQL", "MongoDB", "Firebase", "REST & webhook APIs", "Docker", "GitHub", "AWS", "Google Cloud"],
    timeline: "Scoped per project",
    idealFor: "Founders launching a product, and businesses whose needs no ready-made tool fits",
  },
  {
    slug: "digital-marketing",
    name: "Digital marketing — Ads, WhatsApp & AI calls",
    short: "Meta & Google Ads, WhatsApp automation and AI calling agents.",
    summary:
      "We run Meta (Facebook & Instagram) and Google Ads campaigns with proper conversion tracking, then follow up every lead automatically with WhatsApp automation and AI calling agents, so enquiries turn into customers and flow straight into your CRM.",
    outcomes: [
      "Cost per lead tracked and reduced month over month",
      "Ad creatives, landing pages and targeting tested continuously",
      "A monthly report you can read in five minutes",
    ],
    deliverables: [
      "Audience research and campaign strategy",
      "Meta and Google Ads setup with pixel & conversion tracking",
      "Creative design, copy and landing pages",
      "Weekly optimisation and monthly performance review",
    ],
    stack: ["Meta Ads Manager", "Google Ads", "GA4", "Google Tag Manager", "Search Console", "Looker Studio", "Semrush", "Canva", "Photoshop", "Premiere Pro", "WhatsApp Business"],
    timeline: "Ongoing, monthly",
    idealFor: "Businesses ready to grow enquiries from a set monthly ad budget",
  },
];

export const process = [
  {
    name: "Discover",
    text: "We meet your team, study how work gets done today and agree on what success looks like in numbers.",
  },
  {
    name: "Propose",
    text: "You get a written scope, fixed milestones, a delivery timeline and a clear price — before any work begins.",
  },
  {
    name: "Design & build",
    text: "Work happens in short cycles. You review progress every week on a live link, not in a final surprise.",
  },
  {
    name: "Launch",
    text: "We test, migrate your data, train your staff and go live with a rollback plan in place.",
  },
  {
    name: "Support & grow",
    text: "A named contact handles fixes and improvements after launch, with an optional annual maintenance plan.",
  },
];

export const clients = [
  { name: "Airpay", sector: "Fintech · Payments" },
];

export const testingPartners = ["Meazure Learning", "Pearson VUE", "PSI"];


// "A, B and C" — for writing lists in sentences
export const joinList = (items: string[], last = "and") =>
  items.length < 2 ? items.join("") : `${items.slice(0, -1).join(", ")} ${last} ${items[items.length - 1]}`;

export const partnersText = joinList(testingPartners);

export const commitments = [
  {
    title: "Written scope before payment",
    text: "Every engagement starts with a signed scope, milestones and price. No open-ended billing.",
  },
  {
    title: "You own the code",
    text: "Source code and designs are handed over to you, and ad accounts are set up in your business's name.",
  },
  {
    title: "One accountable manager",
    text: "A single project manager owns delivery and answers your calls — from kickoff to support.",
  },
  {
    title: "Data handled with care",
    text: "The same integrity standards we follow as an authorized test center apply to your data.",
  },
];

export type FaqItem = { q: string; a: string };
export type FaqCategory = { id: string; title: string; items: FaqItem[] };

const timelineOf = (slug: string) => services.find((s) => s.slug === slug)?.timeline ?? "";

export const faqCategories: FaqCategory[] = [
  {
    id: "general",
    title: "General",
    items: [
      {
        q: "What does P & J Technologies do?",
        a: `We design websites and mobile apps, build CRM, ERP and custom software, and run Meta and Google Ads campaigns. We're also an authorized test center for ${partnersText}, and we offer BPO and recruitment services.`,
      },
      {
        q: "Why choose P & J Technologies over a freelancer or a large agency?",
        a: "You get one accountable team that plans your website, software and marketing together, a written fixed scope before you pay, weekly progress you can see, and full ownership of everything we build — with the personal attention of a focused team.",
      },
      {
        q: "Where are you located, and do you only work with local clients?",
        a: `We have offices in ${company.offices.map((o) => `${o.city} (${o.lines.join(", ")})`).join(" and ")}. We work with clients across India and abroad through video calls and shared project dashboards, and meet in person whenever it helps.`,
      },
      {
        q: "Which industries do you work with?",
        a: "Education, travel and transport, healthcare, retail, manufacturing, real estate and professional services. Our process works for any business that wants more enquiries or smoother operations.",
      },
      {
        q: "How do we start a project with you?",
        a: "Send an enquiry or call us. We'll arrange a short discovery call to understand your goals, then send a written proposal with scope, timeline and a fixed price — usually within three working days. Work starts once you approve it.",
      },
    ],
  },
  {
    id: "test-center",
    title: "Authorized test center",
    items: [
      {
        q: "Which exam providers is your test center authorized for?",
        a: `We are an authorized test center for ${partnersText}. Candidates can take exams delivered by these providers at our center in Vijayawada.`,
      },
      {
        q: "How do I book an exam at your center?",
        a: `Book through the exam provider's official website (${partnersText}): create or sign in to your account, choose your exam, and select P & J Technologies, Vijayawada as your test center along with an available date and time. If you need help finding our center, call us.`,
      },
      {
        q: "Can I pay for or book the exam directly with you?",
        a: "Exam registration and fees are handled by the exam provider or the organisation that owns the exam, so payment is made on their website. We're happy to guide you through the booking steps.",
      },
      {
        q: "What ID do I need to bring on exam day?",
        a: "Bring the original, valid government-issued photo ID that your exam provider requires — the name must match your registration exactly. Requirements vary by exam, so check your booking confirmation email before you come.",
      },
      {
        q: "How early should I arrive?",
        a: "Follow the arrival time in your confirmation email; most exams ask you to arrive 15–30 minutes early for check-in. Arriving late can mean you aren't allowed to sit the exam.",
      },
      {
        q: "What can I take into the testing room?",
        a: "Personal items such as phones, smartwatches, bags, notes and food aren't allowed in the testing room. You'll be asked to store them before check-in. Any items your exam permits will be listed in your exam rules.",
      },
      {
        q: "How do I reschedule or cancel my exam?",
        a: "Reschedule or cancel through the same exam provider account you booked with. Each provider sets its own deadlines and fees, so make changes as early as possible.",
      },
      {
        q: "When and how will I get my results?",
        a: "Results are issued by the exam provider, not the test center. Some exams show a preliminary result on screen; others send results by email or through your candidate account.",
      },
      {
        q: "Can I request special testing accommodations?",
        a: "Yes. Accommodations such as extra time must be requested and approved through your exam provider before you book. Once approved, we arrange the session to match.",
      },
      {
        q: "Can our institution partner with you to host exams?",
        a: "Yes. Schools, colleges, training institutes and certification bodies can work with us to host exams or set up a new certified location. Contact us to discuss your requirements.",
      },
    ],
  },
  {
    id: "websites",
    title: "Websites",
    items: [
      {
        q: "What kinds of websites do you build?",
        a: "Business and corporate websites, e-commerce stores, education portals, booking sites and landing pages for ad campaigns — all mobile-first, fast and ready for search engines.",
      },
      {
        q: "How long does a website take?",
        a: `Most websites take ${timelineOf("website-design")}, depending on the number of pages, features and how quickly content is ready.`,
      },
      {
        q: "Can we update the website ourselves?",
        a: "You can add photos to your gallery and publish blog posts yourself from a simple panel, and we show you how. Everything else — pages, design and features — is updated by our team, so your site stays fast, secure and consistent. Just send us the changes you need.",
      },
      {
        q: "Will my website show up on Google?",
        a: "Every site is built with search engines in mind: fast loading, clean structure, page titles and descriptions, a sitemap and Google Search Console setup. Ongoing SEO and Google Ads can be added for faster growth.",
      },
      {
        q: "Can you add online payments, bookings or WhatsApp?",
        a: "Yes. We integrate payment gateways, booking and enquiry forms, WhatsApp chat and lead alerts so enquiries reach your team straight away.",
      },
      {
        q: "Can you redesign our existing website?",
        a: "Yes. We can redesign, speed up or extend your current website, and move your existing content across without losing your search rankings.",
      },
    ],
  },
  {
    id: "apps",
    title: "Mobile apps",
    items: [
      {
        q: "Do you build apps for both Android and iPhone?",
        a: "Yes. We usually build one app that runs on both Android and iOS, which saves time and cost while still feeling native on each phone.",
      },
      {
        q: "How long does it take to build an app?",
        a: `Most apps take ${timelineOf("app-development")}, depending on features, integrations and the number of user types (for example customers, staff and admins).`,
      },
      {
        q: "Will you publish the app on Google Play and the App Store?",
        a: "Yes. We prepare the store listings and handle submission and review under your own developer accounts, so the app is registered to your business.",
      },
      {
        q: "Do we get an admin panel to manage the app?",
        a: "Yes. Most apps come with a web admin panel to manage users, orders, bookings, content and reports.",
      },
      {
        q: "What happens when new phone or OS versions are released?",
        a: "Our maintenance plans cover compatibility updates for new Android and iOS versions, bug fixes and small improvements so your app keeps working smoothly.",
      },
    ],
  },
  {
    id: "crm-erp",
    title: "CRM, ERP & custom software",
    items: [
      {
        q: "What's the difference between CRM and ERP?",
        a: "A CRM manages your customers and sales — leads, follow-ups, quotes and deals. An ERP runs your operations — inventory, billing, purchase, HR and accounts. Many businesses start with one and connect the other later.",
      },
      {
        q: "Should we use ready-made software or get it built for us?",
        a: "If an existing product like Zoho, HubSpot, SAP or Odoo fits how you work, we'll recommend and set it up. If your process is unique, custom software avoids per-user fees and fits your team exactly. We'll advise honestly after the discovery call.",
      },
      {
        q: "Can the CRM capture leads from our website, WhatsApp and ads automatically?",
        a: "Yes. Leads from your website forms, WhatsApp, Meta Lead Ads and Google Ads can flow straight into the CRM, be assigned to the right person and trigger follow-up reminders.",
      },
      {
        q: "Can the ERP work with Tally and handle GST invoicing?",
        a: "Yes. We can sync with Tally and include GST-ready invoicing, along with stock, purchase, multi-branch and reporting modules as needed.",
      },
      {
        q: "How long do CRM and ERP projects take?",
        a: `A CRM typically takes ${timelineOf("crm-software")}. An ERP takes ${timelineOf("erp-software")}, so your team can start using the first modules early.`,
      },
      {
        q: "Can you move our data from Excel or our old system?",
        a: "Yes. We clean and migrate your existing customers, products, stock and history so your team starts with complete records.",
      },
      {
        q: "Will you train our staff?",
        a: "Yes. Every rollout includes hands-on training for each team, simple guides and support while your staff settle in.",
      },
      {
        q: "Is the software cloud-based? Can we use it on mobile?",
        a: "Our systems run securely in the cloud, so your team can use them from the office, home or a phone browser. Mobile apps can be added where needed.",
      },
    ],
  },
  {
    id: "marketing",
    title: "Digital marketing",
    items: [
      {
        q: "Which platforms do you advertise on?",
        a: "Meta (Facebook and Instagram) and Google (Search, Display and YouTube). We choose the mix based on where your customers are and what you sell.",
      },
      {
        q: "What ad budget do we need?",
        a: "We recommend a budget based on your industry and goals after a short audit. Our management fee is separate from your ad spend, which is paid directly to Meta or Google.",
      },
      {
        q: "How soon will we see results?",
        a: "Ads start bringing traffic within days. It usually takes 4–8 weeks of testing and optimising to reach a steady cost per enquiry, which we then work to improve each month.",
      },
      {
        q: "How do you report on performance?",
        a: "You get a live dashboard and a monthly report focused on enquiries, cost per lead and sales — not just likes and impressions — plus a review call to plan the next month.",
      },
      {
        q: "Who owns the ad accounts?",
        a: "You do. Ad accounts, pages and tracking are set up in your business's name, and we work in them with your permission.",
      },
      {
        q: "Do you manage social media pages and content?",
        a: "Yes. Alongside ads we can plan and design posts, creatives and short videos to keep your pages active and support your campaigns.",
      },
    ],
  },
  {
    id: "bpo",
    title: "BPO services",
    items: [
      {
        q: "What BPO services do you provide?",
        a: "Customer support, data entry, back-office processing, email and chat support, and virtual assistance — designed to lower your costs and free up your team.",
      },
      {
        q: "Which industries do you support with BPO?",
        a: "Education, healthcare, e-commerce, technology and real estate, with a team that scales up or down with your volume.",
      },
      {
        q: "How do you keep quality and data safe in BPO work?",
        a: "Trained staff, clear processes, real-time reporting and a dedicated point of contact — with the same data-handling discipline we follow as an authorized test center.",
      },
    ],
  },
  {
    id: "recruitment",
    title: "Recruitment & hiring",
    items: [
      {
        q: "Do you offer recruitment or staffing services?",
        a: "Yes. We handle hiring end to end — sourcing, screening and onboarding support — and provide contract staff for technical and non-technical roles.",
      },
      {
        q: "Which roles do you recruit for?",
        a: "IT, customer service, BPO, administration, logistics, sales and executive roles, for startups and established companies alike.",
      },
      {
        q: "What makes your hiring service different?",
        a: "We combine technology-led screening with a personal approach and knowledge of each industry, so shortlists fit both the role and your team.",
      },
    ],
  },
  {
    id: "pricing",
    title: "Pricing & payments",
    items: [
      {
        q: "How much does a website or software project cost?",
        a: "It depends on scope. After a short discovery call we send a written proposal with a fixed price and milestones, so you know the full cost before work starts.",
      },
      {
        q: "How is pricing structured?",
        a: "Fixed-price projects for defined scopes, custom quotes for larger systems, and monthly packages for ongoing support and marketing.",
      },
      {
        q: "What are the payment terms?",
        a: "Projects are paid in milestones agreed in the proposal — typically an advance to start, then payments as each stage is delivered and approved. There's no open-ended billing.",
      },
      {
        q: "Are there any hidden costs?",
        a: "No. Your proposal lists everything included. Domain, hosting and business email are provided and billed by us, and third-party costs such as app store accounts or ad spend are shown separately.",
      },
      {
        q: "What is your refund or cancellation policy?",
        a: "Refunds and cancellations are covered in each project agreement, based on the milestones completed. Contact us and we'll walk you through the terms for your project.",
      },
    ],
  },
  {
    id: "support",
    title: "Support & maintenance",
    items: [
      {
        q: "What happens after launch?",
        a: "Every project includes a post-launch support period covering bug fixes and adjustments. After that you can choose an annual maintenance plan covering updates, backups, security and small changes.",
      },
      {
        q: "Who do we contact if something goes wrong?",
        a: `Your project manager, or our support line on ${company.phones.find((p) => p.label === "Support")?.number ?? company.phones[0].number}. Urgent issues on live systems are prioritised.`,
      },
      {
        q: "Can you add new features later?",
        a: "Yes. Everything is built so it can grow. New features are scoped and quoted the same way as the original project.",
      },
    ],
  },
  {
    id: "security",
    title: "Ownership & security",
    items: [
      {
        q: "Will we own the source code and designs?",
        a: "Yes. On final payment, the full source code and designs are handed over to your company. Domain, hosting and business email are managed and billed by us.",
      },
      {
        q: "Will you sign an NDA?",
        a: "Yes. We're happy to sign a non-disclosure agreement before you share sensitive business details.",
      },
      {
        q: "How do you keep our data secure?",
        a: "We follow established security practices: encrypted connections, access limited to the people working on your project, regular backups and secure hosting — the same discipline our exam center work requires.",
      },
    ],
  },
  {
    id: "contact",
    title: "Contact & hours",
    items: [
      {
        q: "How can we contact you?",
        a: `Email ${company.email}, call ${company.phones.map((p) => `${p.number} (${p.label.toLowerCase()})`).join(" or ")}, or message us on WhatsApp.`,
      },
      {
        q: "What are your business hours?",
        a: `${company.hours}.`,
      },
      {
        q: "What new services are you planning?",
        a: "Cloud computing, IT consulting, AI and machine learning development, and cybersecurity services.",
      },
    ],
  },
];
