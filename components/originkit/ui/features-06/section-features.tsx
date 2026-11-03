// Delivered by Originkit · stack: nextjs · styling: tailwind
/* eslint-disable */
// @ts-nocheck
"use client"
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import TextOrbitMarquee from "@/components/originkit/ui/features-06/text-orbit-marquee";

export function SectionFeatures() {
  const [mounts, setMounts] = useState([]);
  useEffect(() => runPageScript({ TextOrbitMarquee }, setMounts), []);
  return (
    <div className="features-06">
    <>
      <section className="int">
        <div className="head">
          <h2>Works with the tools you already pay for</h2>
          <p>
            Relay listens to 140 apps, retries what fails, and hands your code one clean event,
            whichever tool it came from.
          </p>
        </div>
        <div className="filters" role="group" aria-label="Filter integrations">
          <button aria-pressed="true" data-cat="all">
            All
          </button>
          <button aria-pressed="false" data-cat="payments">
            Payments
          </button>
          <button aria-pressed="false" data-cat="messaging">
            Messaging
          </button>
          <button aria-pressed="false" data-cat="dev">
            Developer
          </button>
          <button aria-pressed="false" data-cat="commerce">
            Commerce
          </button>
          <button aria-pressed="false" data-cat="crm">
            CRM
          </button>
        </div>
        <div className="wall" id="wall">
          <div className="core">
            <div id="globe" aria-label="A globe of every integration name; grab it to spin" />
            <span className="count">
              <b>140</b> integrations · grab to spin
            </span>
          </div>
        </div>
        <div className="foot">
          <a href="#">Browse all 140 →</a>
          <span>Missing one? We build most requests within two weeks.</span>
        </div>
      </section>
      {mounts.map((m) => createPortal(m.element, m.el, m.id))}
    </>
    </div>
  );
}

// The section's own script, kept exactly as written so its behaviour (clicks, timers, mode
// switches) stays identical. Its OKReact.mount / ReactDOM.createRoot calls go through the
// adapter below: each "root" is an entry in the section's state, rendered as a portal into its
// element, so everything stays in the host's one React tree (no second react-dom needed).
function runPageScript({ TextOrbitMarquee }, setMounts) {
  let next = 0;
  const timers = [];
  const createRoot = (el) => {
    const id = "m" + next++;
    return {
      render: (element) =>
        setMounts((ms) =>
          ms.some((m) => m.id === id)
            ? ms.map((m) => (m.id === id ? { id, el, element } : m))
            : [...ms, { id, el, element }],
        ),
      unmount: () => setMounts((ms) => ms.filter((m) => m.id !== id)),
    };
  };
  const ReactDOM = { createRoot };
  const OKReact = {
    mount(Comp, el, props) {
      const root = createRoot(el);
      root.render(React.createElement(Comp, props));
      return { el, update: (next) => root.render(React.createElement(Comp, next)) };
    },
  };
  const setInterval = (...a) => (timers.push(window.setInterval(...a)), timers.at(-1));
  const setTimeout = (...a) => (timers.push(window.setTimeout(...a)), timers.at(-1));
  // The real IntersectionObserver, plus a fallback that measures the element itself: a host that
  // attaches the section before its frame renders (OriginKit's preview, hidden tabs, modals) can
  // leave the browser's first notification undelivered, and a scroll-in effect would never start.
  class IntersectionObserver {
    constructor(cb, opts = {}) {
      this.cb = cb;
      this.targets = new Set();
      this.seen = new Map();
      this.off = false;
      const th = [].concat(opts.threshold ?? 0)[0];
      this.real = new window.IntersectionObserver((entries) => {
        for (const e of entries) this.seen.set(e.target, e.isIntersecting);
        if (!this.off) cb(entries, this);
      }, opts);
      this.check = () => {
        for (const t of this.targets) {
          if (this.off || this.seen.get(t)) continue;
          const r = t.getBoundingClientRect(),
            vw = window.innerWidth,
            vh = window.innerHeight;
          const w = Math.max(0, Math.min(r.right, vw) - Math.max(r.left, 0)),
            h = Math.max(0, Math.min(r.bottom, vh) - Math.max(r.top, 0));
          const ratio = r.width && r.height ? (w * h) / (r.width * r.height) : 0;
          if (ratio > 0 && ratio >= th) {
            this.seen.set(t, true);
            cb(
              [
                {
                  target: t,
                  isIntersecting: true,
                  intersectionRatio: ratio,
                  boundingClientRect: r,
                },
              ],
              this,
            );
          }
        }
      };
      window.addEventListener("scroll", this.check, true);
      window.addEventListener("resize", this.check);
    }
    observe(t) {
      this.targets.add(t);
      this.real.observe(t);
      timers.push(window.setTimeout(this.check, 300), window.setTimeout(this.check, 1200));
    }
    unobserve(t) {
      this.targets.delete(t);
      this.real.unobserve(t);
    }
    disconnect() {
      this.off = true;
      this.targets.clear();
      this.real.disconnect();
      window.removeEventListener("scroll", this.check, true);
      window.removeEventListener("resize", this.check);
    }
  }

  // [name, category, brand colour, Simple Icons slug]; icons are CC0 from simple-icons, pinned.
  const ICONS = "https://cdn.jsdelivr.net/npm/simple-icons@13.21.0/icons/";
  const TOOLS = [
    ["Stripe", "payments", "#635BFF", "stripe"],
    ["Paddle", "payments", "#FDDD35", "paddle"],
    ["Adyen", "payments", "#0ABF53", "adyen"],
    ["PayPal", "payments", "#003087", "paypal"],
    ["Slack", "messaging", "#4A154B", "slack"],
    ["Twilio", "messaging", "#F22F46", "twilio"],
    ["Intercom", "messaging", "#1F8DED", "intercom"],
    ["Resend", "messaging", "#000000", "resend"],
    ["GitHub", "dev", "#181717", "github"],
    ["Linear", "dev", "#5E6AD2", "linear"],
    ["Sentry", "dev", "#362D59", "sentry"],
    ["Vercel", "dev", "#000000", "vercel"],
    ["Shopify", "commerce", "#7AB55C", "shopify"],
    ["WooCommerce", "commerce", "#96588A", "woocommerce"],
    ["BigCommerce", "commerce", "#121118", "bigcommerce"],
    ["Gumroad", "commerce", "#FF90E8", "gumroad"],
    ["HubSpot", "crm", "#FF7A59", "hubspot"],
    ["Salesforce", "crm", "#00A1E0", "salesforce"],
    ["Zendesk", "crm", "#03363D", "zendesk"],
    ["Zoho", "crm", "#E42527", "zoho"],
  ];
  const LABEL = {
    payments: "Payments",
    messaging: "Messaging",
    dev: "Developer",
    commerce: "Commerce",
    crm: "CRM",
  };
  const wall = document.getElementById("wall"),
    core = wall.querySelector(".core");
  // Tiles around the globe: the real mark, white on its brand colour (dark on the two light ones).
  wall.insertAdjacentHTML(
    "beforeend",
    TOOLS.map(
      ([name, cat, color, icon]) =>
        `<a class="tool" href="#" data-cat="${cat}"><span class="logo" style="background:${color}"><i style="--icon:url(${ICONS + icon}.svg);background:${/FDDD35|FF90E8/.test(color) ? "#0E0F12" : "#fff"}"></i></span><div><b>${name}</b><span>${LABEL[cat]}</span></div></a>`,
    ).join(""),
  );

  // Category filter: matching tools stay, the rest dim, so the grid never reflows under the pointer.
  for (const b of document.querySelectorAll(".filters button"))
    b.onclick = () => {
      for (const x of document.querySelectorAll(".filters button"))
        x.setAttribute("aria-pressed", String(x === b));
      for (const t of wall.querySelectorAll(".tool"))
        t.classList.toggle("dim", b.dataset.cat !== "all" && t.dataset.cat !== b.dataset.cat);
    };

  // Every tool Relay connects, repeated around rings that fan open into a globe and fold back.
  // Its size is in pixels, so it follows the tile.
  const el = document.getElementById("globe"),
    root = ReactDOM.createRoot(el);
  const draw = () =>
    root.render(
      React.createElement(TextOrbitMarquee, {
        text: "STRIPE · SLACK · GITHUB · SHOPIFY · HUBSPOT · TWILIO · LINEAR · ",
        background: "#0E0F12",
        color: "#9DB0FF",
        rings: 6,
        size: Math.round(Math.min(el.clientWidth, el.clientHeight) * 0.8),
        drag: true,
        lens: 3,
        speed: 40,
        advanced: { repeats: 2, letterScale: 90 },
        font: { fontFamily: '"Rethink Sans", sans-serif', fontWeight: 600, fontSize: "16px" },
        style: { width: "100%", height: "100%" },
      }),
    );
  document.fonts.load('600 16px "Rethink Sans"').finally(draw);
  new ResizeObserver(draw).observe(el);

  return () => {
    timers.forEach((id) => {
      window.clearInterval(id);
      window.clearTimeout(id);
    });
    setMounts([]);
  };
}
