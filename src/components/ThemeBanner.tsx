import { useTheme } from "@/contexts/ThemeContext";
import { useAdmin } from "@/contexts/AdminContext";
import { useState } from "react";
import { X } from "lucide-react";
import { isBannerInDurationWindow, getThemeById, BannerDuration } from "@/config/themes";

const DEFAULT_THEME_MESSAGES: Record<string, { title: string; subtitle: string }> = {
  "new-year": {
    title: "Happy New Year",
    subtitle: "Cheers to new beginnings",
  },
  valentines: {
    title: "Happy Valentine's Day",
    subtitle: "Spread the love with great food",
  },
  spring: {
    title: "Spring is Here",
    subtitle: "Fresh flavors blooming",
  },
  easter: {
    title: "Happy Easter",
    subtitle: "Hop in for a treat",
  },
  summer: {
    title: "Summer Vibes",
    subtitle: "Cool drinks, hot food",
  },
  "mid-year": {
    title: "Mid-Year Special",
    subtitle: "Make a splash this season",
  },
  independence: {
    title: "Independence Day",
    subtitle: "Celebrate with us",
  },
  autumn: {
    title: "Autumn Season",
    subtitle: "Cozy meals for cool days",
  },
  "back-to-school": {
    title: "Back to School",
    subtitle: "Family meals to fuel the new year",
  },
  halloween: {
    title: "Spooky Season",
    subtitle: "Tricks, treats and tasty eats",
  },
  thanksgiving: {
    title: "Happy Thanksgiving",
    subtitle: "Gratitude on every plate",
  },
  christmas: {
    title: "Merry Christmas",
    subtitle: "Holiday cheer awaits",
  },
};

export function ThemeBanner() {
  const { currentTheme } = useTheme();
  const { siteContent } = useAdmin();

  const customBanner = siteContent.customBanner;
  const themeSettings = siteContent.themeSettings || {};
  const bannerDurations = themeSettings.bannerDurations || {};
  const bannerMessages = themeSettings.bannerMessages || {};

  const now = new Date();

  // ---- Custom banner takes priority if enabled and within date range ----
  const isCustomBannerActive = !!(
    customBanner?.enabled &&
    customBanner.text &&
    (!customBanner.startDate || new Date(customBanner.startDate) <= now) &&
    (!customBanner.endDate || new Date(customBanner.endDate) >= now)
  );

  // ---- For theme banner, check if we're inside the duration window ----
  const themeForBanner = getThemeById(currentTheme.id);
  const themeDuration = (bannerDurations[currentTheme.id] as BannerDuration) || "month";
  const isInDurationWindow = currentTheme.id === "default"
    ? false
    : isBannerInDurationWindow(themeForBanner, themeDuration);

  // ---- Resolve title / subtitle: custom override -> default ----
  const themeMsgOverride = bannerMessages[currentTheme.id] || {};
  const defaultMsg = DEFAULT_THEME_MESSAGES[currentTheme.id];
  const themeTitle = themeMsgOverride.title || defaultMsg?.title;
  const themeSubtitle = themeMsgOverride.subtitle ?? defaultMsg?.subtitle ?? "";

  const bannerTitle = isCustomBannerActive ? customBanner!.text! : themeTitle;
  const bannerSubtitle = isCustomBannerActive ? (customBanner!.subtitle || "") : themeSubtitle;
  const colorFrom = isCustomBannerActive ? (customBanner!.colorFrom || "#E67E22") : currentTheme.colors.primary;
  const colorTo = isCustomBannerActive ? (customBanner!.colorTo || "#C0392B") : currentTheme.colors.secondary;

  // ---- Persist dismiss across page navigation, reset on browser refresh ----
  const storageKey = isCustomBannerActive
    ? "theme-banner-dismissed-custom"
    : `theme-banner-dismissed-${currentTheme.id}`;
  const [dismissed, setDismissed] = useState(() => {
    try {
      return sessionStorage.getItem(storageKey) === "true";
    } catch {
      return false;
    }
  });

  const handleDismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem(storageKey, "true");
    } catch {
      // ignore storage errors
    }
  };

  // Decide whether to show the banner
  if (dismissed) return null;
  if (!bannerTitle) return null;
  if (isCustomBannerActive) {
    // custom banner always shows when active (regardless of theme window)
  } else {
    // theme banner only shows if we're inside the configured duration window
    if (!isInDurationWindow) return null;
  }

  return (
    <div
      className="relative w-full text-white text-center py-2 px-4 text-sm font-body font-semibold shadow-md z-30 overflow-hidden"
      style={{
        background: `linear-gradient(90deg, ${colorFrom}, ${colorTo}, ${colorFrom})`,
        backgroundSize: "200% 100%",
        animation: "shimmer 3s ease-in-out infinite",
      }}
    >
      <div className="flex items-center justify-center gap-2 max-w-7xl mx-auto">
        <span className="font-bold tracking-wide">{bannerTitle}</span>
        {bannerSubtitle && (
          <span className="hidden sm:inline opacity-90">— {bannerSubtitle}</span>
        )}
      </div>

      <button
        onClick={handleDismiss}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-white/20 transition-colors"
        aria-label="Dismiss banner"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
