import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Theme = "light" | "dark";
// v2: la paleta 60/30/10 (crema dominante) es el tema claro; todos arrancan en claro y el interruptor lo recuerda.
const STORAGE_KEY = "azahar_theme_v2";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function leerThemeInicial(): Theme {
  if (typeof window === "undefined") return "light";
  const guardado = window.localStorage.getItem(STORAGE_KEY);
  if (guardado === "light" || guardado === "dark") return guardado;
  return "light";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(leerThemeInicial);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((actual) => (actual === "light" ? "dark" : "light"));
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme debe usarse dentro de <ThemeProvider>");
  return ctx;
}
