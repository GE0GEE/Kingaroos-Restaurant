import { useTheme } from "@/contexts/ThemeContext";

export function ThemeIndicator() {
  const { currentTheme, isForced } = useTheme();

  // Only show in development or when forced
  if (!isForced && import.meta.env.PROD) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 pointer-events-none">
      <div className="bg-black/80 text-white px-3 py-2 rounded-lg shadow-lg text-xs font-semibold flex items-center gap-2">
        {currentTheme.decorations?.emoji && (
          <span className="text-lg">{currentTheme.decorations.emoji}</span>
        )}
        <div>
          <div>{currentTheme.name}</div>
          {isForced && (
            <div className="text-[10px] text-yellow-300">🔒 Forced</div>
          )}
        </div>
      </div>
    </div>
  );
}
