"use client";
import SiteFooter from "@/components/SiteFooter";

import { useEffect, useRef, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";

// ─── Shared Equipment Data ────────────────────────────────────────────────────
interface Equipment {
  id: number;
  category: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  hours: number | null;
  location: string;
  availability: "available" | "soon" | "unavailable";
  availabilityLabel: string;
  listingType: "rent" | "sale" | "both";
  badge?: string;
  images: string[];
  verified?: boolean;
  rentDay: string;
  rentMonth: string;
  salePrice: string;
  tags: string[];
  description: string;
  features: string[];
  specs: { label: string; value: string }[];
  fuelType: string;
  enginePower: string;
  operatingWeight: string;
  dimensions: string;
  bucketCapacity: string;
  maxDigDepth: string;
  warranty: string;
}

const ALL_EQUIPMENT: Equipment[] = [
  {
    id: 1,
    category: "Excavators",
    name: "Caterpillar 320 GC",
    brand: "Caterpillar",
    model: "320 GC",
    year: 2022,
    hours: 1200,
    location: "Mumbai, MH",
    availability: "available",
    availabilityLabel: "Available Now",
    listingType: "rent",
    badge: "Best Seller",
    verified: true,
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAz2j2ONXCKMdRebRSHLzrCvn7xVimCPnH96440mIpY9tyYwhriNLnuq9FlNdgXDCnsXPAD356iPrWVj-GK_Rj-_PikHRQSq2PpjWrclY0SG2Fp3PZ6rLQ2cTUsfCjRhF7EUfvgtosYEMATdawlRStXVC4CUNRobCl8_gviVdGRb_OM6N9HiHne4itk2nw5u2o5bt1XgqGHFxX75iByEO-VddM6DhI-1yneYQ71ahRGk3SwCgA7GadBLGzcIEfXZa-H8Y3kMue_EMo",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBMYcO68U7FYwuF783PjTDut2dp8SwLV27NnFcMlcFYipq5bbFQ01qqsaFrlapL0hqA-4L2EQCTQrx15woDt9v01F2JPvJjLzjvzYSVE6XrBkZbSGjX3qF5On_PvBDn2K46BLVHAsGsgqcTeYdHDxT7v3K5s6SqhDVIkCJW3jAs_0maJxZscVNqCJCROZnyYgh1U7HTr2T0mEpFqYhWEBt08QxT-Uq-tBDYZoj1tCkwDcyA3-N-k_JzzZCdlwUBe46pRImmhQJeDtc",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBlBtr78BzswxmTIvaC6g4OJN5ZT7v9OMpigbydEbPdvBSxK7H-ZIq9Azk5uLeoVDCdwQQzhLW1J_Nif3XeGAmR2QwyZ6U3DUaLr9iqsVd-FdOJ7llu86_gUNOkcRSGY4x7JT4D4cS1VpuA6fhAqgSKoTMob6IEynzMiv6fcYMRnLyAsdkua-cppcR8i9bPtQZ9D4PwCn85Ux3t6B5L4IOmcOnZCCpauBqS41XGF7cskyLMGExFAV0bxt_dc95hMRETXTIoLrf4YRg",
    ],
    rentDay: "₹42,000",
    rentMonth: "₹9,80,000",
    salePrice: "₹64,50,000",
    tags: ["Excavator", "Earthmoving", "Heavy Duty"],
    description:
      "The Caterpillar 320 GC is one of the most reliable and fuel-efficient hydraulic excavators in its class. Designed for a wide range of applications including earthmoving, site preparation, and trenching, this machine combines powerful performance with low operating costs. The 320 GC is engineered to maximize productivity while minimizing fuel consumption.",
    features: [
      "Cat C4.4 engine with ACERT technology for fuel efficiency.",
      "Advanced hydraulic system for precise control and responsiveness.",
      "Reinforced undercarriage for long-term durability in harsh conditions.",
      "Spacious ROPS/FOPS certified operator cab with ergonomic controls.",
    ],
    specs: [
      { label: "Model", value: "Caterpillar 320 GC Hydraulic Excavator" },
      { label: "Brand", value: "Caterpillar" },
      { label: "Year of Manufacture", value: "2022" },
      { label: "Operating Capacity", value: "22,000 kg (22 Tons)" },
      { label: "Fuel Type", value: "Diesel (Low Emission)" },
      { label: "Engine Power", value: "112 kW @ 1800 rpm" },
      { label: "Dimensions (L×W×H)", value: "9,370 × 2,590 × 3,080 mm" },
      { label: "Operating Hours", value: "1,200 hrs" },
    ],
    fuelType: "Diesel",
    enginePower: "112 kW (150 hp)",
    operatingWeight: "22,000 kg",
    dimensions: "9,370 × 2,590 × 3,080 mm",
    bucketCapacity: "1.0 m³",
    maxDigDepth: "6.7 m",
    warranty: "1 Year / 2500 hrs",
  },
  {
    id: 2,
    category: "Bulldozers",
    name: "Komatsu D85ESS-2",
    brand: "Komatsu",
    model: "D85ESS-2",
    year: 2021,
    hours: 3400,
    location: "Delhi NCR",
    availability: "available",
    availabilityLabel: "Available Now",
    listingType: "sale",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCdlhUW0iDuqT2WiOtVrnSSKg8CD5XkyAA1CUmrs8ylJQGAZNSrPlQB2-Ze_B7oAksOfvLMfzfyHHF6KM9Uvn_7l7xcCPeekiqn1BrGKCpoTUzrO_8HNj5JbiNcHIcEvEMMQxlzMAhTceMW_CKPx0VJk-iwdw9PsOS2-p88PVp2fByYwFOKQzzLJX51kLBmoDMyc7_0RYbco1kIIKSh-jo4JWxrP7t2Off9JzYCRaS-iIUKFX-9mmQTtDOR_wxREC87kRdBJNxU8gU",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBlBtr78BzswxmTIvaC6g4OJN5ZT7v9OMpigbydEbPdvBSxK7H-ZIq9Azk5uLeoVDCdwQQzhLW1J_Nif3XeGAmR2QwyZ6U3DUaLr9iqsVd-FdOJ7llu86_gUNOkcRSGY4x7JT4D4cS1VpuA6fhAqgSKoTMob6IEynzMiv6fcYMRnLyAsdkua-cppcR8i9bPtQZ9D4PwCn85Ux3t6B5L4IOmcOnZCCpauBqS41XGF7cskyLMGExFAV0bxt_dc95hMRETXTIoLrf4YRg",
    ],
    rentDay: "₹65,000",
    rentMonth: "₹14,50,000",
    salePrice: "₹85,00,000",
    tags: ["Bulldozer", "Earthmoving", "Heavy Duty"],
    description:
      "The Komatsu D85ESS-2 is a powerful super dozer built for heavy-duty land clearing and soil compaction projects. With its high-tractive force and robust build, this dozer excels in mining, quarrying, and large-scale infrastructure projects. The machine is equipped with Komatsu's SIGMADOZER blade for high productivity in varied ground conditions.",
    features: [
      "Komatsu SAA6D114E-5 engine compliant with emission standards.",
      "SIGMADOZER blade for exceptional pushing power and ground contact.",
      "Hydrostatic power steering for precision maneuverability.",
      "Reinforced crawler frames and track links for extended durability.",
    ],
    specs: [
      { label: "Model", value: "Komatsu D85ESS-2 Super Dozer" },
      { label: "Brand", value: "Komatsu" },
      { label: "Year of Manufacture", value: "2021" },
      { label: "Operating Capacity", value: "28,800 kg (28.8 Tons)" },
      { label: "Fuel Type", value: "Diesel" },
      { label: "Engine Power", value: "164 kW @ 1950 rpm" },
      { label: "Dimensions (L×W×H)", value: "5,610 × 3,710 × 3,330 mm" },
      { label: "Operating Hours", value: "3,400 hrs" },
    ],
    fuelType: "Diesel",
    enginePower: "164 kW (220 hp)",
    operatingWeight: "28,800 kg",
    dimensions: "5,610 × 3,710 × 3,330 mm",
    bucketCapacity: "3.5 m³ blade",
    maxDigDepth: "N/A",
    warranty: "2 Years / 4000 hrs",
  },
  {
    id: 3,
    category: "Loaders",
    name: "JCB 455ZX",
    brand: "JCB",
    model: "455ZX",
    year: 2023,
    hours: 850,
    location: "Bangalore, KA",
    availability: "soon",
    availabilityLabel: "In 2 days",
    listingType: "both",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAaoR_uFxV1FYb3lYHaxoL60XVsVqBpDApZQplSK8qEKvwEhkSzL3L0QTN3wJ-z9JjwYLcAsfLphCG5cRro37V9fQX3GPmJIBad176nLp-9d50q5acwJ-rif1lrh_JTTn7UZyK2GY5tRM7OUfakcB7ElxYr3AYnudvcrFViQp03QYXR93Pl0PfZws7B09R-yYz9rORh7ir8D9qvvEah8VbsqTlK3xzlC5Vk6xB4gpI0gG-4FdVpHQTJotPVhCpeo-KEPeOIr3ohNFo",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAz2j2ONXCKMdRebRSHLzrCvn7xVimCPnH96440mIpY9tyYwhriNLnuq9FlNdgXDCnsXPAD356iPrWVj-GK_Rj-_PikHRQSq2PpjWrclY0SG2Fp3PZ6rLQ2cTUsfCjRhF7EUfvgtosYEMATdawlRStXVC4CUNRobCl8_gviVdGRb_OM6N9HiHne4itk2nw5u2o5bt1XgqGHFxX75iByEO-VddM6DhI-1yneYQ71ahRGk3SwCgA7GadBLGzcIEfXZa-H8Y3kMue_EMo",
    ],
    rentDay: "₹28,500",
    rentMonth: "₹6,20,000",
    salePrice: "₹52,00,000",
    tags: ["Loader", "Material Handling", "Compact"],
    description:
      "The JCB 455ZX Wheel Loader is a versatile, high-performance loader engineered for demanding construction and logistics applications. With its Z-bar linkage providing exceptional breakout force and visibility from the cab, this loader is a top choice for quarrying, waste management, and port operations across India.",
    features: [
      "JCB EcoMAX engine delivering high torque at low rpm for fuel savings.",
      "Z-bar loader linkage for superior breakout force and parallel lift.",
      "High-visibility cab with 270° field of view for enhanced safety.",
      "Electronic park brake and ride control as standard features.",
    ],
    specs: [
      { label: "Model", value: "JCB 455ZX Wheel Loader" },
      { label: "Brand", value: "JCB" },
      { label: "Year of Manufacture", value: "2023" },
      { label: "Operating Capacity", value: "16,500 kg (16.5 Tons)" },
      { label: "Fuel Type", value: "Diesel (Low Emission)" },
      { label: "Engine Power", value: "93 kW @ 2200 rpm" },
      { label: "Dimensions (L×W×H)", value: "7,930 × 2,720 × 3,410 mm" },
      { label: "Operating Hours", value: "850 hrs" },
    ],
    fuelType: "Diesel",
    enginePower: "93 kW (125 hp)",
    operatingWeight: "16,500 kg",
    dimensions: "7,930 × 2,720 × 3,410 mm",
    bucketCapacity: "2.1 m³",
    maxDigDepth: "N/A",
    warranty: "2 Years / 3000 hrs",
  },
  {
    id: 4,
    category: "Cranes",
    name: "Liebherr 280 EC-H 12",
    brand: "Liebherr",
    model: "280 EC-H 12",
    year: 2020,
    hours: null,
    location: "Chennai, TN",
    availability: "available",
    availabilityLabel: "Verified",
    listingType: "rent",
    verified: true,
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBOZ5IlozzJcmJEi-jFCs-YionqEo172N-P25Xvmw8shIcOaSU1d1b_CgEoe9DYHEvVPHXkz6ufZIr0Aajm4TGElLc-2XvHf54Rn0ILBxDlI6gkHu09ffO-SP8w9ZRCViBShY0RLc-aTvy2zCXtVrOYUNeDZ0H_yTbSthN0PCou3IVh0bGF3-cEsaK5n1ML_azcmQ5WzxY0WVqWRYnrV17XH6kBYFzDWjwJevo5OSkBJL8Wx8w3jchUUpxsrRuuntKV05riQoPgUWQ",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAz2j2ONXCKMdRebRSHLzrCvn7xVimCPnH96440mIpY9tyYwhriNLnuq9FlNdgXDCnsXPAD356iPrWVj-GK_Rj-_PikHRQSq2PpjWrclY0SG2Fp3PZ6rLQ2cTUsfCjRhF7EUfvgtosYEMATdawlRStXVC4CUNRobCl8_gviVdGRb_OM6N9HiHne4itk2nw5u2o5bt1XgqGHFxX75iByEO-VddM6DhI-1yneYQ71ahRGk3SwCgA7GadBLGzcIEfXZa-H8Y3kMue_EMo",
    ],
    rentDay: "₹1,15,000",
    rentMonth: "₹28,00,000",
    salePrice: "₹3,20,00,000",
    tags: ["Tower Crane", "High-Rise", "Heavy Lift"],
    description:
      "The Liebherr 280 EC-H 12 is a high-performance flat-top crane ideal for high-rise construction and complex assembly projects. With a maximum load capacity of 12 tonnes and a maximum jib length of 80 metres, this crane is a staple of major infrastructure developments across India's metropolitan cities.",
    features: [
      "Liebherr LITRONIC drive system for precise load control.",
      "Compact flat-top design for easy assembly in tight urban spaces.",
      "12-tonne maximum hook load with full electronic monitoring.",
      "Remote diagnostic system for predictive maintenance scheduling.",
    ],
    specs: [
      { label: "Model", value: "Liebherr 280 EC-H 12 Tower Crane" },
      { label: "Brand", value: "Liebherr" },
      { label: "Year of Manufacture", value: "2020" },
      { label: "Max Load Capacity", value: "12,000 kg (12 Tonnes)" },
      { label: "Fuel Type", value: "Electric / Diesel" },
      { label: "Max Jib Length", value: "80 m" },
      { label: "Freestanding Height", value: "Up to 65.8 m" },
      { label: "Hook Height", value: "Up to 161.6 m" },
    ],
    fuelType: "Electric",
    enginePower: "260 kW (350 hp)",
    operatingWeight: "180,000 kg",
    dimensions: "Variable (modular)",
    bucketCapacity: "12 t max load",
    maxDigDepth: "N/A",
    warranty: "3 Years / 5000 hrs",
  },
  {
    id: 5,
    category: "Excavators",
    name: "Volvo EC220E",
    brand: "Volvo",
    model: "EC220E",
    year: 2023,
    hours: 620,
    location: "Hyderabad, TS",
    availability: "available",
    availabilityLabel: "Available Now",
    listingType: "rent",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBlBtr78BzswxmTIvaC6g4OJN5ZT7v9OMpigbydEbPdvBSxK7H-ZIq9Azk5uLeoVDCdwQQzhLW1J_Nif3XeGAmR2QwyZ6U3DUaLr9iqsVd-FdOJ7llu86_gUNOkcRSGY4x7JT4D4cS1VpuA6fhAqgSKoTMob6IEynzMiv6fcYMRnLyAsdkua-cppcR8i9bPtQZ9D4PwCn85Ux3t6B5L4IOmcOnZCCpauBqS41XGF7cskyLMGExFAV0bxt_dc95hMRETXTIoLrf4YRg",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBMYcO68U7FYwuF783PjTDut2dp8SwLV27NnFcMlcFYipq5bbFQ01qqsaFrlapL0hqA-4L2EQCTQrx15woDt9v01F2JPvJjLzjvzYSVE6XrBkZbSGjX3qF5On_PvBDn2K46BLVHAsGsgqcTeYdHDxT7v3K5s6SqhDVIkCJW3jAs_0maJxZscVNqCJCROZnyYgh1U7HTr2T0mEpFqYhWEBt08QxT-Uq-tBDYZoj1tCkwDcyA3-N-k_JzzZCdlwUBe46pRImmhQJeDtc",
    ],
    rentDay: "₹55,000",
    rentMonth: "₹12,50,000",
    salePrice: "₹72,00,000",
    tags: ["Excavator", "Earthmoving", "Fuel Efficient"],
    description:
      "The Volvo EC220E is a 22-tonne crawler excavator built for excellent productivity and low total cost of ownership. With Volvo's ECO mode, it delivers outstanding fuel economy without sacrificing performance. This machine is ideal for medium-duty earthmoving, trenching, and material handling on infrastructure projects.",
    features: [
      "Volvo D5E engine with ECO mode for best-in-class fuel efficiency.",
      "Intelligent Control System for automatic engine speed management.",
      "360° swing with advanced hydraulic regeneration technology.",
      "ROPS/FOPS certified cab with air suspension operator seat.",
    ],
    specs: [
      { label: "Model", value: "Volvo EC220E Crawler Excavator" },
      { label: "Brand", value: "Volvo Construction Equipment" },
      { label: "Year of Manufacture", value: "2023" },
      { label: "Operating Capacity", value: "22,800 kg (22.8 Tons)" },
      { label: "Fuel Type", value: "Diesel (Stage V)" },
      { label: "Engine Power", value: "122 kW @ 1800 rpm" },
      { label: "Dimensions (L×W×H)", value: "9,440 × 2,750 × 3,060 mm" },
      { label: "Operating Hours", value: "620 hrs" },
    ],
    fuelType: "Diesel",
    enginePower: "122 kW (164 hp)",
    operatingWeight: "22,800 kg",
    dimensions: "9,440 × 2,750 × 3,060 mm",
    bucketCapacity: "1.1 m³",
    maxDigDepth: "6.9 m",
    warranty: "2 Years / 4000 hrs",
  },
  {
    id: 6,
    category: "Loaders",
    name: "Case 721G Wheel Loader",
    brand: "Case",
    model: "721G",
    year: 2022,
    hours: 1800,
    location: "Pune, MH",
    availability: "available",
    availabilityLabel: "Available Now",
    listingType: "sale",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAaoR_uFxV1FYb3lYHaxoL60XVsVqBpDApZQplSK8qEKvwEhkSzL3L0QTN3wJ-z9JjwYLcAsfLphCG5cRro37V9fQX3GPmJIBad176nLp-9d50q5acwJ-rif1lrh_JTTn7UZyK2GY5tRM7OUfakcB7ElxYr3AYnudvcrFViQp03QYXR93Pl0PfZws7B09R-yYz9rORh7ir8D9qvvEah8VbsqTlK3xzlC5Vk6xB4gpI0gG-4FdVpHQTJotPVhCpeo-KEPeOIr3ohNFo",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBlBtr78BzswxmTIvaC6g4OJN5ZT7v9OMpigbydEbPdvBSxK7H-ZIq9Azk5uLeoVDCdwQQzhLW1J_Nif3XeGAmR2QwyZ6U3DUaLr9iqsVd-FdOJ7llu86_gUNOkcRSGY4x7JT4D4cS1VpuA6fhAqgSKoTMob6IEynzMiv6fcYMRnLyAsdkua-cppcR8i9bPtQZ9D4PwCn85Ux3t6B5L4IOmcOnZCCpauBqS41XGF7cskyLMGExFAV0bxt_dc95hMRETXTIoLrf4YRg",
    ],
    rentDay: "₹38,000",
    rentMonth: "₹8,50,000",
    salePrice: "₹38,00,000",
    tags: ["Loader", "Wheel Loader", "Heavy Duty"],
    description:
      "The Case 721G is a mid-range wheel loader delivering powerful performance and exceptional versatility. Equipped with a Case FPT engine and an intelligent torque converter, the 721G offers high digging forces, strong lift capacities, and smooth power delivery for a wide range of applications including construction, quarrying, and aggregate handling.",
    features: [
      "Case FPT NEF 6-cylinder engine with precision fuel injection.",
      "Intelligent Power Management for automatic transmission optimization.",
      "Electro-hydraulic controls with ergonomic joystick operation.",
      "Advanced load sensing hydraulic system for energy efficiency.",
    ],
    specs: [
      { label: "Model", value: "Case 721G Wheel Loader" },
      { label: "Brand", value: "Case Construction Equipment" },
      { label: "Year of Manufacture", value: "2022" },
      { label: "Operating Capacity", value: "18,200 kg (18.2 Tons)" },
      { label: "Fuel Type", value: "Diesel" },
      { label: "Engine Power", value: "142 kW @ 2100 rpm" },
      { label: "Dimensions (L×W×H)", value: "8,760 × 2,950 × 3,480 mm" },
      { label: "Operating Hours", value: "1,800 hrs" },
    ],
    fuelType: "Diesel",
    enginePower: "142 kW (190 hp)",
    operatingWeight: "18,200 kg",
    dimensions: "8,760 × 2,950 × 3,480 mm",
    bucketCapacity: "3.8 m³",
    maxDigDepth: "N/A",
    warranty: "2 Years / 3500 hrs",
  },
];

// ─── Utils ────────────────────────────────────────────────────────────────────
function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(" ");
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
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
    { label: "Home", href: "/", active: false },
    { label: "Browse Equipment", href: "/browse", active: true },
    { label: "Services", href: "#", active: false },
    { label: "Completed Projects", href: "#", active: false },
    { label: "Contact", href: "/contact", active: false },
  ];

  return (
    <header
      ref={navRef}
      className={cn("fixed top-0 left-0 w-full z-50 transition-all duration-300", scrolled ? "shadow-lg" : "shadow-md")}
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
                className={cn("text-[15px] transition-colors duration-200", link.active ? "text-industrial-yellow font-bold border-b-2 border-industrial-yellow pb-1" : "text-on-primary hover:text-industrial-yellow")}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <button className="relative text-on-primary hover:text-industrial-yellow transition-colors">
            <span className="material-symbols-outlined">shopping_cart</span>
          </button>
          <div className="hidden md:flex items-center gap-3">
            <button className="px-4 py-1.5 border border-industrial-yellow text-industrial-yellow rounded text-[13px] font-bold hover:bg-industrial-yellow/10 transition-colors">Sign In</button>
            <button className="px-4 py-1.5 bg-industrial-yellow text-inverse-surface rounded text-[13px] font-bold hover:opacity-90 transition-opacity">Sign Up</button>
          </div>
          <button className="md:hidden text-on-primary" onClick={() => setMobileOpen(!mobileOpen)}>
            <span className="material-symbols-outlined">{mobileOpen ? "close" : "menu"}</span>
          </button>
        </div>
      </div>
      {mobileOpen && (
        <div className="md:hidden bg-inverse-surface border-t border-white/10 px-4 py-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className={cn("text-[15px] py-1", link.active ? "text-industrial-yellow font-bold" : "text-on-primary/80 hover:text-industrial-yellow")}>
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

// ─── Image Gallery ────────────────────────────────────────────────────────────
function ImageGallery({ images, name, badge, verified }: { images: string[]; name: string; badge?: string; verified?: boolean }) {
  const [current, setCurrent] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import("gsap").then(({ gsap }) => {
      gsap.fromTo(heroRef.current, { opacity: 0, scale: 1.04 }, { opacity: 1, scale: 1, duration: 0.9, ease: "power3.out", delay: 0.2 });
    });
  }, []);

  const slide = useCallback((dir: number) => {
    const next = (current + dir + images.length) % images.length;
    import("gsap").then(({ gsap }) => {
      gsap.to(sliderRef.current, {
        opacity: 0, x: dir * -20, duration: 0.2, onComplete: () => {
          setCurrent(next);
          gsap.fromTo(sliderRef.current, { opacity: 0, x: dir * 20 }, { opacity: 1, x: 0, duration: 0.35, ease: "power2.out" });
        }
      });
    });
  }, [current, images.length]);

  // Auto-slide
  useEffect(() => {
    const t = setInterval(() => slide(1), 5000);
    return () => clearInterval(t);
  }, [slide]);

  return (
    <section ref={heroRef} className="mt-4 relative h-[400px] md:h-[580px] overflow-hidden rounded-xl group shadow-xl" style={{ opacity: 0 }}>
      {/* Main image */}
      <div ref={sliderRef} className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={images[current]} alt={name} className="w-full h-full object-cover" />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>

      {/* Arrow controls */}
      <button
        onClick={() => slide(-1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-inverse-surface/60 text-on-primary rounded-full flex items-center justify-center hover:bg-industrial-yellow transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm"
      >
        <span className="material-symbols-outlined">chevron_left</span>
      </button>
      <button
        onClick={() => slide(1)}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-inverse-surface/60 text-on-primary rounded-full flex items-center justify-center hover:bg-industrial-yellow transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm"
      >
        <span className="material-symbols-outlined">chevron_right</span>
      </button>

      {/* Badges */}
      <div className="absolute top-4 left-4 flex gap-2">
        {badge && <span className="bg-industrial-yellow text-inverse-surface px-3 py-1 rounded text-[11px] font-bold uppercase">{badge}</span>}
        {verified && <span className="bg-primary text-on-primary px-3 py-1 rounded text-[11px] font-bold uppercase">Verified Fleet</span>}
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={cn("w-2 h-2 rounded-full transition-all duration-300", i === current ? "bg-industrial-yellow w-6" : "bg-white/60")}
          />
        ))}
      </div>

      {/* Image counter */}
      <div className="absolute bottom-4 right-4 bg-black/50 text-white text-[12px] font-bold px-3 py-1 rounded-full backdrop-blur-sm">
        {current + 1} / {images.length}
      </div>
    </section>
  );
}

// ─── Thumbnail Strip ──────────────────────────────────────────────────────────
function ThumbnailStrip({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  return (
    <div className="grid grid-cols-4 gap-2 mt-3">
      {images.slice(0, 3).map((img, i) => (
        <button
          key={i}
          onClick={() => setActive(i)}
          className={cn(
            "aspect-video rounded-lg overflow-hidden border-2 transition-all",
            active === i ? "border-industrial-yellow" : "border-surface-variant opacity-60 hover:opacity-100"
          )}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img} alt={`${name} view ${i + 1}`} className="w-full h-full object-cover" />
        </button>
      ))}
      <div className="aspect-video rounded-lg bg-inverse-surface flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity">
        <span className="text-on-primary text-[13px] font-bold">+12 Photos</span>
      </div>
    </div>
  );
}

// ─── Specs Table ──────────────────────────────────────────────────────────────
function SpecsTable({ specs }: { specs: { label: string; value: string }[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import("gsap").then(({ gsap, ScrollTrigger }) => {
      gsap.registerPlugin(ScrollTrigger);
      if (ref.current) {
        gsap.fromTo(
          Array.from(ref.current.querySelectorAll("tr")),
          { x: -20, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.4, stagger: 0.07, ease: "power2.out", scrollTrigger: { trigger: ref.current, start: "top 85%" } }
        );
      }
    });
  }, []);

  return (
    <div ref={ref} className="bg-surface-white border border-surface-variant rounded-xl overflow-hidden shadow-md">
      <div className="bg-inverse-surface px-4 py-4 flex items-center gap-3">
        <span className="material-symbols-outlined text-industrial-yellow">settings_input_component</span>
        <h3 className="font-bold text-[20px] text-on-primary" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
          Technical Specifications
        </h3>
      </div>
      <table className="w-full text-left">
        <tbody className="divide-y divide-surface-variant">
          {specs.map((spec) => (
            <tr key={spec.label} className="hover:bg-surface-container-low transition-colors">
              <td className="px-4 py-3.5 font-bold text-[13px] text-text-muted bg-surface-container/30 w-1/3 uppercase tracking-wide">{spec.label}</td>
              <td className="px-4 py-3.5 text-[15px] text-on-surface">{spec.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Tabs Section ─────────────────────────────────────────────────────────────
function TabsSection({ description, features, similar }: { description: string; features: string[]; similar: Equipment[] }) {
  const [activeTab, setActiveTab] = useState<"description" | "reviews" | "similar">("description");

  const reviews = [
    { name: "Rahul Sharma", rating: 5, date: "Mar 2024", text: "Excellent machine, very well maintained. The team was professional and delivery was on time. Will rent again for our next project." },
    { name: "Priya Patel", rating: 4, date: "Feb 2024", text: "Good overall performance. The machine was in great condition. Minor delay in pickup but overall satisfied with the service." },
    { name: "Vikram Singh", rating: 5, date: "Jan 2024", text: "Outstanding heavy machinery. Boosted our site productivity by at least 30%. Highly recommended for large-scale excavation work." },
  ];

  return (
    <div className="mt-8">
      <div className="flex border-b border-surface-variant overflow-x-auto">
        {(["description", "reviews", "similar"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-6 py-4 font-bold text-[14px] border-b-2 transition-all whitespace-nowrap capitalize",
              activeTab === tab ? "border-primary text-primary" : "border-transparent text-text-muted hover:text-on-surface"
            )}
          >
            {tab === "reviews" ? "Reviews (24)" : tab === "similar" ? "Similar Equipment" : "Description"}
          </button>
        ))}
      </div>

      {/* Description */}
      {activeTab === "description" && (
        <div className="py-6 space-y-4">
          <p className="text-[18px] text-on-surface leading-relaxed">{description}</p>
          <ul className="space-y-3 mt-4">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-3 text-text-muted text-[15px]">
                <span className="material-symbols-outlined text-industrial-yellow text-[18px] mt-0.5 flex-shrink-0">check_circle</span>
                {f}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Reviews */}
      {activeTab === "reviews" && (
        <div className="py-6 space-y-5">
          {reviews.map((r) => (
            <div key={r.name} className="bg-surface-white border border-surface-variant rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold text-[14px]">
                    {r.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-[14px] text-on-surface">{r.name}</p>
                    <p className="text-[12px] text-text-muted">{r.date}</p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={cn("material-symbols-outlined text-[16px]", i < r.rating ? "text-industrial-yellow" : "text-outline-variant")}
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >star</span>
                  ))}
                </div>
              </div>
              <p className="text-[14px] text-text-muted leading-relaxed">{r.text}</p>
            </div>
          ))}
        </div>
      )}

      {/* Similar */}
      {activeTab === "similar" && (
        <div className="py-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {similar.slice(0, 4).map((eq) => (
            <a
              key={eq.id}
              href={`/equipment/${eq.id}`}
              className="bg-surface-white border border-surface-variant rounded-xl overflow-hidden shadow-sm hover:border-industrial-yellow hover:shadow-md transition-all group flex gap-0"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={eq.images[0]} alt={eq.name} className="w-24 h-24 object-cover flex-shrink-0" />
              <div className="p-3 min-w-0">
                <p className="text-[11px] text-text-muted font-bold uppercase tracking-wide">{eq.category}</p>
                <p className="font-bold text-[15px] text-on-surface truncate">{eq.name}</p>
                <p className="text-primary font-bold text-[14px] mt-1">{eq.rentDay}<span className="text-text-muted font-normal text-[12px]"> / day</span></p>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Quote Modal ──────────────────────────────────────────────────────────────
function QuoteModal({ item, onClose }: { item: Equipment; onClose: () => void }) {
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

  const handleClose = () => {
    import("gsap").then(({ gsap }) => {
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.2 });
      gsap.to(cardRef.current, { opacity: 0, y: 20, duration: 0.2, onComplete: onClose });
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div ref={overlayRef} className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}>
      <div ref={cardRef} className="bg-surface-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="bg-inverse-surface px-6 py-4 flex justify-between items-center border-b-4 border-industrial-yellow">
          <div>
            <h2 className="font-bold text-[22px] text-on-primary" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Get Quotation</h2>
            <p className="text-[13px] text-outline-variant truncate max-w-[220px]">{item.name}</p>
          </div>
          <button onClick={handleClose} className="text-on-primary/60 hover:text-on-primary transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        {submitted ? (
          <div className="p-8 flex flex-col items-center text-center gap-4">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-[36px] text-green-600">check_circle</span>
            </div>
            <h3 className="font-bold text-[20px] text-on-surface" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Quote Requested!</h3>
            <p className="text-text-muted text-[14px]">Our team will contact you within 2 hours.</p>
            <button onClick={handleClose} className="bg-primary text-on-primary px-6 py-2.5 rounded font-bold text-[13px] hover:bg-surface-tint transition-colors">Done</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="bg-surface-container-low rounded-lg p-3 flex items-center gap-3 border border-outline-variant">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.images[0]} alt={item.name} className="w-12 h-12 rounded object-cover" />
              <div>
                <p className="font-bold text-[14px] text-on-surface">{item.name}</p>
                <p className="text-[13px] text-primary font-bold">{item.rentDay}/day · {item.salePrice}</p>
              </div>
            </div>
            {[["Full Name *", "name", "text", "Rajesh Kumar"], ["Phone *", "phone", "tel", "+91 98765 43210"], ["Email", "email", "email", "you@company.com"]].map(([label, key, type, ph]) => (
              <div key={key}>
                <label className="text-[11px] font-bold uppercase tracking-widest text-text-muted block mb-1">{label}</label>
                <input
                  required={label.includes("*")}
                  type={type}
                  placeholder={ph}
                  value={(form as Record<string, string>)[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="w-full border border-outline rounded-lg px-3 py-2.5 text-[14px] focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
                />
              </div>
            ))}
            <div>
              <label className="text-[11px] font-bold uppercase tracking-widest text-text-muted block mb-1">Message</label>
              <textarea
                rows={3}
                placeholder="Site location, duration, special needs..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full border border-outline rounded-lg px-3 py-2.5 text-[14px] focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none resize-none"
              />
            </div>
            <button type="submit" className="w-full bg-industrial-yellow text-inverse-surface py-3 rounded font-bold text-[13px] uppercase tracking-widest hover:opacity-90 active:scale-[0.98] transition-all">
              Submit Quote Request
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

// ─── Sticky Sidebar ───────────────────────────────────────────────────────────
function StickyPricingCard({ item }: { item: Equipment }) {
  const [showQuote, setShowQuote] = useState(false);
  const [inCart, setInCart] = useState(false);
  const [wishlist, setWishlist] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import("gsap").then(({ gsap }) => {
      gsap.fromTo(ref.current, { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.4 });
    });
  }, []);

  const handleAddToCart = () => {
    setInCart(true);
    import("gsap").then(({ gsap }) => {
      gsap.fromTo(".cart-btn", { scale: 1 }, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1, onComplete: () => setInCart(true) });
    });
  };

  const availBg = {
    available: "bg-green-100 text-green-700",
    soon: "bg-industrial-yellow/20 text-tertiary",
    unavailable: "bg-secondary-container text-on-secondary-container",
  }[item.availability];

  return (
    <>
      <div ref={ref} className="space-y-4" style={{ opacity: 0 }}>
        {/* Main card */}
        <div className="bg-surface-white border border-surface-variant rounded-xl p-5 shadow-md">
          {/* Availability + location */}
          <div className="flex items-center justify-between mb-4">
            <span className={cn("px-2 py-0.5 rounded text-[11px] font-bold flex items-center gap-1.5 uppercase", availBg)}>
              {item.availability === "available" && <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />}
              {item.availabilityLabel}
            </span>
            <span className="text-text-muted text-[13px] flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">location_on</span>
              {item.location}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-bold text-[28px] text-inverse-surface leading-tight mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            {item.name}
          </h1>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {item.tags.map((tag) => (
              <span key={tag} className="bg-surface-container px-3 py-1 rounded-full text-[12px] font-bold text-text-muted">{tag}</span>
            ))}
          </div>

          {/* Pricing */}
          <div className="p-4 bg-surface-container-low rounded-lg border-l-4 border-industrial-yellow mb-5">
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-text-muted">Rent / Day</p>
                <p className="text-[22px] font-bold text-primary" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{item.rentDay}</p>
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-text-muted">Rent / Month</p>
                <p className="text-[22px] font-bold text-primary" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{item.rentMonth}</p>
              </div>
            </div>
            <div className="border-t border-surface-variant pt-3">
              <p className="text-[11px] font-bold uppercase tracking-widest text-text-muted">Sale Price</p>
              <p className="text-[26px] font-bold text-inverse-surface" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{item.salePrice}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5">
            <button
              onClick={handleAddToCart}
              className={cn(
                "cart-btn w-full py-4 rounded font-bold text-[16px] flex items-center justify-center gap-2 hover:shadow-lg active:scale-[0.98] transition-all",
                inCart ? "bg-green-600 text-white" : "bg-primary text-on-primary hover:bg-surface-tint"
              )}
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>{inCart ? "check_circle" : "shopping_cart"}</span>
              {inCart ? "Added to Cart!" : "Add to Cart"}
            </button>
            <button
              onClick={() => setShowQuote(true)}
              className="w-full py-4 bg-industrial-yellow text-inverse-surface rounded font-bold text-[16px] flex items-center justify-center gap-2 hover:shadow-lg active:scale-[0.98] transition-all"
            >
              <span className="material-symbols-outlined">request_quote</span>
              Get Quotation
            </button>
            <button className="w-full py-3 bg-inverse-surface text-on-primary rounded font-bold text-[14px] flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all">
              <span className="material-symbols-outlined">contact_support</span>
              Contact Owner
            </button>
          </div>

          {/* Compare + Wishlist */}
          <div className="mt-5 pt-4 border-t border-surface-variant flex items-center justify-between">
            <a
              href={`/compare?ids=${item.id}`}
              className="flex items-center gap-2 text-[13px] font-bold text-text-muted hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">compare_arrows</span>
              Compare Machine
            </a>
            <div className="flex gap-3">
              <button className="text-text-muted hover:text-primary transition-colors">
                <span className="material-symbols-outlined">share</span>
              </button>
              <button
                onClick={() => setWishlist(!wishlist)}
                className={cn("transition-colors", wishlist ? "text-error" : "text-text-muted hover:text-error")}
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: `'FILL' ${wishlist ? 1 : 0}` }}>favorite</span>
              </button>
            </div>
          </div>
        </div>

        {/* Verified badge */}
        {item.verified && (
          <div className="bg-surface-container border border-outline-variant rounded-xl px-4 py-4 flex items-center gap-4 shadow-sm">
            <div className="bg-primary text-on-primary p-2.5 rounded-full flex-shrink-0">
              <span className="material-symbols-outlined">verified_user</span>
            </div>
            <div>
              <p className="font-bold text-[14px] text-inverse-surface">Geenab Verified Listing</p>
              <p className="text-[13px] text-text-muted">Physically inspected by our team of engineers.</p>
            </div>
          </div>
        )}

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: "calendar_today", label: "Year", value: String(item.year) },
            { icon: "schedule", label: "Hours", value: item.hours ? `${item.hours.toLocaleString()} hrs` : "N/A" },
            { icon: "local_gas_station", label: "Fuel", value: item.fuelType },
          ].map((stat) => (
            <div key={stat.label} className="bg-surface-white border border-surface-variant rounded-xl p-3 text-center shadow-sm">
              <span className="material-symbols-outlined text-[20px] text-outline block mb-1">{stat.icon}</span>
              <p className="text-[11px] text-text-muted font-bold uppercase tracking-wide">{stat.label}</p>
              <p className="text-[14px] font-bold text-on-surface">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      {showQuote && <QuoteModal item={item} onClose={() => setShowQuote(false)} />}
    </>
  );
}

// ─── Related Equipment ────────────────────────────────────────────────────────
function RelatedEquipment({ items }: { items: Equipment[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import("gsap").then(({ gsap, ScrollTrigger }) => {
      gsap.registerPlugin(ScrollTrigger);
      if (ref.current) {
        gsap.fromTo(
          Array.from(ref.current.children),
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top 85%" } }
        );
      }
    });
  }, []);

  return (
    <section className="mt-12 border-t-4 border-industrial-yellow pt-10 pb-20">
      <h2 className="font-bold text-[36px] text-inverse-surface mb-8" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
        Similar Equipment Nearby
      </h2>
      <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {items.map((eq) => (
          <a
            key={eq.id}
            href={`/equipment/${eq.id}`}
            className="bg-surface-white rounded-xl overflow-hidden shadow-md group border border-surface-variant hover:border-industrial-yellow hover:shadow-xl transition-all duration-300"
          >
            <div className="relative h-48 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={eq.images[0]} alt={eq.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <span className="absolute top-2 right-2 bg-industrial-yellow text-inverse-surface px-2 py-0.5 rounded text-[10px] font-bold">{eq.year} Model</span>
            </div>
            <div className="p-4">
              <p className="text-[11px] text-text-muted font-bold uppercase tracking-wide">{eq.category}</p>
              <h4 className="font-bold text-[16px] text-on-surface mt-1 truncate">{eq.name}</h4>
              <p className="text-primary font-bold text-[15px] mt-2">{eq.rentDay}<span className="text-text-muted font-normal text-[13px]"> / day</span></p>
              <button className="w-full mt-3 py-2 border-2 border-inverse-surface text-inverse-surface font-bold rounded text-[13px] hover:bg-inverse-surface hover:text-on-primary transition-colors">
                View Details
              </button>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

// Footer replaced by shared <SiteFooter /> component

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function EquipmentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);
  const item = ALL_EQUIPMENT.find((e) => e.id === id);

  // Breadcrumb animation
  const breadRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    import("gsap").then(({ gsap }) => {
      gsap.fromTo(breadRef.current, { y: -10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out", delay: 0.1 });
    });
  }, []);

  if (!item) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <Navbar />
        <span className="material-symbols-outlined text-[64px] text-outline">construction</span>
        <h2 className="text-[28px] font-bold text-on-surface" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Machine Not Found</h2>
        <a href="/browse" className="bg-primary text-on-primary px-6 py-2.5 rounded font-bold text-[13px] uppercase hover:bg-surface-tint transition-colors inline-flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Back to Browse
        </a>
      </div>
    );
  }

  const similar = ALL_EQUIPMENT.filter((e) => e.id !== item.id && (e.category === item.category || e.location.split(",")[0] === item.location.split(",")[0])).slice(0, 4);
  const allSimilar = similar.length < 4 ? [...similar, ...ALL_EQUIPMENT.filter((e) => e.id !== item.id && !similar.includes(e))].slice(0, 4) : similar;

  return (
    <div className="min-h-screen bg-background text-on-surface overflow-x-hidden">
      <Navbar />

      <main className="pt-16 max-w-[1280px] mx-auto px-4 md:px-8 pb-8">
        {/* Breadcrumb */}
        <div ref={breadRef} className="flex items-center gap-2 py-4 text-[13px] text-text-muted" style={{ opacity: 0 }}>
          <a href="/" className="hover:text-primary transition-colors">Home</a>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <a href="/browse" className="hover:text-primary transition-colors">Browse Equipment</a>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-on-surface font-bold truncate max-w-[200px]">{item.name}</span>
        </div>

        {/* Image gallery */}
        <ImageGallery images={item.images} name={item.name} badge={item.badge} verified={item.verified} />

        {/* Main layout */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pb-12">
          {/* Left: 7 cols */}
          <div className="lg:col-span-7 space-y-6">
            <ThumbnailStrip images={item.images} name={item.name} />
            <SpecsTable specs={item.specs} />
            <TabsSection description={item.description} features={item.features} similar={allSimilar} />
          </div>

          {/* Right: 5 cols sticky */}
          <aside className="lg:col-span-5 lg:sticky lg:top-24">
            <StickyPricingCard item={item} />
          </aside>
        </div>

        {/* Related */}
        <RelatedEquipment items={allSimilar} />
      </main>

      <SiteFooter />
    </div>
  );
}
