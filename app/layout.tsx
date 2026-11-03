import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MotionReveal } from "@/components/MotionReveal";
import { ScrollProgress } from "@/components/ScrollProgress";
import { PageTransition } from "@/components/PageTransition";
import { AiAssistant } from "@/components/AiAssistant";
import { company } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.pandjtechnologies.com"),
  title: {
    default: "P & J Technologies | Website, App, CRM, ERP & Digital Marketing Company in Vijayawada",
    template: "P & J Technologies - %s",
  },
  description:
    "P & J Technologies builds websites, mobile apps, CRM, ERP and custom software, and runs Meta and Google Ads campaigns for growing businesses across India.",
  keywords: [
    "website design Vijayawada",
    "app development company Andhra Pradesh",
    "CRM software",
    "ERP software",
    "custom software development",
    "Meta ads agency",
    "Google ads agency",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "P & J Technologies",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "./" },
  robots: { index: true, follow: true },
  formatDetection: { telephone: true },
};

export const viewport: Viewport = {
  themeColor: "#0f1d33",
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://www.pandjtechnologies.com/#business",
  name: "P & J Technologies",
  url: "https://www.pandjtechnologies.com",
  logo: "https://www.pandjtechnologies.com/logo-full.png",
  image: "https://www.pandjtechnologies.com/logo-full.png",
  email: "contact@pandjtechnologies.com",
  telephone: "+91-8497976017",
  priceRange: "₹₹",
  geo: { "@type": "GeoCoordinates", latitude: 16.52405399641806, longitude: 80.6726894424868 },
  hasMap: company.mapsUrl,
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "09:30", closes: "19:00" },
  ],
  sameAs: Object.values(company.social),
  areaServed: ["Vijayawada", "Andhra Pradesh", "India"],
  address: {
    "@type": "PostalAddress",
    streetAddress: "49-1-126, 2nd Floor, Opp. Vidyuth Soudha",
    addressLocality: "Vijayawada",
    addressRegion: "Andhra Pradesh",
    postalCode: "520004",
    addressCountry: "IN",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: the inline script below adds a class to <html> before React starts
    <html lang="en-IN" suppressHydrationWarning>
      <head>
        {/* the first screen shows straight away with a CSS fade (no waiting for JavaScript); MotionReveal takes over
            once the page is interactive and keeps the scroll-in effect for everything further down */}
        <script dangerouslySetInnerHTML={{ __html: `document.documentElement.classList.add("aos-intro")` }} />
        {/* scroll-reveal elements start hidden (globals.css); without JS, show everything */}
        <noscript>
          <style>{"[data-aos]{opacity:1!important}"}</style>
        </noscript>
      </head>
      <body>
        <ScrollProgress />
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-white focus:px-4 focus:py-2">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MotionReveal />
        <PageTransition />
        <AiAssistant />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </body>
    </html>
  );
}
