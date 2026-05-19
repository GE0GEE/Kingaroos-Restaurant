export interface Theme {
  id: string;
  name: string;
  month: number; // 0-11 (January = 0, December = 11)
  /**
   * For dated holidays (Christmas Dec 25, Valentine's Feb 14, etc.) we store
   * the actual holiday date. The banner can then be configured to show only
   * within a window around this date (e.g. 1 week before/after).
   * For themes without a specific date (Spring, Summer, etc.) leave undefined
   * and the banner falls back to "show whole month".
   */
  holidayDate?: { month: number; day: number };
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    cardBg: string;
    headerBg: string;
  };
  decorations?: {
    emoji?: string;
    pattern?: string;
  };
}

export type BannerDuration = "month" | "weeks" | "week" | "days";

export const BANNER_DURATION_OPTIONS: { value: BannerDuration; label: string; days: number }[] = [
  { value: "month", label: "Whole month", days: 31 },
  { value: "weeks", label: "2-3 weeks (±10 days)", days: 10 },
  { value: "week", label: "Whole week (±3 days)", days: 3 },
  { value: "days", label: "2-3 days from holiday", days: 2 },
];

export const THEMES: Theme[] = [
  {
    id: "default",
    name: "Default (Aussie)",
    month: -1, // No specific month - fallback theme
    colors: {
      primary: "rgb(217, 119, 6)", // aussie-orange
      secondary: "rgb(180, 83, 9)", // aussie-burnt-red
      accent: "rgb(52, 168, 83)", // aussie-eucalyptus
      background: "rgb(254, 252, 232)", // cream-50
      text: "rgb(68, 64, 60)", // brown-800
      cardBg: "rgb(255, 255, 255)",
      headerBg: "rgb(28, 25, 23)", // stone-900
    },
  },
  {
    id: "new-year",
    name: "New Year",
    month: 0, // January
    holidayDate: { month: 0, day: 1 },
    colors: {
      primary: "rgb(234, 179, 8)", // yellow-500 - gold
      secondary: "rgb(192, 132, 252)", // purple-400
      accent: "rgb(251, 191, 36)", // amber-400
      background: "rgb(254, 252, 232)",
      text: "rgb(68, 64, 60)",
      cardBg: "rgb(255, 255, 255)",
      headerBg: "rgb(17, 24, 39)", // gray-900
    },
    decorations: {
      emoji: "🎉",
      pattern: "fireworks",
    },
  },
  {
    id: "valentines",
    name: "Valentine's Day",
    month: 1, // February
    holidayDate: { month: 1, day: 14 },
    colors: {
      primary: "rgb(244, 63, 94)", // rose-500
      secondary: "rgb(236, 72, 153)", // pink-500
      accent: "rgb(251, 113, 133)", // rose-400
      background: "rgb(255, 241, 242)", // rose-50
      text: "rgb(68, 64, 60)",
      cardBg: "rgb(255, 255, 255)",
      headerBg: "rgb(136, 19, 55)", // rose-900
    },
    decorations: {
      emoji: "💕",
      pattern: "hearts",
    },
  },
  {
    id: "spring",
    name: "Spring",
    month: 2, // March
    colors: {
      primary: "rgb(34, 197, 94)", // green-500
      secondary: "rgb(251, 191, 36)", // amber-400
      accent: "rgb(132, 204, 22)", // lime-500
      background: "rgb(240, 253, 244)", // green-50
      text: "rgb(68, 64, 60)",
      cardBg: "rgb(255, 255, 255)",
      headerBg: "rgb(20, 83, 45)", // green-900
    },
    decorations: {
      emoji: "🌸",
      pattern: "flowers",
    },
  },
  {
    id: "easter",
    name: "Easter",
    month: 3, // April
    holidayDate: { month: 3, day: 12 },
    colors: {
      primary: "rgb(168, 85, 247)", // purple-500
      secondary: "rgb(236, 72, 153)", // pink-500
      accent: "rgb(251, 191, 36)", // amber-400
      background: "rgb(250, 245, 255)", // purple-50
      text: "rgb(68, 64, 60)",
      cardBg: "rgb(255, 255, 255)",
      headerBg: "rgb(88, 28, 135)", // purple-900
    },
    decorations: {
      emoji: "🐰",
      pattern: "eggs",
    },
  },
  {
    id: "summer",
    name: "Summer",
    month: 4, // May
    colors: {
      primary: "rgb(251, 146, 60)", // orange-400
      secondary: "rgb(234, 179, 8)", // yellow-500
      accent: "rgb(14, 165, 233)", // sky-500
      background: "rgb(254, 252, 232)",
      text: "rgb(68, 64, 60)",
      cardBg: "rgb(255, 255, 255)",
      headerBg: "rgb(7, 89, 133)", // sky-900
    },
    decorations: {
      emoji: "☀️",
      pattern: "sun",
    },
  },
  {
    id: "mid-year",
    name: "Mid Year",
    month: 5, // June
    colors: {
      primary: "rgb(59, 130, 246)", // blue-500
      secondary: "rgb(14, 165, 233)", // sky-500
      accent: "rgb(34, 197, 94)", // green-500
      background: "rgb(239, 246, 255)", // blue-50
      text: "rgb(68, 64, 60)",
      cardBg: "rgb(255, 255, 255)",
      headerBg: "rgb(30, 58, 138)", // blue-900
    },
    decorations: {
      emoji: "🌊",
      pattern: "waves",
    },
  },
  {
    id: "independence",
    name: "Independence Day",
    month: 6, // July
    holidayDate: { month: 6, day: 4 },
    colors: {
      primary: "rgb(239, 68, 68)", // red-500
      secondary: "rgb(59, 130, 246)", // blue-500
      accent: "rgb(234, 179, 8)", // yellow-500
      background: "rgb(254, 252, 232)",
      text: "rgb(68, 64, 60)",
      cardBg: "rgb(255, 255, 255)",
      headerBg: "rgb(127, 29, 29)", // red-900
    },
    decorations: {
      emoji: "🎆",
      pattern: "stars",
    },
  },
  {
    id: "autumn",
    name: "Autumn",
    month: 7, // August
    colors: {
      primary: "rgb(251, 146, 60)", // orange-400
      secondary: "rgb(217, 119, 6)", // amber-600
      accent: "rgb(185, 28, 28)", // red-700
      background: "rgb(255, 251, 235)", // amber-50
      text: "rgb(68, 64, 60)",
      cardBg: "rgb(255, 255, 255)",
      headerBg: "rgb(120, 53, 15)", // amber-900
    },
    decorations: {
      emoji: "🍂",
      pattern: "leaves",
    },
  },
  {
    id: "back-to-school",
    name: "Back to School",
    month: 8, // September
    colors: {
      primary: "rgb(249, 115, 22)", // orange-500
      secondary: "rgb(234, 179, 8)", // yellow-500
      accent: "rgb(34, 197, 94)", // green-500
      background: "rgb(254, 252, 232)",
      text: "rgb(68, 64, 60)",
      cardBg: "rgb(255, 255, 255)",
      headerBg: "rgb(120, 53, 15)", // amber-900
    },
    decorations: {
      emoji: "📚",
      pattern: "books",
    },
  },
  {
    id: "halloween",
    name: "Halloween",
    month: 9, // October
    holidayDate: { month: 9, day: 31 },
    colors: {
      primary: "rgb(249, 115, 22)", // orange-500
      secondary: "rgb(139, 92, 246)", // violet-500
      accent: "rgb(34, 197, 94)", // green-500
      background: "rgb(17, 24, 39)", // gray-900 - dark theme!
      text: "rgb(249, 250, 251)", // gray-50 - light text for dark bg
      cardBg: "rgb(31, 41, 55)", // gray-800
      headerBg: "rgb(0, 0, 0)",
    },
    decorations: {
      emoji: "🎃",
      pattern: "spooky",
    },
  },
  {
    id: "thanksgiving",
    name: "Thanksgiving",
    month: 10, // November
    holidayDate: { month: 10, day: 27 },
    colors: {
      primary: "rgb(217, 119, 6)", // amber-600
      secondary: "rgb(185, 28, 28)", // red-700
      accent: "rgb(234, 179, 8)", // yellow-500
      background: "rgb(255, 251, 235)", // amber-50
      text: "rgb(68, 64, 60)",
      cardBg: "rgb(255, 255, 255)",
      headerBg: "rgb(120, 53, 15)", // amber-900
    },
    decorations: {
      emoji: "🦃",
      pattern: "harvest",
    },
  },
  {
    id: "christmas",
    name: "Christmas",
    month: 11, // December
    holidayDate: { month: 11, day: 25 },
    colors: {
      primary: "rgb(220, 38, 38)", // red-600
      secondary: "rgb(22, 163, 74)", // green-600
      accent: "rgb(234, 179, 8)", // yellow-500 - gold
      background: "rgb(254, 242, 242)", // red-50
      text: "rgb(68, 64, 60)",
      cardBg: "rgb(255, 255, 255)",
      headerBg: "rgb(127, 29, 29)", // red-900
    },
    decorations: {
      emoji: "🎄",
      pattern: "snowflakes",
    },
  },
];

export const getDefaultTheme = (): Theme => {
  return THEMES.find((t) => t.id === "default")!;
};

export const getThemeByMonth = (month: number): Theme => {
  return THEMES.find((t) => t.month === month) || getDefaultTheme();
};

export const getThemeById = (id: string): Theme => {
  return THEMES.find((t) => t.id === id) || getDefaultTheme();
};

/**
 * Determine if a banner for the given theme should be visible right now,
 * based on the theme's holiday date and the configured duration window.
 *
 * - Themes without a `holidayDate` (Spring, Summer, etc.) use the simple
 *   "is the current month equal to the theme's month?" check.
 * - Themes with a `holidayDate` use a window of N days around that date,
 *   where N depends on the duration choice.
 */
export function isBannerInDurationWindow(theme: Theme, duration: BannerDuration | undefined): boolean {
  const now = new Date();

  // For themes without a specific holiday date, fall back to month-based.
  if (!theme.holidayDate) {
    return now.getMonth() === theme.month;
  }

  // Whole month duration: just check the month matches.
  if (!duration || duration === "month") {
    return now.getMonth() === theme.holidayDate.month;
  }

  // Compute the holiday date for the current year.
  const holiday = new Date(now.getFullYear(), theme.holidayDate.month, theme.holidayDate.day);
  const msPerDay = 1000 * 60 * 60 * 24;
  const diffDays = Math.abs((now.getTime() - holiday.getTime()) / msPerDay);

  const opt = BANNER_DURATION_OPTIONS.find((o) => o.value === duration);
  const window = opt?.days ?? 31;
  return diffDays <= window;
}
