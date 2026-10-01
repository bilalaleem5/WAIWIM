import { useEffect, useRef, useState } from "react";
import { useLanguage } from "./language";
import { cn } from "@/lib/utils";
import { Sparkles, ArrowRight, Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

/* =========================================================================
   1. OFFICIAL WAIWIM VECTOR SYMBOL (Based on 2026 Brand Guidelines)
   Folded ribbon "W" mark with Deep Teal & Aqua identity
   ========================================================================= */
export function WaiwimSymbol({ 
  className = "size-8", 
  variant = "light", // 'light' means for light background (Deep Teal), 'dark' means for dark background (White)
  animate = false 
}: { 
  className?: string; 
  variant?: "light" | "dark" | "monochrome";
  animate?: boolean;
}) {
  const primaryColor = variant === "dark" ? "#FBFBFB" : variant === "monochrome" ? "currentColor" : "#00333B";
  const aquaGradientId = variant === "dark" ? "waiwimAquaDark" : "waiwimAquaLight";

  return (
    <svg 
      viewBox="0 0 220 145" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={cn("inline-block shrink-0 transition-transform duration-300", animate && "hover:scale-105", className)}
      aria-label="WAIWIM Symbol"
    >
      <defs>
        <linearGradient id={aquaGradientId} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1FAAB0" />
          <stop offset="45%" stopColor="#28CDD1" />
          <stop offset="100%" stopColor="#32E0E3" />
        </linearGradient>
        <linearGradient id={`${aquaGradientId}Shadow`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#148388" />
          <stop offset="100%" stopColor="#0E6569" />
        </linearGradient>
      </defs>

      {/* Stem 1: Left Downward Diagonal */}
      <polygon 
        points="16,10 50,10 74,68 44,88" 
        fill={primaryColor} 
      />

      {/* Stem 2: Aqua Folded Ribbon (Back Fold Shadow) */}
      <polygon 
        points="44,88 74,68 86,96 60,116" 
        fill={`url(#${aquaGradientId}Shadow)`} 
      />

      {/* Stem 2: Aqua Folded Ribbon (Bottom Horizon Fold) */}
      <polygon 
        points="60,116 86,96 104,96 78,116" 
        fill="#1CA2A7" 
      />

      {/* Stem 2: Aqua Folded Ribbon (Front Rising Face) */}
      <polygon 
        points="60,116 80,116 118,50 98,50" 
        fill={`url(#${aquaGradientId})`} 
      />

      {/* Stems 3 & 4: Right Sharp V Shape */}
      <polygon 
        points="98,10 134,10 156,86 178,10 214,10 167,125 145,125" 
        fill={primaryColor} 
      />
    </svg>
  );
}

/* =========================================================================
   2. OFFICIAL WAIWIM LOGO LOCKUP (Horizontal & Stacked)
   ========================================================================= */
export function WaiwimLogo({
  variant = "light",
  layout = "horizontal", // 'horizontal' | 'stacked' | 'symbol-only'
  showTagline = true,
  className
}: {
  variant?: "light" | "dark";
  layout?: "horizontal" | "stacked" | "symbol-only";
  showTagline?: boolean;
  className?: string;
}) {
  const { language, pick } = useLanguage();
  const isDark = variant === "dark";

  if (layout === "symbol-only") {
    return <WaiwimSymbol variant={variant} className={className || "size-8"} />;
  }

  if (layout === "stacked") {
    return (
      <div className={cn("flex flex-col items-center text-center", className)}>
        <WaiwimSymbol variant={variant} className="w-20 h-auto mb-3" />
        <span 
          className={cn(
            "font-display font-extrabold tracking-[0.24em] text-2xl uppercase",
            isDark ? "text-white" : "text-[#00333B]"
          )}
        >
          WAIWIM
        </span>
        {showTagline && (
          <div className="mt-1 space-y-0.5">
            <span className={cn("block text-xs font-semibold tracking-wide", isDark ? "text-slate-300" : "text-[#4E6D73]")}>
              With AI We Innovate Medicine
            </span>
            <span className={cn("block text-xs font-bold font-arabic", isDark ? "text-emerald-300" : "text-[#00333B]")}>
              بالذكاء الاصطناعي نبتكر الدواء
            </span>
          </div>
        )}
      </div>
    );
  }

  // Default: Horizontal Lockup
  return (
    <div className={cn("inline-flex items-center gap-3.5 shrink-0", className)}>
      <WaiwimSymbol variant={variant} className="w-10 sm:w-11 h-auto shrink-0" />
      <div className="leading-tight shrink-0">
        <span 
          className={cn(
            "block font-display font-extrabold tracking-[0.18em] text-base sm:text-lg md:text-[19px] uppercase transition-colors",
            isDark ? "text-white group-hover:text-[#32E0E3]" : "text-[#00333B] group-hover:text-emerald-700"
          )}
        >
          WAIWIM
        </span>
        {showTagline && (
          <span 
            className={cn(
              "block text-[10px] sm:text-[11px] md:text-xs font-semibold tracking-tight whitespace-nowrap",
              isDark ? "text-emerald-300/90" : "text-[#4E6D73]"
            )}
          >
            {language === "ar" ? "بالذكاء الاصطناعي نبتكر الدواء" : "With AI We Innovate Medicine"}
          </span>
        )}
      </div>
    </div>
  );
}

/* =========================================================================
   3. MOTION SYSTEM (Page 08 of Guidelines: "The Mark Introduces the Name")
   Opening Sequence (1.5 - 2.0 sec)
   01: W Mark -> 02: WAI • -> 03: WAIW • -> 04: WAIWI • -> 05: WAIWIM
   Transitions into site navigation
   ========================================================================= */
export function WaiwimIntroMotion({ 
  onComplete,
}: { 
  onComplete?: () => void;
}) {
  const { pick } = useLanguage();
  const [step, setStep] = useState<number>(1);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const triggerExit = () => {
    setIsFadingOut(true);
    document.body.style.overflow = "";
    setTimeout(() => {
      onCompleteRef.current?.();
    }, 450);
  };

  useEffect(() => {
    // Lock scroll during intro
    document.body.style.overflow = "hidden";

    // Snappy, energetic sequence - ZERO dead initial delay
    const t1 = setTimeout(() => setStep(2), 120);  // WAI •
    const t2 = setTimeout(() => setStep(3), 280);  // WAIW •
    const t3 = setTimeout(() => setStep(4), 440);  // WAIWI •
    const t4 = setTimeout(() => setStep(5), 600);  // WAIWIM complete
    const tFade = setTimeout(() => {
      triggerExit();
    }, 1900);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " " || e.key === "Enter") {
        triggerExit();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(tFade);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const getWordmarkText = () => {
    switch (step) {
      case 1: return "W";
      case 2: return "WAI";
      case 3: return "WAIW";
      case 4: return "WAIWI";
      case 5: return "WAIWIM";
      default: return "WAIWIM";
    }
  };

  return (
    <div 
      onClick={triggerExit}
      className={cn(
        "fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#00333B] text-white transition-all duration-450 ease-out select-none cursor-pointer",
        isFadingOut ? "opacity-0 scale-102 pointer-events-none" : "opacity-100 scale-100"
      )}
      title="Click anywhere or press Esc to enter"
    >
      {/* Background Subtle Dot Grid */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#32E0E3 1.2px, transparent 1.2px)",
          backgroundSize: "28px 28px"
        }}
      />

      {/* Radial Center Glow */}
      <div className="absolute size-[480px] rounded-full bg-[#32E0E3]/20 blur-3xl pointer-events-none animate-pulse-gentle" />

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-lg">
        
        {/* Step 01: Folded Ribbon Symbol with Glowing Aura */}
        <div className="transition-all duration-500 transform opacity-100 scale-100">
          <div className="relative">
            <div className="absolute inset-0 bg-[#32E0E3]/35 rounded-full blur-2xl animate-pulse" />
            <WaiwimSymbol variant="dark" className="w-24 sm:w-32 h-auto drop-shadow-[0_0_35px_rgba(50,224,227,0.5)]" />
          </div>
        </div>

        {/* Steps 01-05: Snappy Typewriter Wordmark + Cyan Cursor Dot */}
        <div className="h-16 flex items-center justify-center mt-6">
          <span className="font-display font-black text-3xl sm:text-5xl tracking-[0.25em] text-[#FBFBFB] uppercase">
            {getWordmarkText()}
          </span>
          {step < 5 && (
            <span className="size-2.5 sm:size-3 rounded-full bg-[#32E0E3] ms-2 shadow-[0_0_14px_#32E0E3] animate-ping" />
          )}
        </div>

        {/* Tagline reveal on final step */}
        <div className={cn(
          "transition-all duration-400 text-sm sm:text-base text-[#B5C7C9] font-medium tracking-wide mt-2",
          step === 5 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        )}>
          {pick(["With AI We Innovate Medicine", "بالذكاء الاصطناعي نبتكر الدواء"])}
        </div>

        {/* NCNP License Badge */}
        <div className={cn(
          "transition-all duration-400 mt-5 inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[11px] font-mono font-semibold text-[#32E0E3] border border-[#32E0E3]/30 backdrop-blur-xs",
          step === 5 ? "opacity-100" : "opacity-0"
        )}>
          <span className="size-1.5 rounded-full bg-[#32E0E3] animate-ping" />
          <span>SAUDI NONPROFIT • NCNP #5421</span>
        </div>
      </div>

      {/* Skip button in corner */}
      <div className="absolute bottom-6 right-6 flex items-center gap-2">
        <span className="text-[10px] font-mono text-[#B5C7C9]/60">Click anywhere to skip</span>
        <button
          onClick={(e) => { e.stopPropagation(); triggerExit(); }}
          className="text-xs font-mono text-slate-300 hover:text-white px-3 py-1 rounded-lg border border-white/15 hover:border-white/40 transition-all cursor-pointer backdrop-blur-xs bg-white/10 shadow-xs"
        >
          Skip [Esc]
        </button>
      </div>
    </div>
  );
}

/* =========================================================================
   4. DOT FIELD WAVE (Page 08 & 10 of Guidelines: "Data. Possibilities. Movement.")
   Interactive undulating 3D dot grid that reacts subtly to mouse position
   ========================================================================= */
export function WaiwimDotField({ 
  className = "w-full h-[360px] sm:h-[420px]"
}: { 
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 400);

    const onResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", onResize);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
    };
    canvas.addEventListener("mousemove", onMouseMove);

    // Dot grid configuration
    const cols = 28;
    const rows = 14;
    let time = 0;

    const render = () => {
      time += 0.025;
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      const spacingX = width / (cols + 1);
      const spacingY = height / (rows + 1);

      // Draw undulating dots
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const baseX = (c + 1) * spacingX;
          const baseY = (r + 1) * spacingY;

          // Mathematical wave derived from W shape + sine waves
          const distToMouse = Math.hypot(baseX - mouseX, baseY - mouseY);
          const mouseEffect = Math.max(0, 1 - distToMouse / 180) * 18;

          const wave1 = Math.sin(c * 0.35 + time) * 14;
          const wave2 = Math.cos(r * 0.45 + time * 0.8) * 10;
          const wave3 = Math.sin((c + r) * 0.2 + time * 1.2) * 8;

          const yOffset = wave1 + wave2 + wave3 - mouseEffect;
          const xOffset = Math.cos(r * 0.3 + time * 0.5) * 6;

          const finalX = baseX + xOffset;
          const finalY = baseY + yOffset;

          // Proximity to wave peaks for color intensity (Aqua #32E0E3 or Slate #B5C7C9)
          const normY = (yOffset + 25) / 50;
          const isAquaPeak = normY > 0.65 || mouseEffect > 4;

          const radius = isAquaPeak ? 2.5 : 1.8;
          const alpha = isAquaPeak ? 0.85 : 0.35 + normY * 0.3;

          ctx.beginPath();
          ctx.arc(finalX, finalY, radius, 0, Math.PI * 2);

          if (isAquaPeak) {
            ctx.fillStyle = `rgba(50, 224, 227, ${alpha})`;
            // Subtle glow on aqua dots
            ctx.shadowColor = "#32E0E3";
            ctx.shadowBlur = 4;
          } else {
            ctx.fillStyle = `rgba(181, 199, 201, ${alpha})`;
            ctx.shadowBlur = 0;
          }
          ctx.fill();

          // W-Derived Paths: Connect sparse horizontal neighbors to create molecular lattice lines
          if (c < cols - 1 && (r % 3 === 0 || isAquaPeak)) {
            const nextBaseX = (c + 2) * spacingX;
            const nextWave = Math.sin((c + 1) * 0.35 + time) * 14 + Math.cos(r * 0.45 + time * 0.8) * 10;
            const nextY = baseY + nextWave;

            ctx.beginPath();
            ctx.moveTo(finalX, finalY);
            ctx.lineTo(nextBaseX, nextY);
            ctx.strokeStyle = isAquaPeak ? "rgba(50, 224, 227, 0.25)" : "rgba(181, 199, 201, 0.08)";
            ctx.lineWidth = isAquaPeak ? 1.2 : 0.6;
            ctx.shadowBlur = 0;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className={cn("relative overflow-hidden rounded-3xl bg-[#00333B] border border-[#32E0E3]/20 shadow-2xl", className)}>
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#32E0E3]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      
      <canvas ref={canvasRef} className="w-full h-full block cursor-crosshair" />

      {/* Subtle overlay HUD labels matching page 08/10 */}
      <div className="absolute top-4 start-4 flex items-center gap-2 pointer-events-none">
        <span className="size-2 rounded-full bg-[#32E0E3] animate-ping" />
        <span className="font-mono text-[10px] font-bold text-[#32E0E3] uppercase tracking-widest">
          DOT FIELD • LIVING SYSTEM
        </span>
      </div>

      <div className="absolute bottom-3 end-4 text-[10px] font-mono text-[#B5C7C9] pointer-events-none">
        Data. Possibilities. Movement.
      </div>
    </div>
  );
}
