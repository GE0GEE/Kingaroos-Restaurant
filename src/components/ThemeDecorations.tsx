import { useTheme } from "@/contexts/ThemeContext";
import { useEffect, useState } from "react";

// Generate random positions for floating elements
const generateRandomPositions = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 10,
    duration: 8 + Math.random() * 12,
    size: 0.5 + Math.random() * 1.5,
  }));
};

export function ThemeDecorations() {
  const { currentTheme } = useTheme();
  const [positions] = useState(() => generateRandomPositions(20));

  if (!currentTheme.decorations?.pattern) return null;

  const pattern = currentTheme.decorations.pattern;

  return (
    <>
      {/* Inject animation styles */}
      <style>{themeAnimations}</style>

      {/* Decoration container - fixed position, full screen, behind content */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {pattern === "fireworks" && <FireworksDecoration positions={positions} />}
        {pattern === "hearts" && <HeartsDecoration positions={positions} />}
        {pattern === "flowers" && <FlowersDecoration positions={positions} />}
        {pattern === "eggs" && <EggsDecoration positions={positions} />}
        {pattern === "sun" && <SunDecoration />}
        {pattern === "waves" && <WavesDecoration />}
        {pattern === "stars" && <StarsDecoration positions={positions} />}
        {pattern === "leaves" && <LeavesDecoration positions={positions} />}
        {pattern === "books" && <BooksDecoration positions={positions} />}
        {pattern === "spooky" && <SpookyDecoration positions={positions} />}
        {pattern === "harvest" && <HarvestDecoration positions={positions} />}
        {pattern === "snowflakes" && <SnowflakesDecoration positions={positions} />}
      </div>
    </>
  );
}

// === ANIMATION STYLES ===
const themeAnimations = `
  @keyframes float-down {
    0% { transform: translateY(-10vh) rotate(0deg); opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
  }
  @keyframes float-up {
    0% { transform: translateY(110vh) rotate(0deg) scale(1); opacity: 0; }
    10% { opacity: 0.8; }
    90% { opacity: 0.8; }
    100% { transform: translateY(-10vh) rotate(360deg) scale(1.2); opacity: 0; }
  }
  @keyframes sway {
    0%, 100% { transform: translateX(0) rotate(-5deg); }
    50% { transform: translateX(30px) rotate(5deg); }
  }
  @keyframes pulse-glow {
    0%, 100% { opacity: 0.6; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.1); }
  }
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes wave-motion {
    0%, 100% { transform: translateX(0); }
    50% { transform: translateX(-20px); }
  }
  @keyframes firework-burst {
    0% { transform: scale(0) rotate(0deg); opacity: 1; }
    50% { transform: scale(1) rotate(180deg); opacity: 1; }
    100% { transform: scale(1.5) rotate(360deg); opacity: 0; }
  }
  @keyframes twinkle {
    0%, 100% { opacity: 0.3; transform: scale(0.8); }
    50% { opacity: 1; transform: scale(1.2); }
  }
  @keyframes bounce-soft {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-15px); }
  }

  .anim-float-down { animation: float-down linear infinite; }
  .anim-float-up { animation: float-up linear infinite; }
  .anim-sway { animation: sway 3s ease-in-out infinite; }
  .anim-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
  .anim-spin-slow { animation: spin-slow 20s linear infinite; }
  .anim-wave { animation: wave-motion 4s ease-in-out infinite; }
  .anim-firework { animation: firework-burst 3s ease-out infinite; }
  .anim-twinkle { animation: twinkle 2s ease-in-out infinite; }
  .anim-bounce-soft { animation: bounce-soft 2s ease-in-out infinite; }
`;

// === DECORATION COMPONENTS ===

// 🎉 New Year - Fireworks
function FireworksDecoration({ positions }: { positions: any[] }) {
  return (
    <>
      {positions.slice(0, 15).map((pos) => (
        <div
          key={pos.id}
          className="absolute anim-firework"
          style={{
            left: `${pos.left}%`,
            top: `${10 + Math.random() * 70}%`,
            animationDelay: `${pos.delay}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
            fontSize: `${pos.size * 2}rem`,
          }}
        >
          {["🎆", "🎇", "✨", "🎊"][Math.floor(Math.random() * 4)]}
        </div>
      ))}
    </>
  );
}

// 💕 Valentine's - Hearts
function HeartsDecoration({ positions }: { positions: any[] }) {
  return (
    <>
      {positions.map((pos) => (
        <div
          key={pos.id}
          className="absolute anim-float-up"
          style={{
            left: `${pos.left}%`,
            animationDelay: `${pos.delay}s`,
            animationDuration: `${pos.duration}s`,
            fontSize: `${pos.size}rem`,
          }}
        >
          {["❤️", "💕", "💖", "💗", "💝"][Math.floor(Math.random() * 5)]}
        </div>
      ))}
    </>
  );
}

// 🌸 Spring - Flower petals
function FlowersDecoration({ positions }: { positions: any[] }) {
  return (
    <>
      {positions.map((pos) => (
        <div
          key={pos.id}
          className="absolute anim-float-down"
          style={{
            left: `${pos.left}%`,
            animationDelay: `${pos.delay}s`,
            animationDuration: `${pos.duration}s`,
            fontSize: `${pos.size}rem`,
          }}
        >
          {["🌸", "🌺", "🌷", "🌼", "🌻"][Math.floor(Math.random() * 5)]}
        </div>
      ))}
    </>
  );
}

// 🐰 Easter - Eggs
function EggsDecoration({ positions }: { positions: any[] }) {
  return (
    <>
      {positions.map((pos) => (
        <div
          key={pos.id}
          className="absolute anim-bounce-soft"
          style={{
            left: `${pos.left}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${pos.delay}s`,
            animationDuration: `${2 + Math.random() * 3}s`,
            fontSize: `${pos.size * 1.2}rem`,
            opacity: 0.6,
          }}
        >
          {["🥚", "🐰", "🐣", "🌷"][Math.floor(Math.random() * 4)]}
        </div>
      ))}
    </>
  );
}

// ☀️ Summer - Sun rays
function SunDecoration() {
  return (
    <>
      <div className="absolute top-10 right-10 anim-spin-slow">
        <div className="text-9xl opacity-20">☀️</div>
      </div>
      <div className="absolute bottom-20 left-10 anim-pulse-glow">
        <div className="text-7xl opacity-30">🌴</div>
      </div>
      <div className="absolute top-1/3 left-1/4 anim-bounce-soft">
        <div className="text-5xl opacity-20">🏖️</div>
      </div>
      <div className="absolute bottom-1/3 right-1/4 anim-bounce-soft" style={{ animationDelay: "1s" }}>
        <div className="text-6xl opacity-20">🌺</div>
      </div>
    </>
  );
}

// 🌊 Mid Year - Waves
function WavesDecoration() {
  return (
    <>
      <div className="absolute bottom-0 left-0 right-0 anim-wave opacity-20">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-32">
          <path
            d="M0,60 C150,100 350,0 600,60 C850,120 1050,20 1200,60 L1200,120 L0,120 Z"
            fill="rgb(59, 130, 246)"
          />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 right-0 anim-wave opacity-30" style={{ animationDelay: "1s" }}>
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-24">
          <path
            d="M0,60 C200,20 400,100 600,60 C800,20 1000,100 1200,60 L1200,120 L0,120 Z"
            fill="rgb(14, 165, 233)"
          />
        </svg>
      </div>
    </>
  );
}

// 🎆 Independence - Stars
function StarsDecoration({ positions }: { positions: any[] }) {
  return (
    <>
      {positions.map((pos) => (
        <div
          key={pos.id}
          className="absolute anim-twinkle"
          style={{
            left: `${pos.left}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${pos.delay}s`,
            animationDuration: `${1.5 + Math.random() * 2}s`,
            fontSize: `${pos.size}rem`,
          }}
        >
          {["⭐", "🌟", "✨", "🎆"][Math.floor(Math.random() * 4)]}
        </div>
      ))}
    </>
  );
}

// 🍂 Autumn - Falling leaves
function LeavesDecoration({ positions }: { positions: any[] }) {
  return (
    <>
      {positions.map((pos) => (
        <div
          key={pos.id}
          className="absolute anim-float-down"
          style={{
            left: `${pos.left}%`,
            animationDelay: `${pos.delay}s`,
            animationDuration: `${pos.duration}s`,
            fontSize: `${pos.size * 1.2}rem`,
          }}
        >
          {["🍂", "🍁", "🍃"][Math.floor(Math.random() * 3)]}
        </div>
      ))}
    </>
  );
}

// 📚 Back to School - Books and pencils
function BooksDecoration({ positions }: { positions: any[] }) {
  return (
    <>
      {positions.slice(0, 12).map((pos) => (
        <div
          key={pos.id}
          className="absolute anim-bounce-soft"
          style={{
            left: `${pos.left}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${pos.delay}s`,
            animationDuration: `${2 + Math.random() * 3}s`,
            fontSize: `${pos.size * 1.2}rem`,
            opacity: 0.5,
          }}
        >
          {["📚", "✏️", "📝", "🎒", "📖"][Math.floor(Math.random() * 5)]}
        </div>
      ))}
    </>
  );
}

// 🎃 Halloween - Spooky stuff
function SpookyDecoration({ positions }: { positions: any[] }) {
  return (
    <>
      {/* Spider webs in corners */}
      <div className="absolute top-0 left-0 text-6xl opacity-30 select-none">🕸️</div>
      <div className="absolute top-0 right-0 text-6xl opacity-30 select-none transform scale-x-[-1]">🕸️</div>

      {/* Floating ghosts and pumpkins */}
      {positions.map((pos) => (
        <div
          key={pos.id}
          className="absolute anim-float-up"
          style={{
            left: `${pos.left}%`,
            animationDelay: `${pos.delay}s`,
            animationDuration: `${pos.duration * 1.2}s`,
            fontSize: `${pos.size * 1.5}rem`,
            opacity: 0.7,
          }}
        >
          {["🎃", "👻", "🦇", "🕷️", "🌙"][Math.floor(Math.random() * 5)]}
        </div>
      ))}

      {/* Big moon in corner */}
      <div className="absolute top-10 right-20 anim-pulse-glow">
        <div className="text-8xl opacity-40">🌕</div>
      </div>
    </>
  );
}

// 🦃 Thanksgiving - Harvest items
function HarvestDecoration({ positions }: { positions: any[] }) {
  return (
    <>
      {positions.map((pos) => (
        <div
          key={pos.id}
          className="absolute anim-float-down"
          style={{
            left: `${pos.left}%`,
            animationDelay: `${pos.delay}s`,
            animationDuration: `${pos.duration * 1.5}s`,
            fontSize: `${pos.size * 1.3}rem`,
            opacity: 0.7,
          }}
        >
          {["🍂", "🌽", "🎃", "🦃", "🍁"][Math.floor(Math.random() * 5)]}
        </div>
      ))}
    </>
  );
}

// 🎄 Christmas - Snowflakes + decorations
function SnowflakesDecoration({ positions }: { positions: any[] }) {
  return (
    <>
      {/* Falling snowflakes */}
      {positions.map((pos) => (
        <div
          key={pos.id}
          className="absolute anim-float-down"
          style={{
            left: `${pos.left}%`,
            animationDelay: `${pos.delay}s`,
            animationDuration: `${pos.duration}s`,
            fontSize: `${pos.size}rem`,
            color: "white",
          }}
        >
          {["❄️", "❅", "❆", "✨"][Math.floor(Math.random() * 4)]}
        </div>
      ))}

      {/* Christmas tree corner decoration */}
      <div className="absolute bottom-10 right-10 anim-bounce-soft">
        <div className="text-7xl opacity-50">🎄</div>
      </div>
      <div className="absolute bottom-10 left-10 anim-bounce-soft" style={{ animationDelay: "1s" }}>
        <div className="text-6xl opacity-40">🎁</div>
      </div>
    </>
  );
}
