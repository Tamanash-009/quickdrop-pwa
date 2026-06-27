import { useEffect } from "react";
import { ArrowLeft, Shield, Clock } from "lucide-react";
import Logo from "./Logo";

interface PrivacyPolicyProps {
  onNavigateHome: () => void;
}

export default function PrivacyPolicy({ onNavigateHome }: PrivacyPolicyProps) {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-brand-light text-brand-dark flex flex-col pt-24 pb-16 px-6 md:px-12 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-[10%] left-[-15%] w-[500px] aspect-square rounded-full bg-brand-cyan/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-15%] w-[400px] aspect-square rounded-full bg-brand-primary/5 blur-[100px] pointer-events-none" />

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
              <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0">
                <Shield size={28} />
              </div>
              <div>
                <h1 className="font-display font-extrabold text-3xl md:text-4xl text-brand-dark tracking-tight">
                  Privacy Policy
                </h1>
                <p className="text-xs font-mono font-bold uppercase tracking-wider text-brand-dark/40 mt-1">
                  QuickDrop Hyperlocal Delivery Network
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-cyan/10 text-brand-dark/70 text-xs font-mono font-bold shrink-0">
              <Clock size={12} className="text-brand-cyan animate-pulse" />
              <span>Last Updated: June 2026</span>
            </div>
          </div>

          <p className="text-sm md:text-base text-brand-dark/80 leading-relaxed mb-8">
            At QuickDrop, accessible from our application platform, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by QuickDrop and how we use it to fulfill hyper-speed, local deliveries within under 30 minutes.
          </p>

          <div className="flex flex-col gap-8">
            {/* 1. Information Collected */}
            <section className="flex flex-col gap-3">
              <h2 className="font-display font-bold text-lg md:text-xl text-brand-dark flex items-center gap-2">
                <span className="w-1.5 h-6 bg-brand-primary rounded-full inline-block" />
                1. Information We Collect
              </h2>
              <p className="text-sm text-brand-dark/75 leading-relaxed">
                The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal details.
              </p>
              <ul className="list-disc list-inside text-sm text-brand-dark/70 space-y-1.5 pl-2">
                <li><strong>Identity Data:</strong> Full name, username, or similar identifier.</li>
                <li><strong>Contact Data:</strong> Delivery addresses, billing addresses, mobile phone numbers, and email addresses.</li>
                <li><strong>Order Information:</strong> Items purchased, total bill amounts, payment selections, and delivery instructions.</li>
                <li><strong>Device Information:</strong> Internet protocol (IP) address, operating system, browser type, and navigation logs.</li>
              </ul>
            </section>

            {/* 2. Cookies */}
            <section className="flex flex-col gap-3">
              <h2 className="font-display font-bold text-lg md:text-xl text-brand-dark flex items-center gap-2">
                <span className="w-1.5 h-6 bg-brand-primary rounded-full inline-block" />
                2. Cookies and Tracking Technologies
              </h2>
              <p className="text-sm text-brand-dark/75 leading-relaxed">
                Like any other website, QuickDrop uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
              </p>
            </section>

            {/* 3. Analytics */}
            <section className="flex flex-col gap-3">
              <h2 className="font-display font-bold text-lg md:text-xl text-brand-dark flex items-center gap-2">
                <span className="w-1.5 h-6 bg-brand-primary rounded-full inline-block" />
                3. Analytics Services
              </h2>
              <p className="text-sm text-brand-dark/75 leading-relaxed">
                We utilize third-party analytics solutions (such as Google Analytics) to capture traffic and app usage metrics. These tools record interaction telemetry anonymously to help us diagnose visual bugs, optimize search response latencies, and refine user interface fluidity.
              </p>
            </section>

            {/* 4. How We Use User Data */}
            <section className="flex flex-col gap-3">
              <h2 className="font-display font-bold text-lg md:text-xl text-brand-dark flex items-center gap-2">
                <span className="w-1.5 h-6 bg-brand-primary rounded-full inline-block" />
                4. How We Use Your Data
              </h2>
              <p className="text-sm text-brand-dark/75 leading-relaxed">
                We use the information we collect in various ways, including to:
              </p>
              <ul className="list-disc list-inside text-sm text-brand-dark/70 space-y-1.5 pl-2">
                <li>Provide, operate, and maintain our hyperlocal delivery platform.</li>
                <li>Improve, personalize, and expand our inventory selection.</li>
                <li>Process your shopping basket orders and share instant live GPS courier telemetry.</li>
                <li>Develop new products, services, features, and functionality.</li>
                <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the delivery service.</li>
                <li>Send pre-filled shopping receipt data via WhatsApp APIs or email triggers.</li>
              </ul>
            </section>

            {/* 5. Data Security */}
            <section className="flex flex-col gap-3">
              <h2 className="font-display font-bold text-lg md:text-xl text-brand-dark flex items-center gap-2">
                <span className="w-1.5 h-6 bg-brand-primary rounded-full inline-block" />
                5. Data Security Measures
              </h2>
              <p className="text-sm text-brand-dark/75 leading-relaxed">
                QuickDrop employs premium, production-ready cryptographic protocols and transport layer security (HTTPS) to guarantee that your profile metrics, mobile numbers, and delivery locations remain shielded from third-party interception. Database entries are housed in isolated, cloud-managed containers with rigid role-based access.
              </p>
            </section>

            {/* 6. Third-party Services */}
            <section className="flex flex-col gap-3">
              <h2 className="font-display font-bold text-lg md:text-xl text-brand-dark flex items-center gap-2">
                <span className="w-1.5 h-6 bg-brand-primary rounded-full inline-block" />
                6. Third-party Services
              </h2>
              <p className="text-sm text-brand-dark/75 leading-relaxed">
                Our application integrates official Google Maps Platform APIs for satellite route mapping and address lookups, as well as official WhatsApp click-to-chat features. These services maintain independent, robust privacy standards. We advise our customers to consult the privacy policies of these respectives third-party platforms for detailed instructions.
              </p>
            </section>

            {/* 7. User Rights */}
            <section className="flex flex-col gap-3">
              <h2 className="font-display font-bold text-lg md:text-xl text-brand-dark flex items-center gap-2">
                <span className="w-1.5 h-6 bg-brand-primary rounded-full inline-block" />
                7. Your User Rights
              </h2>
              <p className="text-sm text-brand-dark/75 leading-relaxed">
                Depending on your location, you hold the right to request access to the personal logs we retain, demand structural corrections of erroneous records, object to active marketing communication channels, or request complete structural erasure of your delivery history.
              </p>
            </section>

            {/* 8. Data Retention */}
            <section className="flex flex-col gap-3">
              <h2 className="font-display font-bold text-lg md:text-xl text-brand-dark flex items-center gap-2">
                <span className="w-1.5 h-6 bg-brand-primary rounded-full inline-block" />
                8. Data Retention Policies
              </h2>
              <p className="text-sm text-brand-dark/75 leading-relaxed">
                We preserve personal delivery and customer profile logs solely for the minimum duration required to complete order fullfillments, resolve merchant receipt discrepancies, calculate active customer loyalty statuses, and comply with state accounting regulations.
              </p>
            </section>

            {/* 9. Children's Privacy */}
            <section className="flex flex-col gap-3">
              <h2 className="font-display font-bold text-lg md:text-xl text-brand-dark flex items-center gap-2">
                <span className="w-1.5 h-6 bg-brand-primary rounded-full inline-block" />
                9. Children's Privacy Protection
              </h2>
              <p className="text-sm text-brand-dark/75 leading-relaxed">
                Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity. QuickDrop does not knowingly collect any Personal Identifiable Information from children under the age of 13.
              </p>
            </section>

            {/* 10. Changes to Policy */}
            <section className="flex flex-col gap-3">
              <h2 className="font-display font-bold text-lg md:text-xl text-brand-dark flex items-center gap-2">
                <span className="w-1.5 h-6 bg-brand-primary rounded-full inline-block" />
                10. Changes to This Privacy Policy
              </h2>
              <p className="text-sm text-brand-dark/75 leading-relaxed">
                We may update our Privacy Policy from time to time to accommodate new service channels or geographical expansions. We will notify customers of structural changes by posting the new policy layout on this subpage with a refreshed modification date.
              </p>
            </section>

            {/* 11. Contact Details */}
            <section className="flex flex-col gap-4 border-t border-brand-dark/5 pt-6 mt-2">
              <h2 className="font-display font-bold text-lg md:text-xl text-brand-dark flex items-center gap-2">
                <span className="w-1.5 h-6 bg-brand-primary rounded-full inline-block" />
                Contact Information
              </h2>
              <p className="text-sm text-brand-dark/75 leading-relaxed">
                If you have additional questions or require more information about our Privacy Policy, do not hesitate to reach our primary support center:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono font-bold mt-2">
                <div className="p-4 rounded-xl bg-white/40 border border-brand-dark/5">
                  <span className="text-brand-dark/40 block text-[9px] uppercase tracking-wider">EMAIL DIRECTORY</span>
                  <a href="mailto:qdrop5262@gmail.com" className="text-brand-primary text-sm hover:underline mt-1 block font-sans">
                    qdrop5262@gmail.com
                  </a>
                </div>
                <div className="p-4 rounded-xl bg-white/40 border border-brand-dark/5">
                  <span className="text-brand-dark/40 block text-[9px] uppercase tracking-wider">WHATSAPP DISPATCH</span>
                  <a href="https://wa.me/917001055879" target="_blank" rel="noreferrer" className="text-brand-primary text-sm hover:underline mt-1 block font-sans">
                    +91 70010 55879
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
