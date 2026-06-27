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

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [activeSection, setActiveSection] = useState("home");
  const [isLoading, setIsLoading] = useState(true);
  
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [enquiryProduct, setEnquiryProduct] = useState("");

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
    <div className="relative min-h-screen bg-brand-light font-sans selection:bg-brand-primary/20 selection:text-brand-primary antialiased">
      <SEO />
      <StructuredData />
      <CookieConsent />
      
      {/* Premium First-impression Preloader */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.96, filter: "blur(12px)" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 z-50"
          >
            <PremiumLoading onComplete={() => setIsLoading(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Page Core Content Grid */}
      {!isLoading && (
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
          ) : currentPath === "/" || currentPath === "" ? (
            <>
              {/* Header Sticky Glass Navigation */}
              <ScrollProgress />
              <Navbar
                activeSection={activeSection}
                onSelectCategory={handleSelectCategory}
                onEnquiry={handleOpenEnquiry}
              />

              {/* Interactive Core Blocks */}
              <main>
                {/* Hero Showcase Block */}
                <Hero onStartOrdering={handleStartOrdering} />

                {/* Offerings service cards */}
                <Services onSelectCategory={handleSelectCategory} />

                {/* Why Choose Us Pillars */}
                <WhyChooseUs />

                {/* Connective timeline animation */}
                <DeliveryProcess />

                {/* ⭐ Recommended For You Section */}
                <Recommended onEnquiry={handleOpenEnquiry} />

                {/* Interactive Market Shelf catalog */}
                <FeaturedCategories
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  onEnquiry={handleOpenEnquiry}
                />

                {/* Story & Split Bento metrics */}
                <AboutUs />

                {/* Interactive review carousels */}
                <Reviews />

                {/* Dynamic height accordions */}
                <FAQ />

                {/* Vector Map & contact submissions */}
                <Contact />

                {/* Delivery Areas */}
                <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12 mb-8">
                  <DeliveryCoverage />
                </div>
              </main>

              {/* Clean Glassmorphic Footer */}
              <Footer onNavigate={navigate} />
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
          
          {currentPath !== "/" && currentPath !== "" && currentPath !== "/privacy-policy" && currentPath !== "/terms-and-conditions" && (
            <NotFound />
          )}

          <EnquiryModal
            isOpen={isEnquiryOpen}
            onClose={() => setIsEnquiryOpen(false)}
            productName={enquiryProduct}
          />
        </motion.div>
      )}
    </div>
  );
}
