import { useTheme } from "@/contexts/ThemeContext";

/**
 * Subtle SVG-based corner/edge decorations per theme.
 * No emojis, no falling content — just tasteful accents that frame the page
 * without interfering with readability.
 */
export function ThemeDecorations() {
  const { currentTheme } = useTheme();

  if (!currentTheme.decorations?.pattern) return null;

  const pattern = currentTheme.decorations.pattern;
  const { primary, secondary, accent } = currentTheme.colors;

  return (
    <>
      <style>{decorationStyles}</style>
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        {pattern === "fireworks" && <FireworksAccent primary={primary} secondary={secondary} accent={accent} />}
        {pattern === "hearts" && <HeartsAccent primary={primary} secondary={secondary} />}
        {pattern === "flowers" && <FlowersAccent primary={primary} secondary={secondary} accent={accent} />}
        {pattern === "eggs" && <PastelAccent primary={primary} secondary={secondary} accent={accent} />}
        {pattern === "sun" && <SunAccent primary={primary} secondary={secondary} />}
        {pattern === "waves" && <WavesAccent primary={primary} secondary={secondary} />}
        {pattern === "stars" && <StarsAccent primary={primary} secondary={secondary} accent={accent} />}
        {pattern === "leaves" && <LeavesAccent primary={primary} secondary={secondary} />}
        {pattern === "books" && <SchoolAccent primary={primary} secondary={secondary} />}
        {pattern === "spooky" && <SpookyAccent primary={primary} secondary={secondary} />}
        {pattern === "harvest" && <HarvestAccent primary={primary} secondary={secondary} />}
        {pattern === "snowflakes" && <SnowAccent primary={primary} secondary={secondary} />}
      </div>
    </>
  );
}

// === Animations (subtle, slow) ===
const decorationStyles = `
  @keyframes drift-slow {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    50% { transform: translate(8px, -8px) rotate(3deg); }
  }
  @keyframes pulse-soft {
    0%, 100% { opacity: 0.10; }
    50% { opacity: 0.18; }
  }
  @keyframes spin-very-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes wave-shift {
    0%, 100% { transform: translateX(0); }
    50% { transform: translateX(-30px); }
  }
  @keyframes twinkle-soft {
    0%, 100% { opacity: 0.15; }
    50% { opacity: 0.35; }
  }
  .deco-drift { animation: drift-slow 12s ease-in-out infinite; }
  .deco-pulse { animation: pulse-soft 4s ease-in-out infinite; }
  .deco-spin { animation: spin-very-slow 60s linear infinite; }
  .deco-wave { animation: wave-shift 8s ease-in-out infinite; }
  .deco-twinkle { animation: twinkle-soft 3s ease-in-out infinite; }
`;

// === Reusable corner wrapper ===
type Corner = "tl" | "tr" | "bl" | "br";
const cornerClasses: Record<Corner, string> = {
  tl: "top-0 left-0",
  tr: "top-0 right-0",
  bl: "bottom-0 left-0",
  br: "bottom-0 right-0",
};

function CornerSlot({ corner, children, className = "" }: { corner: Corner; children: React.ReactNode; className?: string }) {
  return (
    <div className={`absolute ${cornerClasses[corner]} ${className}`}>
      {children}
    </div>
  );
}

// === New Year — radiating burst lines in corners ===
function FireworksAccent({ primary, secondary, accent }: any) {
  return (
    <>
      <CornerSlot corner="tl" className="deco-drift">
        <Burst color={primary} size={180} />
      </CornerSlot>
      <CornerSlot corner="br" className="deco-drift" >
        <Burst color={secondary} size={220} flipped />
      </CornerSlot>
      <CornerSlot corner="tr">
        <Burst color={accent} size={140} flipped />
      </CornerSlot>
    </>
  );
}
function Burst({ color, size, flipped = false }: { color: string; size: number; flipped?: boolean }) {
  const rays = Array.from({ length: 12 });
  return (
    <svg width={size} height={size} viewBox="-50 -50 100 100" style={{ opacity: 0.15, transform: flipped ? "scale(-1,-1)" : undefined }}>
      {rays.map((_, i) => {
        const angle = (i / rays.length) * 90;
        return (
          <line
            key={i}
            x1="0" y1="0"
            x2={Math.cos((angle * Math.PI) / 180) * 45}
            y2={Math.sin((angle * Math.PI) / 180) * 45}
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        );
      })}
      <circle cx="0" cy="0" r="3" fill={color} />
    </svg>
  );
}

// === Valentine's — soft heart silhouettes in corners ===
function HeartsAccent({ primary, secondary }: any) {
  return (
    <>
      <CornerSlot corner="tl" className="deco-drift">
        <Heart color={primary} size={120} />
      </CornerSlot>
      <CornerSlot corner="br" className="deco-drift">
        <Heart color={secondary} size={160} />
      </CornerSlot>
      <CornerSlot corner="tr" className="deco-pulse" >
        <Heart color={primary} size={80} />
      </CornerSlot>
      <CornerSlot corner="bl" className="deco-pulse" >
        <Heart color={secondary} size={100} />
      </CornerSlot>
    </>
  );
}
function Heart({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ opacity: 0.12 }}>
      <path
        d="M12 21s-7-4.5-9.5-9C1 9 2 5 6 5c2 0 3.5 1 4.5 2.5C11.5 6 13 5 15 5c4 0 5 4 3.5 7-2.5 4.5-9.5 9-9.5 9z"
        fill={color}
      />
    </svg>
  );
}

// === Spring — floral wreath silhouettes ===
function FlowersAccent({ primary, secondary, accent }: any) {
  return (
    <>
      <CornerSlot corner="tl" className="deco-drift">
        <Flower color={primary} size={140} />
      </CornerSlot>
      <CornerSlot corner="br" className="deco-drift">
        <Flower color={secondary} size={180} />
      </CornerSlot>
      <CornerSlot corner="tr">
        <Flower color={accent} size={100} />
      </CornerSlot>
    </>
  );
}
function Flower({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="-50 -50 100 100" style={{ opacity: 0.13 }}>
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <ellipse
          key={angle}
          cx="0" cy="-18" rx="10" ry="20"
          fill={color}
          transform={`rotate(${angle})`}
        />
      ))}
      <circle cx="0" cy="0" r="8" fill={color} opacity="0.6" />
    </svg>
  );
}

// === Easter — pastel egg-shaped blobs ===
function PastelAccent({ primary, secondary, accent }: any) {
  return (
    <>
      <CornerSlot corner="tl" className="deco-drift">
        <Egg color={primary} size={130} />
      </CornerSlot>
      <CornerSlot corner="br" className="deco-drift">
        <Egg color={secondary} size={170} />
      </CornerSlot>
      <CornerSlot corner="tr" className="deco-pulse">
        <Egg color={accent} size={90} />
      </CornerSlot>
    </>
  );
}
function Egg({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size * 1.3} viewBox="0 0 100 130" style={{ opacity: 0.12 }}>
      <ellipse cx="50" cy="70" rx="40" ry="55" fill={color} />
    </svg>
  );
}

// === Summer — sunburst rays ===
function SunAccent({ primary, secondary }: any) {
  return (
    <>
      <CornerSlot corner="tr" className="deco-spin">
        <SunRays color={primary} size={300} />
      </CornerSlot>
      <CornerSlot corner="bl" className="deco-pulse">
        <SunRays color={secondary} size={200} />
      </CornerSlot>
    </>
  );
}
function SunRays({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="-50 -50 100 100" style={{ opacity: 0.1 }}>
      <circle cx="0" cy="0" r="20" fill={color} />
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i / 16) * 360;
        return (
          <line
            key={i}
            x1="0" y1="0"
            x2={Math.cos((angle * Math.PI) / 180) * 45}
            y2={Math.sin((angle * Math.PI) / 180) * 45}
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
}

// === Mid Year — flowing waves at the bottom ===
function WavesAccent({ primary, secondary }: any) {
  return (
    <>
      <div className="absolute bottom-0 left-0 right-0 deco-wave" style={{ opacity: 0.15 }}>
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-32">
          <path
            d="M0,60 C150,100 350,0 600,60 C850,120 1050,20 1200,60 L1200,120 L0,120 Z"
            fill={primary}
          />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 right-0 deco-wave" style={{ opacity: 0.2, animationDelay: "1.5s" }}>
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-24">
          <path
            d="M0,60 C200,20 400,100 600,60 C800,20 1000,100 1200,60 L1200,120 L0,120 Z"
            fill={secondary}
          />
        </svg>
      </div>
    </>
  );
}

// === Independence — scattered twinkling stars in corners ===
function StarsAccent({ primary, secondary, accent }: any) {
  // Fixed positions in corner regions only
  const corners = [
    { top: "5%", left: "5%", size: 28, color: primary, delay: "0s" },
    { top: "12%", left: "10%", size: 18, color: secondary, delay: "0.5s" },
    { top: "8%", right: "8%", size: 24, color: accent, delay: "1s" },
    { top: "18%", right: "15%", size: 16, color: primary, delay: "1.5s" },
    { bottom: "10%", left: "8%", size: 22, color: secondary, delay: "0.8s" },
    { bottom: "5%", left: "15%", size: 16, color: accent, delay: "1.3s" },
    { bottom: "12%", right: "6%", size: 26, color: primary, delay: "0.3s" },
    { bottom: "5%", right: "14%", size: 18, color: secondary, delay: "1.8s" },
  ];
  return (
    <>
      {corners.map((s, i) => (
        <div key={i} className="absolute deco-twinkle" style={{ ...s, animationDelay: s.delay }}>
          <Star color={s.color as string} size={s.size as number} />
        </div>
      ))}
    </>
  );
}
function Star({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path
        d="M12 2 L14.5 9 L22 9.5 L16 14 L18 21 L12 17 L6 21 L8 14 L2 9.5 L9.5 9 Z"
        fill={color}
      />
    </svg>
  );
}

// === Autumn — leaf silhouettes in corners ===
function LeavesAccent({ primary, secondary }: any) {
  return (
    <>
      <CornerSlot corner="tl" className="deco-drift">
        <Leaf color={primary} size={140} />
      </CornerSlot>
      <CornerSlot corner="br" className="deco-drift">
        <Leaf color={secondary} size={170} />
      </CornerSlot>
      <CornerSlot corner="tr" className="deco-pulse">
        <Leaf color={primary} size={90} />
      </CornerSlot>
    </>
  );
}
function Leaf({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ opacity: 0.13 }}>
      <path
        d="M50 10 C20 20, 10 50, 20 80 C40 70, 70 50, 80 20 C70 15, 60 12, 50 10 Z"
        fill={color}
      />
      <path d="M50 10 C40 40, 30 60, 20 80" stroke={color} strokeWidth="1" fill="none" opacity="0.5" />
    </svg>
  );
}

// === Back to School — abstract notebook lines & pencil shapes ===
function SchoolAccent({ primary, secondary }: any) {
  return (
    <>
      {/* Top notebook lines */}
      <div className="absolute top-0 left-0 right-0 h-24" style={{ opacity: 0.08 }}>
        <svg width="100%" height="100%" preserveAspectRatio="none">
          {[20, 40, 60, 80].map((y) => (
            <line key={y} x1="0" y1={y} x2="100%" y2={y} stroke={primary} strokeWidth="1" strokeDasharray="4 4" />
          ))}
        </svg>
      </div>
      <CornerSlot corner="br" className="deco-drift">
        <Pencil color={secondary} size={180} />
      </CornerSlot>
    </>
  );
}
function Pencil({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size / 4} viewBox="0 0 200 50" style={{ opacity: 0.12, transform: "rotate(-30deg)" }}>
      <rect x="0" y="15" width="160" height="20" fill={color} />
      <polygon points="160,15 195,25 160,35" fill={color} opacity="0.6" />
      <polygon points="190,22 200,25 190,28" fill={color} />
    </svg>
  );
}

// === Halloween — spider webs in corners + crescent moon ===
function SpookyAccent({ primary, secondary }: any) {
  return (
    <>
      <CornerSlot corner="tl">
        <SpiderWeb color={primary} size={180} />
      </CornerSlot>
      <CornerSlot corner="tr">
        <SpiderWeb color={primary} size={180} flipped />
      </CornerSlot>
      <div className="absolute top-12 right-12 deco-pulse">
        <Moon color={primary} size={100} />
      </div>
      <CornerSlot corner="bl" className="deco-drift">
        <Bat color={secondary} size={80} />
      </CornerSlot>
    </>
  );
}
function SpiderWeb({ color, size, flipped = false }: { color: string; size: number; flipped?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ opacity: 0.18, transform: flipped ? "scaleX(-1)" : undefined }}>
      {/* Radial lines */}
      {[0, 22.5, 45, 67.5, 90].map((angle) => (
        <line
          key={angle}
          x1="0" y1="0"
          x2={Math.cos((angle * Math.PI) / 180) * 100}
          y2={Math.sin((angle * Math.PI) / 180) * 100}
          stroke={color} strokeWidth="0.8"
        />
      ))}
      {/* Concentric arcs */}
      {[20, 40, 60, 80].map((r) => (
        <path
          key={r}
          d={`M ${r} 0 A ${r} ${r} 0 0 1 0 ${r}`}
          stroke={color}
          strokeWidth="0.8"
          fill="none"
        />
      ))}
    </svg>
  );
}
function Moon({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ opacity: 0.25 }}>
      <circle cx="50" cy="50" r="35" fill={color} />
    </svg>
  );
}
function Bat({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size / 2} viewBox="0 0 100 50" style={{ opacity: 0.2 }}>
      <path
        d="M50 25 C40 10, 20 5, 5 15 C15 20, 20 30, 30 28 C35 30, 45 30, 50 35 C55 30, 65 30, 70 28 C80 30, 85 20, 95 15 C80 5, 60 10, 50 25 Z"
        fill={color}
      />
    </svg>
  );
}

// === Thanksgiving — wheat sprigs in corners ===
function HarvestAccent({ primary, secondary }: any) {
  return (
    <>
      <CornerSlot corner="bl" className="deco-drift">
        <Wheat color={primary} size={180} />
      </CornerSlot>
      <CornerSlot corner="br" className="deco-drift">
        <Wheat color={secondary} size={180} flipped />
      </CornerSlot>
    </>
  );
}
function Wheat({ color, size, flipped = false }: { color: string; size: number; flipped?: boolean }) {
  return (
    <svg width={size / 2} height={size} viewBox="0 0 50 100" style={{ opacity: 0.15, transform: flipped ? "scaleX(-1)" : undefined }}>
      {/* Stem */}
      <line x1="25" y1="100" x2="25" y2="20" stroke={color} strokeWidth="2" />
      {/* Grain ovals */}
      {[20, 30, 40, 50, 60, 70].map((y, i) => (
        <g key={y}>
          <ellipse cx={i % 2 === 0 ? 18 : 32} cy={y} rx="4" ry="7" fill={color} transform={`rotate(${i % 2 === 0 ? -20 : 20} ${i % 2 === 0 ? 18 : 32} ${y})`} />
        </g>
      ))}
    </svg>
  );
}

// === Christmas — snowflakes scattered in corners + decorative pine sprig ===
function SnowAccent({ primary, secondary }: any) {
  const snowflakes = [
    { top: "5%", left: "8%", size: 48, color: primary, delay: "0s" },
    { top: "15%", left: "20%", size: 32, color: primary, delay: "1s" },
    { top: "8%", right: "12%", size: 56, color: primary, delay: "0.5s" },
    { top: "22%", right: "8%", size: 28, color: primary, delay: "1.5s" },
    { bottom: "10%", left: "10%", size: 40, color: primary, delay: "0.7s" },
    { bottom: "20%", left: "20%", size: 28, color: primary, delay: "1.3s" },
    { bottom: "8%", right: "10%", size: 52, color: primary, delay: "0.3s" },
    { bottom: "22%", right: "20%", size: 36, color: primary, delay: "1.8s" },
  ];
  return (
    <>
      {snowflakes.map((s, i) => (
        <div key={i} className="absolute deco-twinkle" style={{ ...s, animationDelay: s.delay }}>
          <Snowflake color={s.color as string} size={s.size as number} />
        </div>
      ))}
      <CornerSlot corner="bl" className="deco-drift">
        <PineSprig color={secondary} size={200} />
      </CornerSlot>
    </>
  );
}
function Snowflake({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="-50 -50 100 100">
      {[0, 60, 120].map((angle) => (
        <g key={angle} transform={`rotate(${angle})`}>
          <line x1="0" y1="-40" x2="0" y2="40" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <line x1="-10" y1="-30" x2="0" y2="-40" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <line x1="10" y1="-30" x2="0" y2="-40" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <line x1="-10" y1="30" x2="0" y2="40" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <line x1="10" y1="30" x2="0" y2="40" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </g>
      ))}
    </svg>
  );
}
function PineSprig({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ opacity: 0.2, transform: "rotate(45deg)" }}>
      <line x1="20" y1="80" x2="80" y2="20" stroke={color} strokeWidth="3" strokeLinecap="round" />
      {[25, 35, 45, 55, 65, 75].map((t) => (
        <g key={t}>
          <line x1={t} y1={100 - t} x2={t - 12} y2={100 - t - 12} stroke={color} strokeWidth="2" strokeLinecap="round" />
          <line x1={t} y1={100 - t} x2={t + 12} y2={100 - t + 12} stroke={color} strokeWidth="2" strokeLinecap="round" />
        </g>
      ))}
    </svg>
  );
}
