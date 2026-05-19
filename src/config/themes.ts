export interface Theme {
  id: string;
  name: string;
  month: number; // 0-11 (January = 0, December = 11)
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
