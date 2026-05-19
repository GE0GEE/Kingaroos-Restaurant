import React, { createContext, useContext, useEffect, useState } from "react";
import { Theme, THEMES, getDefaultTheme, getThemeByMonth, getThemeById } from "@/config/themes";

interface ThemeContextType {
  currentTheme: Theme;
  activeThemeId: string;
  isForced: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  themeSettings?: {
    forcedThemeId?: string | null;
    monthlyThemeEnabled?: Record<number, boolean>;
  };
}

export function ThemeProvider({ children, themeSettings }: ThemeProviderProps) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(getDefaultTheme());
  const [activeThemeId, setActiveThemeId] = useState<string>("default");
  const [isForced, setIsForced] = useState(false);

  useEffect(() => {
    const currentMonth = new Date().getMonth();
    const forcedThemeId = themeSettings?.forcedThemeId;
    const monthlyEnabled = themeSettings?.monthlyThemeEnabled || {};

    // Priority 1: Forced theme (admin override)
    if (forcedThemeId && forcedThemeId !== "none") {
      const forcedTheme = getThemeById(forcedThemeId);
      setCurrentTheme(forcedTheme);
      setActiveThemeId(forcedTheme.id);
      setIsForced(true);
      applyThemeToDOM(forcedTheme);
      return;
    }

    // Priority 2: Monthly theme (if enabled for current month)
    const monthTheme = getThemeByMonth(currentMonth);
    const isMonthlyEnabled = monthlyEnabled[currentMonth] !== false; // Default to true

    if (monthTheme.id !== "default" && isMonthlyEnabled) {
      setCurrentTheme(monthTheme);
      setActiveThemeId(monthTheme.id);
      setIsForced(false);
      applyThemeToDOM(monthTheme);
      return;
    }

    // Priority 3: Default theme
    const defaultTheme = getDefaultTheme();
    setCurrentTheme(defaultTheme);
    setActiveThemeId(defaultTheme.id);
    setIsForced(false);
    applyThemeToDOM(defaultTheme);
  }, [themeSettings]);

  const applyThemeToDOM = (theme: Theme) => {
    const root = document.documentElement;
    root.style.setProperty("--theme-primary", theme.colors.primary);
    root.style.setProperty("--theme-secondary", theme.colors.secondary);
    root.style.setProperty("--theme-accent", theme.colors.accent);
    root.style.setProperty("--theme-background", theme.colors.background);
    root.style.setProperty("--theme-text", theme.colors.text);
    root.style.setProperty("--theme-card-bg", theme.colors.cardBg);
    root.style.setProperty("--theme-header-bg", theme.colors.headerBg);

    // Add theme ID as body class for additional styling
    document.body.className = document.body.className.replace(/theme-\w+/g, "");
    document.body.classList.add(`theme-${theme.id}`);
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, activeThemeId, isForced }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
