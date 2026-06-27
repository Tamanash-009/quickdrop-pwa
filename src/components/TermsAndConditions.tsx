import { useEffect } from "react";
import { ArrowLeft, Scale, Clock } from "lucide-react";
import { businessConfig } from "../config/business";
import Logo from "./Logo";

interface TermsAndConditionsProps {
  onNavigateHome: () => void;
}

export default function TermsAndConditions({ onNavigateHome }: TermsAndConditionsProps) {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-brand-light text-brand-dark flex flex-col pt-24 pb-16 px-6 md:px-12 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-[10%] left-[-15%] w-[500px] aspect-square rounded-full bg-brand-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-15%] w-[400px] aspect-square rounded-full bg-brand-cyan/5 blur-[100px] pointer-events-none" />

      {/* Top Header Navigation bar inside document */}
      <div className="max-w-4xl mx-auto w-full z-10 mb-8 flex items-center justify-between">
        <button
          type="button"
          onClick={onNavigateHome}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-brand-dark/10 bg-white/50 backdrop-blur-md hover:border-brand-primary hover:text-brand-primary transition-all text-xs font-bold uppercase tracking-wider cursor-pointer"
        >
          <ArrowLeft size={14} />
          <span>Back to Home</span>
        </button>
        <Logo className="h-9" />
      </div>

      <main className="max-w-4xl mx-auto w-full z-10">
        <div className="glass-card border-white/80 rounded-[32px] p-8 md:p-12 shadow-xl text-left">
          {/* Title */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-brand-dark/5 pb-8 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-brand-cyan/10 text-brand-cyan flex items-center justify-center shrink-0">
                <Scale size={28} className="text-brand-primary" />
              </div>
              <div>
                <h1 className="font-display font-extrabold text-3xl md:text-4xl text-brand-dark tracking-tight">
                  Terms & Conditions
                </h1>
                <p className="text-xs font-mono font-bold uppercase tracking-wider text-brand-dark/40 mt-1">
                  Agreement For Services And Local Deliveries
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-primary/10 text-brand-dark/70 text-xs font-mono font-bold shrink-0">
              <Clock size={12} className="text-brand-primary animate-pulse" />
              <span>Last Updated: June 2026</span>
            </div>
          </div>

          <p className="text-sm md:text-base text-brand-dark/80 leading-relaxed mb-8">
            Welcome to QuickDrop! These Terms & Conditions outline the rules, obligations, and legal guidelines governing your utilization of QuickDrop's delivery interfaces, mobile workflows, inventory shopping baskets, and live satellite dispatch tracking systems.
          </p>

          <div className="flex flex-col gap-8">
            {/* 1. Service Eligibility */}
            <section className="flex flex-col gap-3">
              <h2 className="font-display font-bold text-lg md:text-xl text-brand-dark flex items-center gap-2">
                <span className="w-1.5 h-6 bg-brand-primary rounded-full inline-block" />
                1. Service Eligibility
              </h2>
              <p className="text-sm text-brand-dark/75 leading-relaxed">
                By entering our site or compiling shopping baskets, you represent that you are at least 18 years of age or possess formal parental or legal guardian consent. Our delivery network is strictly bound to valid geographic delivery zones mapped inside the tracking software.
              </p>
            </section>

            {/* 2. Delivery Terms */}
            <section className="flex flex-col gap-3">
              <h2 className="font-display font-bold text-lg md:text-xl text-brand-dark flex items-center gap-2">
                <span className="w-1.5 h-6 bg-brand-primary rounded-full inline-block" />
                2. Delivery Guidelines & Deadlines
              </h2>
              <p className="text-sm text-brand-dark/75 leading-relaxed">
                QuickDrop targets hyper-speed local dispatching (estimated in under 30 minutes). However, actual transit durations are subject to traffic bottlenecks, extreme monsoons, and vendor preparation delays. Our couriers hold the right to contact clients via mobile calls on arriving at designated drop-off coordinates.
              </p>
            </section>

            {/* 3. Cancellation Policy */}
            <section className="flex flex-col gap-3">
              <h2 className="font-display font-bold text-lg md:text-xl text-brand-dark flex items-center gap-2">
                <span className="w-1.5 h-6 bg-brand-primary rounded-full inline-block" />
                3. Cancellation Policy
              </h2>
              <p className="text-sm text-brand-dark/75 leading-relaxed">
                Orders can be cancelled without penalty within exactly 3 minutes of submitting the basket through our interface. Once the local vendor initiates item packaging or a courier is dispatched to the coordinate point, cancellations are blocked and the customer remains responsible for total payment.
              </p>
            </section>

            {/* 4. Refund Policy */}
            <section className="flex flex-col gap-3">
              <h2 className="font-display font-bold text-lg md:text-xl text-brand-dark flex items-center gap-2">
                <span className="w-1.5 h-6 bg-brand-primary rounded-full inline-block" />
                4. Refund Policy
              </h2>
              <p className="text-sm text-brand-dark/75 leading-relaxed">
                We pride ourselves on delivery care. If your delivered goods arrive damaged, spoiled, or do not match your shopping receipt:
              </p>
              <ul className="list-disc list-inside text-sm text-brand-dark/70 space-y-1.5 pl-2">
                <li>Submit a refund inquiry through the premium Contact Form or WhatsApp dispatch within 2 hours.</li>
                <li>Retain photos of the damaged inventory for verification.</li>
                <li>Verified disputes will trigger a full, painless reimbursement or direct voucher replacement.</li>
              </ul>
            </section>

            {/* 5. Pricing & Product Availability */}
            <section className="flex flex-col gap-3">
              <h2 className="font-display font-bold text-lg md:text-xl text-brand-dark flex items-center gap-2">
                <span className="w-1.5 h-6 bg-brand-primary rounded-full inline-block" />
                5. Pricing & Product Availability
              </h2>
              <p className="text-sm text-brand-dark/75 leading-relaxed">
                All prices detailed on our platform are expressed in Indian Rupees (₹) and include standard vendor commissions. We strive to maintain absolute inventory consistency. However, seasonal crops or localized bakeries may go out of stock dynamically. In such scenarios, dispatch coordinators will prompt you via call/chat for alternative selections.
              </p>
            </section>

            {/* 6. Customer Responsibilities */}
            <section className="flex flex-col gap-3">
              <h2 className="font-display font-bold text-lg md:text-xl text-brand-dark flex items-center gap-2">
                <span className="w-1.5 h-6 bg-brand-primary rounded-full inline-block" />
                6. Customer Responsibilities
              </h2>
              <p className="text-sm text-brand-dark/75 leading-relaxed">
                You agree to provide highly precise delivery addresses (including flat numbers, building gates, and landmarks) and valid Indian contact numbers. If our courier is unable to access the delivery venue or cannot reach you via phone within 10 minutes of arrival, the order will be logged as undeliverable.
              </p>
            </section>

            {/* 7. Limitation of Liability */}
            <section className="flex flex-col gap-3">
              <h2 className="font-display font-bold text-lg md:text-xl text-brand-dark flex items-center gap-2">
                <span className="w-1.5 h-6 bg-brand-primary rounded-full inline-block" />
                7. Limitation of Liability
              </h2>
              <p className="text-sm text-brand-dark/75 leading-relaxed">
                To the maximum extent permitted by applicable law, QuickDrop and its logistics partners shall not be held liable for indirect, incidental, punitive, or consequential damages resulting from delays, food allergen disclosures, or momentary interface network downtimes.
              </p>
            </section>

            {/* 8. Intellectual Property */}
            <section className="flex flex-col gap-3">
              <h2 className="font-display font-bold text-lg md:text-xl text-brand-dark flex items-center gap-2">
                <span className="w-1.5 h-6 bg-brand-primary rounded-full inline-block" />
                8. Intellectual Property & Website Protection
              </h2>
              <p className="text-sm text-brand-dark/75 leading-relaxed">
                All software components, UI layouts, interactive canvas systems, color themes, vector graphics, logos, source code, and custom copy hosted on {businessConfig.name} remain the exclusive property of {businessConfig.name}. By accessing our website, you expressly agree that:
              </p>
              <ul className="list-disc list-inside text-sm text-brand-dark/70 space-y-1.5 pl-2 mt-2">
                <li>Reverse engineering is prohibited.</li>
                <li>Commercial reuse is prohibited.</li>
                <li>Republishing the website design is prohibited.</li>
                <li>Copying the UI/UX is prohibited.</li>
                <li>Copying graphics is prohibited.</li>
                <li>Copying logos is prohibited.</li>
                <li>Copying source code is prohibited.</li>
              </ul>
              <p className="text-sm font-bold text-red-500/90 mt-2">
                Unauthorized commercial use may result in legal action where permitted by applicable law.
              </p>
            </section>

            {/* 9. Account Usage & Security */}
            <section className="flex flex-col gap-3">
              <h2 className="font-display font-bold text-lg md:text-xl text-brand-dark flex items-center gap-2">
                <span className="w-1.5 h-6 bg-brand-primary rounded-full inline-block" />
                9. Account Usage & Security
              </h2>
              <p className="text-sm text-brand-dark/75 leading-relaxed">
                When using persistent states, you are fully accountable for safeguarding your credentials and mobile access flags. Any delivery order initiated under your contact profile is assumed authorized, and you assume full transactional liability.
              </p>
            </section>

            {/* 10. Privacy Reference */}
            <section className="flex flex-col gap-3">
              <h2 className="font-display font-bold text-lg md:text-xl text-brand-dark flex items-center gap-2">
                <span className="w-1.5 h-6 bg-brand-primary rounded-full inline-block" />
                10. Privacy Reference
              </h2>
              <p className="text-sm text-brand-dark/75 leading-relaxed">
                Your utilization of our interfaces is concurrently governed by our premium Privacy Policy. By agreeing to these Terms, you formally authorize the collection, storage, and processing of your contact telemetry as outlined inside our Privacy guidelines.
              </p>
            </section>

            {/* 11. Governing Law */}
            <section className="flex flex-col gap-3">
              <h2 className="font-display font-bold text-lg md:text-xl text-brand-dark flex items-center gap-2">
                <span className="w-1.5 h-6 bg-brand-primary rounded-full inline-block" />
                11. Governing Law
              </h2>
              <p className="text-sm text-brand-dark/75 leading-relaxed">
                These terms, conditions, and service agreements shall be governed, interpreted, and enforced in accordance with the laws of West Bengal, India, without regard to conflicts of law provisions.
              </p>
            </section>

            {/* 12. Contact Information */}
            <section className="flex flex-col gap-4 border-t border-brand-dark/5 pt-6 mt-2">
              <h2 className="font-display font-bold text-lg md:text-xl text-brand-dark flex items-center gap-2">
                <span className="w-1.5 h-6 bg-brand-primary rounded-full inline-block" />
                Contact Information
              </h2>
              <p className="text-sm text-brand-dark/75 leading-relaxed">
                If you have additional questions, partnership inquiries, or require dispute resolutions under these Terms, feel free to contact our administrative desk:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono font-bold mt-2">
                <div className="p-4 rounded-xl bg-white/40 border border-brand-dark/5">
                  <span className="text-brand-dark/40 block text-[9px] uppercase tracking-wider">EMAIL DIRECTORY</span>
                  <a href={`mailto:${businessConfig.contact.email}`} className="text-brand-primary text-sm hover:underline mt-1 block font-sans">
                    {businessConfig.contact.email}
                  </a>
                </div>
                <div className="p-4 rounded-xl bg-white/40 border border-brand-dark/5">
                  <span className="text-brand-dark/40 block text-[9px] uppercase tracking-wider">WHATSAPP DISPATCH</span>
                  <a href={`https://wa.me/${businessConfig.contact.whatsapp}`} target="_blank" rel="noreferrer" className="text-brand-primary text-sm hover:underline mt-1 block font-sans">
                    {businessConfig.contact.phone}
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
