$filePath = "d:/WAIWIM/ai-health-bridge-main/src/components/site/pages.tsx"
$content = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)

$startMarker = "/* =========================================================================`n   8. VOLUNTEER IMPACT PORTAL PAGE`n   ========================================================================= */"
$endMarker = "/* =========================================================================`n   11. CONTACT & WHISTLEBLOWING PAGE`n   ========================================================================= */"

# Let's handle LF and CRLF
if (-not $content.Contains("8. VOLUNTEER IMPACT PORTAL PAGE")) {
    Write-Error "Start marker not found"
    exit 1
}

$startIdx = $content.IndexOf("/* =========================================================================`n   8. VOLUNTEER IMPACT PORTAL PAGE")
if ($startIdx -lt 0) {
    $startIdx = $content.IndexOf("/* =========================================================================`r`n   8. VOLUNTEER IMPACT PORTAL PAGE")
}

$endIdx = $content.IndexOf("/* =========================================================================`n   11. CONTACT & WHISTLEBLOWING PAGE")
if ($endIdx -lt 0) {
    $endIdx = $content.IndexOf("/* =========================================================================`r`n   11. CONTACT & WHISTLEBLOWING PAGE")
}

Write-Output "startIdx: $startIdx, endIdx: $endIdx"

if ($startIdx -ge 0 -and $endIdx -gt $startIdx) {
    $before = $content.Substring(0, $startIdx)
    $after = $content.Substring($endIdx)

    $middle = @'
/* =========================================================================
   8. VOLUNTEER IMPACT PORTAL PAGE
   ========================================================================= */
export function VolunteerPage() {
  const { pick } = useLanguage();
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
  const { pick } = useLanguage();
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

'@

    $newContent = $before + $middle + "`n`n" + $after
    [System.IO.File]::WriteAllText($filePath, $newContent, [System.Text.Encoding]::UTF8)
    Write-Output "Successfully updated pages.tsx"
} else {
    Write-Error "Markers index issue"
}
