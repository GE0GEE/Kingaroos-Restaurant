import { Facebook, Instagram, Twitter, Youtube, Linkedin, Link as LinkIcon } from "lucide-react";
import type { SocialIconKey } from "@/contexts/AdminContext";

/**
 * Resolves a social platform key to a renderable icon.
 *
 * Lucide ships icons for the major networks (Facebook, Instagram, Twitter,
 * YouTube, LinkedIn). For platforms without an official lucide icon (TikTok,
 * Threads, Snapchat, Pinterest) we render a small inline SVG; anything
 * unknown falls back to a generic link icon.
 */
export const SOCIAL_ICON_OPTIONS: { value: SocialIconKey; label: string }[] = [
  { value: "facebook", label: "Facebook" },
  { value: "instagram", label: "Instagram" },
  { value: "twitter", label: "Twitter / X" },
  { value: "youtube", label: "YouTube" },
  { value: "tiktok", label: "TikTok" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "pinterest", label: "Pinterest" },
  { value: "threads", label: "Threads" },
  { value: "snapchat", label: "Snapchat" },
  { value: "link", label: "Other / Link" },
];

interface SocialIconProps {
  iconKey: SocialIconKey;
  className?: string;
  size?: number;
}

export function SocialIcon({ iconKey, className, size = 24 }: SocialIconProps) {
  const px = `${size}px`;
  switch (iconKey) {
    case "facebook":
      return <Facebook className={className} style={{ width: px, height: px }} />;
    case "instagram":
      return <Instagram className={className} style={{ width: px, height: px }} />;
    case "twitter":
      return <Twitter className={className} style={{ width: px, height: px }} />;
    case "youtube":
      return <Youtube className={className} style={{ width: px, height: px }} />;
    case "linkedin":
      return <Linkedin className={className} style={{ width: px, height: px }} />;
    case "tiktok":
      return (
        <svg
          className={className}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M16.6 5.82a4.28 4.28 0 0 1-1.05-2.82h-3.04v12.43a2.39 2.39 0 1 1-2.39-2.39c.13 0 .26.01.39.04v-3.1a5.49 5.49 0 1 0 5.49 5.49V9.4a7.34 7.34 0 0 0 4.28 1.37V7.74a4.32 4.32 0 0 1-3.68-1.92Z" />
        </svg>
      );
    case "pinterest":
      return (
        <svg
          className={className}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12c0 4.09 2.46 7.6 5.97 9.13-.08-.78-.16-1.97.03-2.82.18-.77 1.16-4.92 1.16-4.92s-.3-.6-.3-1.48c0-1.39.81-2.43 1.81-2.43.85 0 1.27.64 1.27 1.41 0 .86-.55 2.14-.83 3.33-.24 1 .5 1.81 1.49 1.81 1.79 0 3.16-1.89 3.16-4.61 0-2.41-1.73-4.1-4.21-4.1-2.87 0-4.55 2.15-4.55 4.37 0 .87.33 1.79.75 2.3.08.1.09.19.07.29-.07.31-.24.99-.27 1.13-.04.18-.14.22-.32.13-1.2-.56-1.95-2.31-1.95-3.71 0-3.02 2.2-5.8 6.33-5.8 3.32 0 5.91 2.37 5.91 5.53 0 3.3-2.08 5.95-4.97 5.95-.97 0-1.88-.5-2.19-1.1l-.6 2.27c-.22.83-.8 1.87-1.19 2.5C9.93 21.86 10.95 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2Z" />
        </svg>
      );
    case "threads":
      return (
        <svg
          className={className}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M17.65 11.16c-.09-.04-.18-.08-.27-.12-.16-2.92-1.75-4.59-4.43-4.61h-.04c-1.6 0-2.94.68-3.76 1.93l1.47 1.01c.61-.93 1.57-1.13 2.29-1.13h.03c.9.01 1.58.27 2.02.78.32.37.54.88.65 1.53-.83-.14-1.73-.18-2.69-.13-2.7.16-4.43 1.73-4.31 3.92.06 1.11.61 2.06 1.55 2.68.79.52 1.81.78 2.87.72 1.4-.08 2.5-.61 3.27-1.59.58-.74.95-1.7 1.11-2.91.66.4 1.15.93 1.42 1.56.46 1.07.49 2.83-.94 4.26-1.25 1.25-2.76 1.79-5.04 1.81-2.53-.02-4.45-.83-5.69-2.41-1.16-1.48-1.76-3.62-1.78-6.36.02-2.74.62-4.88 1.78-6.36C7.45 2.51 9.37 1.7 11.9 1.68c2.55.02 4.5.83 5.79 2.41.64.78 1.12 1.76 1.43 2.91l1.85-.49C20.55 5.07 19.94 3.85 19.13 2.86 17.5.84 15.06.01 11.91 0H11.9c-3.15.01-5.55.86-7.16 2.78-1.42 1.7-2.16 4.07-2.18 7.05v.02c.02 2.98.76 5.36 2.18 7.06 1.6 1.92 4.01 2.77 7.16 2.78h.01c2.79-.02 4.76-.74 6.39-2.36 2.13-2.13 2.07-4.79 1.36-6.42-.5-1.18-1.46-2.13-2.78-2.75ZM12.4 16.16c-1.17.07-2.39-.46-2.45-1.62-.04-.86.61-1.81 2.52-1.92.22-.01.43-.02.65-.02.69 0 1.34.07 1.93.2-.22 2.74-1.51 3.3-2.65 3.36Z" />
        </svg>
      );
    case "snapchat":
      return (
        <svg
          className={className}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M22 17.51c-.21-.41-.66-.62-1.18-.79-.16-.05-.45-.13-.59-.18-1.39-.55-2.39-1.42-3.18-2.66-.13-.21-.18-.4-.16-.55.04-.31.27-.5.5-.69.42-.32.84-.61.95-.96.13-.41.06-.74-.21-.96-.27-.22-.6-.21-.86-.06-.34.2-.66.4-.93.4-.13 0-.24-.04-.31-.12-.16-.18-.13-.51-.07-.93.06-.46.13-.99.07-1.55-.16-1.6-.79-2.45-1.55-3.13C13.49 4 12.16 3.6 11 3.6c-1.16 0-2.49.4-3.48 1.32-.76.68-1.39 1.53-1.55 3.13-.06.56.01 1.09.07 1.55.06.42.09.75-.07.93-.07.08-.18.12-.31.12-.27 0-.59-.2-.93-.4-.26-.15-.59-.16-.86.06-.27.22-.34.55-.21.96.11.35.53.64.95.96.23.19.46.38.5.69.02.15-.03.34-.16.55-.79 1.24-1.79 2.11-3.18 2.66-.14.05-.43.13-.59.18-.52.17-.97.38-1.18.79-.27.53.07 1.06.74 1.34.39.17.86.26 1.34.36.17.04.36.07.45.21.09.13.07.34.05.55-.02.21.01.35.13.45.21.18.6.13.96.06.46-.09.96-.16 1.42 0 .43.15.79.46 1.19.84.41.39.83.78 1.43 1.05.62.28 1.27.31 1.93.31.66 0 1.31-.03 1.93-.31.6-.27 1.02-.66 1.43-1.05.4-.38.76-.69 1.19-.84.46-.16.96-.09 1.42 0 .36.07.75.12.96-.06.12-.1.15-.24.13-.45-.02-.21-.04-.42.05-.55.09-.14.28-.17.45-.21.48-.1.95-.19 1.34-.36.67-.28 1.01-.81.74-1.34Z" />
        </svg>
      );
    case "link":
    default:
      return <LinkIcon className={className} style={{ width: px, height: px }} />;
  }
}
