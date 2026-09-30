import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { 
  ShieldCheck, ClipboardCheck, BadgeCheck, Award, ArrowRight, 
  Lock, CheckCircle2, Sparkles, Activity, FileCheck2, Check,
  Radio, Globe2, Eye, Shield, Layers, FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "./language";
import { cn } from "@/lib/utils";
import { VoiceMattersModal } from "./primitives";

/* =========================================================================
   WAIWIM SOVEREIGN BIO-INTELLIGENCE INFRASTRUCTURE (Section 03)
   A Completely New Nature, Pure Light Theme, and Fluid Kinetic Design:
   - Levitating Emerald Bio-Crystal Centerpiece with ambient holographic telemetry
   - 4 Interactive Floating Resonance Anchors around the crystal
   - Tactile Liquid-Glass Pillar Scrubber
   - Luminous Cryptographic Channel Pill (Clean, Non-Intrusive Voice Matters)
   ========================================================================= */

export function SovereignGovernanceSection() {
  const { language, pick } = useLanguage();
  const [activePillar, setActivePillar] = useState<number>(0);
  const [voiceOpen, setVoiceOpen] = useState(false);

  // 4 Core Sovereign Pillars
  const pillars = [
    {
      id: 0,
      code: "NCNP #5421",
      codeAr: "ترخيص 5421",
      taglineEn: "National Nonprofit Legal Charter",
      taglineAr: "الترخيص الحكومي المعتمد",
      authorityEn: "Saudi National Center for Non-Profit Sector (NCNP)",
      authorityAr: "المركز الوطني لتنمية القطاع غير الربحي",
      indexScore: "99.2%",
      indexLabelEn: "Statutory Compliance Index",
      indexLabelAr: "نسبة الامتثال النظامي",
      summaryEn: "Operating under direct regulatory governance of the NCNP. Every medical program, AI research grant, and patient initiative undergoes formal annual compliance certification and statutory audit.",
      summaryAr: "جمعية أهلية مرخصة رسمياً برقم 5421 وخاضعة للإشراف المباشر من المركز الوطني للقطاع غير الربحي، مما يمنحها الصفة النظامية والمشروعية السيادية الكاملة.",
      icon: ShieldCheck,
      color: "emerald",
      coords: { x: "24%", y: "42%" },
      metrics: [
        { labelEn: "Legal License", labelAr: "رقم الترخيص", val: "#5421 (Active)" },
        { labelEn: "Fiduciary Status", labelAr: "الحالة النظامية", val: "Full Good Standing" },
        { labelEn: "Board Oversight", labelAr: "حوكمة المجلس", val: "Monthly Review" }
      ]
    },
    {
      id: 1,
      code: "SFDA COMPLIANT",
      codeAr: "معتمد من الغذاء والدواء",
      taglineEn: "Biomedical Recalibration Standard",
      taglineAr: "المعايرة الطبية الحيوية المعتمدة",
      authorityEn: "Saudi Food & Drug Authority (SFDA)",
      authorityAr: "الهيئة العامة للغذاء والدواء",
      indexScore: "100%",
      indexLabelEn: "Biomedical Pass Rate",
      indexLabelAr: "نسبة المطابقة الحيوية",
      summaryEn: "Every medical device redistributed through Hakeem Bank undergoes multi-point electronic sensor testing, ISO-13485 calibration, and hospital-grade decontamination before clinical deployment.",
      summaryAr: "تخضع جميع الأجهزة الطبية المعاد توزيعها في بنك حكيم للفحص المخبري والمعايرة الحيوية وفق أعلى معايير هيئة الغذاء والدواء لضمان سلامة المرضى.",
      icon: ClipboardCheck,
      color: "cyan",
      coords: { x: "42%", y: "24%" },
      metrics: [
        { labelEn: "Standard", labelAr: "المعيار المعتمد", val: "ISO-13485 Spec" },
        { labelEn: "Fleet Audited", labelAr: "الأجهزة المعايرة", val: "840+ Units" },
        { labelEn: "Safety Rating", labelAr: "تصنيف السلامة", val: "Hospital Grade" }
      ]
    },
    {
      id: 2,
      code: "INDEPENDENT CPA",
      codeAr: "مراجعة مالية مستقلة",
      taglineEn: "Certified Fiduciary Audit Opinions",
      taglineAr: "قوائم مالية مستقلة مدققة",
      authorityEn: "Ernst & Young Chartered Accountants",
      authorityAr: "إرنست آند يونغ (محاسبون قانونيون)",
      indexScore: "Clean",
      indexLabelEn: "Audit Opinion",
      indexLabelAr: "رأي المحاسب المستقل",
      summaryEn: "Quarterly transparent financial statements audited by independent chartered CPA firms. Unreserved public accounting ensures that 100% of philanthropic capital reaches direct patient care.",
      summaryAr: "إفصاحات مالية دورية مدققة من كبرى مكاتب المحاسبة المستقلة، تضمن الشفافية المطلقة وتوجيه كامل أموال التبرعات نحو الرعاية المباشرة والأبحاث الطبية.",
      icon: BadgeCheck,
      color: "indigo",
      coords: { x: "58%", y: "24%" },
      metrics: [
        { labelEn: "Auditor", labelAr: "المراجع المستقل", val: "Ernst & Young" },
        { labelEn: "Disclosure", labelAr: "مستوى الإفصاح", val: "100% Public" },
        { labelEn: "Capital Diversion", labelAr: "الانحراف المالي", val: "0.0% Verified" }
      ]
    },
    {
      id: 3,
      code: "HRSD PLATFORM",
      codeAr: "منصة العمل التطوعي",
      taglineEn: "National Clinical Volunteer Integration",
      taglineAr: "الربط مع العمل التطوعي الوطني",
      authorityEn: "Ministry of Human Resources & Social Development",
      authorityAr: "وزارة الموارد البشرية والتنمية الاجتماعية",
      indexScore: "8,400+",
      indexLabelEn: "CME Accredited Hours",
      indexLabelAr: "ساعات معتمدة للكوادر",
      summaryEn: "Seamless technical linkage with the National Volunteer Platform, logging CME-accredited medical volunteer hours across Saudi Arabia for clinical doctors, biomedical engineers, and AI researchers.",
      summaryAr: "ربط تقني متقدم مع المنصة الوطنية للعمل التطوعي لتوثيق واعتماد الساعات الطبية والبحثية التخصصية المعتمدة للكوادر الصحية في مختلف مدن المملكة.",
      icon: Award,
      color: "amber",
      coords: { x: "76%", y: "42%" },
      metrics: [
        { labelEn: "Certified Cadre", labelAr: "الكوادر الصحية", val: "420+ Fellows" },
        { labelEn: "Accreditation", labelAr: "الاعتماد الطبي", val: "CME Certified" },
        { labelEn: "Provinces", labelAr: "المناطق المشمولة", val: "13 Provinces" }
      ]
    }
  ];

  const current = pillars[activePillar];

  return (
    <section className="relative py-20 lg:py-28 bg-gradient-to-b from-white via-slate-50/50 to-white overflow-hidden border-b border-slate-200/70">
      
      {/* Pristine Light Theme Ambient Radiance */}
      <div 
        className="absolute inset-0 opacity-[0.14] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#059669 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }}
      />
      <div className="absolute top-1/3 -left-32 w-[30rem] h-[30rem] bg-emerald-100/60 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-[30rem] h-[30rem] bg-cyan-100/50 rounded-full blur-[100px] pointer-events-none" />

      <div className="site-container relative z-10 space-y-12">
        
        {/* =========================================================================
           TOP: Immaculate Light-Theme Headline & Sovereign Mission Eyebrow
           ========================================================================= */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold shadow-2xs">
            <span className="relative flex size-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex rounded-full size-2 bg-emerald-600" />
            </span>
            <ShieldCheck className="size-3.5 text-emerald-700" />
            <span className="font-mono tracking-tight text-[11px] sm:text-xs">
              {pick(["SOVEREIGN TRUST ARCHITECTURE // ROYAL CHARTER #5421", "المشروعية النظامية والامتثال السيادي // ترخيص رقم 5421"])}
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-950 tracking-tight leading-[1.16]">
            {language === "ar" ? (
              <>
                بنية تحتية سيادية محكومة{" "}
                <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 via-teal-700 to-cyan-600">
                  للارتقاء بالصحة العامة
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

          <p className="text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {pick([
              "Chartered under official statutory license #5421 by the Saudi National Center for Non-Profit Sector (NCNP), WAIWIM synthesizes sovereign regulatory immunity with hospital-grade biomedical precision and transparent CPA oversight.",
              "مرخصة نظامياً برقم 5421 من المركز الوطني للقطاع غير الربحي بالمملكة، وتجمع وايويم بين المشروعية السيادية والمعايرة الطبية الحيوية المعتمدة من هيئة الغذاء والدواء والشفافية المحاسبية الكاملة."
            ])}
          </p>
        </div>

        {/* =========================================================================
           CENTERPIECE: Sunlit Luminous Bio-Crystal Stage (Pure Light Theme Luxury)
           ========================================================================= */}
        <div className="relative rounded-3xl overflow-hidden border border-slate-200/90 shadow-xl bg-white group">
          <div className="relative h-[22rem] sm:h-[28rem] lg:h-[34rem] w-full overflow-hidden">
            
            {/* Luminous Sunlit Crystal 3D Centerpiece */}
            <img 
              src="/images/waiwim_sovereign_crystal.jpg" 
              alt="Luminous Sovereign Bio-Crystal on Sculptural Pedestal in sunlit pavilion"
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-1000"
            />

            {/* Subtle Radiant Mint Ambient Glow over Center */}
            <div className="absolute inset-0 bg-radial from-emerald-400/5 via-transparent to-slate-900/5 pointer-events-none" />

            {/* Top Bar Floating Indicators */}
            <div className="absolute top-5 inset-x-5 flex items-center justify-between pointer-events-none">
              <div className="px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-xs flex items-center gap-2 font-mono text-xs text-slate-800">
                <span className="size-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="font-bold text-slate-900">NODE:</span>
                <span className="text-emerald-700 font-semibold">KSA-SOVEREIGN-NODE-5421</span>
              </div>

              <div className="px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-xs hidden sm:flex items-center gap-2 font-mono text-xs text-slate-600">
                <Activity className="size-3.5 text-cyan-600 animate-pulse" />
                <span>SFDA ISO-13485 CERTIFIED</span>
              </div>
            </div>

            {/* 4 Interactive Floating Resonance Anchors around Crystal */}
            <div className="absolute inset-0 z-20 pointer-events-none">
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
                      "px-3.5 py-2 rounded-2xl flex items-center gap-2.5 backdrop-blur-xl border transition-all duration-300 shadow-md",
                      isCurrent
                        ? "bg-white border-emerald-500 shadow-emerald-500/20 ring-2 ring-emerald-500/30"
                        : "bg-white/85 border-slate-200/90 hover:bg-white hover:border-emerald-300"
                    )}>
                      <div className={cn(
                        "size-7 rounded-xl flex items-center justify-center transition-colors",
                        isCurrent ? "bg-emerald-600 text-white" : "bg-emerald-50 text-emerald-700 group-hover/anchor:bg-emerald-100"
                      )}>
                        <Icon className="size-3.5" />
                      </div>
                      <div className="text-start font-mono">
                        <span className="text-[10px] text-slate-500 block font-semibold leading-none">{p.code}</span>
                        <strong className="text-xs font-bold text-slate-900 block mt-0.5">{p.indexScore}</strong>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom Real-time Telemetry Bar */}
            <div className="absolute bottom-5 inset-x-5 z-20">
              <div className="p-4 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3 text-start">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center shrink-0">
                    <current.icon className="size-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 font-mono text-xs text-emerald-800 font-bold">
                      <span>{language === "ar" ? current.authorityAr : current.authorityEn}</span>
                      <span className="px-2 py-0.5 rounded-md bg-emerald-100/70 text-emerald-900 font-extrabold text-[11px]">
                        {current.indexScore}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5 max-w-xl line-clamp-1">
                      {language === "ar" ? current.summaryAr : current.summaryEn}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Button asChild size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-bold text-xs h-9 px-5 shadow-xs">
                    <Link to="/governance">
                      <span>{pick(["Inspect Full Charter", "معاينة السجل الكامل"])}</span>
                      <ArrowRight className="rtl:rotate-180 size-3 ms-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* =========================================================================
           TACTILE SCRUBBER DECK: 4 Luminous Glass Pillar Cards
           ========================================================================= */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map((p) => {
            const isSelected = activePillar === p.id;
            const Icon = p.icon;
            return (
              <div
                key={p.id}
                onClick={() => setActivePillar(p.id)}
                className={cn(
                  "p-5 rounded-3xl cursor-pointer transition-all duration-300 text-start bg-white border relative overflow-hidden group",
                  isSelected
                    ? "border-emerald-500 shadow-lg shadow-emerald-500/10 ring-2 ring-emerald-500/20 scale-[1.01]"
                    : "border-slate-200/90 shadow-2xs hover:border-emerald-300 hover:shadow-md hover:scale-[1.005]"
                )}
              >
                {/* Top Row: Pill Tag + Icon */}
                <div className="flex items-center justify-between">
                  <span className={cn(
                    "text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border transition-colors",
                    p.color === "emerald" && "text-emerald-900 bg-emerald-50 border-emerald-300",
                    p.color === "cyan" && "text-cyan-900 bg-cyan-50 border-cyan-300",
                    p.color === "indigo" && "text-indigo-900 bg-indigo-50 border-indigo-300",
                    p.color === "amber" && "text-amber-900 bg-amber-50 border-amber-300"
                  )}>
                    {language === "ar" ? p.codeAr : p.code}
                  </span>

                  <div className={cn(
                    "size-7 rounded-xl flex items-center justify-center transition-all",
                    isSelected ? "bg-emerald-600 text-white shadow-xs" : "bg-slate-100 text-slate-500 group-hover:bg-emerald-50 group-hover:text-emerald-700"
                  )}>
                    <Icon className="size-3.5" />
                  </div>
                </div>

                {/* Title & Tagline */}
                <div className="mt-3.5">
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-950 transition-colors">
                    {language === "ar" ? p.taglineAr : p.taglineEn}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-snug line-clamp-2">
                    {language === "ar" ? p.summaryAr : p.summaryEn}
                  </p>
                </div>

                {/* Score Footprint */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-500 text-[11px]">
                    {language === "ar" ? p.indexLabelAr : p.indexLabelEn}
                  </span>
                  <strong className="text-emerald-700 font-extrabold text-sm">{p.indexScore}</strong>
                </div>

                {/* Light Reflection Sweep on Hover */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-emerald-100/40 to-transparent skew-x-12 translate-x-[-150%] group-hover:translate-x-[250%] transition-transform duration-1000 ease-in-out" />
                </div>
              </div>
            );
          })}
        </div>

        {/* =========================================================================
           LUMINOUS INTEGRITY FOOTER: Sleek 'Voice Matters' Cryptographic Pill + CTAs
           ========================================================================= */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 text-start">
          
          {/* Security & Whistleblower Enclave Strip */}
          <div className="flex items-center gap-3.5">
            <div className="size-11 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center shrink-0 shadow-2xs">
              <Lock className="size-5" />
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <h4 className="font-display font-bold text-slate-900 text-sm">
                  {pick(["'Voice Matters' Cryptographic Integrity Channel", "بوابة النزاهة المؤسسية المشفرة (صوتك مسموع)"])}
                </h4>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-mono font-bold">
                  <span className="size-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  100% ANONYMOUS
                </span>
              </div>
              <p className="text-xs text-slate-500 max-w-xl">
                {pick([
                  "Encrypted under AES-256 GCM. Direct confidential pipeline to the Internal Audit Committee with guaranteed < 48h SLA response.",
                  "قناة مشفرة ببروتوكول AES-256 GCM لتقديم البلاغات والملاحظات بسرية تامة ومباشرة إلى لجنة الرقابة والتدقيق الداخلي."
                ])}
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
            <Button 
              onClick={() => setVoiceOpen(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-bold text-xs h-11 px-6 shadow-md shadow-emerald-600/20 cursor-pointer transition-all hover:scale-102 flex-1 md:flex-none"
            >
              <FileCheck2 className="size-4 me-2" />
              {pick(["Submit Confidential Report", "رفع بلاغ سري ومحمي"])}
            </Button>

            <Button variant="outline" asChild className="rounded-full font-bold border-slate-300 text-xs h-11 px-6 bg-white hover:bg-slate-50 text-slate-700 cursor-pointer flex-1 md:flex-none">
              <Link to="/about">
                {pick(["Board & Leadership", "مجلس الإدارة"])}
              </Link>
            </Button>
          </div>

        </div>

      </div>

      {/* Voice Matters Modal */}
      <VoiceMattersModal open={voiceOpen} onClose={() => setVoiceOpen(false)} />
    </section>
  );
}
