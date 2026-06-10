"use client";
import SiteFooter from "@/components/SiteFooter";

import { useEffect, useRef, useState, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

// ─── Shared Equipment Data (mirrors browse/page.tsx) ─────────────────────────
interface Equipment {
  id: number;
  category: string;
  name: string;
  price: string;
  priceNum: number; // numeric for totals
  unit: string;
  year: number;
  hours: number | null;
  location: string;
  availability: "available" | "soon" | "unavailable";
  availabilityLabel: string;
  listingType: "rent" | "sale" | "both";
  badge?: string;
  image: string;
  verified?: boolean;
  // Specs
  operatingWeight: string;
  enginePower: string;
  bucketCapacity: string;
  maxDigDepth: string;
  warranty: string;
  fuelConsumption: string;
}

const ALL_EQUIPMENT: Equipment[] = [
  {
    id: 1,
    category: "Excavators",
    name: "Caterpillar 320 GC",
    price: "₹42,000",
    priceNum: 4200000,
    unit: "/ Day",
    year: 2022,
    hours: 1200,
    location: "Mumbai",
    availability: "available",
    availabilityLabel: "Available Now",
    listingType: "rent",
    badge: "Best Seller",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBlBtr78BzswxmTIvaC6g4OJN5ZT7v9OMpigbydEbPdvBSxK7H-ZIq9Azk5uLeoVDCdwQQzhLW1J_Nif3XeGAmR2QwyZ6U3DUaLr9iqsVd-FdOJ7llu86_gUNOkcRSGY4x7JT4D4cS1VpuA6fhAqgSKoTMob6IEynzMiv6fcYMRnLyAsdkua-cppcR8i9bPtQZ9D4PwCn85Ux3t6B5L4IOmcOnZCCpauBqS41XGF7cskyLMGExFAV0bxt_dc95hMRETXTIoLrf4YRg",
    operatingWeight: "22,000 kg",
    enginePower: "112 kW (150 hp)",
    bucketCapacity: "1.0 m³",
    maxDigDepth: "6.7 m",
    warranty: "1 Year / 2500 hrs",
    fuelConsumption: "18 L/hr",
  },
  {
    id: 2,
    category: "Bulldozers",
    name: "Komatsu D85ESS-2",
    price: "₹85,00,000",
    priceNum: 8500000,
    unit: "",
    year: 2021,
    hours: 3400,
    location: "Delhi NCR",
    availability: "available",
    availabilityLabel: "Available Now",
    listingType: "sale",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCdlhUW0iDuqT2WiOtVrnSSKg8CD5XkyAA1CUmrs8ylJQGAZNSrPlQB2-Ze_B7oAksOfvLMfzfyHHF6KM9Uvn_7l7xcCPeekiqn1BrGKCpoTUzrO_8HNj5JbiNcHIcEvEMMQxlzMAhTceMW_CKPx0VJk-iwdw9PsOS2-p88PVp2fByYwFOKQzzLJX51kLBmoDMyc7_0RYbco1kIIKSh-jo4JWxrP7t2Off9JzYCRaS-iIUKFX-9mmQTtDOR_wxREC87kRdBJNxU8gU",
    operatingWeight: "28,800 kg",
    enginePower: "164 kW (220 hp)",
    bucketCapacity: "3.5 m³ blade",
    maxDigDepth: "N/A",
    warranty: "2 Years / 4000 hrs",
    fuelConsumption: "28 L/hr",
  },
  {
    id: 3,
    category: "Loaders",
    name: "JCB 455ZX",
    price: "₹28,500",
    priceNum: 2850000,
    unit: "/ Day",
    year: 2023,
    hours: 850,
    location: "Bangalore",
    availability: "soon",
    availabilityLabel: "In 2 days",
    listingType: "both",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAaoR_uFxV1FYb3lYHaxoL60XVsVqBpDApZQplSK8qEKvwEhkSzL3L0QTN3wJ-z9JjwYLcAsfLphCG5cRro37V9fQX3GPmJIBad176nLp-9d50q5acwJ-rif1lrh_JTTn7UZyK2GY5tRM7OUfakcB7ElxYr3AYnudvcrFViQp03QYXR93Pl0PfZws7B09R-yYz9rORh7ir8D9qvvEah8VbsqTlK3xzlC5Vk6xB4gpI0gG-4FdVpHQTJotPVhCpeo-KEPeOIr3ohNFo",
    operatingWeight: "16,500 kg",
    enginePower: "93 kW (125 hp)",
    bucketCapacity: "2.1 m³",
    maxDigDepth: "N/A",
    warranty: "2 Years / 3000 hrs",
    fuelConsumption: "14 L/hr",
  },
  {
    id: 4,
    category: "Cranes",
    name: "Liebherr 280 EC-H 12",
    price: "₹1,15,000",
    priceNum: 11500000,
    unit: "/ Mo",
    year: 2020,
    hours: null,
    location: "Chennai",
    availability: "available",
    availabilityLabel: "Verified",
    listingType: "rent",
    verified: true,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBOZ5IlozzJcmJEi-jFCs-YionqEo172N-P25Xvmw8shIcOaSU1d1b_CgEoe9DYHEvVPHXkz6ufZIr0Aajm4TGElLc-2XvHf54Rn0ILBxDlI6gkHu09ffO-SP8w9ZRCViBShY0RLc-aTvy2zCXtVrOYUNeDZ0H_yTbSthN0PCou3IVh0bGF3-cEsaK5n1ML_azcmQ5WzxY0WVqWRYnrV17XH6kBYFzDWjwJevo5OSkBJL8Wx8w3jchUUpxsrRuuntKV05riQoPgUWQ",
    operatingWeight: "180,000 kg",
    enginePower: "260 kW (350 hp)",
    bucketCapacity: "12 t max load",
    maxDigDepth: "N/A",
    warranty: "3 Years / 5000 hrs",
    fuelConsumption: "40 L/hr",
  },
  {
    id: 5,
    category: "Excavators",
    name: "Volvo EC220E",
    price: "₹55,000",
    priceNum: 5500000,
    unit: "/ Day",
    year: 2023,
    hours: 620,
    location: "Hyderabad",
    availability: "available",
    availabilityLabel: "Available Now",
    listingType: "rent",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBlBtr78BzswxmTIvaC6g4OJN5ZT7v9OMpigbydEbPdvBSxK7H-ZIq9Azk5uLeoVDCdwQQzhLW1J_Nif3XeGAmR2QwyZ6U3DUaLr9iqsVd-FdOJ7llu86_gUNOkcRSGY4x7JT4D4cS1VpuA6fhAqgSKoTMob6IEynzMiv6fcYMRnLyAsdkua-cppcR8i9bPtQZ9D4PwCn85Ux3t6B5L4IOmcOnZCCpauBqS41XGF7cskyLMGExFAV0bxt_dc95hMRETXTIoLrf4YRg",
    operatingWeight: "22,800 kg",
    enginePower: "122 kW (164 hp)",
    bucketCapacity: "1.1 m³",
    maxDigDepth: "6.9 m",
    warranty: "2 Years / 4000 hrs",
    fuelConsumption: "17 L/hr",
  },
  {
    id: 6,
    category: "Loaders",
    name: "Case 721G Wheel Loader",
    price: "₹38,00,000",
    priceNum: 3800000,
    unit: "",
    year: 2022,
    hours: 1800,
    location: "Pune",
    availability: "available",
    availabilityLabel: "Available Now",
    listingType: "sale",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAaoR_uFxV1FYb3lYHaxoL60XVsVqBpDApZQplSK8qEKvwEhkSzL3L0QTN3wJ-z9JjwYLcAsfLphCG5cRro37V9fQX3GPmJIBad176nLp-9d50q5acwJ-rif1lrh_JTTn7UZyK2GY5tRM7OUfakcB7ElxYr3AYnudvcrFViQp03QYXR93Pl0PfZws7B09R-yYz9rORh7ir8D9qvvEah8VbsqTlK3xzlC5Vk6xB4gpI0gG-4FdVpHQTJotPVhCpeo-KEPeOIr3ohNFo",
    operatingWeight: "18,200 kg",
    enginePower: "142 kW (190 hp)",
    bucketCapacity: "3.8 m³",
    maxDigDepth: "N/A",
    warranty: "2 Years / 3500 hrs",
    fuelConsumption: "22 L/hr",
  },
];

// ─── Spec Rows Config ─────────────────────────────────────────────────────────
const SPEC_ROWS: { label: string; key: keyof Equipment; icon: string }[] = [
  { label: "Operating Weight", key: "operatingWeight", icon: "scale" },
  { label: "Engine Power", key: "enginePower", icon: "bolt" },
  { label: "Bucket Capacity", key: "bucketCapacity", icon: "water_bucket" },
  { label: "Max Dig Depth", key: "maxDigDepth", icon: "arrow_downward" },
  { label: "Fuel Consumption", key: "fuelConsumption", icon: "local_gas_station" },
  { label: "Year", key: "year", icon: "calendar_today" },
  { label: "Hours", key: "hours", icon: "schedule" },
  { label: "Location", key: "location", icon: "location_on" },
  { label: "Warranty", key: "warranty", icon: "verified_user" },
  { label: "Availability", key: "availabilityLabel", icon: "check_circle" },
];

function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(" ");
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    import("gsap").then(({ gsap }) => {
      gsap.fromTo(navRef.current, { y: -70, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" });
    });
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Browse Equipment", href: "/browse", active: true },
    { label: "Services", href: "#" },
    { label: "Completed Projects", href: "#" },
    { label: "Contact", href: "#" },
  ];

  return (
    <header
      ref={navRef}
      className={cn("fixed top-0 left-0 w-full z-50 flex flex-col transition-all duration-300", scrolled ? "shadow-lg" : "shadow-md")}
      style={{ opacity: 0 }}
    >
      <div className="bg-inverse-surface border-b border-white/10 flex justify-between items-center px-4 md:px-8 h-16">
        <div className="flex items-center gap-8">
          <a href="/" className="font-bold text-industrial-yellow text-[22px] tracking-wide" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            Geenab Infra
          </a>
          <nav className="hidden md:flex gap-6 items-center">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={cn(
                  "text-[15px] transition-colors duration-200",
                  link.active ? "text-industrial-yellow font-bold border-b-2 border-industrial-yellow pb-1" : "text-on-primary hover:text-industrial-yellow"
                )}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-5">
          <button className="relative text-on-primary hover:text-industrial-yellow transition-colors">
            <span className="material-symbols-outlined">shopping_cart</span>
          </button>
          <div className="hidden md:flex items-center gap-3">
            <button className="font-bold text-[13px] uppercase tracking-widest text-on-primary hover:text-industrial-yellow transition-colors">Sign In</button>
            <button className="bg-primary text-on-primary px-4 py-2 rounded font-bold text-[11px] uppercase tracking-widest hover:bg-surface-tint transition-all">Sign Up</button>
          </div>
        </div>
      </div>
    </header>
  );
}

// ─── Add Machine Slot ─────────────────────────────────────────────────────────
function AddMachineSlot({ onAdd }: { onAdd: (id: number) => void }) {
  const [open, setOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dropRef.current) return;
    import("gsap").then(({ gsap }) => {
      if (open) {
        gsap.fromTo(dropRef.current, { opacity: 0, y: -8 }, { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" });
      }
    });
  }, [open]);

  return (
    <div className="p-4 border-l border-surface-variant flex flex-col items-center justify-center min-h-[200px] relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-16 h-16 rounded-full border-2 border-dashed border-outline flex items-center justify-center hover:border-primary hover:bg-primary/5 transition-all group mb-3"
      >
        <span className="material-symbols-outlined text-[32px] text-outline group-hover:text-primary transition-colors">add</span>
      </button>
      <p className="text-[13px] text-text-muted font-bold text-center">Add Machine</p>

      {open && (
        <div
          ref={dropRef}
          className="absolute top-full left-0 w-64 bg-surface-white border border-outline-variant rounded-lg shadow-2xl z-50 overflow-hidden mt-1"
        >
          <div className="p-3 border-b border-surface-container bg-surface-container-low">
            <p className="text-[11px] font-bold uppercase tracking-widest text-text-muted">Select Machine to Add</p>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {ALL_EQUIPMENT.map((eq) => (
              <button
                key={eq.id}
                onClick={() => { onAdd(eq.id); setOpen(false); }}
                className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-surface-container transition-colors text-left"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={eq.image} alt={eq.name} className="w-10 h-10 rounded object-cover flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-[13px] font-bold text-on-surface truncate">{eq.name}</p>
                  <p className="text-[11px] text-text-muted">{eq.category} · {eq.location}</p>
                </div>
              </button>
            ))}
          </div>
          <button
            onClick={() => setOpen(false)}
            className="w-full p-2 text-[12px] text-text-muted hover:bg-surface-container border-t border-surface-container transition-colors"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Machine Column Header ────────────────────────────────────────────────────
function MachineHeader({ item, onRemove }: { item: Equipment; onRemove: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import("gsap").then(({ gsap }) => {
      gsap.fromTo(ref.current, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.4)" });
    });
  }, []);

  const availBadge = {
    available: "bg-green-100 text-green-700",
    soon: "bg-industrial-yellow/20 text-tertiary",
    unavailable: "bg-secondary-container text-on-secondary-container",
  }[item.availability];

  return (
    <div ref={ref} className="p-4 border-l border-surface-variant relative group">
      <button
        onClick={onRemove}
        className="absolute top-2 right-2 w-7 h-7 rounded-full bg-error/10 flex items-center justify-center text-error hover:bg-error hover:text-on-primary transition-all opacity-0 group-hover:opacity-100"
        title="Remove"
      >
        <span className="material-symbols-outlined text-[16px]">close</span>
      </button>

      <div className="aspect-video bg-surface-dim mb-3 overflow-hidden rounded-lg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
      </div>

      <span className="text-[10px] font-bold uppercase tracking-widest text-primary">{item.category}</span>
      <h3 className="font-bold text-[18px] text-inverse-surface leading-tight mt-0.5 mb-1" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
        {item.name}
      </h3>
      <p className="font-bold text-[18px] text-primary mb-2" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
        {item.price}
        {item.unit && <span className="text-[13px] font-normal text-text-muted ml-1">{item.unit}</span>}
      </p>

      <div className="flex items-center gap-2 flex-wrap">
        <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide", availBadge)}>
          {item.availabilityLabel}
        </span>
        {item.badge && (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase bg-industrial-yellow text-inverse-surface">
            {item.badge}
          </span>
        )}
      </div>
    </div>
  );
}

// ─── Spec Cell ────────────────────────────────────────────────────────────────
function SpecCell({ value, isHighlight }: { value: string | number | null; isHighlight?: boolean }) {
  return (
    <div className={cn("p-4 border-l border-surface-variant text-[14px] flex items-center", isHighlight && "font-bold text-primary")}>
      {value ?? "—"}
    </div>
  );
}

// ─── Quote Modal ──────────────────────────────────────────────────────────────
function QuoteModal({ items, onClose }: { items: Equipment[]; onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });

  useEffect(() => {
    import("gsap").then(({ gsap }) => {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25 });
      gsap.fromTo(cardRef.current, { opacity: 0, y: 40, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "power3.out" });
    });
  }, []);

  const handleClose = useCallback(() => {
    import("gsap").then(({ gsap }) => {
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.2 });
      gsap.to(cardRef.current, { opacity: 0, y: 20, duration: 0.2, onComplete: onClose });
    });
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    import("gsap").then(({ gsap }) => {
      gsap.fromTo(cardRef.current, { scale: 1 }, { scale: 1.02, duration: 0.15, yoyo: true, repeat: 1 });
    });
  };

  const totalEstimate = items.reduce((sum, i) => sum + i.priceNum, 0);
  const fmtPrice = (n: number) => n >= 10000000 ? `₹${(n / 10000000).toFixed(2)} Cr` : n >= 100000 ? `₹${(n / 100000).toFixed(1)} L` : `₹${n.toLocaleString()}`;

  return (
    <div ref={overlayRef} className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}>
      <div ref={cardRef} className="bg-surface-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="bg-inverse-surface px-6 py-4 flex justify-between items-center border-b-4 border-primary">
          <div>
            <h2 className="font-bold text-[22px] text-on-primary" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              Request Quotation
            </h2>
            <p className="text-[13px] text-outline-variant">{items.length} machine{items.length > 1 ? "s" : ""} selected</p>
          </div>
          <button onClick={handleClose} className="text-on-primary/60 hover:text-on-primary transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {submitted ? (
          <div className="p-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-[40px] text-green-600">check_circle</span>
            </div>
            <h3 className="font-bold text-[22px] text-on-surface mb-2" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              Quote Requested!
            </h3>
            <p className="text-text-muted text-[14px] mb-6">Our team will reach out within 24 hours with a detailed quotation.</p>
            <button onClick={handleClose} className="bg-primary text-on-primary px-8 py-2.5 rounded font-bold text-[13px] uppercase tracking-widest hover:bg-surface-tint transition-colors">
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Selected items summary */}
            <div className="bg-surface-container-low rounded-lg p-3 flex flex-wrap gap-2 mb-2">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-1.5 bg-surface-white border border-outline-variant rounded px-2 py-1">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image} alt={item.name} className="w-7 h-7 rounded object-cover" />
                  <span className="text-[12px] font-bold text-on-surface">{item.name}</span>
                </div>
              ))}
              <div className="ml-auto text-right">
                <p className="text-[11px] text-text-muted">Est. Total</p>
                <p className="text-[15px] font-bold text-primary">{fmtPrice(totalEstimate)}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-widest text-text-muted block mb-1">Full Name *</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Rajesh Kumar"
                  className="w-full border border-outline rounded-lg px-3 py-2 text-[14px] text-on-surface bg-surface-white focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold uppercase tracking-widest text-text-muted block mb-1">Phone *</label>
                <input
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full border border-outline rounded-lg px-3 py-2 text-[14px] text-on-surface bg-surface-white focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                />
              </div>
            </div>
            <div>
              <label className="text-[11px] font-bold uppercase tracking-widest text-text-muted block mb-1">Email</label>
              <input
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                type="email"
                placeholder="rajesh@company.com"
                className="w-full border border-outline rounded-lg px-3 py-2 text-[14px] text-on-surface bg-surface-white focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold uppercase tracking-widest text-text-muted block mb-1">Message</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Site location, timeline, special requirements..."
                rows={3}
                className="w-full border border-outline rounded-lg px-3 py-2 text-[14px] text-on-surface bg-surface-white focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-on-primary py-3 rounded font-bold text-[13px] uppercase tracking-widest hover:bg-surface-tint active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              Submit Quote Request
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

// ─── Save Toast ───────────────────────────────────────────────────────────────
function SaveToast({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import("gsap").then(({ gsap }) => {
      gsap.fromTo(ref.current, { x: 80, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: "power3.out" });
      setTimeout(() => {
        gsap.to(ref.current, { x: 80, opacity: 0, duration: 0.3, onComplete: onClose });
      }, 3000);
    });
  }, [onClose]);

  return (
    <div ref={ref} className="fixed bottom-32 right-6 z-50 bg-inverse-surface text-on-primary px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border-l-4 border-industrial-yellow">
      <span className="material-symbols-outlined text-industrial-yellow">bookmark_added</span>
      <div>
        <p className="font-bold text-[14px]">Comparison Saved!</p>
        <p className="text-[12px] text-outline-variant">You can find it in your saved items.</p>
      </div>
      <button onClick={onClose} className="text-outline-variant hover:text-on-primary ml-2 transition-colors">
        <span className="material-symbols-outlined text-[18px]">close</span>
      </button>
    </div>
  );
}

// Footer replaced by shared <SiteFooter /> component

// ─── Inner Compare Page (reads search params) ─────────────────────────────────
function ComparePageInner() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Parse IDs from URL: /compare?ids=1,2,3
  const initialIds = (searchParams.get("ids") ?? "")
    .split(",")
    .map(Number)
    .filter((n) => !isNaN(n) && n > 0)
    .slice(0, 4);

  const [machineIds, setMachineIds] = useState<number[]>(initialIds.length > 0 ? initialIds : [1, 2, 3]);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [showSaveToast, setShowSaveToast] = useState(false);

  const machines = machineIds.map((id) => ALL_EQUIPMENT.find((e) => e.id === id)).filter(Boolean) as Equipment[];

  const tableRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);

  // Animate in on mount
  useEffect(() => {
    import("gsap").then(({ gsap }) => {
      const tl = gsap.timeline({ delay: 0.1 });
      tl.fromTo(heroRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" });
      tl.fromTo(tableRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, "-=0.3");
      if (rowsRef.current) {
        tl.fromTo(
          Array.from(rowsRef.current.children),
          { x: -12, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.4, stagger: 0.06, ease: "power2.out" },
          "-=0.3"
        );
      }
    });
  }, []);

  const handleRemoveMachine = useCallback((id: number) => {
    import("gsap").then(({ gsap }) => {
      setMachineIds((prev) => prev.filter((i) => i !== id));
    });
  }, []);

  const handleAddMachine = useCallback((id: number) => {
    setMachineIds((prev) => {
      if (prev.includes(id)) return prev;
      if (prev.length >= 4) return prev;
      return [...prev, id];
    });
  }, []);

  const handleSave = () => {
    setShowSaveToast(true);
    import("gsap").then(({ gsap }) => {
      gsap.to(".compare-table-container", { boxShadow: "0 0 0 3px #FFB703", duration: 0.3, yoyo: true, repeat: 1 });
    });
  };

  const totalEstimate = machines.reduce((sum, m) => sum + m.priceNum, 0);
  const fmtPrice = (n: number) => n >= 10000000 ? `₹${(n / 10000000).toFixed(2)} Cr` : n >= 100000 ? `₹${(n / 100000).toFixed(1)} L` : `₹${n.toLocaleString()}`;

  // Determine best value per spec row (for highlighting)
  const getHighlight = (specKey: keyof Equipment, value: string | number | null): boolean => {
    // Highlight "available" availability
    if (specKey === "availabilityLabel") return value === "Available Now" || value === "Verified";
    return false;
  };

  const maxCols = 4;
  const emptySlots = Math.max(0, Math.min(maxCols - machines.length, 1)); // show max 1 add slot

  return (
    <div className="min-h-screen bg-background text-on-surface overflow-x-hidden">
      <Navbar />

      <main className="pt-24 pb-36 px-4 md:px-8 max-w-[1280px] mx-auto">
        {/* Page header */}
        <div ref={heroRef} className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <a href="/browse" className="flex items-center gap-1 text-[13px] text-text-muted hover:text-primary transition-colors font-bold">
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              Browse Equipment
            </a>
            <span className="text-text-muted">/</span>
            <span className="text-[13px] text-on-surface font-bold">Compare</span>
          </div>
          <h1 className="font-bold text-[40px] leading-tight text-on-surface mb-2" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            Compare Heavy Machinery
          </h1>
          <p className="text-text-muted text-[16px] max-w-xl">
            Analyze technical specifications and performance metrics across your shortlisted equipment.
          </p>
        </div>

        {machines.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <span className="material-symbols-outlined text-[64px] text-outline mb-4">compare_arrows</span>
            <h2 className="font-bold text-[28px] text-on-surface mb-2" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>No Machines to Compare</h2>
            <p className="text-text-muted mb-6">Go back to browse and select machines to compare.</p>
            <a href="/browse" className="bg-primary text-on-primary px-8 py-3 rounded font-bold text-[13px] uppercase tracking-widest hover:bg-surface-tint transition-colors inline-flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              Back to Browse
            </a>
          </div>
        ) : (
          <div ref={tableRef} className="bg-surface-white border border-surface-container shadow-xl rounded-xl overflow-x-auto compare-table-container">
            {/* ── Column headers (machine images + name + price) ── */}
            <div
              className="border-b-2 border-surface-variant bg-surface-container-low"
              style={{ display: "grid", gridTemplateColumns: `200px repeat(${machines.length + (emptySlots > 0 ? emptySlots : 0)}, 1fr)` }}
            >
              {/* Label column header */}
              <div className="p-4 flex items-center bg-inverse-surface text-on-primary">
                <span className="font-bold text-[11px] uppercase tracking-widest">Specifications</span>
              </div>
              {/* Machine columns */}
              {machines.map((m) => (
                <MachineHeader key={m.id} item={m} onRemove={() => handleRemoveMachine(m.id)} />
              ))}
              {/* Add slot */}
              {emptySlots > 0 && machines.length < maxCols && (
                <AddMachineSlot onAdd={handleAddMachine} />
              )}
            </div>

            {/* ── Spec rows ── */}
            <div ref={rowsRef} className="divide-y divide-surface-variant">
              {SPEC_ROWS.map((spec, idx) => (
                <div
                  key={spec.key}
                  className="hover:bg-surface-container/50 transition-colors group"
                  style={{ display: "grid", gridTemplateColumns: `200px repeat(${machines.length + (emptySlots > 0 ? emptySlots : 0)}, 1fr)` }}
                  onMouseEnter={(e) => {
                    import("gsap").then(({ gsap }) => {
                      gsap.to(e.currentTarget, { x: 3, duration: 0.2, ease: "power2.out" });
                    });
                  }}
                  onMouseLeave={(e) => {
                    import("gsap").then(({ gsap }) => {
                      gsap.to(e.currentTarget, { x: 0, duration: 0.2, ease: "power2.out" });
                    });
                  }}
                >
                  {/* Spec label */}
                  <div className={cn("p-4 flex items-center gap-2", idx % 2 === 1 ? "bg-surface-container-low" : "")}>
                    <span className="material-symbols-outlined text-[16px] text-text-muted">{spec.icon}</span>
                    <span className="font-bold text-[12px] uppercase tracking-wider text-on-surface-variant">{spec.label}</span>
                  </div>
                  {/* Machine values */}
                  {machines.map((m) => {
                    const raw = m[spec.key];
                    const val = raw === null ? "—" : String(raw);
                    const highlight = getHighlight(spec.key, raw);
                    return (
                      <div
                        key={m.id}
                        className={cn(
                          "p-4 border-l border-surface-variant text-[14px] flex items-center",
                          idx % 2 === 1 ? "bg-surface-container-low" : "",
                          highlight ? "font-bold text-green-600" : "text-on-surface"
                        )}
                      >
                        {spec.key === "availabilityLabel" ? (
                          <span className={cn("px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wide",
                            m.availability === "available" ? "bg-green-100 text-green-700" :
                              m.availability === "soon" ? "bg-industrial-yellow/20 text-tertiary" :
                                "bg-secondary-container text-on-secondary-container"
                          )}>
                            {val}
                          </span>
                        ) : val}
                      </div>
                    );
                  })}
                  {/* Empty add slot filler */}
                  {emptySlots > 0 && machines.length < maxCols && (
                    <div className={cn("p-4 border-l border-surface-variant", idx % 2 === 1 ? "bg-surface-container-low/50" : "bg-surface-container/30")} />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Insight cards */}
        {machines.length >= 2 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: "⚡", label: "Best Efficiency", desc: `The ${machines[0].name} offers the lowest fuel consumption rate per operating hour.` },
              { icon: "🏋️", label: "Max Performance", desc: `The ${machines[machines.length > 1 ? 1 : 0].name} provides the highest operating weight for heavy stabilization.` },
              { icon: "💰", label: "Value Leader", desc: `The ${machines[0].name} saves you approximately ₹45K per day on rental fees.` },
            ].map((card) => (
              <div key={card.label} className="bg-surface-white border border-surface-container rounded-xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[22px]">{card.icon}</span>
                  <span className="font-bold text-[13px] uppercase tracking-wider text-on-surface">{card.label}</span>
                </div>
                <p className="text-[14px] text-text-muted leading-relaxed">
                  {card.desc.split(/\b(machines\[[\d]+\]\.name)\b/).map((part, i) => (
                    <span key={i}>{part}</span>
                  ))}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>

      <SiteFooter />

      {/* ── Sticky CTA Bar ── */}
      {machines.length > 0 && (
        <div className="fixed bottom-0 left-0 w-full z-40 bg-inverse-surface border-t-4 border-primary shadow-[0_-4px_20px_rgba(0,0,0,0.2)]">
          <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* Left: thumbnails + count */}
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {machines.map((m) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={m.id}
                    src={m.image}
                    alt={m.name}
                    className="w-10 h-10 rounded-full border-2 border-on-primary object-cover"
                  />
                ))}
              </div>
              <div>
                <p className="text-on-primary font-bold text-[14px]">
                  {machines.length} Machine{machines.length > 1 ? "s" : ""} Selected for Quotation
                </p>
                <p className="text-outline-variant text-[12px]">
                  Estimated Total: <strong className="text-industrial-yellow">{fmtPrice(totalEstimate)}</strong>
                </p>
              </div>
            </div>

            {/* Right: actions */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={handleSave}
                className="flex-1 sm:flex-none border border-outline-variant text-on-primary px-5 py-2.5 rounded font-bold text-[12px] uppercase tracking-widest hover:bg-surface-variant hover:text-on-surface transition-colors flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[16px]">bookmark</span>
                Save Comparison
              </button>
              <button
                onClick={() => setShowQuoteModal(true)}
                className="flex-1 sm:flex-none bg-primary text-on-primary px-5 py-2.5 rounded font-bold text-[12px] uppercase tracking-widest hover:bg-surface-tint active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                Request Quote for All
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quote Modal */}
      {showQuoteModal && (
        <QuoteModal items={machines} onClose={() => setShowQuoteModal(false)} />
      )}

      {/* Save Toast */}
      {showSaveToast && (
        <SaveToast onClose={() => setShowSaveToast(false)} />
      )}
    </div>
  );
}

// ─── Page Export (wrapped in Suspense for useSearchParams) ────────────────────
export default function ComparePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-text-muted font-bold text-[14px] uppercase tracking-widest">Loading Comparison...</p>
        </div>
      </div>
    }>
      <ComparePageInner />
    </Suspense>
  );
}
