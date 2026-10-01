export type Language = "en" | "ar";

export const navItems = [
  ["Home", "الرئيسية", "/"],
  ["About Us", "من نحن", "/about"],
  ["Governance & Transparency", "الحوكمة والشفافية", "/governance"],
  ["Programs & Initiatives", "البرامج والمبادرات", "/programs"],
  ["Impact Dashboard", "لوحة الأثر", "/impact"],
  ["Research & Accelerator", "البحث والابتكار", "/research"],
  ["Strategic Partnerships", "الشراكات الاستراتيجية", "/partnerships"],
  ["Volunteer Portal", "بوابة التطوع", "/volunteer"],
  ["Support Our Mission", "ادعم رسالتنا", "/support"],
  ["Reports & Publications", "التقارير والمنشورات", "/reports"],
  ["Contact & Feedback", "تواصل معنا", "/contact"],
] as const;

export const fourPillars = [
  {
    id: "ai-pharma",
    title: ["AI & Drug Innovation", "الذكاء الاصطناعي وابتكار الدواء"],
    description: [
      "Advancing artificial intelligence applications in pharmaceutical research, molecular generative design, and high-throughput drug candidate screening.",
      "تطوير تطبيقات الذكاء الاصطناعي في البحث الدوائي، والتصميم الجزيئي التوليدي، والفحص عالي الإنتاجية للمركبات الواعدة."
    ],
    highlights: [
      ["Target Discovery", "اكتشاف الأهداف الجزيئية"],
      ["Generative Chemistry", "الكيمياء التوليدية"],
      ["Structure Prediction", "تنبؤ التركيب البروتيني"]
    ]
  },
  {
    id: "health-innovation",
    title: ["Health Innovation", "الابتكار والتقنية الصحية"],
    description: [
      "Developing and scaling digital health technologies, patient-tailored precision medicine, and intelligent pharmaceutical care delivery models.",
      "تطوير وتبني تقنيات الصحة الرقمية، والطب الدقيق المخصص للمريض، ونماذج الرعاية الصيدلانية الذكية."
    ],
    highlights: [
      ["Precision Medicine", "الطب الدقيق والشخصي"],
      ["Digital Therapeutics", "العلاجات الرقمية"],
      ["Clinical Decision Support", "دعم القرار السريري"]
    ]
  },
  {
    id: "research-education",
    title: ["Research & Education", "البحث العلمي والتعليم"],
    description: [
      "Building national scientific capacity through hands-on specialized training curricula, computational fellowships, research grants, and knowledge exchange.",
      "بناء القدرات العلمية الوطنية عبر مناهج تدريبية تخصصية، وزمالات حوسبية، ومنح بحثية، وبرامج لنقل المعرفة."
    ],
    highlights: [
      ["Curriculum Delivery", "تطوير المناهج التخصصية"],
      ["Academic Fellowships", "الزمالات الأكاديمية"],
      ["Scientific Symposia", "المؤتمرات العلمية المتخصصة"]
    ]
  },
  {
    id: "community-impact",
    title: ["Community Health Impact", "الأثر الصحي المجتمعي"],
    description: [
      "Connecting health technologies, medical equipment banking, volunteer networks, and resources to address underserved healthcare needs across Saudi Arabia.",
      "ربط التقنيات الصحية وبنوك الأجهزة الطبية وشبكات المتطوعين والموارد لتلبية الاحتياجات الصحية في شتى مناطق المملكة."
    ],
    highlights: [
      ["Medical Device Bank", "بنك الأجهزة والمستلزمات"],
      ["Vulnerable Outreach", "الوصول للفئات الأكثر احتياجاً"],
      ["Health Equity", "تعزيز العدالة الصحية"]
    ]
  }
] as const;

export const initiatives = [
  {
    id: "hakeem-bank",
    category: ["Community Health Impact", "الأثر الصحي المجتمعي"],
    status: ["Active", "نشط"],
    badgeColor: "emerald",
    title: ["Hakeem Medical Equipment Bank", "منصة بنك الأجهزة والمستلزمات الطبية (حكيم)"],
    tagline: [
      "Saudi Arabia's dedicated platform for medical equipment recovery, calibration, and equitable delivery.",
      "المنصة السعودية المتخصصة في استعادة الأجهزة الطبية ومعايرتها وتوزيعها العادل للمستحقين."
    ],
    problem: [
      "High costs of specialized rehabilitation and life-support medical devices leave thousands of vulnerable individuals and under-resourced regional care facilities with critical care gaps.",
      "ارتفاع تكاليف الأجهزة الطبية التأهيلية وأجهزة دعم الحياة يترك آلاف المرضى والمنشآت الصحية الطرفية أمام فجوة رعاية حرجة."
    ],
    solution: [
      "An end-to-end digital logistics and engineering platform: collecting surplus or pre-owned medical equipment, conducting rigorous biomedical engineering safety calibration, digitizing registry, and delivering directly to verified patients and non-profit clinics.",
      "منصة لوجستية وهندسية متكاملة: جمع الأجهزة الطبية الفائضة، إجراء معايرة هندسية وطبية صارمة، رقمنة السجل المركزي، والتسليم المباشر للمرضى المؤهلين والعيادات الخيرية."
    ],
    targetBeneficiaries: [
      "Chronic patients, mobility-impaired individuals, regional charitable clinics, and low-income families.",
      "مرضى الأمراض المزمنة، ذوو الإعاقة الحركية، العيادات الخيرية في المناطق الطرفية، والأسر الأشد حاجة."
    ],
    keyPartners: [
      "Ministry of Health, Specialized Hospitals, Saudi Medical Devices Association, Logistics Partners",
      "وزارة الصحة، المستشفيات التخصصية، جمعية الأجهزة الطبية، شركات الخدمات اللوجستية"
    ],
    kpis: [
      { label: ["Equipment Collected", "الأجهزة المجمعة"], value: "840+", progress: 84 },
      { label: ["Inspected & Calibrated", "تم فحصها ومعايرتها"], value: "760+", progress: 90 },
      { label: ["Delivered to Beneficiaries", "سُلّمت للمستفيدين"], value: "620+", progress: 77 },
      { label: ["Active Care Centers", "المراكز الصحية المستفيدة"], value: "18", progress: 100 }
    ],
    funding: ["Corporate Social Responsibility (CSR) & Designated Endowments", "المسؤولية الاجتماعية والأوقاف الصحية المخصصة"],
    reportsAvailable: ["Hakeem Q1-2026 Audit Report", "Biomedical Calibration Protocol 2025"]
  },
  {
    id: "thousand-miles",
    category: ["Research & Education", "البحث والتعليم"],
    status: ["Active", "نشط"],
    badgeColor: "cyan",
    title: ["Thousand Miles Step Program", "برنامج خطوة الألف ميل"],
    tagline: [
      "Building national research sovereignty in computational biology and AI-driven drug discovery.",
      "بناء السيادة البحثية الوطنية في الحوسبة الحيوية واكتشاف الأدوية بالذكاء الاصطناعي."
    ],
    problem: [
      "A severe shortage of local cross-disciplinary researchers bridging molecular pharmacology and high-performance machine learning models.",
      "فجوة حادة في الكوادر البحثية الوطنية القادرة على الجمع بين علم الأدوية الجزيئي ونماذج الذكاء الاصطناعي المتقدمة."
    ],
    solution: [
      "An intensive 6-month national capacity incubator pairing PhD scholars and pharmacologists with global AI leaders, providing GPU computing access and real-world drug design pipelines.",
      "حاضنة قدرات وطنية مكثفة لمدة 6 أشهر تجمع الباحثين والصيادلة مع خبراء الذكاء الاصطناعي العالميين، وتوفر حوسبة فائقة وتطبيقات عملية لاكتشاف الدواء."
    ],
    targetBeneficiaries: [
      "Saudi graduate students, pharmaceutical researchers, bioinformaticians, and clinical data scientists.",
      "طلبة الدراسات العليا السعوديون، والباحثون الصيدلانيون، والمتخصصون في المعلوماتية الحيوية."
    ],
    keyPartners: [
      "King Saud University, King Abdullah University of Science and Technology (KAUST), International Pharma Labs",
      "جامعة الملك سعود، جامعة كاوست، ومختبرات دوائية دولية"
    ],
    kpis: [
      { label: ["Researchers Enrolled", "الباحثون المنضمون"], value: "420", progress: 85 },
      { label: ["Training Hours Delivered", "ساعات التدريب المنجزة"], value: "1,280 hrs", progress: 95 },
      { label: ["Research Papers Produced", "الأوراق العلمية المنشورة"], value: "14 Papers", progress: 70 },
      { label: ["Alumni Placement Rate", "نسبة التوظيف والقيادة البحثية"], value: "92%", progress: 92 }
    ],
    funding: ["National Research Grants & Philanthropic Fellowships", "منح البحث الوطني وأوقاف الزمالات العلمية"],
    reportsAvailable: ["Thousand Miles 2025 Impact Book", "Cohort II Curriculum Syllabus"]
  },
  {
    id: "training-unit",
    category: ["AI & Drug Innovation", "الذكاء الاصطناعي وابتكار الدواء"],
    status: ["In Development", "قيد التطوير"],
    badgeColor: "amber",
    title: ["AI Drug Discovery Training Unit", "وحدة تدريب اكتشاف الدواء بالذكاء الاصطناعي"],
    tagline: [
      "Certified modular training on cutting-edge molecular generative models and molecular docking.",
      "تدريب معياري معتمد على أحدث نماذج التوليد الجزيئي والمحاكاة الحيوية."
    ],
    problem: [
      "Traditional university curricula do not yet encompass modern AI-first drug screening pipelines such as diffusion molecular generation and AlphaFold integration.",
      "المناهج الأكاديمية التقليدية لا تغطي بعد تقنيات الذكاء الاصطناعي التوليدي مثل نمذجة الانتشار وحوسبة تراكيب ألفافولد."
    ],
    solution: [
      "A standardized 12-module hybrid training curriculum complete with sandbox computing environments, virtual wet labs, and industrial case studies.",
      "منهج هجين معتمد من 12 وحدة تعليمية يضم بيئات برمجية سحابية ومختبرات افتراضية ودراسات حالة صناعية حقيقية."
    ],
    targetBeneficiaries: [
      "Pharmacy faculties, healthcare practitioners, software engineers entering computational biology.",
      "كليات الصيدلة، الممارسون الصحيون، ومطورو البرمجيات الراغبون بالتخصص في التقنية الحيوية."
    ],
    keyPartners: [
      "Saudi Food & Drug Authority (SFDA) Academic Liaison, University Teaching Hospitals",
      "برامج التعاون الأكاديمي مع هيئة الغذاء والدواء، والمستشفيات الجامعية"
    ],
    kpis: [
      { label: ["Modules Developed", "الوحدات المطورة"], value: "8 / 12", progress: 66 },
      { label: ["Accredited Instructors", "المدربون المعتمدون"], value: "24", progress: 80 },
      { label: ["Pilot Trainees", "متدربو المرحلة التجريبية"], value: "180", progress: 60 }
    ],
    funding: ["Society Innovation Fund", "صندوق الابتكار المؤسسي بالجمعية"],
    reportsAvailable: ["Curriculum Framework Whitepaper 2026"]
  },
  {
    id: "hackathon",
    category: ["AI & Drug Innovation", "الذكاء الاصطناعي وابتكار الدواء"],
    status: ["Planned", "مخطط"],
    badgeColor: "purple",
    title: ["AI for Drug Innovation Hackathon", "هاكاثون الذكاء الاصطناعي لابتكار الدواء"],
    tagline: [
      "The premier national hackathon uniting technology developers, pharmacologists, and clinical specialists.",
      "الحدث الوطني الأبرز لربط مطوري التقنية وعلماء الصيدلة ومبتكري الرعاية الصحية."
    ],
    problem: [
      "Siloed ecosystems: tech founders lack biological domain depth, while healthcare researchers lack rapid software engineering capabilities.",
      "العزلة بين القطاعات: افتقار رواد التقنية للعمق الحيوي وافتقار الباحثين الصحيين للقدرات البرمجية السريعة."
    ],
    solution: [
      "A 72-hour high-intensity national challenge focusing on 4 critical health tracks with SAR 300,000 in seed prizes and direct incubation pathway for winning concepts.",
      "تحدٍ وطني مكثف لمدة 72 ساعة على 4 مسارات صحية استراتيجية مع جوائز تمويل أولي بقيمة 300,000 ريال ومسار احتضان فوري."
    ],
    targetBeneficiaries: [
      "Tech developers, medical innovators, university student teams, startup founders.",
      "مطورو البرمجيات، رواد الابتكار الطبي، الفرق الطلابية الجامعية، ومؤسسو الشركات الناشئة."
    ],
    keyPartners: [
      "Ministry of Communications and Information Technology (MCIT), Venture Accelerators, Saudi Pharma Companies",
      "وزارة الاتصالات وتقنية المعلومات، مسرعات الأعمال الاستثمارية، وشركات الدواء الوطنية"
    ],
    kpis: [
      { label: ["Expected Teams", "الفرق المتوقعة"], value: "60+ Teams", progress: 75 },
      { label: ["Prize & Grant Pool", "مجموع الجوائز والمنح"], value: "﷼300,000", progress: 100 },
      { label: ["Challenge Tracks", "مسارات التحدي"], value: "4 Tracks", progress: 100 }
    ],
    funding: ["Corporate Tech Sponsors & Innovation Partnerships", "رعاة التقنية والشراكات الابتكارية"],
    reportsAvailable: ["Hackathon Guidelines & Tracks Book"]
  },
  {
    id: "dawai-bi-tariqati",
    category: ["Health Innovation", "الابتكار الصحي"],
    status: ["Pilot", "تجريبي"],
    badgeColor: "amber",
    title: ["Dawā’i Bi-Tariqati — Personalized Medication", "مبادرة دوائي بطريقتي (الدواء المخصص)"],
    tagline: [
      "AI-assisted pharmacogenomic profiling for tailored medication regimens and adverse drug event prevention.",
      "منظومة ذكاء اصطناعي لضبط الجرعات الدوائية وفق البصمة الجينية وتقليل الأعراض الجانبية."
    ],
    problem: [
      "Standard 'one-size-fits-all' drug regimens lead to frequent preventable hospitalizations from adverse drug reactions and treatment failures.",
      "الجرعات الدوائية الموحدة للجميع تتسبب سنوياً في مضاعفات علاجية ودخول متكرر للمستشفيات يمكن تلافيه."
    ],
    solution: [
      "An intelligent clinical decision-support companion that cross-analyzes patient genetic markers, kidney/liver profiles, and drug-drug interaction databases to suggest personalized dosages.",
      "نظام إكلينيكي داعم للقرار يربط المؤشرات الحيوية والتاريخ الجيني وتفاعلات الأدوية للتوصية بالجرعة الدقيقة لكل مريض."
    ],
    targetBeneficiaries: [
      "Patients on complex multi-drug regimens, oncology patients, geriatric care, clinical pharmacists.",
      "مرضى الأمراض المزمنة المتعددة، مرضى الأورام، كبار السن، والصيادلة السريريون."
    ],
    keyPartners: [
      "Specialist Medical Centers, Pharmacogenomics Research Chairs, Community Pharmacies",
      "المراكز الطبية التخصصية، كراسي أبحاث الجينوم الصيدلاني، وشبكات الصيدليات المجتمعية"
    ],
    kpis: [
      { label: ["Pilot Clinical Sites", "المواقع السريرية التجريبية"], value: "3 Hospitals", progress: 100 },
      { label: ["Enrolled Patients", "المرضى الخاضعون للمتابعة"], value: "520", progress: 85 },
      { label: ["Adverse Events Reduced", "انخفاض المضاعفات الدوائية"], value: "34%", progress: 90 }
    ],
    funding: ["Healthcare Innovation Grants", "منح الابتكار في الرعاية الصحية"],
    reportsAvailable: ["Clinical Safety & Pilot Evaluation 2026"]
  },
  {
    id: "accelerator",
    category: ["AI & Drug Innovation", "الذكاء الاصطناعي وابتكار الدواء"],
    status: ["Active", "نشط"],
    badgeColor: "emerald",
    title: ["AI Drug Innovation Accelerator", "مُسرّعة الابتكار الدوائي بالذكاء الاصطناعي"],
    tagline: [
      "Bridging the lab-to-market translation for Saudi biotech startups and algorithmic drug discovery platforms.",
      "سد الفجوة بين الأبحاث المختبرية والسوق للشركات السعودية الناشئة في التقنية الحيوية."
    ],
    problem: [
      "Promising academic drug discovery algorithms often perish in the 'valley of death' before reaching preclinical validation or commercial licensing.",
      "كثير من الخوارزميات الدوائية الواعدة في الجامعات تتعثر قبل الوصول إلى مرحلة التحقق قبل السريري والترخيص التجاري."
    ],
    solution: [
      "A 9-month accelerator providing supercomputing clusters, regulatory guidance with SFDA, bio-assay laboratory matching, and access to biotech angel investors.",
      "برنامج تسريع لمدة 9 أشهر يوفر حوسبة فائقة، استشارات تنظيمية، ربطاً مع مختبرات التحقق الحيوي، وشبكة مستثمرين متخصصين."
    ],
    targetBeneficiaries: [
      "Biotech spin-offs, university patent holders, computational biology founders.",
      "الشركات المنبثقة من الجامعات، أصحاب براءات الاختراع، ومؤسسو شركات التقنية الحيوية."
    ],
    keyPartners: [
      "National Biotech Strategy Initiatives, Research Parks, Venture Capital Funds",
      "مبادرات الاستراتيجية الوطنية للتقنية الحيوية، واحات الأبحاث، وصناديق رأس المال الجريء"
    ],
    kpis: [
      { label: ["Accelerated Startups", "الشركات الناشئة المحتضنة"], value: "8 Startups", progress: 80 },
      { label: ["Patents Guided", "براءات الاختراع المدعومة"], value: "6 Patents", progress: 75 },
      { label: ["Follow-on Capital Raised", "التمويل الإضافي المستقطب"], value: "﷼4.5M", progress: 90 }
    ],
    funding: ["Venture Philanthropy & Innovation Seed Funds", "التمويل الخيري الاستثماري وصناديق البذور الابتكارية"],
    reportsAvailable: ["Accelerator Cohort I Demo Day Report"]
  }
] as const;

export const aiPipelineSteps = [
  {
    step: "01",
    name: ["Target Identification", "تحديد الهدف البيولوجي"],
    description: [
      "Multi-omics data mining and graph neural networks pinpoint precise disease proteins and vulnerability nodes in minutes rather than years.",
      "تنقيب البيانات الحيوية والشبكات العصبية لتحديد البروتينات المسببة للمرض ونقاط الضعف الجزيئية خلال دقائق بدلاً من سنوات."
    ],
    speedup: ["5x Faster", "أسرع بـ 5 أضعاف"],
    metric: "94.2% Predictive Accuracy"
  },
  {
    step: "02",
    name: ["Generative Molecular Design", "التصميم الجزيئي التوليدي"],
    description: [
      "Diffusion models synthesize billions of novel virtual chemical scaffolds engineered specifically to fit target binding pockets.",
      "نماذج الانتشار التوليدية تصمم مليارات الهياكل الكيميائية الجديدة الموجهة بدقة لجيوب الارتباط البروتيني."
    ],
    speedup: ["100x Scale", "100 ضعف التغطية"],
    metric: "1.2B Virtual Compounds"
  },
  {
    step: "03",
    name: ["Binding Affinity & Docking", "المحاكاة والارتباط الجزيئي"],
    description: [
      "Physics-informed deep learning predicts 3D thermodynamic stability and binding free energy with sub-angstrom atomic precision.",
      "التعلم العميق المدعم بقوانين الفيزياء يتنبأ بالاستقرار الديناميكي الحراري وطاقة الارتباط بدقة تحت الذرية."
    ],
    speedup: ["In Silico Validation", "تحقق حوسبي فوري"],
    metric: "Kd < 10nM Optimization"
  },
  {
    step: "04",
    name: ["ADMET Safety Screening", "الفحص الاستباقي للسمية (ADMET)"],
    description: [
      "Automated prediction of absorption, distribution, metabolism, excretion, and organ toxicity filters out risky candidates before synthesis.",
      "التنبؤ الآلي بالامتصاص والتوزيع والأيض والإخراج والسمية لاستبعاد المركبات الخطرة قبل تصنيعها مخبرياً."
    ],
    speedup: ["70% Cost Reduction", "وفر 70% من التكلفة"],
    metric: "98% Cardiotox Filtration"
  },
  {
    step: "05",
    name: ["Preclinical & Clinical Bridge", "الترجمة السريرية السريعة"],
    description: [
      "Virtual patient twins and trial stratification algorithms derisk wet lab assays and accelerate regulatory filing readiness.",
      "التوائم الافتراضية وخوارزميات تصنيف المرضى لتسريع التجارب السريرية وتجهيز الملفات التنظيمية بدقة عالية."
    ],
    speedup: ["12 Mo vs 5 Yrs", "12 شهراً مقابل 5 سنوات"],
    metric: "Accelerated IND Pathway"
  }
] as const;

export const boardMembers = [
  {
    name: ["Dr. Abdulmohsen Hameed Alrohaimi", "د. عبد المحسن حميد الرحيمي"],
    role: ["Chairman of the Board", "رئيس مجلس الإدارة"],
    credentials: [
      "Chairman of the Board of Directors. Leading the national strategic vision of AI-driven medicine and healthcare innovation in Saudi Arabia.",
      "رئيس مجلس إدارة الجمعية، يقود التوجه الاستراتيجي لابتكار الأدوية بالذكاء الاصطناعي وتطوير قطاع الرعاية الصحية بالمملكة."
    ]
  },
  {
    name: ["Eng. Aljohrah Essam Alsahn", "مهندس. الجوهرة عصام الصحن"],
    role: ["Vice Chairman", "نائب رئيس مجلس الإدارة"],
    credentials: [
      "Vice Chairman of the Board. Guiding technology execution, digital transformation, and strategic institutional partnerships.",
      "نائب رئيس مجلس الإدارة، تقود مسارات التحول الرقمي وتطوير الحلول التقنية المتقدمة والشراكات المؤسسية."
    ]
  },
  {
    name: ["Dr. Hamoud Hleil Alshammari", "د. حمود هليل الشمري"],
    role: ["Board Member", "عضو مجلس الإدارة"],
    credentials: [
      "Board Member. Expert in clinical governance, healthcare delivery models, and medical quality standards.",
      "عضو مجلس الإدارة، خبير في الحوكمة السريرية، ونماذج الرعاية الصحية المتقدمة، ومعايير الجودة الطبية."
    ]
  },
  {
    name: ["Dr. Fayez Suliman M. Alharbi", "د. فايز سليمان الحربي"],
    role: ["Board Member", "عضو مجلس الإدارة"],
    credentials: [
      "Board Member. Specialized in pharmaceutical innovation, drug development protocols, and academic collaboration.",
      "عضو مجلس الإدارة، متخصص في ابتكار الأدوية وتطوير بروتوكولات الأبحاث الدوائية والشراكات الأكاديمية."
    ]
  },
  {
    name: ["Dr. Abdullah Salem Alrashood", "د. عبدالله سالم الرشود"],
    role: ["Board Member", "عضو مجلس الإدارة"],
    credentials: [
      "Board Member. Focusing on clinical research oversight, bioethics, and national health capability building.",
      "عضو مجلس الإدارة، يركز على الإشراف على الأبحاث السريرية، والأخلاقيات الحيوية، وبناء القدرات الوطنية."
    ]
  }
] as const;

export const coreValues = [
  {
    id: "quality",
    title: ["Excellence in quality", "التميز في الجودة"],
    description: [
      "Commitment to providing high quality services.",
      "التزام بتقديم خدمات عالية الجودة."
    ]
  },
  {
    id: "creativity",
    title: ["Creativity and innovation", "الإبداع والابتكار"],
    description: [
      "Develop innovative solutions to improve healthcare.",
      "تطوير حلول مبتكرة لتحسين الرعاية الصحية."
    ]
  },
  {
    id: "transparency",
    title: ["Transparency and accountability", "الشفافية والمساءلة"],
    description: [
      "Ensuring transparency in all operations.",
      "ضمان الشفافية في جميع العمليات."
    ]
  },
  {
    id: "cooperation",
    title: ["Academic and industrial cooperation", "التعاون الأكاديمي والصناعي"],
    description: [
      "Involving universities and research institutions.",
      "إشراك الجامعات والمؤسسات البحثية."
    ]
  }
] as const;

export const institutionalGoals = [
  {
    id: "capabilities",
    title: [
      "Build national capabilities in AI to advance the healthcare sector.",
      "بناء القدرات الوطنية في مجال الذكاء الاصطناعي لتعزيز قطاع الرعاية الصحية."
    ]
  },
  {
    id: "studies",
    title: [
      "Foster innovative studies utilizing artificial intelligence.",
      "دعم الدراسات المبتكرة باستخدام الذكاء الاصطناعي."
    ]
  },
  {
    id: "leadership",
    title: [
      "Lead pharmaceutical innovation in the Kingdom.",
      "قيادة الابتكار الدوائي في المملكة."
    ]
  },
  {
    id: "outcomes",
    title: [
      "Improve healthcare outcomes through innovative solutions.",
      "تحسين نتائج الرعاية الصحية من خلال حلول مبتكرة."
    ]
  }
] as const;

export const visionAndMission = {
  vision: [
    "To become a leading center in the development of innovative medicines using artificial intelligence.",
    "مركز رائد في تطوير الأدوية المبتكرة باستخدام الذكاء الاصطناعي."
  ],
  mission: [
    "Empower innovation in drug development, AI-driven solutions for enhanced healthcare, Improve the quality of healthcare in the Kingdom.",
    "تمكين الابتكار في تطوير الأدوية من خلال حلول الذكاء الاصطناعي، وتعزيز جودة الرعاية الصحية في المملكة."
  ]
} as const;

export const proposedStrategicInitiatives = [
  {
    num: "1",
    title: ["AI-Powered Drug Development", "تطوير الأدوية المدعومة بالذكاء الاصطناعي"],
    description: [
      "Accelerate discovery and development of new therapies.",
      "تسريع الاكتشاف وتطوير الأدوية."
    ]
  },
  {
    num: "2",
    title: ["National Pharmaceutical Database", "إنشاء قاعدة بيانات وطنية للأدوية"],
    description: [
      "Improve drug safety and efficacy by tracking usage and outcomes.",
      "تحسين الوصول إلى المعلومات الدوائية وأمان وفعالية الدواء وتتبع الاستخدام والنتائج."
    ]
  },
  {
    num: "3",
    title: ["Streamlined Clinical Trials", "تحسين وتسريع التجارب السريرية"],
    description: [
      "Optimize trial design and recruitment for faster results.",
      "تطوير بروتوكولات أسرع وأكثر كفاءة لتسريع النتائج وتصميم التجارب السريرية."
    ]
  },
  {
    num: "4",
    title: ["AI Training Programs", "تقديم برامج تدريبية متخصصة في الذكاء الاصطناعي"],
    description: [
      "Equip healthcare professionals with the skills to leverage AI tools.",
      "بناء وتأهيل الكوادر الصحية وتزويدها بالمهارات اللازمة للتعامل مع أدوات وتقنيات الذكاء الاصطناعي."
    ]
  }
] as const;

export const strategyPillars = [
  {
    num: "1",
    title: ["Partnerships", "الشراكات"],
    description: [
      "Strengthening cooperation between the public and private sectors.",
      "تعزيز التعاون بين القطاعين العام والخاص."
    ]
  },
  {
    num: "2",
    title: ["Accelerated Approvals", "التسريع الرقمي"],
    description: [
      "AI-powered solutions for faster decision-making.",
      "تطبيق حلول الذكاء الاصطناعي لتسريع الموافقات والقرارات التنظيمية."
    ]
  },
  {
    num: "3",
    title: ["Global Collaboration", "التعاون الدولي"],
    description: [
      "Boosting innovation through shared knowledge.",
      "تعزيز التعاون الدولي في مجال ابتكار الأدوية وتبادل المعرفة والخبرات."
    ]
  },
  {
    num: "4",
    title: ["Specialized skills", "مهارات متخصصة"],
    description: [
      "Training and upskilling for a skilled workforce.",
      "تطوير مهارات وطنية متخصصة لبناء قوة عاملة مؤهلة في الرعاية الصحية والتقنية."
    ]
  }
] as const;

export const proposedWorkTeams = [
  {
    id: "tech",
    title: ["Digital and Information Technologies Team", "فريق التقنيات الرقمية والمعلومات"],
    description: [
      "Ensure efficient operation of systems Technology.",
      "ضمان التشغيل الفعال للأنظمة التقنية."
    ]
  },
  {
    id: "hr",
    title: ["Human Resources Management Team", "فريق إدارة الموارد البشرية"],
    description: [
      "Dedicated to ensuring a positive work environment.",
      "مُكرس لضمان بيئة عمل إيجابية."
    ]
  },
  {
    id: "pr",
    title: ["Partnerships and Public Relations Team", "فريق الشراكات والعلاقات العامة"],
    description: [
      "Building strong relationships with partners.",
      "بناء علاقات قوية ومستدامة مع الشركاء."
    ]
  },
  {
    id: "rd",
    title: ["Research and Development Team", "فريق البحث والتطوير"],
    description: [
      "Dedicated to innovating and developing solutions Technologies.",
      "مُكرس لابتكار الحلول وتطوير التقنيات الدوائية."
    ]
  },
  {
    id: "ops",
    title: ["Operations management team", "فريق إدارة العمليات"],
    description: [
      "Dedicated to ensuring operational efficiency.",
      "مُكرس لضمان الكفاءة والفاعلية في التشغيل."
    ]
  }
] as const;

export const marketAndImpactData = {
  globalMarketSize: {
    valuation: "$45 Billion",
    forecast: [
      "Projected global AI drug discovery market valuation by 2030, driven by generative molecular algorithms and robotic screening.",
      "القيمة السوقية العالمية المتوقعة للذكاء الاصطناعي في اكتشاف الأدوية بحلول 2030 مدفوعة بالخوارزميات الجزيئية التوليدية."
    ],
    growthRate: "25–30% CAGR",
    timelineReduction: "40–60%",
    costReduction: "30–50%"
  },
  marketSize: {
    headline: [
      "Global AI Healthcare Market Size $45 Billion Market Projection 2026",
      "توقعات بلوغ سوق الذكاء الاصطناعي في الرعاية الصحية 45 مليار دولار بحلول 2026"
    ],
    description: [
      "Significant growth in this sector, attracting new investments and accelerating technological adoption globally and in Saudi Arabia.",
      "نمو متسارع في هذا القطاع واستقطاب استثمارات جديدة تعزز مكانة المملكة كمركز إقليمي للابتكار الصحي."
    ],
    saudiPotential: [
      "The potential of the Kingdom of Saudi Arabia",
      "إمكانات ومكانة المملكة العربية السعودية الرائدة"
    ]
  },
  challenges: [
    {
      challenge: ["Shortage of specialized talent", "نقص الكوادر المتخصصة"],
      solution: ["Intensive training programs for local talents", "برامج تدريبية مكثفة للكفاءات والكوادر الوطنية"]
    },
    {
      challenge: ["The need to accelerate regulatory approvals", "الحاجة لتسريع الموافقات التنظيمية والقرارات"],
      solution: ["Strengthening partnerships with international organizations & regulatory AI tools", "تعزيز الشراكات مع المنظمات الدولية وأتمتة دراسات الاعتماد"]
    }
  ],
  expectedOutcomes: [
    {
      title: ["Less reliance on imported medicines", "تقليل الاعتماد على الأدوية المستوردة"],
      description: ["Promoting self-sufficiency in health care.", "تعزيز الاكتفاء الذاتي والأمن الدوائي في الرعاية الصحية."]
    },
    {
      title: ["Faster access to innovative treatments", "وصول أسرع للعلاجات المبتكرة"],
      description: ["Accelerating access to new and effective treatments.", "تسريع إيصال العلاجات الجديدة والفعالة للمرضى."]
    },
    {
      title: ["Job opportunities specialized in the field of artificial intelligence", "فرص عمل متخصصة في مجال الذكاء الاصطناعي"],
      description: ["Providing new job opportunities in the field of advanced technology.", "توفير وظائف جديدة ومتقدمة في مجالات التقنية والرعاية الصحية الحديثة."]
    }
  ],
  financialSustainability: [
    {
      title: ["Developing training programs", "تطوير البرامج التدريبية والاستشارات"],
      description: ["Research services to generate revenue.", "تقديم خدمات بحثية وتدريبية تخصصية لتوليد عوائد مستدامة."]
    },
    {
      title: ["Fundraising", "تنمية الموارد والشراكات"],
      description: ["Involving strategic partners, philanthropic endowments, and corporate sponsors.", "إشراك الشركاء الاستراتيجيين والأوقاف الصحية ورعاة المسؤولية الاجتماعية."]
    },
    {
      title: ["Business Models", "نماذج الأعمال"],
      description: ["Relying on innovation, technology transfer, and sustainable non-profit solutions.", "الاعتماد على الابتكار ونقل التقنية وتطوير حلول ريادية مستدامة."]
    }
  ]
} as const;

export const contactDetails = {
  phone: "+966 50 521 0112",
  phoneDisplay: "+966 50 521 0112",
  whatsappUrl: "https://wa.me/966505210112",
  email: "info@aimedicine.org.sa",
  complianceEmail: "compliance@aimedicine.org.sa",
  websiteUrl: "https://aimedicine.org.sa",
  poweredBy: {
    name: "businessbridges.net",
    url: "https://businessbridges.net/"
  },
  urgentNote: [
    "For urgent inquiries and direct communication via WhatsApp",
    "للاستفسارات العاجلة والتواصل المباشر عبر واتساب"
  ],
  startChat: [
    "Start Chat",
    "بدء المحادثة"
  ]
} as const;

export const governanceInfo = {
  legalName: [
    "With Artificial Intelligence We Innovate Medicine (WAIWIM)",
    "جمعية بالذكاء الاصطناعي نبتكر الدواء"
  ],
  legalForm: ["Nonprofit Scientific & Health Association", "جمعية أهلية صحية وعلمية غير ربحية"],
  supervisoryAuthority: ["National Center for Non-Profit Sector (NCNP)", "المركز الوطني لتنمية القطاع غير الربحي"],
  sectorSupervision: ["Ministry of Health / Saudi Vision 2030 Health Ecosystem", "وزارة الصحة / منظومة التحول الصحي لرؤية 2030"],
  registrationNumber: ["License #5421/NCNP", "ترخيص رقم 5421 / م.و.ت.ق.خ"],
  complianceScore: ["98.8% NCNP Audit Rating", "تقييم امتثال 98.8% وفق معايير المركز الوطني"],
  financialYear: ["January 1 – December 31", "1 يناير – 31 ديسمبر"],
  externalAuditor: ["Certified Independent Public Accountants (CPA)", "مراجع حسابات خارجي مستقل ومعتمد"],
  boardMembers: boardMembers,
  coreValues: coreValues,
  goals: institutionalGoals,
  visionAndMission: visionAndMission,
  governancePillars: [
    {
      title: ["Financial Sustainability", "الاستدامة المالية"],
      description: [
        "Secure financial resources through partnerships and donations.",
        "تأمين الموارد المالية من خلال الشراكات والتبرعات والأوقاف."
      ]
    },
    {
      title: ["Compliance with laws", "الامتثال للقوانين"],
      description: [
        "Adherence to relevant laws and regulations.",
        "الالتزام الكامل بالأنظمة واللوائح والتعليمات الصادرة من الجهات الإشرافية."
      ]
    },
    {
      title: ["Transparency and accountability", "الشفافية والمساءلة"],
      description: [
        "Open communication and accountability in all operations.",
        "التواصل المفتوح والمساءلة والنزاهة في كافة العمليات المؤسسية."
      ]
    }
  ],
  committees: [
    {
      name: ["Audit & Risk Committee", "لجنة المراجعة والمخاطر"],
      charter: [
        "Oversees financial reporting integrity, internal control systems, risk management frameworks, and independent external audit operations.",
        "الإشراف على نزاهة التقارير المالية، ومنظومة الرقابة الداخلية، وإدارة المخاطر، وأعمال التدقيق الخارجي المستقل."
      ],
      members: "3 Independent Members"
    },
    {
      name: ["Governance & Nominations Committee", "لجنة الحوكمة والترشيحات"],
      charter: [
        "Ensures board succession, compliance with NCNP nonprofit regulations, disclosure policies, and code of conduct enforcement.",
        "ضمان التتابع القيادي للمجلس، والامتثال لأنظمة القطاع غير الربحي، وتطبيق سياسات الإفصاح وقواعد السلوك المهني."
      ],
      members: "3 Board Members"
    },
    {
      name: ["Programs & Impact Committee", "لجنة البرامج والأثر الصحي"],
      charter: [
        "Rigorously monitors initiative milestones, social ROI metrics, beneficiary safety protocols, and resource allocation efficiency.",
        "المتابعة الصارمة لمؤشرات أداء المبادرات، والعائد الاجتماعي على الاستثمار، وسلامة المستفيدين، وكفاءة الصرف."
      ],
      members: "4 Specialized Members"
    },
    {
      name: ["Scientific Research & Innovation Committee", "لجنة البحث العلمي والابتكار"],
      charter: [
        "Evaluates pharmaceutical AI research proposals, computational ethical standards, intellectual property (IP), and institutional collaborations.",
        "تحكيم المشاريع البحثية الدوائية، والمعايير الأخلاقية الحوسبية، والملكية الفكرية، والشراكات العلمية."
      ],
      members: "5 Academic Specialists"
    }
  ]
};


export const portalSimulations = {
  donor: {
    title: ["Donor Transparency Portal", "بوابة شفافية المانحين"],
    subtitle: ["Track every Riyal from allocation to verified clinical impact.", "تتبع كل ريال من لحظة التخصيص حتى الأثر الإكلينيكي الميداني."],
    contributions: [
      { campaign: "Hakeem Medical Bank Equipment Fund", amount: "﷼50,000", date: "Feb 2026", allocation: "12 Oxygen Concentrators & Calibration", status: "Delivered", receipt: "WAIWIM-REC-8921" },
      { campaign: "Thousand Miles AI Fellowship Cohort II", amount: "﷼25,000", date: "Jan 2026", allocation: "Supercomputing Grants for 5 Scholars", status: "Active in Lab", receipt: "WAIWIM-REC-8840" }
    ],
    financialBreakdown: [
      { name: ["Direct Program Implementation", "تنفيذ البرامج المباشر"], percentage: 82, color: "#10b981" },
      { name: ["Scientific Computing & Hardware", "الحوسبة العلمية والتجهيزات"], percentage: 11, color: "#06b6d4" },
      { name: ["Governance, Auditing & Compliance", "الحوكمة والتدقيق والامتثال"], percentage: 7, color: "#f59e0b" }
    ],
    socialRoi: "3.8x",
    beneficiariesSupported: "320 Individuals & 3 Clinics"
  },
  volunteer: {
    title: ["Volunteer Impact Portal", "بوابة المتطوعين المعتمدة"],
    subtitle: ["Documented hours, certified competencies, and real healthcare impact.", "ساعات موثقة رسمياً، كفاءات معتمدة، وأثر صحي حقيقي."],
    profile: {
      name: "Dr. Sarah Al-Otaibi",
      role: "Lead Clinical Pharmacologist & Volunteer Specialist",
      hoursLogged: 64,
      nationalPortalVerified: true,
      badge: "Master Research Mentor",
      initiativesAssigned: ["Hakeem Medical Bank", "Dawā’i Bi-Tariqati"]
    },
    openTasks: [
      { title: ["Biomedical Equipment Calibration Review", "مراجعة معايرة أجهزة التنفس الطبية"], hours: "4 hrs", urgency: "High", location: "Riyadh Logistics Center" },
      { title: ["Mentoring Hackathon Biotech Teams", "إرشاد الفرق المتنافسة في هاكاثون الدواء"], hours: "6 hrs", urgency: "Medium", location: "Virtual / Hybrid" },
      { title: ["Community Health Clinic Outreach", "مرافقة القافلة الطبية للمناطق الطرفية"], hours: "8 hrs", urgency: "Scheduled", location: "Al-Kharj Health Center" }
    ]
  },
  partner: {
    title: ["Strategic Partner Portal", "بوابة الشركاء الاستراتيجيين"],
    subtitle: ["Collaborative governance, shared workstreams, and milestone tracking.", "حوكمة تشاركية، مسارات عمل موحدة، ومتابعة دقيقة للمخرجات."],
    activeMous: [
      { partner: "King Saud University — College of Pharmacy", focus: "AI Molecular Docking Research", duration: "2024 – 2027", progress: 75, deliverables: "3 Joint Publications, 2 Patents Filed" },
      { partner: "King Faisal Specialist Hospital & Research Centre", focus: "Precision Pharmacogenomics Patient Cohort", duration: "2025 – 2026", progress: 60, deliverables: "520 Patient Records Analyzed" },
      { partner: "Saudi Pharmaceutical Industries (SPIMACO)", focus: "Industrial Manufacturing Feasibility of AI Hits", duration: "2025 – 2028", progress: 40, deliverables: "Phase I Preclinical Assays" }
    ]
  },

  individual: {
    title: ["Patient & Beneficiary Portal", "بوابة المريض والمستفيد"],
    subtitle: ["Track your medical equipment requests and health status.", "تتبع طلبات الأجهزة الطبية وحالتك الصحية."],
    requests: [
      { id: "REQ-9012", type: "Oxygen Concentrator", status: "Approved - Out for Delivery", date: "Mar 2026" },
      { id: "REQ-8834", type: "Wheelchair", status: "Delivered", date: "Jan 2026" }
    ],
    appointments: [
      { clinic: "Al-Kharj Health Center", date: "Mar 15, 2026", doctor: "Dr. Ahmed" }
    ]
  },
  pharmacy: {
    title: ["Pharmacy & Medical Partner Portal", "بوابة الصيدليات والشركاء الطبيين"],
    subtitle: ["Manage medication dispensations and medical equipment inventory.", "إدارة صرف الأدوية ومخزون الأجهزة الطبية."],
    inventory: [
      { item: "Oxygen Concentrators", stock: 15, status: "Low Stock" },
      { item: "Wheelchairs", stock: 42, status: "In Stock" },
      { item: "CPAP Machines", stock: 8, status: "Critical" }
    ],
    recentDispensations: [
      { patientId: "PAT-4021", item: "Oxygen Concentrator", date: "Mar 01, 2026", status: "Completed" },
      { patientId: "PAT-3911", item: "Wheelchair", date: "Feb 28, 2026", status: "Completed" }
    ]
  },
  admin: {
    title: ["System Manager Dashboard", "لوحة تحكم مدير النظام"],
    subtitle: ["Full system oversight, user management, and global metrics.", "إشراف كامل على النظام، إدارة المستخدمين، والمقاييس العامة."],
    systemHealth: [
      { module: "Database Server", status: "Online", uptime: "99.99%" },
      { module: "AI Pharmacogenomic Engine", status: "Online", uptime: "99.95%" },
      { module: "National Volunteer Sync API", status: "Online", uptime: "100%" }
    ],
    userStats: {
      totalUsers: 12450,
      activeDonors: 3200,
      activeVolunteers: 850,
      pendingVerifications: 45
    }
  },
  board: {
    title: ["Board of Directors & Governance Cockpit", "لوحة قيادة مجلس الإدارة والحوكمة"],
    subtitle: ["Executive overview of strategic compliance, fiduciary health, and organizational risks.", "رؤية تنفيذية شاملة للالتزام الاستراتيجي والموقف المالي وسجل المخاطر."],
    complianceStatus: [
      { requirement: "NCNP Annual Financial Audit Submission", deadline: "Completed", status: "Compliant" },
      { requirement: "Board & General Assembly Meetings Attendance Quorum", deadline: "95% Quorum", status: "Compliant" },
      { requirement: "Annual Conflict-of-Interest Disclosures Signed", deadline: "100% Signed", status: "Compliant" },
      { requirement: "National Volunteer Platform Integration", deadline: "Synchronized", status: "Compliant" }
    ],
    riskMatrix: [
      { risk: "Compute Cluster Availability for Fellows", severity: "Low", mitigation: "Hybrid cloud failover SLA active" },
      { risk: "Medical Device Regulatory Recertification", severity: "Managed", mitigation: "SFDA biomedical engineer certified on-site" },
      { risk: "Data Privacy & Genomic Anonymization", severity: "Low", mitigation: "Zero-knowledge encryption & local residency" }
    ]
  }
};

export const reports = [
  {
    title: ["Q1 2026 Comprehensive Impact & Governance Report", "تقرير الأثر والحوكمة الشامل للربع الأول 2026"],
    category: ["Impact Reports", "تقارير الأثر"],
    date: ["March 2026", "مارس 2026"],
    pages: "48 Pages",
    filesize: "3.4 MB",
    summary: [
      "Detailed quarterly audit covering 620 medical devices distributed via Hakeem Bank, 420 scholars in Thousand Miles, and full financial disclosures.",
      "تدقيق ربع سنوي شامل يغطي توزيع 620 جهازاً طبياً عبر بنك حكيم، و420 باحثاً في خطوة الألف ميل، مع الإفصاح المالي الكامل."
    ]
  },
  {
    title: ["2025 Audited Financial Statements & Independent Auditor Report", "القوائم المالية المدققة وتقرير المحاسب القانوني 2025"],
    category: ["Financial Statements", "القوائم المالية"],
    date: ["January 2026", "يناير 2026"],
    pages: "32 Pages",
    filesize: "2.1 MB",
    summary: [
      "Audited statement of financial position, statement of activities, cash flows, and notes prepared in accordance with IFRS for non-profit entities.",
      "بيان المركز المالي وقائمة الأنشطة والتدفقات النقدية والإيضاحات المتممة المعدة وفق المعايير المحاسبية المعتمدة للجهات غير الربحية."
    ]
  },
  {
    title: ["Annual Board Governance & Transparency Report 2025", "تقرير حوكمة مجلس الإدارة والشفافية لعام 2025"],
    category: ["Governance Reports", "تقارير الحوكمة"],
    date: ["February 2026", "فبراير 2026"],
    pages: "56 Pages",
    filesize: "4.2 MB",
    summary: [
      "Board meeting records, attendance register, committee performance reviews, conflict-of-interest audit, and executive compensation disclosures.",
      "سجل اجتماعات المجلس، ونسب الحضور، وتقييم اللجان، ومراجعة سجل تعارض المصالح، ومكافآت الإدارة التنفيذية."
    ]
  },
  {
    title: ["AI in Drug Discovery: Accelerating Precision Pharmacology in Saudi Arabia", "الذكاء الاصطناعي في ابتكار الدواء: تسريع الصيدلة الدقيقة في المملكة"],
    category: ["Research Publications", "المنشورات البحثية"],
    date: ["December 2025", "ديسمبر 2025"],
    pages: "28 Pages",
    filesize: "5.8 MB",
    summary: [
      "Peer-reviewed whitepaper examining molecular generative algorithms and their strategic application in rare diseases prevalent in the Arab genome.",
      "ورقة بيضاء محكمة تستعرض خوارزميات التوليد الجزيئي وتطبيقها الاستراتيجي في الأمراض النادرة الأكثر شيوعاً في الجينوم العربي."
    ]
  },
  {
    title: ["Hakeem Medical Equipment Bank: Operational Protocols & Impact Evaluation", "بنك حكيم للأجهزة الطبية: البروتوكولات التشغيلية وتقييم الأثر الميداني"],
    category: ["Program Reports", "تقارير البرامج"],
    date: ["November 2025", "نوفمبر 2025"],
    pages: "36 Pages",
    filesize: "2.9 MB",
    summary: [
      "Standard operating procedures for device collection, biomedical safety calibration, infection control, and post-delivery maintenance.",
      "أدلة الإجراءات القياسية لجمع الأجهزة، والمعايرة الهندسية الحيوية، ومكافحة العدوى، وخدمات الصيانة الدورية بعد التسليم."
    ]
  },
  {
    title: ["Thousand Miles Step: Building the Future of Saudi Biotech Talent", "خطوة الألف ميل: بناء مستقبل الكفاءات السعودية في التقنية الحيوية"],
    category: ["Program Reports", "تقارير البرامج"],
    date: ["October 2025", "أكتوبر 2025"],
    pages: "24 Pages",
    filesize: "1.9 MB",
    summary: [
      "Curriculum overview, researcher demographics, patent ideas incubated, and institutional partnerships established during Cohort I.",
      "نظرة عامة على المنهج، والتركيبة السكانية للباحثين، والأفكار الابتكارية المحتضنة، والشراكات المبرمة خلال الدفعة الأولى."
    ]
  }
] as const;

export const donationCampaigns = [
  {
    id: "hakeem-campaign",
    title: ["Hakeem Medical Equipment Recovery & Delivery", "حملة بنك حكيم: توفير ومعايرة الأجهزة الطبية"],
    description: [
      "Funds the recovery, biomedical engineering recalibration, and delivery of 250 life-support & rehabilitation devices to low-income patients across Saudi Arabia.",
      "تمويل استعادة ومعايرة وتوصيل 250 جهازاً طبياً وتأهيلياً للمرضى الأشد حاجة في مختلف مناطق المملكة."
    ],
    targetAmount: 500000,
    raisedAmount: 385000,
    beneficiariesGoal: 250,
    beneficiariesReached: 195,
    tag: ["Health Access", "الوصول الصحي"]
  },
  {
    id: "research-grants-campaign",
    title: ["AI Drug Discovery Computational Grants", "منح الحوسبة الفائقة لاكتشاف الأدوية"],
    description: [
      "Sponsors GPU cloud infrastructure and molecular modeling compute clusters for 50 Saudi doctoral researchers working on critical pharmaceutical targets.",
      "رعاية البنية التحتية للحوسبة السحابية الفائقة لـ 50 باحث دكتوراه سعودي يعملون على أهداف دوائية حرجة."
    ],
    targetAmount: 350000,
    raisedAmount: 290000,
    beneficiariesGoal: 50,
    beneficiariesReached: 42,
    tag: ["Scientific Research", "البحث العلمي"]
  },
  {
    id: "personalized-medicine-campaign",
    title: ["Dawā’i Bi-Tariqati Patient Safety Pilot", "تطبيق الرعاية الدوائية المخصصة (دوائي بطريقتي)"],
    description: [
      "Deploys AI pharmacogenomic screening across 3 partner hospitals to eliminate severe adverse drug interactions for cancer and chronic patients.",
      "تطبيق الفحص الجيني الدوائي بالذكاء الاصطناعي في 3 مستشفيات شريكة لحماية مرضى الأورام والأمراض المزمنة من التفاعلات الدوائية الخطرة."
    ],
    targetAmount: 200000,
    raisedAmount: 145000,
    beneficiariesGoal: 500,
    beneficiariesReached: 380,
    tag: ["Clinical Innovation", "الابتكار الإكلينيكي"]
  }
] as const;

export const ui = {
  en: {
    explore: "Explore Our Initiatives",
    partner: "Partner With Us",
    portals: "Interactive Portals",
    learn: "Learn more",
    download: "Download Report",
    submit: "Submit Request",
    name: "Full Name",
    email: "Email Address",
    phone: "Phone Number",
    message: "Your Message",
    success: "Thank you. Your submission has been securely registered.",
    search: "Search programs, research, governance, or reports...",
    close: "Close",
    menu: "Open Navigation Menu",
    preview: "Verified Data Preview",
    filter: "Filter by Category",
    themeToggle: "Toggle Theme",
    roleSwitch: "Explore Role Dashboards",
    trackComplaint: "Track Ticket Status",
    voiceMatters: "Your Voice Matters",
    legalNotice: "WAIWIM (With AI We Innovate Medicine) is a legally registered Saudi non-profit association under NCNP oversight (License #5421)."
  },
  ar: {
    explore: "استكشف مبادراتنا",
    partner: "كن شريكاً استراتيجياً",
    portals: "البوابات التفاعلية",
    learn: "اعرف المزيد",
    download: "تحميل التقرير",
    submit: "إرسال الطلب",
    name: "الاسم الكامل",
    email: "البريد الإلكتروني",
    phone: "رقم الجوال",
    message: "نص الرسالة أو الملاحظة",
    success: "شكراً لك. تم تسجيل طلبك بنجاح في السجل النظامي.",
    search: "ابحث في البرامج، الأبحاث، الحوكمة، أو التقارير...",
    close: "إغلاق",
    menu: "فتح القائمة الرئيسية",
    preview: "بيانات رسمية معتمدة",
    filter: "تصفية حسب التصنيف",
    themeToggle: "تبديل المظهر",
    roleSwitch: "استكشف لوحات تحكم أصحاب المصلحة",
    trackComplaint: "متابعة حالة التذكرة",
    voiceMatters: "صوتكم مسموع (الشكاوى والمقترحات)",
    legalNotice: "جمعية الابتكار الدوائي بالذكاء الاصطناعي جمعية أهلية سعودية مسجلة نظامياً تحت إشراف المركز الوطني لتنمية القطاع غير الربحي."
  }
};

export const pageIntro = {
  about: [
    ["About Us", "من نحن"],
    [
      "A Saudi nonprofit institution leading health advancement through artificial intelligence, pharmaceutical research, and community impact.",
      "مؤسسة سعودية غير ربحية تقود التحول الصحي من خلال الذكاء الاصطناعي، والبحث الدوائي، والأثر المجتمعي المستدام."
    ]
  ],
  governance: [
    ["Governance & Transparency", "الحوكمة والشفافية المؤسسية"],
    [
      "Accountable board leadership, full financial disclosure, and complete regulatory adherence under Saudi non-profit governance standards.",
      "قيادة مسؤولة، إفصاح مالي شامل، والتزام تنظيمي كامل وفق أعلى معايير الحوكمة للقطاع غير الربحي في المملكة."
    ]
  ],
  programs: [
    ["Programs & Initiatives", "البرامج والمبادرات المؤسسية"],
    [
      "Governed, Measured, Reported — Transforming scientific breakthrough into tangible health equity.",
      "محكومة، مقاسة، وموثقة — نحو تحويل الابتكار العلمي المتقدم إلى أثر صحي حقيقي ومستدام."
    ]
  ],
  impact: [
    ["Our Impact Dashboard", "لوحة الأثر والمؤشرات المعتمدة"],
    [
      "Live verified performance metrics across beneficiaries reached, research completed, and medical equipment deployed.",
      "مؤشرات أداء ميدانية موثقة تعكس أعداد المستفيدين، والإنجازات البحثية، والأجهزة الطبية المسلمة لمستحقيها."
    ]
  ],
  research: [
    ["Research & AI Accelerator", "البحث العلمي ومسرعة الابتكار"],
    [
      "At the convergence of deep learning, structural bioinformatics, and next-generation drug discovery.",
      "حيث يلتقي التعلم العميق ونمذجة الحوسبة الحيوية بتطوير العلاجات الدوائية المبتكرة."
    ]
  ],
  partnerships: [
    ["Strategic Partnerships", "الشراكات الاستراتيجية والتحالفات"],
    [
      "Building a cohesive national biotechnology and health ecosystem with universities, hospitals, and industry leaders.",
      "بناء منظومة متكاملة للتقنية الحيوية والصحية بالتعاون مع الجامعات والمستشفيات التخصصية ورواد الصناعة."
    ]
  ],
  volunteer: [
    ["Volunteer Impact Portal", "بوابة التطوع الصحي والعلمي"],
    [
      "Deploy your scientific, technical, or community skills in high-impact initiatives officially registered on the National Volunteer Portal.",
      "وظّف مهاراتك العلمية أو التقنية أو الميدانية في مبادرات نوعية مسجلة رسمياً بالمنصة الوطنية للعمل التطوعي."
    ]
  ],
  support: [
    ["Support Our Mission", "ادعم مسيرتنا بشفافية كاملة"],
    [
      "Direct your Zakat and philanthropic donations toward audited, impactful health and AI pharmaceutical programs.",
      "وجّه مساهماتك وزكواتك نحو برامج صحية ودوائية محكومة وموثقة تحقق أعلى درجات الأثر المجتمعي."
    ]
  ],
  reports: [
    ["Reports & Publications Center", "مركز التقارير والمنشورات الرسمية"],
    [
      "Open access to our annual reports, audited financial disclosures, governance charters, and scientific whitepapers.",
      "نافذة مفتوحة للاطلاع على تقاريرنا السنوية، وقوائمنا المالية المدققة، ولوائح الحوكمة، والأوراق البحثية المحكمة."
    ]
  ],
  contact: [
    ["Contact Us & Whistleblowing", "تواصل معنا وصوتكم مسموع"],
    [
      "Dedicated communication channels for partnerships, media inquiries, community support, and confidential feedback.",
      "قنوات تواصل مباشرة للشراكات، والاستفسارات الإعلامية، والدعم المجتمعي، ومنظومة البلاغات والمقترحات المحمية."
    ]
  ]
} as const;