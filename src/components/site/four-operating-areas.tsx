import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { 
  ShieldCheck, BarChart3, Heart, ArrowRight, Dna, 
  Sparkles, CheckCircle2, Award, ChevronRight, Play, Pause
} from "lucide-react";
import { useLanguage } from "./language";
import { cn } from "@/lib/utils";

/* =========================================================================
   03 — FOUR OPERATING AREAS & PUBLIC-INTEREST LABORATORY
   - Directly implements the user's reference design
   - Auto-rotates every 4 seconds with high-tech 3D spatial morph animation
   - Laser scanline flash + dynamic radar burst on transition
   - Top: Editorial Identity Statement ("Medicine gets better when discovery leaves the lab.")
   - Bottom: "A single institution. Four ways to move medicine." with parallel interactive tabs
   - Right Showcase: Sleek dark teal deck with kinetic 3D elevation & orbital radar ripples
   - Pure Light Theme harmony with full Arabic (RTL) support
   ========================================================================= */

export function FourOperatingAreas() {
  const { language, pick } = useLanguage();
  const [activeTab, setActiveTab] = useState<number>(3); // Default to Community Health Impact (04) matching reference image
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [flipKey, setFlipKey] = useState<number>(0);

  const areas = [
    {
      id: "ai-pharma",
      num: "01",
      titleEn: "AI & Drug Innovation",
      titleAr: "الذكاء الاصطناعي وابتكار الدواء",
      leadEn: "Advancing artificial intelligence applications in pharmaceutical research, molecular generative design, and high-throughput drug candidate screening.",
      leadAr: "تطوير تطبيقات الذكاء الاصطناعي في البحث الدوائي، والتصميم الجزيئي التوليدي، والفحص عالي الإنتاجية للمركبات الواعدة.",
      tagsEn: ["Target Discovery", "Generative Chemistry", "Structure Prediction"],
      tagsAr: ["اكتشاف الأهداف الجزيئية", "الكيمياء التوليدية", "تنبؤ التركيب البروتيني"],
      link: "/research"
    },
    {
      id: "health-innovation",
      num: "02",
      titleEn: "Health Innovation",
      titleAr: "الابتكار والتقنية الصحية",
      leadEn: "Developing and scaling digital health technologies, patient-tailored precision medicine, and intelligent pharmaceutical care delivery models.",
      leadAr: "تطوير وتبني تقنيات الصحة الرقمية، والطب الدقيق المخصص للمريض، ونماذج الرعاية الصيدلانية الذكية.",
      tagsEn: ["Precision Medicine", "Digital Therapeutics", "Clinical Decision Support"],
      tagsAr: ["الطب الدقيق والشخصي", "العلاجات الرقمية", "دعم القرار السريري"],
      link: "/programs"
    },
    {
      id: "research-education",
      num: "03",
      titleEn: "Research & Education",
      titleAr: "البحث العلمي والتعليم",
      leadEn: "Building national scientific capacity through hands-on specialized training curricula, computational fellowships, research grants, and knowledge exchange.",
      leadAr: "بناء القدرات العلمية الوطنية عبر مناهج تدريبية تخصصية، وزمالات حوسبية، ومنح بحثية، وبرامج لنقل المعرفة.",
      tagsEn: ["Curriculum Delivery", "Academic Fellowships", "Scientific Symposia"],
      tagsAr: ["تطوير المناهج التخصصية", "الزمالات الأكاديمية", "المؤتمرات العلمية المتخصصة"],
      link: "/about"
    },
    {
      id: "community-impact",
      num: "04",
      titleEn: "Community Health Impact",
      titleAr: "الأثر الصحي المجتمعي",
      leadEn: "Connecting health technologies, medical equipment banking, volunteer networks, and resources to address underserved healthcare needs across Saudi Arabia.",
      leadAr: "ربط التقنيات الصحية وبنوك الأجهزة الطبية وشبكات المتطوعين والموارد لتلبية الاحتياجات الصحية في شتى مناطق المملكة.",
      tagsEn: ["Medical Device Bank", "Vulnerable Outreach", "Health Equity"],
      tagsAr: ["بنك الأجهزة والمستلزمات", "الوصول للفئات الأكثر احتياجاً", "تعزيز العدالة الصحية"],
      link: "/support"
    }
  ];

  // Auto-switch tabs every 4 seconds with high-tech 3D spatial morph animation
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % areas.length);
      setFlipKey((prev) => prev + 1);
    }, 4000); // 4 seconds timer requested by user

    return () => clearInterval(interval);
  }, [isPaused, areas.length]);

  const handleSelectTab = (idx: number) => {
    if (idx !== activeTab) {
      setActiveTab(idx);
      setFlipKey((prev) => prev + 1);
    }
  };

  const current = areas[activeTab];

  return (
    <section 
      id="operating-areas" 
      className="relative w-full bg-[#f8fafc] text-slate-900 py-20 lg:py-28 overflow-hidden border-b border-slate-200"
    >
      
      {/* Subtle ambient luminous glows */}
      <div className="absolute top-12 left-1/4 w-[40rem] h-[40rem] bg-teal-100/30 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-12 right-1/4 w-[40rem] h-[40rem] bg-cyan-100/25 rounded-full blur-[140px] pointer-events-none" />

      <div className="site-container relative z-10 space-y-20 lg:space-y-24">

        {/* =========================================================================
           TOP BLOCK: "A PUBLIC-INTEREST LABORATORY" (EDITORIAL IDENTITY STATEMENT)
           - Directly matches the top section of the user's reference image
           - Editorial serif headline with high aesthetic elegance
           ========================================================================= */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-start pb-16 border-b border-slate-200/80">
          
          {/* Left Column: Eyebrow + Editorial Headline */}
          <div className="lg:col-span-7 space-y-4">
            {/* Eyebrow */}
            <div className="flex items-center gap-2 text-teal-800 text-xs font-mono font-bold tracking-widest uppercase">
              <span className="w-5 h-[2px] bg-teal-600 inline-block" />
              <span>{pick(["A PUBLIC-INTEREST LABORATORY", "مختبر المصلحة العامة"])}</span>
            </div>

            {/* Editorial Headline */}
            <h2 className="font-editorial italic font-normal text-4xl sm:text-5xl lg:text-[3.75rem] text-slate-950 tracking-tight leading-[1.12]">
              {language === "ar" ? (
                <>
                  الطب يغدو أفضل<br />
                  حين يغادر الاكتشاف<br />
                  أسوار المختبر.
                </>
              ) : (
                <>
                  Medicine gets better<br />
                  when discovery<br />
                  leaves the lab.
                </>
              )}
            </h2>
          </div>

          {/* Right Column: Narrative Statement + 3 Status Pills */}
          <div className="lg:col-span-5 space-y-6 lg:pt-3">
            {/* Narrative text with accent border */}
            <div className="border-l-2 rtl:border-l-0 rtl:border-r-2 border-teal-600/70 pl-5 rtl:pl-0 rtl:pr-5">
              <p className="text-base sm:text-lg text-slate-700 font-normal leading-relaxed">
                {pick([
                  "WAIWIM is a Saudi licensed nonprofit where computational science, clinical care and community stewardship meet. We build the connective tissue between a promising model and a person who needs better care.",
                  "وايويم (WAIWIM) هي جمعية أهلية سعودية مرخصة تلتقي فيها العلوم الحاسوبية المتقدمة مع الرعاية السريرية والمسؤولية المجتمعية. نحن نبني الجسر الموثوق بين النموذج البحثي الواعد والمريض الذي يحتاج رعاية أفضل."
                ])}
              </p>
            </div>

            {/* 3 Status Pills */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              {/* Badge 1: Licensed Nonprofit */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white border border-slate-200/90 text-slate-700 text-xs font-medium shadow-2xs hover:border-teal-500 transition-colors">
                <ShieldCheck className="size-3.5 text-teal-700" />
                <span>{pick(["Licensed nonprofit", "ترخيص حكومي #5421"])}</span>
              </div>

              {/* Badge 2: Audited Impact */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white border border-slate-200/90 text-slate-700 text-xs font-medium shadow-2xs hover:border-cyan-500 transition-colors">
                <BarChart3 className="size-3.5 text-cyan-700" />
                <span>{pick(["Audited impact", "حوكمة وتدقيق مالي"])}</span>
              </div>

              {/* Badge 3: Patient-First */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white border border-slate-200/90 text-slate-700 text-xs font-medium shadow-2xs hover:border-emerald-500 transition-colors">
                <Heart className="size-3.5 text-emerald-600" />
                <span>{pick(["Patient-first", "رعاية تتمحور حول المريض"])}</span>
              </div>
            </div>
          </div>

        </div>

        {/* =========================================================================
           LOWER BLOCK: "FOUR OPERATING AREAS" (PARALLEL SIDE-BY-SIDE ARCHITECTURE)
           - Auto-switching every 4 seconds with high-tech 3D spatial elevation
           - Left: Vertical Interactive Tabs (01, 02, 03, 04) with 4s live countdown bar
           - Right: Dynamic 3D Quantum Deck with laser scanline & orbital radar ripples
           ========================================================================= */}
        <div 
          className="space-y-10 lg:space-y-12"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          
          {/* Section Header */}
          <div className="grid lg:grid-cols-12 gap-6 items-end">
            <div className="lg:col-span-7 space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-teal-800 text-xs font-mono font-bold tracking-widest uppercase">
                  <span className="w-5 h-[2px] bg-teal-600 inline-block" />
                  <span>{pick(["FOUR OPERATING AREAS", "أربعة مجالات تشغيلية"])}</span>
                </div>
                {/* 4-Second Auto Indicator Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/90 text-[10px] font-mono text-teal-900 font-bold shadow-2xs">
                  <span className={cn("size-2 rounded-full bg-teal-500", !isPaused && "animate-ping")} />
                  <span>{isPaused ? "PAUSED" : "AUTO: 4S"}</span>
                </div>
              </div>

              <h3 className="font-display text-4xl sm:text-5xl font-extrabold text-slate-950 tracking-tight leading-[1.12]">
                {pick([
                  "A single institution. Four ways to move medicine.",
                  "مؤسسة واحدة. أربعة مسارات لتطوير الدواء والرعاية."
                ])}
              </h3>
            </div>
            
            <div className="lg:col-span-5">
              <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
                {pick([
                  "We turn scientific possibility into governed programs with a visible route to health impact.",
                  "نحول الإمكانات العلمية والحوسبية إلى برامج مؤسسية حية ذات أثر صحي وسريري ملموس ومستدام."
                ])}
              </p>
            </div>
          </div>

          {/* PARALLEL STAGE (Grid: 5 cols Left / 7 cols Right) */}
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            
            {/* =========================================================================
               LEFT COLUMN: 4 Operating Area Vertical Tabs
               ========================================================================= */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-1">
              {areas.map((area, idx) => {
                const isActive = activeTab === idx;
                return (
                  <button
                    key={area.id}
                    onClick={() => handleSelectTab(idx)}
                    onMouseEnter={() => handleSelectTab(idx)}
                    className={cn(
                      "w-full text-left rtl:text-right p-5 sm:p-6 transition-all duration-300 border-t border-slate-200/90 flex flex-col justify-center cursor-pointer group rounded-sm relative overflow-hidden",
                      isActive 
                        ? "border-l-[3px] rtl:border-l-0 rtl:border-r-[3px] border-teal-600 bg-white shadow-sm" 
                        : "hover:bg-slate-100/50"
                    )}
                  >
                    <div className="text-[11px] font-mono font-bold text-slate-400 mb-1.5 group-hover:text-teal-700 transition-colors">
                      {area.num}
                    </div>
                    <div className={cn(
                      "text-base sm:text-lg tracking-tight transition-colors",
                      isActive 
                        ? "font-extrabold text-slate-950" 
                        : "font-semibold text-slate-700 group-hover:text-slate-900"
                    )}>
                      {language === "ar" ? area.titleAr : area.titleEn}
                    </div>

                    {/* Active 4-second Progress Bar Fill */}
                    {isActive && !isPaused && (
                      <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-teal-100/60 overflow-hidden">
                        <div 
                          key={`prog-${idx}-${flipKey}`} 
                          className="h-full bg-gradient-to-r from-teal-500 via-cyan-400 to-emerald-400 animate-progress-4s" 
                        />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* =========================================================================
               RIGHT COLUMN: Dynamic High-Tech 3D Quantum Deck
               - 3D spatial incline elevation & spring snap on 4s interval
               - Laser scanline flash sweep across the card surface
               - Concentric orbital sonar radar arcs in bottom right corner
               ========================================================================= */}
            <div className="lg:col-span-7 perspective-[1400px]">
              <div 
                key={`deck-${current.id}-${flipKey}`}
                className="relative rounded-[2rem] sm:rounded-[2.5rem] bg-gradient-to-br from-[#0c272d] via-[#071d22] to-[#031114] text-white p-8 sm:p-12 lg:p-14 overflow-hidden shadow-2xl border border-teal-800/60 min-h-[460px] sm:min-h-[500px] flex flex-col justify-between animate-quantum-deck group transition-all"
              >
                
                {/* Holographic Laser Scanline Flash on Switch */}
                <div 
                  key={`laser-${current.id}-${flipKey}`} 
                  className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_20px_#32E0E3,0_0_40px_#10B981] animate-deck-laser pointer-events-none z-20" 
                />

                {/* Decorative Subtle Glowing Background Light */}
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-teal-500/20 rounded-full blur-[110px] pointer-events-none" />
                <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

                {/* Concentric Orbital Radar Rings with dynamic Sonar Burst */}
                <div className="absolute -bottom-24 -right-24 sm:-bottom-20 sm:-right-20 pointer-events-none select-none z-0">
                  <div className="relative size-80 sm:size-96">
                    {/* Ring 1 */}
                    <div className="absolute inset-0 rounded-full border border-teal-400/20" />
                    {/* Ring 2 with pulse */}
                    <div className="absolute inset-8 rounded-full border border-teal-400/30 animate-pulse" />
                    {/* Ring 3 */}
                    <div className="absolute inset-16 rounded-full border border-cyan-400/25" />
                    {/* Ring 4 */}
                    <div className="absolute inset-24 rounded-full border border-teal-500/30" />
                    {/* Ring 5 with dynamic sonar burst */}
                    <div className="absolute inset-28 rounded-full border border-cyan-400/40 animate-sonar-burst" />
                    {/* Center Core Beacon */}
                    <div className="absolute inset-32 rounded-full border border-teal-400/40 bg-teal-950/60 backdrop-blur-xs flex items-center justify-center">
                      <div className="size-3 rounded-full bg-cyan-400 shadow-[0_0_18px_#32E0E3] animate-ping" />
                    </div>
                  </div>
                </div>

                {/* Stage Interior: Dynamic High-Tech Content */}
                <div className="relative z-10 space-y-6">
                  {/* Eyebrow */}
                  <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold tracking-widest uppercase">
                    <span className="w-4 h-[2px] bg-cyan-400 inline-block" />
                    <span>{pick(["OPERATING AREA", "المجال التشغيلي"])}</span>
                    <span className="text-teal-400/80 font-mono text-[10px] bg-teal-950/80 px-2 py-0.5 rounded border border-teal-700/50">
                      [{current.num} / 04]
                    </span>
                  </div>

                  {/* Display Title with Reveal Glide */}
                  <h4 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.08] animate-title-reveal">
                    {language === "ar" ? current.titleAr : current.titleEn}
                  </h4>

                  {/* Description */}
                  <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-xl">
                    {language === "ar" ? current.leadAr : current.leadEn}
                  </p>
                </div>

                {/* Bottom Tags / Highlights & Action Link */}
                <div className="relative z-10 pt-8 mt-6 border-t border-teal-800/40 flex flex-wrap items-center justify-between gap-4">
                  {/* Highlight Pills */}
                  <div className="flex flex-wrap items-center gap-2">
                    {(language === "ar" ? current.tagsAr : current.tagsEn).map((tag, i) => (
                      <span 
                        key={i}
                        className="px-3.5 py-1.5 rounded-full bg-teal-950/80 border border-teal-700/60 text-xs font-medium text-cyan-200/90 shadow-sm backdrop-blur-md transition-all hover:border-cyan-400 hover:scale-105"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Quick Action Button */}
                  <Link 
                    to={current.link}
                    className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-white transition-colors group cursor-pointer"
                  >
                    <span>{pick(["Explore Area", "استعراض المسار"])}</span>
                    <ArrowRight className="size-3.5 rtl:rotate-180 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
