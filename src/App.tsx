import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import WhyChooseUs from "./components/WhyChooseUs";
import DeliveryProcess from "./components/DeliveryProcess";
import FeaturedCategories from "./components/FeaturedCategories";
import Recommended from "./components/Recommended";
import AboutUs from "./components/AboutUs";
import Reviews from "./components/Reviews";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsAndConditions from "./components/TermsAndConditions";
import Copyright from "./components/Copyright";
import ExpandableFAB from "./components/ExpandableFAB";
import EnquiryModal from "./components/EnquiryModal";
import PWAInstallPrompt from "./components/PWAInstallPrompt";
import MobileNav from "./components/MobileNav";
import ScrollProgress from "./components/ScrollProgress";
import NotFound from "./components/NotFound";
import PremiumLoading from "./components/PremiumLoading";
import DeliveryCoverage from "./components/DeliveryCoverage";
import SEO from "./components/SEO";
import CookieConsent from "./components/CookieConsent";
import StructuredData from "./components/StructuredData";
import { useNotification } from "./context/NotificationContext";
import CoverageBanner from "./components/CoverageBanner";
import CartDrawer from "./components/CartDrawer";
import CheckoutModal from "./components/CheckoutModal";

import { AuthProvider } from "./auth/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import AppSkeleton from "./components/skeletons/AppSkeleton";

export default function App() {
  const { info } = useNotification();
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [activeSection, setActiveSection] = useState("home");
  const [isLoading, setIsLoading] = useState(true);
  
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [enquiryProduct, setEnquiryProduct] = useState("");
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleOpenEnquiry = (productName: string) => {
    setEnquiryProduct(productName);
    setIsEnquiryOpen(true);
  };
  const [currentPath, setCurrentPath] = useState(() => {
    const hash = window.location.hash;
    if (hash.startsWith("#/")) {
      return hash.slice(1);
    }
    return window.location.pathname;
  });

  // Simulated asynchronous data fetching delay for the Skeleton system
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // 1.5 seconds simulated load
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleLocationChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith("#/")) {
        setCurrentPath(hash.slice(1));
      } else {
        setCurrentPath(window.location.pathname);
      }
    };

    window.addEventListener("popstate", handleLocationChange);
    window.addEventListener("hashchange", handleLocationChange);
    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      window.removeEventListener("hashchange", handleLocationChange);
    };
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, "", path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Intersection Observer for scroll tracking navigation link highlight
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const options = {
      root: null,
      rootMargin: "-25% 0px -55% 0px", // triggers when section dominates middle of viewport
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);

    sections.forEach((section) => observer.observe(section));
    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  // Maps category selection in services cards to smooth catalog scrolling & auto-tab filtering
  const handleSelectCategory = (categoryName: string) => {
    setSelectedCategory(categoryName);
    const element = document.querySelector("#featured");
    if (element) {
      const offset = 80; // nav height offset
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const handleStartOrdering = () => {
    setSelectedCategory("All Products");
    info("Ready to Order?", "Browse our catalog and tap Connect on any product.");
    const element = document.querySelector("#featured");
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="relative min-h-screen bg-background font-sans selection:bg-primary/20 selection:text-primary antialiased transition-colors duration-500 text-on-surface">
          <SEO />
          <StructuredData />
          <CookieConsent />
          
          {/* Main Page Core Content Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {currentPath === "/privacy-policy" ? (
              <>
                <PrivacyPolicy onNavigateHome={() => navigate("/")} />
                <Footer onNavigate={navigate} />
              </>
            ) : currentPath === "/terms-and-conditions" ? (
              <>
                <TermsAndConditions onNavigateHome={() => navigate("/")} />
                <Footer onNavigate={navigate} />
              </>
            ) : currentPath === "/copyright" ? (
              <>
                <Copyright />
                <Footer onNavigate={navigate} />
              </>
            ) : currentPath === "/" || currentPath === "" ? (
              <>
                {/* Header Sticky Glass Navigation */}
                <CoverageBanner />
                <ScrollProgress />
                <Navbar
                  activeSection={activeSection}
                  onSelectCategory={handleSelectCategory}
                  onEnquiry={handleOpenEnquiry}
                />
                
                {/* Interactive Core Blocks */}
                <main>
                  <AnimatePresence mode="wait">
                    {isLoading ? (
                      <motion.div
                        key="skeleton"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4 }}
                      >
                        <AppSkeleton />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="content"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Hero onStartOrdering={handleStartOrdering} />
                        <Services onSelectCategory={handleSelectCategory} />
                        <WhyChooseUs />
                        <DeliveryProcess />
                        <Recommended onEnquiry={handleOpenEnquiry} />
                        <FeaturedCategories
                          selectedCategory={selectedCategory}
                          setSelectedCategory={setSelectedCategory}
                          onEnquiry={handleOpenEnquiry}
                        />
                        <AboutUs />
                        <Reviews />
                        <FAQ />
                        <Contact />
                        <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12 mb-8">
                          <DeliveryCoverage />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </main>

                {/* Clean Glassmorphic Footer */}
                {!isLoading && <Footer onNavigate={navigate} />}
              </>
            ) : null}
            <ExpandableFAB />
            <PWAInstallPrompt />
            <MobileNav 
              activeSection={activeSection} 
              onNavigate={(href) => {
                const element = document.querySelector(href);
                if (element) {
                  const offset = 80;
                  const elementPosition = element.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - offset;
                  window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                }
              }} 
            />
            
            {currentPath !== "/" && currentPath !== "" && currentPath !== "/privacy-policy" && currentPath !== "/terms-and-conditions" && currentPath !== "/copyright" && (
              <NotFound />
            )}

            <EnquiryModal
              isOpen={isEnquiryOpen}
              onClose={() => setIsEnquiryOpen(false)}
              productName={enquiryProduct}
            />

            <CartDrawer onCheckout={() => setIsCheckoutOpen(true)} />
            <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
          </motion.div>
      </div>
      </AuthProvider>
    </ThemeProvider>
  );
}
