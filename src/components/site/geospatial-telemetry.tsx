import { useState, useEffect, useCallback } from "react";
import { Link } from "@tanstack/react-router";
import { 
  MapPin, Activity, Radio, ArrowRight, ShieldCheck, 
  Users, Building2, HeartPulse, Sparkles, 
  Play, Pause, Crosshair, Navigation, Layers, 
  Cpu, Award, Zap, CheckCircle2, ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "./language";
import { cn } from "@/lib/utils";

/* =========================================================================
   06 — 3D SAUDI GEOSPATIAL HEALTH TELEMETRY (AESTHETIC WHITE COMMAND MAP)
   - Expansive Centered 3D Topographic Cartography on Pure White Canvas
   - Authentic Saudi Arabia Silhouette with Red Sea & Arabian Gulf Relief
   - Inter-City Connected Flight Laser Arcs with Animated Comet Particles
   - Interactive Hover & Focus Floating Clinical HUD Cards
   - Auto 4-Second Kingdom Sweep with Visual Progress & Manual Override
   - Pure Light Theme (Seamless Pure White Aesthetic, Zero Dark Containers)
   ========================================================================= */

interface SaudiCity {
  id: number;
  code: string;
  nameEn: string;
  nameAr: string;
  roleEn: string;
  roleAr: string;
  coords: { x: number; y: number }; // In 1000x562.5 SVG coordinate space (16:9)
  devices: string;
  beneficiaries: string;
  cadre: string;
  responseSLA: string;
  latLng: string;
  image: string;
  accentColor: string;
  tier: "headquarters" | "regional-hub" | "corridor";
}

interface NetworkArc {
  from: number;
  to: number;
  d: string;
}

export function SaudiGeospatialTelemetry() {
  const { language, pick } = useLanguage();
  const [activeCityId, setActiveCityId] = useState<number>(0);
  const [hoveredCityId, setHoveredCityId] = useState<number | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [cycleTick, setCycleTick] = useState<number>(0);

  // 7 Strategic Healthcare Hubs covering all 13 Saudi Provinces
  const cities: SaudiCity[] = [
    {
      id: 0,
      code: "RIYADH",
      nameEn: "Riyadh Central Province",
      nameAr: "منطقة الرياض (المقر الرئيسي)",
      roleEn: "Central Redistribution Headquarters & Genomic Core",
      roleAr: "المقر الرئيسي لإعادة التوزيع والجينوم الوطني",
      coords: { x: 550, y: 270 },
      devices: "410+ Units",
      beneficiaries: "8,400+ Patients",
      cadre: "160 Specialists",
      responseSLA: "< 2.4 Hours",
      latLng: "24.71° N, 46.67° E",
      image: "/images/saudi_genomic_supercomputer.jpg",
      accentColor: "#10b981",
      tier: "headquarters"
    },
    {
      id: 1,
      code: "JEDDAH / MAKKAH",
      nameEn: "Makkah & Western Corridor",
      nameAr: "منطقة مكة المكرمة وجدة",
      roleEn: "Active ICU Corridor & Holy Sites Emergency Care",
      roleAr: "ممر العناية المركزة النشط ورعاية المشاعر المقدسة",
      coords: { x: 315, y: 360 },
      devices: "220+ Units",
      beneficiaries: "4,600+ Patients",
      cadre: "95 Specialists",
      responseSLA: "< 3.1 Hours",
      latLng: "21.42° N, 39.82° E",
      image: "/images/saudi_clinical_care.jpg",
      accentColor: "#06b6d4",
      tier: "regional-hub"
    },
    {
      id: 2,
      code: "EASTERN",
      nameEn: "Eastern Industrial Province (Dammam / Khobar)",
      nameAr: "المنطقة الشرقية (الدمام والخبر والأحساء)",
      roleEn: "Biomedical Calibration Fleet & Coastal Corridors",
      roleAr: "أسطول المعايرة الطبية الحيوية والمناطق الصناعية",
      coords: { x: 640, y: 230 },
      devices: "135+ Units",
      beneficiaries: "3,100+ Patients",
      cadre: "60 Specialists",
      responseSLA: "< 2.8 Hours",
      latLng: "26.42° N, 50.10° E",
      image: "/images/waiwim_medical_calibration_lab.jpg",
      accentColor: "#0d9488",
      tier: "regional-hub"
    },
    {
      id: 3,
      code: "ASIR / ABHA",
      nameEn: "Southern Healthcare Corridor (Abha / Jazan)",
      nameAr: "منطقة عسير والجنوب (أبها وجازان ونجران)",
      roleEn: "Highland Primary Clinics & Homebound Telehealth",
      roleAr: "المراكز الجبلية الطرفية والرعاية الصحية المنزلية",
      coords: { x: 415, y: 470 },
      devices: "95+ Units",
      beneficiaries: "2,300+ Patients",
      cadre: "45 Specialists",
      responseSLA: "< 4.0 Hours",
      latLng: "18.22° N, 42.50° E",
      image: "/images/hakeem_medical_devices.jpg",
      accentColor: "#f59e0b",
      tier: "regional-hub"
    },
    {
      id: 4,
      code: "TABUK / NEOM",
      nameEn: "Tabuk & North-Western Frontier",
      nameAr: "منطقة تبوك والشمال (نيوم والجوف)",
      roleEn: "Frontier Biotechnology & Clean Energy Clinical Care",
      roleAr: "بوابة الابتكار التقني والصحي في الشمال ونيوم",
      coords: { x: 210, y: 145 },
      devices: "65+ Units",
      beneficiaries: "1,800+ Patients",
      cadre: "35 Specialists",
      responseSLA: "< 3.5 Hours",
      latLng: "28.38° N, 36.55° E",
      image: "/images/ai_drug_discovery_lab.jpg",
      accentColor: "#6366f1",
      tier: "regional-hub"
    },
    {
      id: 5,
      code: "AL-MADINAH",
      nameEn: "Al-Madinah Al-Munawwarah",
      nameAr: "منطقة المدينة المنورة",
      roleEn: "Academic Health Science & Elderly Specialized Support",
      roleAr: "العلوم الصحية الأكاديمية ورعاية كبار السن",
      coords: { x: 308, y: 260 },
      devices: "80+ Units",
      beneficiaries: "2,100+ Patients",
      cadre: "40 Specialists",
      responseSLA: "< 3.2 Hours",
      latLng: "24.47° N, 39.61° E",
      image: "/images/saudi_clinical_care.jpg",
      accentColor: "#14b8a6",
      tier: "corridor"
    },
    {
      id: 6,
      code: "AL-QASSIM",
      nameEn: "Al-Qassim & Central North",
      nameAr: "منطقة القصيم وحائل",
      roleEn: "Pharmaceutical Logistics & Regional Triage Hub",
      roleAr: "اللوجستيات الدوائية وفرز الأجهزة الإقليمي",
      coords: { x: 460, y: 215 },
      devices: "75+ Units",
      beneficiaries: "1,900+ Patients",
      cadre: "32 Specialists",
      responseSLA: "< 2.9 Hours",
      latLng: "26.33° N, 43.97° E",
      image: "/images/hakeem_medical_devices.jpg",
      accentColor: "#10b981",
      tier: "corridor"
    }
  ];

  // Inter-city flight network laser conduits (Aapas me city project)
  const networkArcs: NetworkArc[] = [
    { from: 0, to: 1, d: "M 550 270 Q 420 335 315 360" }, // Riyadh -> Jeddah/Makkah
    { from: 0, to: 2, d: "M 550 270 Q 600 235 640 230" }, // Riyadh -> Eastern
    { from: 0, to: 3, d: "M 550 270 Q 500 390 415 470" }, // Riyadh -> Asir
    { from: 0, to: 4, d: "M 550 270 Q 360 180 210 145" }, // Riyadh -> Tabuk
    { from: 0, to: 5, d: "M 550 270 Q 425 250 308 260" }, // Riyadh -> Madinah
    { from: 0, to: 6, d: "M 550 270 Q 510 230 460 215" }, // Riyadh -> Qassim
    { from: 1, to: 5, d: "M 315 360 Q 300 310 308 260" }, // Jeddah -> Madinah
    { from: 5, to: 4, d: "M 308 260 Q 250 195 210 145" }, // Madinah -> Tabuk
    { from: 6, to: 2, d: "M 460 215 Q 550 200 640 230" }  // Qassim -> Eastern
  ];

  const currentActiveCity = cities.find(c => c.id === activeCityId) ?? cities[0];
  const displayedCity = cities.find(c => c.id === (hoveredCityId ?? activeCityId)) ?? currentActiveCity;

  // 4-Second auto-orbiting scanning cycle
  const advanceScan = useCallback(() => {
    setActiveCityId((prev) => (prev + 1) % cities.length);
    setCycleTick((c) => c + 1);
  }, [cities.length]);

  useEffect(() => {
    if (!isAutoPlaying || hoveredCityId !== null) return;
    const timer = setInterval(advanceScan, 4000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, hoveredCityId, advanceScan]);

  // Compute smart dynamic positioning for floating HUD card
  const getCardPositionStyle = (city: SaudiCity) => {
    const isBottomHalf = city.coords.y > 280; // on 562.5 height
    const isFarLeft = city.coords.x < 260;
    const isFarRight = city.coords.x > 600;

    let xOffset = "-50%";
    if (isFarLeft) xOffset = "-18%";
    if (isFarRight) xOffset = "-82%";

    const yTransform = isBottomHalf ? "-112%" : "26px";

    return {
      left: `${(city.coords.x / 1000) * 100}%`,
      top: `${(city.coords.y / 562.5) * 100}%`,
      transform: `translate(${xOffset}, ${yTransform})`,
    };
  };

  return (
    <section 
      id="geospatial-telemetry"
      className="relative w-full overflow-hidden bg-white border-b border-slate-200 transition-colors duration-700 py-16 sm:py-20 lg:py-24"
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        
        {/* =========================================================================
           TOP LEVEL: EDITORIAL HEADER & CITY QUICK SELECTORS (Clean & Centered)
           ========================================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-slate-200/90">
          <div className="max-w-3xl space-y-4 text-start">
            
            {/* Live GPS Telemetry Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-50/90 border border-emerald-200 text-emerald-950 text-[11px] sm:text-xs font-mono font-bold tracking-tight shadow-xs">
              <span className="relative flex size-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full size-2 bg-emerald-600" />
              </span>
              <Radio className="size-3.5 text-emerald-700 animate-pulse" />
              <span>
                {pick([
                  "KSA NATIONAL HEALTH TELEMETRY // 13 PROVINCES LINKED",
                  "شبكة التتبع الصحي الوطنية // تغطية 13 منطقة بالمملكة"
                ])}
              </span>
            </div>

            {/* Display Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-[3.25rem] font-display font-black text-slate-950 tracking-tight leading-[1.12]">
              {language === "ar" ? (
                <>
                  أثر صحي وطني ممتد في كافة{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 via-teal-700 to-cyan-600">
                    مناطق المملكة الـ 13
                  </span>
                </>
              ) : (
                <>
                  National Healthcare Footprint Across{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 via-teal-700 to-cyan-600">
                    All 13 Saudi Provinces
                  </span>
                </>
              )}
            </h2>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-700 font-normal leading-relaxed max-w-2xl">
              {pick([
                "From central academic medical centers in Riyadh to remote clinics in Asir, our biomedical supply chain connects patients to calibrated life-support systems with real-time cloud telemetry.",
                "من كبرى المستشفيات التخصصية بالرياض إلى المراكز الصحية الطرفية في عسير وتبوك، نربط المنشآت الطبية بالأجهزة الحيوية المعايرة مع تتبع سحابي مباشر."
              ])}
            </p>
          </div>

          {/* Interactive City Selector Pills & Auto Toggle */}
          <div className="flex flex-wrap items-center gap-2 font-mono">
            {cities.map((c) => {
              const isSelected = activeCityId === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => {
                    setActiveCityId(c.id);
                    setCycleTick((t) => t + 1);
                  }}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer border flex items-center gap-2",
                    isSelected
                      ? "bg-slate-950 text-white border-slate-950 shadow-md scale-105"
                      : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 shadow-xs hover:bg-slate-50"
                  )}
                >
                  <span 
                    className="size-2 rounded-full" 
                    style={{ backgroundColor: isSelected ? c.accentColor : "#94a3b8" }} 
                  />
                  <span>{c.code.split(" ")[0]}</span>
                </button>
              );
            })}

            {/* Auto-Play Toggle */}
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 text-[10px] font-mono font-bold transition-all shadow-xs cursor-pointer ml-1"
            >
              {isAutoPlaying ? "AUTO (4S)" : "PAUSED"}
            </button>
          </div>
        </div>

        {/* =========================================================================
           TOP STAGE TELEMETRY BAR (Clean & Direct)
           ========================================================================= */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-200/80 font-mono text-xs text-slate-600">
          <div className="flex items-center gap-2 text-slate-900 font-bold">
            <Navigation className="size-4 text-emerald-600" />
            <span>KSA_INTERCONNECTED_TELEMETRY_GRID // ARABSAT-6A</span>
          </div>

          <div className="flex items-center gap-6 text-[11px]">
            <div className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-slate-500">ACTIVE RADAR FOCUS:</span>
              <span className="font-bold text-slate-950">{displayedCity.code}</span>
            </div>
            <div className="hidden sm:block text-slate-400">
              COORDINATES: {displayedCity.latLng}
            </div>
          </div>
        </div>

        {/* =======================================================================
           THE EXPANSIVE CENTERED MAP ARENA
           - Sits directly on pure white page background (zero off-white tint)
           - Responsive zoom scaling for mobile (fills screen) and desktop (grander scale)
           ======================================================================= */}
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/9] min-h-[420px] sm:min-h-[580px] max-h-[960px] lg:max-h-[1050px] mx-auto my-3 sm:my-6 flex items-center justify-center select-none overflow-hidden sm:overflow-visible">
          
          {/* Zoomed scaling layer: scale-135 on mobile to fill viewport, scale-110 on desktop */}
          <div className="relative size-full flex items-center justify-center scale-[1.35] sm:scale-105 lg:scale-110 origin-[48%_45%] transition-transform duration-500">

            {/* BASE 3D RELIEF MAP IMAGE (100% Pure White Background) */}
            <img 
              src="/images/saudi_telemetry_map_pure_white.png"
              alt="Kingdom of Saudi Arabia Healthcare Telemetry Map"
              className="absolute inset-0 size-full object-contain pointer-events-none drop-shadow-xs"
            />

            {/* Animated 360° Rotating Radar Sector Sweep centered around Riyadh */}
            <div 
              className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20"
              style={{ transformOrigin: "55% 48%" }}
            >
              <div 
                className="size-[38rem] sm:size-[48rem] lg:size-[56rem] rounded-full animate-radar-sweep"
                style={{
                  background: 'conic-gradient(from 0deg, rgba(16, 185, 129, 0.28) 0deg, rgba(6, 182, 212, 0.08) 40deg, transparent 80deg, transparent 360deg)',
                  transformOrigin: "55% 48%"
                }}
              />
            </div>

            {/* Concentric Coordinate Guidance Rings around Riyadh Central HQ */}
            <div 
              className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-25"
              style={{ transform: "translate(5%, -2%)" }}
            >
              <div className="size-[36rem] sm:size-[42rem] rounded-full border border-dashed border-emerald-400" />
              <div className="size-[22rem] sm:size-[26rem] rounded-full border border-cyan-400" />
              <div className="size-[11rem] sm:size-[14rem] rounded-full border border-teal-400" />
            </div>

            {/* ===================================================================
               VECTOR SVG OVERLAY: FLIGHT ARCS, ENERGY COMETS & CITY BEACONS
               =================================================================== */}
            <svg 
              viewBox="0 0 1000 562.5" 
              className="absolute inset-0 w-full h-full overflow-visible z-10"
            >
              <defs>
                <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Coordinate Grid Guides */}
              <g opacity="0.10" stroke="#0f172a" strokeWidth="0.6" strokeDasharray="4 6">
                <line x1="0" y1="145" x2="1000" y2="145" />
                <line x1="0" y1="270" x2="1000" y2="270" />
                <line x1="0" y1="360" x2="1000" y2="360" />
                <line x1="0" y1="470" x2="1000" y2="470" />
                <line x1="315" y1="0" x2="315" y2="562.5" />
                <line x1="550" y1="0" x2="550" y2="562.5" />
                <line x1="640" y1="0" x2="640" y2="562.5" />
              </g>

              {/* =================================================================
                 INTER-CITY CONNECTED FLIGHT ARCS (Aapas me city project)
                 - Seamless curved laser conduits with traveling energy comets
                 ================================================================= */}
              {networkArcs.map((arc, i) => {
                const isFromActive = activeCityId === arc.from || activeCityId === arc.to;
                return (
                  <g key={i}>
                    {/* Background Subtle Arc */}
                    <path 
                      d={arc.d}
                      fill="none"
                      stroke={isFromActive ? "#059669" : "#94a3b8"}
                      strokeWidth={isFromActive ? "2.6" : "1.2"}
                      strokeDasharray={isFromActive ? "6 8" : "3 6"}
                      className={isFromActive ? "animate-flight-arc" : ""}
                      opacity={isFromActive ? 0.95 : 0.35}
                    />

                    {/* Traveling Energy Pulse Particle */}
                    {isFromActive && (
                      <circle r="4" fill="#10b981" filter="url(#glowEffect)">
                        <animateMotion path={arc.d} dur="3s" repeatCount="indefinite" />
                      </circle>
                    )}
                  </g>
                );
              })}

              {/* =================================================================
                 CITY BEACONS ON THE MAP
                 ================================================================= */}
              {cities.map((city) => {
                const isSelected = activeCityId === city.id;
                const isHovered = hoveredCityId === city.id;
                const isHighlighted = isSelected || isHovered;

                return (
                  <g 
                    key={city.id}
                    transform={`translate(${city.coords.x}, ${city.coords.y})`}
                    className="cursor-pointer group/pin"
                    onClick={() => {
                      setActiveCityId(city.id);
                      setCycleTick((t) => t + 1);
                    }}
                    onMouseEnter={() => setHoveredCityId(city.id)}
                    onMouseLeave={() => setHoveredCityId(null)}
                  >
                    {/* Concentric Sonar Pulse Wave Rings */}
                    {isHighlighted && (
                      <>
                        <circle r="34" fill="none" stroke={city.accentColor} strokeWidth="1.5" className="animate-beacon-wave" opacity="0.6" />
                        <circle r="20" fill={city.accentColor} opacity="0.15" />
                      </>
                    )}

                    {/* Outer Beacon Ring */}
                    <circle 
                      r={isHighlighted ? "9" : "6"} 
                      fill={isHighlighted ? city.accentColor : "#ffffff"} 
                      stroke={isHighlighted ? "#ffffff" : city.accentColor} 
                      strokeWidth="2.5"
                      className="transition-all duration-300 drop-shadow-md"
                    />

                    {/* Core Ping Dot */}
                    <circle 
                      r={isHighlighted ? "3.5" : "2"} 
                      fill={isHighlighted ? "#ffffff" : city.accentColor}
                      className={isHighlighted ? "animate-ping" : ""}
                    />

                    {/* City Label Badge Pill */}
                    <g transform="translate(0, 16)">
                      <rect 
                        x={-42} 
                        y={-7} 
                        width="84" 
                        height="16" 
                        rx="8" 
                        fill={isHighlighted ? "#0f172a" : "rgba(255, 255, 255, 0.96)"} 
                        stroke={isHighlighted ? city.accentColor : "#cbd5e1"}
                        strokeWidth="1.2"
                        className="drop-shadow-xs transition-all"
                      />
                      <text 
                        x="0" 
                        y="4.5" 
                        textAnchor="middle" 
                        fontSize="8" 
                        fontWeight="bold" 
                        fontFamily="monospace"
                        fill={isHighlighted ? "#ffffff" : "#1e293b"}
                      >
                        {city.code.split(" ")[0]} • {city.devices.split(" ")[0]}
                      </text>
                    </g>
                  </g>
                );
              })}
            </svg>

            {/* ===================================================================
               DESKTOP: FLOATING FROSTED GLASS HUD CARD
               - Anchored dynamically to the hovered/active city
               - Smartly adjusts transform to never overflow container
               =================================================================== */}
            <div 
              className="hidden md:block absolute z-30 transition-all duration-500 pointer-events-auto"
              style={getCardPositionStyle(displayedCity)}
            >
              <div className="w-[310px] sm:w-[330px] rounded-3xl bg-white/95 backdrop-blur-2xl border border-slate-200 shadow-2xl p-4 sm:p-5 text-start space-y-3 ring-1 ring-slate-900/5 animate-title-reveal">
                
                {/* Header with Thumbnail & Tag */}
                <div className="flex items-center gap-3">
                  <div className="size-11 rounded-2xl overflow-hidden bg-slate-950 shrink-0 border border-slate-200">
                    <img 
                      src={displayedCity.image} 
                      alt={displayedCity.nameEn} 
                      className="size-full object-cover object-center"
                    />
                  </div>

                  <div className="space-y-0.5 flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono font-bold uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        {displayedCity.tier === "headquarters" ? "CENTRAL HQ" : "REGIONAL HUB"}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500 font-bold">
                        {displayedCity.responseSLA}
                      </span>
                    </div>

                    <h4 className="text-xs font-black text-slate-950 line-clamp-1 tracking-tight">
                      {language === "ar" ? displayedCity.nameAr : displayedCity.nameEn}
                    </h4>
                  </div>
                </div>

                {/* Role Description */}
                <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                  {language === "ar" ? displayedCity.roleAr : displayedCity.roleEn}
                </p>

                {/* 3 Live Metric Micro Gauges */}
                <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-slate-100 font-mono text-center">
                  <div className="bg-slate-50 p-1.5 rounded-xl border border-slate-150">
                    <span className="text-[8px] text-slate-400 uppercase block font-bold">ASSETS</span>
                    <strong className="text-[11px] font-black text-slate-950">{displayedCity.devices}</strong>
                  </div>

                  <div className="bg-slate-50 p-1.5 rounded-xl border border-slate-150">
                    <span className="text-[8px] text-slate-400 uppercase block font-bold">PATIENTS</span>
                    <strong className="text-[11px] font-black text-emerald-700">{displayedCity.beneficiaries}</strong>
                  </div>

                  <div className="bg-slate-50 p-1.5 rounded-xl border border-slate-150">
                    <span className="text-[8px] text-slate-400 uppercase block font-bold">CADRE</span>
                    <strong className="text-[11px] font-black text-cyan-700">{displayedCity.cadre}</strong>
                  </div>
                </div>

                {/* Footer Action & Status */}
                <div className="flex items-center justify-between pt-1 text-[9px] font-mono">
                  <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                    <span className="size-1.5 rounded-full bg-emerald-500 animate-ping" />
                    <span>SFDA LINK ACTIVE</span>
                  </div>

                  <Link 
                    to="/programs" 
                    className="text-slate-900 font-bold hover:text-emerald-700 flex items-center gap-1 transition-colors"
                  >
                    <span>View Hub</span>
                    <ArrowRight className="size-3 rtl:rotate-180" />
                  </Link>
                </div>

              </div>
            </div>

          </div>
        </div>

          {/* =======================================================================
             MOBILE ONLY: DEDICATED ANCHORED HUD CARD BELOW MAP
             - Renders cleanly below the map on screens < md so nothing overflows
             ======================================================================= */}
          <div className="block md:hidden pt-4 border-t border-slate-100">
            <div className="w-full rounded-2xl bg-white border border-slate-200 shadow-md p-4 text-start space-y-3">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-xl overflow-hidden bg-slate-950 shrink-0 border border-slate-200">
                  <img 
                    src={displayedCity.image} 
                    alt={displayedCity.nameEn} 
                    className="size-full object-cover object-center"
                  />
                </div>
                <div className="space-y-0.5 flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono font-bold uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      {displayedCity.tier === "headquarters" ? "CENTRAL HQ" : "REGIONAL HUB"}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 font-bold">
                      {displayedCity.responseSLA}
                    </span>
                  </div>
                  <h4 className="text-xs font-black text-slate-950 truncate tracking-tight">
                    {language === "ar" ? displayedCity.nameAr : displayedCity.nameEn}
                  </h4>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 font-mono text-center">
                <div className="bg-slate-50 p-1.5 rounded-xl border border-slate-100">
                  <span className="text-[8px] text-slate-400 uppercase block font-bold">ASSETS</span>
                  <strong className="text-xs font-black text-slate-950">{displayedCity.devices}</strong>
                </div>
                <div className="bg-slate-50 p-1.5 rounded-xl border border-slate-100">
                  <span className="text-[8px] text-slate-400 uppercase block font-bold">PATIENTS</span>
                  <strong className="text-xs font-black text-emerald-700">{displayedCity.beneficiaries}</strong>
                </div>
                <div className="bg-slate-50 p-1.5 rounded-xl border border-slate-100">
                  <span className="text-[8px] text-slate-400 uppercase block font-bold">CADRE</span>
                  <strong className="text-xs font-black text-cyan-700">{displayedCity.cadre}</strong>
                </div>
              </div>
            </div>
          </div>

        {/* =========================================================================
           BOTTOM: 13-PROVINCE NATIONAL TOTALS LEDGER & AUTO SWEEP TIMER
           ========================================================================= */}
        <div className="rounded-3xl bg-slate-50/90 border border-slate-200/90 p-5 sm:p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs">
          
          {/* Left Stats Stream */}
          <div className="flex flex-wrap items-center gap-6 text-slate-600">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-bold text-slate-900">TOTAL DEPLOYED:</span>
              <span className="text-emerald-700 font-extrabold">860+ ICU UNITS</span>
            </div>
            <span className="text-slate-300 hidden sm:inline">|</span>
            <div>
              <span className="font-bold text-slate-900">PATIENTS REACHED:</span> 18,400+ CITIZENS
            </div>
            <span className="text-slate-300 hidden sm:inline">|</span>
            <div>
              <span className="font-bold text-slate-900">CADRE:</span> 420+ BIOMEDICAL ENGINEERS
            </div>
            <span className="text-slate-300 hidden sm:inline">|</span>
            <div>
              <span className="font-bold text-slate-900">KINGDOM REACH:</span> 13 / 13 PROVINCES (100%)
            </div>
          </div>

          {/* Right Live Scan Countdown Indicator */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <div className="text-[10px] text-slate-500 font-bold uppercase">
              {isAutoPlaying ? "NEXT CITY SWEEP IN 4S" : "SCANNER PAUSED"}
            </div>
            <div className="w-24 h-1.5 rounded-full bg-slate-200 overflow-hidden">
              <div 
                key={`sweep-${cycleTick}`}
                className={cn("h-full bg-emerald-500 rounded-full", isAutoPlaying && "animate-progress-4s")} 
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
