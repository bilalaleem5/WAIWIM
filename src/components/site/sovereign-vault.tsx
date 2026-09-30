import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { 
  ShieldCheck, ClipboardCheck, BadgeCheck, Award, ArrowRight, 
  Lock, CheckCircle2, Sparkles, Activity, FileCheck2, Check,
  Radio, Globe2, Eye, Shield, Layers, FileText, Zap, ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "./language";
import { cn } from "@/lib/utils";
import { VoiceMattersModal } from "./primitives";

/* =========================================================================
   03 — 3D SOVEREIGN RESONANCE CORE (PARALLEL SIDE-BY-SIDE ARCHITECTURE)
   - Left Side: Sovereign Statement, Interactive Pillar Scrubber & Telemetry
   - Right Side (Parallel): 3D Levitating Bio-Crystal with Floating Resonance Anchors
   - Zero Cards! Pure Luminous Light Spatial Layout
   ========================================================================= */

export function SovereignResonanceCore() {
  const { language, pick } = useLanguage();
  const [activePillar, setActivePillar] = useState<number>(0);
  const [voiceOpen, setVoiceOpen] = useState(false);

  const pillars = [
    {
      id: 0,
      code: "NCNP #5421",
      codeAr: "ترخيص 5421",
      titleEn: "National Nonprofit Legal Charter",
      titleAr: "الترخيص الحكومي المعتمد",
      authorityEn: "Saudi National Center for Non-Profit Sector (NCNP)",
      authorityAr: "المركز الوطني لتنمية القطاع غير الربحي",
      indexScore: "99.2%",
      indexLabel: "Statutory Index",
      badgeColor: "bg-emerald-500/10 text-emerald-800 border-emerald-300",
      accentGlow: "from-emerald-500/20 to-teal-500/10",
      summaryEn: "Operating under direct regulatory governance of the NCNP with comprehensive annual institutional accreditation and statutory compliance.",
      summaryAr: "جمعية أهلية مرخصة رسمياً برقم 5421 وخاضعة للإشراف المباشر من المركز الوطني للقطاع غير الربحي بمعايير امتثال سيادية صارمة.",
      icon: ShieldCheck,
      coords: { x: "28%", y: "42%" },
      metrics: [
        { label: "License Tier", val: "NCNP #5421 Active" },
        { label: "Governance Index", val: "99.2% Sovereign Audit" },
        { label: "Fiduciary Status", val: "Full Good Standing" }
      ]
    },
    {
      id: 1,
      code: "SFDA COMPLIANT",
      codeAr: "معتمد من الغذاء والدواء",
      titleEn: "Biomedical Recalibration Standard",
      titleAr: "المعايرة الطبية الحيوية المعتمدة",
      authorityEn: "Saudi Food & Drug Authority (SFDA)",
      authorityAr: "الهيئة العامة للغذاء والدواء",
      indexScore: "100%",
      indexLabel: "Biomedical Pass Rate",
      badgeColor: "bg-cyan-500/10 text-cyan-800 border-cyan-300",
      accentGlow: "from-cyan-500/20 to-emerald-500/10",
      summaryEn: "Hospital-grade electronic sensor testing, ISO-13485 calibration, and hospital-grade sanitization before clinical deployment.",
      summaryAr: "تخضع جميع الأجهزة الطبية في بنك حكيم للفحص المخبري والمعايرة الحيوية وفق أعلى معايير هيئة الغذاء والدواء.",
      icon: ClipboardCheck,
      coords: { x: "50%", y: "24%" },
      metrics: [
        { label: "Standard", val: "ISO-13485 Hospital Spec" },
        { label: "Biomedical Testing", val: "100% SFDA Pass" },
        { label: "Deployment Fleet", val: "840+ Recalibrated Units" }
      ]
    },
    {
      id: 2,
      code: "INDEPENDENT CPA",
      codeAr: "مراجعة مالية مستقلة",
      titleEn: "Certified Fiduciary Audit Opinions",
      titleAr: "قوائم مالية مستقلة مدققة",
      authorityEn: "Ernst & Young Chartered Accountants",
      authorityAr: "إرنست آند يونغ (محاسبون قانونيون)",
      indexScore: "Clean Opinion",
      indexLabel: "Audit Opinion",
      badgeColor: "bg-indigo-500/10 text-indigo-800 border-indigo-300",
      accentGlow: "from-indigo-500/20 to-teal-500/10",
      summaryEn: "Quarterly transparent financial statements audited by independent chartered CPA firms ensuring 100% direct patient healthcare allocation.",
      summaryAr: "إفصاحات مالية دورية مدققة من كبرى مكاتب المحاسبة المستقلة تضمن توجيه كامل أموال التبرعات نحو الرعاية المباشرة.",
      icon: BadgeCheck,
      coords: { x: "72%", y: "42%" },
      metrics: [
        { label: "Auditing Firm", val: "Ernst & Young" },
        { label: "Opinion Type", val: "Unqualified Clean Opinion" },
        { label: "Public Disclosure", val: "100% Transparent" }
      ]
    },
    {
      id: 3,
      code: "HRSD PLATFORM",
      codeAr: "منصة العمل التطوعي",
      titleEn: "National Clinical Volunteer Integration",
      titleAr: "الربط مع العمل التطوعي الوطني",
      authorityEn: "Ministry of Human Resources & Social Development",
      authorityAr: "وزارة الموارد البشرية والتنمية الاجتماعية",
      indexScore: "8,400+",
      indexLabel: "CME Medical Hours",
      badgeColor: "bg-amber-500/10 text-amber-800 border-amber-300",
      accentGlow: "from-amber-500/20 to-emerald-500/10",
      summaryEn: "Seamless technical linkage with the National Volunteer Platform, logging accredited clinical, AI research, and biomedical hours.",
      summaryAr: "ربط تقني متقدم مع المنصة الوطنية للعمل التطوعي لتوثيق واعتماد الساعات الطبية والبحثية التخصصية في المملكة.",
      icon: Award,
      coords: { x: "50%", y: "62%" },
      metrics: [
        { label: "Accredited Hours", val: "8,400+ CME Approved" },
        { label: "Clinical Specialists", val: "420+ Certified Fellows" },
        { label: "National Coverage", val: "13 Saudi Provinces" }
      ]
    }
  ];

  const current = pillars[activePillar];

  return (
    <section id="sovereign-governance" className="relative py-20 lg:py-28 bg-white overflow-hidden border-b border-slate-200/80">
      
      {/* Ambient Sovereign Light Rays & Radial Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[65rem] h-[65rem] bg-gradient-to-b from-emerald-100/40 via-cyan-50/20 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="site-container relative z-10">
        
        {/* =========================================================================
           TOP HEADER: Sovereign Charter Statement & Legitimacy (Centered & Bold)
           ========================================================================= */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 lg:mb-16">
          
          {/* Top Sovereign Legitimacy Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50/90 border border-emerald-300/80 text-emerald-950 text-xs font-bold shadow-2xs backdrop-blur-md">
            <span className="relative flex size-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex rounded-full size-2 bg-emerald-600" />
            </span>
            <ShieldCheck className="size-3.5 text-emerald-700" />
            <span className="font-mono tracking-tight text-[11px] sm:text-xs">
              {pick(["SOVEREIGN REGULATORY CHARTER // NCNP #5421", "المشروعية النظامية والامتثال السيادي // ترخيص رقم 5421"])}
            </span>
          </div>

          {/* Display Headline */}
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-950 tracking-tight leading-[1.14]">
            {language === "ar" ? (
              <>
                البنية السيادية للثقة المؤسسية والابتكار{" "}
                <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 via-teal-700 to-cyan-600">
                  الحيوي والطبي
                </span>
              </>
            ) : (
              <>
                Sovereign Trust Architecture for{" "}
                <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 via-teal-700 to-cyan-600">
                  Planetary Health Impact
                </span>
              </>
            )}
          </h2>

          {/* Narrative Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-light max-w-2xl mx-auto">
            {pick([
              "Chartered under official statutory license #5421 by the Saudi National Center for Non-Profit Sector (NCNP), WAIWIM synthesizes sovereign regulatory immunity with hospital-grade biomedical precision and transparent CPA oversight.",
              "مرخصة نظامياً برقم 5421 من المركز الوطني للقطاع غير الربحي بالمملكة، وتجمع وايويم بين المشروعية السيادية والمعايرة الطبية الحيوية المعتمدة من هيئة الغذاء والدواء والشفافية المحاسبية الكاملة."
            ])}
          </p>
        </div>

        {/* =========================================================================
           PARALLEL SIDE-BY-SIDE STAGE (Zero Cards, Balanced Height)
           - Left Side (Parallel): 3D Sunlit Levitating Bio-Crystal Hologram Viewport
           - Right Side (Parallel): 4 Statutory Pillars Interactive Kinetic Rails
           ========================================================================= */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* =========================================================================
             PARALLEL SIDE A: 3D Sunlit Bio-Crystal Viewport with Interactive Beacons
             ========================================================================= */}
          <div className="lg:col-span-6 relative rounded-[2.5rem] overflow-hidden border border-slate-200/90 shadow-2xl bg-gradient-to-b from-white via-slate-50 to-emerald-50/20 flex flex-col min-h-[460px] lg:min-h-[560px]">
            
            {/* 3D Sunlit Levitating Crystal Image */}
            <div className="absolute inset-0 z-0">
              <img 
                src="/images/waiwim_sovereign_crystal.jpg" 
                alt="Luminous Sovereign Bio-Crystal in research pavilion" 
                className="w-full h-full object-cover select-none pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-white/40 pointer-events-none" />
            </div>

            {/* Glowing Holographic Scanning Laser Sweep */}
            <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#32E0E3] to-transparent shadow-[0_0_25px_#32E0E3,0_0_50px_#10B981] animate-laser-sweep z-10 pointer-events-none" />

            {/* Top Floating Spatial Indicators */}
            <div className="relative z-20 p-5 sm:p-6 flex items-center justify-between">
              <div className="px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-md flex items-center gap-2 font-mono text-xs text-slate-900">
                <span className="size-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="font-bold">NODE:</span>
                <span className="text-emerald-700 font-semibold">KSA-NODE-5421</span>
              </div>

              <div className="px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-md flex items-center gap-2 font-mono text-xs text-slate-800">
                <Activity className="size-3.5 text-cyan-600 animate-pulse" />
                <span className="font-semibold">ISO-13485 CERTIFIED</span>
              </div>
            </div>

            {/* Floating Interactive Spatial Resonance Anchors over Crystal */}
            <div className="relative z-20 flex-1 inset-0 pointer-events-none">
              {pillars.map((p) => {
                const isCurrent = activePillar === p.id;
                const Icon = p.icon;
                return (
                  <button
                    key={p.id}
                    onClick={() => setActivePillar(p.id)}
                    style={{ left: p.coords.x, top: p.coords.y }}
                    className={cn(
                      "absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto transition-all duration-500 cursor-pointer group/anchor",
                      isCurrent ? "scale-110 z-30" : "hover:scale-105 z-20 opacity-90"
                    )}
                  >
                    <div className={cn(
                      "px-3.5 py-2 rounded-full flex items-center gap-2.5 backdrop-blur-2xl border transition-all duration-300 shadow-xl",
                      isCurrent
                        ? "bg-white text-slate-950 border-emerald-500 shadow-emerald-500/30 ring-4 ring-emerald-500/20"
                        : "bg-white/90 text-slate-700 border-slate-200/90 hover:bg-white hover:border-emerald-300"
                    )}>
                      <div className={cn(
                        "size-6 sm:size-7 rounded-full flex items-center justify-center transition-colors",
                        isCurrent ? "bg-emerald-600 text-white" : "bg-emerald-50 text-emerald-700 group-hover/anchor:bg-emerald-100"
                      )}>
                        <Icon className="size-3 sm:size-3.5" />
                      </div>
                      <div className="text-start font-mono">
                        <span className="text-[9px] text-slate-500 block font-semibold leading-none">{p.code}</span>
                        <strong className="text-xs font-bold text-slate-900 block mt-0.5">{p.indexScore}</strong>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom Panoramic Floating Telemetry Strip in Space */}
            <div className="relative z-20 p-5 sm:p-6 mt-auto">
              <div className="p-4 rounded-2xl bg-white/95 backdrop-blur-2xl border border-slate-200/90 shadow-2xl flex items-center justify-between gap-3 text-start font-mono text-xs">
                <div className="flex items-center gap-3 text-slate-800">
                  <span className="size-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <div>
                    <span className="font-bold text-slate-950 text-xs sm:text-sm block">{current.code} // {current.indexLabel}</span>
                    <span className="text-emerald-700 font-semibold text-[11px] block">{language === "ar" ? current.authorityAr : current.authorityEn}</span>
                  </div>
                </div>
                <div className="text-end">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-950 text-xs font-extrabold block">
                    {current.indexScore}
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">SFDA • NCNP • E&Y</span>
                </div>
              </div>
            </div>

          </div>

          {/* =========================================================================
             PARALLEL SIDE B: 4 Statutory Pillars Interactive Kinetic Rails
             ========================================================================= */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-3 text-start">
            
            {/* 4 Kinetic Pillar Rails */}
            {pillars.map((p) => {
              const isSelected = activePillar === p.id;
              const Icon = p.icon;
              return (
                <div
                  key={p.id}
                  onClick={() => setActivePillar(p.id)}
                  className={cn(
                    "rounded-3xl transition-all duration-300 cursor-pointer border overflow-hidden",
                    isSelected
                      ? "bg-slate-950 text-white border-slate-900 shadow-xl ring-2 ring-emerald-500/30 p-5 sm:p-6"
                      : "bg-white text-slate-800 border-slate-200/90 hover:border-emerald-300 hover:bg-slate-50/80 shadow-2xs p-4 sm:p-5"
                  )}
                >
                  {/* Top Bar of Pillar */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3.5">
                      <div className={cn(
                        "size-10 sm:size-11 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300",
                        isSelected ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/30 scale-105" : "bg-emerald-50 text-emerald-700"
                      )}>
                        <Icon className="size-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={cn(
                            "font-mono text-[10px] sm:text-[11px] font-bold tracking-wider uppercase",
                            isSelected ? "text-emerald-400" : "text-emerald-700"
                          )}>
                            {p.code}
                          </span>
                          <span className={cn(
                            "size-1 rounded-full",
                            isSelected ? "bg-emerald-400" : "bg-slate-300"
                          )} />
                          <span className={cn(
                            "text-[10px] font-mono",
                            isSelected ? "text-slate-400" : "text-slate-500"
                          )}>
                            {p.indexLabel}
                          </span>
                        </div>
                        <h3 className={cn(
                          "font-display text-sm sm:text-base font-bold tracking-tight mt-0.5",
                          isSelected ? "text-white" : "text-slate-950"
                        )}>
                          {language === "ar" ? p.titleAr : p.titleEn}
                        </h3>
                      </div>
                    </div>

                    {/* Score Chip */}
                    <div className={cn(
                      "px-3 py-1 rounded-full font-mono text-xs font-extrabold shrink-0 border",
                      isSelected 
                        ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40" 
                        : "bg-slate-100 text-slate-800 border-slate-200"
                    )}>
                      {p.indexScore}
                    </div>
                  </div>

                  {/* Expanded Content when Selected */}
                  {isSelected && (
                    <div className="mt-4 pt-4 border-t border-slate-800 space-y-3 animate-in fade-in duration-300">
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                        {language === "ar" ? p.summaryAr : p.summaryEn}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                        {p.metrics.map((m, idx) => (
                          <div key={idx} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-mono">
                            <span className="text-slate-400 block text-[10px]">{m.label}</span>
                            <strong className="text-emerald-400 font-bold block mt-0.5 truncate">{m.val}</strong>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

          </div>

        </div>

        {/* =========================================================================
           BOTTOM PANORAMIC UTILITY RAIL: CTAs & 'Voice Matters' Cryptographic Safe
           ========================================================================= */}
        <div className="mt-12 pt-8 border-t border-slate-200/90 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-5">
          
          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-bold text-xs h-11 px-7 shadow-md shadow-emerald-600/20 cursor-pointer transition-all hover:scale-102">
              <Link to="/governance">
                <span>{pick(["Inspect Full Charter", "معاينة السجل الكامل"])}</span>
                <ArrowRight className="rtl:rotate-180 size-3.5 ms-1.5" />
              </Link>
            </Button>

            <Button variant="outline" asChild className="rounded-full font-bold border-slate-300 text-xs h-11 px-6 bg-white hover:bg-slate-50 text-slate-700 cursor-pointer">
              <Link to="/about">
                {pick(["Board & Leadership", "مجلس الإدارة"])}
              </Link>
            </Button>
          </div>

          {/* Integrated 'Voice Matters' Cryptographic Channel */}
          <div className="p-3 sm:p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-center justify-between gap-3 text-start">
            <div className="flex items-center gap-2.5">
              <div className="size-8 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center shrink-0">
                <Lock className="size-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-display font-bold text-slate-900 text-xs">
                    {pick(["'Voice Matters' Cryptographic Channel", "بوابة النزاهة المشفرة"])}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                    100% ANONYMOUS
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 font-mono block">AES-256 GCM • Direct Oversight SLA &lt; 48h</span>
              </div>
            </div>

            <Button 
              onClick={() => setVoiceOpen(true)}
              size="sm"
              className="bg-slate-950 hover:bg-slate-800 text-white rounded-full font-bold text-[11px] h-8 px-4 cursor-pointer shrink-0 ms-2"
            >
              <FileCheck2 className="size-3.5 me-1" />
              <span>{pick(["Report", "رفع بلاغ"])}</span>
            </Button>
          </div>

        </div>

      </div>

      {/* Voice Matters Modal */}
      <VoiceMattersModal open={voiceOpen} onClose={() => setVoiceOpen(false)} />
    </section>
  );
}
