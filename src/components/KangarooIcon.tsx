import { cn } from "@/lib/utils";

interface KangarooIconProps {
  className?: string;
}

export function KangarooIcon({ className }: KangarooIconProps) {
  return (
    <svg
      viewBox="0 0 110 130"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
      aria-hidden="true"
    >
      {/* Main body outline — seated kangaroo facing left, traced clockwise */}
      <path d="
        M 36 8
        C 32 5, 28 6, 27 10
        C 26 14, 29 17, 33 17
        C 29 19, 26 22, 27 27
        C 28 31, 32 33, 36 32
        C 31 35, 27 39, 26 44
        C 25 50, 28 55, 26 60
        C 24 65, 20 68, 19 73
        C 18 79, 21 84, 25 86
        C 22 87, 17 90, 17 94
        C 17 97, 21 98, 26 97
        C 33 96, 42 93, 46 91
        C 50 95, 55 102, 62 105
        C 69 108, 78 105, 82 99
        C 87 92, 85 82, 79 77
        C 74 72, 67 70, 65 65
        C 63 60, 65 54, 67 48
        C 70 41, 71 33, 68 26
        C 65 20, 60 16, 56 12
        C 53 9, 49 7, 46 7
        C 42 7, 38 8, 36 8
        Z
      " />
      {/* Ear */}
      <path d="M 30 8 C 27 3, 28 -1, 32 -1 C 36 -1, 38 3, 36 8" />
      {/* Front arm */}
      <path d="M 26 52 C 20 55, 17 60, 19 65 C 20 68, 24 68, 26 66" />
    </svg>
  );
}
