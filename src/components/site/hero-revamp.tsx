import { useState, useRef, type MouseEvent } from "react";
import { Link } from "@tanstack/react-router";
import { 
  ArrowRight, Dna, ShieldCheck, Activity 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "./language";

/* =========================================================================
   WAIWIM REVAMPED 3D CINEMATIC HERO SECTION (Light Mode Biotech Aesthetic)
   Matching the client's reference design 1-to-1:
   - Centered Status Pill
   - Massive High-Tech Display Headline
   - Inspiring Subtitle & CTAs
   - Giant 3D Iridescent Bio-Sphere Horizon (Rising from bottom, cut off at equator)
   - Dynamic 3D Motions: Continuous fluid swirl, interactive mouse parallax,
     holographic orbital arc, and specular light sweep.
   ========================================================================= */

export function WaiwimHeroSection() {
  const { language, pick } = useLanguage();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  // 3D Mouse Parallax Gyroscope
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      x: x * 10, // degrees
      y: -y * 8
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section 
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden bg-gradient-to-b from-white via-[#F8FAFC] to-[#F1F5F9] pt-6 sm:pt-8 md:pt-10 pb-0 select-none border-b border-slate-200"
    >
      {/* Dynamic Ambient Background Illumination */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-b from-[#32E0E3]/15 via-emerald-400/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      
      {/* Subtle Scientific Dot Lattice Pattern */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#00333B 1px, transparent 1px)",
          backgroundSize: "36px 36px"
        }}
      />

      <div className="site-container relative z-20 flex flex-col items-center text-center">
        
        {/* 1. TOP STATUS PILL BADGE (Inspired by "Dark Theme" badge in reference image) */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 border border-emerald-300/80 shadow-xs backdrop-blur-md transition-transform duration-300 hover:scale-102">
          <span className="relative flex size-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex rounded-full size-2 bg-emerald-600" />
          </span>
          <span className="font-mono text-xs font-bold text-[#00333B] tracking-tight">
            {pick([
              "SAUDI SOVEREIGN AI HEALTHCARE • NCNP #5421 • VISION 2030",
              "الابتكار الصحي بالذكاء الاصطناعي • ترخيص وطني رقم 5421 • رؤية 2030"
            ])}
          </span>
          <ShieldCheck className="size-3.5 text-emerald-600 ms-0.5" />
        </div>

        {/* 2. MASSIVE FUTURISTIC DISPLAY HEADLINE */}
        <div className="mt-4 sm:mt-6 max-w-5xl">
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[5.2rem] font-extrabold tracking-tight leading-[1.04] text-[#00333B]">
            {language === "ar" ? (
              <>
                بالذكاء الاصطناعي{" "}
                <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#00333B] via-[#00606e] to-[#28CDD1] drop-shadow-xs">
                  نبتكر الدواء
                </span>
              </>
            ) : (
              <>
                WITH AI WE{" "}
                <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#00333B] via-[#00606e] to-[#28CDD1] drop-shadow-xs">
                  INNOVATE MEDICINE
                </span>
              </>
            )}
          </h1>
        </div>

        {/* 3. SUBTITLE / TAGLINE (Clean, engaging & informative) */}
        <p className="mt-3 sm:mt-4 max-w-2xl text-base sm:text-xl font-normal text-slate-600 leading-relaxed">
          {pick([
            "From Possibility to Better Medicine. Accelerating sovereign drug discoveries, automated AlphaFold-3 structural docking, and life-saving clinical relief across Saudi Arabia.",
            "من الإمكانات إلى دواء أفضل وأثر أرقى. منصة وطنية رائدة للابتكار الدوائي، الحوسبة الجينومية الفائقة، وتوزيع الأجهزة الطبية الحيوية مجاناً."
          ])}
        </p>

        {/* 4. PRIMARY ACTIONS BAR */}
        <div className="mt-5 sm:mt-6 flex flex-wrap items-center justify-center gap-3.5">
          <Button 
            size="lg" 
            className="bg-[#00333B] hover:bg-[#00262c] text-[#32E0E3] font-bold rounded-full px-7 shadow-lg shadow-[#00333B]/20 text-sm h-12 border border-[#32E0E3]/40 transition-all hover:scale-102"
            asChild
          >
            <Link to="/programs">
              <span>{pick(["Explore AI Programs", "استكشف البرامج والمبادرات"])}</span>
              <ArrowRight className="rtl:rotate-180 size-4 ms-2 text-[#32E0E3]" />
            </Link>
          </Button>

          <Button 
            size="lg" 
            variant="outline" 
            className="rounded-full font-bold text-[#00333B] border-slate-300 hover:border-[#32E0E3] hover:bg-[#32E0E3]/10 text-sm h-12 bg-white/90 shadow-xs transition-all hover:scale-102"
            asChild
          >
            <Link to="/research">
              <Dna className="size-4 me-2 text-emerald-600" />
              <span>{pick(["AI Drug Accelerator", "مسرعة الابتكار الدوائي"])}</span>
            </Link>
          </Button>

          <Button 
            size="lg" 
            variant="ghost" 
            className="rounded-full font-bold text-slate-700 hover:text-[#00333B] hover:bg-white/80 text-sm h-12"
            asChild
          >
            <Link to="/impact">
              <Activity className="size-4 me-2 text-emerald-600" />
              <span>{pick(["Live Telemetry", "لوحة الأثر السريري"])}</span>
            </Link>
          </Button>
        </div>

      </div>

      {/* 5. THE REFINED 3D SPHERE HORIZON DOME (Slightly more compact & balanced) */}
      <div className="relative z-10 w-full h-[260px] sm:h-[340px] md:h-[400px] lg:h-[460px] xl:h-[500px] -mt-6 sm:-mt-10 md:-mt-14 lg:-mt-16 overflow-hidden flex justify-center items-start pointer-events-none">
        
        {/* Spatial 3D Container with Mouse Parallax Gyroscope */}
        <div 
          className="relative flex justify-center items-start transition-transform duration-300 ease-out"
          style={{
            transform: `perspective(1200px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`
          }}
        >
          {/* Ambient Multi-Layer Aura Glow behind Sphere Crest */}
          <div className="absolute top-4 size-[380px] sm:size-[500px] lg:size-[620px] rounded-full bg-gradient-to-tr from-[#32E0E3]/40 via-emerald-400/30 to-transparent blur-3xl animate-aura-pulse pointer-events-none" />
          <div className="absolute top-10 size-[280px] sm:size-[380px] rounded-full bg-cyan-400/25 blur-2xl pointer-events-none" />

          {/* 3D Holographic Orbit Arc 1 (Rotates along the Dome Crest) */}
          <div className="absolute -top-3 size-[500px] sm:size-[640px] md:size-[760px] lg:size-[880px] xl:size-[960px] rounded-full border border-cyan-400/35 pointer-events-none animate-orbit-spin">
            {/* Orbiting Beacon Node 1 */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
              <span className="size-4 rounded-full bg-cyan-400/50 animate-ping absolute" />
              <span className="size-2.5 rounded-full bg-[#32E0E3] shadow-[0_0_12px_#32E0E3]" />
            </div>
          </div>

          {/* 3D Holographic Orbit Arc 2 (Counter-Rotating in 3D Perspective) */}
          <div className="absolute top-5 size-[450px] sm:size-[580px] md:size-[700px] lg:size-[800px] xl:size-[880px] rounded-full border border-emerald-400/25 pointer-events-none animate-orbit-spin-rev">
            {/* Orbiting Beacon Node 2 */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 flex items-center justify-center">
              <span className="size-4 rounded-full bg-emerald-400/40 animate-ping absolute" />
              <span className="size-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10B981]" />
            </div>
          </div>

          {/* THE 3D IRIDESCENT SPHERE (Slightly more compact size, cut off cleanly at equator) */}
          <div className="relative size-[480px] sm:size-[620px] md:size-[740px] lg:size-[860px] xl:size-[940px] rounded-full overflow-hidden sphere-dome-mask drop-shadow-[0_20px_45px_rgba(0,51,59,0.2)]">
            
            {/* Continuous Smooth 3D Swirl Rotation */}
            <div className="w-full h-full rounded-full animate-spin-fluid">
              <img 
                src="/images/waiwim_sphere_light.jpg" 
                alt="WAIWIM 3D Biotech Iridescent Sphere"
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            {/* Specular Liquid Light Shimmer Sweep across the glossy fluid ribbons */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-full">
              <div className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-specular-sweep" />
            </div>

            {/* Inner Curvature Lighting Vignette to enhance 3D spherical depth */}
            <div className="absolute inset-0 rounded-full bg-radial from-transparent via-transparent to-slate-900/10 pointer-events-none" />
          </div>

        </div>
      </div>
    </section>
  );
}
