import { motion } from "motion/react";
import { ShieldCheck, Copyright as CopyrightIcon, AlertTriangle, Scale } from "lucide-react";
import { businessConfig } from "../config/business";

export default function Copyright() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-background selection:bg-primary/20 selection:text-on-surface">
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-primary/10 text-primary mb-6">
            <ShieldCheck size={32} />
          </div>
          <h1 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-on-surface tracking-tight mb-6">
            Intellectual Property & <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-cyan">Copyright</span>
          </h1>
          <p className="text-xl text-on-surface-variant max-w-2xl mx-auto font-medium leading-relaxed">
            Legal Ownership, Protections, and Terms of Use for QuickDrop Intellectual Property.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-[2.5rem] p-8 md:p-12 lg:p-16 border border-white shadow-2xl relative overflow-hidden"
        >
          {/* Decorative background gradients */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-cyan/5 rounded-full blur-3xl -z-10 -translate-x-1/3 translate-y-1/3" />

          <div className="prose prose-lg max-w-none text-on-surface-variant">
            
            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-outline">
              <CopyrightIcon className="text-primary shrink-0" size={28} />
              <h2 className="text-2xl md:text-3xl font-display font-extrabold text-on-surface m-0">
                &copy; {new Date().getFullYear()} {businessConfig.name}. All Rights Reserved.
              </h2>
            </div>

            <section className="mb-12">
              <h3 className="font-display font-bold text-xl text-on-surface flex items-center gap-3 mb-6">
                <ShieldCheck size={20} className="text-brand-cyan" />
                Copyright Protection
              </h3>
              <p className="leading-relaxed">
                All content, branding, graphics, UI design, icons, illustrations, logos, source code, layouts, animations, images, and intellectual property displayed on this website are protected by applicable copyright and intellectual property laws.
              </p>
              <div className="mt-6 p-6 rounded-2xl bg-red-500/5 border border-red-500/10 flex gap-4">
                <AlertTriangle className="text-red-500 shrink-0 mt-1" size={24} />
                <p className="m-0 text-red-900/80 font-medium">
                  Unauthorized copying, reproduction, redistribution, modification, commercial use, or republication without written permission is strictly prohibited.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h3 className="font-display font-bold text-xl text-on-surface flex items-center gap-3 mb-6">
                <Scale size={20} className="text-brand-cyan" />
                Permitted & Prohibited Actions
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-surface/60 p-6 rounded-2xl border border-outline">
                  <h4 className="font-bold text-on-surface mb-4 text-sm uppercase tracking-wider">Prohibited Uses</h4>
                  <ul className="space-y-3 m-0 p-0 list-none">
                    <li className="flex items-start gap-3">
                      <span className="text-red-500 mt-1">✗</span>
                      <span className="text-sm">Reverse engineering of the application</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-500 mt-1">✗</span>
                      <span className="text-sm">Commercial reuse of components</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-500 mt-1">✗</span>
                      <span className="text-sm">Republishing the website design</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-500 mt-1">✗</span>
                      <span className="text-sm">Copying UI/UX or layouts</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-500 mt-1">✗</span>
                      <span className="text-sm">Copying source code or graphics</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-surface/60 p-6 rounded-2xl border border-outline">
                  <h4 className="font-bold text-on-surface mb-4 text-sm uppercase tracking-wider">Permitted Uses</h4>
                  <ul className="space-y-3 m-0 p-0 list-none">
                    <li className="flex items-start gap-3">
                      <span className="text-green-500 mt-1">✓</span>
                      <span className="text-sm">Personal, non-commercial browsing</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-500 mt-1">✓</span>
                      <span className="text-sm">Sharing links to the official website</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-500 mt-1">✓</span>
                      <span className="text-sm">Using QuickDrop delivery services</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h3 className="font-display font-bold text-xl text-on-surface flex items-center gap-3 mb-6">
                <ShieldCheck size={20} className="text-brand-cyan" />
                Legal Action
              </h3>
              <p className="leading-relaxed">
                We take the protection of our intellectual property very seriously. Unauthorized commercial use, theft of proprietary assets, or direct copying of our user interface may result in legal action where permitted by applicable law.
              </p>
              <p className="leading-relaxed mt-4">
                If you wish to request permission to use any materials, please contact us at <a href={`mailto:${businessConfig.contact.email}`} className="font-bold text-primary hover:underline">{businessConfig.contact.email}</a>.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
