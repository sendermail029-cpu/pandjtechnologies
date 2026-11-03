"use client";

import { useState } from "react";
import { Playfair_Display } from "next/font/google";
import { brandIcons, cloudIcons, moreToolIcons, toolIcons } from "@/lib/brand-icons";

const serif = Playfair_Display({ subsets: ["latin"], weight: "500", style: "italic" });

type Cat = "build" | "cloud" | "platforms" | "security" | "seo" | "marketing" | "design";
const cats: { id: Cat | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "build", label: "Development" },
  { id: "cloud", label: "Cloud & hosting" },
  { id: "platforms", label: "Platforms & payments" },
  { id: "security", label: "Security" },
  { id: "seo", label: "SEO" },
  { id: "marketing", label: "Marketing" },
  { id: "design", label: "Design & video" },
];

const tools: [string, Cat][] = [
  ["React", "build"],
  ["Next.js", "build"],
  ["Node.js", "build"],
  ["TypeScript", "build"],
  ["JavaScript", "build"],
  ["Tailwind CSS", "build"],
  ["HTML5", "build"],
  ["CSS3", "build"],
  ["Flutter", "build"],
  ["GitHub", "build"],
  ["Android Studio", "build"],
  ["Visual Studio", "build"],
  ["VS Code", "build"],
  ["Google Cloud Console", "cloud"],
  ["Firebase", "cloud"],
  ["Vercel", "cloud"],
  ["Railway", "cloud"],
  ["MongoDB", "cloud"],
  ["PostgreSQL", "cloud"],
  ["GoDaddy", "cloud"],
  ["Hostinger", "cloud"],
  ["WordPress", "platforms"],
  ["Zoho", "platforms"],
  ["Odoo", "platforms"],
  ["Airpay", "platforms"],
  ["Razorpay", "platforms"],
  ["API keys & integrations", "platforms"],
  ["Cloudflare", "security"],
  ["Let's Encrypt SSL", "security"],
  ["OWASP", "security"],
  ["Bitwarden", "security"],
  ["Search Console (SEO)", "seo"],
  ["Semrush", "seo"],
  ["Yoast SEO", "seo"],
  ["Google Tag Manager", "seo"],
  ["Meta", "marketing"],
  ["Google Ads", "marketing"],
  ["Google Analytics", "marketing"],
  ["Figma", "design"],
  ["Canva", "design"],
  ["Photoshop", "design"],
  ["Premiere Pro", "design"],
];

// icons not in the shared set: Razorpay and the security / SEO tools (Simple Icons, CC0), and a key for API work
const extra = [
  { title: "Let's Encrypt SSL", color: "#003A70", path: "M11.9914 0a.8829.8829 0 00-.8718.817v3.0209A.8829.8829 0 0012 4.7207a.8829.8829 0 00.8803-.8803V.817a.8829.8829 0 00-.889-.817zm7.7048 3.1089a.8804.8804 0 00-.5214.1742l-2.374 1.9482a.8804.8804 0 00.5592 1.5622.8794.8794 0 00.5592-.2001l2.3714-1.9506a.8804.8804 0 00-.5944-1.534zm-15.3763.0133a.8829.8829 0 00-.611 1.5206l2.37 1.9506a.876.876 0 00.5606.2001v-.002a.8804.8804 0 00.5597-1.5602L4.8277 3.2831a.8829.8829 0 00-.5078-.161zm7.6598 3.2275a5.0456 5.0456 0 00-5.0262 5.0455v1.4876H5.787a.9672.9672 0 00-.9647.9643v9.1887a.9672.9672 0 00.9647.9643H18.213a.9672.9672 0 00.9643-.9643v-9.1907a.9672.9672 0 00-.9643-.9623h-1.1684v-1.4876a5.0456 5.0456 0 00-5.0649-5.0455zm.0127 2.8933a2.1522 2.1522 0 012.1593 2.1522v1.4876H9.8473v-1.4876a2.1522 2.1522 0 012.145-2.1522zm7.3812.5033a.8829.8829 0 10.0705 1.7632h3.0267a.8829.8829 0 000-1.7609H19.444a.8829.8829 0 00-.0705-.0023zm-17.8444.0023a.8829.8829 0 000 1.7609h2.9983a.8829.8829 0 000-1.7609zm10.4596 6.7746a1.2792 1.2792 0 01.641 2.3926v1.2453a.6298.6298 0 01-1.2595 0v-1.2453a1.2792 1.2792 0 01.6185-2.3926z" },
  { title: "OWASP", color: "#000000", path: "M15.897 20.503c-.384 0-1.782-2.489-1.97-3.198-.393-1.486-.308-2.114-.285-2.314.072-.613.667-.92.703-1.748.01-.256.14-1.535.243-2.534a1.723 1.723 0 0 1-.733-.343c.676.908-.32 1.995-1.767 3.443-1.536 1.536-4.945 2.961-4.945 2.961s1.425-3.41 2.961-4.945c1.13-1.129 2.04-1.983 2.816-1.983.22 0 .427.067.627.216a1.722 1.722 0 0 1-.343-.733c-.999.103-2.278.232-2.534.244-.829.036-1.135.63-1.747.702-.07.008-.194.024-.388.024-.36 0-.963-.054-1.926-.31-.772-.203-3.648-1.84-3.14-2.045.26-.105 1.087-.176 2.175-.176 1.047 0 2.337.066 3.596.23 1.57.205 3.01.463 3.992.656.016-.053.035-.104.058-.154l-1.004-.48s-.8-.92-.715-.984a.02.02 0 0 1 .012-.003c.126 0 .767.733.829.816l.605.202-.284-.249s-.388-1.438-.287-1.472h.004c.106 0 .459 1.25.489 1.34.07.06.303.152.596.32l-.308-.79s.14-1.305.243-1.305h.003c.105.021-.02 1.089-.047 1.221l.51.783a1.31 1.31 0 0 1 .463-.082c.184 0 .374.036.558.107-.236-.502-.218-1.025.095-1.338a.84.84 0 0 1 .353-.209.462.462 0 0 1 .457-.383c.127 0 .254.05.352.148a.497.497 0 0 1 .147.335c.151-.311.329-.73.317-.867-.03-.307-.386-.852-.39-.857a.076.076 0 0 1 .064-.119c.025 0 .05.012.064.035.016.023.381.582.414.927.018.198-.21.696-.333.95a2.227 2.227 0 0 1 .873.874c.245-.12.715-.334.927-.334l.024.001c.345.033.904.399.927.414a.076.076 0 0 1-.084.128c-.005-.004-.55-.36-.857-.39h-.015c-.15 0-.552.171-.852.317.12.004.242.053.335.147a.482.482 0 0 1 .012.681.459.459 0 0 1-.247.128.845.845 0 0 1-.21.354.924.924 0 0 1-.67.255c-.212 0-.441-.055-.667-.16.132.343.142.708.025 1.02l.783.51c.095-.019.666-.088.993-.088.13 0 .222.011.228.04.02.106-1.305.247-1.305.247l-.79-.308c.168.293.26.527.32.596.091.03 1.374.392 1.34.493-.004.012-.026.017-.063.017-.283 0-1.41-.304-1.41-.304l-.248-.284.202.605c.087.065.876.755.813.841-.004.005-.009.007-.016.007-.139 0-.967-.722-.967-.722l-.481-1.004a1.18 1.18 0 0 1-.154.058c.193.982.451 2.422.656 3.992.335 2.569.26 5.261.054 5.77-.016.041-.042.06-.076.06M12 24C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12m0-22.153C6.393 1.847 1.847 6.393 1.847 12S6.393 22.153 12 22.153 22.153 17.607 22.153 12 17.607 1.847 12 1.847Z" },
  { title: "Bitwarden", color: "#175DDC", path: "M3.75 0A3.75 3.75 0 000 3.75v16.5A3.75 3.75 0 003.75 24h16.5A3.75 3.75 0 0024 20.25V3.75A3.75 3.75 0 0020.25 0zm1.36 2.92h13.8c.208 0 .388.076.54.228a.737.737 0 01.227.539v9.2c0 .687-.134 1.367-.401 2.042a7.618 7.618 0 01-.995 1.797 11.097 11.097 0 01-1.413 1.528c-.547.495-1.052.906-1.515 1.234-.464.327-.947.636-1.45.928-.503.291-.86.489-1.072.593-.212.104-.381.184-.51.24a.687.687 0 01-.31.071.688.688 0 01-.312-.072 13.784 13.784 0 01-.51-.24 20.61 20.61 0 01-1.071-.592 19.133 19.133 0 01-1.45-.928 16.457 16.457 0 01-1.515-1.234 11.11 11.11 0 01-1.414-1.528 7.617 7.617 0 01-.994-1.797 5.502 5.502 0 01-.401-2.042v-9.2c0-.208.076-.387.227-.54a.737.737 0 01.54-.227zm6.9 2.3v13.62c.95-.502 1.801-1.05 2.552-1.64 1.877-1.47 2.815-2.907 2.815-4.313V5.22Z" },
  { title: "Semrush", color: "#FF642D", path: "M20.698 11.911c0 .444-.226.516-.79.516-.596 0-.706-.1-.77-.554-.118-1.152-.896-2.13-2.201-2.24-.418-.034-.518-.19-.518-.706 0-.48.074-.708.446-.708 2.265.01 3.833 1.832 3.833 3.69v.002zm3.3 0c0-3.456-2.338-7.11-7.74-7.11H5.52c-.218 0-.354.11-.354.31 0 .109.082.209.156.26.388.31.97.654 1.73 1.036.743.372 1.323.616 1.903.852.246.1.336.208.336.344 0 .19-.136.308-.4.308H.372c-.254 0-.372.164-.372.326 0 .136.044.254.162.372.69.726 1.796 1.596 3.4 2.604 1.466.91 2.98 1.74 4.533 2.492.236.11.308.236.308.372-.008.154-.126.28-.4.28H4.1c-.216 0-.344.12-.344.3 0 .1.08.226.19.326.888.808 2.311 1.688 4.207 2.494 2.53 1.08 5.094 1.721 7.98 1.721 5.465 0 7.867-4.087 7.867-7.289l-.002.002zm-7.133 5.104c-2.794 0-5.132-2.276-5.132-5.114 0-2.794 2.33-5.04 5.132-5.04 2.863 0 5.111 2.24 5.111 5.04a5.086 5.086 0 0 1-5.111 5.114z" },
  { title: "Yoast SEO", color: "#A61E69", path: "M16.61 0 11.4 14.477 8.806 6.36H5.941l3.804 9.77a4.017 4.017 0 0 1 0 2.925c-.387.993-1.073 2.158-2.96 2.505V24c1.512-.06 2.692-.562 3.694-1.57 1.032-1.036 1.919-2.655 2.79-5.091L19.739 0ZM5.357 3.274a3.706 3.706 0 0 0-3.695 3.695v10.358a3.706 3.706 0 0 0 3.695 3.694h.817l.26-.034c1.76-.237 2.37-1.224 2.733-2.158a3.4 3.4 0 0 0 0-2.475L5.035 5.738H9.26l2.174 6.81 3.339-9.274Zm13.792.08L13.853 17.55c-.502 1.403-1.015 2.54-1.559 3.47h10.044V6.97a3.706 3.706 0 0 0-3.19-3.616Z" },
  { title: "Google Tag Manager", color: "#246FDB", path: "M12.003 0a3 3 0 0 0-2.121 5.121l6.865 6.865-4.446 4.541 1.745 1.836a3.432 3.432 0 0 1 .7.739l.012.011-.001.002a3.432 3.432 0 0 1 .609 1.953 3.432 3.432 0 0 1-.09.78l7.75-7.647c.031-.029.067-.05.098-.08.023-.023.038-.052.06-.076a2.994 2.994 0 0 0-.06-4.166l-9-9A2.99 2.99 0 0 0 12.003 0zM8.63 2.133L.88 9.809a2.998 2.998 0 0 0 0 4.238l7.7 7.75a3.432 3.432 0 0 1-.077-.729 3.432 3.432 0 0 1 3.431-3.431 3.432 3.432 0 0 1 .826.101l-5.523-5.81 4.371-4.373-2.08-2.08c-.903-.904-1.193-2.183-.898-3.342zm3.304 16.004a2.932 2.932 0 0 0-2.931 2.931A2.932 2.932 0 0 0 11.934 24a2.932 2.932 0 0 0 2.932-2.932 2.932 2.932 0 0 0-2.932-2.931z" },
  { title: "Razorpay", color: "#0C2451", path: "M22.436 0l-11.91 7.773-1.174 4.276 6.625-4.297L11.65 24h4.391l6.395-24zM14.26 10.098L3.389 17.166 1.564 24h9.008l3.688-13.902Z" },
  {
    title: "API keys & integrations",
    color: "#2747d6",
    path: "M7 14a5 5 0 1 1 4.58-7H22v4h-2v3h-3v-3h-5.42A5 5 0 0 1 7 14zm0-3.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z",
  },
];
const all = [...extra, ...brandIcons, ...cloudIcons, ...toolIcons, ...moreToolIcons];
// display names that differ from the icon set
const iconName: Record<string, string> = { "Google Cloud Console": "Google Cloud" };
// friendlier names on the tiles
const label = (t: string) => (t === "Search Console (SEO)" ? "Google Search Console" : t);
const icon = (t: string) => all.find((x) => x.title === (iconName[t] ?? t));

// light brand colours get a dark mark, the rest a white one
const isLight = (hex: string) => {
  const n = parseInt(hex.replace("#", ""), 16);
  return 0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255) > 170;
};

// Tools we build with: a wall of brand tiles with category filters
export function ToolsWall() {
  const [cat, setCat] = useState<Cat | "all">("all");

  return (
    <section className="bg-[#f5f7fc] px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-[83rem]">
        <div className="mx-auto max-w-3xl text-center">
          <p data-aos="fade-up" className="flex items-center justify-center gap-3 font-mono text-[12px] font-medium uppercase tracking-[0.22em] text-cobalt">
            <span aria-hidden className="h-px w-8 bg-cobalt/40" />
            Our toolkit
            <span aria-hidden className="h-px w-8 bg-cobalt/40" />
          </p>
          <h2 data-aos="fade-up" data-aos-delay="100" className="mt-5 text-[clamp(2.1rem,4vw,3.4rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-ink">
            Built with <span className={`${serif.className} whitespace-nowrap tracking-normal text-cobalt`}>proven technology.</span>
          </h2>
          <p data-aos="fade-up" data-aos-delay="150" className="mx-auto mt-4 max-w-[54ch] text-[16.5px] leading-relaxed text-slate">
            The frameworks, platforms and tools we use to build, host and grow your business.
          </p>
        </div>

        {/* category filters: matching tools stay bright, the rest dim, so nothing jumps around */}
        <div data-aos="fade-up" className="mt-9 flex flex-wrap justify-center gap-1.5 sm:gap-2" role="group" aria-label="Filter tools">
          {cats.map((c) => (
            <button
              key={c.id}
              type="button"
              aria-pressed={cat === c.id}
              onClick={() => setCat(c.id)}
              className={`h-9 rounded-full border px-3.5 text-[13px] font-medium transition sm:h-10 sm:px-4 sm:text-[14px] ${
                cat === c.id ? "border-cobalt bg-cobalt text-white" : "border-line bg-white text-ink-2 hover:border-ink/30"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-3 gap-2 sm:gap-2.5 md:grid-cols-5 lg:grid-cols-6">
          {tools.map(([name, c]) => {
            const ic = icon(name);
            const color = ic?.color ?? "#2747d6";
            const dim = cat !== "all" && cat !== c;
            return (
              <div
                key={name}
                className={`flex flex-col items-center justify-between gap-2 rounded-2xl border border-line bg-white p-2.5 text-center transition sm:min-h-[124px] sm:items-start sm:gap-5 sm:p-4 sm:text-left duration-300 hover:-translate-y-0.5 hover:border-ink/20 hover:shadow-lg hover:shadow-ink/5 ${dim ? "opacity-25" : ""}`}
              >
                <span className="grid h-9 w-9 place-items-center rounded-xl sm:h-10 sm:w-10" style={{ background: color }}>
                  {ic ? (
                    <svg viewBox="0 0 24 24" width="20" height="20" fill={isLight(color) ? "#0f1d33" : "#fff"} aria-hidden>
                      <path d={ic.path} />
                    </svg>
                  ) : (
                    <span aria-hidden className="text-[17px] font-bold text-white">{name[0]}</span>
                  )}
                </span>
                <span>
                  <b className="block text-[12px] font-semibold leading-tight text-ink sm:text-[15px]">{label(name)}</b>
                  <span className="hidden text-[12.5px] text-slate sm:inline">{cats.find((x) => x.id === c)?.label}</span>
                </span>
              </div>
            );
          })}
        </div>

        <p data-aos="fade-up" className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center text-[15px] text-slate">
          <span className="flex -space-x-1.5" aria-hidden>
            {["bg-cobalt", "bg-sky", "bg-saffron"].map((c) => (
              <span key={c} className={`h-3 w-3 rounded-full ring-2 ring-[#f5f7fc] ${c}`} />
            ))}
          </span>
          <span>
            <b className="font-semibold text-ink">And many more tools</b>, chosen to fit each project.
          </span>
        </p>
      </div>
    </section>
  );
}
