import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // hide the "N" route indicator bubble while developing (errors still show)
  devIndicators: false,
  // client logos are uploaded through server actions (logos up to 1 MB plus the form)
  experimental: { serverActions: { bodySizeLimit: "2mb" } },
  // ship the public admin data (clients, logos, reviews, jobs, walk-ins) with the server code, so hosts like Vercel can read it
  outputFileTracingIncludes: {
    "/**": ["./data/clients.json", "./data/reviews.json", "./data/jobs.json", "./data/walkins.json", "./data/client-logos/**/*"],
  },
  // there is no combined services page: each service has its own page; old links go to the services on the home page
  async redirects() {
    return [{ source: "/services", destination: "/#services", permanent: true }];
  },
};

export default nextConfig;
