"use client";
import SiteFooter from "@/components/SiteFooter";
import { useEffect, useRef, useState, useCallback } from "react";

// ─── Utils ───────────────────────────────────────────────────────────────────
function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(" ");
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    import("gsap").then(({ gsap }) => {
      gsap.fromTo(ref.current,
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      );
    });
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = ["ASSETS", "PROJECTS", "LOGISTICS", "SPECS"];

  return (
    <nav
      ref={ref}
      className={cn(
        "w-full sticky top-0 z-50 bg-[#fdf9f4] border-b border-[#C8C0B4] flex justify-between items-center h-20 px-8 md:px-16 transition-shadow duration-150",
        scrolled && "shadow-md"
      )}
      style={{ opacity: 0 }}
    >
      <a
        href="/"
        className="font-bold text-[32px] tracking-[-0.04em] text-black leading-none select-none"
        style={{ fontFamily: "'JetBrains Mono', monospace", cursor: "crosshair" }}
      >
        INFRASTRUCTURE_X
      </a>

      {/* Desktop links */}
      <div className="hidden md:flex gap-8">
        {links.map((l) => (
          <a
            key={l}
            href="#"
            className="text-[#444748] text-[10px] font-semibold tracking-[0.2em] hover:bg-[#ebe8e3] px-2 py-1 transition-colors duration-150"
            style={{ cursor: "crosshair" }}
          >
            {l}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <button
          className="bg-black text-white px-8 py-3 text-[10px] font-semibold tracking-[0.2em] hover:bg-[#a33800] transition-colors duration-150 hidden md:block"
          style={{ cursor: "crosshair" }}
        >
          GET A QUOTE
        </button>
        {/* Mobile toggle */}
        <button
          className="md:hidden text-black font-bold text-xl"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ cursor: "crosshair" }}
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-[#fdf9f4] border-b border-[#C8C0B4] flex flex-col px-8 py-6 gap-4 z-50">
          {links.map((l) => (
            <a key={l} href="#" className="text-[10px] font-semibold tracking-[0.2em] text-[#444748] py-1" style={{ cursor: "crosshair" }}>
              {l}
            </a>
          ))}
          <button className="bg-black text-white px-6 py-3 text-[10px] font-semibold tracking-[0.2em] mt-2" style={{ cursor: "crosshair" }}>
            GET A QUOTE
          </button>
        </div>
      )}
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const textRef = useRef<HTMLDivElement>(null);
  const stripeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import("gsap").then(({ gsap }) => {
      const tl = gsap.timeline({ delay: 0.2 });
      tl.fromTo(textRef.current,
        { x: -60, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );
      tl.fromTo(stripeRef.current,
        { scaleX: 0, transformOrigin: "right center" },
        { scaleX: 1, duration: 0.7, ease: "power3.out" },
        "-=0.5"
      );
      // Animate stripes drift
      gsap.to(stripeRef.current, {
        backgroundPosition: "80px 0",
        duration: 3,
        ease: "none",
        repeat: -1,
      });
    });
  }, []);

  return (
    <section
      className="h-[460px] bg-black flex items-center overflow-hidden border-b border-[#C8C0B4]"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 w-full h-full">
        {/* Text */}
        <div ref={textRef} className="md:col-span-8 flex flex-col justify-center px-8 md:px-16 py-12" style={{ opacity: 0 }}>
          <span
            className="text-[#a33800] text-[10px] font-semibold tracking-[0.2em] mb-4"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            GET IN TOUCH
          </span>
          <h1
            className="text-white uppercase font-black"
            style={{
              fontFamily: "'JetBrains Mono', 'Barlow Condensed', monospace",
              fontSize: "clamp(3rem, 7vw, 6rem)",
              lineHeight: 0.92,
              letterSpacing: "-0.04em",
            }}
          >
            Let&apos;s Move Your<br />Project Forward.
          </h1>
        </div>

        {/* Hazard stripes */}
        <div
          ref={stripeRef}
          className="md:col-span-4 h-full hidden md:block"
          style={{
            background: "repeating-linear-gradient(45deg, #FFB800, #FFB800 20px, #0A0A0A 20px, #0A0A0A 40px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>
    </section>
  );
}

// ─── Contact Form ─────────────────────────────────────────────────────────────
function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [focusedLabel, setFocusedLabel] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "", company: "", phone: "", location: "", service: "HEAVY MACHINERY RENTAL", message: "",
  });

  const handleFocus = (name: string) => setFocusedLabel(name);
  const handleBlur = () => setFocusedLabel(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    import("gsap").then(({ gsap }) => {
      gsap.fromTo(formRef.current,
        { x: 0 },
        { x: [-8, 8, -6, 6, -3, 3, 0], duration: 0.4, ease: "power2.inOut", onComplete: () => setSubmitted(true) }
      );
    });
  };

  const labelClass = (name: string) =>
    cn(
      "text-[10px] font-semibold tracking-[0.2em] transition-colors duration-150",
      focusedLabel === name ? "text-[#cd4800]" : "text-[#444748]"
    );

  const inputClass =
    "bg-[#EDE8E1] border border-[#C8C0B4] p-[14px] text-[15px] text-black leading-relaxed focus:ring-2 focus:ring-[#a33800] outline-none w-full transition-all duration-150";

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center gap-6">
        <div
          className="w-16 h-16 bg-[#a33800] flex items-center justify-center text-white text-[32px] font-black"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          ✓
        </div>
        <h3
          className="text-[32px] font-bold text-black uppercase tracking-[-0.01em]"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Enquiry Sent
        </h3>
        <p className="text-[#444748] text-[15px] max-w-sm">
          Our team will respond within 2 hours for urgent site requirements.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="bg-black text-white px-8 py-3 text-[10px] font-semibold tracking-[0.2em] hover:bg-[#a33800] transition-colors"
          style={{ cursor: "crosshair" }}
        >
          SEND ANOTHER
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className={labelClass("name")}>FULL NAME</label>
          <input
            required
            type="text"
            placeholder="Enter name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            onFocus={() => handleFocus("name")}
            onBlur={handleBlur}
            className={inputClass}
            style={{ cursor: "crosshair" }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className={labelClass("company")}>COMPANY NAME</label>
          <input
            type="text"
            placeholder="Legal entity"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            onFocus={() => handleFocus("company")}
            onBlur={handleBlur}
            className={inputClass}
            style={{ cursor: "crosshair" }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className={labelClass("phone")}>PHONE NUMBER</label>
          <input
            required
            type="tel"
            placeholder="+91 000 000 0000"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            onFocus={() => handleFocus("phone")}
            onBlur={handleBlur}
            className={inputClass}
            style={{ cursor: "crosshair" }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className={labelClass("location")}>SITE LOCATION / CITY</label>
          <input
            type="text"
            placeholder="City, State"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            onFocus={() => handleFocus("location")}
            onBlur={handleBlur}
            className={inputClass}
            style={{ cursor: "crosshair" }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className={labelClass("service")}>SERVICE REQUIRED</label>
        <select
          value={form.service}
          onChange={(e) => setForm({ ...form, service: e.target.value })}
          onFocus={() => handleFocus("service")}
          onBlur={handleBlur}
          className={inputClass}
          style={{ cursor: "crosshair" }}
        >
          <option>HEAVY MACHINERY RENTAL</option>
          <option>PROJECT LOGISTICS</option>
          <option>SITE CLEARANCE</option>
          <option>CIVIL ENGINEERING</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label className={labelClass("message")}>YOUR REQUIREMENT</label>
        <textarea
          required
          rows={4}
          placeholder="Describe the scope of work..."
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          onFocus={() => handleFocus("message")}
          onBlur={handleBlur}
          className={`${inputClass} resize-none`}
          style={{ cursor: "crosshair" }}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-[#a33800] text-white py-6 text-[18px] font-semibold tracking-[0.2em] hover:bg-black transition-all duration-300 flex items-center justify-center gap-3 group"
        style={{ cursor: "crosshair" }}
      >
        SEND ENQUIRY
        <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform duration-300">arrow_forward</span>
      </button>

      <p
        className="text-[#444748] text-[11px] uppercase tracking-[0.1em]"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        * We respond within 2 hours for urgent site requirements.
      </p>
    </form>
  );
}

// ─── Contact Details ──────────────────────────────────────────────────────────
function ContactDetails() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import("gsap").then(({ gsap, ScrollTrigger }) => {
      gsap.registerPlugin(ScrollTrigger);
      gsap.fromTo(
        Array.from(ref.current?.querySelectorAll(".detail-row") ?? []),
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 80%" },
        }
      );
    });
  }, []);

  return (
    <div ref={ref} className="flex flex-col gap-12">
      <div>
        <span
          className="text-[#a33800] text-[10px] font-semibold tracking-[0.2em] mb-4 block"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          REACH US DIRECTLY
        </span>
        <h3
          className="text-[32px] font-bold text-black tracking-[-0.01em] mb-8 uppercase"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Geenab Infra
        </h3>
      </div>

      <div className="space-y-8">
        {[
          {
            label: "REGISTERED OFFICE",
            lines: ["Plot 44-B, Industrial Estate Sector 2,", "Jogeshwari West, Mumbai, MH 400102"],
          },
          {
            label: "EMAIL INQUIRIES",
            lines: ["projects@geenabinfra.com", "ops@geenabinfra.com"],
          },
          {
            label: "PHONE SUPPORT",
            lines: ["+91 (22) 4958-3000", "+91 98920 44XXX"],
          },
        ].map((item) => (
          <div key={item.label} className="border-b border-[#C8C0B4] pb-6 detail-row">
            <label
              className="text-[#a33800] text-[10px] font-semibold tracking-[0.2em] mb-2 block"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {item.label}
            </label>
            {item.lines.map((line) => (
              <p key={line} className="text-[18px] text-black uppercase font-normal leading-relaxed">
                {line}
              </p>
            ))}
          </div>
        ))}
      </div>

      {/* Urgent card */}
      <div className="bg-black p-8 text-white flex flex-col gap-6 detail-row">
        <p className="text-[18px] font-bold leading-tight uppercase">
          Call us directly — we respond within 2 hours for active site emergencies.
        </p>
        <button
          className="border border-white text-white py-4 px-6 text-[10px] font-semibold tracking-[0.2em] hover:bg-[#a33800] hover:border-[#a33800] transition-all flex items-center justify-between w-full group"
          style={{ cursor: "crosshair" }}
        >
          CALL NOW
          <span className="material-symbols-outlined group-hover:scale-110 transition-transform">call</span>
        </button>
      </div>
    </div>
  );
}

// ─── Map Section ──────────────────────────────────────────────────────────────
function MapSection() {
  const ref = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import("gsap").then(({ gsap, ScrollTrigger }) => {
      gsap.registerPlugin(ScrollTrigger);
      gsap.fromTo(ref.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, scrollTrigger: { trigger: ref.current, start: "top 85%" } }
      );
      // Pulsing pin
      gsap.to(pinRef.current, {
        scale: 1.15, duration: 1, ease: "sine.inOut", repeat: -1, yoyo: true,
      });
    });
  }, []);

  return (
    <section className="w-full">
      {/* Coordinates bar */}
      <div className="px-8 md:px-16 py-4 flex justify-between items-center border-t border-[#C8C0B4] bg-[#EDE8E1]">
        <span
          className="text-[#444748] text-[12px] tracking-[0.2em]"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          18° 55&apos; 26&quot; N &nbsp;·&nbsp; 72° 50&apos; 35&quot; E &nbsp;·&nbsp; JOGESHWARI WEST, MUMBAI
        </span>
        <span
          className="text-[#a33800] text-[12px] tracking-[0.2em]"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          STATUS: ACTIVE
        </span>
      </div>

      {/* Map */}
      <div
        ref={ref}
        className="w-full h-[400px] border-y border-[#C8C0B4] relative overflow-hidden"
        style={{ filter: "grayscale(1) contrast(1.2)" }}
      >
        {/* Fallback grid bg */}
        <div
          className="absolute inset-0 bg-[#EDE8E1]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.08) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Map image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmz3eqhi_GWiVf_BiOk6hv19M7cmZxbvOv0rLM4Ew5n3FHuZ4I4LzaHfsGoIrjZ0Obla1B82pQxkpCSMS0AFpmLvewfPG_vEaLDOmnT7sKLLMjMe1AwlPd2loKPmEQZxKQFaECmzplJkhLZYumymOp8kApY4K2lr7cpTGuz1qCReyjxO5FdHfoHE4Z4LaCJceaOAyPDRYTF0JBeKKcs764ISogFywNCIGZ_BFWxzCDBtzn0p66N1sScR5ASYxzSEg6doUOa2UHK045"
          alt="Mumbai industrial map"
          className="w-full h-full object-cover relative z-10"
        />

        {/* Pin */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
          <div
            ref={pinRef}
            className="w-8 h-8 bg-[#a33800] border-2 border-black"
            style={{ filter: "drop-shadow(0 0 12px rgba(163,56,0,0.6))" }}
          />
          <div
            className="bg-black text-white px-3 py-1 text-[10px] font-semibold tracking-[0.2em] mt-2 whitespace-nowrap"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            GEENAB INFRA HQ
          </div>
        </div>

        {/* Corner reticle decorations */}
        {["top-3 left-3", "top-3 right-3", "bottom-3 left-3", "bottom-3 right-3"].map((pos) => (
          <div
            key={pos}
            className={`absolute ${pos} z-20 w-5 h-5 border-2 border-[#a33800]`}
            style={{ borderRadius: 0 }}
          />
        ))}
      </div>
    </section>
  );
}

// ─── Bottom CTA ───────────────────────────────────────────────────────────────
function BottomCTA() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    import("gsap").then(({ gsap, ScrollTrigger }) => {
      gsap.registerPlugin(ScrollTrigger);
      gsap.fromTo(ref.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top 90%" } }
      );
    });
  }, []);

  return (
    <section
      ref={ref}
      className="bg-black py-12 md:h-[120px] flex items-center border-t border-[#C8C0B4]"
    >
      <div className="px-8 md:px-16 w-full flex flex-col md:flex-row justify-between items-center gap-8">
        <h2
          className="text-white uppercase font-black leading-none"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "clamp(1.8rem, 4vw, 3rem)",
            letterSpacing: "-0.02em",
          }}
        >
          Your machines. Your site. Our network.
        </h2>
        <button
          className="bg-[#a33800] text-white px-12 py-5 text-[16px] font-semibold tracking-[0.2em] hover:bg-[#fdf9f4] hover:text-black transition-all duration-300 whitespace-nowrap"
          style={{ cursor: "crosshair" }}
        >
          GET STARTED →
        </button>
      </div>
    </section>
  );
}

// Footer replaced by shared <SiteFooter /> component

// ─── Main Section (Form + Details) ───────────────────────────────────────────
function MainSection() {
  const formColRef = useRef<HTMLDivElement>(null);
  const detailColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import("gsap").then(({ gsap, ScrollTrigger }) => {
      gsap.registerPlugin(ScrollTrigger);
      gsap.fromTo(formColRef.current,
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: formColRef.current, start: "top 85%" } }
      );
      gsap.fromTo(detailColRef.current,
        { x: 40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: detailColRef.current, start: "top 85%" } }
      );
    });
  }, []);

  return (
    <section className="bg-[#fdf9f4] py-24 md:py-36 px-8 md:px-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-24">
        {/* LEFT: Form */}
        <div
          ref={formColRef}
          className="lg:border-r border-[#C8C0B4] lg:pr-20"
          style={{ opacity: 0 }}
        >
          <span
            className="text-[#a33800] text-[10px] font-semibold tracking-[0.2em] mb-4 block"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            SEND AN ENQUIRY
          </span>
          <h3
            className="text-[32px] font-bold text-black tracking-[-0.01em] mb-12 uppercase"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Tell Us What You Need
          </h3>
          <ContactForm />
        </div>

        {/* RIGHT: Contact details */}
        <div ref={detailColRef} style={{ opacity: 0 }}>
          <ContactDetails />
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ContactPage() {
  // Global crosshair cursor style via a style tag effect
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = "* { cursor: crosshair !important; }";
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  return (
    <div className="min-h-screen bg-[#fdf9f4] text-black overflow-x-hidden">
      <Navbar />
      <Hero />
      <MainSection />
      <MapSection />
      <BottomCTA />
      <SiteFooter />
    </div>
  );
}
