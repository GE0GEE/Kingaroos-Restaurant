import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { AdminProvider, useAdmin } from "./contexts/AdminContext";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Merch from "./pages/Merch";
import DogRescue from "./pages/DogRescue";
import Events from "./pages/Events";
import Promotions from "./pages/Promotions";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function FaviconUpdater() {
  const { siteContent } = useAdmin();
  useEffect(() => {
    if (!siteContent.faviconImage) return;
    let link = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = siteContent.faviconImage;
  }, [siteContent.faviconImage]);
  return null;
}

function ProtectedAdminRoute({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAdmin();
  return isLoggedIn ? <>{children}</> : <Navigate to="/contact" replace />;
}

function RedirectAfterLogin() {
  const { isLoggedIn, justLoggedIn, clearJustLoggedIn } = useAdmin();
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn && justLoggedIn) {
      clearJustLoggedIn();
      navigate("/admin", { replace: true });
    }
  }, [isLoggedIn, justLoggedIn]);
  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AdminProvider>
        <FaviconUpdater />
        <BrowserRouter>
          <RedirectAfterLogin />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/merch" element={<Merch />} />
            <Route path="/dog-rescue" element={<DogRescue />} />
            <Route path="/events" element={<Events />} />
            <Route path="/promotions" element={<Promotions />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/admin"
              element={
                <ProtectedAdminRoute>
                  <Admin />
                </ProtectedAdminRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AdminProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
