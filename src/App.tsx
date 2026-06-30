import { useState, useEffect, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MobileNav from "./components/MobileNav";
import ScrollProgress from "./components/ScrollProgress";
import SEO from "./components/SEO";
import StructuredData from "./components/StructuredData";
import CoverageBanner from "./components/CoverageBanner";
import AppSkeleton from "./components/skeletons/AppSkeleton";
import { useNotification } from "./context/NotificationContext";
import { AuthProvider } from "./auth/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import Services from "./components/Services";
import FeaturedCategories from "./components/FeaturedCategories";
import { ReviewsSkeleton, ContactSkeleton } from "./components/skeletons/SectionSkeletons";

const WhyChooseUs = lazy(() => import("./components/WhyChooseUs"));
const DeliveryProcess = lazy(() => import("./components/DeliveryProcess"));
const Recommended = lazy(() => import("./components/Recommended"));
const AboutUs = lazy(() => import("./components/AboutUs"));
const Reviews = lazy(() => import("./components/Reviews"));
const FAQ = lazy(() => import("./components/FAQ"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));
const PrivacyPolicy = lazy(() => import("./components/PrivacyPolicy"));
const TermsAndConditions = lazy(() => import("./components/TermsAndConditions"));
const Copyright = lazy(() => import("./components/Copyright"));
const ExpandableFAB = lazy(() => import("./components/ExpandableFAB"));
const EnquiryModal = lazy(() => import("./components/EnquiryModal"));
const PWAInstallPrompt = lazy(() => import("./components/PWAInstallPrompt"));
const NotFound = lazy(() => import("./components/NotFound"));
const DeliveryCoverage = lazy(() => import("./components/DeliveryCoverage"));
const CookieConsent = lazy(() => import("./components/CookieConsent"));
const CartDrawer = lazy(() => import("./components/CartDrawer"));
const CheckoutModal = lazy(() => import("./components/CheckoutModal"));

export default function App() {
  const { info } = useNotification();
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [activeSection, setActiveSection] = useState("home");
  
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
                <Suspense fallback={<AppSkeleton />}>
                  <PrivacyPolicy onNavigateHome={() => navigate("/")} />
                  <Footer onNavigate={navigate} />
                </Suspense>
              </>
            ) : currentPath === "/terms-and-conditions" ? (
              <>
                <Suspense fallback={<AppSkeleton />}>
                  <TermsAndConditions onNavigateHome={() => navigate("/")} />
                  <Footer onNavigate={navigate} />
                </Suspense>
              </>
            ) : currentPath === "/copyright" ? (
              <>
                <Suspense fallback={<AppSkeleton />}>
                  <Copyright />
                  <Footer onNavigate={navigate} />
                </Suspense>
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
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Hero onStartOrdering={handleStartOrdering} />
                    <Services onSelectCategory={handleSelectCategory} />
                    
                    <Suspense fallback={<div className="py-24 flex justify-center"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>}>
                      <WhyChooseUs />
                      <DeliveryProcess />
                      <Recommended onEnquiry={handleOpenEnquiry} />
                    </Suspense>
                    
                    <FeaturedCategories
                      selectedCategory={selectedCategory}
                      setSelectedCategory={setSelectedCategory}
                      onEnquiry={handleOpenEnquiry}
                    />
                    
                    <Suspense fallback={<div className="py-24 flex justify-center"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>}>
                      <AboutUs />
                    </Suspense>
                    
                    <Suspense fallback={<ReviewsSkeleton />}>
                      <Reviews />
                    </Suspense>
                    
                    <Suspense fallback={<div className="py-24 flex justify-center"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>}>
                      <FAQ />
                    </Suspense>
                    
                    <Suspense fallback={<ContactSkeleton />}>
                      <Contact />
                    </Suspense>
                    
                    <Suspense fallback={null}>
                      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12 mb-8">
                        <DeliveryCoverage />
                      </div>
                    </Suspense>
                  </motion.div>
                </main>

                {/* Clean Glassmorphic Footer */}
                <Suspense fallback={null}>
                  <Footer onNavigate={navigate} />
                </Suspense>
              </>
            ) : null}
            <Suspense fallback={null}>
              <ExpandableFAB />
              <PWAInstallPrompt />
            </Suspense>
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
              <Suspense fallback={<AppSkeleton />}>
                <NotFound />
              </Suspense>
            )}

            <Suspense fallback={null}>
              <EnquiryModal
                isOpen={isEnquiryOpen}
                onClose={() => setIsEnquiryOpen(false)}
                productName={enquiryProduct}
              />
              <CartDrawer onCheckout={() => setIsCheckoutOpen(true)} />
              <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
            </Suspense>
          </motion.div>

      </div>
      </AuthProvider>
    </ThemeProvider>
  );
}
