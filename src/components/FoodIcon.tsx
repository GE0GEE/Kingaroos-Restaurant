import { cn } from "@/lib/utils";

interface FoodIconProps {
  className?: string;
}

export function FoodIcon({ className }: FoodIconProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
      aria-hidden="true"
    >
      {/* Plate — oval */}
      <ellipse cx="50" cy="72" rx="36" ry="10" />
      {/* Table surface line */}
      <line x1="10" y1="82" x2="90" y2="82" />

      {/* Dome / cloche cover */}
      <path d="M 16 72 C 16 48, 84 48, 84 72" />

      {/* Fork — left of plate */}
      <line x1="22" y1="30" x2="22" y2="55" />
      <line x1="18" y1="30" x2="18" y2="42" />
      <line x1="22" y1="30" x2="18" y2="30" />
      <line x1="26" y1="30" x2="26" y2="42" />
      <line x1="22" y1="30" x2="26" y2="30" />

      {/* Knife — right of plate */}
      <line x1="78" y1="55" x2="78" y2="30" />
      <path d="M 78 30 C 82 32, 83 38, 78 42" />
    </svg>
  );
}
