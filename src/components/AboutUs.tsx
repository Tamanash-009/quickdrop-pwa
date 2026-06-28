import { motion } from "motion/react";
import { statsData } from "../data";
import LucideIcon from "./LucideIcon";

export default function AboutUs() {
  return (
    <section
      id="about"
      className="py-24 px-6 md:px-12 relative overflow-hidden bg-surface/40"
    >
      {/* Visual glowing blobs */}
      <div className="absolute top-[30%] right-[-10%] w-[350px] aspect-square rounded-full bg-primary/5 blur-[100px]" />
      <div className="absolute bottom-[20%] left-[-10%] w-[400px] aspect-square rounded-full bg-brand-cyan/5 blur-[110px]" />

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Side: Story, Mission, & Vision */}
        <div className="lg:col-span-7 flex flex-col text-left">
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-3.5 py-1 rounded-full bg-primary/10 text-[11px] font-mono tracking-widest font-bold uppercase text-primary inline-flex items-center gap-1.5 mb-4 self-start"
          >
            <span>Our Journey</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display font-extrabold text-4xl md:text-5xl text-on-surface tracking-tight leading-[1.12]"
          >
            Serving Nischintapur with Pride & Passion
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-base md:text-lg text-on-surface-variant leading-relaxed font-normal space-y-4"
          >
            <p>QuickDrop was created with one simple goal—to make everyday grocery shopping faster, easier, and more convenient for families in Nischintapur. We proudly serve our local community with fresh products, reliable delivery, and a commitment to excellent customer service.</p>
            <p>As a locally focused grocery delivery platform, every order is handled with care to ensure quality, convenience, and trust.</p>
            <p>Today we proudly serve customers within a 10 KM radius of Nischintapur, and we're continuously working to expand our reach so we can serve even more nearby communities in the future.</p>
          </motion.div>

          <hr className="border-outline my-8" />

          {/* Highlights split blocks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex gap-4 items-start"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h4 className="font-display font-bold text-lg text-on-surface">Locally Trusted</h4>
                <p className="mt-2 text-sm text-on-surface-variant leading-relaxed">
                  Serving Nischintapur & Nearby Areas
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex gap-4 items-start"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 text-primary flex items-center justify-center shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-display font-bold text-lg text-on-surface">Fast Delivery</h4>
                <p className="mt-2 text-sm text-on-surface-variant leading-relaxed">
                  Average Delivery Time: 30 Minutes
                </p>
              </div>
            </motion.div>
          </div>

          {/* Growing Every Day approach */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-8 p-4 rounded-2xl bg-brand-cyan/5 border border-brand-cyan/10 flex items-center gap-3 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 px-2 py-0.5 bg-primary text-on-primary text-[8px] font-bold uppercase tracking-widest rounded-bl-lg rounded-tr-xl">
              🚀 Expanding Soon
            </div>
            <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-brand-cyan shadow-sm font-bold text-xs select-none">
              GE
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-on-surface">Growing Every Day</p>
              <p className="text-xs text-on-surface-variant">Expanding our delivery network to reach more customers soon.</p>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Bento Grid Statistics */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-4 md:gap-6 relative">
          
          {/* Subtle background frame decorative border */}
          <div className="absolute inset-[-12px] border border-outline rounded-[36px] pointer-events-none" />

          {statsData.map((stat, idx) => {
            return (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ scale: 1.03 }}
                key={stat.label}
                className={`p-6 rounded-[24px] glass-card border-white/60 flex flex-col justify-between text-left shadow-sm ${
                  idx === 1 ? "translate-y-4" : idx === 2 ? "-translate-y-4" : ""
                }`}
              >
                {/* Glowing vector wrapper icon */}
                <div className="w-10 h-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center mb-6">
                  <LucideIcon name={stat.iconName} size={18} />
                </div>

                <div className="flex flex-col">
                  <span className="font-display font-extrabold text-3xl md:text-4xl text-primary tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-[10px] font-mono tracking-wider text-on-surface-variant uppercase mt-1.5 font-bold">
                    {stat.label}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
