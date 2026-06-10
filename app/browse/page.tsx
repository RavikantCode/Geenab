"use client";
import SiteFooter from "@/components/SiteFooter";
import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

// ─── Types ───────────────────────────────────────────────────────────────────
interface Equipment {
  id: number;
  category: string;
  name: string;
  price: string;
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
}

// ─── Equipment Data ──────────────────────────────────────────────────────────
const EQUIPMENT: Equipment[] = [
  {
    id: 1,
    category: "Excavators",
    name: "Caterpillar 320 GC",
    price: "₹42,000",
    unit: "/ Day",
    year: 2022,
    hours: 1200,
    location: "Mumbai",
    availability: "available",
    availabilityLabel: "Available",
    listingType: "rent",
    badge: "Best Seller",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBlBtr78BzswxmTIvaC6g4OJN5ZT7v9OMpigbydEbPdvBSxK7H-ZIq9Azk5uLeoVDCdwQQzhLW1J_Nif3XeGAmR2QwyZ6U3DUaLr9iqsVd-FdOJ7llu86_gUNOkcRSGY4x7JT4D4cS1VpuA6fhAqgSKoTMob6IEynzMiv6fcYMRnLyAsdkua-cppcR8i9bPtQZ9D4PwCn85Ux3t6B5L4IOmcOnZCCpauBqS41XGF7cskyLMGExFAV0bxt_dc95hMRETXTIoLrf4YRg",
  },
  {
    id: 2,
    category: "Bulldozers",
    name: "Komatsu D85ESS-2",
    price: "₹85,00,000",
    unit: "",
    year: 2021,
    hours: 3400,
    location: "Delhi NCR",
    availability: "available",
    availabilityLabel: "Available",
    listingType: "sale",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCdlhUW0iDuqT2WiOtVrnSSKg8CD5XkyAA1CUmrs8ylJQGAZNSrPlQB2-Ze_B7oAksOfvLMfzfyHHF6KM9Uvn_7l7xcCPeekiqn1BrGKCpoTUzrO_8HNj5JbiNcHIcEvEMMQxlzMAhTceMW_CKPx0VJk-iwdw9PsOS2-p88PVp2fByYwFOKQzzLJX51kLBmoDMyc7_0RYbco1kIIKSh-jo4JWxrP7t2Off9JzYCRaS-iIUKFX-9mmQTtDOR_wxREC87kRdBJNxU8gU",
  },
  {
    id: 3,
    category: "Loaders",
    name: "JCB 455ZX",
    price: "₹28,500",
    unit: "/ Day",
    year: 2023,
    hours: 850,
    location: "Bangalore",
    availability: "soon",
    availabilityLabel: "In 2 days",
    listingType: "both",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAaoR_uFxV1FYb3lYHaxoL60XVsVqBpDApZQplSK8qEKvwEhkSzL3L0QTN3wJ-z9JjwYLcAsfLphCG5cRro37V9fQX3GPmJIBad176nLp-9d50q5acwJ-rif1lrh_JTTn7UZyK2GY5tRM7OUfakcB7ElxYr3AYnudvcrFViQp03QYXR93Pl0PfZws7B09R-yYz9rORh7ir8D9qvvEah8VbsqTlK3xzlC5Vk6xB4gpI0gG-4FdVpHQTJotPVhCpeo-KEPeOIr3ohNFo",
  },
  {
    id: 4,
    category: "Cranes",
    name: "Liebherr 280 EC-H 12",
    price: "₹1,15,000",
    unit: "/ Mo",
    year: 2020,
    hours: null,
    location: "Chennai",
    availability: "available",
    availabilityLabel: "Verified",
    listingType: "rent",
    verified: true,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBOZ5IlozzJcmJEi-jFCs-YionqEo172N-P25Xvmw8shIcOaSU1d1b_CgEoe9DYHEvVPHXkz6ufZIr0Aajm4TGElLc-2XvHf54Rn0ILBxDlI6gkHu09ffO-SP8w9ZRCViBShY0RLc-aTvy2zCXtVrOYUNeDZ0H_yTbSthN0PCou3IVh0bGF3-cEsaK5n1ML_azcmQ5WzxY0WVqWRYnrV17XH6kBYFzDWjwJevo5OSkBJL8Wx8w3jchUUpxsrRuuntKV05riQoPgUWQ",
  },
  {
    id: 5,
    category: "Excavators",
    name: "Volvo EC220E",
    price: "₹55,000",
    unit: "/ Day",
    year: 2023,
    hours: 620,
    location: "Hyderabad",
    availability: "available",
    availabilityLabel: "Available",
    listingType: "rent",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBlBtr78BzswxmTIvaC6g4OJN5ZT7v9OMpigbydEbPdvBSxK7H-ZIq9Azk5uLeoVDCdwQQzhLW1J_Nif3XeGAmR2QwyZ6U3DUaLr9iqsVd-FdOJ7llu86_gUNOkcRSGY4x7JT4D4cS1VpuA6fhAqgSKoTMob6IEynzMiv6fcYMRnLyAsdkua-cppcR8i9bPtQZ9D4PwCn85Ux3t6B5L4IOmcOnZCCpauBqS41XGF7cskyLMGExFAV0bxt_dc95hMRETXTIoLrf4YRg",
  },
  {
    id: 6,
    category: "Loaders",
    name: "Case 721G Wheel Loader",
    price: "₹38,00,000",
    unit: "",
    year: 2022,
    hours: 1800,
    location: "Pune",
    availability: "available",
    availabilityLabel: "Available",
    listingType: "sale",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAaoR_uFxV1FYb3lYHaxoL60XVsVqBpDApZQplSK8qEKvwEhkSzL3L0QTN3wJ-z9JjwYLcAsfLphCG5cRro37V9fQX3GPmJIBad176nLp-9d50q5acwJ-rif1lrh_JTTn7UZyK2GY5tRM7OUfakcB7ElxYr3AYnudvcrFViQp03QYXR93Pl0PfZws7B09R-yYz9rORh7ir8D9qvvEah8VbsqTlK3xzlC5Vk6xB4gpI0gG-4FdVpHQTJotPVhCpeo-KEPeOIr3ohNFo",
  },
];

// ─── Utility ─────────────────────────────────────────────────────────────────
function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(" ");
}

// ─── Listing Type Badge Colors ────────────────────────────────────────────────
const listingBadgeClass: Record<string, string> = {
  rent: "bg-primary text-on-primary",
  sale: "bg-inverse-surface text-on-primary",
  both: "bg-tertiary-container text-on-primary",
};
const listingLabel: Record<string, string> = {
  rent: "Rent",
  sale: "Sale",
  both: "Both",
};

// ─── Equipment Card ────────────────────────────────────────────────────────────
function EquipmentCard({
  item,
  onCompareChange,
  isCompared,
}: {
  item: Equipment;
  onCompareChange: (id: number, checked: boolean) => void;
  isCompared: boolean;
}) {
  const cardRef = useRef<HTMLElement>(null);

  const handleMouseEnter = useCallback(() => {
    import("gsap").then(({ gsap }) => {
      gsap.to(cardRef.current, {
        y: -4,
        duration: 0.25,
        ease: "power2.out",
      });
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    import("gsap").then(({ gsap }) => {
      gsap.to(cardRef.current, {
        y: 0,
        duration: 0.25,
        ease: "power2.out",
      });
    });
  }, []);

  const handleAddToCart = useCallback(() => {
    import("gsap").then(({ gsap }) => {
      gsap.fromTo(
        cardRef.current,
        { scale: 1 },
        { scale: 0.97, duration: 0.1, yoyo: true, repeat: 1, ease: "power2.inOut" }
      );
    });
  }, []);

  return (
    <article
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="bg-surface-white border border-surface-container rounded-lg shadow hover:shadow-xl hover:border-industrial-yellow transition-all duration-300 flex flex-col group overflow-hidden will-change-transform"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-surface-container">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={item.name}
          src={item.image}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Listing Type & Badge */}
        <div className="absolute top-2 left-2 flex gap-1">
          <span
            className={cn(
              "px-2 py-1 text-[10px] font-bold rounded uppercase tracking-wide",
              listingBadgeClass[item.listingType]
            )}
          >
            {listingLabel[item.listingType]}
          </span>
          {item.badge && (
            <span className="bg-industrial-yellow text-inverse-surface px-2 py-1 text-[10px] font-bold rounded uppercase tracking-wide">
              {item.badge}
            </span>
          )}
        </div>

        {/* Compare Checkbox */}
        <div className="absolute bottom-2 left-2">
          <label className="inline-flex items-center p-1.5 bg-white/80 backdrop-blur-sm rounded cursor-pointer hover:bg-white transition-colors">
            <input
              type="checkbox"
              className="rounded border-outline text-primary w-4 h-4 cursor-pointer"
              checked={isCompared}
              onChange={(e) => onCompareChange(item.id, e.target.checked)}
            />
            <span className="ml-2 text-[10px] font-bold tracking-widest text-on-surface">
              COMPARE
            </span>
          </label>
        </div>

        {/* Wishlist */}
        <button className="absolute top-2 right-2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded flex items-center justify-center hover:bg-white transition-colors group/heart">
          <span className="material-symbols-outlined text-[18px] text-outline group-hover/heart:text-primary transition-colors">
            favorite
          </span>
        </button>
      </div>

      {/* Body */}
      <div className="p-4 flex-grow">
        <div className="flex justify-between items-start mb-1">
          <span className="font-bold text-[11px] text-primary uppercase tracking-wider">
            {item.category}
          </span>
          <span className="flex items-center text-[11px] font-medium text-tertiary">
            <span className="material-symbols-outlined text-[14px] mr-0.5">location_on</span>
            {item.location}
          </span>
        </div>

        <h3
          className="text-[20px] leading-tight font-bold text-inverse-surface mb-2"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          {item.name}
        </h3>

        <p className="text-[20px] font-bold text-primary mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
          {item.price}
          {item.unit && (
            <span className="text-[14px] font-normal text-text-muted ml-1">{item.unit}</span>
          )}
        </p>

        <div className="flex items-center gap-3 text-[13px] text-text-muted mb-2 flex-wrap">
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">calendar_today</span>
            {item.year}
          </div>
          {item.hours !== null && (
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">settings</span>
              {item.hours.toLocaleString()} hrs
            </div>
          )}
          <div
            className={cn(
              "flex items-center gap-1",
              item.availability === "available"
                ? item.verified
                  ? "text-green-600"
                  : "text-green-600"
                : item.availability === "soon"
                  ? "text-primary"
                  : "text-outline"
            )}
          >
            <span className="material-symbols-outlined text-[16px]">
              {item.verified
                ? "verified"
                : item.availability === "available"
                  ? "check_circle"
                  : item.availability === "soon"
                    ? "pending_actions"
                    : "cancel"}
            </span>
            {item.availabilityLabel}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="px-4 pb-4 grid grid-cols-2 gap-2">
        <a
          href={`/equipment/${item.id}`}
          className="col-span-2 bg-inverse-surface text-on-primary py-2.5 rounded font-bold text-[11px] uppercase tracking-widest hover:bg-black transition-colors duration-200 text-center"
        >
          View Details
        </a>
        <button
          onClick={handleAddToCart}
          className="bg-surface-container py-2.5 rounded font-bold text-[11px] uppercase text-on-surface hover:bg-surface-dim transition-colors duration-200"
        >
          Add to Cart
        </button>
        <button className="bg-primary text-on-primary py-2.5 rounded font-bold text-[11px] uppercase hover:bg-surface-tint transition-colors duration-200">
          Get Quote
        </button>
      </div>
    </article>
  );
}

// ─── Filter Sidebar ────────────────────────────────────────────────────────────
function FilterSidebar({
  selectedCategories,
  onCategoryChange,
  listingType,
  onListingTypeChange,
  availableOnly,
  onAvailableOnlyChange,
  location,
  onLocationChange,
  priceRange,
  onPriceRangeChange,
  onReset,
}: {
  selectedCategories: string[];
  onCategoryChange: (cat: string) => void;
  listingType: string;
  onListingTypeChange: (type: string) => void;
  availableOnly: boolean;
  onAvailableOnlyChange: (v: boolean) => void;
  location: string;
  onLocationChange: (l: string) => void;
  priceRange: number;
  onPriceRangeChange: (v: number) => void;
  onReset: () => void;
}) {
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import("gsap").then(({ gsap }) => {
      gsap.fromTo(
        sidebarRef.current,
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: 0.2 }
      );
    });
  }, []);

  const categories = ["Excavators", "Bulldozers", "Cranes", "Loaders"];
  const listingTypes = ["RENT", "SALE", "BOTH"];

  return (
    <aside className="w-full md:w-80 shrink-0">
      <div
        ref={sidebarRef}
        className="bg-surface-white p-6 border border-surface-container shadow-md rounded-lg sticky top-24 opacity-0"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2
            className="text-[24px] leading-8 font-bold text-inverse-surface"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Filters
          </h2>
          <button
            onClick={onReset}
            className="text-primary font-bold text-[11px] uppercase tracking-widest hover:underline transition-all"
          >
            Reset All
          </button>
        </div>

        {/* Category */}
        <div className="mb-8">
          <h3 className="font-bold text-[11px] uppercase tracking-widest text-text-muted mb-4">
            Category
          </h3>
          <div className="space-y-3">
            {categories.map((cat) => (
              <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => onCategoryChange(cat)}
                  className="rounded border-outline text-primary w-5 h-5 cursor-pointer accent-primary"
                />
                <span className="text-[15px] text-on-surface group-hover:text-primary transition-colors">
                  {cat}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Listing Type */}
        <div className="mb-8">
          <h3 className="font-bold text-[11px] uppercase tracking-widest text-text-muted mb-4">
            Listing Type
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {listingTypes.map((type) => (
              <button
                key={type}
                onClick={() => onListingTypeChange(type)}
                className={cn(
                  "px-2 py-2 text-[11px] font-bold text-center rounded transition-all duration-200",
                  listingType === type
                    ? "bg-inverse-surface text-on-primary shadow-md"
                    : "border border-outline text-on-surface hover:bg-surface-container"
                )}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Available Only */}
        <div className="mb-8 flex items-center justify-between">
          <h3 className="font-bold text-[11px] uppercase tracking-widest text-text-muted">
            Available Only
          </h3>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={availableOnly}
              onChange={(e) => onAvailableOnlyChange(e.target.checked)}
            />
            <div className="w-11 h-6 bg-surface-dim peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary transition-colors" />
          </label>
        </div>

        {/* Location */}
        <div className="mb-8">
          <h3 className="font-bold text-[11px] uppercase tracking-widest text-text-muted mb-4">
            Location
          </h3>
          <div className="relative">
            <select
              value={location}
              onChange={(e) => onLocationChange(e.target.value)}
              className="w-full border border-outline rounded-lg px-3 py-2.5 text-[15px] text-on-surface bg-surface-white focus:ring-2 focus:ring-primary focus:border-primary transition-all appearance-none cursor-pointer pr-8"
            >
              <option>All India</option>
              <option>Mumbai, Maharashtra</option>
              <option>Delhi NCR</option>
              <option>Bangalore, Karnataka</option>
              <option>Chennai, Tamil Nadu</option>
              <option>Hyderabad</option>
              <option>Pune</option>
            </select>
            <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-outline text-[20px] pointer-events-none">
              expand_more
            </span>
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-4">
          <h3 className="font-bold text-[11px] uppercase tracking-widest text-text-muted mb-4">
            Price Range (₹)
          </h3>
          <input
            type="range"
            min={10000}
            max={5000000}
            step={10000}
            value={priceRange}
            onChange={(e) => onPriceRangeChange(Number(e.target.value))}
            className="w-full h-2 bg-surface-container rounded-lg appearance-none cursor-pointer accent-industrial-yellow"
          />
          <div className="flex justify-between mt-3 font-bold text-[11px] text-text-muted">
            <span>₹10,000</span>
            <span className="text-primary font-bold">
              {priceRange >= 5000000
                ? "₹50L+"
                : priceRange >= 100000
                  ? `₹${(priceRange / 100000).toFixed(1)}L`
                  : `₹${(priceRange / 1000).toFixed(0)}K`}
            </span>
            <span>₹50L+</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

// ─── Compare Bar ──────────────────────────────────────────────────────────────
function CompareBar({
  items,
  onClear,
  onCompareNow,
}: {
  items: Equipment[];
  onClear: () => void;
  onCompareNow: () => void;
}) {
  const barRef = useRef<HTMLDivElement>(null);
  const prevVisible = useRef(false);

  useEffect(() => {
    const visible = items.length > 0;
    if (visible === prevVisible.current) return;
    prevVisible.current = visible;

    import("gsap").then(({ gsap }) => {
      if (visible) {
        gsap.fromTo(
          barRef.current,
          { y: "100%" },
          { y: "0%", duration: 0.4, ease: "power3.out" }
        );
      } else {
        gsap.to(barRef.current, { y: "100%", duration: 0.3, ease: "power3.in" });
      }
    });
  }, [items]);

  return (
    <div
      ref={barRef}
      className="fixed bottom-0 left-0 w-full bg-inverse-surface border-t-4 border-primary p-4 shadow-2xl z-40"
      style={{ transform: "translateY(100%)" }}
    >
      <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Left: thumbnails + count */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex -space-x-3">
            {items.map((item) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={item.id}
                src={item.image}
                alt={item.name}
                title={item.name}
                className="w-10 h-10 rounded-full border-2 border-on-primary object-cover cursor-pointer"
              />
            ))}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-primary text-on-primary w-6 h-6 flex items-center justify-center rounded-full font-bold text-[12px]">
                {items.length}
              </span>
              <span className="font-bold text-[13px] text-on-primary uppercase tracking-wider">
                Items to Compare
              </span>
            </div>
            <p className="text-outline-variant text-[12px] mt-0.5">
              Select up to 4 machines to compare side-by-side
            </p>
          </div>
        </div>

        {/* Right: actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onClear}
            className="border border-outline-variant text-on-primary px-4 py-2 rounded font-bold text-[12px] uppercase tracking-widest hover:bg-surface-variant hover:text-on-surface transition-colors"
          >
            Clear All
          </button>
          <button
            onClick={onCompareNow}
            className="bg-primary text-on-primary px-6 py-2.5 rounded font-bold text-[12px] uppercase tracking-widest hover:bg-surface-tint active:scale-[0.98] transition-all flex items-center gap-2 shadow-lg"
          >
            <span className="material-symbols-outlined text-[18px]">compare_arrows</span>
            Compare Now
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Header Controls ──────────────────────────────────────────────────────────
function HeaderControls({
  count,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  searchQuery,
  onSearchChange,
}: {
  count: number;
  sortBy: string;
  onSortChange: (v: string) => void;
  viewMode: "grid" | "list";
  onViewModeChange: (v: "grid" | "list") => void;
  searchQuery: string;
  onSearchChange: (v: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import("gsap").then(({ gsap }) => {
      gsap.fromTo(
        ref.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", delay: 0.4 }
      );
    });
  }, []);

  return (
    <div
      ref={ref}
      className="bg-surface-white p-4 mb-6 border border-surface-container rounded-lg shadow-sm flex flex-col md:flex-row justify-between items-center gap-4 opacity-0"
    >
      <div className="flex items-center gap-4 w-full md:w-auto">
        {/* Mobile search */}
        <div className="relative flex-1 md:hidden">
          <input
            type="text"
            placeholder="Search equipment..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full border border-outline rounded-full px-4 py-1.5 text-[14px] bg-surface-white focus:ring-1 focus:ring-primary"
          />
          <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">
            search
          </span>
        </div>
        <span className="text-[15px] text-text-muted hidden md:block">
          <strong className="text-on-surface font-bold">{count}</strong> Equipment listings found
        </span>
      </div>

      <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
        <span className="text-[15px] text-text-muted md:hidden">
          <strong className="text-on-surface">{count}</strong> listings
        </span>

        <div className="flex items-center gap-4">
          {/* Sort */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-[11px] uppercase tracking-widest text-text-muted hidden sm:block">
              Sort:
            </span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
                className="border-none bg-transparent font-bold text-[13px] focus:ring-0 cursor-pointer text-on-surface pr-6 appearance-none"
              >
                <option>Relevance</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newly Listed</option>
              </select>
              <span className="material-symbols-outlined absolute right-0 top-1/2 -translate-y-1/2 text-[16px] pointer-events-none text-outline">
                expand_more
              </span>
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex border border-outline rounded overflow-hidden">
            <button
              onClick={() => onViewModeChange("grid")}
              className={cn(
                "p-2 transition-colors",
                viewMode === "grid"
                  ? "bg-inverse-surface text-on-primary"
                  : "bg-surface-white text-inverse-surface hover:bg-surface-container"
              )}
              title="Grid view"
            >
              <span className="material-symbols-outlined text-[20px] leading-none">grid_view</span>
            </button>
            <button
              onClick={() => onViewModeChange("list")}
              className={cn(
                "p-2 transition-colors",
                viewMode === "list"
                  ? "bg-inverse-surface text-on-primary"
                  : "bg-surface-white text-inverse-surface hover:bg-surface-container"
              )}
              title="List view"
            >
              <span className="material-symbols-outlined text-[20px] leading-none">view_list</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Pagination ───────────────────────────────────────────────────────────────
function Pagination({
  current,
  total,
  onChange,
}: {
  current: number;
  total: number;
  onChange: (page: number) => void;
}) {
  return (
    <div className="mt-stack-lg flex justify-center items-center gap-2 flex-wrap">
      <button
        onClick={() => onChange(Math.max(1, current - 1))}
        disabled={current === 1}
        className="w-10 h-10 flex items-center justify-center border border-outline rounded hover:bg-surface-container transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <span className="material-symbols-outlined text-[20px]">chevron_left</span>
      </button>
      {Array.from({ length: Math.min(total, 5) }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onChange(page)}
          className={cn(
            "w-10 h-10 flex items-center justify-center rounded font-bold text-[13px] transition-colors",
            page === current
              ? "bg-inverse-surface text-on-primary shadow-md"
              : "border border-outline hover:bg-surface-container text-on-surface"
          )}
        >
          {page}
        </button>
      ))}
      {total > 5 && (
        <>
          <span className="px-2 text-text-muted font-bold">...</span>
          <button
            onClick={() => onChange(total)}
            className="w-10 h-10 flex items-center justify-center border border-outline rounded hover:bg-surface-container transition-colors font-bold text-[13px]"
          >
            {total}
          </button>
        </>
      )}
      <button
        onClick={() => onChange(Math.min(total, current + 1))}
        disabled={current === total}
        className="w-10 h-10 flex items-center justify-center border border-outline rounded hover:bg-surface-container transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <span className="material-symbols-outlined text-[20px]">chevron_right</span>
      </button>
    </div>
  );
}

// ─── Top Navigation ───────────────────────────────────────────────────────────
function Navbar({ searchQuery, onSearchChange }: { searchQuery: string; onSearchChange: (v: string) => void }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartCount] = useState(2);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    import("gsap").then(({ gsap }) => {
      gsap.fromTo(
        navRef.current,
        { y: -70, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
      );
    });
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/", active: false },
    { label: "Browse Equipment", href: "/browse", active: true },
    { label: "Services", href: "#", active: false },
    { label: "Completed Projects", href: "#", active: false },
    { label: "Contact", href: "#", active: false },
  ];

  return (
    <header
      ref={navRef}
      className={cn(
        "fixed top-0 left-0 w-full z-50 flex flex-col transition-all duration-300",
        scrolled ? "shadow-lg" : "shadow-md"
      )}
      style={{ opacity: 0 }}
    >
      <div className="bg-inverse-surface border-b border-white/10 flex justify-between items-center px-4 md:px-8 h-16">
        {/* Logo + Nav */}
        <div className="flex items-center gap-8">
          <a href="/" className="flex items-center gap-2 group">
            <span
              className="font-bold text-industrial-yellow text-[22px] tracking-wide"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Geenab Infra
            </span>
          </a>
          <nav className="hidden md:flex gap-6 items-center">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={cn(
                  "text-[15px] transition-colors duration-200",
                  link.active
                    ? "text-industrial-yellow font-bold border-b-2 border-industrial-yellow pb-1"
                    : "text-on-primary hover:text-industrial-yellow"
                )}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-5">
          {/* Desktop Search */}
          <div className="relative hidden lg:block">
            <input
              type="text"
              placeholder="Search equipment..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="bg-white/10 text-on-primary border border-white/20 px-4 py-1.5 rounded-full text-[14px] w-64 focus:outline-none focus:ring-1 focus:ring-industrial-yellow placeholder-white/50 transition-all"
            />
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-primary text-[18px]">
              search
            </span>
          </div>

          {/* Cart */}
          <button className="relative text-on-primary hover:text-industrial-yellow transition-colors">
            <span className="material-symbols-outlined">shopping_cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-industrial-yellow text-inverse-surface text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Auth */}
          <div className="hidden md:flex items-center gap-3">
            <button className="font-bold text-[13px] uppercase tracking-widest text-on-primary hover:text-industrial-yellow transition-colors">
              Sign In
            </button>
            <button className="bg-primary text-on-primary px-4 py-2 rounded font-bold text-[11px] uppercase tracking-widest hover:scale-95 hover:bg-surface-tint transition-all">
              Sign Up
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-on-primary p-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="material-symbols-outlined">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-inverse-surface border-t border-white/10 px-4 py-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={cn(
                "text-[15px] py-1",
                link.active
                  ? "text-industrial-yellow font-bold"
                  : "text-on-primary/80 hover:text-industrial-yellow"
              )}
            >
              {link.label}
            </a>
          ))}
          <div className="flex gap-3 pt-2 border-t border-white/10">
            <button className="flex-1 border border-white/20 text-on-primary py-2 rounded text-[13px] font-bold">
              Sign In
            </button>
            <button className="flex-1 bg-primary text-on-primary py-2 rounded text-[13px] font-bold">
              Sign Up
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
// Footer replaced by shared <SiteFooter /> component

// ─── Grid Skeleton ────────────────────────────────────────────────────────────
function CardSkeleton() {
  return (
    <div className="bg-surface-white border border-surface-container rounded-lg overflow-hidden animate-pulse">
      <div className="h-48 bg-surface-container" />
      <div className="p-4 space-y-3">
        <div className="h-3 bg-surface-container rounded w-1/3" />
        <div className="h-5 bg-surface-container rounded w-2/3" />
        <div className="h-5 bg-surface-container rounded w-1/2" />
        <div className="h-3 bg-surface-container rounded w-full" />
      </div>
      <div className="px-4 pb-4 grid grid-cols-2 gap-2">
        <div className="col-span-2 h-9 bg-surface-container rounded" />
        <div className="h-9 bg-surface-container rounded" />
        <div className="h-9 bg-surface-container rounded" />
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function BrowseEquipmentPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [listingType, setListingType] = useState("BOTH");
  const [availableOnly, setAvailableOnly] = useState(false);
  const [location, setLocation] = useState("All India");
  const [priceRange, setPriceRange] = useState(5000000);
  const [sortBy, setSortBy] = useState("Relevance");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [comparedIds, setComparedIds] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const gridRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  // Simulate loading
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  // Animate cards in on load
  useEffect(() => {
    if (isLoading || !gridRef.current) return;
    import("gsap").then(({ gsap }) => {
      gsap.fromTo(
        Array.from(gridRef.current!.children),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          delay: 0.2,
        }
      );
    });
  }, [isLoading]);

  // Filter + search
  const filteredEquipment = EQUIPMENT.filter((item) => {
    if (
      searchQuery &&
      !item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !item.category.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    if (selectedCategories.length > 0 && !selectedCategories.includes(item.category)) {
      return false;
    }
    if (listingType !== "BOTH" && item.listingType !== listingType.toLowerCase()) {
      return false;
    }
    if (availableOnly && item.availability !== "available") {
      return false;
    }
    return true;
  });

  const handleCategoryChange = useCallback((cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
    setCurrentPage(1);
  }, []);

  const handleReset = useCallback(() => {
    setSelectedCategories([]);
    setListingType("BOTH");
    setAvailableOnly(false);
    setLocation("All India");
    setPriceRange(5000000);
    setSearchQuery("");
    setCurrentPage(1);
  }, []);

  const handleCompareChange = useCallback((id: number, checked: boolean) => {
    setComparedIds((prev) => {
      if (checked) {
        if (prev.length >= 4) return prev; // max 4 comparisons
        return [...prev, id];
      }
      return prev.filter((i) => i !== id);
    });
  }, []);

  const comparedItems = EQUIPMENT.filter((e) => comparedIds.includes(e.id));

  return (
    <div className="min-h-screen bg-background text-on-surface overflow-x-hidden">
      <Navbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <main
        ref={mainRef}
        className="pt-24 pb-24 px-4 md:px-8 max-w-[1280px] mx-auto flex flex-col md:flex-row gap-6"
      >
        {/* Sidebar */}
        <FilterSidebar
          selectedCategories={selectedCategories}
          onCategoryChange={handleCategoryChange}
          listingType={listingType}
          onListingTypeChange={(t) => { setListingType(t); setCurrentPage(1); }}
          availableOnly={availableOnly}
          onAvailableOnlyChange={setAvailableOnly}
          location={location}
          onLocationChange={setLocation}
          priceRange={priceRange}
          onPriceRangeChange={setPriceRange}
          onReset={handleReset}
        />

        {/* Main content */}
        <section className="flex-grow min-w-0">
          <HeaderControls
            count={filteredEquipment.length}
            sortBy={sortBy}
            onSortChange={setSortBy}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          {/* Active Filters */}
          {(selectedCategories.length > 0 || searchQuery) && (
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedCategories.map((cat) => (
                <span
                  key={cat}
                  className="inline-flex items-center gap-1 bg-primary/10 text-primary border border-primary/30 px-3 py-1 rounded-full text-[12px] font-bold"
                >
                  {cat}
                  <button
                    onClick={() => handleCategoryChange(cat)}
                    className="hover:text-primary-container transition-colors ml-0.5"
                  >
                    <span className="material-symbols-outlined text-[14px] leading-none">close</span>
                  </button>
                </span>
              ))}
              {searchQuery && (
                <span className="inline-flex items-center gap-1 bg-surface-container text-on-surface border border-outline px-3 py-1 rounded-full text-[12px] font-bold">
                  &quot;{searchQuery}&quot;
                  <button onClick={() => setSearchQuery("")}>
                    <span className="material-symbols-outlined text-[14px] leading-none">close</span>
                  </button>
                </span>
              )}
            </div>
          )}

          {/* Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          ) : filteredEquipment.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <span className="material-symbols-outlined text-[64px] text-outline mb-4">
                search_off
              </span>
              <h3
                className="text-[24px] font-bold text-on-surface mb-2"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                No Equipment Found
              </h3>
              <p className="text-text-muted mb-6">
                Try adjusting your filters or search term.
              </p>
              <button
                onClick={handleReset}
                className="bg-primary text-on-primary px-6 py-2.5 rounded font-bold text-[13px] uppercase tracking-wider hover:bg-surface-tint transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div
              ref={gridRef}
              className={cn(
                "gap-6",
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                  : "flex flex-col"
              )}
            >
              {filteredEquipment.map((item) => (
                <EquipmentCard
                  key={item.id}
                  item={item}
                  onCompareChange={handleCompareChange}
                  isCompared={comparedIds.includes(item.id)}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {!isLoading && filteredEquipment.length > 0 && (
            <Pagination
              current={currentPage}
              total={12}
              onChange={setCurrentPage}
            />
          )}
        </section>
      </main>

      <SiteFooter />

      {/* Compare floating bar */}
      <CompareBar
        items={comparedItems}
        onClear={() => setComparedIds([])}
        onCompareNow={() => {
          const ids = comparedIds.join(",");
          window.location.href = `/compare?ids=${ids}`;
        }}
      />
    </div>
  );
}
