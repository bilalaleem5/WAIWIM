import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { 
  Building2, Landmark, Stethoscope, Microscope, 
  ArrowRight, Sparkles, Globe2, ShieldCheck, 
  FlaskConical, Dna, Activity, Scale, Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "./language";
import { cn } from "@/lib/utils";

/* =========================================================================
   07 — SOVEREIGN ALLIANCES WITH PREMIER ACADEMIC & CLINICAL CENTERS
   - 2-Column Split Architecture Matching Custom Reference Design
   - Left: Editorial Sovereign Statement, Badge & Charter CTA
   - Right: "Consortium Explorer" with Organic Green Orbital Ribbon Loop
   - Floating Interactive Pebble Nodes with Connected Callout Speech Card
   - Pinned Live Metric Card with Circular Progress Gauge & Heartbeat Wave
   - Bilingual Arabic (RTL) & English (LTR) Support
   ========================================================================= */

interface ConsortiumPartner {
  id: number;
  nameEn: string;
  nameAr: string;
  shortNameEn: string;
  shortNameAr: string;
  categoryEn: string;
  categoryAr: string;
  scopeEn: string;
  scopeAr: string;
  icon: typeof Landmark;
  metricVal: string;
  metricUnit: string;
  metricLabelEn: string;
  metricLabelAr: string;
  gaugePercent: number;
  nodePos: { x: number; y: number }; // Percentage in explorer area (0-100)
  calloutPos: { left: string; top: string; arrowDir: "left" | "right" | "top" | "bottom" };
}

export function AlliancesConstellation() {
  const { language, pick } = useLanguage();
  const [activeId, setActiveId] = useState<number>(0);
  const [isAutoCycling, setIsAutoCycling] = useState<boolean>(true);

  // 5 Strategic Consortium Partners
  const partners: ConsortiumPartner[] = [
    {
      id: 0,
      nameEn: "King Saud University Medical City",
      nameAr: "المدينة الطبية بجامعة الملك سعود",
      shortNameEn: "King Saud University Medical City",
      shortNameAr: "جامعة الملك سعود الطبية",
      categoryEn: "Academic Medical Center",
      categoryAr: "مركز طبي جامعي وأكاديمي",
      scopeEn: "Joint AI research chair in computational genomics & clinical fellowship training.",
      scopeAr: "كرسي أبحاث مشترك في الجينوم الحاسوبي وتدريب الأطباء على تطبيقات الذكاء الاصطناعي.",
      icon: Landmark,
      metricVal: "420+",
      metricUnit: "Fellows",
      metricLabelEn: "Trained to Date",
      metricLabelAr: "أطباء وباحثين تم تدريبهم",
      gaugePercent: 78,
      nodePos: { x: 26, y: 22 },
      calloutPos: { left: "44%", top: "22%", arrowDir: "left" }
    },
    {
      id: 1,
      nameEn: "Specialist & Teaching Hospitals",
      nameAr: "المستشفيات التخصصية والتعليمية",
      shortNameEn: "Specialist & Teaching Hospitals",
      shortNameAr: "المستشفيات التخصصية والتعليمية",
      categoryEn: "Tertiary Clinical Care",
      categoryAr: "الرعاية السريرية المتقدمة",
      scopeEn: "Direct integration of recalibrated ICU respirators and advanced hemodialysis units.",
      scopeAr: "استقبال وتشغيل الأجهزة الطبية المعايرة في أقسام العناية المركزة والغسيل الكلوي.",
      icon: Stethoscope,
      metricVal: "840+",
      metricUnit: "Devices",
      metricLabelEn: "Clinical Fleet",
      metricLabelAr: "أجهزة طبية نشطة",
      gaugePercent: 88,
      nodePos: { x: 74, y: 15 },
      calloutPos: { left: "46%", top: "25%", arrowDir: "right" }
    },
    {
      id: 2,
      nameEn: "National Genomic Research Centers",
      nameAr: "مراكز الأبحاث الجينومية الوطنية",
      shortNameEn: "National Genomic Research Centers",
      shortNameAr: "المراكز الجينومية الوطنية",
      categoryEn: "Translational Biotechnology",
      categoryAr: "التقنية الحيوية الانتقالية",
      scopeEn: "High-performance bio-cluster access for target identification & crystallography modeling.",
      scopeAr: "توفير قدرات الحوسبة الفائقة لنمذجة البروتينات واكتشاف الأهداف الدوائية الوطنية.",
      icon: Microscope,
      metricVal: "1.2",
      metricUnit: "PFLOPS",
      metricLabelEn: "Bio-Supercompute",
      metricLabelAr: "حوسبة حيوية فائقة",
      gaugePercent: 92,
      nodePos: { x: 62, y: 52 },
      calloutPos: { left: "28%", top: "45%", arrowDir: "right" }
    },
    {
      id: 3,
      nameEn: "Saudi Health Regulatory Authorities",
      nameAr: "الهيئات الصحية والتنظيمية بالمملكة",
      shortNameEn: "Saudi Health Regulatory Authorities",
      shortNameAr: "الهيئات التنظيمية الصحية",
      categoryEn: "Sovereign Compliance",
      categoryAr: "المشروعية والامتثال السيادي",
      scopeEn: "Full statutory compliance under NCNP #5421 and SFDA medical equipment standards.",
      scopeAr: "الامتثال الكامل لاشتراطات المركز الوطني للقطاع غير الربحي وهيئة الغذاء والدواء.",
      icon: Scale,
      metricVal: "99.2%",
      metricUnit: "Index",
      metricLabelEn: "Statutory Index",
      metricLabelAr: "مؤشر الامتثال السيادي",
      gaugePercent: 99,
      nodePos: { x: 18, y: 58 },
      calloutPos: { left: "38%", top: "54%", arrowDir: "left" }
    },
    {
      id: 4,
      nameEn: "Pharmaceutical & Biotech",
      nameAr: "قطاع صناعة الدواء والتقنية الحيوية",
      shortNameEn: "Pharmaceutical & Biotech",
      shortNameAr: "قطاع الدواء والبيوتك",
      categoryEn: "Translational Pipeline",
      categoryAr: "التصنيع الدوائي المتقدم",
      scopeEn: "Accelerating preclinical candidate synthesis and regional licensing agreements.",
      scopeAr: "تسريع نقل وتصنيع المركبات العلاجية الواعدة محلياً لدعم الأمن الدوائي الوطني.",
      icon: FlaskConical,
      metricVal: "6",
      metricUnit: "Patents",
      metricLabelEn: "Active Filings",
      metricLabelAr: "براءات اختراع قيد التسجيل",
      gaugePercent: 65,
      nodePos: { x: 28, y: 84 },
      calloutPos: { left: "46%", top: "68%", arrowDir: "left" }
    }
  ];

  // Auto cycle through consortium partners every 5 seconds when not interacting
  useEffect(() => {
    if (!isAutoCycling) return;
    const interval = setInterval(() => {
      setActiveId((prev) => (prev + 1) % partners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoCycling, partners.length]);

  const active = partners[activeId];

  // SVG Gauge calculations
  const radius = 26;
  const circumference = 2 * Math.PI * radius; // ~163.36
  const strokeOffset = circumference - (circumference * active.gaugePercent) / 100;

  return (
    <section 
      id="alliances-constellation"
      className="relative py-20 lg:py-28 bg-[#fafcfc] overflow-hidden border-b border-slate-200"
    >
      {/* Subtle Ambient Background Warmth & Wireframe Globe Elements */}
      <div className="absolute top-1/4 -left-32 size-[42rem] rounded-full bg-emerald-50/50 blur-[130px] pointer-events-none" />
      <div className="absolute top-1/3 -right-32 size-[40rem] rounded-full bg-amber-50/40 blur-[120px] pointer-events-none" />

      {/* Background Geodesic Wireframe Globe (Left Side Accent) */}
      <div className="absolute -left-20 bottom-4 size-72 sm:size-96 pointer-events-none opacity-[0.06] select-none">
        <svg viewBox="0 0 200 200" className="size-full">
          <circle cx="100" cy="100" r="90" fill="none" stroke="#0f172a" strokeWidth="1" strokeDasharray="3 3" />
          <ellipse cx="100" cy="100" rx="90" ry="40" fill="none" stroke="#0f172a" strokeWidth="1" />
          <ellipse cx="100" cy="100" rx="40" ry="90" fill="none" stroke="#0f172a" strokeWidth="1" />
          <line x1="10" y1="100" x2="190" y2="100" stroke="#0f172a" strokeWidth="1" strokeDasharray="2 3" />
          <line x1="100" y1="10" x2="100" y2="190" stroke="#0f172a" strokeWidth="1" strokeDasharray="2 3" />
        </svg>
      </div>

      <div className="max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* =========================================================================
           2-COLUMN SPLIT ARCHITECTURE
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* =======================================================================
             LEFT COLUMN: EDITORIAL SOVEREIGN ALLIANCES STATEMENT
             ======================================================================= */}
          <div className="lg:col-span-5 space-y-6 text-start">
            
            {/* Pill Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-[11px] sm:text-xs font-mono font-bold tracking-tight shadow-2xs">
              <Globe2 className="size-3.5 text-emerald-700" />
              <span>
                {pick([
                  "STRATEGIC ALLIANCES // ACADEMIC CONSORTIUM",
                  "التحالفات الاستراتيجية // الشراكات الأكاديمية"
                ])}
              </span>
            </div>

            {/* Display Heading with Forest Green Accent */}
            <h2 className="text-3xl sm:text-4xl lg:text-[3.25rem] font-display font-black text-slate-950 tracking-tight leading-[1.12]">
              {language === "ar" ? (
                <>
                  تحالفات سيادية مع كبرى{" "}
                  <span className="text-emerald-700 block mt-1">
                    الجامعات والمستشفيات التخصصية
                  </span>
                </>
              ) : (
                <>
                  Sovereign Alliances with Premier{" "}
                  <span className="text-emerald-700 block mt-1">
                    Academic & Clinical Centers
                  </span>
                </>
              )}
            </h2>

            {/* Subtitle Paragraph */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl font-normal">
              {pick([
                "Collaborating with premier universities, teaching hospitals, government bodies, and pharmaceutical manufacturers to build Saudi Arabia's biotechnology sovereignty.",
                "شراكات استراتيجية تجمع الجامعات العريقة، المستشفيات التعليمية، الهيئات الحكومية ومصانع الدواء لترسيخ السيادة الصحية والدوائية للمملكة."
              ])}
            </p>

            {/* View Consortium Charter Button */}
            <div className="pt-2">
              <Button 
                asChild 
                variant="outline" 
                className="rounded-full font-bold border-slate-300 hover:border-emerald-600 hover:bg-emerald-50/50 text-slate-900 text-xs sm:text-sm h-11 px-6 shadow-xs transition-all group"
              >
                <Link to="/about">
                  <span>{pick(["View Consortium Charter", "ميثاق التحالفات الوطنية"])}</span>
                  <ArrowRight className="size-3.5 ms-2 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                </Link>
              </Button>
            </div>

          </div>

          {/* =======================================================================
             RIGHT COLUMN: CONSORTIUM EXPLORER (The Interactive Spatial Cluster)
             ======================================================================= */}
          <div className="lg:col-span-7 relative">
            
            {/* Header: Consortium Explorer */}
            <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-slate-200/70 mb-4 sm:mb-6">
              <h3 className="font-display font-bold text-slate-900 text-base sm:text-lg tracking-tight">
                {language === "ar" ? "مستكشف التحالفات الأكاديمية" : "Consortium Explorer"}
              </h3>

              <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-slate-500">
                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>{isAutoCycling ? "ORBIT ACTIVE" : "MANUAL FOCUS"}</span>
                <button
                  onClick={() => setIsAutoCycling(!isAutoCycling)}
                  className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-600 text-[9px] cursor-pointer ml-1"
                >
                  {isAutoCycling ? "PAUSE" : "RESUME"}
                </button>
              </div>
            </div>

            {/* ===================================================================
               THE SPATIAL CLUSTER ARENA
               - Canvas height: 460px
               - Organic curved emerald ribbon connecting the nodes
               - Interactive pebble nodes
               - Connected Speech Bubble Callout Card
               - Floating Metric Ring Card
               =================================================================== */}
            <div 
              className="relative w-full aspect-[4/3] sm:aspect-[16/11] min-h-[420px] sm:min-h-[460px] max-h-[560px] mx-auto select-none overflow-hidden sm:overflow-visible"
              onMouseEnter={() => setIsAutoCycling(false)}
            >
              <div className="relative size-full scale-[0.78] xs:scale-[0.85] sm:scale-100 origin-center transition-transform duration-300">
              
              {/* SVG LAYER: Background Globe, Molecular Lattice, & Organic Ribbon */}
              <svg 
                viewBox="0 0 700 480" 
                className="absolute inset-0 size-full pointer-events-none overflow-visible z-0"
              >
                <defs>
                  {/* Subtle Glow for ribbon and nodes */}
                  <filter id="ribbonGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Subtle Background Globe Mesh in Explorer */}
                <g opacity="0.10" stroke="#0f172a" strokeWidth="0.8">
                  <circle cx="340" cy="180" r="140" fill="none" strokeDasharray="3 4" />
                  <ellipse cx="340" cy="180" rx="140" ry="60" fill="none" />
                  <ellipse cx="340" cy="180" rx="60" ry="140" fill="none" />
                  <line x1="200" y1="180" x2="480" y2="180" strokeDasharray="2 3" />
                  <line x1="340" y1="40" x2="340" y2="320" strokeDasharray="2 3" />
                </g>

                {/* Molecular Chemical Hexagon Accent (Top Right) */}
                <g opacity="0.12" stroke="#059669" strokeWidth="1" fill="none">
                  <polygon points="620,40 640,52 640,75 620,87 600,75 600,52" />
                  <polygon points="640,75 660,87 660,110 640,122 620,110 620,87" />
                  <circle cx="620" cy="40" r="2.5" fill="#059669" />
                  <circle cx="640" cy="75" r="2.5" fill="#059669" />
                  <circle cx="660" cy="110" r="2.5" fill="#059669" />
                </g>

                {/* ===============================================================
                   THE ORGANIC GREEN ORBITAL LOOP / RIBBON (S-Pathway)
                   - Passes smoothly by all 5 partner nodes
                   =============================================================== */}
                {/* Thick Soft Mint Base Ribbon */}
                <path 
                  d="M 180 110 
                     C 270 70, 420 50, 520 75 
                     C 550 140, 480 200, 435 250 
                     C 380 310, 260 380, 200 395 
                     C 130 405, 95 330, 125 280 
                     C 155 220, 140 145, 180 110"
                  fill="none"
                  stroke="#a7f3d0"
                  strokeWidth="14"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.8"
                />

                {/* Thin Inner Precision Glowing Track */}
                <path 
                  d="M 180 110 
                     C 270 70, 420 50, 520 75 
                     C 550 140, 480 200, 435 250 
                     C 380 310, 260 380, 200 395 
                     C 130 405, 95 330, 125 280 
                     C 155 220, 140 145, 180 110"
                  fill="none"
                  stroke="#059669"
                  strokeWidth="2.5"
                  strokeDasharray="6 8"
                  className="animate-flight-arc"
                  opacity="0.6"
                />

                {/* Animated Traveling Comet Pulse along Ribbon */}
                <circle r="4" fill="#059669" filter="url(#ribbonGlow)">
                  <animateMotion 
                    path="M 180 110 C 270 70, 420 50, 520 75 C 550 140, 480 200, 435 250 C 380 310, 260 380, 200 395 C 130 405, 95 330, 125 280 C 155 220, 140 145, 180 110" 
                    dur="7s" 
                    repeatCount="indefinite" 
                  />
                </circle>
              </svg>

              {/* ===============================================================
                 INTERACTIVE FLOATING PEBBLE NODES
                 =============================================================== */}
              {partners.map((p) => {
                const isSelected = activeId === p.id;
                const Icon = p.icon;

                return (
                  <div
                    key={p.id}
                    className="absolute z-20 transition-all duration-500 cursor-pointer"
                    style={{
                      left: `${p.nodePos.x}%`,
                      top: `${p.nodePos.y}%`,
                      transform: "translate(-50%, -50%)"
                    }}
                    onClick={() => {
                      setActiveId(p.id);
                      setIsAutoCycling(false);
                    }}
                  >
                    <div 
                      className={cn(
                        "group/node px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full flex items-center gap-2.5 transition-all duration-300 border shadow-md",
                        isSelected
                          ? "bg-emerald-50/95 border-emerald-400 text-emerald-950 shadow-xl ring-4 ring-emerald-100/90 scale-105"
                          : "bg-white/95 backdrop-blur-md text-slate-800 border-slate-200/90 hover:border-emerald-300 hover:bg-slate-50 hover:shadow-lg"
                      )}
                    >
                      {/* Icon Badge */}
                      <div 
                        className={cn(
                          "size-7 sm:size-8 rounded-full flex items-center justify-center shrink-0 transition-colors shadow-2xs",
                          isSelected
                            ? "bg-emerald-700 text-white"
                            : "bg-slate-100 text-slate-600 group-hover/node:bg-emerald-100 group-hover/node:text-emerald-700"
                        )}
                      >
                        <Icon className="size-3.5 sm:size-4" />
                      </div>

                      {/* Node Label */}
                      <span className="text-[11px] sm:text-xs font-bold whitespace-nowrap tracking-tight">
                        {language === "ar" ? p.shortNameAr : p.shortNameEn}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* ===============================================================
                 INTERACTIVE CONNECTED SPEECH BUBBLE CALLOUT CARD
                 - Connected to the active node with pointer indicator
                 =============================================================== */}
              <div 
                className="hidden sm:block absolute z-30 transition-all duration-500 pointer-events-auto"
                style={{
                  left: active.calloutPos.left,
                  top: active.calloutPos.top,
                  transform: "translate(0%, 0%)"
                }}
              >
                <div className="relative w-[240px] sm:w-[270px] rounded-2xl bg-white/95 backdrop-blur-xl border border-emerald-200/90 shadow-xl p-3.5 sm:p-4 text-start space-y-2 ring-1 ring-slate-900/5 animate-title-reveal">
                  
                  {/* Left Pointer Speech Bubble Triangle */}
                  {active.calloutPos.arrowDir === "left" && (
                    <div className="absolute -left-2 top-5 size-0 border-y-6 border-y-transparent border-r-8 border-r-white drop-shadow-xs" />
                  )}
                  {active.calloutPos.arrowDir === "right" && (
                    <div className="absolute -right-2 top-5 size-0 border-y-6 border-y-transparent border-l-8 border-l-white drop-shadow-xs" />
                  )}

                  {/* Header: Medical Asterisk Logo + Name */}
                  <div className="flex items-start gap-2">
                    <div className="size-4 text-emerald-600 shrink-0 mt-0.5">
                      <Sparkles className="size-full fill-emerald-600" />
                    </div>
                    <h4 className="text-xs sm:text-[13px] font-black text-slate-950 leading-tight">
                      {language === "ar" ? active.nameAr : active.nameEn}
                    </h4>
                  </div>

                  {/* Scope of Partnership Body */}
                  <p className="text-[11px] text-slate-600 leading-relaxed font-sans">
                    {language === "ar" ? active.scopeAr : active.scopeEn}
                  </p>

                  {/* Footer Tag */}
                  <div className="pt-1 flex items-center justify-between text-[9px] font-mono">
                    <span className="text-emerald-700 font-bold uppercase tracking-wider">
                      {language === "ar" ? active.categoryAr : active.categoryEn}
                    </span>
                    <span className="size-1.5 rounded-full bg-emerald-500 animate-ping" />
                  </div>

                </div>
              </div>

              {/* ===============================================================
                 RIGHT FLOATING METRIC CARD WITH CIRCULAR GAUGE & WAVE
                 - Exactly matches user's reference mockup
                 =============================================================== */}
              <div 
                className="absolute z-20 transition-all duration-500"
                style={{
                  right: "1%",
                  top: "48%",
                  transform: "translateY(-50%)"
                }}
              >
                <div className="w-[125px] sm:w-[145px] rounded-3xl bg-white border border-slate-200/90 shadow-xl p-4 text-center space-y-2.5">
                  
                  {/* Top Metric Label */}
                  <span className="text-[10px] font-mono text-slate-500 font-semibold block uppercase tracking-tight">
                    {language === "ar" ? active.metricLabelAr : active.metricLabelEn}
                  </span>

                  {/* Metric Value & Unit */}
                  <div className="space-y-0.5">
                    <div className="text-2xl sm:text-3xl font-display font-black text-emerald-700 tracking-tight leading-none">
                      {active.metricVal}
                    </div>
                    <div className="text-xs font-bold text-slate-800">
                      {active.metricUnit}
                    </div>
                  </div>

                  {/* Circular Gauge Graphic with Mini Sparkline Wave in Center */}
                  <div className="relative size-14 sm:size-16 mx-auto flex items-center justify-center pt-1">
                    <svg viewBox="0 0 64 64" className="size-full -rotate-90">
                      {/* Background Ring Track */}
                      <circle 
                        cx="32" 
                        cy="32" 
                        r={radius} 
                        fill="none" 
                        stroke="#e2e8f0" 
                        strokeWidth="4" 
                      />
                      {/* Active Progress Arc */}
                      <circle 
                        cx="32" 
                        cy="32" 
                        r={radius} 
                        fill="none" 
                        stroke="#059669" 
                        strokeWidth="4" 
                        strokeDasharray={circumference} 
                        strokeDashoffset={strokeOffset} 
                        strokeLinecap="round" 
                        className="transition-all duration-700 ease-out"
                      />
                    </svg>

                    {/* Center Wave Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" className="size-5 text-emerald-700" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                      </svg>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>

            {/* Mobile Callout Fallback below the arena */}
            <div className="block sm:hidden mt-4">
              <div className="w-full rounded-2xl bg-white border border-emerald-200 shadow-md p-4 text-start space-y-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="size-4 text-emerald-600 shrink-0" />
                  <h4 className="text-xs font-black text-slate-950">
                    {language === "ar" ? active.nameAr : active.nameEn}
                  </h4>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed font-sans">
                  {language === "ar" ? active.scopeAr : active.scopeEn}
                </p>
                <div className="pt-2 flex items-center justify-between border-t border-slate-100 text-[10px] font-mono">
                  <span className="text-slate-500">{language === "ar" ? active.metricLabelAr : active.metricLabelEn}:</span>
                  <strong className="text-emerald-700 font-bold">{active.metricVal} {active.metricUnit}</strong>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
