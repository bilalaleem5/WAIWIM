import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { 
  Dna, Activity, ArrowRight, Target, FlaskConical, Hexagon,
  Sparkles, RefreshCw, Layers, ShieldCheck, Zap, Crosshair, ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "./language";
import { cn } from "@/lib/utils";

/* =========================================================================
   04 — 3D MOLECULAR GENERATIVE ENGINE (HUD STUDIO OVERLAY)
   - Refined, clean, optimized layout aligned with site architecture
   - Floating HUD glassmorphism matching user's reference design
   - Smooth GPU-accelerated levitation motions & scanning laser sweeps
   - Interactive on-protein docking hotspots with real-time telemetry
   - 100% Responsive on Mobile, Tablet & Desktop + Full Arabic RTL Support
   ========================================================================= */

interface DockingHotspot {
  id: string;
  name: string;
  type: string;
  distance: string;
  deltaG: string;
  coords: { x: string; y: string };
  descEn: string;
  descAr: string;
}

export function MolecularGenerativeEngine() {
  const { language, pick } = useLanguage();
  const [selectedTarget, setSelectedTarget] = useState<number>(0);
  const [isSynthesizing, setIsSynthesizing] = useState<boolean>(false);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [simulationClock, setSimulationClock] = useState("14:32:01");

  const targets = [
    {
      id: 0,
      code: "KRAS G12D",
      nameEn: "Pancreatic & Colorectal Oncogene",
      nameAr: "جين الأورام المستعصية للبنكرياس والقولون",
      affinity: -11.8,
      dockingScore: 99.4,
      qedDrugScore: 0.89,
      leadCandidate: "WAI-9024 (Macrocyclic Inhibitor)",
      scaffold: "C28 H34 N6 O4 S",
      phaseEn: "Preclinical Lead Optimization",
      phaseAr: "تحسين المركب الرئيسي قبل السريري",
      targetProtein: "CDK2 / KRAS-G12D",
      descEn: "Targeting previously undruggable KRAS G12D mutations using equivariant graph neural networks and deep generative diffusion.",
      descAr: "استهداف طفرات KRAS غير القابلة للعلاج سابقاً عبر شبكات الرسوم البيانية العصبية ونماذج التوليد الجزيئي الفائق."
    },
    {
      id: 1,
      code: "EGFR L858R",
      nameEn: "Non-Small Cell Lung Carcinoma",
      nameAr: "طفرة سرطان الرئة غير صغير الخلايا",
      affinity: -12.3,
      dockingScore: 98.7,
      qedDrugScore: 0.92,
      leadCandidate: "WAI-7741 (Covalent Kinase Binder)",
      scaffold: "C25 H29 Cl N5 O2",
      phaseEn: "Target Validation & Cryo-EM",
      phaseAr: "التحقق الجزيئي والمجهر الإلكتروني فائق البرودة",
      targetProtein: "EGFR Kinase Domain",
      descEn: "Overcoming third-generation tyrosine kinase resistance mutations via allosteric binding pocket synthesis.",
      descAr: "التغلب على مقاومة مثبطات الجيل الثالث لسرطان الرئة عبر توليد جزيئات ترتبط بالمواقع الفراغية البديلة للمستقبل."
    },
    {
      id: 2,
      code: "BCL-2",
      nameEn: "Hematologic Malignancies & Leukemia",
      nameAr: "أورام الدم الليمفاوية وسرطان الدم",
      affinity: -10.9,
      dockingScore: 97.9,
      qedDrugScore: 0.85,
      leadCandidate: "WAI-5510 (BH3 Domain Mimetic)",
      scaffold: "C32 H41 N7 O5",
      phaseEn: "In Vitro Selectivity Assay",
      phaseAr: "فحوصات الانتقائية المخبرية الدقيقة",
      targetProtein: "BCL-2 Apoptotic Groove",
      descEn: "Inducing targeted apoptotic pathways in leukemic blast cells with zero on-target thrombocytopenia toxicity.",
      descAr: "تحفيز مسارات موت الخلايا السرطانية المستهدفة دون التسبب في سمية الصفائح الدموية المصاحبة للعلاجات التقليدية."
    }
  ];

  const current = targets[selectedTarget];

  // Interactive protein docking hotspots
  const hotspots: DockingHotspot[] = [
    {
      id: "gly88",
      name: "GLY88",
      type: "Hydrogen Bond",
      distance: "2.85 Å",
      deltaG: "-3.4 kcal/mol",
      coords: { x: "49%", y: "35%" },
      descEn: "Strong electrostatic backbone hydrogen bond anchoring the central heterocyclic ring.",
      descAr: "رابطة هيدروجينية قوية تثبت الحلقة المركزية في التجويف النشط."
    },
    {
      id: "gly186",
      name: "GLY186",
      type: "Van der Waals Pocket",
      distance: "3.42 Å",
      deltaG: "-4.2 kcal/mol",
      coords: { x: "45%", y: "65%" },
      descEn: "Hydrophobic pocket stabilization preventing metabolic clearance.",
      descAr: "تثبيت كاره للماء يعزز الاستقرار الأيضي ويمنع التحلل السريع."
    },
    {
      id: "ligand",
      name: "LIGAND AT7519",
      type: "Allosteric Core",
      distance: "1.92 Å",
      deltaG: "-9.4 kcal/mol",
      coords: { x: "53%", y: "49%" },
      descEn: "De novo generated macrocyclic scaffold bound to target oncogenic cleft.",
      descAr: "الهيكل الجزيئي المولد حاسوبياً يرتبط بدقة فائقة بموقع الطفرة الجينية."
    }
  ];

  const triggerSynthesis = () => {
    setIsSynthesizing(true);
    setTimeout(() => setIsSynthesizing(false), 900);
  };

  // Clock simulation
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setSimulationClock(
        `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section 
      id="molecular-engine"
      className="relative w-full overflow-hidden bg-white border-b border-slate-200 transition-colors duration-700"
    >
      {/* =========================================================================
         3D MOLECULAR DOCKING VISUAL (CENTER-RIGHT DESKTOP CANVAS)
         - Pure white background integration (Zero blue haze or tint)
         - High-contrast multiply blend on pure white
         - Smooth scanning laser sweep
         - Interactive docking hotspot beacons
         ========================================================================= */}
      <div 
        className={cn(
          "absolute right-[-4%] sm:right-[-1%] lg:right-[0%] xl:right-[1%] top-[8%] lg:top-[4%] xl:top-[3%] w-[110%] sm:w-[88%] lg:w-[68%] xl:w-[62%] h-[85%] lg:h-[90%] xl:h-[92%] pointer-events-none transition-all duration-700 ease-out z-[2]",
          isSynthesizing ? "scale-[0.98] opacity-60 blur-[1px]" : "scale-100 opacity-95 blur-0"
        )}
      >
        <img 
          src="/images/molecular_docking_3d.jpg" 
          alt="De Novo Molecular Docking Simulation" 
          className="w-full h-full object-contain object-center select-none mix-blend-multiply" 
        />

        {/* Dynamic Scanning Laser Sweep across the protein */}
        <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#32E0E3] to-transparent shadow-[0_0_18px_#32E0E3,0_0_36px_#10B981] animate-molecular-scan pointer-events-none opacity-80" />

        {/* Interactive Docking Hotspots over the protein */}
        <div className="absolute inset-0 pointer-events-auto hidden md:block">
          {hotspots.map((hs) => {
            const isHovered = activeHotspot === hs.id;
            return (
              <div 
                key={hs.id}
                style={{ left: hs.coords.x, top: hs.coords.y }}
                className="absolute -translate-x-1/2 -translate-y-1/2 group z-30 pointer-events-auto"
                onMouseEnter={() => setActiveHotspot(hs.id)}
                onMouseLeave={() => setActiveHotspot(null)}
              >
                {/* Radar ping ring */}
                <span className="absolute -inset-2 rounded-full bg-cyan-400 opacity-75 animate-ping pointer-events-none" />
                <button 
                  className={cn(
                    "relative size-5 rounded-full border-2 border-white flex items-center justify-center transition-all duration-300 shadow-md cursor-pointer",
                    isHovered ? "bg-cyan-500 scale-125 shadow-[0_0_15px_#32E0E3]" : "bg-teal-600 hover:scale-110"
                  )}
                  onClick={() => setActiveHotspot(isHovered ? null : hs.id)}
                >
                  <span className="size-1.5 rounded-full bg-white" />
                </button>

                {/* Hotspot Floating Tooltip */}
                <div className={cn(
                  "absolute left-1/2 -translate-x-1/2 bottom-7 w-48 p-2.5 rounded-xl bg-slate-950/90 backdrop-blur-md border border-cyan-400/50 text-white shadow-2xl transition-all duration-300 pointer-events-none z-40",
                  isHovered ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-2 scale-95"
                )}>
                  <div className="text-[10px] font-mono font-bold text-cyan-300 uppercase flex items-center justify-between mb-1">
                    <span>{hs.name}</span>
                    <span className="text-[8px] text-emerald-400">{hs.deltaG}</span>
                  </div>
                  <div className="text-[9px] text-slate-300 leading-snug">
                    {language === "ar" ? hs.descAr : hs.descEn}
                  </div>
                  <div className="mt-1 text-[8px] font-mono text-cyan-400/80">DIST: {hs.distance}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
         MAIN SITE CONTAINER: Aligned with the rest of WAIWIM's layout
         ========================================================================= */}
      <div className="relative z-10 max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16 lg:py-20 min-h-[920px] xl:min-h-[1020px] flex flex-col justify-between">
        
        {/* =========================================================================
           TOP SECTION: TYPOGRAPHY, BADGE & INTERACTIVE PILL CONTROLS
           ========================================================================= */}
        <div className="max-w-2xl space-y-5 lg:space-y-6 pt-2 lg:pt-4 relative z-30">
          
          {/* Sovereign Biotech Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/75 backdrop-blur-xl border border-white/90 text-slate-800 text-[11px] sm:text-xs font-mono font-bold tracking-wider shadow-sm hover:border-cyan-300 transition-all">
            <span className="relative flex size-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
              <span className="relative inline-flex rounded-full size-2 bg-teal-600" />
            </span>
            <Dna className="size-3.5 text-teal-700 animate-spin-fluid" /> 
            <span>
              {pick([
                "DE NOVO AI DRUG DISCOVERY ENGINE // BIOTECH ACCELERATOR", 
                "محرك الذكاء الاصطناعي لتصميم الدواء // مسرعة التقنية الحيوية"
              ])}
            </span>
          </div>
          
          {/* Main Display Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-[3.25rem] font-display font-black text-slate-950 leading-[1.08] tracking-tight">
            {language === "ar" ? (
              <>
                توليد جزيئات علاجية<br/>
                مبتكرة عبر{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-800 via-cyan-700 to-emerald-600">
                  الذكاء الاصطناعي الفائق
                </span>
              </>
            ) : (
              <>
                De Novo Molecular<br/>
                Generation via<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-800 via-cyan-700 to-emerald-600">
                  Frontier Generative AI
                </span>
              </>
            )}
          </h2>
          
          {/* Body Description */}
          <p className="text-sm sm:text-base text-slate-700 font-normal max-w-lg leading-relaxed">
            {pick([
              "Synthesizing billion-molecule chemical spaces in seconds. WAIWIM's generative diffusion models fold complex therapeutic targets to unlock sovereign therapies for unmet clinical challenges.",
              "اختصار سنوات التجارب المعملية إلى ثوانٍ معدودة؛ تصمم خوارزمياتنا الجزيئات العلاجية بدقة ذرية لاستهداف الأمراض المستعصية والوراثية في المملكة."
            ])}
          </p>
          
          {/* Interactive Target Pill Selectors */}
          <div className="pt-2 sm:pt-3">
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
              {targets.map((t) => {
                const isActive = selectedTarget === t.id;
                return (
                  <button 
                    key={t.id}
                    onClick={() => { 
                      setSelectedTarget(t.id); 
                      triggerSynthesis(); 
                    }}
                    className={cn(
                      "px-5 sm:px-6 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm tracking-wide transition-all duration-300 flex items-center gap-2 cursor-pointer",
                      isActive 
                        ? "bg-slate-950 text-white shadow-xl scale-105 ring-2 ring-teal-500/40" 
                        : "bg-white/80 hover:bg-white text-slate-800 backdrop-blur-md border border-white/90 shadow-sm hover:scale-102 hover:shadow-md"
                    )}
                  >
                    <span className={cn("size-2 rounded-full", isActive ? "bg-teal-400 animate-pulse" : "bg-slate-400")} />
                    <span>{t.code}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* =========================================================================
           DESKTOP FLOATING HUD PANELS (WITH KINETIC LEVITATION MOTIONS)
           - Directly matches the user's reference visual layout
           - Smooth ambient levitation keyframes (hud-float-1, 2, 3)
           - Clean glassmorphism with high-contrast typography
           ========================================================================= */}
        
        {/* HUD 1: Target Protein & Telemetry Code Block (Top Right) */}
        <div 
          key={`hud1-${selectedTarget}`}
          className="absolute top-[8%] lg:top-[10%] right-[3%] lg:right-[8%] xl:right-[11%] w-[330px] rounded-3xl molecular-hud-glass p-5 text-slate-900 hidden lg:block animate-hud-float-1 z-20 shadow-xl"
        >
          {/* Header pill */}
          <div className="text-[9px] font-mono font-bold uppercase tracking-wider flex items-center justify-between mb-3 text-slate-600 border-b border-slate-200/60 pb-2">
            <span className="flex items-center gap-1.5 text-teal-800">
              <span className="size-2 bg-teal-500 rounded-full animate-ping" />
              TARGET: {current.code}
            </span>
            <span className="text-[8px] bg-slate-200/80 px-2 py-0.5 rounded text-slate-700 font-mono">DOCK: 99.4%</span>
          </div>

          <div className="flex items-baseline justify-between mb-2">
            <div className="text-2xl font-black text-slate-950 tracking-tight">{current.targetProtein}</div>
            <div className="text-[10px] font-mono text-emerald-700 font-bold">ΔG: {current.affinity}</div>
          </div>

          {/* Micro code telemetry stream */}
          <div className="text-[8px] text-slate-600 font-mono leading-relaxed bg-white/40 p-2.5 rounded-xl border border-white/60 mb-3">
            <p className="text-teal-900 font-bold">TGK5071 DONGRAFICOK PROTTEXT.</p>
            <p>DIMM 12 POCC6Y // EQUIVARIANT GNN</p>
            <p>M40C004 14.CCX1 // ALLOST_POCKET</p>
            <p className="text-slate-500">DOCOUT FINAL PATH3G55. DUHF 91</p>
          </div>

          {/* Lower telemetry with sparkline indicator */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-[9px] font-mono text-slate-500 font-bold">
            <div>
              <span>HUIS DONDB YR202</span>
              <div className="text-base text-slate-900 font-sans font-bold">{simulationClock}</div>
            </div>
            {/* Sparkline Visual */}
            <svg className="w-20 h-6 text-teal-600" viewBox="0 0 80 24" fill="none">
              <path d="M0 18 L15 16 L25 20 L35 8 L45 14 L55 4 L65 12 L80 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Connector Line Anchor to Active Molecular Core */}
          <div className="absolute -left-12 bottom-12 w-12 h-px bg-gradient-to-l from-white/90 to-cyan-400 hidden xl:block pointer-events-none">
            <div className="absolute -left-1 -top-[3px] size-2 rounded-full bg-cyan-500 shadow-[0_0_8px_#32E0E3]" />
          </div>
        </div>

        {/* HUD 2: Chemical Scaffold Formula (Middle Center) */}
        <div 
          key={`hud2-${selectedTarget}`}
          className="absolute top-[40%] xl:top-[38%] left-[49%] xl:left-[53%] -translate-x-1/2 -translate-y-1/2 rounded-2xl molecular-hud-glass p-4 text-slate-900 hidden lg:block animate-hud-float-2 z-20 shadow-xl"
        >
          <div className="text-[10px] font-bold font-mono uppercase tracking-wider mb-1 flex items-center gap-1.5 text-cyan-800">
            <Hexagon className="size-3 text-cyan-600" />
            <span>CHEMICAL SCAFFOLD</span>
          </div>
          <div className="text-base font-mono font-black text-slate-950 tracking-wider mb-1 px-1">
            {current.scaffold}
          </div>
          <div className="text-[9px] text-slate-600 border-t border-slate-200/70 pt-2 px-1 font-bold uppercase tracking-tight flex items-center justify-between gap-3">
            <span>{language === "ar" ? current.phaseAr : current.phaseEn}</span>
            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          {/* Connector Anchor Beacon */}
          <div className="absolute -right-2 top-1/2 size-2 bg-cyan-400 rounded-full shadow-[0_0_10px_#32E0E3]" />
        </div>

        {/* HUD 3: Binding Specifics (Middle Right) */}
        <div 
          key={`hud3-${selectedTarget}`}
          className="absolute top-[46%] xl:top-[44%] right-[3%] lg:right-[6%] xl:right-[8%] rounded-2xl molecular-hud-glass p-4 text-slate-900 hidden lg:block animate-hud-float-3 z-20 shadow-xl"
        >
          <div className="flex justify-end items-center gap-2 text-[10px] font-bold font-mono uppercase tracking-wider mb-2.5 text-emerald-800">
            <span>❖ Binding Specifics</span>
            <Activity className="size-3.5 text-emerald-600 animate-pulse" />
          </div>
          <div className="text-[11px] font-mono font-bold space-y-1.5 text-right flex flex-col items-end">
            <div className="flex gap-4 text-slate-600">
              <span>ΔG Ligand</span> 
              <span className="text-emerald-700 font-bold">-9.4 kcal/mol</span>
            </div>
            <div className="flex gap-4 text-slate-900 font-extrabold border-t border-slate-200/60 pt-1">
              <span>BINDING AFFINITY:</span> 
              <span className="text-emerald-700">{current.affinity} kcal/mol</span>
            </div>
          </div>
          {/* Interactive Hotspot Indicator */}
          <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex items-center justify-end gap-1.5 text-[8px] font-mono text-slate-500">
            <span>RMSD: 0.85 Å // STEP 743</span>
          </div>
        </div>

        {/* HUD 4: Sliders & Quantum Docking Metrics (Bottom Left Master Console) */}
        <div 
          key={`hud4-${selectedTarget}`}
          className="relative lg:absolute lg:bottom-[12%] xl:bottom-[14%] lg:left-[4%] xl:left-[3%] rounded-3xl molecular-hud-glass p-6 sm:p-7 w-full sm:w-[390px] text-slate-900 z-30 shadow-2xl mt-8 lg:mt-0 animate-hud-float-1"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="text-[10px] font-mono font-bold text-teal-800 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                <Sparkles className="size-3 text-teal-600" />
                <span>FRONTIER GENERATIVE FOLD</span>
              </div>
              <h3 className="text-xl font-black text-slate-950 leading-tight">
                Equivariant Diffusion &<br/>Quantum Docking
              </h3>
            </div>

            {/* Live Docking Simulator Trigger */}
            <button
              onClick={triggerSynthesis}
              title="Re-run Simulation"
              className="p-2 rounded-xl bg-white/70 hover:bg-white text-slate-700 hover:text-teal-700 border border-white/80 shadow-sm transition-all hover:scale-110 active:scale-95 cursor-pointer"
            >
              <RefreshCw className={cn("size-4", isSynthesizing && "animate-spin text-teal-600")} />
            </button>
          </div>

          <div className="space-y-4">
            {/* Slider 1: Binding Free Energy */}
            <div>
              <div className="flex justify-between text-[11px] font-bold mb-1.5">
                <span className="text-slate-700">Binding Free Energy (ΔG)</span>
                <span className="font-mono text-teal-900 font-extrabold">{current.affinity} kcal/mol</span>
              </div>
              <div className="h-2 rounded-full bg-slate-300/60 overflow-hidden p-0.5">
                <div 
                  className="h-full bg-gradient-to-r from-teal-500 via-teal-400 to-cyan-400 rounded-full shadow-[0_0_10px_rgba(20,184,166,0.6)] transition-all duration-700 ease-out" 
                  style={{ width: `${Math.min(100, Math.abs(current.affinity) * 7.5)}%` }}
                />
              </div>
            </div>

            {/* Slider 2: Target Selectivity Index */}
            <div>
              <div className="flex justify-between text-[11px] font-bold mb-1.5">
                <span className="text-slate-700">Target Selectivity Index</span>
                <span className="font-mono text-cyan-900 font-extrabold">{current.dockingScore}%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-300/60 overflow-hidden p-0.5">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.6)] transition-all duration-700 ease-out" 
                  style={{ width: `${current.dockingScore}%` }}
                />
              </div>
            </div>

            {/* Slider 3: Drug Likeness */}
            <div>
              <div className="flex justify-between text-[11px] font-bold mb-1.5">
                <span className="text-slate-700">Drug Likeness (QED Filter)</span>
                <span className="font-mono text-indigo-900 font-extrabold">{current.qedDrugScore} / 1.0</span>
              </div>
              <div className="h-2 rounded-full bg-slate-300/60 overflow-hidden p-0.5">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-teal-400 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.6)] transition-all duration-700 ease-out" 
                  style={{ width: `${current.qedDrugScore * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Micro Telemetry Footer */}
          <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-[9px] font-mono text-slate-500">
            <span>STATUS: {isSynthesizing ? "RE-OPTIMIZING..." : "DOCKING MINIMIZED"}</span>
            <span className="text-emerald-700 font-bold">100% SFDA READY</span>
          </div>
        </div>

        {/* HUD 5: Disease Summary & Target Oncology (Bottom Right) */}
        <div 
          key={`hud5-${selectedTarget}`}
          className="absolute bottom-[16%] xl:bottom-[18%] right-[3%] lg:right-[7%] xl:right-[9%] rounded-2xl molecular-hud-glass p-5 text-slate-900 hidden lg:block animate-hud-float-2 z-20 shadow-xl"
        >
          <div className="text-[10px] font-bold uppercase tracking-wider flex items-center gap-2 mb-2 text-cyan-900">
            <span className="size-2 border-[2px] border-cyan-600 rounded-full animate-ping" /> 
            <span>❖ {language === "ar" ? current.nameAr : current.nameEn}</span>
          </div>
          <div className="text-xs text-slate-700 max-w-[260px] leading-relaxed font-normal">
            {language === "ar" ? current.descAr : current.descEn}
          </div>
          {/* Connector Line Anchor */}
          <div className="absolute -top-10 left-8 w-px h-10 bg-gradient-to-t from-white/90 to-teal-400 hidden xl:block pointer-events-none">
            <div className="absolute top-0 -left-[3px] size-2 rounded-full bg-teal-500 shadow-[0_0_8px_#10B981]" />
          </div>
        </div>

        {/* =========================================================================
           MOBILE & TABLET ADAPTIVE CARDS (< 1024px)
           - Displays structured, stacked glass cards so smaller screens lose zero data
           ========================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 lg:hidden relative z-30">
          {/* Mobile Target Summary */}
          <div className="rounded-2xl molecular-hud-glass p-4 text-slate-900">
            <div className="text-[10px] font-mono font-bold text-teal-800 uppercase mb-1">
              TARGET // {current.code}
            </div>
            <div className="text-base font-black mb-1">{current.leadCandidate}</div>
            <div className="text-xs text-slate-600 leading-relaxed">
              {language === "ar" ? current.descAr : current.descEn}
            </div>
          </div>

          {/* Mobile Chemical Scaffold */}
          <div className="rounded-2xl molecular-hud-glass p-4 text-slate-900">
            <div className="text-[10px] font-mono font-bold text-cyan-800 uppercase mb-1 flex items-center gap-1.5">
              <Hexagon className="size-3" /> CHEMICAL SCAFFOLD
            </div>
            <div className="text-base font-mono font-black mb-1">{current.scaffold}</div>
            <div className="text-xs text-slate-700 font-bold">
              {language === "ar" ? current.phaseAr : current.phaseEn}
            </div>
            <div className="text-[11px] font-mono text-emerald-700 font-bold mt-2">
              AFFINITY: {current.affinity} kcal/mol // DOCK: {current.dockingScore}%
            </div>
          </div>
        </div>

        {/* =========================================================================
           BOTTOM CONSOLE BAR: Telemetry ribbon directly matching user reference visual
           - Left: Stream data tickers
           - Center: Glowing "Explore AI Pipeline →" pill button with luminous halo
           - Right: GPU cluster & version watermark
           ========================================================================= */}
        <div className="relative mt-12 sm:mt-16 pt-6 border-t border-slate-300/80 flex flex-col md:flex-row items-center justify-between gap-6 z-40">
          
          {/* Left Telemetry Data Stream */}
          <div className="hidden md:flex items-center gap-4 text-[10px] font-mono text-slate-600">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-bold text-slate-800">STREAM:</span>
              <span>124,590 CONFORMERS</span>
            </div>
            <span className="text-slate-300">|</span>
            <div>RMSD: 0.42 Å</div>
            <span className="text-slate-300">|</span>
            <div>ENERGY: MINIMIZED</div>
          </div>

          {/* Center Call-to-Action Glowing Pill Button */}
          <div className="relative group">
            {/* Luminous Neon Cyan Halo Glow */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 opacity-60 blur-md group-hover:opacity-100 transition duration-500 group-hover:blur-lg" />
            
            <Button 
              asChild 
              className="relative rounded-full px-8 sm:px-10 py-6 bg-slate-950 hover:bg-slate-900 text-white font-bold text-sm tracking-wide shadow-xl transition-all duration-300 group-hover:scale-105 border border-slate-700/80 cursor-pointer"
            >
              <Link to="/programs">
                <span>{pick(["Explore AI Pipeline", "استكشاف منصة الذكاء الاصطناعي"])}</span>
                <ArrowRight className="ml-2.5 size-4 rtl:rotate-180 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          {/* Right Telemetry & Watermark */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right gap-1">
            <div className="text-[10px] font-mono text-slate-600 flex items-center gap-2">
              <Zap className="size-3 text-cyan-600" />
              <span>GPU CLUSTER: RIYADH-CORE-01</span>
            </div>
            <div className="text-[8px] font-mono text-slate-400 uppercase tracking-wider">
              VERSION: FRONTIER GEN-AI v2.1 // DE NOVO DIFFUSION
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
