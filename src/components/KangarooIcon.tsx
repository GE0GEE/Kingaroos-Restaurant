import { cn } from "@/lib/utils";

interface KangarooIconProps {
  className?: string;
}

export function KangarooIcon({ className }: KangarooIconProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
      aria-hidden="true"
    >
      {/* Body */}
      <path d="M38 55 C32 52 28 46 30 38 C32 30 40 26 48 28 C54 29 58 34 57 40" />
      {/* Head */}
      <path d="M57 40 C59 36 64 33 68 35 C72 37 73 42 71 46 C69 49 65 50 62 48" />
      {/* Long ears */}
      <path d="M65 35 C64 28 66 22 68 20" />
      <path d="M68 35 C69 28 72 23 73 21" />
      {/* Snout */}
      <path d="M71 46 C73 47 75 46 76 44" />
      {/* Eye */}
      <circle cx="69" cy="42" r="1.2" fill="currentColor" stroke="none" />
      {/* Neck to torso */}
      <path d="M62 48 C60 52 57 54 55 58" />
      {/* Back / rump */}
      <path d="M38 55 C36 62 38 70 44 74 C50 78 58 76 62 70 C65 65 64 60 62 56 C60 52 57 50 55 58" />
      {/* Tail */}
      <path d="M44 74 C40 80 36 84 32 86 C28 88 24 86 22 82" />
      {/* Front arms */}
      <path d="M55 58 C52 60 48 62 46 65" />
      <path d="M46 65 C44 67 43 70 44 72" />
      {/* Pouch hint */}
      <path d="M50 64 C48 66 47 69 49 71 C51 73 54 72 55 70" />
      {/* Back legs */}
      <path d="M44 74 C46 80 48 86 46 92" />
      <path d="M46 92 C44 94 40 94 38 92" />
      {/* Big foot */}
      <path d="M38 92 C35 91 32 92 31 94" />
      {/* Second back leg */}
      <path d="M50 76 C52 82 53 88 51 93" />
      <path d="M51 93 C49 95 46 95 44 93" />
    </svg>
  );
}
