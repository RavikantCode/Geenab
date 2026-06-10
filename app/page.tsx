// "use client";
// import SiteFooter from "./components/SiteFooter";

// import { useEffect, useRef, useState } from "react";

// // ─── Types ───────────────────────────────────────────────────────────────────
// interface NavItem { label: string; href: string }
// interface Category { title: string; desc: string; tags: string[]; dark: boolean; icon: string }
// interface Project { title: string; desc: string; status: "Completed" | "Active"; partner: string; badge: string; gradient: string }
// interface FeatureCard { icon: string; title: string; desc: string }

// // ─── Data ────────────────────────────────────────────────────────────────────
// const NAV: NavItem[] = [
//   { label: "Home", href: "#" },
//   { label: "Buy/Rent", href: "/browse" },
//   { label: "About", href: "#" },
//   { label: "Locations", href: "#" },
//   { label: "Contact", href: "#contact" },
// ];

// const PARTNERS = ["L&T", "DEPL", "HFCL", "Torrent Power", "Sai Infra"];

// const CATEGORIES: Category[] = [
//   {
//     title: "Heavy Machinery",
//     desc: "Specialized fleet including HDD machines, high-tonnage Excavators, and Tower Cranes.",
//     tags: ["HDD", "Excavators", "Cranes"],
//     dark: true,
//     icon: "🏗️",
//   },
//   {
//     title: "Utility & Ducting",
//     desc: "Everything for underground infrastructure: Duct Pipes, Splicing, and Cable Blowing.",
//     tags: ["Ducting", "Splicing", "Cables"],
//     dark: false,
//     icon: "⚡",
//   },
// ];

// const PROJECTS: Project[] = [
//   {
//     title: "Daman to Navsari Route",
//     desc: "Full-scale HDD deployment and ducting for regional fiber backbone.",
//     status: "Completed",
//     partner: "DEPL",
//     badge: "120 KM",
//     gradient: "from-amber-900/80 via-orange-800/60 to-transparent",
//   },
//   {
//     title: "L&T Defence Project",
//     desc: "Precision cabling and splicing for tactical communication infrastructure.",
//     status: "Active",
//     partner: "L&T",
//     badge: "40 KM",
//     gradient: "from-slate-900/80 via-blue-900/50 to-transparent",
//   },
//   {
//     title: "Smart City Grid",
//     desc: "Comprehensive cable blowing and splicing for smart-metering network.",
//     status: "Completed",
//     partner: "HFCL",
//     badge: "City Biz",
//     gradient: "from-yellow-900/80 via-amber-800/50 to-transparent",
//   },
// ];

// const FEATURE_CARDS: FeatureCard[] = [
//   { icon: "🔧", title: "Fleet Support", desc: "24/7 on-site maintenance and technical assistance." },
//   { icon: "🛡️", title: "Safety First", desc: "All machines strictly meet international safety standards." },
//   { icon: "🤝", title: "Partner Program", desc: "Monetize your idle fleet by joining our verified network." },
//   { icon: "📄", title: "E-Documentation", desc: "Instant logs, billing, and logs directly on your portal." },
// ];

// // ─── Utils ───────────────────────────────────────────────────────────────────
// function cn(...classes: (string | undefined | false)[]) {
//   return classes.filter(Boolean).join(" ");
// }

// // ─── Sub-components ──────────────────────────────────────────────────────────

// function Navbar() {
//   const [open, setOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const ref = useRef<HTMLElement>(null);

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 10);
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   useEffect(() => {
//     import("gsap").then(({ gsap }) => {
//       gsap.fromTo(ref.current,
//         { y: -70, opacity: 0 },
//         { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: 0.1 }
//       );
//     });
//   }, []);

//   return (
//     <nav
//       ref={ref}
//       className={cn(
//         "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
//         scrolled ? "bg-white/95 backdrop-blur shadow-md" : "bg-white border-b border-gray-100"
//       )}
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
//         {/* Logo */}
//         <a href="#" className="font-black text-xl tracking-widest text-gray-900 uppercase">
//           HEAVY<span className="text-[#E8A020]">RENT</span>
//         </a>

//         {/* Desktop Nav */}
//         <div className="hidden md:flex items-center gap-7">
//           {NAV.map((n) => (
//             <a
//               key={n.label}
//               href={n.href}
//               className={cn(
//                 "text-sm font-medium transition-colors duration-150",
//                 n.label === "Home"
//                   ? "text-gray-900 border-b-2 border-[#E8A020] pb-0.5"
//                   : "text-gray-500 hover:text-gray-900"
//               )}
//             >
//               {n.label}
//             </a>
//           ))}
//         </div>

//         {/* Actions */}
//         <div className="hidden md:flex items-center gap-3">
//           <button className="text-sm font-medium text-gray-700 px-4 py-2 border border-gray-200 rounded-lg hover:border-gray-400 transition-colors">
//             I&apos;m Machine Owner
//           </button>
//           <button className="text-sm font-bold text-white bg-[#E8A020] hover:bg-[#d4911a] px-4 py-2 rounded-lg transition-colors shadow-sm">
//             Request Quote
//           </button>
//           <button className="text-gray-500 hover:text-gray-800 p-1.5 transition-colors">
//             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>
//           </button>
//           <button className="text-gray-500 hover:text-gray-800 p-1.5 transition-colors">
//             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
//           </button>
//         </div>

//         {/* Mobile toggle */}
//         <button className="md:hidden p-2 text-gray-700" onClick={() => setOpen(!open)}>
//           {open ? "✕" : "☰"}
//         </button>
//       </div>

//       {/* Mobile menu */}
//       {open && (
//         <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-3">
//           {NAV.map((n) => (
//             <a key={n.label} href={n.href} className="text-sm text-gray-700 font-medium py-1">
//               {n.label}
//             </a>
//           ))}
//           <div className="pt-3 flex flex-col gap-2 border-t border-gray-100">
//             <button className="text-sm border border-gray-200 rounded-lg px-4 py-2">I&apos;m Machine Owner</button>
//             <button className="text-sm bg-[#E8A020] text-white font-bold rounded-lg px-4 py-2">Request Quote</button>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }

// function HeroSection() {
//   const badgeRef = useRef<HTMLDivElement>(null);
//   const h1Ref = useRef<HTMLHeadingElement>(null);
//   const subRef = useRef<HTMLParagraphElement>(null);
//   const searchRef = useRef<HTMLDivElement>(null);
//   const tagsRef = useRef<HTMLDivElement>(null);
//   const imgRef = useRef<HTMLDivElement>(null);
//   const statRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     import("gsap").then(({ gsap }) => {
//       const tl = gsap.timeline({ delay: 0.3 });
//       tl.fromTo(badgeRef.current, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" })
//         .fromTo(h1Ref.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.2")
//         .fromTo(subRef.current, { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, "-=0.4")
//         .fromTo(searchRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }, "-=0.3")
//         .fromTo(tagsRef.current, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }, "-=0.2")
//         .fromTo(imgRef.current, { x: 60, opacity: 0, scale: 0.95 }, { x: 0, opacity: 1, scale: 1, duration: 0.9, ease: "power3.out" }, 0.4)
//         .fromTo(statRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }, "-=0.3");

//       // Subtle float on image
//       gsap.to(imgRef.current, { y: -8, duration: 3.5, ease: "sine.inOut", repeat: -1, yoyo: true, delay: 2 });
//     });
//   }, []);

//   const popular = ["HDD Machine", "Excavator 20T", "JCB 3DX", "Crane"];

//   return (
//     <section className="pt-28 pb-16 bg-white overflow-hidden">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
//           {/* Left */}
//           <div>
//             <div ref={badgeRef} className="flex items-center gap-2 mb-5">
//               <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
//               <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
//                 Live inventory across Odisha &amp; India
//               </span>
//             </div>

//             <h1
//               ref={h1Ref}
//               className="text-5xl sm:text-6xl lg:text-[4rem] xl:text-[4.5rem] font-black leading-none text-gray-900 mb-5"
//               style={{ fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif", letterSpacing: "-0.02em" }}
//             >
//               FIND THE RIGHT{" "}
//               <span className="bg-[#E8A020] text-white px-2 py-0.5 inline-block leading-tight">
//                 CONSTRUCTION
//               </span>{" "}
//               EQUIPMENT IN 30 MINUTES.
//             </h1>

//             <p ref={subRef} className="text-gray-500 text-base leading-relaxed mb-7 max-w-md">
//               Excavators, Cranes, HDD Machines &amp; more with verified operators and clear pricing,
//               delivered to your site in 24 hours.
//             </p>

//             {/* Search Bar */}
//             <div ref={searchRef} className="flex flex-col sm:flex-row items-stretch gap-2 max-w-lg mb-4">
//               <div className="flex items-center gap-2 flex-1 border border-gray-200 rounded-xl px-4 py-3 bg-white shadow-sm focus-within:border-[#E8A020] transition-colors">
//                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" className="flex-shrink-0">
//                   <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
//                 </svg>
//                 <input
//                   type="text"
//                   placeholder="What do you need?"
//                   className="flex-1 text-sm text-gray-700 bg-transparent outline-none placeholder-gray-400 min-w-0"
//                 />
//               </div>
//               <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3 bg-white shadow-sm focus-within:border-[#E8A020] transition-colors">
//                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" className="flex-shrink-0">
//                   <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
//                 </svg>
//                 <select className="text-sm text-gray-600 bg-transparent outline-none cursor-pointer pr-1">
//                   <option>Select Location</option>
//                   <option>Odisha</option>
//                   <option>Maharashtra</option>
//                   <option>Gujarat</option>
//                   <option>Delhi NCR</option>
//                 </select>
//               </div>
//               <button className="bg-[#E8A020] hover:bg-[#d4911a] text-white font-bold text-sm px-6 py-3 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-[#E8A020]/30 whitespace-nowrap">
//                 Search Machines
//               </button>
//             </div>

//             {/* Tags */}
//             <div ref={tagsRef} className="flex flex-wrap items-center gap-2">
//               <span className="text-xs text-gray-400 font-medium">Popular:</span>
//               {popular.map((t) => (
//                 <button
//                   key={t}
//                   className="text-xs text-gray-600 border border-gray-200 px-3 py-1 rounded-full hover:border-[#E8A020] hover:text-[#E8A020] transition-colors duration-150"
//                 >
//                   {t}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Right – Excavator image */}
//           <div ref={imgRef} className="relative">
//             <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-amber-50 to-orange-100 aspect-[4/3]">
//               {/* SVG Excavator illustration */}
//               <svg viewBox="0 0 600 450" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
//                 {/* Sky background */}
//                 <defs>
//                   <linearGradient id="sky" x1="0%" y1="0%" x2="0%" y2="100%">
//                     <stop offset="0%" stopColor="#87CEEB" />
//                     <stop offset="60%" stopColor="#FDB97D" />
//                     <stop offset="100%" stopColor="#E8A020" />
//                   </linearGradient>
//                   <linearGradient id="ground" x1="0%" y1="0%" x2="0%" y2="100%">
//                     <stop offset="0%" stopColor="#8B6914" />
//                     <stop offset="100%" stopColor="#5C4209" />
//                   </linearGradient>
//                   <linearGradient id="body" x1="0%" y1="0%" x2="100%" y2="100%">
//                     <stop offset="0%" stopColor="#F5C518" />
//                     <stop offset="100%" stopColor="#E8A020" />
//                   </linearGradient>
//                   <linearGradient id="cabin" x1="0%" y1="0%" x2="100%" y2="100%">
//                     <stop offset="0%" stopColor="#F0B800" />
//                     <stop offset="100%" stopColor="#CC8800" />
//                   </linearGradient>
//                 </defs>

//                 {/* Sky */}
//                 <rect width="600" height="450" fill="url(#sky)" />

//                 {/* Clouds */}
//                 <ellipse cx="100" cy="80" rx="50" ry="20" fill="white" opacity="0.7" />
//                 <ellipse cx="130" cy="70" rx="40" ry="22" fill="white" opacity="0.6" />
//                 <ellipse cx="80" cy="75" rx="30" ry="15" fill="white" opacity="0.5" />
//                 <ellipse cx="440" cy="60" rx="45" ry="18" fill="white" opacity="0.6" />
//                 <ellipse cx="470" cy="52" rx="35" ry="20" fill="white" opacity="0.5" />

//                 {/* Distant hills */}
//                 <path d="M0 280 Q150 200 300 240 Q450 280 600 220 L600 450 L0 450Z" fill="#A0783C" opacity="0.4" />
//                 <path d="M0 320 Q200 270 400 300 Q500 315 600 280 L600 450 L0 450Z" fill="#8B6914" opacity="0.5" />

//                 {/* Ground */}
//                 <rect x="0" y="350" width="600" height="100" fill="url(#ground)" />
//                 <rect x="0" y="350" width="600" height="8" fill="#A07820" />

//                 {/* Tracks */}
//                 <rect x="120" y="330" width="240" height="28" rx="14" fill="#2a2a2a" />
//                 <rect x="125" y="335" width="230" height="18" rx="9" fill="#1a1a1a" />
//                 {[130, 155, 180, 205, 230, 255, 280, 305, 330].map((x, i) => (
//                   <rect key={i} x={x} y="333" width="16" height="22" rx="3" fill="#3a3a3a" />
//                 ))}

//                 {/* Front wheel */}
//                 <circle cx="155" cy="344" r="22" fill="#333" />
//                 <circle cx="155" cy="344" r="16" fill="#555" />
//                 <circle cx="155" cy="344" r="8" fill="#222" />

//                 {/* Rear wheel */}
//                 <circle cx="325" cy="344" r="22" fill="#333" />
//                 <circle cx="325" cy="344" r="16" fill="#555" />
//                 <circle cx="325" cy="344" r="8" fill="#222" />

//                 {/* Main body */}
//                 <rect x="130" y="280" width="220" height="55" rx="6" fill="url(#body)" />
//                 <rect x="130" y="280" width="220" height="12" rx="3" fill="#F0B800" />

//                 {/* Engine cover */}
//                 <rect x="290" y="265" width="65" height="30" rx="4" fill="#CC8800" />
//                 <rect x="295" y="268" width="55" height="8" rx="2" fill="#E8A020" />

//                 {/* Cabin */}
//                 <rect x="155" y="220" width="110" height="65" rx="8" fill="url(#cabin)" />
//                 {/* Cabin windows */}
//                 <rect x="163" y="228" width="45" height="30" rx="4" fill="#B3D9F7" opacity="0.8" />
//                 <rect x="213" y="228" width="45" height="30" rx="4" fill="#B3D9F7" opacity="0.7" />
//                 <rect x="163" y="262" width="45" height="15" rx="2" fill="#A09020" opacity="0.5" />
//                 {/* Cabin shine */}
//                 <rect x="165" y="230" width="15" height="28" rx="2" fill="white" opacity="0.25" />

//                 {/* Boom arm (main) */}
//                 <rect x="240" y="190" width="16" height="130" rx="7" fill="#CC8800" transform="rotate(-30 248 220)" />
//                 {/* Arm */}
//                 <rect x="310" y="130" width="14" height="110" rx="6" fill="#E8A020" transform="rotate(15 317 185)" />
//                 {/* Bucket */}
//                 <path d="M370 130 L400 135 L405 165 L375 170 Z" fill="#CC8800" />
//                 <path d="M370 165 L405 165 L408 180 L367 180 Z" fill="#A06000" />
//                 {/* Bucket teeth */}
//                 {[372, 382, 392, 402].map((x, i) => (
//                   <rect key={i} x={x} y="180" width="6" height="10" rx="1" fill="#888" />
//                 ))}

//                 {/* Boom cylinder */}
//                 <rect x="248" y="230" width="8" height="50" rx="3" fill="#D4A000" transform="rotate(-20 252 255)" />
//                 {/* Arm cylinder */}
//                 <rect x="312" y="155" width="7" height="45" rx="3" fill="#D4A000" transform="rotate(10 315 178)" />

//                 {/* Exhaust pipe */}
//                 <rect x="288" y="248" width="7" height="22" rx="3" fill="#888" />
//                 {/* Smoke puffs */}
//                 <circle cx="291" cy="244" r="5" fill="#ccc" opacity="0.5" />
//                 <circle cx="289" cy="236" r="7" fill="#ddd" opacity="0.3" />
//                 <circle cx="294" cy="228" r="6" fill="#eee" opacity="0.2" />

//                 {/* Logo on cabin */}
//                 <text x="165" y="295" fill="#7A5200" fontSize="9" fontWeight="900" fontFamily="sans-serif">HEAVYRENT</text>
//               </svg>

//               {/* Stats badge */}
//               <div ref={statRef} className="absolute bottom-4 right-4 bg-white rounded-xl px-4 py-3 shadow-xl border border-gray-100">
//                 <p className="text-2xl font-black text-gray-900">500+</p>
//                 <p className="text-xs text-gray-500 font-medium">Machines Available</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// function PartnersStrip() {
//   const ref = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     import("gsap").then(({ gsap, ScrollTrigger }) => {
//       gsap.registerPlugin(ScrollTrigger);
//       gsap.fromTo(
//         ref.current?.children ?? [],
//         { y: 20, opacity: 0 },
//         {
//           y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out",
//           scrollTrigger: { trigger: ref.current, start: "top 88%" },
//         }
//       );
//     });
//   }, []);

//   return (
//     <section className="bg-gray-50 border-y border-gray-100 py-10">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <p className="text-center text-xs font-bold tracking-[0.2em] uppercase text-gray-400 mb-6">
//           Our Trusted Partners
//         </p>
//         <div ref={ref} className="flex flex-wrap items-center justify-center gap-10 lg:gap-16">
//           {PARTNERS.map((p) => (
//             <span
//               key={p}
//               className="text-gray-600 font-black text-lg tracking-wide hover:text-[#E8A020] transition-colors duration-200 cursor-pointer"
//             >
//               {p}
//             </span>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// function CategoriesSection() {
//   const titleRef = useRef<HTMLDivElement>(null);
//   const cardsRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     import("gsap").then(({ gsap, ScrollTrigger }) => {
//       gsap.registerPlugin(ScrollTrigger);
//       gsap.fromTo(titleRef.current,
//         { y: 30, opacity: 0 },
//         { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: titleRef.current, start: "top 85%" } }
//       );
//       if (cardsRef.current) {
//         gsap.fromTo(Array.from(cardsRef.current.children),
//           { y: 50, opacity: 0 },
//           { y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: "power3.out", scrollTrigger: { trigger: cardsRef.current, start: "top 82%" } }
//         );
//       }
//     });
//   }, []);

//   return (
//     <section className="py-20 bg-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div ref={titleRef} className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
//           <div>
//             <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-2">
//               Tailored Solutions for Every Site
//             </h2>
//             <p className="text-gray-500 text-base max-w-sm">
//               Choose from specialized categories designed to meet specific engineering and construction requirements.
//             </p>
//           </div>
//           <button className="flex items-center gap-1.5 text-sm font-semibold text-[#E8A020] hover:underline transition-all whitespace-nowrap">
//             View All Categories
//             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
//           </button>
//         </div>

//         <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-5">
//           {CATEGORIES.map((cat) => (
//             <CategoryCard key={cat.title} cat={cat} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// function CategoryCard({ cat }: { cat: Category }) {
//   const cardRef = useRef<HTMLDivElement>(null);

//   const handleEnter = () => {
//     import("gsap").then(({ gsap }) => {
//       gsap.to(cardRef.current, { scale: 1.01, duration: 0.25, ease: "power2.out" });
//     });
//   };
//   const handleLeave = () => {
//     import("gsap").then(({ gsap }) => {
//       gsap.to(cardRef.current, { scale: 1, duration: 0.25, ease: "power2.out" });
//     });
//   };

//   return (
//     <div
//       ref={cardRef}
//       onMouseEnter={handleEnter}
//       onMouseLeave={handleLeave}
//       className={cn(
//         "rounded-2xl p-8 min-h-[280px] flex flex-col justify-between cursor-pointer overflow-hidden relative group",
//         cat.dark ? "bg-gray-900 text-white" : "bg-[#E8A020] text-gray-900"
//       )}
//     >
//       {/* Background texture */}
//       <div className={cn("absolute inset-0 opacity-10", cat.dark ? "" : "")}>
//         <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
//           <defs>
//             <pattern id={`grid-${cat.dark}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
//               <circle cx="20" cy="20" r="1" fill="currentColor" />
//             </pattern>
//           </defs>
//           <rect width="100%" height="100%" fill={`url(#grid-${cat.dark})`} />
//         </svg>
//       </div>

//       {/* Big icon bg */}
//       <div className="absolute right-6 bottom-6 text-8xl opacity-10 pointer-events-none select-none transform group-hover:scale-110 transition-transform duration-500">
//         {cat.icon}
//       </div>

//       <div>
//         <div className={cn("text-4xl mb-2", cat.dark ? "opacity-80" : "opacity-70")}>{cat.icon}</div>
//         <h3 className="text-2xl font-black mb-3">{cat.title}</h3>
//         <p className={cn("text-sm leading-relaxed max-w-xs", cat.dark ? "text-gray-400" : "text-gray-800 opacity-80")}>
//           {cat.desc}
//         </p>
//       </div>

//       <div className="flex flex-wrap gap-2 mt-6">
//         {cat.tags.map((tag) => (
//           <span
//             key={tag}
//             className={cn(
//               "text-xs font-semibold px-3 py-1 rounded-full",
//               cat.dark ? "bg-gray-700 text-gray-300" : "bg-black/10 text-gray-900"
//             )}
//           >
//             {tag}
//           </span>
//         ))}
//       </div>
//     </div>
//   );
// }

// function ProjectsSection() {
//   const titleRef = useRef<HTMLDivElement>(null);
//   const gridRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     import("gsap").then(({ gsap, ScrollTrigger }) => {
//       gsap.registerPlugin(ScrollTrigger);
//       gsap.fromTo(titleRef.current,
//         { y: 30, opacity: 0 },
//         { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: titleRef.current, start: "top 85%" } }
//       );
//       if (gridRef.current) {
//         gsap.fromTo(Array.from(gridRef.current.children),
//           { y: 40, opacity: 0 },
//           { y: 0, opacity: 1, duration: 0.65, stagger: 0.15, ease: "power3.out", scrollTrigger: { trigger: gridRef.current, start: "top 82%" } }
//         );
//       }
//     });
//   }, []);

//   return (
//     <section className="py-20 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div ref={titleRef} className="text-center mb-12">
//           <h2 className="text-3xl sm:text-4xl font-black text-gray-900">Featured Project Deployments</h2>
//         </div>

//         <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {PROJECTS.map((proj) => (
//             <ProjectCard key={proj.title} proj={proj} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// function ProjectCard({ proj }: { proj: Project }) {
//   // SVG scenes per project
//   const scenes: Record<string, JSX.Element> = {
//     "Daman to Navsari Route": (
//       <svg viewBox="0 0 400 240" className="w-full h-full">
//         <defs>
//           <linearGradient id="sunset1" x1="0%" y1="0%" x2="0%" y2="100%">
//             <stop offset="0%" stopColor="#FF7A2F" />
//             <stop offset="50%" stopColor="#FF9A50" />
//             <stop offset="100%" stopColor="#FFB870" />
//           </linearGradient>
//         </defs>
//         <rect width="400" height="240" fill="url(#sunset1)" />
//         <ellipse cx="200" cy="280" rx="180" ry="80" fill="#2D4A1E" opacity="0.6" />
//         <rect x="0" y="180" width="400" height="60" fill="#1a3d0a" opacity="0.8" />
//         <rect x="160" y="120" width="80" height="120" fill="#333" opacity="0.7" />
//         <rect x="185" y="100" width="30" height="25" rx="2" fill="#888" opacity="0.8" />
//         <rect x="0" y="170" width="400" height="8" fill="#555" />
//         <rect x="0" y="175" width="400" height="3" fill="#FFD700" opacity="0.7" />
//         <circle cx="200" cy="90" rx="35" r="35" fill="#FF6B00" opacity="0.9" />
//         <circle cx="200" cy="90" r="28" fill="#FFA500" opacity="0.7" />
//       </svg>
//     ),
//     "L&T Defence Project": (
//       <svg viewBox="0 0 400 240" className="w-full h-full">
//         <defs>
//           <linearGradient id="blue1" x1="0%" y1="0%" x2="0%" y2="100%">
//             <stop offset="0%" stopColor="#0F1F3D" />
//             <stop offset="100%" stopColor="#1A3A6B" />
//           </linearGradient>
//         </defs>
//         <rect width="400" height="240" fill="url(#blue1)" />
//         {[40, 100, 160, 220, 280, 340].map((x) => (
//           <g key={x}>
//             <rect x={x} y="60" width="18" height="180" fill="#2A4A8A" opacity="0.8" />
//             <rect x={x - 5} y="50" width="28" height="15" rx="1" fill="#1E3870" />
//             {[80, 110, 140, 170].map((y) => (
//               <rect key={y} x={x + 1} y={y} width="16" height="20" rx="1" fill="#FFD060" opacity="0.6" />
//             ))}
//           </g>
//         ))}
//         <rect x="0" y="200" width="400" height="40" fill="#0a0f1a" />
//         <rect x="0" y="198" width="400" height="5" fill="#3A6ABA" opacity="0.4" />
//       </svg>
//     ),
//     "Smart City Grid": (
//       <svg viewBox="0 0 400 240" className="w-full h-full">
//         <defs>
//           <linearGradient id="amber1" x1="0%" y1="0%" x2="0%" y2="100%">
//             <stop offset="0%" stopColor="#1A0F00" />
//             <stop offset="100%" stopColor="#3D2000" />
//           </linearGradient>
//         </defs>
//         <rect width="400" height="240" fill="url(#amber1)" />
//         <rect x="0" y="170" width="400" height="70" fill="#0f0800" opacity="0.9" />
//         {/* Excavator */}
//         <rect x="180" y="140" width="80" height="35" rx="4" fill="#E8A020" />
//         <rect x="190" y="120" width="50" height="25" rx="4" fill="#CC8800" />
//         <rect x="195" y="124" width="20" height="16" rx="2" fill="#B3D9F7" opacity="0.7" />
//         <rect x="130" y="160" width="140" height="15" rx="7" fill="#222" />
//         <circle cx="150" cy="168" r="12" fill="#333" />
//         <circle cx="250" cy="168" r="12" fill="#333" />
//         {/* Arm */}
//         <rect x="220" y="100" width="10" height="55" rx="4" fill="#CC8800" transform="rotate(-15 225 120)" />
//         <rect x="248" y="75" width="8" height="45" rx="3" fill="#E8A020" transform="rotate(10 252 97)" />
//         {/* City lights */}
//         {[30, 80, 330, 370].map((x, i) => (
//           <g key={i}>
//             <rect x={x} y="80" width="12" height="90" fill="#555" opacity="0.7" />
//             {[90, 110, 130, 150].map((y) => (
//               <rect key={y} x={x + 1} y={y} width="10" height="8" rx="1" fill="#FFD060" opacity="0.7" />
//             ))}
//           </g>
//         ))}
//         {/* Orange glow */}
//         <ellipse cx="200" cy="180" rx="120" ry="30" fill="#E8A020" opacity="0.15" />
//       </svg>
//     ),
//   };

//   return (
//     <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
//       {/* Image area */}
//       <div className="relative h-48 overflow-hidden">
//         {scenes[proj.title]}
//         {/* Overlay */}
//         <div className={`absolute inset-0 bg-gradient-to-t ${proj.gradient}`} />
//         {/* Badge */}
//         <span className="absolute top-3 left-3 bg-black/60 text-white text-xs font-bold px-2.5 py-1 rounded-lg backdrop-blur-sm">
//           {proj.badge}
//         </span>
//       </div>

//       {/* Content */}
//       <div className="p-5">
//         <h3 className="font-bold text-gray-900 text-base mb-1.5">{proj.title}</h3>
//         <p className="text-sm text-gray-500 leading-relaxed mb-4">{proj.desc}</p>
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-1.5">
//             <span
//               className={cn(
//                 "text-xs font-semibold px-2.5 py-0.5 rounded-full",
//                 proj.status === "Active"
//                   ? "bg-green-100 text-green-700"
//                   : "bg-gray-100 text-gray-600"
//               )}
//             >
//               {proj.status}
//             </span>
//           </div>
//           <span className="text-xs text-gray-400 font-medium">Partner: {proj.partner}</span>
//         </div>
//       </div>
//     </div>
//   );
// }

// function WhyUsSection() {
//   const leftRef = useRef<HTMLDivElement>(null);
//   const rightRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     import("gsap").then(({ gsap, ScrollTrigger }) => {
//       gsap.registerPlugin(ScrollTrigger);
//       gsap.fromTo(leftRef.current,
//         { x: -50, opacity: 0 },
//         { x: 0, opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: leftRef.current, start: "top 82%" } }
//       );
//       if (rightRef.current) {
//         gsap.fromTo(Array.from(rightRef.current.children),
//           { y: 30, opacity: 0 },
//           { y: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: "power2.out", scrollTrigger: { trigger: rightRef.current, start: "top 82%" } }
//         );
//       }
//     });
//   }, []);

//   const points = [
//     { icon: "✅", text: "Verified Operators with Every Machine" },
//     { icon: "💰", text: "Zero Hidden Costs & Clear Pricing" },
//     { icon: "⚡", text: "Mobilization within 24 Hours" },
//   ];

//   return (
//     <section className="bg-gray-900 py-20 overflow-hidden">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//           {/* Left */}
//           <div ref={leftRef}>
//             <h2 className="text-4xl sm:text-5xl font-black text-[#E8A020] leading-tight mb-5">
//               Efficiency on Demand
//             </h2>
//             <p className="text-gray-400 text-base leading-relaxed mb-8 max-w-sm">
//               We provide more than just machines. We provide a managed ecosystem that ensures your project never stops.
//             </p>

//             <div className="space-y-3 mb-10">
//               {points.map((p) => (
//                 <div key={p.text} className="flex items-center gap-3">
//                   <span className="text-lg">{p.icon}</span>
//                   <span className="text-gray-200 text-sm font-medium">{p.text}</span>
//                 </div>
//               ))}
//             </div>

//             <div className="flex flex-wrap gap-3">
//               <button className="flex items-center gap-2 bg-[#E8A020] hover:bg-[#d4911a] text-white font-bold text-sm px-6 py-3 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-[#E8A020]/30">
//                 <span>⚡</span> Compare Equipment
//               </button>
//               <button className="flex items-center gap-2 border border-gray-600 hover:border-gray-400 text-gray-200 text-sm font-medium px-6 py-3 rounded-xl transition-all duration-200">
//                 <span>📞</span> Request Callback
//               </button>
//             </div>
//           </div>

//           {/* Right grid */}
//           <div ref={rightRef} className="grid grid-cols-2 gap-4">
//             {FEATURE_CARDS.map((card) => (
//               <div
//                 key={card.title}
//                 className="bg-gray-800 rounded-2xl p-5 hover:bg-gray-750 hover:scale-[1.02] transition-all duration-200 border border-gray-700/50 group"
//               >
//                 <div className="text-2xl mb-3 group-hover:scale-110 transition-transform duration-200 inline-block">
//                   {card.icon}
//                 </div>
//                 <h4 className="text-white font-bold text-sm mb-1.5">{card.title}</h4>
//                 <p className="text-gray-400 text-xs leading-relaxed">{card.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// // Footer replaced by shared <SiteFooter /> component

// // ─── Page ─────────────────────────────────────────────────────────────────────
// export default function HomePage() {
//   return (
//     <main className="overflow-x-hidden">
//       <Navbar />
//       <HeroSection />
//       <PartnersStrip />
//       <CategoriesSection />
//       <ProjectsSection />
//       <WhyUsSection />
//       <SiteFooter />
//     </main>
//   );
// }



"use client";
import SiteFooter from "./components/SiteFooter";
import { useEffect, useRef, useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────
interface NavItem { label: string; href: string }
interface Project { title: string; desc: string; status: "Completed" | "Active"; partner: string; badge: string }
interface FeatureCard { icon: string; title: string; desc: string }
interface Partner { name: string; image?: string; isText?: boolean }

// ─── Data ────────────────────────────────────────────────────────────────────
const NAV: NavItem[] = [
  { label: "Home", href: "#" },
  { label: "Browse Equipment", href: "/browse" },
  { label: "Services", href: "#" },
  { label: "Completed Projects", href: "#" },
  { label: "Contact", href: "#contact" },
];

const PARTNERS: Partner[] = [
  { name: "L&T", image: "/partners/L_T.png" },
  { name: "DEPL", isText: true },
  { name: "HFCL", image: "/partners/HFCL.png" },
  { name: "Torrent Power", image: "/partners/torrent.png" },
  { name: "SS TPL", image: "/partners/sai_infra.png" },
];

const PROJECTS: Project[] = [
  {
    title: "Daman to Navsari Route",
    desc: "Full-scale HDD deployment and ducting for regional fiber backbone.",
    status: "Completed",
    partner: "DEPL",
    badge: "120 KM",
  },
  {
    title: "L&T Defence Project",
    desc: "Precision cabling and splicing for tactical communication infrastructure.",
    status: "Completed",
    partner: "L&T",
    badge: "40 KM",
  },
  {
    title: "Smart City Grid",
    desc: "Comprehensive cable blowing and splicing for smart-metering network.",
    status: "Completed",
    partner: "HFCL",
    badge: "City",
  },
];

const FEATURE_CARDS: FeatureCard[] = [
  { icon: "🔧", title: "Fleet Support", desc: "24/7 on-site maintenance and technical assistance for every deployment." },
  { icon: "🛡️", title: "Safety First", desc: "All machines strictly meet international safety and compliance standards." },
  { icon: "🤝", title: "Partner Program", desc: "Monetize idle fleet by joining our verified owner network." },
  { icon: "📄", title: "E-Documentation", desc: "Instant logs, billing, and certificates directly on your portal." },
];

// ─── Utils ───────────────────────────────────────────────────────────────────
function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(" ");
}

// ─── Navbar ──────────────────────────────────────────────────────────────────
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartCount] = useState(2);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    import("gsap").then(({ gsap }) => {
      gsap.fromTo(ref.current,
        { y: -70, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
      );
    });
  }, []);

  return (
    <header
      ref={ref}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex flex-col transition-all duration-300",
        scrolled ? "shadow-xl" : "shadow-md"
      )}
      style={{ opacity: 0 }}
    >
      <div className="bg-inverse-surface border-b border-white/10 flex justify-between items-center px-4 md:px-8 h-16">
        {/* Logo + Nav */}
        <div className="flex items-center gap-8">
          <a href="#" className="flex items-center gap-2">
            <span
              className="font-bold text-industrial-yellow text-[22px] tracking-wide"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Geenab Infra
            </span>
          </a>
          <nav className="hidden md:flex gap-6 items-center">
            {NAV.map((n) => (
              <a
                key={n.label}
                href={n.href}
                className={cn(
                  "text-[15px] transition-colors duration-200",
                  n.label === "Home"
                    ? "text-industrial-yellow font-bold border-b-2 border-industrial-yellow pb-1"
                    : "text-on-primary hover:text-industrial-yellow"
                )}
              >
                {n.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-5">
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

          {/* Mobile toggle */}
          <button className="md:hidden text-on-primary p-1" onClick={() => setOpen(!open)}>
            <span className="material-symbols-outlined">{open ? "close" : "menu"}</span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-inverse-surface border-t border-white/10 px-4 py-4 flex flex-col gap-3">
          {NAV.map((n) => (
            <a key={n.label} href={n.href}
              className={cn(
                "text-[15px] py-1",
                n.label === "Home" ? "text-industrial-yellow font-bold" : "text-on-primary/80 hover:text-industrial-yellow"
              )}
            >
              {n.label}
            </a>
          ))}
          <div className="flex gap-3 pt-2 border-t border-white/10">
            <button className="flex-1 border border-white/20 text-on-primary py-2 rounded text-[13px] font-bold">Sign In</button>
            <button className="flex-1 bg-primary text-on-primary py-2 rounded text-[13px] font-bold">Sign Up</button>
          </div>
        </div>
      )}
    </header>
  );
}

function HeroSection() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import("gsap").then(({ gsap }) => {
      const tl = gsap.timeline({ delay: 0.4 });
      tl.fromTo(badgeRef.current, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" })
        .fromTo(leftRef.current?.children ?? [], { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power3.out" }, "-=0.2")
        .fromTo(rightRef.current, { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, 0.5)
        .fromTo(statsRef.current?.children ?? [], { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" }, "-=0.3");
    });
  }, []);

  const popular = ["HDD Machine", "Excavator 20T", "JCB 3DX", "Tower Crane"];

  return (
    <section className="bg-[#fdf9f4] pt-20 pb-0 overflow-visible min-h-screen flex flex-col relative">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 flex-1 flex flex-col justify-center">
        {/* Live badge */}
        <div ref={badgeRef} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[11px] font-bold tracking-widest uppercase text-gray-500">
            Live inventory across Gujrat &amp; India
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div ref={leftRef}>
            <h1
              className="text-[4rem] sm:text-[5rem] lg:text-[5.5rem] font-black leading-none mb-6 text-gray-900"
              style={{ fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif", letterSpacing: "-0.02em" }}
            >
              FIND.{" "}
              <span className="text-[#a33800]">RENT.</span>
              <br />
              BUY. SELL.
              <br />
              <span className="bg-[#a33800] text-white px-2">EXECUTE YOUR PROJECT</span>
              <br />
            </h1>

            <p className="text-gray-500 text-[16px] leading-relaxed mb-8 max-w-md">
              Rent machines, find contractors, connect with vendors &amp; execute infrastructure projects across India.
            </p>

            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row items-stretch gap-2 max-w-lg mb-6">
              <div className="flex items-center gap-2 flex-1 border border-[#C8C0B4] rounded-lg px-4 py-3 bg-white focus-within:border-[#a33800] transition-colors shadow-sm">
                <span className="material-symbols-outlined text-[18px] text-gray-400">search</span>
                <input
                  type="text"
                  placeholder="What do you need?"
                  className="flex-1 text-[14px] text-gray-700 bg-transparent outline-none placeholder-gray-400 min-w-0"
                />
              </div>
              <div className="flex items-center gap-2 border border-[#C8C0B4] rounded-lg px-4 py-3 bg-white focus-within:border-[#a33800] transition-colors shadow-sm">
                <span className="material-symbols-outlined text-[16px] text-gray-400">location_on</span>
                <select className="text-[14px] text-gray-700 bg-transparent outline-none cursor-pointer pr-1">
                  <option>All India</option>
                  <option>Odisha</option>
                  <option>Maharashtra</option>
                  <option>Gujarat</option>
                  <option>Delhi NCR</option>
                </select>
              </div>
              <button className="bg-black text-white font-bold text-[11px] px-6 py-3 rounded-lg transition-all duration-200 uppercase tracking-widest whitespace-nowrap hover:bg-[#a33800] active:scale-95">
                Search
              </button>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">Popular:</span>
              {popular.map((t) => (
                <button
                  key={t}
                  className="text-[11px] text-gray-600 border border-[#C8C0B4] px-3 py-1 rounded font-bold uppercase tracking-wide hover:border-[#a33800] hover:text-[#a33800] transition-colors duration-150 bg-white"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Right – Real HDD Machine (bleed-out effect) */}
          <div ref={rightRef} className="relative flex items-end justify-center" style={{ overflow: "visible" }}>

            {/* Machine image – white bg removed via multiply, bleeds below section */}
            <div
              className="relative w-full"
              style={{ overflow: "visible" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/HDD_Hero.png"
                style={{
                  width: "115%",
                  maxWidth: "none",
                  display: "block",
                  mixBlendMode: "multiply",
                  position: "relative",
                  bottom: "-40px",
                  right: "-5%",
                  filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.18))",
                  zIndex: -1,
                  pointerEvents: "none",
                  userSelect: "none",
                }}
              />
            </div>
          </div>
        </div>

        
      </div>
    </section>
  );
}

// ─── Partners Strip ───────────────────────────────────────────────────────────
function PartnersStrip() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import("gsap").then(({ gsap, ScrollTrigger }) => {
      gsap.registerPlugin(ScrollTrigger);
      gsap.fromTo(ref.current?.children ?? [],
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out", scrollTrigger: { trigger: ref.current, start: "top 88%" } }
      );
    });
  }, []);

  return (
    <section className="bg-surface-container border-y border-surface-dim py-10">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <p className="text-center text-[11px] font-bold tracking-widest uppercase text-text-muted mb-6">
          Out lobal partners and trusted by industry leaders
        </p>
        <div ref={ref} className="flex flex-wrap items-center justify-center gap-10 lg:gap-16">
          {PARTNERS.map((p) => (
            <div key={p.name} className="h-12 flex items-center justify-center hover:opacity-80 transition-opacity duration-200 cursor-pointer">
              {p.isText ? (
                <span
                  className="text-on-surface font-black text-lg tracking-wide"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  {p.name}
                </span>
              ) : (
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-full w-auto max-w-[150px] object-contain"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Browse CTA Section ───────────────────────────────────────────────────────
function BrowseCTA() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import("gsap").then(({ gsap, ScrollTrigger }) => {
      gsap.registerPlugin(ScrollTrigger);
      gsap.fromTo(ref.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top 85%" } }
      );
    });
  }, []);

  const categories = [
    { label: "Excavators", count: "24 listed", icon: "🏗️", image: "/equipment/excavatorss.png" },
    { label: "Bulldozers", count: "11 listed", icon: "🚧", image: "/equipment/bulldozers.png" },
    { label: "Cranes", count: "8 listed", icon: "⚙️", image: "/equipment/crane_2.jfif" },
    { label: "Loaders", count: "18 listed", icon: "🔩", image: "/equipment/loaders.jpg" },
    { label: "HDD Machines", count: "6 listed", icon: "⚡", image: "/equipment/hdd_machine.jpg" },
    { label: "Compactors", count: "9 listed", icon: "🛠️", image: "/equipment/compactors.webp" },
  ];

  return (
    <section className="py-20 bg-background">
      <div ref={ref} className="max-w-[1280px] mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <p className="text-[11px] font-bold tracking-widest uppercase text-primary mb-2">Equipment Marketplace</p>
            <h2
              className="text-[2.5rem] font-black text-on-surface leading-none"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              FIND YOUR MACHINE
            </h2>
          </div>
          <a
            href="/browse"
            className="inline-flex items-center gap-2 bg-inverse-surface text-on-primary px-6 py-3 rounded font-bold text-[11px] uppercase tracking-widest hover:bg-black transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">grid_view</span>
            Browse All Equipment
          </a>
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {categories.map((cat) => (
            <a
              key={cat.label}
              href="/browse"
              className="bg-surface-white border border-surface-container rounded-lg p-5 hover:border-industrial-yellow hover:shadow-lg transition-all duration-200 group text-center overflow-hidden"
            >
              <div className="mb-3 h-20 flex items-center justify-center">
                {cat.image ? (
                  <img src={cat.image} alt={cat.label} className="h-full w-full object-contain" />
                ) : (
                  <div className="text-3xl">{cat.icon}</div>
                )}
              </div>
              <p className="font-bold text-[13px] text-on-surface mb-1 group-hover:text-primary transition-colors" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                {cat.label}
              </p>
              <p className="text-[11px] text-text-muted font-medium">{cat.count}</p>
            </a>
          ))}
        </div>

        {/* Mini search prompt */}
        <div className="bg-surface-white border border-surface-container rounded-lg p-6 flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-1 flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-[28px]">search</span>
            <div>
              <p className="font-bold text-[15px] text-on-surface">Can&apos;t find what you need?</p>
              <p className="text-[13px] text-text-muted">Use our advanced filters to narrow by location, price, and availability.</p>
            </div>
          </div>
          <a
            href="/browse"
            className="bg-primary text-on-primary px-6 py-2.5 rounded font-bold text-[11px] uppercase tracking-widest hover:bg-surface-tint transition-colors whitespace-nowrap"
          >
            Advanced Search
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Projects Section ─────────────────────────────────────────────────────────
function ProjectsSection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import("gsap").then(({ gsap, ScrollTrigger }) => {
      gsap.registerPlugin(ScrollTrigger);
      gsap.fromTo(titleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: titleRef.current, start: "top 85%" } }
      );
      if (gridRef.current) {
        gsap.fromTo(Array.from(gridRef.current.children),
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65, stagger: 0.15, ease: "power3.out", scrollTrigger: { trigger: gridRef.current, start: "top 82%" } }
        );
      }
    });
  }, []);

  return (
    <section className="py-20 bg-inverse-surface">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div ref={titleRef} className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <p className="text-[11px] font-bold tracking-widest uppercase text-industrial-yellow mb-2">Project Portfolio</p>
            <h2
              className="text-[2.5rem] font-black text-on-primary leading-none"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              FEATURED DEPLOYMENTS
            </h2>
          </div>
          <button className="inline-flex items-center gap-2 border border-white/20 text-on-primary px-6 py-3 rounded font-bold text-[11px] uppercase tracking-widest hover:border-industrial-yellow hover:text-industrial-yellow transition-colors self-start sm:self-auto">
            View All Projects
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PROJECTS.map((proj) => (
            <div
              key={proj.title}
              className="bg-surface-white border border-surface-container rounded-lg overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              {/* Colored header strip */}
              <div className={cn(
                "h-2 w-full",
                proj.status === "Active" ? "bg-green-500" : "bg-industrial-yellow"
              )} />

              <div className="p-6">
                {/* Badge row */}
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-inverse-surface text-on-primary text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-widest">
                    {proj.badge}
                  </span>
                  <span className={cn(
                    "text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider",
                    proj.status === "Active" ? "bg-green-100 text-green-700" : "bg-surface-container text-text-muted"
                  )}>
                    {proj.status}
                  </span>
                </div>

                <h3
                  className="font-black text-[20px] text-on-surface mb-2 leading-tight"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  {proj.title}
                </h3>
                <p className="text-[13px] text-text-muted leading-relaxed mb-5">{proj.desc}</p>

                <div className="flex items-center justify-between pt-4 border-t border-surface-container">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-text-muted">
                    Partner: <span className="text-primary">{proj.partner}</span>
                  </span>
                  <button className="text-[11px] font-bold uppercase tracking-widest text-on-surface hover:text-primary transition-colors flex items-center gap-1">
                    Details
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Why Us Section ───────────────────────────────────────────────────────────
function WhyUsSection() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import("gsap").then(({ gsap, ScrollTrigger }) => {
      gsap.registerPlugin(ScrollTrigger);
      gsap.fromTo(leftRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: leftRef.current, start: "top 82%" } }
      );
      if (rightRef.current) {
        gsap.fromTo(Array.from(rightRef.current.children),
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: "power2.out", scrollTrigger: { trigger: rightRef.current, start: "top 82%" } }
        );
      }
    });
  }, []);

  const points = [
    { icon: "check_circle", text: "Verified Operators with Every Machine" },
    { icon: "payments", text: "Zero Hidden Costs & Clear Pricing" },
    { icon: "bolt", text: "Mobilization within 24 Hours" },
  ];

  return (
    <section className="bg-background py-20 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div ref={leftRef}>
            <p className="text-[11px] font-bold tracking-widest uppercase text-primary mb-4">Why Choose Us</p>
            <h2
              className="text-[3rem] sm:text-[3.5rem] font-black text-on-surface leading-none mb-5"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              EFFICIENCY<br />
              <span className="text-primary">ON DEMAND.</span>
            </h2>
            <p className="text-text-muted text-[15px] leading-relaxed mb-8 max-w-sm">
              More than machines. A managed ecosystem that ensures your project never stops moving.
            </p>

            <div className="space-y-4 mb-10">
              {points.map((p) => (
                <div key={p.text} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-primary text-[18px]">{p.icon}</span>
                  </div>
                  <span className="text-on-surface text-[14px] font-medium">{p.text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="/browse"
                className="inline-flex items-center gap-2 bg-inverse-surface text-on-primary font-bold text-[11px] px-6 py-3 rounded uppercase tracking-widest hover:bg-black transition-all duration-200"
              >
                <span className="material-symbols-outlined text-[16px]">compare_arrows</span>
                Browse Equipment
              </a>
              <button className="inline-flex items-center gap-2 border border-outline text-on-surface text-[11px] font-bold px-6 py-3 rounded uppercase tracking-widest hover:border-primary hover:text-primary transition-all duration-200">
                <span className="material-symbols-outlined text-[16px]">phone_in_talk</span>
                Request Callback
              </button>
            </div>
          </div>

          {/* Right grid */}
          <div ref={rightRef} className="grid grid-cols-2 gap-4">
            {FEATURE_CARDS.map((card) => (
              <div
                key={card.title}
                className="bg-surface-white border border-surface-container rounded-lg p-5 hover:border-industrial-yellow hover:shadow-lg transition-all duration-200 group"
              >
                <div className="text-2xl mb-3 group-hover:scale-110 transition-transform duration-200 inline-block">
                  {card.icon}
                </div>
                <h4
                  className="text-on-surface font-black text-[16px] mb-1.5"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  {card.title}
                </h4>
                <p className="text-text-muted text-[12px] leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Machine Owner CTA ────────────────────────────────────────────────────────
function OwnerCTA() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import("gsap").then(({ gsap, ScrollTrigger }) => {
      gsap.registerPlugin(ScrollTrigger);
      gsap.fromTo(ref.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top 88%" } }
      );
    });
  }, []);

  return (
    <section className="bg-inverse-surface py-20" id="contact">
      <div ref={ref} className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="border border-industrial-yellow/30 rounded-lg p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-industrial-yellow text-[11px] font-bold uppercase tracking-widest mb-3">For Machine Owners</p>
            <h2
              className="text-[2.5rem] font-black text-on-primary leading-none mb-3"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              OWN IDLE EQUIPMENT?
              <br />
              <span className="text-industrial-yellow">EARN FROM IT.</span>
            </h2>
            <p className="text-on-primary/60 text-[15px] max-w-md">
              List your machinery on our verified network and get matched with construction projects across India.
            </p>
          </div>
          <div className="flex flex-col gap-3 min-w-[200px]">
            <button className="bg-primary text-on-primary px-8 py-3 rounded font-bold text-[11px] uppercase tracking-widest hover:bg-surface-tint hover:scale-[0.98] transition-all">
              List My Equipment
            </button>
            <button className="border border-white/20 text-on-primary px-8 py-3 rounded font-bold text-[11px] uppercase tracking-widest hover:border-white/50 transition-all">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <PartnersStrip />
      <BrowseCTA />
      <ProjectsSection />
      <WhyUsSection />
      <OwnerCTA />
      <SiteFooter />
    </main>
  );
}