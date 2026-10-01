import { useState, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { 
  FileText, ShieldCheck, CheckCircle2,
  ArrowRight, Eye, Award, Scale, X,
  Dna, Activity, Building2, Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "./language";
import { cn } from "@/lib/utils";

/* =========================================================================
   PUBLICATIONS & GOVERNANCE LEDGER
   - Clean, institutional publications overview
   - No hashes / checksums
   - No fake file downloads
   - Direct 'View Publication Details' modal with full summary & key findings
   ========================================================================= */

interface PublicationDoc {
  id: string;
  categoryKey: "audit" | "whitepaper" | "calibration" | "governance";
  titleEn: string;
  titleAr: string;
  categoryEn: string;
  categoryAr: string;
  date: string;
  pages: string;
  issuerEn: string;
  issuerAr: string;
  abstractEn: string;
  abstractAr: string;
  keyFindingsEn: string[];
  keyFindingsAr: string[];
  badgeEn: string;
  badgeAr: string;
  icon: typeof Award;
  accentColor: string;
}

export function PublicationsLedger() {
  const { language, pick } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [previewDoc, setPreviewDoc] = useState<PublicationDoc | null>(null);

  const documents: PublicationDoc[] = [
    {
      id: "DOC-2025-Q4",
      categoryKey: "audit",
      titleEn: "2025 Annual Fiduciary Audit Report (Independent CPA)",
      titleAr: "تقرير القوائم المالية والتدقيق المحاسبي السنوي 2025 (محاسب قانوني مستقل)",
      categoryEn: "Statutory CPA Audit",
      categoryAr: "تدقيق محاسبي مستقل",
      date: "Q4 2025",
      pages: "64 Pages",
      issuerEn: "Certified Independent Public Accountants (CPA)",
      issuerAr: "محاسبون قانونيون مستقلون معتمدون (ترخيص الهيئة السعودية للمراجعين)",
      abstractEn: "Independent statutory audit verifying 100% fiduciary integrity, unqualified clean opinion, and zero material accounting weaknesses across all medical device endowment programs.",
      abstractAr: "مراجعة محاسبية مستقلة تؤكد سلامة المركز المالي بنسبة 100%، مع رأي تدقيق نظيف غير متحفظ وخلو القوائم من أي ملاحظات جوهرية.",
      keyFindingsEn: [
        "Unqualified Clean Audit Opinion issued under SOCPA standards",
        "100% institutional funds reconciled against hospital distributions",
        "Zero governance deviations or statutory reporting breaches"
      ],
      keyFindingsAr: [
        "رأي تدقيق نظيف وغير متحفظ صادر وفق معايير المحاسبة المعتمدة بالمملكة",
        "مطابقة 100% للتبرعات والتمويلات مع الأجهزة الطبية الموزعة",
        "خلو العمليات من أي مخالفات تنظيمية أو إفصاحية"
      ],
      badgeEn: "Unqualified Clean Opinion",
      badgeAr: "رأي تدقيق نظيف ومعتمد",
      icon: Award,
      accentColor: "#10b981"
    },
    {
      id: "DOC-2025-AI",
      categoryKey: "whitepaper",
      titleEn: "Translational AI Drug Discovery Benchmark Whitepaper",
      titleAr: "الورقة البيضاء: مخرجات محرك الذكاء الاصطناعي لاكتشاف الجزيئات العلاجية",
      categoryEn: "Scientific Whitepaper",
      categoryAr: "ورقة بحثية علمية",
      date: "Q3 2025",
      pages: "88 Pages",
      issuerEn: "WAIWIM Bio-Informatics Lab & King Saud University",
      issuerAr: "مختبر الحوسبة الحيوية بالتعاون مع جامعة الملك سعود",
      abstractEn: "Empirical benchmarking of generative molecular docking algorithms demonstrating 3.8x enhanced binding affinity against resistant oncological and metabolic protein targets.",
      abstractAr: "تحليل تجريبي لخوارزميات النمذجة الجزيئية التوليدية يثبت كفاءة ارتباط تفوق النماذج التقليدية بـ 3.8 أضعاف ضد بروتينات الأورام والأمراض الاستقلابية.",
      keyFindingsEn: [
        "Validated 14 novel lead candidates with sub-nanomolar affinity",
        "Accelerated virtual screening pipeline latency by 72%",
        "Peer-reviewed computational reproducibility data included"
      ],
      keyFindingsAr: [
        "تأكيد فعالية 14 مركباً علاجياً واعداً بدرجة ارتباط فائقة",
        "تقليص مدة الفرز الجزيئي الحاسوبي بنسبة 72%",
        "تضمين شفرات المحاكاة للتحقق العلمي والأكاديمي المستقل"
      ],
      badgeEn: "Peer-Reviewed Methodology",
      badgeAr: "منهجية علمية محكمة",
      icon: Dna,
      accentColor: "#06b6d4"
    },
    {
      id: "DOC-2025-BIO",
      categoryKey: "calibration",
      titleEn: "SFDA Biomedical Recalibration & Provenance Ledger",
      titleAr: "سجل المعايرة الحيوية وسلامة الأجهزة الطبية (معايير الغذاء والدواء)",
      categoryEn: "Clinical Calibration",
      categoryAr: "سجل المعايرة السريرية",
      date: "Q2 2025",
      pages: "42 Pages",
      issuerEn: "Saudi Food & Drug Authority (MDS-REQ 1 Compliance)",
      issuerAr: "مطابقة لاشتراطات هيئة الغذاء والدواء للأجهزة الطبية",
      abstractEn: "Comprehensive calibration logs, sensor variance tolerances, and preventive maintenance ledgers for 860+ deployed ICU ventilators and advanced dialysis systems.",
      abstractAr: "سجل دقيق لنتائج الفحص الدوري، نسب التفاوت المقبولة في الحساسات، ومعايرة 860+ جهاز تنفس صناعي وغسيل كلوي في مستشفيات المملكة.",
      keyFindingsEn: [
        "100% compliance with SFDA Medical Devices Directive MDS-REQ 1",
        "Zero critical telemetry drift detected across 860 ICU assets",
        "Digital calibration certificates issued for each hospital deployment"
      ],
      keyFindingsAr: [
        "امتثال 100% لمتطلبات لائحة الأجهزة والمستلزمات الطبية (MDS-REQ 1)",
        "صفر انحراف في مؤشرات المعايرة لكافة أجهزة العناية المركزة",
        "شهادة معايرة رقمية معتمدة لكل جهاز بالرقم التسلسلي"
      ],
      badgeEn: "100% SFDA Certified",
      badgeAr: "شهادة اعتماد الغذاء والدواء",
      icon: Activity,
      accentColor: "#0d9488"
    },
    {
      id: "DOC-2025-GOV",
      categoryKey: "governance",
      titleEn: "NCNP License #5421 Institutional Governance Charter",
      titleAr: "ميثاق الحوكمة واللوائح الأساسية المعتمدة (ترخيص رقم 5421)",
      categoryEn: "Statutory Governance",
      categoryAr: "الحوكمة المؤسسية",
      date: "Q1 2025",
      pages: "36 Pages",
      issuerEn: "National Center for Non-Profit Sector (NCNP #5421)",
      issuerAr: "المركز الوطني لتنمية القطاع غير الربحي (ترخيص 5421)",
      abstractEn: "Official constitutional statutes, supervisory committee controls, conflict-of-interest policies, and transparency protocols governing WAIWIM's sovereign medical operations.",
      abstractAr: "اللائحة الأساسية المعتمدة، سياسات الإفصاح وتعارض المصالح، وصلاحيات مجلس الإدارة واللجان الرقابية وفق اشتراطات المركز الوطني.",
      keyFindingsEn: [
        "Full accreditation under Royal Decree Statutory Regulations",
        "Separation of executive management and audit oversight committees",
        "Public transparency disclosure mandate for all healthcare contributions"
      ],
      keyFindingsAr: [
        "اعتماد مؤسسي كامل بموجب الترخيص النظامي الصادر من المركز الوطني",
        "فصل تام بين الإدارة التنفيذية ولجان الرقابة والمراجعة الداخلية",
        "إلزامية الإفصاح المالي الدوري لكافة المشاريع والبرامج الصحية"
      ],
      badgeEn: "Statutory License #5421",
      badgeAr: "ترخيص نظامي رقم 5421",
      icon: Scale,
      accentColor: "#6366f1"
    }
  ];

  // Filter documents based on active category
  const filteredDocuments = useMemo(() => {
    if (activeCategory === "all") return documents;
    return documents.filter(doc => doc.categoryKey === activeCategory);
  }, [activeCategory, documents]);

  return (
    <section 
      id="publications-ledger"
      className="relative py-20 lg:py-24 bg-white overflow-hidden border-b border-slate-200"
    >
      {/* Background Precision Ambient Light */}
      <div className="absolute top-1/4 -right-40 size-[38rem] rounded-full bg-emerald-50/40 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-40 size-[36rem] rounded-full bg-cyan-50/40 blur-[120px] pointer-events-none" />

      <div className="max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-12 space-y-10 relative z-10">
        
        {/* =========================================================================
           TOP LEVEL: EDITORIAL HEADER & ARCHIVE CTA
           ========================================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-slate-200">
          <div className="max-w-3xl space-y-4 text-start">
            
            {/* Pill Eyebrow Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs font-bold tracking-tight">
              <ShieldCheck className="size-4 text-emerald-700" />
              <span>
                {pick([
                  "INSTITUTIONAL DISCLOSURES & PUBLICATIONS",
                  "مركز الإفصاح والتقارير المؤسسية والعلمية"
                ])}
              </span>
            </div>

            {/* Display Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-[3.25rem] font-display font-black text-slate-950 tracking-tight leading-[1.12]">
              {language === "ar" ? (
                <>
                  سجل التقارير والإفصاحات المالية{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 via-teal-700 to-cyan-600 block sm:inline">
                    والعلمية المعتمدة
                  </span>
                </>
              ) : (
                <>
                  Official Institutional &{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 via-teal-700 to-cyan-600 block sm:inline">
                    Scientific Publications
                  </span>
                </>
              )}
            </h2>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl font-normal">
              {pick([
                "Audited financial statements, quarterly impact evaluations, and scientific whitepapers officially published by WAIWIM under national regulatory frameworks.",
                "القوائم المالية المدققة، تقارير تقييم الأثر، والأوراق البحثية المحكمة الصادرة رسمياً عن الجمعية تحت مظلة الأنظمة المعتمدة بالمملكة."
              ])}
            </p>
          </div>

          {/* Full Publications Archive Action */}
          <div className="flex items-center gap-3">
            <Button 
              asChild 
              className="bg-slate-950 hover:bg-slate-800 text-white rounded-full font-bold text-xs h-11 px-7 shadow-sm transition-all group cursor-pointer"
            >
              <Link to="/reports">
                <span>{pick(["View All Reports", "عرض كافة التقارير"])}</span>
                <ArrowRight className="size-3.5 ms-2 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>

        {/* =========================================================================
           CATEGORY FILTER TABS & STATUS
           ========================================================================= */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs pb-2">
          
          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { key: "all", labelEn: "All Publications", labelAr: "كافة المنشورات", count: 4 },
              { key: "audit", labelEn: "CPA Audits", labelAr: "التدقيق المحاسبي", count: 1 },
              { key: "whitepaper", labelEn: "Scientific Papers", labelAr: "الأبحاث العلمية", count: 1 },
              { key: "calibration", labelEn: "SFDA Standards", labelAr: "معايير الغذاء والدواء", count: 1 },
              { key: "governance", labelEn: "Governance", labelAr: "الحوكمة والترخيص", count: 1 }
            ].map((tab) => {
              const isActive = activeCategory === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveCategory(tab.key)}
                  className={cn(
                    "px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer border flex items-center gap-2",
                    isActive
                      ? "bg-slate-950 text-white border-slate-950 shadow-sm"
                      : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                  )}
                >
                  <span>{language === "ar" ? tab.labelAr : tab.labelEn}</span>
                  <span className={cn(
                    "px-1.5 py-0.5 rounded-full text-[10px]",
                    isActive ? "bg-emerald-500 text-slate-950 font-black" : "bg-slate-100 text-slate-500"
                  )}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Compliance Status Badge */}
          <div className="flex items-center gap-2 text-xs text-slate-500 font-bold self-start sm:self-auto">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-emerald-700">{pick(["OFFICIALLY ACCREDITED & AUDITED", "معتمدة وموثقة رسمياً"])}</span>
            <span className="text-slate-300">|</span>
            <span>{pick(["SOCPA / SFDA STANDARDS", "معايير سوبا وهيئة الغذاء والدواء"])}</span>
          </div>

        </div>

        {/* =========================================================================
           CENTER STAGE: 2x2 PUBLICATION DOSSIER CARDS
           ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 text-start">
          {filteredDocuments.map((doc) => {
            const Icon = doc.icon;

            return (
              <div
                key={doc.id}
                className="group relative rounded-3xl bg-white border border-slate-200 hover:border-emerald-400 shadow-sm hover:shadow-xl transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between space-y-6"
              >
                {/* Top Bar: Category Pill + Release Quarter + Security Badge */}
                <div className="flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full font-bold bg-slate-100 text-slate-700 border border-slate-200 text-[11px]">
                      {language === "ar" ? doc.categoryAr : doc.categoryEn}
                    </span>
                    <span className="text-slate-400 font-semibold">{doc.date}</span>
                  </div>

                  {/* Certified Seal Badge */}
                  <div className="flex items-center gap-1.5 text-emerald-700 font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 text-xs">
                    <CheckCircle2 className="size-3.5 text-emerald-600" />
                    <span>{language === "ar" ? doc.badgeAr : doc.badgeEn}</span>
                  </div>
                </div>

                {/* Hero Title & Author Authority Header */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3.5">
                    <div 
                      className="size-11 rounded-2xl flex items-center justify-center shrink-0 border shadow-2xs"
                      style={{ 
                        backgroundColor: `${doc.accentColor}12`, 
                        borderColor: `${doc.accentColor}30`,
                        color: doc.accentColor
                      }}
                    >
                      <Icon className="size-5" />
                    </div>

                    <div className="space-y-1 flex-1">
                      <h3 className="font-display font-black text-slate-950 text-lg leading-snug group-hover:text-emerald-950 transition-colors">
                        {language === "ar" ? doc.titleAr : doc.titleEn}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">
                        {language === "ar" ? doc.issuerAr : doc.issuerEn}
                      </p>
                    </div>
                  </div>

                  {/* Executive Abstract Snippet */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal pt-1">
                    {language === "ar" ? doc.abstractAr : doc.abstractEn}
                  </p>
                </div>

                {/* Key Findings List Preview */}
                <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-150 space-y-2">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    {pick(["Core Findings & Highlights", "أبرز النتائج والاعتمادات"])}
                  </span>
                  <div className="space-y-1.5">
                    {(language === "ar" ? doc.keyFindingsAr : doc.keyFindingsEn).slice(0, 2).map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="size-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Document Metadata Strip */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <FileText className="size-3.5 text-slate-400" />
                    <strong className="text-slate-700">{doc.pages}</strong>
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-emerald-700 font-semibold">{pick(["Bilingual EN / AR", "ثنائي اللغة"])}</span>
                  <span className="text-slate-300">•</span>
                  <span>{pick(["Verified Fiduciary Release", "إصدار رسمي معتمد"])}</span>
                </div>

                {/* Clean View Action (No Downloads, No Hashes) */}
                <div className="pt-2">
                  <Button
                    onClick={() => setPreviewDoc(doc)}
                    className="w-full bg-slate-950 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs h-11 px-5 shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer group/btn"
                  >
                    <Eye className="size-4 text-emerald-400 group-hover/btn:text-white transition-colors" />
                    <span>{pick(["View Publication Details", "عرض تفاصيل المنشور"])}</span>
                    <ArrowRight className="size-3.5 ms-1 transition-transform group-hover/btn:translate-x-1 rtl:rotate-180 rtl:group-hover/btn:-translate-x-1" />
                  </Button>
                </div>

              </div>
            );
          })}
        </div>

        {/* =========================================================================
           BOTTOM: STATUTORY COMPLIANCE RIBBON
           ========================================================================= */}
        <div className="rounded-3xl bg-slate-50 border border-slate-200 p-5 sm:p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 text-xs">
          
          {/* Trust Points */}
          <div className="flex flex-wrap items-center gap-6 text-slate-600 text-start">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-500" />
              <span className="font-bold text-slate-900">{pick(["LEGAL CHARTER:", "الترخيص القانوني:"])}</span>
              <span className="text-emerald-700 font-extrabold">{pick(["NCNP LICENSE #5421", "ترخيص المركز الوطني 5421"])}</span>
            </div>
            <div>
              <span className="font-bold text-slate-900">{pick(["INDEPENDENT AUDITOR:", "المراجع الخارجي:"])}</span> {pick(["Certified Independent CPA", "محاسب قانوني مستقل"])}
            </div>
            <span className="text-slate-300 hidden sm:inline">|</span>
            <div>
              <span className="font-bold text-slate-900">{pick(["HEALTHCARE STANDARD:", "المعيار الصحي:"])}</span> Saudi FDA MDS-REQ 1
            </div>
            <span className="text-slate-300 hidden sm:inline">|</span>
            <div>
              <span className="font-bold text-slate-900">{pick(["AUDIT STATUS:", "حالة التدقيق:"])}</span> {pick(["100% Certified", "معتمد 100%"])}
            </div>
          </div>

          {/* Vision 2030 Badge */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-[11px] font-bold text-slate-700 shadow-2xs">
              KINGDOM VISION 2030 // INSTITUTIONAL DISCLOSURE
            </span>
          </div>

        </div>

      </div>

      {/* =========================================================================
         MODAL: FULL DOCUMENT DETAILS & EXECUTIVE SUMMARY (NO DOWNLOAD, NO HASH)
         ========================================================================= */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-title-reveal">
          <div className="relative w-full max-w-2xl rounded-3xl bg-white border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6 text-start">
            
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-100 gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    {language === "ar" ? previewDoc.categoryAr : previewDoc.categoryEn}
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">{previewDoc.date}</span>
                </div>
                <h3 className="font-display font-black text-slate-950 text-xl sm:text-2xl leading-tight">
                  {language === "ar" ? previewDoc.titleAr : previewDoc.titleEn}
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {language === "ar" ? previewDoc.issuerAr : previewDoc.issuerEn}
                </p>
              </div>

              <button 
                onClick={() => setPreviewDoc(null)}
                className="size-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 cursor-pointer shrink-0 transition-colors"
                aria-label="Close"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Executive Abstract */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {pick(["EXECUTIVE SUMMARY & SCOPE", "الملخص التنفيذي ونطاق العمل"])}
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed font-normal bg-slate-50 p-4 rounded-2xl border border-slate-150">
                {language === "ar" ? previewDoc.abstractAr : previewDoc.abstractEn}
              </p>
            </div>

            {/* Key Findings List */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {pick(["KEY FINDINGS & ACCREDITATIONS", "أبرز النتائج والاعتمادات النظامية"])}
              </h4>
              <div className="space-y-2.5">
                {(language === "ar" ? previewDoc.keyFindingsAr : previewDoc.keyFindingsEn).map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer with Metadata & Close Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-100">
              <div className="text-xs text-slate-500 flex items-center gap-2">
                <span>{previewDoc.pages}</span>
                <span>•</span>
                <span className="text-emerald-700 font-bold">{language === "ar" ? previewDoc.badgeAr : previewDoc.badgeEn}</span>
                <span>•</span>
                <span>{pick(["Bilingual EN / AR", "ثنائي اللغة"])}</span>
              </div>

              <Button 
                onClick={() => setPreviewDoc(null)}
                className="bg-slate-950 hover:bg-slate-800 text-white rounded-full text-xs font-bold h-10 px-8 cursor-pointer shadow-xs"
              >
                <span>{pick(["Close Details", "إغلاق النافذة"])}</span>
              </Button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
