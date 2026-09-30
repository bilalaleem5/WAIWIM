import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Language } from "@/lib/site-content";

type LanguageContextValue = { language: Language; setLanguage: (language: Language) => void; pick: (value: readonly unknown[]) => any };
const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  useEffect(() => {
    const saved = window.localStorage.getItem("aidis-language");
    if (saved === "ar" || saved === "en") setLanguageState(saved);
  }, []);
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.body.dataset["language"] = language;
  }, [language]);
  const value = useMemo(() => ({
    language,
    setLanguage: (next: Language) => { setLanguageState(next); window.localStorage.setItem("aidis-language", next); },
    pick: (item: any) => {
      if (!item) return "";
      if (Array.isArray(item)) {
        return item[language === "en" ? 0 : 1] ?? item[0] ?? "";
      }
      return item;
    },
  }), [language]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}