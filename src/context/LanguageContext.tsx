import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { TRADUCCIONES, type ClaveTraduccion, type Idioma } from "../i18n/translations";

const STORAGE_KEY = "azahar_idioma";

function leerIdiomaGuardado(): Idioma {
  if (typeof window === "undefined") return "es";
  const guardado = window.localStorage.getItem(STORAGE_KEY);
  return guardado === "en" || guardado === "pt" || guardado === "fr" ? guardado : "es";
}

interface LanguageContextValue {
  idioma: Idioma;
  setIdioma: (idioma: Idioma) => void;
  t: (clave: ClaveTraduccion) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [idioma, setIdiomaState] = useState<Idioma>(leerIdiomaGuardado);

  function setIdioma(nuevo: Idioma) {
    setIdiomaState(nuevo);
    window.localStorage.setItem(STORAGE_KEY, nuevo);
  }

  const value = useMemo<LanguageContextValue>(
    () => ({
      idioma,
      setIdioma,
      t: (clave: ClaveTraduccion) => TRADUCCIONES[idioma][clave] ?? TRADUCCIONES.es[clave] ?? clave,
    }),
    [idioma],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage debe usarse dentro de <LanguageProvider>");
  return ctx;
}
