import { useEffect, useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { 
  ArrowUpRight, Search, Menu, X, Linkedin, Instagram, Twitter, 
  ShieldCheck, Sparkles, Building2, UserCheck, Heart, AlertCircle, FileText 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { navItems, ui, initiatives, reports } from "@/lib/site-content";
import { LanguageProvider, useLanguage } from "./language";
import { ThemeToggle, VoiceMattersModal } from "./primitives";
import { WaiwimLogo, WaiwimIntroMotion, WaiwimSymbol } from "./brand";

export function SiteProvider({ children }: { children: ReactNode }) { 
  return (
    <LanguageProvider>
      <SiteShell>{children}</SiteShell>
    </LanguageProvider>
  ); 
}

function Brand() { 
  return (
    <div className="flex items-center gap-3 shrink-0">
      <Link to="/" className="group shrink-0 inline-flex items-center" aria-label="WAIWIM Home">
        <WaiwimLogo layout="horizontal" showTagline={true} />
      </Link>
    </div>
  ); 
}

function Header() {
  const { language, setLanguage, pick } = useLanguage(); 
  const copy = ui[language]; 
  const [open, setOpen] = useState(false); 
  const [search, setSearch] = useState(false); 
  const [searchQuery, setSearchQuery] = useState("");
  const [voiceModal, setVoiceModal] = useState(false);
  const path = useRouterState({ select: s => s.location.pathname });

  useEffect(() => setOpen(false), [path]);

  // Quick search results
  const filteredInitiatives = searchQuery.trim() 
    ? initiatives.filter(i => 
        pick(i.title).toLowerCase().includes(searchQuery.toLowerCase()) || 
        pick(i.problem).toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const filteredReports = searchQuery.trim()
    ? reports.filter(r => 
        pick(r.title).toLowerCase().includes(searchQuery.toLowerCase()) || 
        pick(r.summary).toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <>
      <header className="site-header">
        <div className="site-header-inner">
          <Brand />

          {/* Desktop Navigation - Curated essential items */}
          <nav className="hidden items-center gap-1 xl:gap-2 lg:flex" aria-label="Primary navigation">
            {[
              ["About Us", "من نحن", "/about"],
              ["Programs", "البرامج", "/programs"],
              ["AI Accelerator", "مسرعة الابتكار", "/research"],
              ["Health Telemetry", "لوحة الأثر", "/impact"],
              ["Governance", "الحوكمة", "/governance"],
              ["Contact Us", "تواصل معنا", "/contact"]
            ].map(([en, ar, to]) => (
              <Link 
                key={to} 
                to={to} 
                className="nav-link" 
                activeProps={{ className: "nav-link nav-link-active" }}
              >
                {pick([en, ar])}
              </Link>
            ))}
          </nav>

          {/* Header Action Tools - Clean, sleek & spacious horizontally */}
          <div className="flex items-center gap-2.5">

            {/* Language Switcher - Compact Single Toggle */}
            <button 
              onClick={() => setLanguage(language === "en" ? "ar" : "en")}
              className="h-8.5 px-3.5 rounded-full text-xs font-bold border border-slate-200 bg-slate-50 text-slate-700 hover:border-emerald-500 hover:text-emerald-700 transition-colors cursor-pointer"
              title={language === "en" ? "التبديل إلى العربية" : "Switch to English"}
            >
              {language === "en" ? "العربية" : "English"}
            </button>

            {/* Support Us CTA */}
            <Button 
              className="hidden sm:inline-flex bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-full px-4 text-xs h-9 shadow-xs transition-all hover:scale-102" 
              asChild
            >
              <Link to="/support">
                <span>{pick(["Support Mission", "ادعم رسالتنا"])}</span>
                <ArrowUpRight className="rtl:-scale-x-100 size-3.5 ms-1" />
              </Link>
            </Button>

            {/* Full Menu Drawer Trigger */}
            <Button 
              variant="ghost" 
              size="icon" 
              aria-label={copy.menu} 
              onClick={() => setOpen(!open)}
              className="size-9 rounded-full border border-slate-200 hover:border-emerald-500"
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </Button>
          </div>
        </div>

        {/* Full Nav Drawer */}
        {open && (
          <div className="nav-drawer">
            <div className="site-container py-8">
              <div className="flex items-center justify-between border-b border-border/60 pb-4 mb-6">
                <span className="eyebrow">{pick(["Institutional Directory", "دليل البوابة المؤسسية"])}</span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => { setOpen(false); setVoiceModal(true); }}
                  className="text-amber-500 border-amber-500/30 hover:bg-amber-500/10"
                >
                  <AlertCircle className="size-4" />
                  {copy.voiceMatters}
                </Button>
              </div>

              <nav className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3" aria-label={copy.menu}>
                {navItems.map(([en, ar, to], index) => (
                  <Link 
                    key={to} 
                    to={to} 
                    className="drawer-link rounded-xl p-4 hover:bg-muted/60 transition-colors"
                  >
                    <span className="font-mono text-xs text-brand font-bold">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <strong className="text-foreground">{pick([en, ar])}</strong>
                    <ArrowUpRight className="ms-auto size-4 text-muted-foreground rtl:-scale-x-100" />
                  </Link>
                ))}
              </nav>

              <div className="mt-8 pt-6 border-t border-border/60 flex flex-wrap items-center justify-between gap-4">
                <p className="text-xs text-muted-foreground max-w-md">
                  {copy.legalNotice}
                </p>
                <div className="flex gap-2">
                  <Button variant={language === "en" ? "default" : "outline"} onClick={() => setLanguage("en")}>
                    English
                  </Button>
                  <Button variant={language === "ar" ? "default" : "outline"} onClick={() => setLanguage("ar")}>
                    العربية
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Global Interactive Search Modal */}
      {search && (
        <div className="search-backdrop flex items-start justify-center pt-20" onMouseDown={() => setSearch(false)}>
          <div 
            className="search-panel max-w-2xl w-full p-6" 
            onMouseDown={e => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-border pb-4">
              <Search className="size-6 text-brand" />
              <Input 
                autoFocus 
                placeholder={copy.search} 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="h-12 border-0 bg-transparent text-lg shadow-none focus-visible:ring-0 text-foreground placeholder:text-muted-foreground"
              />
              <Button variant="ghost" size="icon" aria-label={copy.close} onClick={() => setSearch(false)}>
                <X className="size-5" />
              </Button>
            </div>

            {searchQuery.trim() ? (
              <div className="mt-4 max-h-96 overflow-y-auto space-y-4">
                {filteredInitiatives.length > 0 && (
                  <div>
                    <span className="text-xs uppercase font-bold text-brand block mb-2">
                      {pick(["Initiatives", "المبادرات"])}
                    </span>
                    <div className="space-y-2">
                      {filteredInitiatives.map(item => (
                        <Link 
                          key={item.id} 
                          to="/programs" 
                          onClick={() => setSearch(false)}
                          className="block p-3 rounded-lg bg-muted/40 hover:bg-muted/80 transition-colors"
                        >
                          <strong className="text-foreground text-sm block">{pick(item.title)}</strong>
                          <span className="text-xs text-muted-foreground line-clamp-1">{pick(item.tagline)}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {filteredReports.length > 0 && (
                  <div>
                    <span className="text-xs uppercase font-bold text-brand block mb-2">
                      {pick(["Reports & Publications", "التقارير والمنشورات"])}
                    </span>
                    <div className="space-y-2">
                      {filteredReports.map((r, i) => (
                        <Link 
                          key={i} 
                          to="/reports" 
                          onClick={() => setSearch(false)}
                          className="block p-3 rounded-lg bg-muted/40 hover:bg-muted/80 transition-colors"
                        >
                          <strong className="text-foreground text-sm block">{pick(r.title)}</strong>
                          <span className="text-xs text-muted-foreground">{pick(r.date)} • {r.pages}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {filteredInitiatives.length === 0 && filteredReports.length === 0 && (
                  <p className="text-center py-8 text-sm text-muted-foreground">
                    {pick(["No direct matches found. Try searching 'Hakeem', 'Thousand Miles', or 'Governance'.", "لم يتم العثور على نتائج مباشرة. جرب البحث عن 'حكيم'، 'الألف ميل'، أو 'الحوكمة'."])}
                  </p>
                )}
              </div>
            ) : (
              <div className="mt-4 pt-2">
                <span className="text-xs uppercase font-bold text-muted-foreground block mb-3">
                  {pick(["Quick Exploration", "روابط سريعة مقترحة"])}
                </span>
                <div className="flex flex-wrap gap-2">
                  {[
                    ["Hakeem Medical Bank", "بنك حكيم للأجهزة", "/programs"],
                    ["Thousand Miles Step", "برنامج خطوة الألف ميل", "/programs"],
                    ["AI Drug Discovery Accelerator", "مسرعة الابتكار الدوائي", "/research"],
                    ["Audited Financial Statements", "القوائم المالية المدققة", "/governance"],
                    ["National Volunteer Opportunities", "الفرص التطوعية الوطنية", "/volunteer"]
                  ].map(([en, ar, to]) => (
                    <Link
                      key={`${to}-${en}`}
                      to={to}
                      onClick={() => setSearch(false)}
                      className="tag hover:border-brand cursor-pointer"
                    >
                      {pick([en, ar])}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Voice Matters Modal */}
      <VoiceMattersModal open={voiceModal} onClose={() => setVoiceModal(false)} />
    </>
  );
}

function Footer() { 
  const { language, pick } = useLanguage(); 
  const copy = ui[language];
  const [subscribed, setSubscribed] = useState(false); 
  const [voiceModal, setVoiceModal] = useState(false);

  return (
    <footer className="relative bg-slate-50 text-slate-700 border-t border-slate-200 overflow-hidden">
      {/* Background subtle ambient mesh */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />

      <div className="site-container relative z-10 py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Col 1: Identity & Legal */}
          <div>
            <Brand />
            <p className="mt-6 max-w-sm text-sm leading-7 text-slate-600">
              {pick([
                "From Research to Innovation. From Innovation to Health Impact. A premier Saudi nonprofit dedicated to advancing medicine via artificial intelligence.",
                "من البحث إلى الابتكار. ومن الابتكار إلى الأثر الصحي. جمعية سعودية غير ربحية رائدة مكرسة لتطوير الطب عبر الذكاء الاصطناعي."
              ])}
            </p>
            <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4 text-xs text-slate-600 space-y-1.5 shadow-xs">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <ShieldCheck className="size-4 text-emerald-600" />
                <span>{pick(["National Center for Non-Profit Sector (NCNP)", "إشراف المركز الوطني لتنمية القطاع غير الربحي"])}</span>
              </div>
              <p>{pick(["License Number: 5421/NCNP • Riyadh, Saudi Arabia", "ترخيص رسمي رقم: 5421/م.و.ت.ق.خ • الرياض، المملكة العربية السعودية"])}</p>
            </div>
            
            <div className="mt-6 flex items-center gap-3">
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="p-2.5 rounded-full border border-slate-200 bg-white text-slate-700 hover:border-emerald-600 hover:text-emerald-600 transition-colors shadow-xs">
                <Linkedin className="size-4" />
              </a>
              <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X (Twitter)" className="p-2.5 rounded-full border border-slate-200 bg-white text-slate-700 hover:border-emerald-600 hover:text-emerald-600 transition-colors shadow-xs font-bold text-xs">
                𝕏
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="p-2.5 rounded-full border border-slate-200 bg-white text-slate-700 hover:border-emerald-600 hover:text-emerald-600 transition-colors shadow-xs">
                <Instagram className="size-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Strategic Pillars & Programs */}
          <div>
            <h3 className="footer-title text-base font-bold text-slate-900">
              {pick(["Initiatives & Impact", "المبادرات والأثر"])}
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-600 mt-4">
              <li>
                <Link to="/programs" className="hover:text-emerald-700 transition-colors">
                  {pick(["Hakeem Medical Bank", "بنك حكيم للأجهزة"])}
                </Link>
              </li>
              <li>
                <Link to="/programs" className="hover:text-emerald-700 transition-colors">
                  {pick(["Thousand Miles Step", "برنامج خطوة الألف ميل"])}
                </Link>
              </li>
              <li>
                <Link to="/research" className="hover:text-emerald-700 transition-colors">
                  {pick(["AI Drug Discovery Accelerator", "مسرعة الابتكار الدوائي"])}
                </Link>
              </li>
              <li>
                <Link to="/programs" className="hover:text-emerald-700 transition-colors">
                  {pick(["Dawā’i Bi-Tariqati Initiative", "مبادرة دوائي بطريقتي"])}
                </Link>
              </li>
              <li>
                <Link to="/impact" className="hover:text-emerald-700 transition-colors">
                  {pick(["Live Impact Dashboard", "لوحة مؤشرات الأثر"])}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Institutional Governance & Portals */}
          <div>
            <h3 className="footer-title text-base font-bold text-slate-900">
              {pick(["Governance & Portals", "الحوكمة والبوابات"])}
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-600 mt-4">
              <li>
                <Link to="/governance" className="hover:text-emerald-700 transition-colors">
                  {pick(["Board of Directors & Committees", "مجلس الإدارة واللجان"])}
                </Link>
              </li>
              <li>
                <Link to="/governance" className="hover:text-emerald-700 transition-colors">
                  {pick(["Audited Financial Disclosures", "الإفصاح المالي المدقق"])}
                </Link>
              </li>
              <li>
                <Link to="/volunteer" className="hover:text-emerald-700 transition-colors">
                  {pick(["Volunteer Portal", "بوابة المتطوعين"])}
                </Link>
              </li>
              <li>
                <Link to="/partnerships" className="hover:text-emerald-700 transition-colors">
                  {pick(["Strategic Partnerships", "الشراكات المؤسسية"])}
                </Link>
              </li>
              <li>
                <button 
                  onClick={() => setVoiceModal(true)}
                  className="flex items-center gap-1.5 text-amber-700 hover:text-amber-800 transition-colors font-semibold cursor-pointer"
                >
                  <AlertCircle className="size-3.5" />
                  {copy.voiceMatters}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter & Engagement */}
          <div>
            <h3 className="footer-title text-base font-bold text-slate-900">
              {pick(["Stay Informed", "النشرة العلمية والمؤسسية"])}
            </h3>
            <p className="my-4 text-sm text-slate-600 leading-relaxed">
              {pick([
                "Subscribe to receive quarterly scientific publications, governance updates, and impact reports.",
                "اشترك لاستلام النشرات العلمية الفصلية، وتقارير الحوكمة، ومستجدات الأثر الصحي."
              ])}
            </p>
            {subscribed ? (
              <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-sm text-emerald-800">
                {pick(["Thank you for subscribing to our scientific circular.", "شكراً لاهتمامك. تم اشتراكك بنجاح في النشرة العلمية للجمعية."])}
              </div>
            ) : (
              <form 
                className="flex gap-2" 
                onSubmit={e => { 
                  e.preventDefault(); 
                  if (e.currentTarget.reportValidity()) setSubscribed(true); 
                }}
              >
                <Input 
                  type="email" 
                  required 
                  placeholder={copy.email} 
                  className="h-10 border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 rounded-lg shadow-xs"
                />
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 shadow-xs">
                  {pick(["Subscribe", "اشترك"])}
                </Button>
              </form>
            )}

            <div className="mt-6 text-xs text-slate-500 space-y-1">
              <p>📍 {pick(["Kingdom of Saudi Arabia — Riyadh", "المملكة العربية السعودية — الرياض"])}</p>
              <p>✉️ info@aidis.org.sa • compliance@aidis.org.sa</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 flex flex-col justify-between items-center gap-4 border-t border-slate-200 pt-8 text-xs text-slate-500 md:flex-row">
          <p>© 2026 WAIWIM — With AI We Innovate Medicine. {pick(["All Rights Reserved. NCNP #5421.", "جميع الحقوق محفوظة. ترخيص 5421."])}</p>
          <div className="flex flex-wrap gap-6">
            <span className="hover:text-emerald-700 cursor-pointer">{pick(["Bylaws & Governance Charter", "اللائحة الأساسية وميثاق الحوكمة"])}</span>
            <span className="hover:text-emerald-700 cursor-pointer">{pick(["Conflict of Interest Policy", "سياسة تعارض المصالح"])}</span>
            <span className="hover:text-emerald-700 cursor-pointer">{pick(["Whistleblower Protection", "حماية المبلّغين"])}</span>
            <span className="hover:text-emerald-700 cursor-pointer">{pick(["Privacy & Data Residency", "الخصوصية وسرية البيانات"])}</span>
          </div>
        </div>

        {/* Developed by Zetamize Attribution */}
        <div className="mt-6 pt-4 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2 pb-2">
          <p>{pick(["Saudi Arabia Non-Profit Healthcare & Biotech Platform", "المنصة السعودية غير الربحية للرعاية الصحية والتقنية الحيوية"])}</p>
          <p className="flex items-center gap-1.5 font-medium">
            <span>{pick(["Developed by", "تم التطوير بواسطة"])}</span>
            <a 
              href="https://zetamize.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-bold text-emerald-700 hover:text-emerald-800 underline underline-offset-2 transition-colors inline-flex items-center gap-1"
            >
              Zetamize
            </a>
          </p>
        </div>
      </div>

      <VoiceMattersModal open={voiceModal} onClose={() => setVoiceModal(false)} />
    </footer>
  ); 
}

function CookieBanner() {
  const { pick } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = window.localStorage.getItem("aidis-cookie");
    if (!consent) setVisible(true);
  }, []);

  if (!visible) return null;

  const choose = (val: string) => {
    window.localStorage.setItem("aidis-cookie", val);
    setVisible(false);
  };

  return (
    <div className="fixed bottom-5 start-1/2 z-[70] w-[calc(100%-2.5rem)] max-w-2xl -translate-x-1/2 rtl:translate-x-1/2 rounded-2xl border border-border/80 bg-background/95 p-5 shadow-2xl backdrop-blur-2xl animate-in slide-in-from-bottom-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="text-sm text-foreground/80 leading-relaxed">
          {pick([
            "We use essential cookies to maintain your language preferences, theme states, and secure session integrity.",
            "نستخدم ملفات الارتباط الأساسية لحفظ تفضيلات اللغة والمظهر وضمان أمان الجلسات النظامية."
          ])}
        </p>
        <div className="flex gap-2 shrink-0">
          <Button variant="outline" size="sm" onClick={() => choose("declined")}>
            {pick(["Decline", "رفض"])}
          </Button>
          <Button size="sm" className="bg-brand text-primary-foreground hover:bg-brand/90 font-semibold" onClick={() => choose("accepted")}>
            {pick(["Accept", "موافق"])}
          </Button>
        </div>
      </div>
    </div>
  );
}

function SiteShell({ children }: { children: ReactNode }) {
  const [introActive, setIntroActive] = useState(true);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-[#32E0E3]/30 selection:text-[#00333B]">
      {introActive && (
        <WaiwimIntroMotion onComplete={() => setIntroActive(false)} />
      )}
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Header />
      <main id="main-content" className="flex-1">{children}</main>
      <Footer />
      <CookieBanner />
    </div>
  );
}