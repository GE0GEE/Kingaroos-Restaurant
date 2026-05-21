import { cn } from "@/lib/utils";

interface KangarooLoaderProps {
  className?: string;
  text?: string;
}

/**
 * A kangaroo outline SVG loader with a draw-on stroke animation + gentle bounce.
 * Used as the unified loading screen across all pages.
 */
export function KangarooLoader({ className, text = "Loading..." }: KangarooLoaderProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-4", className)}>
      <div className="kangaroo-loader-bounce">
        <svg
          viewBox="-5 -5 120 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-20 w-20 kangaroo-loader-draw"
          aria-hidden="true"
        >
          {/* Main body outline — seated kangaroo */}
          <path
            className="kangaroo-stroke"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="
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
            "
          />
          {/* Ear */}
          <path
            className="kangaroo-stroke"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 30 8 C 27 3, 28 -1, 32 -1 C 36 -1, 38 3, 36 8"
          />
          {/* Front arm */}
          <path
            className="kangaroo-stroke"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 26 52 C 20 55, 17 60, 19 65 C 20 68, 24 68, 26 66"
          />
          {/* Tail */}
          <path
            className="kangaroo-stroke"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 82 99 C 88 104, 95 108, 100 112 C 104 115, 106 119, 103 122"
          />
          {/* Eye dot */}
          <circle
            cx="32"
            cy="12"
            r="1.5"
            fill="currentColor"
            className="kangaroo-eye"
          />
        </svg>
      </div>
      {text && (
        <p className="font-body text-brown-600 text-sm animate-pulse">{text}</p>
      )}
    </div>
  );
}
