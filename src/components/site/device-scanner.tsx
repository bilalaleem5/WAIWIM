import { useState, useEffect, useCallback } from "react";
import { Link } from "@tanstack/react-router";
import { 
  HeartPulse, Activity, ArrowRight, ShieldCheck, Zap, 
  CheckCircle2, RefreshCw, Cpu, Award, Play, Pause,
  Sliders, Gauge, Crosshair, Radio, Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "./language";
import { cn } from "@/lib/utils";

/* =========================================================================
   05 — HAKEEM BIOMEDICAL DEVICE BANK: ROBOTIC CALIBRATION & CLINICAL RIG
   - 100% Unique Architecture: Clinical Instrument Testing Console
   - Real-time SVG Multi-Waveform Medical Oscilloscope (Paw, Flow, Pleth)
   - Optical Robotic Calibration Workbench with Interactive Laser Reticles
   - SFDA Cryptographic Integrity Seal with Dynamic 4-Point Inspection Matrix
   - Continuous Kinetic Assembly Rail with 4-Second Auto-Cycle & Live Countdown
   - Pure White Light Aesthetic (Zero clunky boxed scanner lines, Zero card grids)
   ========================================================================= */

interface DeviceType {
  id: string;
  nameEn: string;
  nameAr: string;
  serial: string;
  peep: string;
  fio2: string;
  tidalVol: string;
  compliance: string;
  waveProfile: "ventilator" | "infusion" | "incubator";
}

interface StageStep {
  id: number;
  code: string;
  nameEn: string;
  nameAr: string;
  leadEn: string;
  leadAr: string;
  metricVal: string;
  metricLabelEn: string;
  metricLabelAr: string;
  reticleTarget: { x: string; y: string; labelEn: string; labelAr: string };
  statusNote: string;
}

export function BiomedicalDeviceFlow() {
  const { language, pick } = useLanguage();
  const [activeStage, setActiveStage] = useState<number>(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [selectedDeviceIdx, setSelectedDeviceIdx] = useState<number>(0);
  const [activeReticle, setActiveReticle] = useState<string | null>(null);
  const [cycleTick, setCycleTick] = useState<number>(0);

  // Device catalog for the clinical switcher
  const devices: DeviceType[] = [
    {
      id: "icu-vent",
      nameEn: "ICU Turbine Ventilator",
      nameAr: "جهاز تنفس صناعي للعناية المركزة",
      serial: "WAI-VENT-9042 // SFDA-MD-21",
      peep: "5.2 cmH2O",
      fio2: "99.8% O2",
      tidalVol: "485 mL",
      compliance: "44 mL/cmH2O",
      waveProfile: "ventilator"
    },
    {
      id: "infusion-pump",
      nameEn: "Volumetric Infusion Pump",
      nameAr: "مضخة تسريب حجمية دقيقة",
      serial: "WAI-PUMP-4029 // SFDA-MD-88",
      peep: "0.0 cmH2O",
      fio2: "Ambient",
      tidalVol: "120 mL/h",
      compliance: "±0.02 mL Error",
      waveProfile: "infusion"
    },
    {
      id: "incubator",
      nameEn: "Neonatal Intensive Incubator",
      nameAr: "حاضنة أطفال حديثي الولادة",
      serial: "WAI-NEO-7718 // SFDA-MD-05",
      peep: "3.5 cmH2O",
      fio2: "45.0% O2",
      tidalVol: "25 mL",
      compliance: "Thermal ±0.1°C",
      waveProfile: "incubator"
    }
  ];

  const currentDevice = devices[selectedDeviceIdx];

  // 4-Stage Clinical Verification Lifecycle
  const stages: StageStep[] = [
    {
      id: 0,
      code: "01",
      nameEn: "Intake & Sensor Triage",
      nameAr: "الاستلام والفرز الإلكتروني",
      leadEn: "Automated cryptographic RFID registration, electronic triage, and battery impedance diagnostics upon arrival.",
      leadAr: "تسجيل الأجهزة المستلمة برمز تعريف مشفر، وفحص بطاريات الليثيوم والحساسات الإلكترونية المبدئية.",
      metricVal: "100%",
      metricLabelEn: "Registry Traceability",
      metricLabelAr: "التوثيق الرقمي الكامل",
      reticleTarget: { 
        x: "24%", 
        y: "42%", 
        labelEn: "Micro-Impedance Sensor Probe", 
        labelAr: "مسبار قياس المقاومة والحساسات" 
      },
      statusNote: "TRIAGE: INITIAL DIAGNOSTIC RUN"
    },
    {
      id: 1,
      code: "02",
      nameEn: "ISO-13485 Robotic Calibration",
      nameAr: "المعايرة الروبوتية المعتمدة",
      leadEn: "Multi-axis robotic manipulators calibrate precision airway pressure transducers, microfluidics, and oxygen blenders.",
      leadAr: "أذرع روبوتية ذكية تضبط محولات ضغط الهواء، ومضخات الأكسجين، ومسارات السوائل بدقة جراحية.",
      metricVal: "840+ Units",
      metricLabelEn: "Certified Units",
      metricLabelAr: "جهاز معتمد سريرياً",
      reticleTarget: { 
        x: "52%", 
        y: "36%", 
        labelEn: "6-Axis Robotic Arm Calibration Head", 
        labelAr: "رأس المعايرة الروبوتية سداسي المحاور" 
      },
      statusNote: "CALIBRATING: TRANSDUCER NULL ±0.01%"
    },
    {
      id: 2,
      code: "03",
      nameEn: "Cleanroom UV-C Sterilization",
      nameAr: "التعقيم البلازمي والأشعة فوق البنفسجية",
      leadEn: "Hospital-grade UV-C germicidal irradiation and ozone chamber disinfection ensuring zero hospital-acquired infection risk.",
      leadAr: "تعقيم متطور بالأشعة فوق البنفسجية وغرف الأوزون للقضاء التام على الميكروبات وضمان بيئة معقمة.",
      metricVal: "0.0%",
      metricLabelEn: "Contamination Index",
      metricLabelAr: "مؤشر التلوث الجرثومي",
      reticleTarget: { 
        x: "68%", 
        y: "64%", 
        labelEn: "UV-C 254nm Plasma Chamber Seal", 
        labelAr: "غرفة التعقيم البلازمي 254 نانومتر" 
      },
      statusNote: "STERILE: ZERO BIOBURDEN CONFIRMED"
    },
    {
      id: 3,
      code: "04",
      nameEn: "13-Province Clinical Dispatch",
      nameAr: "التوزيع السحابي لـ 13 منطقة بالمملكة",
      leadEn: "Direct autonomous cold-chain transport to beneficiary hospitals and chronic patients with active IoT telemetry tracking.",
      leadAr: "شحن مباشر ومبرد لمستشفيات المملكة والمرضى المزمنين مع مراقبة سحابية حية لأداء الأجهزة.",
      metricVal: "13 Provinces",
      metricLabelEn: "National Reach",
      metricLabelAr: "تغطية شاملة للمملكة",
      reticleTarget: { 
        x: "82%", 
        y: "32%", 
        labelEn: "Encrypted IoT Cloud Telemetry Gateway", 
        labelAr: "بوابة الاتصال السحابي المشفرة" 
      },
      statusNote: "DISPATCH: ACTIVE SATELLITE TELEMETRY"
    }
  ];

  const currentStage = stages[activeStage];

  // Auto-cycle timer (4s per stage)
  const advanceStage = useCallback(() => {
    setActiveStage((prev) => (prev + 1) % stages.length);
    setCycleTick((prev) => prev + 1);
  }, [stages.length]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(advanceStage, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, advanceStage]);

  return (
    <section 
      id="biomedical-rig"
      className="relative w-full overflow-hidden bg-white border-b border-slate-200 transition-colors duration-700 py-16 sm:py-20 lg:py-24"
    >
      <div className="max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-12 space-y-10 lg:space-y-12">
        
        {/* =========================================================================
           TOP LEVEL: EDITORIAL HEADER & CLINICAL STATUS TELEMETRY (Zero Clutter)
           ========================================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-slate-200/90">
          <div className="max-w-3xl space-y-4 text-start">
            
            {/* Clinical Live Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-50/90 border border-emerald-200 text-emerald-950 text-[11px] sm:text-xs font-mono font-bold tracking-tight shadow-xs">
              <span className="relative flex size-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full size-2 bg-emerald-600" />
              </span>
              <HeartPulse className="size-3.5 text-emerald-700" />
              <span>
                {pick([
                  "HAKEEM BIOMEDICAL DEVICE BANK // CLINICAL RECALIBRATION RIG",
                  "بنك حكيم للأجهزة الطبية // منصة المعايرة والتدوير السريري"
                ])}
              </span>
            </div>

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-[3.25rem] font-display font-black text-slate-950 tracking-tight leading-[1.12]">
              {language === "ar" ? (
                <>
                  معايرة وإحياء الأجهزة الطبية وفق{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 via-teal-700 to-cyan-600">
                    أعلى المعايير السريرية
                  </span>
                </>
              ) : (
                <>
                  Hospital-Grade Biomedical Recalibration &{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 via-teal-700 to-cyan-600">
                    Clinical Deployment
                  </span>
                </>
              )}
            </h2>

            {/* Sub-description */}
            <p className="text-sm sm:text-base text-slate-700 font-normal leading-relaxed max-w-2xl">
              {pick([
                "Transforming idle ICU and respiratory medical equipment into life-saving clinical assets across Saudi Arabia with full SFDA verification and transparent provenance.",
                "إعادة تأهيل ومعايرة أجهزة العناية المركزة والتنفس الاصطناعي وفق المعايير العالمية لإنقاذ حياة المرضى في مختلف مناطق المملكة."
              ])}
            </p>
          </div>

          {/* Action Button & Live Telemetry Counter */}
          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <div className="hidden sm:flex flex-col items-end text-end font-mono">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">
                {language === "ar" ? "جاهزية المنصة" : "PLATFORM STATUS"}
              </span>
              <span className="text-xs font-black text-emerald-800 flex items-center gap-1.5">
                <ShieldCheck className="size-3.5 text-emerald-600" />
                SFDA ISO-13485 CERTIFIED
              </span>
            </div>

            <Button 
              asChild 
              className="rounded-full px-7 py-5 bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all hover:scale-102 cursor-pointer border border-slate-800"
            >
              <Link to="/programs">
                <span>{pick(["Explore Hakeem Bank", "استكشاف بنك حكيم"])}</span>
                <ArrowRight className="ml-2 rtl:rotate-180 size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>

        {/* =========================================================================
           CORE CLINICAL BENCH: MULTI-PARAMETRIC INSTRUMENT CONSOLE
           - 3 Integrated Surgical Columns:
             1. Real-Time Oscilloscope Monitor (Live SVG ventilator waveforms)
             2. Precision Optical Robotic Stage (Actual lab + interactive reticles)
             3. Cryptographic SFDA Seal & Real-Time Inspection Checklist
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* =======================================================================
             COLUMN 1: REAL-TIME CLINICAL OSCILLOSCOPE MONITOR (4 Cols)
             - Living medical curves (Airway Pressure, Microfluidic Flow, Plethysmograph)
             - Live digital gauges with micro-adjustments
             ======================================================================= */}
          <div className="lg:col-span-4 rounded-3xl bg-slate-950 p-5 sm:p-6 text-white shadow-2xl flex flex-col justify-between border border-slate-800 relative overflow-hidden group">
            
            {/* Top Oscilloscope Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-xs font-bold tracking-wider text-emerald-400">
                  OSCILLOSCOPE // CH-1
                </span>
              </div>

              {/* Device Selector Pill */}
              <div className="flex gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
                {devices.map((d, idx) => (
                  <button
                    key={d.id}
                    onClick={() => setSelectedDeviceIdx(idx)}
                    className={cn(
                      "px-2.5 py-1 rounded-lg text-[9px] font-mono font-bold transition-all cursor-pointer",
                      selectedDeviceIdx === idx 
                        ? "bg-emerald-600 text-white shadow-xs" 
                        : "text-slate-400 hover:text-white"
                    )}
                  >
                    {d.id === "icu-vent" ? "VENT" : d.id === "infusion-pump" ? "PUMP" : "NEO"}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Device Info */}
            <div className="py-3">
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                {language === "ar" ? "الجهاز تحت المعايرة" : "ACTIVE SPECIMEN"}
              </div>
              <div className="text-base sm:text-lg font-black text-white tracking-tight mt-0.5">
                {language === "ar" ? currentDevice.nameAr : currentDevice.nameEn}
              </div>
              <div className="text-[9px] font-mono text-emerald-400/90 mt-0.5">
                {currentDevice.serial}
              </div>
            </div>

            {/* LIVE ANIMATED WAVEFORM GRAPH (SVG CLINICAL CURVES) */}
            <div className="relative my-2 h-44 sm:h-48 w-full bg-slate-900/90 rounded-2xl p-3 border border-slate-800/90 overflow-hidden flex flex-col justify-between">
              
              {/* Oscilloscope Millimeter Grid */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                  backgroundImage: 'radial-gradient(circle, #34d399 0.8px, transparent 0.8px)',
                  backgroundSize: '16px 16px'
                }}
              />

              {/* Dynamic Sweep Beam Line */}
              <div className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-cyan-300 to-transparent shadow-[0_0_12px_#22d3ee] animate-pulse pointer-events-none left-1/2" />

              {/* Curve 1: Paw (Airway Pressure) */}
              <div className="relative z-10 space-y-1">
                <div className="flex justify-between text-[9px] font-mono font-bold text-emerald-400">
                  <span>Paw (cmH2O)</span>
                  <span>PEAK: 24.8</span>
                </div>
                <svg className="w-full h-12 overflow-visible" viewBox="0 0 300 48" preserveAspectRatio="none">
                  <path 
                    d="M 0 38 Q 20 38, 30 10 Q 40 8, 55 12 Q 70 38, 100 38 Q 120 38, 130 10 Q 140 8, 155 12 Q 170 38, 200 38 Q 220 38, 230 10 Q 240 8, 255 12 Q 270 38, 300 38" 
                    fill="none" 
                    stroke="#10b981" 
                    strokeWidth="2.5" 
                    strokeLinecap="round"
                    className="animate-waveform-flow"
                  />
                </svg>
              </div>

              {/* Curve 2: Flow Rate (L/min) */}
              <div className="relative z-10 space-y-1">
                <div className="flex justify-between text-[9px] font-mono font-bold text-cyan-400">
                  <span>Flow (L/min)</span>
                  <span>FLOW: +48.2</span>
                </div>
                <svg className="w-full h-10 overflow-visible" viewBox="0 0 300 40" preserveAspectRatio="none">
                  <path 
                    d="M 0 20 Q 15 20, 25 5 Q 35 35, 60 20 Q 100 20, 125 5 Q 135 35, 160 20 Q 200 20, 225 5 Q 235 35, 260 20 Q 290 20, 300 20" 
                    fill="none" 
                    stroke="#06b6d4" 
                    strokeWidth="2" 
                    strokeLinecap="round"
                    className="animate-waveform-flow"
                    style={{ animationDuration: '3.2s' }}
                  />
                </svg>
              </div>

              {/* Telemetry Clock Watermark */}
              <div className="relative z-10 flex justify-between text-[8px] font-mono text-slate-500 pt-1 border-t border-slate-800">
                <span>SWEEP: 25 mm/s</span>
                <span className="text-emerald-400 font-bold">CYCLE: {currentStage.code} / 04</span>
              </div>
            </div>

            {/* LIVE CLINICAL GAUGES GRID */}
            <div className="grid grid-cols-2 gap-2.5 pt-2">
              <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                <span className="text-[9px] text-slate-400 font-mono block">PEEP PRESSURE</span>
                <span className="text-sm font-black font-mono text-emerald-400">{currentDevice.peep}</span>
              </div>

              <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                <span className="text-[9px] text-slate-400 font-mono block">O2 PURITY (FiO2)</span>
                <span className="text-sm font-black font-mono text-cyan-400">{currentDevice.fio2}</span>
              </div>

              <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                <span className="text-[9px] text-slate-400 font-mono block">TIDAL VOLUME</span>
                <span className="text-sm font-black font-mono text-white">{currentDevice.tidalVol}</span>
              </div>

              <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                <span className="text-[9px] text-slate-400 font-mono block">CALIBRATION ERROR</span>
                <span className="text-sm font-black font-mono text-teal-300">{currentDevice.compliance}</span>
              </div>
            </div>

          </div>

          {/* =======================================================================
             COLUMN 2: PRECISION ROBOTIC BENCH & OPTICAL RETICLES (5 Cols)
             - High-resolution lab visual with clean light theme styling
             - Interactive targeting reticles with clinical measurement callouts
             - Zero ugly boxed scanlines; authentic clinical testing environment
             ======================================================================= */}
          <div className="lg:col-span-5 rounded-3xl bg-slate-50 border border-slate-200/90 shadow-xl overflow-hidden relative flex flex-col justify-between group min-h-[460px]">
            
            {/* Visual Viewport with Pure White Blend */}
            <div className="relative w-full h-full min-h-[420px] overflow-hidden">
              <img 
                src="/images/waiwim_medical_calibration_lab.jpg" 
                alt="Saudi Robotic Biomedical Calibration Laboratory" 
                className="w-full h-full object-cover object-center select-none transition-transform duration-700 group-hover:scale-[1.02]"
              />

              {/* Faint Vignette to ensure text readability without darkening canvas */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/30 pointer-events-none" />

              {/* Top Hub Location Pill */}
              <div className="absolute top-4 left-4 z-20">
                <div className="px-3.5 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-white font-mono text-[10px] font-bold flex items-center gap-2 shadow-lg">
                  <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>HUB: RIYADH_ROBOTIC_CALIBRATION_01</span>
                </div>
              </div>

              {/* Top Right Coordinate Tag */}
              <div className="absolute top-4 right-4 z-20 hidden sm:block">
                <div className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 text-slate-800 font-mono text-[10px] font-bold shadow-md">
                  <span>ISO-13485 • CLASS 100 CLEANROOM</span>
                </div>
              </div>

              {/* INTERACTIVE OPTICAL RETICLE 1: Robotic Arm */}
              <div 
                style={{ left: "50%", top: "42%" }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-30 group/reticle"
                onMouseEnter={() => setActiveReticle("arm")}
                onMouseLeave={() => setActiveReticle(null)}
              >
                <div className="relative size-8 rounded-full border-2 border-emerald-400 bg-emerald-500/20 backdrop-blur-xs flex items-center justify-center cursor-pointer shadow-[0_0_15px_#10b981] animate-reticle-pulse">
                  <Crosshair className="size-4 text-emerald-300" />
                  <span className="absolute -inset-1 rounded-full border border-emerald-400/50 animate-ping pointer-events-none" />
                </div>

                {/* Reticle Tooltip */}
                <div className={cn(
                  "absolute left-1/2 -translate-x-1/2 bottom-10 w-52 p-3 rounded-2xl bg-slate-950/95 backdrop-blur-xl border border-emerald-400/50 text-white shadow-2xl transition-all duration-300 pointer-events-none z-40 text-start",
                  activeReticle === "arm" ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                )}>
                  <div className="text-[10px] font-mono font-bold text-emerald-400 mb-0.5">ROBOTIC ALIGNMENT</div>
                  <div className="text-xs font-bold">6-Axis Calibration Head</div>
                  <div className="text-[9px] text-slate-300 mt-1">Accuracy: ±0.01mm across micro-actuators and valves.</div>
                </div>
              </div>

              {/* INTERACTIVE OPTICAL RETICLE 2: Laser Test Bed */}
              <div 
                style={{ left: "42%", top: "72%" }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-30 group/reticle"
                onMouseEnter={() => setActiveReticle("laser")}
                onMouseLeave={() => setActiveReticle(null)}
              >
                <div className="relative size-8 rounded-full border-2 border-cyan-400 bg-cyan-500/20 backdrop-blur-xs flex items-center justify-center cursor-pointer shadow-[0_0_15px_#22d3ee] animate-reticle-pulse">
                  <Gauge className="size-4 text-cyan-300" />
                  <span className="absolute -inset-1 rounded-full border border-cyan-400/50 animate-ping pointer-events-none" />
                </div>

                {/* Reticle Tooltip */}
                <div className={cn(
                  "absolute left-1/2 -translate-x-1/2 bottom-10 w-52 p-3 rounded-2xl bg-slate-950/95 backdrop-blur-xl border border-cyan-400/50 text-white shadow-2xl transition-all duration-300 pointer-events-none z-40 text-start",
                  activeReticle === "laser" ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                )}>
                  <div className="text-[10px] font-mono font-bold text-cyan-400 mb-0.5">PRESSURE OPTICS</div>
                  <div className="text-xs font-bold">Laser Transducer Test Bed</div>
                  <div className="text-[9px] text-slate-300 mt-1">Pressure Range: 0 to 120 cmH2O (Zero Drift Certified).</div>
                </div>
              </div>

              {/* Floating Bottom Laboratory Status Bar */}
              <div className="absolute bottom-4 inset-x-4 z-20">
                <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-950/85 backdrop-blur-xl border border-white/20 text-white flex items-center justify-between shadow-2xl">
                  <div className="space-y-0.5 text-start">
                    <div className="text-[9px] font-mono uppercase text-emerald-400 font-bold flex items-center gap-1.5">
                      <Sparkles className="size-3 text-emerald-400" />
                      <span>{currentStage.statusNote}</span>
                    </div>
                    <div className="text-xs font-bold text-slate-200">
                      {language === "ar" ? currentStage.reticleTarget.labelAr : currentStage.reticleTarget.labelEn}
                    </div>
                  </div>

                  <div className="px-3 py-1 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[10px] font-mono font-bold shrink-0">
                    {currentStage.metricVal}
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* =======================================================================
             COLUMN 3: CRYPTOGRAPHIC SFDA SEAL & VERIFICATION MATRIX (3 Cols)
             - Rotating cryptographic Saudi compliance seal
             - 4-Point live inspection checklist with progress indicators
             ======================================================================= */}
          <div className="lg:col-span-3 rounded-3xl bg-slate-50/90 border border-slate-200/90 p-5 sm:p-6 flex flex-col justify-between shadow-md text-start">
            
            {/* Top Seal Header */}
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div className="text-[10px] font-mono uppercase font-bold text-slate-500">
                  {language === "ar" ? "حوكمة الجودة" : "QUALITY ASSURANCE"}
                </div>
                <span className="text-[9px] font-mono bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                  SFDA #5421
                </span>
              </div>

              {/* CRYPTOGRAPHIC CONCENTRIC SEAL (Physical SVG Badge) */}
              <div className="relative py-6 flex items-center justify-center">
                <div className="relative size-32 sm:size-36 flex items-center justify-center">
                  
                  {/* Outer Monospace Text Ring */}
                  <svg className="absolute inset-0 size-full animate-seal-spin text-slate-400" viewBox="0 0 100 100">
                    <path
                      id="sealCurve"
                      d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                      fill="none"
                    />
                    <text className="text-[8px] font-mono font-bold uppercase tracking-[0.16em] fill-slate-600">
                      <textPath href="#sealCurve" startOffset="0%">
                        • SAUDI FOOD & DRUG AUTHORITY • SFDA • ISO-13485
                      </textPath>
                    </text>
                  </svg>

                  {/* Inner Technical Ring */}
                  <div className="absolute inset-3 rounded-full border border-dashed border-emerald-400/80 animate-seal-spin-reverse" />

                  {/* Center Gold-Standard Emblem */}
                  <div className="relative size-16 sm:size-18 rounded-full bg-gradient-to-br from-emerald-600 to-teal-800 text-white flex flex-col items-center justify-center shadow-lg border-2 border-white">
                    <ShieldCheck className="size-6 text-emerald-200" />
                    <span className="text-[8px] font-black tracking-widest mt-0.5 uppercase">VERIFIED</span>
                  </div>
                </div>
              </div>

              {/* Cryptographic Hash */}
              <div className="text-center font-mono text-[9px] text-slate-500 pb-3 border-b border-slate-200">
                <span>HASH: SHA-256//9A4B-883F-CLINICAL</span>
              </div>
            </div>

            {/* 4-POINT QUALITY VERIFICATION CHECKLIST */}
            <div className="space-y-3 py-3">
              <div className="text-[10px] font-mono font-bold uppercase text-slate-700 tracking-wider">
                {language === "ar" ? "فحوصات الاعتماد السريري" : "CLINICAL AUDIT MATRIX"}
              </div>

              {/* Audit 1 */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <span className="text-slate-700">1. Sensor Zero-Point Drift</span>
                  <span className="font-mono text-emerald-700">PASS (0.00)</span>
                </div>
                <div className="h-1.5 rounded-full bg-slate-200 overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full w-[99%]" />
                </div>
              </div>

              {/* Audit 2 */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <span className="text-slate-700">2. Flow Valve Calibration</span>
                  <span className="font-mono text-teal-700">PASS (99.8%)</span>
                </div>
                <div className="h-1.5 rounded-full bg-slate-200 overflow-hidden">
                  <div className="h-full bg-teal-500 rounded-full w-[98%]" />
                </div>
              </div>

              {/* Audit 3 */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <span className="text-slate-700">3. UV-C Bioburden Sterility</span>
                  <span className="font-mono text-cyan-700">STERILE (0.0%)</span>
                </div>
                <div className="h-1.5 rounded-full bg-slate-200 overflow-hidden">
                  <div className="h-full bg-cyan-500 rounded-full w-[100%]" />
                </div>
              </div>

              {/* Audit 4 */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <span className="text-slate-700">4. IoT Telemetry Tracking</span>
                  <span className="font-mono text-indigo-700">ACTIVE (13 Prov)</span>
                </div>
                <div className="h-1.5 rounded-full bg-slate-200 overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full w-[100%]" />
                </div>
              </div>
            </div>

            {/* Footer Badge */}
            <div className="pt-2 border-t border-slate-200 text-[10px] font-mono text-slate-500 flex items-center justify-between">
              <span>DISPATCH GRADE:</span>
              <span className="font-bold text-slate-900">MOH / ICU CLASS I</span>
            </div>

          </div>

        </div>

        {/* =========================================================================
           BOTTOM: CONTINUOUS KINETIC LIFECYCLE RAIL (Auto 4s Stepper Scrubber)
           - Seamless interactive timeline tracking all 4 stages
           - Live animated laser beam & micro-countdown timer
           - Zero disconnected generic cards
           ========================================================================= */}
        <div className="rounded-3xl bg-slate-50/80 border border-slate-200/90 p-5 sm:p-7 shadow-sm">
          
          {/* Rail Header with Auto-Play Controls */}
          <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-200/80">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
              <Radio className="size-4 text-emerald-600 animate-pulse" />
              <span>
                {language === "ar" 
                  ? "المسار الحركي لإعادة التدوير والمعايرة (دورة 4 ثوانٍ)" 
                  : "CONTINUOUS LIFECYCLE SCRUBBER // 4-SECOND AUTO-PIPELINE"}
              </span>
            </div>

            {/* Auto Play / Pause Toggle */}
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 text-[10px] font-mono font-bold transition-all shadow-xs cursor-pointer"
            >
              {isAutoPlaying ? (
                <>
                  <Pause className="size-3 text-emerald-600" />
                  <span>AUTO: 4S</span>
                </>
              ) : (
                <>
                  <Play className="size-3 text-slate-600" />
                  <span>PAUSED</span>
                </>
              )}
            </button>
          </div>

          {/* 4-STAGE CONTINUOUS STEPPER TRACK */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stages.map((s) => {
              const isActive = activeStage === s.id;
              return (
                <div
                  key={s.id}
                  onClick={() => {
                    setActiveStage(s.id);
                    setCycleTick((prev) => prev + 1);
                  }}
                  className={cn(
                    "p-4 sm:p-5 rounded-2xl transition-all duration-500 cursor-pointer border text-start relative overflow-hidden flex flex-col justify-between min-h-[160px]",
                    isActive
                      ? "bg-white border-emerald-500 shadow-xl ring-2 ring-emerald-500/20 scale-[1.02]"
                      : "bg-white/60 hover:bg-white border-slate-200 text-slate-600 hover:border-slate-300 shadow-xs"
                  )}
                >
                  {/* Top Stage & Metric */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={cn(
                        "text-[10px] font-mono font-bold px-2 py-0.5 rounded-md",
                        isActive ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-500"
                      )}>
                        STAGE {s.code}
                      </span>

                      <span className={cn("text-xs font-mono font-bold", isActive ? "text-emerald-700" : "text-slate-600")}>
                        {s.metricVal}
                      </span>
                    </div>

                    <h4 className={cn("text-sm font-bold tracking-tight mb-1", isActive ? "text-slate-950 font-black" : "text-slate-800")}>
                      {language === "ar" ? s.nameAr : s.nameEn}
                    </h4>

                    <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed font-normal">
                      {language === "ar" ? s.leadAr : s.leadEn}
                    </p>
                  </div>

                  {/* Active 4s Progress Countdown Bar Slot */}
                  <div className="mt-3 pt-2 border-t border-slate-100">
                    <div className="h-1 rounded-full bg-slate-100 overflow-hidden">
                      {isActive && isAutoPlaying ? (
                        <div 
                          key={`progress-${cycleTick}`}
                          className="h-full bg-emerald-500 animate-progress-4s rounded-full"
                        />
                      ) : (
                        <div className={cn("h-full rounded-full transition-all duration-300", isActive ? "bg-emerald-500 w-full" : "w-0")} />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
