import { useState, ChangeEvent, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Phone, Mail, MapPin, Send, MessageSquare, CheckCircle, Sparkles, AlertCircle } from "lucide-react";
import { businessConfig } from "../config/business";
import { trackEvent, trackSocialClick } from "../utils/analytics";

const socialChannels = [
  {
    name: "Google Business Profile",
    label: "📍 Google Business Profile",
    desc: "Rate our speed, read reviews, or see verified neighborhood photos.",
    action: "Visit Store Page",
    href: "https://maps.google.com/?q=QuickDrop+Salt+Lake+Kolkata",
    accentColor: "#4285F4",
    hoverBg: "hover:bg-[#4285F4]/5 hover:border-[#4285F4]/30",
    icon: (
      <svg className="w-7 h-7 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.9 10.4C21.9 10 21.9 9.5 21.8 9.1H12V13.1H17.5C17.3 14.2 16.6 15.2 15.6 15.8V18.4H19.3C21.4 16.4 22.7 13.5 21.9 10.4Z" fill="#4285F4"/>
        <path d="M12 20.5C14.8 20.5 17.2 19.5 18.9 17.9L15.6 15.3C14.7 15.9 13.5 16.3 12 16.3C9.3 16.3 7 14.4 6.2 11.9H2.4V14.8C4.1 18.2 7.8 20.5 12 20.5Z" fill="#34A853"/>
        <path d="M6.2 11.9C6 11.3 5.9 10.7 5.9 10C5.9 9.3 6 8.7 6.2 8.1V5.2H2.4C1.6 6.7 1.1 8.3 1.1 10C1.1 11.7 1.6 13.3 2.4 14.8L6.2 11.9Z" fill="#FBBC05"/>
        <path d="M12 3.7C13.5 3.7 14.9 4.2 16 5.2L18.9 2.3C17.1 0.9 14.7 0 12 0C7.8 0 4.1 2.3 2.4 5.7L6.2 8.6C7 6.1 9.3 3.7 12 3.7Z" fill="#EA4335"/>
      </svg>
    )
  },
  {
    name: "WhatsApp Business",
    label: "💬 WhatsApp Business",
    desc: "Connect with our dispatch desk for fast order catalog support.",
    action: "Start Chatting",
    href: `https://wa.me/${businessConfig.contact.whatsapp}`,
    accentColor: "#25D366",
    hoverBg: "hover:bg-[#25D366]/5 hover:border-[#25D366]/30",
    icon: (
      <svg className="w-7 h-7 text-[#25D366] fill-current shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.031 0C5.437 0 .1 5.337.098 11.93a11.87 11.87 0 001.584 5.955L0 24l6.335-1.662a11.85 11.85 0 005.7 1.455h.004c6.594 0 11.93-5.337 11.933-11.93A11.93 11.93 0 0012.03 0zm5.441 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
      </svg>
    )
  },
  {
    name: "Facebook Business Page",
    label: "📘 Facebook",
    desc: "Follow our social wall for local community updates and promos.",
    action: "Follow Page",
    href: "https://facebook.com/quickdrop.delivery",
    accentColor: "#1877F2",
    hoverBg: "hover:bg-[#1877F2]/5 hover:border-[#1877F2]/30",
    icon: (
      <svg className="w-7 h-7 text-[#1877F2] fill-current shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    )
  },
  {
    name: "Instagram Business",
    label: "📷 Instagram",
    desc: "Watch active delivery reels and fresh store arrivals daily.",
    action: "View Stories",
    href: "https://instagram.com/quickdrop.delivery",
    accentColor: "#E1306C",
    hoverBg: "hover:bg-gradient-to-tr hover:from-[#f9ce34]/5 hover:via-[#ee2a7b]/5 hover:to-[#6228d7]/5 hover:border-[#e1306c]/30",
    icon: (
      <svg className="w-7 h-7 text-[#E1306C] stroke-current shrink-0" viewBox="0 0 24 24" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    )
  }
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lastSubmittedData, setLastSubmittedData] = useState<typeof formData | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Character limit protection for message field
    if (name === "message" && value.length > 500) return;

    setFormData((prev) => ({ ...prev, [name]: value }));

    // Real-time error clearing
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // 1. Name Check
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required.";
    }

    // 2. Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    // 3. Indian Mobile Validation
    // Clean spaces, dashes, +91, 0, etc.
    const rawPhone = formData.phone.replace(/[\s\-+()]/g, "");
    let corePhone = rawPhone;
    if (rawPhone.startsWith("91") && rawPhone.length === 12) {
      corePhone = rawPhone.slice(2);
    } else if (rawPhone.startsWith("0") && rawPhone.length === 11) {
      corePhone = rawPhone.slice(1);
    }

    const indianMobileRegex = /^[6-9]\d{9}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "Mobile number is required.";
    } else if (!indianMobileRegex.test(corePhone)) {
      newErrors.phone = "Please enter a valid 10-digit Indian mobile number.";
    }

    // 4. Subject Check
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required.";
    }

    // 5. Message Check
    if (!formData.message.trim()) {
      newErrors.message = "Message text is required.";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate reliable API / email dispatch latency
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setLastSubmittedData({ ...formData });

      // Generate pre-filled WhatsApp click-to-chat message
      const templateMessage = `Hello QuickDrop Team 👋

My Name: ${formData.name.trim()}

Mobile Number: ${formData.phone.trim()}

I would like to enquire about your delivery service.

My Requirement:
${formData.subject.trim()} - ${formData.message.trim()}

---

Preferred Delivery Location:
Kolkata, West Bengal

---

Please contact me at your earliest convenience.

Thank you.`;

      // Open official WhatsApp Click-to-chat in a new tab
      const encodedMessage = encodeURIComponent(templateMessage);
      const whatsappUrl = `https://wa.me/${businessConfig.contact.whatsapp}?text=${encodedMessage}`;
      
      trackEvent("contact_form_submit", "engagement", "WhatsApp Contact Submit");
      
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");

      // Reset Form fields
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
    }, 1500);
  };

  const handleSendEmailAlternative = () => {
    if (!lastSubmittedData) return;

    const subjectText = `QuickDrop Enquiry: ${lastSubmittedData.subject}`;
    const bodyText = `Hello QuickDrop Team 👋

My Name: ${lastSubmittedData.name}

Mobile Number: ${lastSubmittedData.phone}

I would like to enquire about your delivery service.

My Requirement:
${lastSubmittedData.subject} - ${lastSubmittedData.message}

Please contact me at your earliest convenience.

Thank you.`;

    const mailtoUrl = `mailto:${businessConfig.contact.email}?subject=${encodeURIComponent(subjectText)}&body=${encodeURIComponent(bodyText)}`;
    
    trackEvent("contact_email_alternative", "engagement", "Email Alternative Click");
    
    window.location.href = mailtoUrl;
  };

  return (
    <section
      id="contact"
      className="py-24 px-6 md:px-12 relative overflow-hidden bg-background"
    >
      {/* Decorative ambient background drops */}
      <div className="absolute top-[20%] left-[-10%] w-[450px] aspect-square rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[350px] aspect-square rounded-full bg-brand-cyan/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-3.5 py-1 rounded-full bg-primary/10 text-[11px] font-mono tracking-widest font-bold uppercase text-primary inline-flex items-center gap-1.5 mb-4"
          >
            <span>Get In Touch</span>
          </motion.div>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-on-surface tracking-tight">
            Connect With QuickDrop
          </h2>
          <p className="mt-4 text-sm md:text-base text-on-surface-variant leading-relaxed">
            Have questions about franchising, vendor partnerships, or feedback? Send us a message or dial directly.
          </p>
        </div>

        {/* Material Design 3 Frosted Glass Social Channels Grid (Desktop & Tablet) */}
        <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 relative z-10">
          {socialChannels.map((chan, idx) => (
            <motion.a
              key={chan.name}
              href={chan.href}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackSocialClick(chan.name)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`p-6 rounded-3xl glass-card border border-white/60 bg-surface/30 backdrop-blur-md shadow-sm transition-all duration-300 flex flex-col justify-between text-left ${chan.hoverBg}`}
              style={{
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.03)",
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-surface/80 shadow-inner flex items-center justify-center">
                    {chan.icon}
                  </div>
                  <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                    Official
                  </span>
                </div>
                <h3 className="font-display font-black text-sm text-on-surface tracking-tight mb-2">
                  {chan.label}
                </h3>
                <p className="text-xs text-on-surface-variant leading-relaxed mb-6">
                  {chan.desc}
                </p>
              </div>
              
              <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-primary group">
                <span>{chan.action}</span>
                <span className="material-symbols-rounded text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Mobile Optimized Horizontal Row with Large Touch Targets (Minimum 48x48dp) */}
        <div className="flex md:hidden flex-col items-center gap-3.5 mb-14 relative z-10">
          <span className="text-xs font-mono font-bold tracking-widest text-on-surface-variant uppercase text-center px-4">
            Connect via our official networks
          </span>
          <div className="flex items-center justify-center gap-6 p-4 bg-surface/40 backdrop-blur-md rounded-2xl border border-white/60 shadow-sm w-full max-w-xs mx-auto">
            {socialChannels.map((chan) => (
              <motion.a
                key={chan.name}
                href={chan.href}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackSocialClick(chan.name)}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 rounded-full bg-surface/95 shadow-sm border border-outline flex items-center justify-center transition-all hover:scale-105"
                aria-label={chan.name}
                style={{
                  minWidth: "48px",
                  minHeight: "48px"
                }}
              >
                {chan.icon}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Contact Split Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Block: Communication Cards & Stylized SVG Vector Map */}
          <div className="lg:col-span-5 flex flex-col gap-6 justify-between text-left">
            <div className="flex flex-col gap-4">
              
              {/* Phone card */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="p-5 rounded-2xl bg-surface border border-outline flex items-center gap-4 shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="font-display font-bold text-xs text-on-surface-variant uppercase tracking-widest">Phone Support</h4>
                  <a href={`tel:${businessConfig.contact.phone}`} onClick={() => trackEvent("contact_phone_click", "engagement", "Phone Click")} className="text-base font-extrabold text-on-surface hover:text-primary transition-colors mt-0.5 block">
                    {businessConfig.contact.phone}
                  </a>
                </div>
              </motion.div>

              {/* WhatsApp card */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="p-5 rounded-2xl bg-surface border border-outline flex items-center gap-4 shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <h4 className="font-display font-bold text-xs text-on-surface-variant uppercase tracking-widest">WhatsApp Dispatch</h4>
                  <a href={`https://wa.me/${businessConfig.contact.whatsapp}`} onClick={() => trackEvent("contact_whatsapp_click", "engagement", "WhatsApp Click")} target="_blank" rel="noreferrer" className="text-base font-extrabold text-on-surface hover:text-primary transition-colors mt-0.5 block">
                    {businessConfig.contact.whatsapp}
                  </a>
                </div>
              </motion.div>

              {/* Email card */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="p-5 rounded-2xl bg-surface border border-outline flex items-center gap-4 shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-cyan/10 text-brand-cyan flex items-center justify-center shrink-0">
                  <Mail size={20} className="text-brand-cyan" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-xs text-on-surface-variant uppercase tracking-widest">Email Relations</h4>
                  <a href={`mailto:${businessConfig.contact.email}`} onClick={() => trackEvent("contact_email_click", "engagement", "Email Click")} className="text-base font-extrabold text-on-surface hover:text-primary transition-colors mt-0.5 block">
                    {businessConfig.contact.email}
                  </a>
                </div>
              </motion.div>

              {/* HQ Address Card */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="p-5 rounded-2xl bg-surface border border-outline flex items-center gap-4 shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
                  <MapPin size={20} className="text-amber-600" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-xs text-on-surface-variant uppercase tracking-widest">Headquarters</h4>
                  <a href={businessConfig.contact.googleMapsUrl} target="_blank" rel="noreferrer" className="text-sm font-extrabold text-on-surface hover:text-primary transition-colors mt-0.5 block">
                    {businessConfig.contact.address.street}, {businessConfig.contact.address.po}, {businessConfig.contact.address.district}
                  </a>
                </div>
              </motion.div>

              {/* Support Schedule card */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="p-5 rounded-2xl bg-surface border border-outline flex items-center gap-4 shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-display font-bold text-xs text-on-surface-variant uppercase tracking-widest">Business Hours</h4>
                  <p className="text-sm font-extrabold text-on-surface mt-0.5">
                    {businessConfig.hours.days}, {businessConfig.hours.openTime} – {businessConfig.hours.closeTime}
                  </p>
                </div>
              </motion.div>

              {/* Delivery Info Card */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="p-5 rounded-2xl bg-gradient-to-br from-white to-brand-primary/5 border border-outline flex flex-col gap-3 shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-rounded text-lg text-primary">local_shipping</span>
                  <h4 className="font-display font-bold text-xs text-on-surface-variant uppercase tracking-widest">Delivery Coverage</h4>
                </div>
                <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                   <div className="flex flex-col">
                     <span className="text-[10px] text-on-surface-variant uppercase font-bold">Currently Serving</span>
                     <span className="text-sm font-extrabold text-on-surface">Nischintapur</span>
                   </div>
                   <div className="flex flex-col">
                     <span className="text-[10px] text-on-surface-variant uppercase font-bold">Coverage Area</span>
                     <span className="text-sm font-extrabold text-on-surface">Within {businessConfig.delivery.radiusKm} KM Radius</span>
                   </div>
                   <div className="flex flex-col">
                     <span className="text-[10px] text-on-surface-variant uppercase font-bold">Avg. Delivery</span>
                     <span className="text-sm font-extrabold text-on-surface">{businessConfig.delivery.averageTimeMins} Minutes</span>
                   </div>
                   <div className="flex flex-col">
                     <span className="text-[10px] text-on-surface-variant uppercase font-bold">Delivery Charge</span>
                     <span className="text-sm font-extrabold text-on-surface">₹{businessConfig.delivery.charge}</span>
                   </div>
                </div>
                <div className="mt-2 pt-2 border-t border-brand-primary/10 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-primary">🚀 Expanding Soon</span>
                  <span className="text-[9px] text-on-surface-variant">Stay connected for future updates.</span>
                </div>
              </motion.div>

            </div>

            {/* Premium, Stylized Google Maps Placeholder SVG Vector */}
            <div className="rounded-3xl border border-white/80 overflow-hidden shadow-md aspect-video relative bg-surface-variant flex items-center justify-center select-none">
              
              {/* Custom SVG Grid & Streets drawing representing a premium map */}
              <svg className="absolute inset-0 w-full h-full opacity-60" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M 0,20 L 400,180" stroke="#cbd5e1" strokeWidth="6" />
                <path d="M 0,150 L 400,20" stroke="#cbd5e1" strokeWidth="8" />
                <path d="M 120,0 L 220,200" stroke="#cbd5e1" strokeWidth="10" />
                <path d="M 320,0 L 280,200" stroke="#cbd5e1" strokeWidth="5" />
                <circle cx="180" cy="110" r="45" fill="#3b82f6" fillOpacity="0.1" />
                <circle cx="180" cy="110" r="20" fill="#3b82f6" fillOpacity="0.15" />
              </svg>

              {/* Glowing Pin Vector */}
              <div className="absolute top-[110px] left-[180px] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                {/* Ping waves */}
                <span className="absolute w-12 h-12 bg-primary/30 rounded-full animate-ping pointer-events-none" />
                <div className="w-10 h-10 rounded-full bg-primary border-2 border-white flex items-center justify-center text-on-primary shadow-lg relative z-10 animate-bounce">
                  <MapPin size={18} />
                </div>
                <div className="bg-on-surface text-on-primary text-[9px] font-mono font-bold px-2 py-0.5 rounded-md shadow-sm uppercase tracking-widest mt-1.5 relative z-10">
                  QuickDrop HQ
                </div>
              </div>

              {/* Watermark/Footer tag */}
              <span className="absolute bottom-3 right-3 text-[9px] font-mono text-on-surface/40 tracking-wider uppercase">
                STYLIZED LOCAL BOUNDS • GOOGLE MAPS ACTIVE
              </span>
            </div>
          </div>

          {/* Right Block: Glassmorphic Message Form */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="glass-card border-white/70 rounded-[32px] p-8 md:p-10 text-left shadow-lg h-full flex flex-col justify-between"
            >
              <div>
                <h3 className="font-display font-extrabold text-2xl text-on-surface flex items-center gap-1.5">
                  <Sparkles size={20} className="text-brand-cyan" /> Send A Message
                </h3>
                <p className="text-sm text-on-surface-variant mt-2 mb-8">
                  Fill in your details. On submit, we'll compile your message for direct WhatsApp dispatch, with a default email client fallback option.
                </p>

                <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
                  {/* Name field */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono font-bold uppercase text-on-surface-variant tracking-wider">
                      Your Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Aman Sen"
                      className={`px-5 py-3.5 rounded-xl border bg-surface/40 outline-none text-sm text-on-surface font-medium transition-all ${
                        errors.name ? "border-red-500 bg-red-50/10 focus:border-red-500" : "border-outline focus:border-brand-primary"
                      }`}
                      id="contact-name-input"
                    />
                    {errors.name && (
                      <span className="text-[10px] text-red-500 font-mono flex items-center gap-1 mt-1">
                        <AlertCircle size={10} /> {errors.name}
                      </span>
                    )}
                  </div>

                  {/* Email & Phone columns */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Email field */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-mono font-bold uppercase text-on-surface-variant tracking-wider">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="e.g. aman@gmail.com"
                        className={`px-5 py-3.5 rounded-xl border bg-surface/40 outline-none text-sm text-on-surface font-medium transition-all ${
                          errors.email ? "border-red-500 bg-red-50/10 focus:border-red-500" : "border-outline focus:border-brand-primary"
                        }`}
                        id="contact-email-input"
                      />
                      {errors.email && (
                        <span className="text-[10px] text-red-500 font-mono flex items-center gap-1 mt-1">
                          <AlertCircle size={10} /> {errors.email}
                        </span>
                      )}
                    </div>

                    {/* Phone field */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-mono font-bold uppercase text-on-surface-variant tracking-wider">
                        Indian Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        required
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="e.g. 98300 12345"
                        className={`px-5 py-3.5 rounded-xl border bg-surface/40 outline-none text-sm text-on-surface font-medium transition-all ${
                          errors.phone ? "border-red-500 bg-red-50/10 focus:border-red-500" : "border-outline focus:border-brand-primary"
                        }`}
                        id="contact-phone-input"
                      />
                      {errors.phone && (
                        <span className="text-[10px] text-red-500 font-mono flex items-center gap-1 mt-1">
                          <AlertCircle size={10} /> {errors.phone}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Subject field */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono font-bold uppercase text-on-surface-variant tracking-wider">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="e.g. Vendor onboarding request"
                      className={`px-5 py-3.5 rounded-xl border bg-surface/40 outline-none text-sm text-on-surface font-medium transition-all ${
                        errors.subject ? "border-red-500 bg-red-50/10 focus:border-red-500" : "border-outline focus:border-brand-primary"
                      }`}
                      id="contact-subject-input"
                    />
                    {errors.subject && (
                      <span className="text-[10px] text-red-500 font-mono flex items-center gap-1 mt-1">
                        <AlertCircle size={10} /> {errors.subject}
                      </span>
                    )}
                  </div>

                  {/* Message field */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-mono font-bold uppercase text-on-surface-variant tracking-wider">
                        Detailed Message <span className="text-red-500">*</span>
                      </label>
                      <span className="text-[9px] font-mono text-on-surface/40 font-bold">
                        {formData.message.length} / 500
                      </span>
                    </div>
                    <textarea
                      required
                      rows={4}
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Write your partnership request, vendor suggestion, or general feedback here..."
                      className={`px-5 py-3.5 rounded-xl border bg-surface/40 outline-none text-sm text-on-surface font-medium transition-all resize-none ${
                        errors.message ? "border-red-500 bg-red-50/10 focus:border-red-500" : "border-outline focus:border-brand-primary"
                      }`}
                      id="contact-message-input"
                    />
                    {errors.message && (
                      <span className="text-[10px] text-red-500 font-mono flex items-center gap-1 mt-1">
                        <AlertCircle size={10} /> {errors.message}
                      </span>
                    )}
                  </div>

                  {/* Status Indicator popup inside layout */}
                  <AnimatePresence>
                    {isSubmitted && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 flex flex-col gap-3 text-emerald-800"
                      >
                        <div className="flex items-center gap-3">
                          <CheckCircle size={20} className="text-emerald-500 shrink-0" />
                          <div className="text-left">
                            <p className="text-xs font-bold">Details Compiled & Dispatched to WhatsApp!</p>
                            <p className="text-[11px] opacity-90">If the chat window didn't open, please click to re-dispatch or select our email option below.</p>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-1">
                          <button
                            type="button"
                            onClick={handleSendEmailAlternative}
                            className="text-[10px] font-mono font-bold uppercase tracking-wider text-primary bg-primary/10 hover:bg-primary/20 px-3 py-1.5 rounded-lg border border-brand-primary/20 transition-all cursor-pointer"
                          >
                            ✉ Send via Email Client Instead
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit Button */}
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-2 w-full py-4 rounded-2xl bg-gradient-to-r from-brand-primary to-brand-gradient-end text-on-primary text-xs font-extrabold uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer select-none"
                    id="contact-submit-button"
                  >
                    {isSubmitting ? (
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send size={14} />
                        <span>Dispatch to WhatsApp</span>
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
