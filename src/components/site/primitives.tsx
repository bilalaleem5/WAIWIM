import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { 
  Download, CheckCircle2, Moon, Sun, ArrowRight, ShieldCheck, 
  Sparkles, ExternalLink, Dna, FlaskConical, Layers, Activity,
  Users, Building2, Landmark, HeartPulse, Send, Search, Check, AlertCircle,
  MapPin, Sliders, Cpu, FileCheck2, Award, ArrowUpRight,
  User, Pill, Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ui, aiPipelineSteps, portalSimulations, governanceInfo } from "@/lib/site-content";
import { Link } from "@tanstack/react-router";
import { useLanguage } from "./language";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    // Strictly default to crisp light theme unless user specifically set it to dark in localStorage
    const savedTheme = window.localStorage.getItem("aidis-theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDark(false);
    }
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    if (next) {
      document.documentElement.classList.add("dark");
      window.localStorage.setItem("aidis-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      window.localStorage.setItem("aidis-theme", "light");
    }
  };

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggle} 
      className="size-9 rounded-full text-foreground/80 hover:text-brand hover:bg-muted transition-colors"
      aria-label="Toggle dark/light theme"
      title={dark ? "Switch to light theme" : "Switch to dark theme"}
    >
      {dark ? <Sun className="size-4 text-amber-400 animate-in spin-in-90 duration-300" /> : <Moon className="size-4 text-foreground/70" />}
    </Button>
  );
}

/* 3D Tilt Card Component with Dynamic Cursor Lighting */
export function TiltCard({ 
  children, 
  className,
  intensity = 15
}: { 
  children: ReactNode; 
  className?: string;
  intensity?: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0, active: false });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setCoords({ x, y, active: true });
  };

  const handleMouseLeave = () => {
    setCoords({ x: 0, y: 0, active: false });
  };

  const rotateY = coords.active ? coords.x * intensity : 0;
  const rotateX = coords.active ? -coords.y * intensity : 0;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("card-3d relative transition-transform duration-200 ease-out", className)}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${coords.active ? "scale3d(1.015, 1.015, 1.015)" : "scale3d(1, 1, 1)"}`,
      }}
    >
      {coords.active && (
        <div 
          className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-60 transition-opacity duration-300 z-10"
          style={{
            background: `radial-gradient(400px circle at ${(coords.x + 1) * 50}% ${(coords.y + 1) * 50}%, rgba(16, 185, 129, 0.12), transparent 80%)`,
          }}
        />
      )}
      <div className="card-3d-content relative z-10 h-full">{children}</div>
    </div>
  );
}

/* High-Performance 3D Molecular / DNA Helix Visualizer Canvas */
export function Interactive3DMolecule({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { pick } = useLanguage();
  const [hud, setHud] = useState({
    pocket: "CDK2-Kinase",
    rmsd: "0.82 Å",
    affinity: "-9.8 kcal/mol",
    model: "BioGNN-v3"
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const onResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", onResize);

    // Generate 3D atom nodes (Protein docking pocket & ligand molecule)
    interface Node3D {
      x: number;
      y: number;
      z: number;
      baseX: number;
      baseY: number;
      baseZ: number;
      radius: number;
      color: string;
      glow: string;
      isLigand?: boolean;
    }

    const nodes: Node3D[] = [];
    const numAtoms = 45;

    // Protein backbone helical helix
    for (let i = 0; i < numAtoms; i++) {
      const theta = (i / numAtoms) * Math.PI * 4;
      const radius = 90 + Math.sin(i * 0.5) * 20;
      const x = Math.cos(theta) * radius;
      const y = (i - numAtoms / 2) * 6;
      const z = Math.sin(theta) * radius;
      const isBindingActive = i > 18 && i < 28;

      nodes.push({
        x, y, z, baseX: x, baseY: y, baseZ: z,
        radius: isBindingActive ? 5.5 : 3.8,
        color: isBindingActive ? "#059669" : (i % 2 === 0 ? "#0891b2" : "#10b981"),
        glow: isBindingActive ? "rgba(5, 150, 105, 0.45)" : "rgba(8, 145, 178, 0.3)",
        isLigand: isBindingActive
      });
    }

    // Ligand small molecule cluster in the center
    const ligandCount = 12;
    for (let j = 0; j < ligandCount; j++) {
      const phi = Math.acos(-1 + (2 * j) / ligandCount);
      const theta = Math.sqrt(ligandCount * Math.PI) * phi;
      const r = 35;
      const x = r * Math.cos(theta) * Math.sin(phi);
      const y = r * Math.sin(theta) * Math.sin(phi);
      const z = r * Math.cos(phi);

      nodes.push({
        x, y, z, baseX: x, baseY: y, baseZ: z,
        radius: 4.8,
        color: j % 3 === 0 ? "#d97706" : "#059669",
        glow: "rgba(217, 119, 6, 0.4)",
        isLigand: true
      });
    }

    let rotX = 0.2;
    let rotY = 0.005;
    let targetRotX = 0.2;
    let targetRotY = 0.005;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / height) * 2 - 1;
      targetRotY = nx * 0.8;
      targetRotX = -ny * 0.8;
    };

    canvas.addEventListener("mousemove", handleMouseMove);

    const render = () => {
      // Smooth interpolation towards mouse rotation
      rotY += (targetRotY - rotY) * 0.05 + 0.008; // auto continuous rotation
      rotX += (targetRotX - rotX) * 0.05;

      ctx.clearRect(0, 0, width, height);

      const fov = 350;
      const cx = width / 2;
      const cy = height / 2;

      // Rotate nodes in 3D
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      const projected = nodes.map(node => {
        // Rotate around Y
        let x1 = node.baseX * cosY - node.baseZ * sinY;
        let z1 = node.baseZ * cosY + node.baseX * sinY;

        // Rotate around X
        let y1 = node.baseY * cosX - z1 * sinX;
        let z2 = z1 * cosX + node.baseY * sinX;

        // Perspective projection
        const scale = fov / (fov + z2 + 200);
        const px = cx + x1 * scale;
        const py = cy + y1 * scale;

        return {
          ...node,
          px,
          py,
          zDepth: z2,
          scale,
        };
      });

      // Sort by depth (painters algorithm)
      projected.sort((a, b) => b.zDepth - a.zDepth);

      // Draw connecting bonds
      ctx.lineWidth = 1.2;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const p1 = projected[i];
          const p2 = projected[j];
          const dist3D = Math.hypot(p1.baseX - p2.baseX, p1.baseY - p2.baseY, p1.baseZ - p2.baseZ);

          if (dist3D < 55) {
            const alpha = Math.max(0.08, 0.45 - dist3D / 120);
            ctx.strokeStyle = p1.isLigand && p2.isLigand 
              ? `rgba(217, 119, 6, ${alpha * 1.5})` 
              : `rgba(5, 150, 105, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);
            ctx.stroke();
          }
        }
      }

      // Draw atoms with specular 3D depth
      for (const p of projected) {
        const atomRadius = Math.max(2, p.radius * p.scale);
        
        // Glow halo
        ctx.beginPath();
        ctx.arc(p.px, p.py, atomRadius * 2, 0, Math.PI * 2);
        ctx.fillStyle = p.glow;
        ctx.fill();

        // 3D atom sphere
        const grad = ctx.createRadialGradient(
          p.px - atomRadius * 0.3,
          p.py - atomRadius * 0.3,
          atomRadius * 0.1,
          p.px,
          p.py,
          atomRadius
        );
        grad.addColorStop(0, "#ffffff");
        grad.addColorStop(0.3, p.color);
        grad.addColorStop(1, "#0f172a");

        ctx.beginPath();
        ctx.arc(p.px, p.py, atomRadius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className={cn("relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-slate-50 to-emerald-50/40 border border-border shadow-lg", className)}>
      <canvas ref={canvasRef} className="w-full h-full block cursor-grab active:cursor-grabbing" />
      
      {/* 3D HUD Telemetry overlay */}
      <div className="absolute top-4 left-4 flex flex-col gap-1.5 pointer-events-none">
        <span className="hologram-pill">
          <span className="size-2 rounded-full bg-emerald-500 animate-ping" />
          <span>{pick(["Live 3D Docking Simulation", "محاكاة ثلاثية الأبعاد للربط الجزيئي"])}</span>
        </span>
        <div className="mt-1 flex items-center gap-2 text-[11px] font-mono font-bold text-slate-600 bg-white/80 backdrop-blur px-2.5 py-1 rounded-md border border-slate-200 shadow-xs">
          <span>TARGET: {hud.pocket}</span>
          <span className="text-emerald-600">RMSD: {hud.rmsd}</span>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 flex items-center gap-2 pointer-events-none">
        <div className="text-[11px] font-mono font-bold text-slate-700 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm flex items-center gap-2">
          <Activity className="size-3.5 text-cyan-600 animate-pulse" />
          <span>ΔG: {hud.affinity}</span>
          <span className="text-slate-300">|</span>
          <span className="text-emerald-700 font-semibold">{hud.model}</span>
        </div>
      </div>
    </div>
  );
}

/* Real-Time Interactive Saudi Regional Healthcare Telemetry Hub */
export function SaudiRegionalRadar() {
  const { language, pick } = useLanguage();
  const [activeRegion, setActiveRegion] = useState<"riyadh" | "western" | "eastern" | "southern">("riyadh");

  const regions = {
    riyadh: {
      name: ["Central Hub (Riyadh)", "المنطقة الوسطى (الرياض)"],
      beneficiaries: "8,420",
      devicesRedistributed: "480",
      hospitals: "14",
      acceleratorCohorts: "4 Teams",
      highlights: ["HQ & Main AI Accelerator", "King Saud Univ. Health AI Lab", "Central Equipment Logistics Hub"],
      coords: { x: "50%", y: "45%" },
      radarX: 52,
      radarY: 46
    },
    western: {
      name: ["Western Hub (Makkah & Jeddah)", "المنطقة الغربية (مكة وجدة)"],
      beneficiaries: "4,110",
      devicesRedistributed: "260",
      hospitals: "8",
      acceleratorCohorts: "2 Teams",
      highlights: ["Hakeem Medical Bank Station", "King Abdulaziz Univ. Hospital", "Hajj & Umrah Pilgrims Support"],
      coords: { x: "28%", y: "52%" },
      radarX: 30,
      radarY: 56
    },
    eastern: {
      name: ["Eastern Hub (Dammam & Dhahran)", "المنطقة الشرقية (الدمام والظهران)"],
      beneficiaries: "3,250",
      devicesRedistributed: "180",
      hospitals: "6",
      acceleratorCohorts: "1 Team",
      highlights: ["KFUPM Bio-Informatics Cluster", "King Fahd Hospital Alliance", "Industrial Health Tech Program"],
      coords: { x: "72%", y: "40%" },
      radarX: 74,
      radarY: 38
    },
    southern: {
      name: ["Southern & Northern Sectors", "القطاع الجنوبي والشمالي"],
      beneficiaries: "2,620",
      devicesRedistributed: "120",
      hospitals: "5",
      acceleratorCohorts: "1 Team",
      highlights: ["Mobile Medical Device Clinics", "Telemedicine AI Screening", "Remote Health Center Partnerships"],
      coords: { x: "42%", y: "75%" },
      radarX: 44,
      radarY: 76
    }
  };

  const current = regions[activeRegion];

  return (
    <div className="rounded-3xl border border-slate-200 bg-white text-slate-900 shadow-xl p-6 md:p-10 relative overflow-hidden">
      {/* Soft ambient background glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-100/40 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-6 mb-8 relative z-10">
        <div>
          <span className="eyebrow bg-emerald-50 text-emerald-800 border-emerald-300">
            <span className="size-2 rounded-full bg-emerald-600 animate-ping me-1.5" />
            {pick(["Sovereign Geospatial Telemetry", "الرادار الجيومكاني الموحد"])}
          </span>
          <h3 className="font-display text-2xl md:text-3xl font-extrabold text-slate-950 mt-2">
            {pick(["National Health Impact Radar", "رادار الأثر الصحي الوطني في المملكة"])}
          </h3>
          <p className="text-sm text-slate-600 mt-1 max-w-xl">
            {pick([
              "Live tactical radar displaying regional biomedical distribution, hospital nodes, and AI accelerator cohorts across Saudi Arabia.",
              "منظومة رادار حية تعرض حركة الإمداد الطبي الميداني ومستشفيات الشراكة ومسرعات الذكاء الاصطناعي."
            ])}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="hologram-pill bg-emerald-50 text-emerald-800 border-emerald-300 shadow-sm font-mono text-xs font-bold">
            <span className="size-2 rounded-full bg-emerald-600 animate-pulse" />
            {pick(["18,400+ Total Beneficiaries", "18,400+ مستفيد مباشر"])}
          </span>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1.1fr_1.1fr] gap-8 items-center relative z-10">
        {/* Tactical Circular Radar Scope — Light Theme */}
        <div className="flex flex-col items-center justify-center p-4">
          <div className="relative size-72 sm:size-80 rounded-full border-2 border-emerald-400 bg-gradient-to-br from-emerald-50/60 via-slate-50 to-teal-50/60 shadow-lg overflow-hidden flex items-center justify-center">
            {/* Concentric Range Rings */}
            <div className="absolute size-56 rounded-full border border-emerald-400/30 pointer-events-none" />
            <div className="absolute size-40 rounded-full border border-emerald-400/40 pointer-events-none" />
            <div className="absolute size-24 rounded-full border border-emerald-400/50 pointer-events-none" />
            <div className="absolute size-10 rounded-full border border-emerald-500/60 pointer-events-none" />
            
            {/* Crosshairs */}
            <div className="absolute inset-y-0 left-1/2 w-px bg-emerald-400/30 pointer-events-none" />
            <div className="absolute inset-x-0 top-1/2 h-px bg-emerald-400/30 pointer-events-none" />

            {/* Continuous 360-Degree Sweeping Beam */}
            <div className="absolute inset-0 rounded-full animate-radar-sweep pointer-events-none" style={{
              background: "conic-gradient(from 0deg at 50% 50%, rgba(16, 185, 129, 0.35) 0deg, rgba(16, 185, 129, 0.08) 45deg, transparent 90deg)"
            }} />

            {/* Radar Coordinates Markers */}
            <span className="absolute top-2 left-1/2 -translate-x-1/2 text-[9px] font-mono text-emerald-800 font-bold">N 24°42'</span>
            <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[9px] font-mono text-emerald-800 font-bold">S 18°13'</span>
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[9px] font-mono text-emerald-800 font-bold">W 39°11'</span>
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] font-mono text-emerald-800 font-bold">E 50°06'</span>

            {/* Interactive Blinking Blips on Radar Scope */}
            {(Object.keys(regions) as Array<keyof typeof regions>).map((key) => {
              const reg = regions[key];
              const isSelected = activeRegion === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveRegion(key)}
                  className="absolute cursor-pointer transition-transform duration-300 hover:scale-130 z-20 group"
                  style={{ left: `${reg.radarX}%`, top: `${reg.radarY}%`, transform: "translate(-50%, -50%)" }}
                  title={pick(reg.name)}
                >
                  <div className="relative size-6 flex items-center justify-center">
                    <span className={cn(
                      "absolute inset-0 rounded-full animate-radar-ping",
                      isSelected ? "bg-emerald-500/70" : "bg-teal-500/40"
                    )} />
                    <span className={cn(
                      "size-3 rounded-full border-2 border-white shadow-md transition-all",
                      isSelected ? "bg-emerald-600 scale-125 ring-2 ring-emerald-300" : "bg-teal-600"
                    )} />
                  </div>
                  <span className={cn(
                    "absolute top-full left-1/2 -translate-x-1/2 mt-1 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold whitespace-nowrap shadow-sm pointer-events-none",
                    isSelected ? "bg-emerald-700 text-white" : "bg-white text-slate-700 border border-slate-200"
                  )}>
                    {key.toUpperCase()}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-4 mt-4 text-[11px] font-mono text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-emerald-600" /> Selected Sector
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-teal-600" /> Active Regional Blip
            </span>
          </div>
        </div>

        {/* Selected Region Telemetry Cockpit — Light Card */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6 md:p-7 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-emerald-800 block">TACTICAL FIELD TELEMETRY</span>
              <h4 className="font-display text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                {pick(current.name)}
              </h4>
            </div>
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
              OPERATIONAL
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs text-center">
              <span className="text-[10px] text-slate-500 font-mono block">{pick(["Beneficiaries", "المستفيدين"])}</span>
              <strong className="text-xl sm:text-2xl font-mono font-black text-slate-900 mt-1 block">{current.beneficiaries}</strong>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-emerald-200 shadow-2xs text-center">
              <span className="text-[10px] text-emerald-800 font-mono block">{pick(["Devices Delivered", "أجهزة مسلمة"])}</span>
              <strong className="text-xl sm:text-2xl font-mono font-black text-emerald-700 mt-1 block">{current.devicesRedistributed}</strong>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs text-center">
              <span className="text-[10px] text-slate-500 font-mono block">{pick(["Hospitals", "مستشفيات شريكة"])}</span>
              <strong className="text-xl sm:text-2xl font-mono font-black text-teal-700 mt-1 block">{current.hospitals}</strong>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-200">
            <span className="text-xs uppercase font-mono font-bold text-slate-500 block mb-2">
              {pick(["Verified Facilities & Infrastructure", "المنشآت الميدانية المعتمدة"])}:
            </span>
            {current.highlights.map((h, i) => (
              <div key={i} className="flex items-center gap-2.5 text-xs text-slate-700">
                <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                <span>{h}</span>
              </div>
            ))}
          </div>

          {/* Quick Region Selector Switcher */}
          <div className="pt-2 border-t border-slate-200 flex flex-wrap gap-2">
            {(Object.keys(regions) as Array<keyof typeof regions>).map((key) => (
              <button
                key={key}
                onClick={() => setActiveRegion(key)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer",
                  activeRegion === key 
                    ? "bg-emerald-600 text-white font-black shadow-sm" 
                    : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-100"
                )}
              >
                {key.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* Interactive Giving & Clinical Impact Calculator */
export function InteractiveDonationCalculator() {
  const { language, pick } = useLanguage();
  const [amount, setAmount] = useState(500);

  // Dynamic calculations based on donation amount
  const devicesRefurbished = Math.max(1, Math.floor(amount / 250));
  const gpuHours = Math.floor(amount / 10);
  const researchersSupported = Math.max(1, Math.floor(amount / 1000));

  return (
    <div className="rounded-2xl border border-emerald-200/80 bg-gradient-to-br from-white via-emerald-50/20 to-teal-50/30 p-6 md:p-10 shadow-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6 mb-8">
        <div>
          <span className="eyebrow bg-emerald-100 text-emerald-800 border-emerald-300">
            <Sliders className="size-3.5 me-1" />
            {pick(["Dynamic Giving Impact Calculator", "حاسبة الأثر الخيري المباشر"])}
          </span>
          <h3 className="font-display text-2xl md:text-3xl font-extrabold text-slate-900 mt-2">
            {pick(["Calculate Your Tangible Health Impact", "احسب أثر مساهمتك السريري والتقني"])}
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            {pick([
              "Adjust the slider to see how your contribution directly funds AI drug discovery or medical equipment rehabilitation.",
              "حرك شريط التمرير لمعرفة أثر دعمك المباشر في فحص الجزيئات الدوائية أو إعادة تأهيل الأجهزة الطبية."
            ])}
          </p>
        </div>
        <div className="text-end">
          <span className="text-xs uppercase font-bold text-slate-500 block">{pick(["Your Contribution", "مبلغ المساهمة"])}</span>
          <strong className="text-3xl md:text-4xl font-mono font-extrabold text-emerald-700">﷼{amount.toLocaleString()}</strong>
        </div>
      </div>

      {/* Interactive Range Slider */}
      <div className="max-w-3xl mx-auto my-6">
        <input 
          type="range" 
          min="100" 
          max="5000" 
          step="50" 
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <div className="flex justify-between text-xs font-mono font-semibold text-slate-500 mt-2">
          <span>﷼100</span>
          <span>﷼1,000</span>
          <span>﷼2,500</span>
          <span>﷼5,000</span>
        </div>

        {/* Quick Amount Selector Pills */}
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {[250, 500, 1000, 2500, 5000].map(val => (
            <button
              key={val}
              onClick={() => setAmount(val)}
              className={cn(
                "px-3.5 py-1.5 rounded-full text-xs font-mono font-bold border transition-all cursor-pointer",
                amount === val 
                  ? "bg-emerald-600 text-white border-emerald-600 shadow-sm" 
                  : "bg-white text-slate-700 border-slate-200 hover:border-emerald-400"
              )}
            >
              ﷼{val}
            </button>
          ))}
        </div>
      </div>

      {/* Real-time Computed Impact Cards */}
      <div className="grid sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-slate-200">
        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-3 mb-3">
            <div className="size-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <HeartPulse className="size-5" />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-semibold block">{pick(["Medical Devices", "أجهزة طبية"])}</span>
              <strong className="text-2xl font-mono font-extrabold text-slate-900">{devicesRefurbished} {pick(["Units", "أجهزة"])}</strong>
            </div>
          </div>
          <p className="text-xs text-slate-600">
            {pick([
              "Recalibrated & sanitized for families in need via Hakeem Bank.",
              "تتم معايرتها وتعقيمها هندسياً للأسر المستفيدة عبر بنك حكيم."
            ])}
          </p>
        </div>

        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-3 mb-3">
            <div className="size-10 rounded-lg bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold">
              <Cpu className="size-5" />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-semibold block">{pick(["HPC Compute Hours", "ساعات حوسبة فائقة"])}</span>
              <strong className="text-2xl font-mono font-extrabold text-cyan-700">{gpuHours} {pick(["Hours", "ساعة"])}</strong>
            </div>
          </div>
          <p className="text-xs text-slate-600">
            {pick([
              "Powers AlphaFold & generative molecular docking algorithms.",
              "تغذي خوارزميات المحاكاة الجزيئية لأبحاث الأمراض النادرة."
            ])}
          </p>
        </div>

        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-3 mb-3">
            <div className="size-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
              <Award className="size-5" />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-semibold block">{pick(["Clinical Scholars", "تدريب باحثين"])}</span>
              <strong className="text-2xl font-mono font-extrabold text-amber-700">{researchersSupported} {pick(["Fellows", "باحثين"])}</strong>
            </div>
          </div>
          <p className="text-xs text-slate-600">
            {pick([
              "Sponsored in the National Health AI Training Unit.",
              "رعاية تدريبية في الوحدة الوطنية لتأهيل كوادر الذكاء الاصطناعي."
            ])}
          </p>
        </div>
      </div>
    </div>
  );
}

export function PageHero({ 
  title, 
  subtitle, 
  eyebrow, 
  children 
}: { 
  title: string; 
  subtitle: string; 
  eyebrow?: string; 
  children?: ReactNode 
}) {
  return (
    <section className="page-hero">
      <div className="science-grid" />
      <div className="glow-orb glow-orb-primary" />
      <div className="site-container relative z-10 py-16 md:py-24">
        {eyebrow && <div className="mb-4"><span className="eyebrow">{eyebrow}</span></div>}
        <h1 className="reveal-up max-w-4xl font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-slate-900 tracking-tight">
          {title}
        </h1>
        <p className="reveal-up mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-600 [animation-delay:120ms] font-medium">
          {subtitle}
        </p>
        {children}
      </div>
    </section>
  );
}

export function Section({ 
  children, 
  tone = "plain", 
  className 
}: { 
  children: ReactNode; 
  tone?: "plain" | "mist" | "deep"; 
  className?: string 
}) {
  return (
    <section 
      className={cn(
        "section-space relative transition-colors duration-300", 
        tone === "mist" && "bg-slate-50/80 border-y border-slate-200/70", 
        tone === "deep" && "bg-slate-900 text-white", 
        className
      )}
    >
      <div className="site-container relative z-10">{children}</div>
    </section>
  );
}
export function ProgressBar({ value, max = 100 }: { value: number; max?: number }) {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));
  return (
    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
      <div 
        className="bg-emerald-600 h-full rounded-full transition-all duration-700 ease-out" 
        style={{ width: `${percentage}%` }} 
      />
    </div>
  );
}

export function DownloadButton({ label }: { label: string }) {
  const [downloading, setDownloading] = useState(false);

  const handleClick = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      alert(`${label} - Official document request generated and verified.`);
    }, 400);
  };

  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={handleClick}
      className="text-xs font-semibold hover:border-emerald-500 hover:text-emerald-700 transition-colors gap-1.5 cursor-pointer"
    >
      <Download className={cn("size-3.5", downloading && "animate-bounce")} />
      <span>{label}</span>
    </Button>
  );
}

export function SectionHeading({ 
  badge, 
  title, 
  subtitle, 
  align = "start" 
}: { 
  badge?: string; 
  title: string; 
  subtitle?: string; 
  align?: "start" | "center" 
}) {
  return (
    <div className={cn("mb-12 max-w-3xl", align === "center" && "mx-auto text-center")}>
      {badge && <div className="mb-3"><span className="eyebrow">{badge}</span></div>}
      <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="body-copy mt-4 text-slate-600">
          {subtitle}
        </p>
      )}
    </div>
  );
}

/* Number Counter Animation */
export function AnimatedNumber({ 
  value, 
  label, 
  subtitle 
}: { 
  value: string; 
  label: string; 
  subtitle?: string 
}) {
  const [displayValue, setDisplayValue] = useState("0");
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const match = value.match(/(\d+(?:\.\d+)?)/);
          if (match) {
            const targetNum = parseFloat(match[0]);
            const isDecimal = match[0].includes(".");
            const prefix = value.slice(0, match.index);
            const suffix = value.slice((match.index || 0) + match[0].length);
            
            let start = 0;
            const duration = 1400;
            const startTime = performance.now();

            const update = (now: number) => {
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const easeOut = 1 - Math.pow(1 - progress, 3);
              const current = start + (targetNum - start) * easeOut;
              
              setDisplayValue(
                `${prefix}${isDecimal ? current.toFixed(1) : Math.round(current)}${suffix}`
              );

              if (progress < 1) {
                requestAnimationFrame(update);
              } else {
                setDisplayValue(value);
              }
            };
            requestAnimationFrame(update);
          } else {
            setDisplayValue(value);
          }
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-center sm:text-start">
      <div className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
        {displayValue}
      </div>
      <div className="mt-1 font-semibold text-slate-800 text-sm sm:text-base">
        {label}
      </div>
      {subtitle && (
        <div className="mt-0.5 text-xs text-slate-500">
          {subtitle}
        </div>
      )}
    </div>
  );
}

export function GlassCard({ 
  children, 
  className,
  tone = "plain"
}: { 
  children: ReactNode; 
  className?: string;
  tone?: "plain" | "glow" | "tint";
}) {
  return (
    <div className={cn(
      "glass-card",
      tone === "glow" && "glow-card",
      tone === "tint" && "bg-emerald-50/50 border-emerald-200",
      className
    )}>
      {children}
    </div>
  );
}

export function ButtonLink({ 
  children, 
  href, 
  variant = "primary" 
}: { 
  children: ReactNode; 
  href: string; 
  variant?: "primary" | "secondary" | "outline" | "ghost" 
}) {
  return (
    <Button variant={variant === "primary" ? "default" : variant} asChild>
      <a href={href} className="inline-flex items-center gap-2">
        {children}
      </a>
    </Button>
  );
}

export function SmartForm({ 
  fields, 
  submitLabel, 
  successMessage 
}: { 
  fields: Array<{ name: string; label: string; type?: string; options?: string[]; required?: boolean }>; 
  submitLabel: string; 
  successMessage: string; 
}) {
  const [submitted, setSubmitted] = useState(false);
  const [trackingCode, setTrackingCode] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const code = "WAIWIM-" + Math.floor(100000 + Math.random() * 900000);
    setTrackingCode(code);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 md:p-8 text-center animate-in zoom-in-95 duration-300">
        <div className="mx-auto size-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
          <CheckCircle2 className="size-6" />
        </div>
        <h4 className="font-display text-xl font-bold text-slate-900">
          Application Successfully Registered
        </h4>
        <p className="mt-2 text-sm text-slate-700 max-w-md mx-auto">
          {successMessage}
        </p>
        <div className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 border border-emerald-300 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold">Official Tracking Code:</span>
          <span className="font-mono text-base font-bold text-emerald-700">{trackingCode}</span>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map(field => (
        <div key={field.name} className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
            {field.label} {field.required && <span className="text-rose-500">*</span>}
          </label>
          {field.type === "textarea" ? (
            <Textarea name={field.name} required={field.required} rows={4} className="bg-white border-slate-300" />
          ) : field.type === "select" ? (
            <select 
              name={field.name} 
              required={field.required} 
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-xs focus:border-emerald-500 focus:outline-none"
            >
              <option value="">Select option...</option>
              {field.options?.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          ) : (
            <Input name={field.name} type={field.type || "text"} required={field.required} className="bg-white border-slate-300" />
          )}
        </div>
      ))}
      <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 mt-2">
        <Send className="size-4 me-2" />
        {submitLabel}
      </Button>
    </form>
  );
}

/* 5-Stage AI Drug Discovery Pipeline Visualizer */
export function InteractivePipeline() {
  const { language, pick } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);
  const [compoundScale, setCompoundScale] = useState(1000000);
  const current = aiPipelineSteps[activeStep];

  // Dynamic simulation multipliers
  const computeTimeTraditional = (compoundScale / 10000 * 2.5).toFixed(1);
  const computeTimeWAIWIM = Math.max(1, Math.round(compoundScale / 100000)).toString();

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-10 shadow-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <span className="eyebrow">{pick(["Computational Acceleration", "تسريع حوسبي فائق"])}</span>
          <h3 className="font-display text-2xl md:text-3xl font-extrabold text-slate-900 mt-2">
            {pick(["AI Drug Discovery Architecture", "بنية اكتشاف الدواء بالذكاء الاصطناعي"])}
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            {pick([
              "Click each stage below to examine how our models collapse multi-year research timelines into months.",
              "اضغط على مراحل مسار الاكتشاف للاطلاع على دور النماذج التوليدية في اختصار سنوات البحث إلى أشهر."
            ])}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="status-badge">
            <span className="size-2 rounded-full bg-emerald-500 animate-ping" />
            {pick(["SFDA Aligned Pipeline", "مسار متوافق مع هيئة الغذاء والدواء"])}
          </span>
        </div>
      </div>

      {/* Stepper buttons */}
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {aiPipelineSteps.map((step, idx) => {
          const isSelected = activeStep === idx;
          return (
            <button
              key={step.step}
              onClick={() => setActiveStep(idx)}
              className={cn(
                "flex flex-col items-start p-4 rounded-xl border text-start transition-all duration-300 relative overflow-hidden",
                isSelected 
                  ? "border-emerald-600 bg-emerald-50/70 shadow-md ring-2 ring-emerald-500/20" 
                  : "border-slate-200 bg-slate-50/60 hover:border-slate-300 hover:bg-slate-100"
              )}
            >
              <div className="flex items-center justify-between w-full">
                <span className={cn(
                  "font-mono text-xs font-bold px-2 py-0.5 rounded",
                  isSelected ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-700"
                )}>
                  {step.step}
                </span>
                {isSelected && <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />}
              </div>
              <strong className="mt-3 text-sm font-bold text-slate-900 leading-tight line-clamp-2">
                {pick(step.name)}
              </strong>
              <span className="mt-2 text-[11px] font-semibold text-emerald-700">
                {pick(step.speedup)}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active step details view */}
      <div className="mt-8 rounded-2xl bg-slate-50 border border-slate-200 p-6 md:p-8 grid md:grid-cols-[1.5fr_1fr] gap-6 items-center">
        <div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-3xl font-extrabold text-emerald-600">{current.step}</span>
            <h4 className="font-display text-2xl font-bold text-slate-900">{pick(current.name)}</h4>
          </div>
          <p className="body-copy mt-4 text-slate-700">{pick(current.description)}</p>
          <div className="mt-6 flex flex-wrap gap-4 items-center">
            <div className="rounded-lg bg-white px-4 py-2 border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 block">{pick(["Efficiency Multiplier", "معدل التسريع"])}</span>
              <strong className="text-base text-emerald-700 font-bold">{pick(current.speedup)}</strong>
            </div>
            <div className="rounded-lg bg-white px-4 py-2 border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 block">{pick(["Benchmark Metric", "المعيار المقاس"])}</span>
              <strong className="text-base text-slate-900 font-mono">{current.metric}</strong>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white border border-slate-200 p-6 flex flex-col justify-center items-center text-center shadow-xs">
          <div className="size-16 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700 mb-4">
            <Dna className="size-8 animate-pulse" />
          </div>
          <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
            {pick(["Computational Model", "النموذج الحوسبي"])}
          </span>
          <p className="font-display text-lg font-bold text-slate-900 mt-1">
            {pick(["Bio-Generative Transformer", "المحولات الحيوية التوليدية"])}
          </p>
          <p className="text-xs text-slate-600 mt-2 max-w-xs">
            {pick([
              "Trained on billions of molecular sequences, cross-docked with AlphaFold structural predictions.",
              "مدربة على مليارات التسلسلات الجزيئية ومحاكاة الربط مع تراكيب ألفافولد الحيوية."
            ])}
          </p>
        </div>
      </div>
    </div>
  );
}

/* Interactive Stakeholder Role Dashboards Simulation */
export function RoleDashboardViewer() {
  const { language, pick } = useLanguage();
  const [role, setRole] = useState<"individual" | "pharmacy" | "donor" | "volunteer" | "partner" | "board" | "admin">("individual");

    const roles = [
    { id: "individual", label: ["Patient Portal", "بوابة المريض"], icon: User },
    { id: "pharmacy", label: ["Pharmacy", "الصيدلية"], icon: Pill },
    { id: "donor", label: ["Donor Dashboard", "بوابة المانحين"], icon: Landmark },
    { id: "volunteer", label: ["Volunteer Portal", "بوابة المتطوعين"], icon: Users },
    { id: "partner", label: ["Strategic Partner", "الشريك الاستراتيجي"], icon: Building2 },
    { id: "board", label: ["Board & Governance", "مجلس الإدارة"], icon: ShieldCheck },
    { id: "admin", label: ["System Manager", "مدير النظام"], icon: Settings },
  ] as const;

  return (
    <div className="space-y-6">
      {/* Switcher tabs */}
      <div className="flex flex-wrap gap-2 justify-center p-1.5 rounded-full bg-slate-100 border border-slate-200 max-w-2xl mx-auto shadow-xs">
        {roles.map(r => {
          const Icon = r.icon;
          const isSelected = role === r.id;
          return (
            <button
              key={r.id}
              onClick={() => setRole(r.id)}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer",
                isSelected 
                  ? "bg-white text-emerald-800 shadow-sm border border-slate-200" 
                  : "text-slate-600 hover:text-slate-900"
              )}
            >
              <Icon className={cn("size-4", isSelected ? "text-emerald-600" : "text-slate-400")} />
              <span>{pick(r.label)}</span>
            </button>
          );
        })}
      </div>

      {/* Role specific rendered dashboard preview */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-xl">
        
        {role === "individual" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h4 className="font-display text-xl font-bold text-slate-900">
                  {pick(portalSimulations.individual.title)}
                </h4>
                <p className="text-xs text-slate-500">
                  {pick(portalSimulations.individual.subtitle)}
                </p>
              </div>
              <span className="status-badge">
                <CheckCircle2 className="size-3.5" />
                {pick(["Verified Patient Profile", "ملف مريض موثق"])}
              </span>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-3">
                <span className="text-xs uppercase font-bold text-slate-500 block">
                  {pick(["Recent Equipment Requests", "الطلبات الأخيرة للأجهزة"])}
                </span>
                {portalSimulations.individual.requests.map((req, i) => (
                  <div key={i} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                    <div>
                      <strong className="block text-sm font-bold text-slate-900">{req.type}</strong>
                      <span className="text-xs text-slate-500">{req.id} • {req.date}</span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full">{req.status}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-3">
                <span className="text-xs uppercase font-bold text-slate-500 block">
                  {pick(["Upcoming Appointments", "المواعيد القادمة"])}
                </span>
                {portalSimulations.individual.appointments.map((app, i) => (
                  <div key={i} className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                    <strong className="block text-sm font-bold text-slate-900">{app.clinic}</strong>
                    <div className="text-xs text-slate-500 mt-1 flex justify-between">
                      <span>{app.doctor}</span>
                      <span className="font-mono text-emerald-700 font-bold">{app.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {role === "pharmacy" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h4 className="font-display text-xl font-bold text-slate-900">
                  {pick(portalSimulations.pharmacy.title)}
                </h4>
                <p className="text-xs text-slate-500">
                  {pick(portalSimulations.pharmacy.subtitle)}
                </p>
              </div>
              <span className="status-badge">
                <Activity className="size-3.5" />
                {pick(["Live Inventory Sync", "مزامنة المخزون المباشرة"])}
              </span>
            </div>
            
            <div className="grid gap-4 sm:grid-cols-3">
              {portalSimulations.pharmacy.inventory.map((inv, i) => (
                <div key={i} className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-center">
                  <strong className="block text-2xl font-display font-extrabold text-slate-900">{inv.stock}</strong>
                  <span className="text-xs font-semibold text-slate-600 block mt-1">{inv.item}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full mt-2 inline-block ${inv.status === 'Critical' ? 'bg-red-100 text-red-700' : inv.status === 'Low Stock' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                    {inv.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {role === "admin" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h4 className="font-display text-xl font-bold text-slate-900">
                  {pick(portalSimulations.admin.title)}
                </h4>
                <p className="text-xs text-slate-500">
                  {pick(portalSimulations.admin.subtitle)}
                </p>
              </div>
              <span className="status-badge">
                <ShieldCheck className="size-3.5" />
                {pick(["Superadmin Access", "صلاحيات المشرف العام"])}
              </span>
            </div>
            
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                <span className="text-[10px] uppercase font-bold text-slate-500">Total Users</span>
                <strong className="block text-2xl font-mono text-slate-900 mt-1">{portalSimulations.admin.userStats.totalUsers}</strong>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                <span className="text-[10px] uppercase font-bold text-slate-500">Active Donors</span>
                <strong className="block text-2xl font-mono text-emerald-700 mt-1">{portalSimulations.admin.userStats.activeDonors}</strong>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                <span className="text-[10px] uppercase font-bold text-slate-500">Volunteers</span>
                <strong className="block text-2xl font-mono text-cyan-600 mt-1">{portalSimulations.admin.userStats.activeVolunteers}</strong>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 bg-amber-50 border-amber-200">
                <span className="text-[10px] uppercase font-bold text-amber-700">Pending Actions</span>
                <strong className="block text-2xl font-mono text-amber-700 mt-1">{portalSimulations.admin.userStats.pendingVerifications}</strong>
              </div>
            </div>
            
            <div className="space-y-2 mt-4">
               {portalSimulations.admin.systemHealth.map((sys, i) => (
                  <div key={i} className="flex items-center justify-between text-xs p-3 rounded-lg bg-white border border-slate-200">
                    <span className="font-semibold text-slate-700">{sys.module}</span>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-slate-500">Uptime: {sys.uptime}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700">{sys.status}</span>
                    </div>
                  </div>
               ))}
            </div>
          </div>
        )}

        {role === "donor" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h4 className="font-display text-xl font-bold text-slate-900">
                  {pick(["Fiduciary Donor Transparency Cockpit", "لوحة الشفافية وإدارة التبرعات"])}
                </h4>
                <p className="text-xs text-slate-500">
                  {pick(["Simulated live preview of authorized donor account", "معاينة حية لحساب المانح المعتمد"])}
                </p>
              </div>
              <span className="status-badge">
                <CheckCircle2 className="size-3.5" />
                {pick(["Audited by Ernst & Young", "مدققة من مراجع قانوني معتمد"])}
              </span>
            </div>

            {/* Fund Allocation breakdown */}
            <div className="space-y-3">
              <span className="text-xs uppercase font-bold text-slate-500 block">
                {pick(["Direct Fund Utilization Breakdown", "أوجه الصرف والإنفاق المؤسسي المباشر"])}
              </span>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {portalSimulations.donor.financialBreakdown.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                    <span className="text-xs text-slate-600 font-semibold block">{pick(item.category)}</span>
                    <strong className="text-2xl font-mono font-extrabold text-slate-900 mt-1 block">
                      {item.percentage}%
                    </strong>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${item.percentage}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Contributions Ledger */}
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-start text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                  <tr>
                    <th className="p-3 text-start">Campaign</th>
                    <th className="p-3 text-start">Amount</th>
                    <th className="p-3 text-start">Date</th>
                    <th className="p-3 text-start">Tax Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {portalSimulations.donor.contributions.map((c, i) => (
                    <tr key={i} className="hover:bg-slate-50">
                      <td className="p-3 font-semibold text-slate-900">{pick(c.campaign)}</td>
                      <td className="p-3 font-mono font-bold text-emerald-700">{c.amount}</td>
                      <td className="p-3 text-slate-500">{c.date}</td>
                      <td className="p-3">
                        <button 
                          onClick={() => alert(`Official Receipt ${c.receiptId} downloaded.`)}
                          className="text-emerald-700 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <Download className="size-3" />
                          {c.receiptId}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {role === "volunteer" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h4 className="font-display text-xl font-bold text-slate-900">
                  {pick(["National Volunteer Portal Cockpit", "بوابة التطوع الوطني والفرص المعتمدة"])}
                </h4>
                <p className="text-xs text-slate-500">
                  {pick(["Connected directly to the Ministry of HRSD National Volunteer Platform", "مرتبطة بالمنصة الوطنية للعمل التطوعي"])}
                </p>
              </div>
              <span className="status-badge">
                <CheckCircle2 className="size-3.5" />
                {portalSimulations.volunteer.loggedHours} {pick(["Logged Volunteer Hours", "ساعة تطوعية معتمدة"])}
              </span>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {portalSimulations.volunteer.openTasks.map((t, i) => (
                <div key={i} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-mono text-emerald-700 font-bold uppercase">{pick(t.track)}</span>
                    <strong className="block text-sm font-bold text-slate-900 mt-1">{pick(t.title)}</strong>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between">
                    <span className="text-xs text-slate-500">{t.hours} hrs</span>
                    <Button size="sm" variant="outline" className="text-xs" onClick={() => alert("Opportunity saved to your profile.")}>
                      {pick(["Apply", "تقديم"])}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {role === "partner" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h4 className="font-display text-xl font-bold text-slate-900">
                  {pick(["Institutional Partner & Alliance Portal", "بوابة الشراكات الاستراتيجية"])}
                </h4>
                <p className="text-xs text-slate-500">
                  {pick(["University & Healthcare Provider Collaborations", "التحالفات مع الجامعات والمستشفيات"])}
                </p>
              </div>
              <span className="status-badge">
                {portalSimulations.partner.activeMous.length} {pick(["Active MoUs", "مذكرات تفاهم نشطة"])}
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {portalSimulations.partner.activeMous.map((m, i) => (
                <div key={i} className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-500">{m.period}</span>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">{m.status}</span>
                  </div>
                  <strong className="block text-sm font-bold text-slate-900 mt-2">{pick(m.entity)}</strong>
                  <p className="text-xs text-slate-600 mt-1">{pick(m.scope)}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {role === "board" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h4 className="font-display text-xl font-bold text-slate-900">
                  {pick(["Board of Directors Governance Cockpit", "لوحة قيادة مجلس الإدارة والحوكمة"])}
                </h4>
                <p className="text-xs text-slate-500">
                  {pick(["Real-time compliance radar & NCNP statutory health score", "مؤشرات الامتثال النظامي لمركز القطاع غير الربحي"])}
                </p>
              </div>
              <span className="status-badge">
                {pick(["NCNP Compliance: 99.2%", "درجة الامتثال: 99.2%"])}
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                <span className="text-xs uppercase font-bold text-slate-500 block mb-3">
                  {pick(["Mandatory Compliance Pillars", "محاور الامتثال الإلزامية"])}
                </span>
                <div className="space-y-2">
                  {portalSimulations.board.complianceStatus.map((c, i) => (
                    <div key={i} className="flex items-center justify-between text-xs p-2 rounded bg-white border border-slate-200">
                      <span className="font-semibold text-slate-800">{pick(c.category)}</span>
                      <span className="font-mono font-bold text-emerald-700">{c.score}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                <span className="text-xs uppercase font-bold text-slate-500 block mb-3">
                  {pick(["Enterprise Risk Matrix", "مصفوفة إدارة المخاطر المؤسسية"])}
                </span>
                <div className="space-y-2">
                  {portalSimulations.board.riskMatrix.map((r, i) => (
                    <div key={i} className="flex items-center justify-between text-xs p-2 rounded bg-white border border-slate-200">
                      <span className="font-semibold text-slate-800">{pick(r.risk)}</span>
                      <span className="font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">{r.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* Modal for "Your Voice Matters" / Whistleblowing & Complaints */
export function VoiceMattersModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { language, pick } = useLanguage();
  if (!open) return null;

  return (
    <div className="search-backdrop flex items-center justify-center p-4 z-[90]" onMouseDown={onClose}>
      <div 
        className="glass-card max-w-xl w-full p-6 md:p-8 animate-in zoom-in-95 duration-200"
        onMouseDown={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-700">
              <AlertCircle className="size-5" />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-slate-900">
                {pick(["Your Voice Matters", "صوتكم مسموع (الشكاوى والملاحظات)"])}
              </h3>
              <p className="text-xs text-slate-500">
                {pick(["Confidential and independent governance portal", "بوابة مستقلة ومحمية وفق لوائح الحوكمة"])}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close">
            ✕
          </Button>
        </div>

        <div className="mt-5">
          <SmartForm 
            fields={[
              { 
                name: "type", 
                label: pick(["Submission Type", "نوع المعاملة"]), 
                type: "select", 
                options: [
                  language === "ar" ? "تقديم مقترح أو فكرة" : "Submit Suggestion",
                  language === "ar" ? "تقديم شكوى على خدمة" : "Service Complaint",
                  language === "ar" ? "إبلاغ عن شبهة تعارض مصالح أو نزاهة" : "Whistleblowing / Integrity Concern",
                  language === "ar" ? "استفسار علمي أو تنظيمي" : "General Governance Inquiry"
                ],
                required: true 
              },
              { name: "name", label: pick(["Name (Optional for Whistleblowers)", "الاسم (اختياري في البلاغات المحمية)"]), required: false },
              { name: "contact", label: pick(["Email or Phone for Resolution Follow-up", "البريد أو الجوال لاستلام نتيجة المعالجة"]), required: true },
              { name: "message", label: pick(["Detailed Description", "تفاصيل البلاغ أو الشكوى"]), type: "textarea", required: true }
            ]}
            submitLabel={pick(["Register & Generate Ticket", "تسجيل المعاملة وإصدار التذكرة"])}
            successMessage={pick([
              "Your report has been received by the Governance & Audit Committee. A reference code has been issued and will be investigated within 5 business days.",
              "تم استلام بلاغك من قبل لجنة الحوكمة والمراجعة. صدر رقم مرجعي رسمي وستتم المعالجة خلال 5 أيام عمل وفق لوائح المركز الوطني."
            ])}
          />
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   CINEMATIC COMPONENT 1: DUAL KINETIC STREAMING MARQUEE TELEMETRY
   ========================================================================= */
export function CinematicMarqueeTelemetry() {
  const { pick } = useLanguage();

  const stream1 = [
    { label: pick(["Translational Biotech Capital", "تمويل مسرعة التقنية الحيوية"]), val: "﷼4,500,000", tag: "SEED FUND" },
    { label: pick(["Medical Devices Recalibrated", "أجهزة طبية أعيد تأهيلها"]), val: "840+ UNITS", tag: "HAKEEM BANK" },
    { label: pick(["Statutory Governance Score", "نسبة الامتثال النظامي"]), val: "99.2% NCNP", tag: "AUDITED" },
    { label: pick(["Direct Patients Reached", "مستفيد مباشر"]), val: "18,400+ PATIENTS", tag: "IMPACT" },
    { label: pick(["Clinical AI Fellows Trained", "باحث ومتدرب معتمد"]), val: "420 SCHOLARS", tag: "ACADEMY" },
    { label: pick(["Biotech Patents Under Filing", "براءات اختراع قيد التسجيل"]), val: "6 PATENTS", tag: "INNOVATION" }
  ];

  const stream2 = [
    { label: pick(["King Saud University AI Chair", "كرسي أبحاث جامعة الملك سعود"]), val: "ACTIVE CHAIR", tag: "ACADEMIA" },
    { label: pick(["SFDA Regulatory Sandbox", "البيئة التجريبية للغذاء والدواء"]), val: "FAST-TRACK", tag: "REGULATORY" },
    { label: pick(["High-Performance Bio-Cluster", "عنقود الحوسبة الحيوية الفائقة"]), val: "1.2 PFLOPS", tag: "HPC GPU" },
    { label: pick(["Saudi National Volunteer Platform", "المنصة الوطنية للعمل التطوعي"]), val: "8,400+ HOURS", tag: "COMMUNITY" },
    { label: pick(["Geographic Reach", "التغطية الجغرافية الميدانية"]), val: "13 PROVINCES", tag: "NATIONWIDE" },
    { label: pick(["Fiduciary Audit Certification", "شهادة التدقيق المالي المستقل"]), val: "ERNST & YOUNG", tag: "GOVERNANCE" }
  ];

  return (
    <div className="relative py-4 overflow-hidden bg-gradient-to-r from-emerald-50/60 via-white to-teal-50/60 text-slate-800 border-y border-emerald-200/80 shadow-2xs">
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-emerald-50 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-teal-50 to-transparent z-10 pointer-events-none" />

      {/* Stream 1: Forward */}
      <div className="animate-marquee flex gap-3.5 items-center">
        {[...stream1, ...stream1].map((item, i) => (
          <div 
            key={i} 
            className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-emerald-200/90 shadow-2xs hover:border-emerald-400 hover:shadow-md transition-all cursor-default shrink-0"
          >
            <span className="size-2 rounded-full bg-emerald-600 animate-ping" />
            <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
              {item.tag}
            </span>
            <span className="text-xs text-slate-600 font-semibold">{item.label}:</span>
            <strong className="font-mono text-xs sm:text-sm font-extrabold text-emerald-700 tracking-wide">{item.val}</strong>
          </div>
        ))}
      </div>

      {/* Stream 2: Reverse */}
      <div className="animate-marquee-reverse flex gap-3.5 items-center mt-2.5">
        {[...stream2, ...stream2].map((item, i) => (
          <div 
            key={i} 
            className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-teal-200/90 shadow-2xs hover:border-teal-400 hover:shadow-md transition-all cursor-default shrink-0"
          >
            <span className="size-1.5 rounded-full bg-teal-600" />
            <span className="text-[10px] font-mono font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded border border-teal-300">
              {item.tag}
            </span>
            <span className="text-xs text-slate-600 font-semibold">{item.label}:</span>
            <strong className="font-mono text-xs sm:text-sm font-extrabold text-teal-700 tracking-wide">{item.val}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================================
   CINEMATIC COMPONENT 2: 360° ORBITAL PILLAR DIAL — LIGHT THEME
   Professional Society Layout with Interactive Animations
   ========================================================================= */
export function OrbitalPillarDial() {
  const { pick } = useLanguage();
  const [activeIdx, setActiveIdx] = useState(0);

  const pillars = [
    {
      id: "ai-pharma",
      num: "01",
      title: ["AI & Drug Innovation", "الذكاء الاصطناعي والابتكار الدوائي"],
      tag: "FLAGSHIP RESEARCH",
      desc: [
        "Deploying bio-generative foundational models, AlphaFold protein docking, and generative diffusion algorithms to screen hundreds of millions of compounds for oncology and rare diseases.",
        "توظيف النماذج البيولوجية التأسيسية وخوارزميات الانتشار التوليدي لفحص مئات الملايين من المركبات للأورام والأمراض النادرة."
      ],
      img: "/images/molecular_docking_3d.jpg",
      metric: "100M+",
      metricLabel: ["Screened Compounds", "مركب مفحوص"],
      metricSub: "Target Binding Affinity < -9.5 kcal/mol",
      color: "emerald",
      icon: Dna
    },
    {
      id: "health-devices",
      num: "02",
      title: ["Health Innovation & Medical Bank", "الابتكار الصحي وبنك الأجهزة"],
      tag: "HAKEEM MEDICAL BANK",
      desc: [
        "A circular biomedical logistics engine that collects, inspects, and re-calibrates advanced diagnostic and mobility devices with SFDA compliance standards.",
        "منظومة إمداد طبي دائرية لحصر وفحص وإعادة معايرة الأجهزة التعويضية والمستلزمات الطبية بأعلى معايير الجودة."
      ],
      img: "/images/hakeem_medical_devices.jpg",
      metric: "840+",
      metricLabel: ["Recalibrated Units", "جهاز معاد معايرته"],
      metricSub: "100% Clinical Sterilization Pass",
      color: "cyan",
      icon: HeartPulse
    },
    {
      id: "talent-academy",
      num: "03",
      title: ["Research, Education & Talent", "البحث العلمي وتأهيل الكفاءات"],
      tag: "THOUSAND MILES PROGRAM",
      desc: [
        "Building national scientific capacity through clinical bio-informatics fellowships, university research chairs, and healthcare AI hackathons.",
        "بناء القدرات العلمية الوطنية عبر زمالات المعلوماتية الحيوية، وكراسي الأبحاث، وهاكاثونات الذكاء الاصطناعي."
      ],
      img: "/images/saudi_genomic_supercomputer.jpg",
      metric: "420",
      metricLabel: ["Clinical Scholars", "باحث سريري"],
      metricSub: "8,400+ Accredited CME Hours",
      color: "violet",
      icon: Award
    },
    {
      id: "community-impact",
      num: "04",
      title: ["Community Health Impact", "الأثر الصحي المجتمعي"],
      tag: "NATIONWIDE REACH",
      desc: [
        "Direct measurable healthcare access for underserved families across all 13 Saudi provinces, ensuring health equity and humanitarian dignity.",
        "وصول صحي مباشر ومقاس للأسر المحتاجة عبر كافة مناطق المملكة الـ 13، لتحقيق العدالة الصحية والكرامة الإنسانية."
      ],
      img: "/images/saudi_clinical_care.jpg",
      metric: "18,400",
      metricLabel: ["Beneficiaries", "مستفيد"],
      metricSub: "Social ROI Multiplier: 4.2x",
      color: "amber",
      icon: HeartPulse
    }
  ];

  const curr = pillars[activeIdx];
  const Icon = curr.icon;

  const colorMap: Record<string, { bg: string; text: string; border: string; ring: string; light: string; iconBg: string }> = {
    emerald: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-300", ring: "ring-emerald-200", light: "bg-emerald-100", iconBg: "bg-emerald-600" },
    cyan: { bg: "bg-cyan-50", text: "text-cyan-700", border: "border-cyan-300", ring: "ring-cyan-200", light: "bg-cyan-100", iconBg: "bg-cyan-600" },
    violet: { bg: "bg-violet-50", text: "text-violet-700", border: "border-violet-300", ring: "ring-violet-200", light: "bg-violet-100", iconBg: "bg-violet-600" },
    amber: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-300", ring: "ring-amber-200", light: "bg-amber-100", iconBg: "bg-amber-600" }
  };

  const c = colorMap[curr.color];

  return (
    <div className="relative overflow-hidden">
      {/* Soft ambient gradient blobs */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-cyan-400/8 rounded-full blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="text-center mb-10 relative z-10">
        <span className="eyebrow bg-emerald-50 text-emerald-700 border-emerald-200 mx-auto">
          <Sparkles className="size-3.5 me-1 text-emerald-500" />
          {pick(["Strategic Institutional Pillars", "الركائز المؤسسية الاستراتيجية"])}
        </span>
        <h3 className="font-display text-3xl md:text-5xl font-extrabold text-slate-900 mt-3 tracking-tight">
          {pick(["Our Four Core Pillars", "ركائزنا المؤسسية الأربع"])}
        </h3>
        <p className="text-slate-500 mt-3 max-w-2xl mx-auto text-sm leading-relaxed">
          {pick([
            "The strategic foundation of our society, each pillar driving measurable healthcare impact across Saudi Arabia.",
            "الأساس الاستراتيجي لجمعيتنا، كل ركيزة تقود أثراً صحياً قابلاً للقياس عبر المملكة العربية السعودية."
          ])}
        </p>
      </div>

      {/* Interactive Pillar Selector Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10 relative z-10">
        {pillars.map((p, idx) => {
          const isActive = activeIdx === idx;
          const PIcon = p.icon;
          const pc = colorMap[p.color];
          return (
            <button
              key={p.id}
              onClick={() => setActiveIdx(idx)}
              className={cn(
                "pillar-card-3d relative p-5 rounded-2xl border-2 text-start cursor-pointer group overflow-hidden",
                isActive
                  ? `bg-white ${pc.border} shadow-xl ring-4 ${pc.ring}`
                  : "bg-white/80 border-slate-200 hover:border-slate-300 hover:shadow-lg"
              )}
            >
              {/* Animated corner accent */}
              {isActive && (
                <div className={cn("absolute top-0 left-0 w-full h-1 rounded-t-2xl", pc.iconBg)} />
              )}

              <div className="flex items-center justify-between mb-3">
                <div className={cn(
                  "size-10 rounded-xl flex items-center justify-center transition-all duration-300",
                  isActive ? `${pc.iconBg} text-white shadow-lg` : `${pc.light} ${pc.text}`
                )}>
                  <PIcon className="size-5" />
                </div>
                <span className={cn(
                  "font-mono text-xs font-extrabold px-2 py-0.5 rounded-md transition-all",
                  isActive ? `${pc.bg} ${pc.text}` : "bg-slate-100 text-slate-400"
                )}>
                  {p.num}
                </span>
              </div>

              <strong className={cn(
                "block text-sm font-bold leading-snug transition-colors",
                isActive ? "text-slate-900" : "text-slate-600"
              )}>
                {pick(p.title)}
              </strong>

              <div className={cn(
                "flex items-center gap-1.5 mt-2.5 transition-all",
                isActive ? "opacity-100" : "opacity-0 group-hover:opacity-60"
              )}>
                <span className={cn("size-1.5 rounded-full animate-soft-pulse", isActive ? pc.iconBg : "bg-slate-400")} />
                <span className={cn("text-[11px] font-mono font-bold", isActive ? pc.text : "text-slate-400")}>
                  {p.tag}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Content: Image Viewport + Details Panel */}
      <div key={activeIdx} className="animate-scale-pop relative z-10 rounded-3xl border border-slate-200 bg-white shadow-2xl overflow-hidden">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] min-h-[420px]">

          {/* Left: Photographic Viewport with Overlay */}
          <div className="relative overflow-hidden group">
            <img
              src={curr.img}
              alt={pick(curr.title)}
              className="w-full h-full min-h-[320px] lg:min-h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/20 via-transparent to-transparent pointer-events-none" />

            {/* Floating Metric Badge — bottom left */}
            <div className="absolute bottom-5 left-5 animate-card-float">
              <div className="bg-white/95 backdrop-blur-md rounded-2xl px-5 py-3 shadow-xl border border-white/30">
                <span className={cn("font-mono text-3xl font-black tracking-tight animate-number-glow", c.text)}>
                  {curr.metric}
                </span>
                <span className="block text-xs text-slate-600 font-semibold mt-0.5">
                  {pick(curr.metricLabel)}
                </span>
              </div>
            </div>

            {/* Tag Badge — top right */}
            <div className="absolute top-4 right-4">
              <span className={cn("px-3 py-1.5 rounded-full text-[11px] font-mono font-bold text-white shadow-lg", c.iconBg)}>
                {curr.tag}
              </span>
            </div>

            {/* NCNP License — top left */}
            <div className="absolute top-4 left-4">
              <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur rounded-full px-3 py-1.5 text-[11px] font-mono font-bold text-slate-700 shadow-sm">
                <ShieldCheck className="size-3 text-emerald-600" />
                <span>NCNP #5421</span>
              </div>
            </div>
          </div>

          {/* Right: Details Panel */}
          <div className="p-7 lg:p-10 flex flex-col justify-center space-y-6">
            {/* Pillar Number + Tag */}
            <div className="flex items-center gap-3">
              <div className={cn("size-12 rounded-2xl flex items-center justify-center text-white shadow-lg animate-breathe-ring", c.iconBg)}>
                <Icon className="size-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className={cn("font-mono text-xs font-extrabold px-2 py-0.5 rounded", c.bg, c.text)}>
                    PILLAR {curr.num}
                  </span>
                </div>
                <h4 className="font-display text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5 leading-tight">
                  {pick(curr.title)}
                </h4>
              </div>
            </div>

            {/* Description */}
            <p className="text-slate-600 text-sm leading-relaxed">
              {pick(curr.desc)}
            </p>

            {/* Metric Grid */}
            <div className={cn("p-4 rounded-2xl border grid grid-cols-2 gap-4", c.bg, c.border)}>
              <div>
                <span className="text-[11px] text-slate-500 font-mono font-semibold block uppercase">
                  {pick(["Primary Metric", "المؤشر الرئيس"])}
                </span>
                <strong className={cn("text-2xl font-mono font-black block mt-1 animate-number-glow", c.text)}>
                  {curr.metric}
                </strong>
                <span className="text-xs text-slate-500">{pick(curr.metricLabel)}</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 font-mono font-semibold block uppercase">
                  {pick(["Clinical Benchmark", "المعيار المقاس"])}
                </span>
                <span className="text-xs font-mono font-bold text-slate-700 block mt-1 leading-relaxed">
                  {curr.metricSub}
                </span>
              </div>
            </div>

            {/* Action */}
            <div className="flex items-center gap-4 pt-1">
              <Button className={cn("text-white rounded-full font-bold px-6 text-xs h-10 shadow-lg transition-all hover:shadow-xl", c.iconBg)} asChild>
                <Link to="/programs">
                  {pick(["Explore This Pillar", "استكشف هذه الركيزة"])}
                  <ArrowRight className="rtl:rotate-180 size-3.5 ms-1.5" />
                </Link>
              </Button>

              <button
                onClick={() => setActiveIdx((prev) => (prev + 1) % pillars.length)}
                className="text-xs font-semibold text-slate-400 hover:text-emerald-600 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>{pick(["Next Pillar", "الركيزة التالية"])}</span>
                <ArrowRight className="rtl:rotate-180 size-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   CINEMATIC COMPONENT 3: MOLECULAR SYNTHESIZER & DRUG DISCOVERY LAB CONSOLE
   ========================================================================= */
export function MolecularSynthesizerRack() {
  const { pick } = useLanguage();
  const [scale, setScale] = useState(1000000);
  const [targetIdx, setTargetIdx] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);

  const targets = [
    { name: "CDK2 (Oncology)", affinity: "-10.4 kcal/mol", timeSaved: "4.2 Years", hitRate: "94.2%", indication: "Breast & Colorectal Cancer" },
    { name: "KRAS-G12D (Rare Disease)", affinity: "-11.8 kcal/mol", timeSaved: "3.8 Years", hitRate: "91.5%", indication: "Pediatric Pancreatic & Rare Mutations" },
    { name: "EGFR-L858R (Precision Med)", affinity: "-9.7 kcal/mol", timeSaved: "4.5 Years", hitRate: "96.0%", indication: "Targeted Non-Small Cell Lung Carcinoma" }
  ];

  const currentTarget = targets[targetIdx];
  const gpuHours = Math.round(scale / 25000);
  const timeWeeks = Math.max(2, Math.round(scale / 150000));

  const handleSimulate = () => {
    setIsSimulating(true);
    setTimeout(() => setIsSimulating(false), 800);
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-10 shadow-xl relative overflow-hidden border-2 border-emerald-100 text-slate-900">
      {/* Light scientific background glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-100/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-teal-100/50 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-6 mb-8 relative z-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-emerald-600 animate-ping" />
            <span className="font-mono text-xs font-bold text-emerald-800 tracking-wider uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              {pick(["Bio-Generative AI Drug Discovery Accelerator", "المسرعة الوطنية للتوليد الجزيئي واكتشاف الدواء"])}
            </span>
          </div>
          <h3 className="font-display text-2xl md:text-3xl font-extrabold text-slate-950 mt-2">
            {pick(["Sovereign AI Drug Screening Engine", "محرك الفحص الدوائي الافتراضي بالذكاء الاصطناعي"])}
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-xl">
            {pick([
              "Accelerating discovery timelines for oncology and rare genetic diseases in Saudi Arabia using AlphaFold-3 structural docking and generative diffusion.",
              "تسريع دورات اكتشاف العلاجات للأورام والأمراض الوراثية النادرة بالمملكة عبر خوارزميات الانتشار ونماذج ألفافولد-3."
            ])}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Target Selector Buttons */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200">
            {targets.map((t, i) => (
              <button
                key={i}
                onClick={() => setTargetIdx(i)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer",
                  targetIdx === i 
                    ? "bg-emerald-600 text-white font-black shadow-sm" 
                    : "text-slate-600 hover:text-slate-900 hover:bg-white"
                )}
              >
                {t.name.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-center relative z-10">
        <div className="space-y-6">
          {/* Compound Screening Slider Card */}
          <div className="p-5 rounded-2xl bg-slate-50/90 border border-slate-200/90 shadow-2xs">
            <div className="flex items-center justify-between text-xs font-mono mb-2">
              <span className="text-slate-600 font-bold uppercase">{pick(["Compound Screening Scale", "حجم مكتبة المركبات المفحوصة"])}:</span>
              <strong className="text-emerald-700 text-base font-extrabold">{scale.toLocaleString()} {pick(["Compounds", "مركب كيميائي"])}</strong>
            </div>
            
            <input 
              type="range" 
              min="50000" 
              max="5000000" 
              step="50000"
              value={scale}
              onChange={e => setScale(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600 focus:outline-none"
            />

            <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-2 font-semibold">
              <span>50,000</span>
              <span>1,000,000</span>
              <span>2,500,000</span>
              <span>5,000,000</span>
            </div>
          </div>

          {/* Algorithmic Phase Execution */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-mono font-bold text-slate-600 block">
                {pick(["Algorithmic Phase Execution", "مراحل المسار الحوسبي المتزامن"])}:
              </span>
              <span className="text-[11px] font-mono text-emerald-700 font-bold">100% Automated</span>
            </div>
            
            <div className="grid grid-cols-5 gap-2">
              {aiPipelineSteps.map((step, idx) => (
                <div key={step.step} className="p-2.5 rounded-xl bg-white border border-slate-200 text-center shadow-2xs">
                  <span className="font-mono text-[10px] font-bold text-emerald-700 block">{step.step}</span>
                  <span className="text-[11px] font-semibold text-slate-800 line-clamp-1 mt-1">{pick(step.name)}</span>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${80 + idx * 4}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Card: Target Molecule Profile */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-white via-emerald-50/20 to-teal-50/30 border-2 border-emerald-100 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block">TARGET PROTEIN</span>
              <strong className="text-sm font-bold text-slate-900">{currentTarget.name}</strong>
            </div>
            <span className="text-[11px] font-mono font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-md border border-emerald-300">
              {currentTarget.affinity}
            </span>
          </div>

          <div className="text-xs text-slate-600 font-medium">
            <span className="font-semibold text-slate-800">{pick(["Therapeutic Focus", "المجال العلاجي"])}:</span> {currentTarget.indication}
          </div>

          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <span className="text-[10px] text-slate-500 font-mono block">{pick(["Wet-Lab Cycle Time", "مدة الفحص المعملي"])}</span>
              <strong className="text-xl font-mono font-black text-emerald-700 mt-0.5 block">{timeWeeks} {pick(["WEEKS", "أسابيع"])}</strong>
              <span className="text-[10px] text-slate-400 block mt-0.5">{pick(["vs 4.5 Yrs Classical", "مقارنة بـ 4.5 سنوات"])}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <span className="text-[10px] text-slate-500 font-mono block">{pick(["In-Vitro Hit Rate", "دقة الفحص المخبري"])}</span>
              <strong className="text-xl font-mono font-black text-teal-700 mt-0.5 block">{currentTarget.hitRate}</strong>
              <span className="text-[10px] text-slate-400 block mt-0.5">{pick(["High Specificity", "نوعية عالية"])}</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-600 font-medium">{pick(["Sovereign GPU Compute", "الحوسبة السحابية الفائقة"])}:</span>
            <span className="font-bold text-slate-900">{gpuHours} H100 Hours</span>
          </div>

          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs font-mono">
            <span className="text-emerald-800 font-medium">{pick(["Predicted Binding Free Energy", "طاقة الارتباط المتوقعة"])}:</span>
            <strong className="text-emerald-700 font-extrabold">{currentTarget.affinity}</strong>
          </div>

          <Button 
            onClick={handleSimulate}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold h-10 shadow-sm cursor-pointer"
          >
            <Sparkles className={cn("size-3.5 me-1.5", isSimulating && "animate-spin")} />
            {isSimulating 
              ? pick(["Re-calculating Docking Energy...", "جاري حساب طاقة الارتباط..."]) 
              : pick(["Run In-Silico Docking Simulation", "تشغيل المحاكاة الجزيئية الافتراضية"])}
          </Button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   CINEMATIC COMPONENT 4: 3D PERSPECTIVE LAYER DECK FOR ROLE COCKPITS
   ========================================================================= */
export function InteractiveLayerDeck() {
  const { pick } = useLanguage();
  const [activeDeck, setActiveDeck] = useState<0 | 1 | 2 | 3>(0);

  const deckRoles = [
    { title: ["Fiduciary Donor Cockpit", "لوحة المانحين والشفافية"], icon: Landmark, tag: "AUDITED GIVING" },
    { title: ["National Volunteer Portal", "بوابة المتطوعين المعتمدة"], icon: Users, tag: "MINISTRY OF HRSD" },
    { title: ["Institutional Partner Alliance", "بوابة الشركاء والجامعات"], icon: Building2, tag: "COLLABORATION" },
    { title: ["Board of Directors Governance", "مجلس الإدارة والامتثال"], icon: ShieldCheck, tag: "NCNP #5421" }
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2.5 justify-center">
        {deckRoles.map((d, i) => {
          const isSelected = activeDeck === i;
          const DIcon = d.icon;
          return (
            <button
              key={i}
              onClick={() => setActiveDeck(i as any)}
              className={cn(
                "flex items-center gap-2.5 px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer",
                isSelected 
                  ? "bg-emerald-600 text-white shadow-md scale-105 ring-2 ring-emerald-300" 
                  : "bg-white text-slate-700 border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/40"
              )}
            >
              <DIcon className={cn("size-4", isSelected ? "text-white" : "text-emerald-700")} />
              <span>{pick(d.title)}</span>
            </button>
          );
        })}
      </div>

      <div className="perspective-container max-w-4xl mx-auto">
        <div className="deck-layer rounded-3xl border border-slate-200 bg-white p-6 md:p-10 shadow-2xl relative">
          {activeDeck === 0 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="font-mono text-xs font-bold text-emerald-700 uppercase">Fiduciary Transparency</span>
                  <h4 className="font-display text-2xl font-extrabold text-slate-900 mt-1">
                    {pick(["Direct Fund Utilization Breakdown", "أوجه الصرف والإنفاق المؤسسي المباشر"])}
                  </h4>
                </div>
                <span className="status-badge">
                  <CheckCircle2 className="size-3.5" />
                  {pick(["100% Policy Allocation", "تخصيص كامل 100%"])}
                </span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {portalSimulations.donor.financialBreakdown.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                    <span className="text-xs text-slate-600 font-semibold block">{pick(item.category)}</span>
                    <strong className="text-2xl font-mono font-extrabold text-slate-900 mt-1 block">
                      {item.percentage}%
                    </strong>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${item.percentage}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeDeck === 1 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="font-mono text-xs font-bold text-cyan-700 uppercase">National Volunteer Platform</span>
                  <h4 className="font-display text-2xl font-extrabold text-slate-900 mt-1">
                    {pick(["Certified Clinical & AI Tracks", "المسارات التطوعية السريرية والتقنية"])}
                  </h4>
                </div>
                <span className="status-badge">
                  {portalSimulations.volunteer.loggedHours} {pick(["Logged Hours", "ساعة معتمدة"])}
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {portalSimulations.volunteer.openTasks.map((t, i) => (
                  <div key={i} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] font-mono text-emerald-700 font-bold uppercase">{pick(t.track)}</span>
                      <strong className="block text-sm font-bold text-slate-900 mt-1">{pick(t.title)}</strong>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between">
                      <span className="text-xs text-slate-500 font-mono">{t.hours} hrs</span>
                      <Button size="sm" variant="outline" className="text-xs rounded-full">
                        {pick(["Apply", "تقديم"])}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeDeck === 2 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="font-mono text-xs font-bold text-emerald-700 uppercase">Institutional Alliances</span>
                  <h4 className="font-display text-2xl font-extrabold text-slate-900 mt-1">
                    {pick(["Active University & Hospital MoUs", "مذكرات التفاهم الأكاديمية والسريرية"])}
                  </h4>
                </div>
                <span className="status-badge">
                  {portalSimulations.partner.activeMous.length} {pick(["Active MoUs", "شراكات نشطة"])}
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {portalSimulations.partner.activeMous.map((m, i) => (
                  <div key={i} className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">{m.status}</span>
                    <strong className="block text-sm font-bold text-slate-900 mt-2">{pick(m.entity)}</strong>
                    <p className="text-xs text-slate-600 mt-1">{pick(m.scope)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeDeck === 3 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="font-mono text-xs font-bold text-emerald-700 uppercase">Statutory Governance</span>
                  <h4 className="font-display text-2xl font-extrabold text-slate-900 mt-1">
                    {pick(["NCNP Health Score & Risk Matrix", "مؤشرات الامتثال النظامي وإدارة المخاطر"])}
                  </h4>
                </div>
                <span className="status-badge">
                  99.2% NCNP Score
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                  <span className="text-xs uppercase font-bold text-slate-500 block mb-2">Compliance Pillars</span>
                  {portalSimulations.board.complianceStatus.map((c, i) => (
                    <div key={i} className="flex items-center justify-between text-xs p-2 rounded bg-white border border-slate-200">
                      <span className="font-semibold text-slate-800">{pick(c.category)}</span>
                      <span className="font-mono font-bold text-emerald-700">{c.score}%</span>
                    </div>
                  ))}
                </div>
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                  <span className="text-xs uppercase font-bold text-slate-500 block mb-2">Risk Mitigation Matrix</span>
                  {portalSimulations.board.riskMatrix.map((r, i) => (
                    <div key={i} className="flex items-center justify-between text-xs p-2 rounded bg-white border border-slate-200">
                      <span className="font-semibold text-slate-800">{pick(r.risk)}</span>
                      <span className="font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">{r.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   CINEMATIC COMPONENT 5: TACTILE THERMAL RECEIPT PRINTER (Physical Impact Simulator)
   ========================================================================= */
export function TactileImpactPrinter() {
  const { pick } = useLanguage();
  const [val, setVal] = useState(500);

  const devices = Math.max(1, Math.floor(val / 250));
  const gpuHours = Math.floor(val / 10);
  const fellows = Math.max(1, Math.floor(val / 1000));
  const dateStr = new Date().toISOString().split("T")[0];

  return (
    <div className="max-w-2xl mx-auto rounded-3xl border border-slate-200 bg-white p-6 md:p-10 shadow-2xl">
      <div className="text-center mb-8">
        <span className="eyebrow bg-emerald-50 text-emerald-800 border-emerald-300">
          <Sliders className="size-3.5 me-1" />
          {pick(["Tactile Impact Synthesizer", "طابعة الأثر الخيري المباشر"])}
        </span>
        <h3 className="font-display text-2xl md:text-3xl font-extrabold text-slate-900 mt-2">
          {pick(["Simulate & Print Your Impact Receipt", "حاكي تبرعك واستخرج سند الأثر المعتمد"])}
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          {pick(["Drag the slider to print a simulated official tax-exempt donation deed", "حرك المؤشر لطباعة سند تبرع موثق ومطابق لاشتراطات القطاع غير الربحي"])}
        </p>
      </div>

      <div className="space-y-4 mb-8">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase font-mono font-bold text-slate-500">Donation Level:</span>
          <strong className="text-3xl font-mono font-extrabold text-emerald-700">﷼{val.toLocaleString()}</strong>
        </div>

        <input 
          type="range" 
          min="100" 
          max="5000" 
          step="50" 
          value={val}
          onChange={e => setVal(Number(e.target.value))}
          className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
        />

        <div className="flex justify-between text-xs font-mono font-semibold text-slate-400">
          <span>﷼100</span>
          <span>﷼1,000</span>
          <span>﷼2,500</span>
          <span>﷼5,000</span>
        </div>
      </div>

      <div className="animate-receipt bg-amber-50/50 border-2 border-dashed border-amber-300/80 rounded-2xl p-6 font-mono text-xs text-slate-800 shadow-md relative">
        <div className="flex items-center justify-between border-b border-dashed border-amber-300/80 pb-3 mb-4">
          <div>
            <strong className="block text-sm font-extrabold uppercase text-slate-900">WAIWIM OFFICIAL RECEIPT</strong>
            <span className="text-[10px] text-slate-500">NCNP License #5421 • Riyadh, KSA</span>
          </div>
          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">TAX EXEMPT</span>
        </div>

        <div className="space-y-2 py-2">
          <div className="flex justify-between">
            <span>Date Issued:</span>
            <strong>{dateStr}</strong>
          </div>
          <div className="flex justify-between">
            <span>Donation Value:</span>
            <strong className="text-emerald-800 text-sm">﷼{val.toLocaleString()}.00 SAR</strong>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>• Hakeem Equipment Bank:</span>
            <strong>{devices} Devices Calibrated</strong>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>• HPC GPU Docking Hours:</span>
            <strong>{gpuHours} Hours AlphaFold</strong>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>• Clinical Scholar Training:</span>
            <strong>{fellows} Fellows Sponsored</strong>
          </div>
        </div>

        <div className="border-t border-dashed border-amber-300/80 pt-3 mt-4 flex items-center justify-between">
          <div className="text-[10px] text-slate-500">
            <span>BARCODE: ||||| | |||| ||| ||||</span>
          </div>
          <Button 
            size="sm" 
            onClick={() => alert(`Official deed for ﷼${val} generated with tracking code WAIWIM-${Math.floor(100000+Math.random()*900000)}`)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-xs font-bold"
          >
            {pick(["Generate Deed", "إصدار السند"])}
          </Button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   CINEMATIC COMPONENT 6: HERO 3D SPATIAL & MULTI-TELEMETRY STAGE
   ========================================================================= */
export function CinematicHeroStage() {
  const { pick } = useLanguage();
  const [activeStage, setActiveStage] = useState<0 | 1 | 2>(0);
  const [activePin, setActivePin] = useState<number | null>(null);
  const [targetDrug, setTargetDrug] = useState(0);
  const [affinityVal, setAffinityVal] = useState(-9.8);

  const stages = [
    { label: pick(["Sovereign Bio-Cluster", "عنقود الحوسبة الفائقة"]), icon: Cpu },
    { label: pick(["3D Molecular Docking", "محاكاة ثلاثية الأبعاد"]), icon: Dna },
    { label: pick(["Clinical Patient Impact", "الرعاية والوصول السريري"]), icon: HeartPulse }
  ];

  const pins = [
    { x: 24, y: 54, title: "1.2 PFLOPS GPU Cluster", desc: "NVIDIA H100 Bio-Cluster dedicated to AlphaFold-3 structural docking" },
    { x: 52, y: 64, title: "Holographic AI Console", desc: "Real-time generative molecular diffusion & binding affinity mapping" },
    { x: 76, y: 38, title: "Riyadh Genomics Hub", desc: "Saudi Vision 2030 National Sovereign Bio-Bank & AI Innovation Core" }
  ];

  const targets = [
    { name: "CDK2 Kinase", type: "Oncology", affinity: -10.4, rmsd: "0.82 Å", conf: "99.4%" },
    { name: "EGFR-L858R", type: "Precision Med", affinity: -9.8, rmsd: "0.76 Å", conf: "98.9%" },
    { name: "KRAS-G12D", type: "Rare Diseases", affinity: -11.6, rmsd: "0.91 Å", conf: "97.8%" }
  ];

  const curTarget = targets[targetDrug];

  return (
    <div className="space-y-3.5">
      {/* Interactive Command Switcher Bar */}
      <div className="flex items-center justify-between gap-2 p-1.5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-md">
        <div className="flex items-center gap-1 overflow-x-auto w-full">
          {stages.map((stg, i) => {
            const isSel = activeStage === i;
            const SIcon = stg.icon;
            return (
              <button
                key={i}
                onClick={() => { setActiveStage(i as any); setActivePin(null); }}
                className={cn(
                  "flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer whitespace-nowrap",
                  isSel 
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/25 scale-102" 
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                )}
              >
                <SIcon className={cn("size-3.5", isSel ? "text-white" : "text-slate-400")} />
                <span>{stg.label}</span>
              </button>
            );
          })}
        </div>
        <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[10px] font-mono font-bold text-emerald-800 border border-emerald-200 shrink-0">
          <span className="size-2 rounded-full bg-emerald-600 animate-ping" />
          LIVE TELEMETRY
        </span>
      </div>

      {/* Stage Visual Frame with Dynamic Laser Scanner & HUD Overlays */}
      <div className="relative rounded-3xl border-2 border-slate-200/90 bg-slate-100 shadow-2xl overflow-hidden h-[440px] sm:h-[480px] w-full flex items-center justify-center group">
        
        {/* Stage 0: Sovereign Supercomputer & Genomic Lab (Default Cinematic Mode) */}
        {activeStage === 0 && (
          <div className="relative w-full h-[440px] sm:h-[480px] overflow-hidden">
            <img 
              src="/images/saudi_genomic_supercomputer.jpg" 
              alt="Saudi AI Genomics Supercomputer Laboratory" 
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-1000" 
            />
            {/* Animated Laser Scanline Sweep */}
            <div className="scanline-overlay opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/20 pointer-events-none" />

            {/* Clickable Radar Hotspot Pins */}
            {pins.map((pin, pIdx) => (
              <div 
                key={pIdx} 
                className="hotspot-pin" 
                style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                onClick={() => setActivePin(activePin === pIdx ? null : pIdx)}
              >
                <div className="relative size-7 flex items-center justify-center cursor-pointer">
                  <span className="absolute inset-0 rounded-full bg-emerald-400/50 animate-radar-ping" />
                  <span className="size-3.5 rounded-full bg-emerald-600 border-2 border-white shadow-lg hover:scale-130 transition-transform" />
                </div>

                {activePin === pIdx && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 w-56 p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-emerald-400 text-slate-900 text-[11px] shadow-2xl z-30 animate-in fade-in zoom-in-95 duration-200 pointer-events-auto">
                    <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-200">
                      <strong className="text-emerald-800 font-bold">{pin.title}</strong>
                      <span className="text-[9px] font-mono font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded border border-emerald-300">ONLINE</span>
                    </div>
                    <span className="text-slate-600 text-[10px] leading-relaxed block">{pin.desc}</span>
                  </div>
                )}
              </div>
            ))}

            {/* Floating Top Left Telemetry Pill */}
            <div className="absolute top-4 left-4 animate-float pointer-events-none">
              <span className="hologram-pill bg-white/90 backdrop-blur-md text-slate-900 border-emerald-300 shadow-xl">
                <span className="size-2 rounded-full bg-emerald-600 animate-ping" />
                <span className="font-mono text-xs font-bold text-emerald-800">AlphaFold-3 Docking Engine</span>
                <span className="text-[10px] text-slate-500 font-mono">| 99.4% Conf</span>
              </span>
            </div>

            {/* Floating Top Right License Seal */}
            <div className="absolute top-4 right-4 animate-float-gentle pointer-events-none">
              <span className="hologram-pill bg-white/90 backdrop-blur-md text-slate-900 border-slate-200 shadow-xl">
                <ShieldCheck className="size-3.5 text-emerald-700" />
                <span className="font-mono text-[11px] font-bold text-slate-800">Saudi NCNP #5421</span>
              </span>
            </div>

            {/* Bottom Status Bar */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-200 shadow-lg text-slate-900">
                <Cpu className="size-4 text-emerald-700 animate-pulse" />
                <span className="text-slate-800 font-bold">NVIDIA H100 Bio-Cluster</span>
                <span className="text-emerald-700 font-extrabold">• 1.2 PFLOPS</span>
              </div>
              <span className="bg-emerald-600 text-white font-bold px-3 py-1.5 rounded-xl shadow-md hidden sm:inline-flex items-center gap-1.5 text-[11px]">
                <Sparkles className="size-3.5" />
                Click glowing dots to inspect
              </span>
            </div>
          </div>
        )}

        {/* Stage 1: 3D Bioluminescent Protein Docking Simulation */}
        {activeStage === 1 && (
          <div className="relative w-full h-full min-h-[400px] sm:min-h-[460px] overflow-hidden">
            <img 
              src="/images/molecular_docking_3d.jpg" 
              alt="3D Bioluminescent Molecular Docking Simulation" 
              className="w-full h-full min-h-[400px] sm:min-h-[460px] object-cover group-hover:scale-103 transition-transform duration-1000" 
            />
            <div className="scanline-overlay opacity-25" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/20 pointer-events-none" />

            {/* Top Interactive Target Selector */}
            <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 z-20">
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/90 backdrop-blur-md border border-slate-200 shadow-xl">
                {targets.map((t, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setTargetDrug(idx); setAffinityVal(t.affinity); }}
                    className={cn(
                      "px-2.5 py-1 rounded-lg font-mono text-[11px] font-bold transition-all cursor-pointer",
                      targetDrug === idx 
                        ? "bg-emerald-600 text-white shadow-sm" 
                        : "text-slate-700 hover:text-slate-950 hover:bg-slate-100"
                    )}
                  >
                    {t.name}
                  </button>
                ))}
              </div>

              <span className="hologram-pill bg-white/90 backdrop-blur text-emerald-800 border-emerald-300 text-xs font-mono shadow-md">
                <span className="size-2 rounded-full bg-emerald-600 animate-ping" />
                RMSD: {curTarget.rmsd}
              </span>
            </div>

            {/* Center Dynamic HUD Crosshair */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex flex-col items-center">
              <div className="relative size-32 rounded-full border-2 border-dashed border-emerald-400/60 flex items-center justify-center animate-spin" style={{ animationDuration: "25s" }}>
                <div className="size-24 rounded-full border border-teal-300/40" />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white">
                <span className="font-mono text-[10px] text-emerald-800 bg-white/90 px-2 py-0.5 rounded border border-emerald-300 shadow-sm font-bold">
                  LIGAND POCKET ACTIVE
                </span>
              </div>
            </div>

            {/* Bottom Interactive Binding Affinity Control Panel */}
            <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 text-slate-900 z-20 space-y-2 shadow-xl">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-700 flex items-center gap-1.5 font-semibold">
                  <Sliders className="size-3.5 text-emerald-700" />
                  Binding Free Energy (ΔG):
                </span>
                <strong className="text-emerald-700 text-sm font-extrabold">{affinityVal} kcal/mol</strong>
              </div>
              
              <input 
                type="range"
                min="-14"
                max="-6"
                step="0.1"
                value={affinityVal}
                onChange={e => setAffinityVal(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />

              <div className="flex items-center justify-between text-[10px] font-mono text-slate-600 pt-1 border-t border-slate-200">
                <span>Confidence: <strong className="text-slate-900">{curTarget.conf}</strong></span>
                <span>Type: <strong className="text-teal-700">{curTarget.type}</strong></span>
                <span className="text-emerald-700 font-bold">BioGNN-v3 Validated</span>
              </div>
            </div>
          </div>
        )}

        {/* Stage 2: Clinical Patient Impact Photo & Telemetry */}
        {activeStage === 2 && (
          <div className="relative w-full h-full min-h-[400px] sm:min-h-[460px] overflow-hidden">
            <img 
              src="/images/saudi_clinical_care.jpg" 
              alt="Saudi Healthcare Clinic and Patient Consultation" 
              className="w-full h-full min-h-[400px] sm:min-h-[460px] object-cover group-hover:scale-103 transition-transform duration-1000" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/20 pointer-events-none" />

            <div className="absolute top-4 left-4 animate-float pointer-events-none">
              <span className="hologram-pill bg-white/90 backdrop-blur-md text-slate-900 border-emerald-300 shadow-xl">
                <HeartPulse className="size-3.5 text-emerald-700 animate-pulse" />
                <span className="font-mono text-xs font-bold text-slate-800">Compassionate Patient Equity</span>
              </span>
            </div>

            <div className="absolute top-4 right-4 animate-float-gentle pointer-events-none">
              <span className="hologram-pill bg-emerald-600 text-white shadow-xl font-mono text-xs font-bold">
                100% Free Humanitarian Care
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono">
              <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border border-slate-200 shadow-md">
                <span className="text-slate-500 block text-[10px]">National Humanitarian Reach:</span>
                <strong className="text-emerald-700 text-sm font-extrabold">18,400+ Beneficiaries</strong>
              </div>
              <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border border-slate-200 shadow-md text-end">
                <span className="text-slate-500 block text-[10px]">Geographic Footprint:</span>
                <strong className="text-slate-900 text-sm font-extrabold">13 Saudi Provinces</strong>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
