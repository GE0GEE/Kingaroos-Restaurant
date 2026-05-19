import { Header } from "./Header";
import { Footer } from "../pages/Footer";
import { ThemeIndicator } from "./ThemeIndicator";
import { ThemeDecorations } from "./ThemeDecorations";
import { ThemeBanner } from "./ThemeBanner";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col relative">
      <ThemeDecorations />
      <ThemeBanner />
      <Header />
      <main className="flex-1 relative z-10">{children}</main>
      <Footer />
      <ThemeIndicator />
    </div>
  );
}
