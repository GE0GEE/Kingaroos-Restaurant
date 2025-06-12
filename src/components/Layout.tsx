import { Header } from "./Header";
import { Footer } from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    // THE FIX IS HERE: The `bg-cream-50` class has been removed.
    // This allows the main layout to be "transparent", letting the background
    // color set on the <body> tag (which changes with the theme) show through.
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
