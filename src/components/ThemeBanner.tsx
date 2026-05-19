import { useTheme } from "@/contexts/ThemeContext";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

const THEME_MESSAGES: Record<string, { title: string; subtitle: string; emoji: string }> = {
  "new-year": {
    title: "Happy New Year!",
    subtitle: "Cheers to new beginnings",
    emoji: "🎉",
  },
  valentines: {
    title: "Happy Valentine's Day",
    subtitle: "Spread the love with great food",
    emoji: "💕",
  },
  spring: {
    title: "Spring is Here!",
    subtitle: "Fresh flavors blooming",
    emoji: "🌸",
  },
  easter: {
    title: "Happy Easter!",
    subtitle: "Hop in for a treat",
    emoji: "🐰",
  },
  summer: {
    title: "Summer Vibes",
    subtitle: "Cool drinks, hot food",
    emoji: "☀️",
  },
  "mid-year": {
    title: "Mid-Year Special",
    subtitle: "Make a splash this season",
    emoji: "🌊",
  },
  independence: {
    title: "Independence Day",
    subtitle: "Celebrate with us",
    emoji: "🎆",
  },
  autumn: {
    title: "Autumn Season",
    subtitle: "Cozy meals for cool days",
    emoji: "🍂",
  },
  "back-to-school": {
    title: "Back to School",
    subtitle: "Family meals to fuel the new year",
    emoji: "📚",
  },
  halloween: {
    title: "Spooky Season",
    subtitle: "Tricks, treats & tasty eats",
    emoji: "🎃",
  },
  thanksgiving: {
    title: "Happy Thanksgiving",
    subtitle: "Gratitude on every plate",
    emoji: "🦃",
  },
  christmas: {
    title: "Merry Christmas!",
    subtitle: "Holiday cheer awaits",
    emoji: "🎄",
  },
};

export function ThemeBanner() {
  const { currentTheme } = useTheme();
  const [dismissed, setDismissed] = useState(false);

  // Reset dismissed state when theme changes
  useEffect(() => {
    setDismissed(false);
  }, [currentTheme.id]);

  const message = THEME_MESSAGES[currentTheme.id];

  // Don't show for default theme or if dismissed
  if (!message || currentTheme.id === "default" || dismissed) {
    return null;
  }

  return (
    <div
      className="relative w-full text-white text-center py-2 px-4 text-sm font-body font-semibold shadow-md z-30 overflow-hidden"
      style={{
        background: `linear-gradient(90deg, ${currentTheme.colors.primary}, ${currentTheme.colors.secondary}, ${currentTheme.colors.primary})`,
        backgroundSize: "200% 100%",
        animation: "shimmer 3s ease-in-out infinite",
      }}
    >
      <style>{`
        @keyframes shimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>

      <div className="flex items-center justify-center gap-2 max-w-7xl mx-auto">
        <span className="text-xl">{message.emoji}</span>
        <span className="font-bold">{message.title}</span>
        <span className="hidden sm:inline opacity-90">— {message.subtitle}</span>
        <span className="text-xl">{message.emoji}</span>
      </div>

      <button
        onClick={() => setDismissed(true)}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-white/20 transition-colors"
        aria-label="Dismiss banner"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
