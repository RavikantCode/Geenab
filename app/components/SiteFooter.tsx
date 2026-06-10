"use client";

// ─────────────────────────────────────────────────────────────────────────────
// SiteFooter — shared across all Geenab Infra pages
// Background: inverse-surface (#32302b) — NOT black
// ─────────────────────────────────────────────────────────────────────────────

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "Browse Equipment", href: "/browse" },
  { label: "Services", href: "#" },
  { label: "Projects", href: "#" },
  { label: "About Us", href: "#" },
  { label: "Contact Us", href: "/contact" },
  { label: "List Your Machine", href: "#", highlight: true },
];

const COMPANY_LINKS = [
  { label: "Our Story", href: "#" },
  { label: "Mission & Vision", href: "#" },
  { label: "Completed Projects", href: "#" },
  { label: "Our Fleet", href: "/browse" },
  { label: "Clients", href: "#" },
  { label: "Terms of Use", href: "#" },
  { label: "Privacy Policy", href: "#" },
];

const SOCIAL = [
  {
    label: "Facebook",
    href: "#",
    svg: (
      <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    svg: (
      <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.805.249 2.227.412.56.216.96.474 1.38.894.42.42.678.82.894 1.38.163.422.358 1.057.412 2.227.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.249 1.805-.412 2.227-.216.56-.474.96-.894 1.38-.42.42-.82.678-1.38.894-.422.163-1.057.358-2.227.412-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.805-.249-2.227-.412-.56-.216-.96-.474-1.38-.894-.42-.42-.678-.82-.894-1.38-.163-.422-.358-1.057-.412-2.227C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.054-1.17.249-1.805.412-2.227.216-.56.474-.96.894-1.38.42-.42.82-.678 1.38-.894.422-.163 1.057-.358 2.227-.412C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.333.014 7.053.072 5.776.129 4.904.331 4.141.628c-.788.306-1.457.716-2.122 1.383-.667.665-1.077 1.334-1.383 2.122-.297.763-.499 1.635-.556 2.912C.022 8.325 0 8.733 0 12s.022 3.675.08 4.955c.057 1.277.259 2.149.556 2.912.306.788.716 1.457 1.383 2.122.665.667 1.334 1.077 2.122 1.383.763.297 1.635.499 2.912.556C8.333 23.986 8.741 24 12 24s3.667-.014 4.947-.072c1.277-.057 2.149-.259 2.912-.556.788-.306 1.457-.716 2.122-1.383.667-.665 1.077-1.334 1.383-2.122.297-.763.499-1.635.556-2.912.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.057-1.277-.259-2.149-.556-2.912-.306-.788-.716-1.457-1.383-2.122C20.457 1.344 19.788.934 19 .628 18.237.331 17.365.129 16.088.072 14.808.014 14.4 0 12 0z" />
        <path d="M12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: "X / Twitter",
    href: "#",
    svg: (
      <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    svg: (
      <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    svg: (
      <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

export default function SiteFooter() {
  const marqueeText =
    "INDIA'S FIRST UNDERGROUND UTILITY MACHINERY MARKETPLACE · RENT · BUY · SELL · EXECUTE · PAN-INDIA NETWORK \u00a0 · \u00a0 ";

  return (
    <>
      {/* ── Marquee Ticker ── */}
      <div
        className="h-[52px] flex items-center overflow-hidden border-t border-b border-white/10"
        style={{ backgroundColor: "#FF5C00" }}
      >
        <div
          className="flex items-center whitespace-nowrap"
          style={{
            display: "inline-flex",
            animation: "geenab-marquee 30s linear infinite",
          }}
        >
          {[...Array(6)].map((_, i) => (
            <span
              key={i}
              className="text-[11px] font-semibold tracking-[0.2em] text-white uppercase px-4"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {marqueeText}
            </span>
          ))}
        </div>

        <style>{`
          @keyframes geenab-marquee {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>

      {/* ── Main Footer ── */}
      {/* Background: inverse-surface #32302b (dark warm charcoal, NOT black) */}
      <footer
        className="pt-16 pb-8 px-6 lg:px-16"
        style={{ backgroundColor: "#32302b" }}
      >
        <div className="max-w-7xl mx-auto">

          {/* ── 4-column grid ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

            {/* Col 1 — Brand + Contact */}
            <div className="space-y-6">
              <div>
                <h2
                  className="text-[22px] font-black tracking-tight uppercase leading-none text-white"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  GEENAB INFRA
                </h2>
                <div className="w-10 h-[2px] mt-2" style={{ backgroundColor: "#FF5C00" }} />
              </div>

              <p className="text-sm leading-relaxed max-w-xs" style={{ color: "#9ca3af" }}>
                Building the foundations of modern India with precision-engineered underground solutions.
              </p>

              <div className="space-y-4">
                <div>
                  <span
                    className="text-[10px] font-semibold tracking-widest uppercase block mb-1"
                    style={{ color: "#FF5C00", fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    REGISTERED OFFICE
                  </span>
                  <p className="text-sm leading-relaxed" style={{ color: "#d1d5db" }}>
                    Parihar Apartment,Patel Estate Rd,<br />
                    Near Amboli Police Station,BR Nagar,<br />
                    Jogeshwari (West), Mumbai,<br/>
                    Maharashtra 401102
                  </p>
                </div>

                <div className="space-y-1.5">
                  <p className="text-sm flex items-center gap-2 text-white">
                    <span
                      className="text-xs font-semibold"
                      style={{ color: "#FF5C00", fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      EMAIL:
                    </span>
                    <a
                      href="mailto:info@geenabinfra.com"
                      className="transition-colors"
                      style={{ color: "#d1d5db" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#FF5C00")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#d1d5db")}
                    >
                      info@geenabinfra.com
                    </a>
                  </p>
                  <p className="text-sm flex items-center gap-2 text-white">
                    <span
                      className="text-xs font-semibold"
                      style={{ color: "#FF5C00", fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      TEL:
                    </span>
                    <a
                      href="tel:+91-9987168792"
                      className="transition-colors"
                      style={{ color: "#d1d5db" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#FF5C00")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#d1d5db")}
                    >
                      +91-9987168792
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Col 2 — Quick Links */}
            <div>
              <h3
                className="text-[10px] font-semibold tracking-[0.2em] uppercase pb-2 mb-6 inline-block"
                style={{
                  color: "white",
                  borderBottom: "1px solid rgba(255,255,255,0.15)",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                QUICK LINKS
              </h3>
              <ul className="space-y-3">
                {QUICK_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm inline-block transition-all duration-150"
                      style={{
                        color: link.highlight ? "#FF5C00" : "#9ca3af",
                        fontWeight: link.highlight ? 600 : 400,
                      }}
                      onMouseEnter={(e) => {
                        if (!link.highlight) e.currentTarget.style.color = "white";
                        e.currentTarget.style.transform = "translateX(4px)";
                      }}
                      onMouseLeave={(e) => {
                        if (!link.highlight) e.currentTarget.style.color = "#9ca3af";
                        e.currentTarget.style.transform = "translateX(0)";
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3 — Company */}
            <div>
              <h3
                className="text-[10px] font-semibold tracking-[0.2em] uppercase pb-2 mb-6 inline-block"
                style={{
                  color: "white",
                  borderBottom: "1px solid rgba(255,255,255,0.15)",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                COMPANY
              </h3>
              <ul className="space-y-3">
                {COMPANY_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm inline-block transition-all duration-150"
                      style={{ color: "#9ca3af" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "white";
                        e.currentTarget.style.transform = "translateX(4px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "#9ca3af";
                        e.currentTarget.style.transform = "translateX(0)";
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4 — Mobile App + Social */}
            <div className="space-y-10">
              {/* App download */}
              <div>
                <h3
                  className="text-[10px] font-semibold tracking-[0.2em] uppercase mb-4 text-white"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  GEENAB INFRA ON MOBILE
                </h3>
                <div className="flex items-start gap-4">
                  {/* QR Code */}
                  <div
                    className="w-[90px] h-[90px] p-1 bg-white flex-shrink-0 flex items-center justify-center"
                    style={{ border: "4px solid #FF5C00" }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGD38i8gPMGCR8E_AWPttwHQhYSkYIseX_X3fwRRoM3a3hmrV_x-RT3OjwGeQER1ANyX8fjgqjC3iQK5h_RYPmfObcZ44i1365oBkOQJWVqQ5ezbwti7bghXFFeoH2C_m78lqUaJtMU9AtL60xU68_Ej6TynQoorXLKftklSY_vY99bj-63v9Y9kSBvN9pPxaCkG77nLDqDhxg588Rz5lp3Gl5KWyCzHTN1vk2gkHRHNaYAohRBmY8LVTy8YAq7tuoTdhwMh5GA4YS"
                      alt="Scan to download the Geenab Infra app"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Store buttons */}
                  <div className="flex flex-col gap-2">
                    <button
                      className="px-3 py-2 flex items-center gap-2 w-32 transition-colors"
                      style={{
                        backgroundColor: "#1c1b18",
                        border: "1px solid rgba(255,255,255,0.15)",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#2a2925")}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#1c1b18")}
                    >
                      <svg className="w-5 h-5 fill-white flex-shrink-0" viewBox="0 0 24 24">
                        <path d="M17.05 20.28c-.96.95-2.04.83-3.04.38-1.07-.47-2.02-.48-3.13 0-1.39.6-2.18.49-3.01-.38C3.6 16.03 4.25 9.04 8.1 8.87c1.13.06 1.88.66 2.58.66.71 0 1.76-.78 3.19-.62 1.34.15 2.37.7 3.03 1.63-2.73 1.64-2.28 5.17.43 6.27-.61 1.54-1.43 2.57-2.28 3.47zM12 8.08c-.04-2.17 1.81-4.04 3.93-4.08.28 2.34-2.11 4.28-3.93 4.08z" />
                      </svg>
                      <div className="text-left">
                        <p className="text-[8px] uppercase leading-none text-white/60">Download on</p>
                        <p className="text-[11px] font-bold text-white">App Store</p>
                      </div>
                    </button>

                    <button
                      className="px-3 py-2 flex items-center gap-2 w-32 transition-colors"
                      style={{
                        backgroundColor: "#1c1b18",
                        border: "1px solid rgba(255,255,255,0.15)",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#2a2925")}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#1c1b18")}
                    >
                      <svg className="w-5 h-5 fill-white flex-shrink-0" viewBox="0 0 24 24">
                        <path d="M3.609 1.814L13.792 12 3.61 22.186c-.18.179-.311.411-.311.688 0 .225.074.428.196.594L14.717 13.25l3.854 3.854 4.316-2.484c1.233-.711 1.233-1.874 0-2.585L18.571 9.55l-3.854 3.854L3.495.932c-.122.166-.196.369-.196.594 0 .277.131.509.31.688z" />
                      </svg>
                      <div className="text-left">
                        <p className="text-[8px] uppercase leading-none text-white/60">Get it on</p>
                        <p className="text-[11px] font-bold text-white">Google Play</p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div>
                <h3
                  className="text-[10px] font-semibold tracking-[0.2em] uppercase mb-4 text-white"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  FOLLOW US
                </h3>
                <div className="flex gap-3 flex-wrap">
                  {SOCIAL.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      aria-label={s.label}
                      className="w-9 h-9 flex items-center justify-center transition-all duration-200"
                      style={{ border: "1px solid rgba(255,255,255,0.2)" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#FF5C00";
                        e.currentTarget.style.borderColor = "#FF5C00";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                      }}
                    >
                      {s.svg}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Divider ── */}
          <div className="w-full h-px mb-8" style={{ backgroundColor: "rgba(255,255,255,0.1)" }} />

          {/* ── Bottom bar ── */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p
              className="text-[11px] uppercase tracking-wider"
              style={{ color: "#6b7280", fontFamily: "'JetBrains Mono', monospace" }}
            >
              © 2026 GEENAB INFRASTRUCTURE PRIVATE LIMITED. ALL RIGHTS RESERVED.
            </p>

            <div className="flex gap-6">
              {["Terms", "Privacy", "Sitemap"].map((label) => (
                <a
                  key={label}
                  href="#"
                  className="text-[10px] uppercase tracking-widest transition-colors duration-150"
                  style={{ color: "#6b7280", fontFamily: "'JetBrains Mono', monospace" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7280")}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
