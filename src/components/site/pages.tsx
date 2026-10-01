import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { 
  ArrowRight, ArrowUpRight, BadgeCheck, BrainCircuit, Building2, CalendarDays, 
  Check, CircleDollarSign, ClipboardCheck, Dna, FileText, FlaskConical, 
  GraduationCap, HandHeart, HeartPulse, Landmark, Lightbulb, Microscope, 
  Network, ShieldCheck, Stethoscope, Users, Workflow, Sparkles, AlertCircle,
  TrendingUp, Download, Eye, ChevronRight, Layers, Award, BarChart3, Cpu, CheckCircle2,
  FileCheck2, Sliders, Target, Compass, Briefcase, MessageCircle, Phone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/ai-pharma-lab.jpg";
import communityImage from "@/assets/community-health.jpg";
import workshopImage from "@/assets/innovation-workshop.jpg";
import researchImage from "@/assets/research-scientist.jpg";
import { 
  initiatives, fourPillars, pageIntro, reports, ui, 
  donationCampaigns, governanceInfo, portalSimulations,
  boardMembers, coreValues, institutionalGoals, visionAndMission,
  proposedStrategicInitiatives, strategyPillars, proposedWorkTeams,
  marketAndImpactData, contactDetails
} from "@/lib/site-content";
import { cn } from "@/lib/utils";
import { useLanguage } from "./language";
import { 
  AnimatedNumber, DownloadButton, GlassCard, PageHero, 
  ProgressBar, Section, SectionHeading, SmartForm,
  ParticleCanvas, InteractivePipeline, RoleDashboardViewer, VoiceMattersModal,
  Interactive3DMolecule, TiltCard, SaudiRegionalRadar, InteractiveDonationCalculator,
  CinematicMarqueeTelemetry, OrbitalPillarDial, MolecularSynthesizerRack,
  InteractiveLayerDeck, TactileImpactPrinter
} from "./primitives";
import { WaiwimSymbol, WaiwimLogo, WaiwimDotField } from "./brand";
import { WaiwimHeroSection } from "./hero-revamp";
import { FourOperatingAreas } from "./four-operating-areas";
import { MolecularGenerativeEngine } from "./molecular-engine";
import { BiomedicalDeviceFlow } from "./device-scanner";
import { SaudiGeospatialTelemetry } from "./geospatial-telemetry";
import { AlliancesConstellation } from "./alliances-constellation";
import { PublicationsLedger } from "./publications-ledger";

/* =========================================================================
   1. HOMEPAGE
   ========================================================================= */
export function HomePage() {
  const { language, pick } = useLanguage();
  const c = ui[language];
  const [voiceOpen, setVoiceOpen] = useState(false);
  const [selectedInitIdx, setSelectedInitIdx] = useState(0);

  const activeInit = initiatives[selectedInitIdx] ?? initiatives[0];
  const initiativeImages = [
    "/images/hakeem_medical_devices.jpg",
    "/images/saudi_genomic_supercomputer.jpg",
    "/images/molecular_docking_3d.jpg",
    "/images/ai_drug_discovery_lab.jpg",
    "/images/saudi_clinical_care.jpg",
    "/images/molecular_docking_3d.jpg"
  ];

  return (
    <>
      {/* 01 — REVAMPED 3D CINEMATIC HERO SECTION (Centered Bio-Sphere & Spatial Telemetry) */}
      <WaiwimHeroSection />

      {/* 02 — KINETIC TELEMETRY: Dual Stream Infinite Marquee Ribbon (Zero Card Grid) */}
      <section className="relative z-20">
        <CinematicMarqueeTelemetry />
      </section>

      {/* 03 — FOUR OPERATING AREAS & PUBLIC-INTEREST LABORATORY (Parallel Interactive Architecture) */}
      <FourOperatingAreas />

      {/* 04 — 3D MOLECULAR GENERATIVE ENGINE (AI Drug Discovery Laboratory, Zero Cards) */}
      <MolecularGenerativeEngine />

      {/* 05 — 3D BIOMEDICAL DEVICE RECALIBRATION FLOW (Hakeem Bank Clinical Diagnostics, Zero Cards) */}
      <BiomedicalDeviceFlow />

      {/* 06 — 3D SAUDI GEOSPATIAL TELEMETRY (Interactive Kingdom Radar, Zero Cards) */}
      <SaudiGeospatialTelemetry />

      {/* 07 — 3D ORBITAL CONSTELLATION OF STRATEGIC ALLIANCES (Zero Cards) */}
      <AlliancesConstellation />

      {/* 08 — CRYPTOGRAPHIC PUBLICATIONS & GOVERNANCE LEDGER (Kinetic Stream, Zero Cards) */}
      <PublicationsLedger />
    </>
  );
}

/* =========================================================================
   2. ABOUT US PAGE
   ========================================================================= */
export function AboutPage() {
  const { language, pick } = useLanguage();
  const intro = pageIntro.about;

  return (
    <>
      <PageHero 
        eyebrow={pick(["Institutional Profile", "الملف التعريفي المؤسسي"])}
        title={pick(intro[0])} 
        subtitle={pick(intro[1])} 
      >
        {/* Quick Institutional Credential Badges */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          {[
            { label: pick(["NCNP License #5421", "ترخيص رقم 5421 / المركز الوطني"]), icon: ShieldCheck },
            { label: pick(["Riyadh, Saudi Arabia", "الرياض، المملكة العربية السعودية"]), icon: Building2 },
            { label: pick(["4 Core Operating Pillars", "4 ركائز مؤسسية استراتيجية"]), icon: Layers },
            { label: pick(["98.8% Compliance Score", "98.8% معيار الامتثال والحوكمة"]), icon: Award },
          ].map((item, idx) => (
            <div 
              key={idx} 
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-50 text-slate-700 border border-slate-200/90 shadow-2xs"
            >
              <item.icon className="size-3.5 text-emerald-600 shrink-0" />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </PageHero>

      {/* 01 — WHO WE ARE & STRATEGIC MANDATE */}
      <Section className="py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <SectionHeading 
              badge={pick(["Identity & Mandate", "الهوية والرسالة"])}
              title={pick(["Who We Are", "من نحن"])} 
            />
            
            <p className="body-copy text-slate-700 leading-relaxed font-normal">
              {pick([
                "WAIWIM (With AI We Innovate Medicine) is a specialized Saudi non-profit association established under the supervisory authority of the National Center for Non-Profit Sector (NCNP #5421) and the Ministry of Human Resources and Social Development. We advance public health and biotechnology sovereignty by integrating artificial intelligence, pharmaceutical research, medical equipment reuse, and scientific education.",
                "وايويم — WAIWIM (بالذكاء الاصطناعي نبتكر الدواء) هي جمعية أهلية سعودية متخصصة مرخصة من المركز الوطني لتنمية القطاع غير الربحي (ترخيص رقم 5421) وتخضع للإشراف المباشر لمنظومة التحول الصحي. نعمل على تعزيز السيادة الصحية والدوائية للمملكة عبر دمج الذكاء الاصطناعي في البحث الصيدلاني، وتدوير الأجهزة الطبية، وتأهيل الكفاءات الوطنية المتخصصة."
              ])}
            </p>

            {/* Guiding Motto Callout Box */}
            <div className="my-6 p-6 rounded-2xl bg-gradient-to-r from-emerald-50/80 via-teal-50/50 to-white border border-emerald-200/70 shadow-2xs relative overflow-hidden">
              <div className="absolute top-0 end-0 p-4 opacity-10 text-emerald-800">
                <Sparkles className="size-16" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block mb-1">
                {pick(["Our Guiding Principle", "شعارنا ومبدأنا التوجيهي"])}
              </span>
              <p className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                "{pick([
                  "From Research to Innovation. From Innovation to Health Impact.",
                  "من البحث إلى الابتكار. ومن الابتكار إلى الأثر الصحي."
                ])}"
              </p>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {pick([
                  "Engineered as an audited digital governance and impact platform that delivers measurable, auditable results to donors, volunteers, partners, and the community.",
                  "صُممت الجمعية كمنصة رقمية مؤسسية محكومة تقدم نتائج مقاسة وقابلة للتدقيق لكافة المانحين والشركاء والمستفيدين."
                ])}
              </p>
            </div>

            {/* Official Credential Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {[
                pick(["NCNP Supervised", "إشراف المركز الوطني"]),
                pick(["Saudi Vision 2030 Health", "مواكبة برنامج التحول الصحي 2030"]),
                pick(["External CPA Audited", "تدقيق محاسبي قانوني مستقل"]),
                pick(["National Volunteer Portal Sync", "ربط مع منصة العمل التطوعي"]),
              ].map((tag, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                  <CheckCircle2 className="size-3 text-emerald-600" />
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-[28px] overflow-hidden border border-slate-200/90 shadow-xl bg-slate-900">
              <img 
                src={workshopImage} 
                alt={pick(["National AI drug discovery training workshop", "ورشة عمل وطنية في اكتشاف الأدوية بالذكاء الاصطناعي"])} 
                loading="lazy" 
                width={1280} 
                height={960} 
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 hover:scale-103"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 start-4 end-4 p-4 rounded-xl backdrop-blur-md bg-white/90 border border-white/40 shadow-lg">
                <span className="text-xs font-bold text-emerald-800 block">
                  {pick(["Thousand Miles Step • Scientific Cohort", "برنامج خطوة الألف ميل • الدفعة العلمية المتخصصة"])}
                </span>
                <span className="text-[11px] text-slate-600 block mt-0.5">
                  {pick(["Hands-on training in computational biology & molecular generative models", "تدريب تطبيقي على الحوسبة الحيوية والنماذج التوليدية الدوائية"])}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 02 — VISION & MISSION (State-of-the-art Dual Bento) */}
      <Section tone="mist" className="py-16 md:py-24">
        <div className="site-container">
          <SectionHeading 
            align="center"
            badge={pick(["Strategic Horizon", "الأفق الاستراتيجي"])}
            title={pick(["Institutional Vision & Mission", "الرؤية والرسالة المؤسسية"])} 
          />

          <div className="grid gap-8 md:grid-cols-2 mt-10">
            {/* Vision Card */}
            <div className="p-8 sm:p-10 rounded-[28px] bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between">
              <div>
                <div className="size-13 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-600 flex items-center justify-center mb-6 shadow-2xs">
                  <Lightbulb className="size-7" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700 block mb-2">
                  {pick(["Future Aspiration", "التطلع المستقبلي"])}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900">
                  {pick(["Our Vision", "رؤيتنا"])}
                </h3>
                <p className="mt-4 text-slate-600 leading-relaxed font-normal text-base">
                  {pick(visionAndMission.vision)}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-slate-500">
                <CheckCircle2 className="size-4 text-amber-500 shrink-0" />
                <span>{pick(["Aligned with Saudi Biotechnology Strategy 2030", "منسجمة مع الاستراتيجية الوطنية للتقنية الحيوية"])}</span>
              </div>
            </div>

            {/* Mission Card */}
            <div className="p-8 sm:p-10 rounded-[28px] bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between">
              <div>
                <div className="size-13 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-emerald-600 flex items-center justify-center mb-6 shadow-2xs">
                  <Workflow className="size-7" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-2">
                  {pick(["Operational Mandate", "المهام والعمليات"])}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900">
                  {pick(["Our Mission", "رسالتنا"])}
                </h3>
                <p className="mt-4 text-slate-600 leading-relaxed font-normal text-base">
                  {pick(visionAndMission.mission)}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-slate-500">
                <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                <span>{pick(["Measurable, auditable community & scientific outcomes", "مخرجات علمية ومجتمعية مقاسة ومدققة"])}</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 03 — CORE INSTITUTIONAL VALUES (4 Verified Values from Governance Charter) */}
      <Section className="py-16 md:py-24">
        <div className="site-container">
          <SectionHeading 
            align="center"
            badge={pick(["Ethical Foundation", "المبادئ التوجيهية"])}
            title={pick(["Our Core Institutional Values", "قيمنا المؤسسية الحاكمة"])} 
            subtitle={pick([
              "The 4 fundamental values established by the Board of Directors that guide our research and community engagement.",
              "القيم الأربع الأساسية المعتمدة من مجلس الإدارة التي توجه أبحاثنا ومبادراتنا المجتمعية."
            ])}
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-10">
            {coreValues.map((val, i) => (
              <div 
                key={i} 
                className="p-7 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="size-11 rounded-xl bg-emerald-50 border border-emerald-200/60 text-emerald-700 flex items-center justify-center mb-4 font-mono font-bold text-sm">
                    0{i + 1}
                  </div>
                  <h4 className="font-display text-lg font-bold text-slate-900">{pick(val.title)}</h4>
                  <p className="mt-2.5 text-sm text-slate-600 leading-relaxed font-normal">{pick(val.description)}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700">
                  <CheckCircle2 className="size-3" />
                  <span>{pick(["Board Approved Principle", "مبدأ معتمد من المجلس"])}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 04 — STRATEGIC INSTITUTIONAL GOALS */}
      <Section tone="mist" className="py-16 md:py-24">
        <div className="site-container">
          <SectionHeading 
            align="center"
            badge={pick(["Strategic Roadmap", "الأهداف المؤسسية"])}
            title={pick(["Our Strategic Goals", "الأهداف الاستراتيجية المعتمدة"])} 
            subtitle={pick([
              "Four core institutional pillars aligned with Saudi Vision 2030 and the National Biotechnology Strategy.",
              "أربعة أهداف استراتيجية رئيسية متوافقة مع رؤية المملكة 2030 والاستراتيجية الوطنية للتقنية الحيوية."
            ])}
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-10">
            {institutionalGoals.map((goal, i) => (
              <div key={i} className="p-7 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="size-10 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-700 flex items-center justify-center mb-4 font-mono font-bold text-xs">
                    GOAL 0{i + 1}
                  </div>
                  <h4 className="font-display text-base font-bold text-slate-900 leading-snug">{pick(goal.title)}</h4>
                  <p className="mt-2.5 text-xs text-slate-600 leading-relaxed">{pick(goal.description)}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                  <Target className="size-3" />
                  <span>{pick(["Vision 2030 KPI", "مؤشر أداء 2030"])}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 05 — GOVERNING BOARD OF DIRECTORS */}
      <Section className="py-16 md:py-24">
        <div className="site-container">
          <SectionHeading 
            align="center"
            badge={pick(["Leadership & Governance", "القيادة والحوكمة"])}
            title={pick(["Board of Directors", "مجلس الإدارة"])} 
            subtitle={pick([
              "The distinguished governing board leading WAIWIM under official NCNP license #5421.",
              "نخبة من القيادات الأكاديمية والصحية تدير الجمعية رسمياً بموجب ترخيص المركز الوطني رقم 5421."
            ])}
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-10 max-w-5xl mx-auto">
            {boardMembers.map((member, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="size-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4 font-bold text-base font-display">
                    {member.name[0].charAt(0)}
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 inline-block mb-2">
                    {pick(member.role)}
                  </span>
                  <h4 className="font-display text-lg font-bold text-slate-900 leading-tight">
                    {pick(member.name)}
                  </h4>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                    {pick(member.credentials || member.bio || ["", ""])}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
                  <ShieldCheck className="size-3.5 text-emerald-600" />
                  <span>{pick(["Verified NCNP Board Member", "عضو معتمد بالمركز الوطني"])}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 06 — SPECIALIZED WORK TEAMS */}
      <Section tone="mist" className="py-16 md:py-24">
        <div className="site-container">
          <SectionHeading 
            align="center"
            badge={pick(["Operational Committees", "فرق العمل المتخصصة"])}
            title={pick(["Specialized Operational Teams", "فرق العمل التنفيذية المقترحة"])} 
            subtitle={pick([
              "Multidisciplinary committees driving research, computational infrastructure, partnerships, and training.",
              "لجان متعددة التخصصات تقود الأبحاث، والبنية الحوسبية، والشراكات المؤسسية، والتدريب."
            ])}
          />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mt-10">
            {proposedWorkTeams.map((team, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="size-6 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold font-mono">
                      {i + 1}
                    </span>
                    <h4 className="font-display text-base font-bold text-slate-900">
                      {pick(team.title || team.name || ["", ""])}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {pick(team.description || team.scope || ["", ""])}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-semibold text-emerald-700 flex items-center gap-1.5">
                  <Briefcase className="size-3" />
                  <span>{pick(["Active Operational Scope", "نطاق عمل تنفيذي"])}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 07 — OFFICIAL LEGAL REGISTRY & ACCREDITATION */}
      <Section className="py-16 md:py-24">
        <div className="site-container">
          <SectionHeading 
            badge={pick(["Regulatory Adherence", "الامتثال والاعتماد الرسمي"])}
            title={pick(["Legal Registration & Official Status", "الوضع النظامي وبيانات التسجيل الرسمي"])} 
            subtitle={pick([
              "Complete institutional and regulatory disclosures according to NCNP non-profit standards.",
              "الإفصاحات الرسمية والبيانات التنظيمية وفق متطلبات المركز الوطني لتنمية القطاع غير الربحي."
            ])}
          />

          <div className="mt-8 p-8 md:p-10 rounded-[28px] bg-white border border-slate-200 shadow-sm">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                ["Official Legal Name", "الاسم النظامي الرسمي", governanceInfo.legalName[0], governanceInfo.legalName[1]],
                ["Legal Structure", "الشكل القانوني", governanceInfo.legalForm[0], governanceInfo.legalForm[1]],
                ["Supervisory Authority", "الجهة المشرفة على التأسيس", governanceInfo.supervisoryAuthority[0], governanceInfo.supervisoryAuthority[1]],
                ["Sector Regulator", "الجهة المشرفة فنياً", governanceInfo.sectorSupervision[0], governanceInfo.sectorSupervision[1]],
                ["Official License Number", "رقم الترخيص النظامي", governanceInfo.registrationNumber[0], governanceInfo.registrationNumber[1]],
                ["Governance Audit Score", "تقييم الامتثال بالمركز الوطني", governanceInfo.complianceScore[0], governanceInfo.complianceScore[1]],
                ["Independent Auditor", "المحاسب القانوني الخارجي المستقل", governanceInfo.externalAuditor[0], governanceInfo.externalAuditor[1]],
                ["Financial Year", "السنة المالية للجمعية", governanceInfo.financialYear[0], governanceInfo.financialYear[1]],
                ["Reporting Jurisdiction", "النطاق الجغرافي والأنظمة", "Kingdom of Saudi Arabia", "المملكة العربية السعودية"]
              ].map((x, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/80">
                  <span className="text-xs font-bold text-slate-500 block mb-1">{pick([x[0], x[1]])}</span>
                  <strong className="text-sm sm:text-base font-bold text-slate-900 block leading-tight font-mono">{pick([x[2], x[3]])}</strong>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-200">
              <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                <ShieldCheck className="size-4 text-emerald-600" />
                <span>{pick(["Officially Licensed by the National Center for Non-Profit Sector (NCNP #5421)", "مرخصة وموثقة رسمياً لدى المركز الوطني لتنمية القطاع غير الربحي (ترخيص رقم 5421)"])}</span>
              </div>
              <a
                href={`https://wa.me/966505210112?text=${encodeURIComponent(
                  language === "ar"
                    ? "السلام عليكم، أود طلب نسخة رسمية معتمدة من اللائحة الأساسية وشهادة الترخيص لجمعية بالذكاء الاصطناعي نبتكر الدواء (وايويم)."
                    : "Hello, I would like to request an official copy of WAIWIM's approved bylaws and license certificate."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors shadow-2xs"
              >
                <MessageCircle className="size-4 text-emerald-600" />
                <span>{pick(["Request Official Documents", "طلب الوثائق الرسمية المعتمدة"])}</span>
                <ArrowUpRight className="rtl:-scale-x-100 size-3.5" />
              </a>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

/* =========================================================================
   3. PROGRAMS & INITIATIVES PAGE
   ========================================================================= */
export function ProgramsPage() {
  const { language, pick } = useLanguage();
  const intro = pageIntro.programs;
  const [filter, setFilter] = useState("All");

  const categories = [
    "All", 
    "AI & Drug Innovation", 
    "Health Innovation", 
    "Research & Education", 
    "Community Health Impact"
  ];

  const filtered = filter === "All" 
    ? initiatives 
    : initiatives.filter(i => i.category[0] === filter);

  return (
    <>
      <PageHero 
        eyebrow={pick(["Execution & Impact", "التنفيذ والأثر الميداني"])}
        title={pick(intro[0])} 
        subtitle={pick(intro[1])} 
      >
        <div className="mt-8 flex flex-wrap items-center gap-3">
          {[
            { label: pick(["5 Governed Initiatives", "5 مبادرات مؤسسية نوعية"]), icon: Layers },
            { label: pick(["Audited Real-time KPIs", "مؤشرات أداء مدققة ومحدثة"]), icon: BarChart3 },
            { label: pick(["Independent Verification", "تحقق وتقييم مستقل"]), icon: ShieldCheck }
          ].map((item, idx) => (
            <div 
              key={idx} 
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-50 text-slate-700 border border-slate-200/90 shadow-2xs"
            >
              <item.icon className="size-3.5 text-emerald-600 shrink-0" />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </PageHero>

      <Section className="py-16 md:py-24">
        {/* Category Tabs */}
        <div className="mb-12 flex flex-wrap gap-2 justify-center p-1.5 rounded-full bg-slate-100 border border-slate-200/80 max-w-4xl mx-auto shadow-2xs">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                filter === cat 
                  ? "bg-emerald-600 text-white shadow-sm" 
                  : "text-slate-600 hover:text-slate-900 hover:bg-white"
              }`}
            >
              {cat === "All" ? pick(["All Initiatives", "كافة المبادرات"]) : cat}
            </button>
          ))}
        </div>

        {/* Detailed Standardized Initiative Profiles */}
        <div className="space-y-8">
          {filtered.map(item => (
            <div 
              key={item.id} 
              className="p-8 md:p-10 rounded-[32px] bg-white border border-slate-200/90 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.05)] hover:shadow-xl hover:border-emerald-300 transition-all duration-300"
            >
              <div className="grid gap-8 lg:grid-cols-[1.55fr_1fr]">
                <div>
                  <div className="flex flex-wrap items-center gap-2.5 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                      {pick(item.status)}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                      {pick(item.category)}
                    </span>
                  </div>

                  <h2 className="font-display text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight">
                    {pick(item.title)}
                  </h2>

                  <p className="mt-2 text-base font-semibold text-emerald-700">
                    {pick(item.tagline)}
                  </p>

                  <div className="mt-7 space-y-4">
                    {/* Problem Card */}
                    <div className="p-5 rounded-2xl bg-slate-50/90 border border-slate-200/80">
                      <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider flex items-center gap-2">
                        <AlertCircle className="size-3.5 text-amber-500" />
                        {pick(["The Challenge / Problem We Address", "التحدي الذي نعالجه"])}
                      </h4>
                      <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                        {pick(item.problem)}
                      </p>
                    </div>

                    {/* Solution Card */}
                    <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200/70">
                      <h4 className="font-bold text-emerald-900 text-xs uppercase tracking-wider flex items-center gap-2">
                        <CheckCircle2 className="size-3.5 text-emerald-600" />
                        {pick(["Our Governed Solution & Activities", "الحل المؤسسي والأنشطة المنفذة"])}
                      </h4>
                      <p className="text-sm text-slate-700 mt-2 leading-relaxed">
                        {pick(item.solution)}
                      </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 pt-1">
                      <div className="p-4 rounded-xl bg-slate-50/60 border border-slate-200/70">
                        <h4 className="font-bold text-slate-700 text-xs uppercase tracking-wider">
                          {pick(["Target Beneficiaries", "المستفيدون المستهدفون"])}
                        </h4>
                        <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                          {pick(item.targetBeneficiaries)}
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-50/60 border border-slate-200/70">
                        <h4 className="font-bold text-slate-700 text-xs uppercase tracking-wider">
                          {pick(["Key Strategic Partners", "الشركاء الاستراتيجيون"])}
                        </h4>
                        <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                          {pick(item.keyPartners)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right side KPIs & Reports */}
                <div className="flex flex-col justify-between rounded-2xl bg-slate-50 border border-slate-200/90 p-6 md:p-8">
                  <div>
                    <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-200/80">
                      <span className="text-xs uppercase font-extrabold text-emerald-800 tracking-wider">
                        {pick(["Verified Indicators", "مؤشرات الأداء المعتمدة"])}
                      </span>
                      <ShieldCheck className="size-4 text-emerald-600" />
                    </div>

                    <div className="space-y-4">
                      {item.kpis.map((kpi, idx) => (
                        <div key={idx} className="space-y-1.5 p-3 rounded-xl bg-white border border-slate-200/70 shadow-2xs">
                          <div className="flex justify-between text-xs font-semibold text-slate-700">
                            <span>{pick(kpi.label)}</span>
                            <span className="font-bold text-emerald-700 font-mono text-sm">{kpi.value}</span>
                          </div>
                          <ProgressBar value={kpi.progress} />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                    <span className="text-xs text-slate-500 font-semibold flex items-center gap-1.5">
                      <CheckCircle2 className="size-3.5 text-emerald-600" />
                      {pick(["NCNP Audited Initiative", "مبادرة محكومة ومعتمدة"])}
                    </span>
                    <a
                      href={`https://wa.me/966505210112?text=${encodeURIComponent(
                        language === "ar"
                          ? `السلام عليكم، أود الاستفسار عن مبادرة: (${item.title[1]}) التابعة لجمعية بالذكاء الاصطناعي نبتكر الدواء.`
                          : `Hello, I would like to inquire about the initiative: "${item.title[0]}" at WAIWIM.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors shadow-2xs"
                    >
                      <MessageCircle className="size-3.5 text-emerald-600" />
                      <span>{pick(["Inquire via WhatsApp", "استفسر عبر واتساب"])}</span>
                      <ArrowUpRight className="rtl:-scale-x-100 size-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Strategic Initiatives Roadmap (Client Verified Document) */}
      <Section tone="mist" className="py-16 md:py-24">
        <div className="site-container">
          <SectionHeading 
            align="center"
            badge={pick(["Strategic Pipeline", "المبادرات الاستراتيجية"])}
            title={pick(["Proposed Strategic Initiatives Roadmap", "المبادرات الاستراتيجية المقترحة"])} 
            subtitle={pick([
              "Flagship initiatives advancing pharmaceutical innovation, medical device circularity, and biotechnology accelerators.",
              "مبادرات رائدة لتعزيز الابتكار الدوائي، وتدوير الأجهزة الطبية، ومسرعات التقنية الحيوية."
            ])}
          />

          <div className="grid gap-6 md:grid-cols-2 mt-10">
            {proposedStrategicInitiatives.map((init, i) => (
              <div key={i} className="p-8 rounded-[28px] bg-white border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      INITIATIVE 0{i + 1}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 font-mono">
                      {pick(["Strategic Priority", "أولوية استراتيجية"])}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-slate-900 leading-snug">
                    {pick(init.title || init.name || ["", ""])}
                  </h3>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed font-normal">
                    {pick(init.description)}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1.5">
                    <Target className="size-3.5" />
                    {pick(["Vision 2030 Health Objective", "مستهدف صحي 2030"])}
                  </span>
                  <a
                    href={`https://wa.me/966505210112?text=${encodeURIComponent(
                      language === "ar"
                        ? `السلام عليكم، أود الاستفسار والمشاركة في: (${(init.title || init.name)?.[1] || ""}) لدى جمعية بالذكاء الاصطناعي نبتكر الدواء.`
                        : `Hello, I would like to inquire about: "${(init.title || init.name)?.[0] || ""}" at WAIWIM.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1"
                  >
                    <span>{pick(["Collaborate", "طلب مشاركة"])}</span>
                    <ArrowUpRight className="rtl:-scale-x-100 size-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Strategic Pillars (4 Pillars from Document) */}
      <Section className="py-16 md:py-24">
        <div className="site-container">
          <SectionHeading 
            align="center"
            badge={pick(["Institutional Framework", "الركائز الاستراتيجية"])}
            title={pick(["Strategic Pillars of the Society", "ركائز استراتيجية الجمعية"])} 
            subtitle={pick([
              "The four foundational pillars defining our operational mandates, partnerships, and scientific research.",
              "الركائز الأربع الحاكمة لعمليات الجمعية وشراكاتها المؤسسية وأبحاثها الصيدلانية."
            ])}
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-10">
            {strategyPillars.map((pillar, i) => (
              <div key={i} className="p-7 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="size-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4 font-mono font-bold text-xs">
                    PILLAR 0{i + 1}
                  </div>
                  <h4 className="font-display text-base font-bold text-slate-900 leading-snug">
                    {pick(pillar.title)}
                  </h4>
                  <p className="mt-2.5 text-xs text-slate-600 leading-relaxed font-normal">
                    {pick(pillar.description)}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                  <Compass className="size-3" />
                  <span>{pick(["Core Strategy Pillar", "ركيزة استراتيجية"])}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}

/* =========================================================================
   4. GOVERNANCE & TRANSPARENCY PAGE
   ========================================================================= */
export function GovernancePage() {
  const { language, pick } = useLanguage();
  const intro = pageIntro.governance;

  return (
    <>
      <PageHero 
        eyebrow={pick(["Fiduciary Stewardship", "الأمانة والحوكمة المؤسسية"])}
        title={pick(intro[0])} 
        subtitle={pick(intro[1])} 
      >
        <div className="mt-8 flex flex-wrap items-center gap-3">
          {[
            { label: pick(["General Assembly Mandated", "مفوض من الجمعية العمومية"]), icon: Landmark },
            { label: pick(["4 Standing Committees", "4 لجان مجلس دائمة"]), icon: Layers },
            { label: pick(["Public Conflict Register", "سجل تعارض مصالح محكوم"]), icon: FileCheck2 },
            { label: pick(["100% Disclosure Quorum", "اكتمال نصاب الإفصاح 100%"]), icon: ShieldCheck }
          ].map((item, idx) => (
            <div 
              key={idx} 
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-50 text-slate-700 border border-slate-200/90 shadow-2xs"
            >
              <item.icon className="size-3.5 text-emerald-600 shrink-0" />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </PageHero>

      {/* 01 — HIERARCHICAL GOVERNANCE ARCHITECTURE */}
      <Section className="py-16 md:py-24">
        <SectionHeading 
          badge={pick(["Hierarchical Structure", "الهيكل التنظيمي المعتمد"])}
          title={pick(["Nonprofit Governance Architecture", "هيكل حوكمة الجمعية وسلسلة المسؤولية"])} 
          subtitle={pick([
            "Our structure enforces clear lines of accountability, ensuring complete separation between strategy, supervisory auditing, and program execution.",
            "يفصل هيكل الحوكمة بوضوح بين التوجيه الاستراتيجي، والرقابة والمراجعة المستقلة، والتنفيذ الميداني للبرامج."
          ])}
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5 mt-10">
          {[
            ["General Assembly", "الجمعية العمومية", "Supreme institutional authority representing voting members."],
            ["Board of Directors", "مجلس الإدارة", "Elected fiduciary leadership overseeing strategy and legal compliance."],
            ["Board Committees", "لجان المجلس", "Specialized committees for audit, governance, programs, and research."],
            ["Executive Management", "الإدارة التنفيذية", "Day-to-day operations, financial management, and team leadership."],
            ["Programs & Initiatives", "البرامج والمبادرات", "Direct field execution, equipment banking, and research labs."]
          ].map(([en, ar, desc], i) => (
            <div 
              key={i} 
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-md hover:border-emerald-300 transition-all text-center flex flex-col items-center justify-between"
            >
              <div>
                <span className="size-9 rounded-full bg-emerald-600 text-white font-mono font-bold flex items-center justify-center text-sm shadow-sm mb-4 mx-auto">
                  0{i + 1}
                </span>
                <strong className="text-base text-slate-900 font-display font-bold block">{pick([en, ar])}</strong>
                <p className="text-xs text-slate-600 mt-2.5 leading-relaxed font-normal">{desc}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 w-full text-[11px] font-semibold text-emerald-700">
                {pick(["NCNP Mandated Level", "مستوى معتمد باللائحة"])}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 02 — STANDING BOARD COMMITTEES */}
      <Section tone="mist" className="py-16 md:py-24">
        <SectionHeading 
          badge={pick(["Independent Committees", "اللجان المتخصصة"])}
          title={pick(["Standing Board Committees", "لجان مجلس الإدارة الدائمة"])} 
          subtitle={pick([
            "Formally constituted under NCNP non-profit standards to provide specialized oversight and risk control.",
            "لجان معتمدة رسمياً وفق لوائح الحوكمة لتوفير الرقابة المتخصصة وإدارة المخاطر المؤسسية."
          ])}
        />

        <div className="grid gap-6 md:grid-cols-2 mt-10">
          {governanceInfo.committees.map((comm, idx) => (
            <div key={idx} className="p-8 rounded-[28px] bg-white border border-slate-200 shadow-2xs hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  <CheckCircle2 className="size-3 text-emerald-600" />
                  {comm.members}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                  {pick(["Active Charter", "ميثاق معتمد"])}
                </span>
              </div>
              <h3 className="font-display text-xl font-bold text-slate-900">
                {pick(comm.name)}
              </h3>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed font-normal">
                {pick(comm.charter)}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* 03 — CONFLICT OF INTEREST & FINANCIAL TRANSPARENCY */}
      <Section className="py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Conflict of Interest Card */}
          <div className="p-8 md:p-10 rounded-[28px] bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200 mb-4">
                <ShieldCheck className="size-3.5 text-emerald-600" />
                {pick(["Integrity & Compliance", "النزاهة والرقابة"])}
              </span>
              <h3 className="font-display text-2xl font-bold text-slate-900">
                {pick(["Conflict of Interest Policy", "سياسة تعارض المصالح والإفصاح"])}
              </h3>
              <p className="mt-4 text-slate-600 leading-relaxed font-normal text-sm sm:text-base">
                {pick([
                  "All board members, committee specialists, and executive personnel submit annual mandatory conflict-of-interest declarations. Any potential commercial or relational conflict is entered into the Society's public Conflict Register, and the affected party immediately recuses themselves from discussions and votes.",
                  "يقدم كافة أعضاء مجلس الإدارة واللجان والإدارة التنفيذية إقرارات سنوية ملزمة بعدم تعارض المصالح. يُسجل أي تعارض محتمل في سجل الجمعية للتعارض، ويتنحى العضو المعني فوراً عن المداولات والتصويت."
                ])}
              </p>
              <div className="mt-6 space-y-3">
                {[
                  ["Annual Mandatory Declarations", "إقرارات إفصاح سنوية ملزمة لجميع الأعضاء"],
                  ["Instant Recusal Mechanism in Minutes", "آلية تنحٍ موثقة بمحاضر الجلسات الرسمية"],
                  ["Audited Central Conflict Register", "سجل مركزي محكوم يخضع لتدقيق المحاسب القانوني"]
                ].map(([en, ar], i) => (
                  <div key={i} className="flex items-center gap-3 text-sm font-semibold text-slate-800 p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
                    <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                    <span>{pick([en, ar])}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-slate-200">
              <a
                href={`https://wa.me/966505210112?text=${encodeURIComponent(
                  language === "ar"
                    ? "السلام عليكم، أود طلب نسخة رسمية من سياسة تعارض المصالح لجمعية بالذكاء الاصطناعي نبتكر الدواء."
                    : "Hello, I would like to request an official copy of WAIWIM's Conflict of Interest Policy."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors shadow-2xs"
              >
                <MessageCircle className="size-3.5 text-emerald-600" />
                <span>{pick(["Request Official Policy Document", "طلب وثيقة السياسة المعتمدة"])}</span>
                <ArrowUpRight className="rtl:-scale-x-100 size-3" />
              </a>
            </div>
          </div>

          {/* Financial Expenditure Allocation Card */}
          <div className="p-8 md:p-10 rounded-[28px] bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200 mb-4">
                <BarChart3 className="size-3.5 text-emerald-600" />
                {pick(["Resource Stewardship", "كفاءة الإنفاق المالي"])}
              </span>
              <h3 className="font-display text-2xl font-bold text-slate-900">
                {pick(["Financial Expenditure Allocation", "توزيع النفقات والمصروفات المؤسسية"])}
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                {pick([
                  "Audited allocation ensuring maximum capital flows directly into health and scientific programs.",
                  "توزيع مالي مدقق يضمن توجيه الحصة الأكبر من الموارد مباشرة للبرامج الصحية والعلمية."
                ])}
              </p>

              {/* Stacked Allocation Bars */}
              <div className="mt-8 space-y-4">
                {[
                  {
                    title: ["Direct Healthcare & AI Programs", "البرامج الصحية والدوائية المباشرة"],
                    val: "82%",
                    color: "bg-emerald-600",
                    textColor: "text-emerald-700",
                    desc: ["Medical equipment recovery, calibration & clinical drug innovation", "تأمين ومعايرة الأجهزة وتطوير ابتكار الأدوية"]
                  },
                  {
                    title: ["Scientific Computing & Bio-Cluster Labs", "الحوسبة العلمية ومختبرات الفحص"],
                    val: "11%",
                    color: "bg-teal-500",
                    textColor: "text-teal-700",
                    desc: ["Supercomputing cloud credits & research training fellowships", "الحوسبة السحابية الفائقة وزمالات الباحثين"]
                  },
                  {
                    title: ["Governance, Audit & Operations", "الحوكمة والمراجعة والتشغيل"],
                    val: "7%",
                    color: "bg-amber-500",
                    textColor: "text-amber-700",
                    desc: ["Independent CPA audits, compliance & legal oversight", "المراجعة القانونية المستقلة وضبط الامتثال"]
                  }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs sm:text-sm font-bold text-slate-800">{pick(item.title)}</span>
                      <strong className={`font-mono text-base font-extrabold ${item.textColor}`}>{item.val}</strong>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden mb-2">
                      <div className={`h-full ${item.color} rounded-full`} style={{ width: item.val }} />
                    </div>
                    <p className="text-[11px] text-slate-500">{pick(item.desc)}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5 text-emerald-600" />
                <span>{pick(["Certified by Independent CPA", "مدقق ومصادق عليه محاسبياً"])}</span>
              </span>
              <a
                href={`https://wa.me/966505210112?text=${encodeURIComponent(
                  language === "ar"
                    ? "السلام عليكم، أود طلب نسخة رسمية من القوائم المالية المعتمدة لجمعية بالذكاء الاصطناعي نبتكر الدواء."
                    : "Hello, I would like to request an official copy of WAIWIM's certified financial statements."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors shadow-2xs"
              >
                <MessageCircle className="size-3.5 text-emerald-600" />
                <span>{pick(["Request Certified Statements", "طلب القوائم المعتمدة"])}</span>
                <ArrowUpRight className="rtl:-scale-x-100 size-3" />
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* 04 — GOVERNING BOARD ROSTER */}
      <Section tone="mist" className="py-16 md:py-24">
        <div className="site-container">
          <SectionHeading 
            align="center"
            badge={pick(["Fiduciary Leadership", "مجلس الإدارة المعتمد"])}
            title={pick(["Governing Board of Directors", "أعضاء مجلس الإدارة والقيادة المؤسسية"])} 
            subtitle={pick([
              "The elected fiduciaries accountable to the General Assembly and the National Center for Non-Profit Sector (NCNP #5421).",
              "المسؤولون التنظيميون المنتخبون أمام الجمعية العمومية والمركز الوطني لتنمية القطاع غير الربحي (ترخيص 5421)."
            ])}
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-10 max-w-5xl mx-auto">
            {boardMembers.map((member, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="size-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4 font-bold text-base font-display">
                    {member.name[0].charAt(0)}
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 inline-block mb-2">
                    {pick(member.role)}
                  </span>
                  <h4 className="font-display text-lg font-bold text-slate-900 leading-tight">
                    {pick(member.name)}
                  </h4>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                    {pick(member.credentials || member.bio || ["", ""])}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
                  <ShieldCheck className="size-3.5 text-emerald-600" />
                  <span>{pick(["Verified NCNP Board Member", "عضو معتمد بالمركز الوطني"])}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}

/* =========================================================================
   5. IMPACT DASHBOARD PAGE
   ========================================================================= */
export function ImpactPage() {
  const { language, pick } = useLanguage();
  const intro = pageIntro.impact;

  return (
    <>
      <PageHero 
        eyebrow={pick(["Verified Numbers", "أرقام ومخرجات موثقة"])}
        title={pick(intro[0])} 
        subtitle={pick(intro[1])} 
      >
        <div className="mt-8 flex flex-wrap items-center gap-3">
          {[
            { label: pick(["840+ Devices Logged", "840+ جهاز طبي مسجل"]), icon: BarChart3 },
            { label: pick(["1,280+ Training Hours", "1,280+ ساعة تدريب بحثي"]), icon: Award },
            { label: pick(["34% Adverse Event Reduction", "انخفاض 34% في المضاعفات"]), icon: ShieldCheck },
            { label: pick(["100% Audited Metrics", "مؤشرات مدققة بالكامل"]), icon: CheckCircle2 }
          ].map((item, idx) => (
            <div 
              key={idx} 
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-50 text-slate-700 border border-slate-200/90 shadow-2xs"
            >
              <item.icon className="size-3.5 text-emerald-600 shrink-0" />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </PageHero>

      <Section className="py-16 md:py-24">
        {/* Theory of Change */}
        <SectionHeading 
          align="center"
          badge={pick(["Methodological Framework", "المنهجية العلمية لقياس الأثر"])}
          title={pick(["Our Theory of Change: From Input to Impact", "نظرية التغيير: من المدخلات إلى الأثر المستدام"])} 
          subtitle={pick([
            "A structured value chain ensuring every contributed Riyal transforms into audited societal and clinical value.",
            "سلسلة قيمة منضبطة تضمن تحول كل ريال مدعوم إلى قيمة سريرية واجتماعية موثقة وقابلة للقياس."
          ])}
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5 mt-10">
          {[
            ["Inputs", "المدخلات", "Zakat, endowments, supercomputing clusters, volunteer physicians & researchers."],
            ["Activities", "الأنشطة", "Biomedical calibration, AI model training, clinical hackathons, hospital pilots."],
            ["Outputs", "المخرجات", "840+ devices logged, 420 scholars trained, 14 peer-reviewed papers."],
            ["Outcomes", "النتائج", "Zero hospital readmissions for equipment users, 34% fewer adverse reactions."],
            ["Long-term Impact", "الأثر المستدام", "National biotechnology sovereignty and equitable regional healthcare access."]
          ].map(([titleEn, titleAr, desc], i) => (
            <div key={i} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-md hover:border-emerald-300 transition-all text-center flex flex-col items-center justify-between">
              <div>
                <span className="size-9 rounded-full bg-emerald-600 text-white font-mono font-bold flex items-center justify-center text-sm shadow-sm mb-4 mx-auto">
                  0{i + 1}
                </span>
                <strong className="text-base text-slate-900 font-display font-bold block">
                  {pick([titleEn, titleAr])}
                </strong>
                <p className="text-xs text-slate-600 mt-2.5 leading-relaxed font-normal">
                  {desc}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 w-full text-[11px] font-semibold text-emerald-700">
                {pick(["Audited Step", "مرحلة مقاسة وموثقة"])}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Live Impact Explorer */}
      <Section tone="mist" className="py-16 md:py-24">
        <div className="site-container">
          <SectionHeading 
            align="center"
            badge={pick(["Audited Performance", "الأداء الميداني"])}
            title={pick(["Consolidated Initiative Metric Registry", "سجل المؤشرات الموحد للمبادرات"])} 
            subtitle={pick([
              "Real-time operational KPIs recorded across our five core programmatic units.",
              "مؤشرات الأداء التشغيلية المسجلة عبر الوحدات البرامجية الخمس للجمعية."
            ])}
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-10">
            {initiatives.map(item => (
              <div key={item.id} className="p-7 rounded-[28px] bg-white border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                      {pick(item.category)}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                      <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      {pick(item.status)}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-slate-900 mt-1">
                    {pick(item.title)}
                  </h3>
                  <div className="mt-5 space-y-2.5">
                    {item.kpis.map((k, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="text-slate-600 font-medium">{pick(k.label)}</span>
                        <strong className="font-mono text-sm text-emerald-700 font-bold">{k.value}</strong>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="size-3.5 text-emerald-600" />
                    {pick(["Audited Metric", "مؤشر مدقق"])}
                  </span>
                  <Link to="/programs" className="font-semibold text-emerald-600 hover:text-emerald-700">
                    {pick(["View Initiative →", "تفاصيل المبادرة ←"])}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}

/* =========================================================================
   6. RESEARCH & ACCELERATOR PAGE
   ========================================================================= */
export function ResearchPage() {
  const { language, pick } = useLanguage();
  const intro = pageIntro.research;

  return (
    <>
      <PageHero 
        eyebrow={pick(["Scientific Frontier", "الريادة العلمية والحوسبية"])}
        title={pick(intro[0])} 
        subtitle={pick(intro[1])} 
      >
        <div className="mt-8 flex flex-wrap items-center gap-3">
          {[
            { label: pick(["AI Generative Chemistry", "الكيمياء التوليدية بالذكاء الاصطناعي"]), icon: BrainCircuit },
            { label: pick(["AlphaFold Structure Prediction", "نمذجة التركيب البروتيني"]), icon: FlaskConical },
            { label: pick(["GPU Supercomputing", "حوسبة سحابية فائقة"]), icon: Cpu },
            { label: pick(["SFDA Preclinical Pathway", "المسار التنظيمي للغذاء والدواء"]), icon: ShieldCheck }
          ].map((item, idx) => (
            <div 
              key={idx} 
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-50 text-slate-700 border border-slate-200/90 shadow-2xs"
            >
              <item.icon className="size-3.5 text-emerald-600 shrink-0" />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </PageHero>

      <Section className="py-16 md:py-24">
        <InteractivePipeline />
      </Section>

      {/* AI Drug Innovation Accelerator Details */}
      <Section tone="mist" className="py-16 md:py-24">
        <div className="site-container">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading 
                badge={pick(["Commercial Translation", "التحول التجاري للابتكار"])}
                title={pick(["AI Drug Innovation Accelerator Framework", "إطار عمل مُسرّعة الابتكار الدوائي"])} 
                subtitle={pick([
                  "Bridging the 'Valley of Death' between university computational biology discoveries and clinical translation.",
                  "سد الفجوة بين اكتشافات الحوسبة الحيوية الأكاديمية والترخيص السريري المعتمد."
                ])}
              />
              <p className="body-copy text-slate-700 leading-relaxed font-normal">
                {pick([
                  "Our 9-month accelerator program equips promising researchers and biotech entrepreneurs with GPU supercomputing clusters, wet lab validation partnerships with teaching hospitals, and bespoke regulatory pathways aligned with SFDA standards.",
                  "يوفر برنامج المسرعة لمدة 9 أشهر للباحثين ورواد الأعمال الوصول للحوسبة الفائقة، وشراكات الفحص المخبري مع المستشفيات الجامعية، ومسارات الامتثال التنظيمي المعتمدة من هيئة الغذاء والدواء."
                ])}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl px-5 h-11 shadow-sm transition-all hover:scale-102">
                  <Link to="/contact">{pick(["Apply for Next Cohort", "التقديم على الدفعة القادمة"])}</Link>
                </Button>
                <a
                  href={`https://wa.me/966505210112?text=${encodeURIComponent(
                    language === "ar"
                      ? "السلام عليكم، أود الاستفسار عن دليل مسرعة الابتكار الدوائي وبرنامج الدفعات القادمة لدى جمعية بالذكاء الاصطناعي نبتكر الدواء."
                      : "Hello, I would like to inquire about the AI Drug Innovation Accelerator prospectus at WAIWIM."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors shadow-2xs h-11"
                >
                  <MessageCircle className="size-4 text-emerald-600" />
                  <span>{pick(["Inquire via WhatsApp", "طلب الدليل عبر واتساب"])}</span>
                  <ArrowUpRight className="rtl:-scale-x-100 size-3.5" />
                </a>
              </div>
            </div>

            <div className="p-8 sm:p-10 rounded-[28px] bg-white border border-slate-200 shadow-sm space-y-4">
              <h4 className="font-display text-xl font-bold text-slate-900 mb-2">
                {pick(["Accelerator Support Tracks", "مسارات دعم المسرعة"])}
              </h4>
              {[
                ["High-Performance AI Compute", "الحوسبة الفائقة ونماذج الذكاء الاصطناعي", "Direct GPU cluster credits for molecular modeling and virtual screening."],
                ["Wet Lab Bio-Assay Validation", "الفحص والتحقق المخبري الرطب", "Matching with accredited pharmaceutical university laboratories."],
                ["SFDA Regulatory Guidance", "الامتثال لهيئة الغذاء والدواء", "Advisory on preclinical dossier preparation and ethical approvals."],
                ["Seed Venture Philanthropy", "التمويل الأولي الاستثماري", "Up to SAR 500,000 in non-dilutive translation seed grants."]
              ].map(([en, ar, desc], i) => (
                <div key={i} className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 hover:border-emerald-300 transition-colors">
                  <strong className="text-slate-900 text-sm block font-bold">{pick([en, ar])}</strong>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Global Market Projections ($45B by 2030) from Document */}
      <Section className="py-16 md:py-24">
        <div className="site-container">
          <SectionHeading 
            align="center"
            badge={pick(["Market Horizon", "أفق السوق العالمي"])}
            title={pick(["Global AI Drug Discovery Market Outlook", "حجم وأفق سوق اكتشاف الأدوية بالذكاء الاصطناعي"])} 
            subtitle={pick([
              "Verified global projections: $45 Billion valuation by 2030 with a 25-30% Compound Annual Growth Rate.",
              "بيانات السوق الموثقة: وصول القيمة إلى 45 مليار دولار بحلول 2030 بمعدل نمو سنوي مركب 25-30%."
            ])}
          />

          <div className="grid gap-6 sm:grid-cols-3 mt-10">
            <div className="p-8 rounded-[28px] bg-emerald-950 text-white shadow-xl flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold block mb-2">
                  {pick(["Market Valuation", "القيمة السوقية المتوقعة"])}
                </span>
                <strong className="font-display text-4xl sm:text-5xl font-extrabold text-white block">
                  {marketAndImpactData.globalMarketSize.valuation}
                </strong>
                <p className="mt-4 text-xs text-emerald-200 leading-relaxed font-normal">
                  {pick(marketAndImpactData.globalMarketSize.forecast)}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-emerald-800/80 text-[11px] font-mono text-emerald-300">
                CAGR: {marketAndImpactData.globalMarketSize.growthRate}
              </div>
            </div>

            <div className="p-8 rounded-[28px] bg-white border border-slate-200 shadow-2xs flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-amber-700 font-bold block mb-2">
                  {pick(["Timeline Compression", "تسريع الجداول الزمنية"])}
                </span>
                <strong className="font-display text-4xl sm:text-5xl font-extrabold text-slate-900 block">
                  {marketAndImpactData.globalMarketSize.timelineReduction}
                </strong>
                <p className="mt-4 text-xs text-slate-600 leading-relaxed font-normal">
                  {pick(["Reduction in initial pharmaceutical target discovery and candidate optimization cycles.", "تقليص زمن مراحل الاستكشاف الأولي وتطوير المركبات الدوائية الواعدة."])}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] font-semibold text-emerald-700">
                {pick(["Virtual Molecular Screening", "الفحص الجزيئي الافتراضي"])}
              </div>
            </div>

            <div className="p-8 rounded-[28px] bg-white border border-slate-200 shadow-2xs flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-teal-700 font-bold block mb-2">
                  {pick(["Capital Efficiency", "كفاءة الإنفاق البحثي"])}
                </span>
                <strong className="font-display text-4xl sm:text-5xl font-extrabold text-slate-900 block">
                  {marketAndImpactData.globalMarketSize.costReduction}
                </strong>
                <p className="mt-4 text-xs text-slate-600 leading-relaxed font-normal">
                  {pick(["Reduction in preclinical development cost through precision in silico screening.", "خفض تكاليف مراحل ما قبل التجارب السريرية عبر النمذجة الحاسوبية الدقيقة."])}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] font-semibold text-emerald-700">
                {pick(["SFDA Preclinical Alignment", "تكامل ما قبل السريري"])}
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

/* =========================================================================
   7. STRATEGIC PARTNERSHIPS PAGE
   ========================================================================= */
export function PartnershipsPage() {
  const { language, pick } = useLanguage();
  const intro = pageIntro.partnerships;

  return (
    <>
      <PageHero 
        eyebrow={pick(["Institutional Alliances", "التحالفات الاستراتيجية"])}
        title={pick(intro[0])} 
        subtitle={pick(intro[1])} 
      >
        <div className="mt-8 flex flex-wrap items-center gap-3">
          {[
            { label: pick(["Academic Research MOUs", "مذكرات تفاهم أكاديمية"]), icon: GraduationCap },
            { label: pick(["Teaching Hospitals", "المستشفيات التعليمية والتخصصية"]), icon: Building2 },
            { label: pick(["Pharma Manufacturers", "مصانع الدواء الوطنية"]), icon: FlaskConical },
            { label: pick(["Government Entities", "الجهات الحكومية المشرفة"]), icon: Landmark }
          ].map((item, idx) => (
            <div 
              key={idx} 
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-50 text-slate-700 border border-slate-200/90 shadow-2xs"
            >
              <item.icon className="size-3.5 text-emerald-600 shrink-0" />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </PageHero>

      <Section className="py-16 md:py-24">
        <SectionHeading 
          align="center"
          badge={pick(["Collaboration Models", "نماذج الشراكة المؤسسية"])}
          title={pick(["How Institutions Collaborate With Us", "مسارات التعاون المؤسسي"])} 
          subtitle={pick([
            "Institutional engagement models designed for universities, hospitals, pharmaceutical firms, and philanthropic funds.",
            "مسارات شراكة مرنة مصممة للجامعات، والمستشفيات، والمصانع الدوائية، والجهات المانحة."
          ])}
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-10">
          {[
            ["Academic Research MOUs", "مذكرات التفاهم البحثية", "Joint algorithmic modeling, data sharing, and scientific publications with universities."],
            ["Clinical Hospital Pilots", "التجارب السريرية في المستشفيات", "Deploying Hakeem equipment banks and personalized pharmacogenomics in care facilities."],
            ["CSR & Venture Philanthropy", "المسؤولية الاجتماعية والأوقاف", "Direct corporate sponsorship of high-impact medical initiatives and training cohorts."],
            ["Pharma Industrial Scaling", "التصنيع الدوائي المشترك", "Partnering with domestic pharmaceutical factories to validate AI-generated drug leads."]
          ].map(([en, ar, desc], i) => (
            <div key={i} className="p-7 rounded-[28px] bg-white border border-slate-200 shadow-2xs hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-emerald-700 size-8 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-4">
                  0{i + 1}
                </span>
                <h3 className="font-display text-lg font-bold text-slate-900 mt-2">{pick([en, ar])}</h3>
                <p className="text-sm text-slate-600 mt-2.5 leading-relaxed font-normal">{desc}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-emerald-700 flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5" />
                <span>{pick(["Formal MOU Framework", "إطار مذكرات تفاهم معتمد"])}</span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="mist" className="py-16 md:py-24">
        <div className="max-w-2xl mx-auto">
          <SectionHeading 
            align="center"
            badge={pick(["Partnership Request", "طلب شراكة رسمية"])}
            title={pick(["Initiate an Institutional Partnership", "تقديم طلب تعاون مؤسسي"])} 
            subtitle={pick([
              "Submit your organization's collaboration proposal. Our Partnerships Committee will respond within 3 business days.",
              "قدّم مقترح الشراكة المؤسسي لجهتك. ستقوم لجنة الشراكات بالتواصل معكم خلال 3 أيام عمل."
            ])}
          />
          <div className="mt-8 p-8 md:p-10 rounded-[28px] bg-white border border-slate-200 shadow-sm">
            <SmartForm 
              fields={[
                { name: "orgName", label: pick(["Organization Name", "اسم الجهة أو المؤسسة"]), required: true },
                { name: "orgType", label: pick(["Organization Type", "نوع الجهة"]), type: "select", options: ["University / Research Chair", "Specialist Hospital / Medical Center", "Government Agency", "Pharmaceutical Manufacturer", "Philanthropic Foundation"], required: true },
                { name: "contactName", label: pick(["Contact Person & Title", "اسم المسؤول والصفة الوظيفية"]), required: true },
                { name: "email", label: pick(["Official Email", "البريد الإلكتروني الرسمي"]), type: "email", required: true },
                { name: "proposal", label: pick(["Partnership Scope & Objectives", "نطاق الشراكة المقترحة والأهداف المشتركة"]), type: "textarea", required: true }
              ]}
              submitLabel={pick(["Submit Partnership Request", "إرسال طلب الشراكة"])}
              recipientEmail="info@aimedicine.org.sa"
              subjectPrefix={pick(["[Partnership Proposal]", "[مقترح شراكة مؤسسية]"])}
              successMessage={pick([
                "Your partnership proposal has been submitted. Our Partnerships Committee will respond within 3 business days.",
                "تم تقديم مقترح الشراكة بنجاح. ستقوم لجنة الشراكات بالتواصل معكم خلال 3 أيام عمل."
              ])}
            />
          </div>
        </div>
      </Section>
    </>
  );
}

/* =========================================================================
   8. VOLUNTEER IMPACT PORTAL PAGE
   ========================================================================= */
export function VolunteerPage() {
  const { language, pick } = useLanguage();
  const intro = pageIntro.volunteer;

  return (
    <>
      <PageHero 
        eyebrow={pick(["National Volunteerism", "العمل التطوعي الوطني التخصصي"])}
        title={pick(intro[0])} 
        subtitle={pick(intro[1])} 
      >
        <div className="mt-8 flex flex-wrap items-center gap-3">
          {[
            { label: pick(["National Platform Synced", "ربط مباشر بالمنصة الوطنية"]), icon: ShieldCheck },
            { label: pick(["Verified Hours Certificate", "شهادات ساعات معتمدة"]), icon: Award },
            { label: pick(["Clinical & Tech Tracks", "مسارات صحية وتقنية"]), icon: BrainCircuit }
          ].map((item, idx) => (
            <div 
              key={idx} 
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-50 text-slate-700 border border-slate-200/90 shadow-2xs"
            >
              <item.icon className="size-3.5 text-emerald-600 shrink-0" />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </PageHero>

      <Section className="py-16 md:py-24">
        <SectionHeading 
          align="center"
          badge={pick(["Specialized Opportunities", "الفرص التطوعية التخصصية"])}
          title={pick(["High-Impact Volunteer Tracks", "مسارات التطوع التخصصية"])} 
          subtitle={pick([
            "All volunteer hours are officially verified and documented on the Saudi National Volunteer Portal.",
            "توثق كافة الساعات والمهام رسمياً عبر المنصة الوطنية للعمل التطوعي لوزارة الموارد البشرية."
          ])}
        />

        <div className="grid gap-6 md:grid-cols-3 mt-10">
          {[
            [BrainCircuit, "AI & Machine Learning Researchers", "باحثو الذكاء الاصطناعي", "Mentor students, evaluate computational drug models, and assist in hackathon judging."],
            [Stethoscope, "Clinical Pharmacists & Physicians", "الصيادلة السريريون والأطباء", "Guide patient eligibility for Hakeem equipment bank and review pharmacogenomics datasets."],
            [FlaskConical, "Biomedical Calibration Engineers", "مهندسو المعايرة والأجهزة الطبية", "Perform safety inspections and recalibration protocols on life-support equipment."]
          ].map(([Icon, en, ar, desc], i) => (
            <div key={i} className="p-8 rounded-[28px] bg-white border border-slate-200 shadow-2xs hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between">
              <div>
                <div className="size-12 rounded-2xl bg-emerald-50 border border-emerald-200/60 text-emerald-700 flex items-center justify-center mb-5">
                  <Icon className="size-6" />
                </div>
                <h3 className="font-display text-xl font-bold text-slate-900">{pick([en, ar])}</h3>
                <p className="text-sm text-slate-600 mt-3 leading-relaxed font-normal">{desc}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                <CheckCircle2 className="size-3.5" />
                <span>{pick(["National Accreditation Active", "اعتماد الساعات متاح"])}</span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="mist" className="py-16 md:py-24">
        <div className="max-w-2xl mx-auto">
          <SectionHeading 
            align="center"
            badge={pick(["Volunteer Registration", "التسجيل التطوعي"])}
            title={pick(["Join Our Specialized Volunteer Network", "انضم لشبكة الخبراء والمتطوعين"])} 
            subtitle={pick([
              "Register your credentials to receive specialized callouts for clinical initiatives and hackathons.",
              "سجل بياناتك وخبراتك لتصلك الفرص التخصصية في المبادرات الصحية والهاكاثونات العلمية."
            ])}
          />
          <div className="mt-8 p-8 md:p-10 rounded-[28px] bg-white border border-slate-200 shadow-sm">
            <SmartForm 
              fields={[
                { name: "fullName", label: pick(["Full Name", "الاسم الكامل"]), required: true },
                { name: "nationalId", label: pick(["National ID / Iqama (For Portal Sync)", "رقم الهوية أو الإقامة (للتوثيق في المنصة الوطنية)"]), required: true },
                { name: "email", label: pick(["Email Address", "البريد الإلكتروني"]), type: "email", required: true },
                { name: "specialty", label: pick(["Field of Specialty", "التخصص المهني"]), type: "select", options: ["AI / Computer Science", "Pharmacy / Pharmacology", "Biomedical Engineering", "Medicine / Nursing", "Logistics & Community Outreach"], required: true },
                { name: "availability", label: pick(["Weekly Availability", "الساعات المتاحة أسبوعياً"]), type: "select", options: ["2–4 Hours", "4–8 Hours", "Project-Based / Hackathon"], required: true },
                { name: "notes", label: pick(["Brief Professional Background", "نبذة عن الخبرات والمهارات"]), type: "textarea", required: false }
              ]}
              submitLabel={pick(["Register as Volunteer", "تسجيل طلب التطوع"])}
              recipientEmail="info@aimedicine.org.sa"
              subjectPrefix={pick(["[Volunteer Registration]", "[طلب تسجيل متطوع]"])}
              successMessage={pick([
                "Your volunteer registration has been submitted. Our team will review your application and sync your profile with the Saudi National Volunteer Portal.",
                "تم تسجيل طلب التطوع بنجاح. سيقوم فريقنا بمراجعة المؤهلات والتنسيق لربط ساعاتكم بالمنصة الوطنية للعمل التطوعي."
              ])}
            />
          </div>
        </div>
      </Section>
    </>
  );
}

/* =========================================================================
   9. SUPPORT US / FIDUCIARY GIVING PAGE
   ========================================================================= */
function CampaignCard({ camp }: { camp: typeof donationCampaigns[number] }) {
  const { language, pick } = useLanguage();
  const [selectedAmt, setSelectedAmt] = useState(500);
  const pct = Math.round((camp.raisedAmount / camp.targetAmount) * 100);

  const whatsappMsg = language === "ar"
    ? `السلام عليكم، أود المساهمة بمبلغ ${selectedAmt} ريال في حملة: (${camp.title[1]}) التابعة لجمعية بالذكاء الاصطناعي نبتكر الدواء.`
    : `Hello, I would like to contribute SAR ${selectedAmt} to the campaign: "${camp.title[0]}" at WAIWIM.`;

  return (
    <div className="p-8 rounded-[28px] bg-white border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
      <div>
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 inline-block mb-4">
          {pick(camp.tag)}
        </span>
        <h3 className="font-display text-xl font-bold text-slate-900">
          {pick(camp.title)}
        </h3>
        <p className="text-sm text-slate-600 mt-3 leading-relaxed font-normal">
          {pick(camp.description)}
        </p>
        <div className="mt-6 space-y-2 p-4 rounded-xl bg-slate-50 border border-slate-200/70">
          <div className="flex justify-between text-xs font-semibold text-slate-800">
            <span>{pick(["Raised: ", "المجموع: "])}﷼{camp.raisedAmount.toLocaleString()}</span>
            <span>{pick(["Target: ", "الهدف: "])}﷼{camp.targetAmount.toLocaleString()}</span>
          </div>
          <ProgressBar value={pct} />
          <span className="text-[11px] font-mono text-emerald-700 block text-end font-bold">{pct}% Funded</span>
        </div>
      </div>

      <div className="mt-8 pt-5 border-t border-slate-200">
        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
          {pick(["Select Contribution Amount", "اختر مبلغ المساهمة"])}
        </span>
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[100, 500, 1000].map(amt => (
            <button 
              key={amt} 
              type="button"
              onClick={() => setSelectedAmt(amt)}
              className={cn(
                "p-2 text-center rounded-xl border font-mono font-bold text-xs transition-colors cursor-pointer",
                selectedAmt === amt
                  ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                  : "bg-slate-50 border-slate-200 text-slate-700 hover:border-emerald-500 hover:text-emerald-700"
              )}
            >
              ﷼{amt}
            </button>
          ))}
        </div>
        <a 
          href={`https://wa.me/966505210112?text=${encodeURIComponent(whatsappMsg)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl h-11 text-xs shadow-sm transition-all hover:scale-101"
        >
          <MessageCircle className="size-4" />
          <span>{pick(["Contribute via Authorized Gateway", "المساهمة عبر المنفذ النظامي المعتمد"])}</span>
          <ArrowUpRight className="rtl:-scale-x-100 size-3.5" />
        </a>
      </div>
    </div>
  );
}

export function SupportPage() {
  const { language, pick } = useLanguage();
  const intro = pageIntro.support;

  return (
    <>
      <PageHero 
        eyebrow={pick(["Fiduciary Stewardship", "المساهمة والأثر الصحي"])}
        title={pick(intro[0])} 
        subtitle={pick(intro[1])} 
      >
        <div className="mt-8 flex flex-wrap items-center gap-3">
          {[
            { label: pick(["Zakat Certified Programs", "برامج زكاة معتمدة"]), icon: ShieldCheck },
            { label: pick(["100% Direct Program Utilization", "100% توجيه مباشر للمستفيدين"]), icon: CheckCircle2 },
            { label: pick(["NCNP Audited Campaigns", "حملات مدققة بالمركز الوطني"]), icon: Award }
          ].map((item, idx) => (
            <div 
              key={idx} 
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-50 text-slate-700 border border-slate-200/90 shadow-2xs"
            >
              <item.icon className="size-3.5 text-emerald-600 shrink-0" />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </PageHero>

      {/* Interactive Impact Giving Calculator */}
      <Section className="py-16 md:py-24">
        <InteractiveDonationCalculator />
      </Section>

      {/* Active Governed Campaigns */}
      <Section tone="mist" className="py-16 md:py-24">
        <SectionHeading 
          align="center"
          badge={pick(["Verified Campaigns", "الحملات المعتمدة"])}
          title={pick(["Active Governed Giving Campaigns", "حملات التبرع والمساهمة المعتمدة"])} 
          subtitle={pick([
            "Transparent fundraising campaigns governed by NCNP regulations with full financial reporting.",
            "حملات تبرع محكومة وفق لوائح المركز الوطني مع إفصاح مالي وتقارير أثر كاملة."
          ])}
        />
        <div className="grid gap-6 md:grid-cols-3 mt-10">
          {donationCampaigns.map(camp => (
            <CampaignCard key={camp.id} camp={camp} />
          ))}
        </div>
      </Section>
    </>
  );
}

/* =========================================================================
   10. REPORTS & PUBLICATIONS PAGE
   ========================================================================= */
export function ReportsPage() {
  const { language, pick } = useLanguage();
  const intro = pageIntro.reports;
  const [filter, setFilter] = useState("All");

  const categories = [
    "All", 
    "Impact Reports", 
    "Financial Statements", 
    "Governance Reports", 
    "Research Publications", 
    "Program Reports"
  ];

  const filtered = filter === "All"
    ? reports
    : reports.filter(r => r.category[0] === filter);

  return (
    <>
      <PageHero 
        eyebrow={pick(["Open Knowledge", "المعرفة المؤسسية المفتوحة"])}
        title={pick(intro[0])} 
        subtitle={pick(intro[1])} 
      >
        <div className="mt-8 flex flex-wrap items-center gap-3">
          {[
            { label: pick(["Annual Financial Statements", "القوائم المالية السنوية"]), icon: FileCheck2 },
            { label: pick(["Board Governance Audits", "تقارير حوكمة المجلس"]), icon: ShieldCheck },
            { label: pick(["Scientific Publications", "المنشورات والأوراق العلمية"]), icon: FlaskConical }
          ].map((item, idx) => (
            <div 
              key={idx} 
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-50 text-slate-700 border border-slate-200/90 shadow-2xs"
            >
              <item.icon className="size-3.5 text-emerald-600 shrink-0" />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </PageHero>

      <Section className="py-16 md:py-24">
        <div className="mb-12 flex flex-wrap gap-2 justify-center p-1.5 rounded-full bg-slate-100 border border-slate-200/80 max-w-4xl mx-auto shadow-2xs">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                filter === cat 
                  ? "bg-emerald-600 text-white shadow-sm" 
                  : "text-slate-600 hover:text-slate-900 hover:bg-white"
              }`}
            >
              {cat === "All" ? pick(["All Publications", "كافة التقارير والمنشورات"]) : cat}
            </button>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((r, i) => (
            <div key={i} className="p-8 rounded-[28px] bg-white border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {pick(r.category)}
                  </span>
                  <span className="text-slate-500 font-semibold">{pick(r.date)}</span>
                </div>
                <h3 className="font-display text-lg font-bold text-slate-900 leading-snug">
                  {pick(r.title)}
                </h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed font-normal">
                  {pick(r.summary)}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-500">{r.filesize} • {r.pages}</span>
                <a
                  href={`https://wa.me/966505210112?text=${encodeURIComponent(
                    language === "ar"
                      ? `السلام عليكم، أود طلب نسخة رسمية معتمدة من تقرير: "${r.title[1]}" الصادر عن جمعية بالذكاء الاصطناعي نبتكر الدواء.`
                      : `Hello, I would like to request an official copy of the report: "${r.title[0]}" from WAIWIM.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors shadow-2xs"
                >
                  <MessageCircle className="size-3.5 text-emerald-600" />
                  <span>{pick(["Request Official Copy", "طلب نسخة رسمية"])}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

/* =========================================================================
   11. CONTACT & WHISTLEBLOWING PAGE
   ========================================================================= */
export function ContactPage() {
  const { language, pick } = useLanguage();
  const intro = pageIntro.contact;
  const [voiceOpen, setVoiceOpen] = useState(false);

  return (
    <>
      <PageHero 
        eyebrow={pick(["Direct Communication", "قنوات التواصل المؤسسي المعتمدة"])}
        title={pick(intro[0])} 
        subtitle={pick(intro[1])} 
      >
        <div className="mt-8 flex flex-wrap items-center gap-3">
          {[
            { label: pick(["Riyadh Headquarters", "المقر الرئيس — الرياض"]), icon: Building2 },
            { label: pick(["3 Business Day SLA", "استجابة خلال 3 أيام عمل"]), icon: CheckCircle2 },
            { label: pick(["Confidential Whistleblowing Line", "قناة بلاغات محمية ومستقلة"]), icon: ShieldCheck }
          ].map((item, idx) => (
            <div 
              key={idx} 
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-50 text-slate-700 border border-slate-200/90 shadow-2xs"
            >
              <item.icon className="size-3.5 text-emerald-600 shrink-0" />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </PageHero>

      <Section className="py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading 
              badge={pick(["Headquarters", "المقر الرئيس"])}
              title={pick(["Reach Our Team", "تواصل مع فرق العمل"])} 
              subtitle={pick([
                "We welcome scientific inquiries, partnership proposals, and media requests.",
                "نسعد باستقبال الاستفسارات العلمية، ومقترحات الشراكة، والتواصل الإعلامي."
              ])}
            />

            <div className="space-y-4 my-8">
              {/* WhatsApp Direct Line */}
              <div className="p-6 rounded-2xl border border-emerald-300 bg-gradient-to-br from-emerald-50/80 via-white to-teal-50/40 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                    <MessageCircle className="size-5 text-emerald-600" />
                    <span>{contactDetails.phoneDisplay}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    {pick(contactDetails.urgentNote)}
                  </p>
                </div>
                <a
                  href={contactDetails.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors shadow-xs shrink-0"
                >
                  <MessageCircle className="size-4" />
                  <span>{pick(contactDetails.startChat)}</span>
                  <ArrowUpRight className="rtl:-scale-x-100 size-3.5" />
                </a>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-2xs">
                <strong className="text-slate-900 block text-sm font-bold">{pick(["Headquarters Address", "مقر الجمعية الرئيسي"])}</strong>
                <span className="text-xs text-slate-600 block mt-1">Riyadh, Kingdom of Saudi Arabia</span>
              </div>
              <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-2xs">
                <strong className="text-slate-900 block text-sm font-bold">{pick(["General Inquiries", "البريد الإلكتروني العام"])}</strong>
                <a href={`mailto:${contactDetails.email}`} className="text-xs font-mono text-emerald-700 block mt-1 hover:underline">
                  {contactDetails.email}
                </a>
              </div>
              <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-2xs">
                <strong className="text-slate-900 block text-sm font-bold">{pick(["Governance & Compliance", "إدارة الحوكمة والامتثال"])}</strong>
                <a href={`mailto:${contactDetails.complianceEmail}`} className="text-xs font-mono text-emerald-700 block mt-1 hover:underline">
                  {contactDetails.complianceEmail}
                </a>
              </div>
            </div>

            {/* Whistleblowing Card */}
            <div className="p-7 rounded-[28px] border border-amber-300 bg-gradient-to-br from-amber-50/70 via-white to-amber-50/40 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <AlertCircle className="size-5" />
                </div>
                <h4 className="font-display font-bold text-slate-900 text-lg">
                  {pick(["Your Voice Matters — Confidential Whistleblowing", "صوتكم مسموع — الشكاوى والبلاغات المحمية"])}
                </h4>
              </div>
              <p className="text-xs text-slate-600 mt-3 leading-relaxed font-normal">
                {pick([
                  "An independent, confidential channel directly managed by the Board Audit & Risk Committee for reporting compliance concerns, service complaints, or suggestions.",
                  "قناة مستقلة ومحمية تديرها مباشرة لجنة المراجعة والمخاطر بمجلس الإدارة لتلقي الملاحظات وشبهات التعارض والشكاوى."
                ])}
              </p>
              <Button 
                onClick={() => setVoiceOpen(true)}
                className="mt-5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl h-10 shadow-xs cursor-pointer"
              >
                {pick(["Open Confidential Whistleblowing Portal", "فتح بوابة الشكاوى والبلاغات المحمية"])}
              </Button>
            </div>
          </div>

          <div>
            <div className="p-8 sm:p-10 rounded-[28px] bg-white border border-slate-200 shadow-sm">
              <h3 className="font-display text-2xl font-bold text-slate-900 mb-4">
                {pick(["Send a Direct Message", "إرسال رسالة مباشرة"])}
              </h3>
              <SmartForm 
                fields={[
                  { name: "name", label: pick(["Your Name", "الاسم الكريم"]), required: true },
                  { name: "email", label: pick(["Email Address", "البريد الإلكتروني"]), type: "email", required: true },
                  { name: "topic", label: pick(["Inquiry Topic", "موضوع الاستفسار"]), type: "select", options: ["General Inquiry", "Research Collaboration", "Media & Press", "Volunteer Operations", "Hakeem Equipment Bank"], required: true },
                  { name: "message", label: pick(["Message Content", "نص الرسالة"]), type: "textarea", required: true }
                ]}
                submitLabel={pick(["Send Message", "إرسال الرسالة"])}
                recipientEmail="info@aimedicine.org.sa"
                subjectPrefix={pick(["[WAIWIM General Inquiry]", "[استفسار مباشر - جمعية بالذكاء الاصطناعي نبتكر الدواء]"])}
                successMessage={pick([
                  "Your message has been sent directly to our administrative team at info@aimedicine.org.sa. Our team will review your inquiry and follow up within 3 business days.",
                  "تم إرسال رسالتكم بنجاح ومباشرة إلى البريد الرسمي (info@aimedicine.org.sa). سيقوم الفريق المختص بمتابعة طلبكم والتواصل معكم خلال 3 أيام عمل."
                ])}
              />
            </div>
          </div>
        </div>

        <VoiceMattersModal open={voiceOpen} onClose={() => setVoiceOpen(false)} />
      </Section>
    </>
  );
}
