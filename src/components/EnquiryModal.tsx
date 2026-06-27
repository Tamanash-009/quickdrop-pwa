import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { businessConfig } from "../config/business";
import { trackWhatsAppClick } from "../utils/analytics";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
}

interface CustomerDetails {
  fullName: string;
  mobileNumber: string;
  address: string;
  landmark: string;
}

export default function EnquiryModal({ isOpen, onClose, productName }: EnquiryModalProps) {
  const [fullName, setFullName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [requirements, setRequirements] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // Validation & Error States
  const [errors, setErrors] = useState({
    fullName: "",
    mobileNumber: "",
    address: ""
  });

  // Smart Context States
  const [city, setCity] = useState<string | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  // Focus trap ref
  const modalRef = useRef<HTMLDivElement>(null);

  // Load saved details if they exists & consent is active
  useEffect(() => {
    if (isOpen) {
      const consent = localStorage.getItem("quickdrop_remember_consent") === "true";
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRememberMe(consent);

      if (consent) {
        const savedData = localStorage.getItem("quickdrop_customer_info");
        if (savedData) {
          try {
            const parsed: CustomerDetails = JSON.parse(savedData);
            setFullName(parsed.fullName || "");
            setMobileNumber(parsed.mobileNumber || "");
            setAddress(parsed.address || "");
            setLandmark(parsed.landmark || "");
          } catch (e) {
            console.error("Error reading saved customer info", e);
          }
        }
      } else {
        // Clear inputs if remember consent is false to protect privacy
        setFullName("");
        setMobileNumber("");
        setAddress("");
        setLandmark("");
      }
      setRequirements("");
      setErrors({ fullName: "", mobileNumber: "", address: "" });
    }
  }, [isOpen]);

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      // Auto focus modal container for screen readers
      setTimeout(() => {
        modalRef.current?.focus();
      }, 100);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Auto-detect city via Geolocation API + Free Reverse Geocoding
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );
          if (response.ok) {
            const data = await response.json();
            const detectedCity = data.city || data.locality || data.principalSubdivision || "Kolkata";
            setCity(detectedCity);
          } else {
            setCity("Kolkata (Salt Lake)");
          }
        } catch (err) {
          console.error("Error reverse-geocoding coordinate:", err);
          setCity("Salt Lake Sector V");
        } finally {
          setIsLocating(false);
        }
      },
      (error) => {
        console.warn("Location permission denied or unavailable:", error);
        setIsLocating(false);
      },
      { timeout: 8000 }
    );
  };

  // Immediate validation handler
  const validateField = (field: "fullName" | "mobileNumber" | "address", val: string) => {
    let err = "";
    if (field === "fullName") {
      if (!val.trim()) {
        err = "Full name is required";
      } else if (val.trim().length < 2) {
        err = "Name must be at least 2 characters long";
      }
    } else if (field === "mobileNumber") {
      // Validate Indian mobile number (optional +91 or 0 prefix, followed by 10 digits starting with 6-9)
      const cleaned = val.replace(/\s+/g, "");
      const phoneRegex = /^(?:\+91|0)?[6-9]\d{9}$/;
      if (!cleaned) {
        err = "Mobile number is required";
      } else if (!phoneRegex.test(cleaned)) {
        err = "Enter a valid 10-digit Indian mobile number";
      }
    } else if (field === "address") {
      if (!val.trim()) {
        err = "Delivery address is required";
      } else if (val.trim().length < 10) {
        err = "Please enter a detailed address (min 10 characters)";
      }
    }

    setErrors(prev => ({ ...prev, [field]: err }));
    return !err;
  };

  const isFormValid =
    fullName.trim().length >= 2 &&
    /^(?:\+91|0)?[6-9]\d{9}$/.test(mobileNumber.replace(/\s+/g, "")) &&
    address.trim().length >= 10 &&
    !errors.fullName &&
    !errors.mobileNumber &&
    !errors.address;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Final checks
    const v1 = validateField("fullName", fullName);
    const v2 = validateField("mobileNumber", mobileNumber);
    const v3 = validateField("address", address);

    if (!v1 || !v2 || !v3 || !isFormValid) return;

    // Secure persistence with explicit consent
    if (rememberMe) {
      localStorage.setItem("quickdrop_remember_consent", "true");
      const dataToSave: CustomerDetails = {
        fullName: fullName.trim(),
        mobileNumber: mobileNumber.trim(),
        address: address.trim(),
        landmark: landmark.trim()
      };
      localStorage.setItem("quickdrop_customer_info", JSON.stringify(dataToSave));
    } else {
      localStorage.removeItem("quickdrop_remember_consent");
      localStorage.removeItem("quickdrop_customer_info");
    }

    // Capture dynamic meta information
    const formattedDate = new Date().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
    const formattedTime = new Date().toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });
    const browserLang = navigator.language || "en-US";
    const detectedCityContext = city ? `\nDetected City: ${city}` : "";

    // Generate beautifully formatted WhatsApp message
    const message = `Hello QuickDrop Team 👋

I would like to enquire about your delivery service.

━━━━━━━━━━━━━━━━━━

Product / Service

${productName}

━━━━━━━━━━━━━━━━━━

Customer Details

Name:
${fullName.trim()}

Mobile:
${mobileNumber.trim()}

Delivery Address:
${address.trim()}

Landmark:
${landmark.trim() || "None"}

Additional Requirements:
${requirements.trim() || "None"}

━━━━━━━━━━━━━━━━━━

Please let me know:

• Availability
• Price
• Estimated Delivery Time

━━━━━━━━━━━━━━━━━━
Smart Metadata:
Date: ${formattedDate}
Time: ${formattedTime}
Language: ${browserLang}${detectedCityContext}

Thank you.`;

    // Click-to-Chat URL
    const targetPhone = businessConfig.contact.whatsapp;
    const encodedMsg = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${targetPhone}?text=${encodedMsg}`;

    // Track the analytics event
    trackWhatsAppClick(productName);

    // Open instantly
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-x-hidden overflow-y-auto">
          {/* Backdrop Blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-dark/40 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Card / Bottom Sheet on Mobile */}
          <motion.div
            ref={modalRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            initial={{ y: "100%", opacity: 0.8 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0.8 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="relative w-full sm:max-w-xl bg-white/95 backdrop-blur-xl border border-white/60 shadow-2xl rounded-t-[28px] sm:rounded-[28px] overflow-hidden flex flex-col pointer-events-auto max-h-[92vh] sm:max-h-[85vh] focus:outline-none"
          >
            {/* Top Indicator handle bar for mobile sheets */}
            <div className="flex justify-center pt-3 pb-1 sm:hidden">
              <div className="w-12 h-1.5 rounded-full bg-brand-dark/15" />
            </div>

            {/* Header section with Material design elements */}
            <div className="px-6 pt-4 pb-4 border-b border-brand-dark/5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-primary/10 to-brand-cyan/10 text-brand-primary flex items-center justify-center">
                  <span className="material-symbols-rounded text-lg font-bold">chat</span>
                </div>
                <div className="text-left">
                  <h3 id="modal-title" className="font-display font-extrabold text-lg text-brand-dark tracking-tight leading-tight">
                    Quick Enquiry Setup
                  </h3>
                  <p className="text-[10px] text-brand-dark/50 font-mono tracking-widest uppercase mt-0.5">
                    No checkout hassle • Instant WhatsApp
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="w-8 h-8 rounded-full hover:bg-brand-dark/5 flex items-center justify-center text-brand-dark/60 transition-colors focus:ring-2 focus:ring-brand-primary/20 outline-none"
              >
                <span className="material-symbols-rounded text-xl">close</span>
              </button>
            </div>

            {/* Form Fields body (Scrollable, keyboard-safe) */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-5 space-y-5 text-left">
              {/* Product Info Display (Read Only Block) */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-brand-primary/5 to-brand-cyan/5 border border-brand-primary/10">
                <span className="text-[10px] font-mono font-bold text-brand-primary tracking-widest uppercase block mb-1">
                  Selected Item For Enquiry
                </span>
                <div className="flex items-center justify-between">
                  <h4 className="font-display font-extrabold text-base text-brand-dark">
                    {productName}
                  </h4>
                  <div className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 text-[9px] font-bold tracking-wider flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    <span>AVAILABLE TODAY</span>
                  </div>
                </div>
              </div>

              {/* Full Name input */}
              <div className="space-y-1.5">
                <label htmlFor="fullName" className="block text-xs font-bold text-brand-dark uppercase tracking-wider">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  placeholder="Enter your first and last name"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    validateField("fullName", e.target.value);
                  }}
                  onBlur={(e) => validateField("fullName", e.target.value)}
                  className={`w-full px-4 py-3 rounded-2xl bg-white border outline-none text-sm text-brand-dark transition-all ${
                    errors.fullName
                      ? "border-red-500 focus:ring-4 focus:ring-red-100"
                      : "border-brand-dark/15 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10"
                  }`}
                  required
                />
                {errors.fullName && (
                  <p className="text-[11px] text-red-500 font-medium flex items-center gap-1">
                    <span className="material-symbols-rounded text-xs">error</span> {errors.fullName}
                  </p>
                )}
              </div>

              {/* Mobile Number input with country indicator */}
              <div className="space-y-1.5">
                <label htmlFor="mobileNumber" className="block text-xs font-bold text-brand-dark uppercase tracking-wider">
                  Indian Mobile Number <span className="text-red-500">*</span>
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-sm font-bold text-brand-dark/40 select-none">+91</span>
                  <input
                    type="tel"
                    id="mobileNumber"
                    placeholder="98765 43210"
                    value={mobileNumber}
                    onChange={(e) => {
                      setMobileNumber(e.target.value);
                      validateField("mobileNumber", e.target.value);
                    }}
                    onBlur={(e) => validateField("mobileNumber", e.target.value)}
                    className={`w-full pl-12 pr-4 py-3 rounded-2xl bg-white border outline-none text-sm text-brand-dark transition-all ${
                      errors.mobileNumber
                        ? "border-red-500 focus:ring-4 focus:ring-red-100"
                        : "border-brand-dark/15 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10"
                    }`}
                    required
                  />
                </div>
                {errors.mobileNumber && (
                  <p className="text-[11px] text-red-500 font-medium flex items-center gap-1">
                    <span className="material-symbols-rounded text-xs">error</span> {errors.mobileNumber}
                  </p>
                )}
              </div>

              {/* Delivery Address input with dynamic Reverse Location trigger */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="address" className="block text-xs font-bold text-brand-dark uppercase tracking-wider">
                    Delivery Address <span className="text-red-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleDetectLocation}
                    disabled={isLocating}
                    className="text-[10px] font-mono font-bold text-brand-primary flex items-center gap-1 hover:text-brand-cyan transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    <span className="material-symbols-rounded text-xs">my_location</span>
                    <span>{isLocating ? "Locating..." : "Auto Detect City"}</span>
                  </button>
                </div>
                <textarea
                  id="address"
                  rows={2}
                  placeholder="Street name, flat/house no, block/sector, Salt Lake..."
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    validateField("address", e.target.value);
                  }}
                  onBlur={(e) => validateField("address", e.target.value)}
                  className={`w-full px-4 py-3 rounded-2xl bg-white border outline-none text-sm text-brand-dark transition-all resize-none ${
                    errors.address
                      ? "border-red-500 focus:ring-4 focus:ring-red-100"
                      : "border-brand-dark/15 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10"
                  }`}
                  required
                />
                {errors.address && (
                  <p className="text-[11px] text-red-500 font-medium flex items-center gap-1">
                    <span className="material-symbols-rounded text-xs">error</span> {errors.address}
                  </p>
                )}
                {city && (
                  <p className="text-[10px] text-emerald-600 font-bold flex items-center gap-1 mt-1">
                    <span className="material-symbols-rounded text-xs font-fill">verified</span>
                    <span>Enquiry routed via: {city} Zone</span>
                  </p>
                )}
              </div>

              {/* Landmark input */}
              <div className="space-y-1.5">
                <label htmlFor="landmark" className="block text-xs font-bold text-brand-dark uppercase tracking-wider">
                  Landmark <span className="text-brand-dark/30 font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  id="landmark"
                  placeholder="e.g. Near City Centre Mall, Axis Bank"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-white border border-brand-dark/15 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 outline-none text-sm text-brand-dark transition-all"
                />
              </div>

              {/* Additional Requirements text field */}
              <div className="space-y-1.5">
                <label htmlFor="requirements" className="block text-xs font-bold text-brand-dark uppercase tracking-wider">
                  Additional Requirements <span className="text-brand-dark/30 font-normal">(Optional)</span>
                </label>
                <textarea
                  id="requirements"
                  rows={2}
                  placeholder="e.g. Extra spicy, double eggs, deliver before 7 PM..."
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-white border border-brand-dark/15 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 outline-none text-sm text-brand-dark transition-all resize-none"
                />
              </div>

              {/* Consent check item */}
              <div className="pt-2 flex items-start gap-3 select-none">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-brand-dark/15 text-brand-primary focus:ring-brand-primary cursor-pointer"
                  />
                </div>
                <label htmlFor="rememberMe" className="text-xs text-brand-dark/70 font-medium cursor-pointer leading-tight">
                  Remember my details on this device for faster enquiries on future visits.
                </label>
              </div>

              {/* CTA button row inside scrolling container to stay aligned */}
              <div className="pt-4 pb-2 border-t border-brand-dark/5 flex gap-3 items-center">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-4 rounded-[20px] bg-slate-100 hover:bg-slate-200 text-brand-dark font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={!isFormValid}
                  className={`flex-[2] py-4 rounded-[20px] font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-white cursor-pointer ${
                    isFormValid
                      ? "bg-gradient-to-r from-brand-primary to-brand-gradient-end"
                      : "bg-slate-300 border-slate-300 text-white/70 cursor-not-allowed shadow-none"
                  }`}
                >
                  <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.454L0 24zm6.59-4.846c1.6.95 3.16 1.449 4.825 1.451 5.436 0 9.859-4.407 9.862-9.83.001-2.628-1.02-5.1-2.871-6.954C16.586 1.968 14.12.94 11.488.94 6.054.94 1.631 5.348 1.628 10.771c0 1.705.452 3.237 1.411 4.789L2.03 21.07l5.617-1.472z" />
                  </svg>
                  <span>Send via WhatsApp</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
