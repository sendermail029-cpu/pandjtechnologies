import Image from "next/image";
import { Playfair_Display } from "next/font/google";

const serif = Playfair_Display({ subsets: ["latin"], weight: "500", style: "italic" });

// 3D icons: Microsoft Fluent Emoji (MIT licence), stored in public/industries
const industries = [
  { name: "Real estate", img: "real-estate", tint: "from-[#fff1e6]" },
  { name: "Education", img: "education", tint: "from-[#f1ebff]" },
  { name: "Political campaigns", img: "political", tint: "from-[#e6faf0]" },
  { name: "Podcasts & media", img: "podcasts", tint: "from-[#eef1f6]" },
  { name: "Healthcare", img: "healthcare", tint: "from-[#ffe9f1]" },
  { name: "Retail & e-commerce", img: "retail", tint: "from-[#eef3ff]" },
  { name: "Travel & transport", img: "travel", tint: "from-[#e6f3ff]" },
  { name: "Agriculture", img: "agriculture", tint: "from-[#ecfbe6]" },
  { name: "Manufacturing", img: "manufacturing", tint: "from-[#f3f4f8]" },
  { name: "Professional services", img: "professional", tint: "from-[#fbefe8]" },
];

function Card({ name, img, tint }: (typeof industries)[number]) {
  return (
    <li className="group w-[210px] shrink-0 sm:w-[230px]">
      <div className="flex h-full flex-col items-center rounded-3xl border border-line bg-white p-6 text-center shadow-sm transition duration-300 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-ink/10">
        <span className={`grid h-24 w-24 place-items-center rounded-full bg-gradient-to-b ${tint} to-white`}>
          <Image src={`/industries/${img}.png`} alt="" width={72} height={72} loading="eager" className="h-[72px] w-[72px] transition-transform duration-300 group-hover:scale-110" />
        </span>
        <span className="mt-4 text-[16px] font-semibold tracking-tight text-ink">{name}</span>
      </div>
    </li>
  );
}

// Industries we work with: a continuously scrolling strip of cards with 3D icons (pauses on hover)
export function IndustriesMarquee() {
  return (
    <section className="overflow-hidden bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <p data-aos="fade-up" className="flex items-center justify-center gap-3 font-mono text-[12px] font-medium uppercase tracking-[0.22em] text-cobalt">
          <span aria-hidden className="h-px w-8 bg-cobalt/40" />
          Industries
          <span aria-hidden className="h-px w-8 bg-cobalt/40" />
        </p>
        <h2 data-aos="fade-up" data-aos-delay="100" className="mt-5 text-[clamp(2.1rem,4vw,3.4rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-ink">
          Built for businesses in <span className={`${serif.className} whitespace-nowrap tracking-normal text-cobalt`}>every sector.</span>
        </h2>
        <p data-aos="fade-up" data-aos-delay="150" className="mx-auto mt-4 max-w-[52ch] text-[16.5px] leading-relaxed text-slate">
          From local businesses to growing brands, we build technology for teams across many industries.
        </p>
      </div>

      {/* the strip is listed twice so it can loop without a gap; screen readers read the list once */}
      <div className="marquee mt-12 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="marquee-track flex w-max py-3">
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1 || undefined} className="flex shrink-0 gap-4 pr-4">
              {industries.map((x) => (
                <Card key={x.name} {...x} />
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
