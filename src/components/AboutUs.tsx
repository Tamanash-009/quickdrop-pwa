import { motion } from "motion/react";
import { statsData } from "../data";
import LucideIcon from "./LucideIcon";

export default function AboutUs() {
  return (
    <section
      id="about"
      className="py-24 px-6 md:px-12 relative overflow-hidden bg-white/40"
    >
      {/* Visual glowing blobs */}
      <div className="absolute top-[30%] right-[-10%] w-[350px] aspect-square rounded-full bg-brand-primary/5 blur-[100px]" />
      <div className="absolute bottom-[20%] left-[-10%] w-[400px] aspect-square rounded-full bg-brand-cyan/5 blur-[110px]" />

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Side: Story, Mission, & Vision */}
        <div className="lg:col-span-7 flex flex-col text-left">
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-3.5 py-1 rounded-full bg-brand-primary/10 text-[11px] font-mono tracking-widest font-bold uppercase text-brand-primary inline-flex items-center gap-1.5 mb-4 self-start"
          >
            <span>Our Journey</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display font-extrabold text-4xl md:text-5xl text-brand-dark tracking-tight leading-[1.12]"
          >
            Revolutionizing Hyperlocal Logistics For Every Neighborhood
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-base md:text-lg text-brand-dark/70 leading-relaxed font-normal"
          >
            Born in 2026, QuickDrop was started with a simple belief: you shouldn't have to wait hours or pay excessive premiums to access items from local vendors next door. By combining modern routing software with carefully insulated dispatch cargo, we bridge the gap between premium neighborhood stores and local residents.
          </motion.p>

          <hr className="border-brand-dark/5 my-8" />

          {/* Mission & Vision split blocks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex gap-4 items-start"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h4 className="font-display font-bold text-lg text-brand-dark">Our Mission</h4>
                <p className="mt-2 text-sm text-brand-dark/70 leading-relaxed">
                  Empowering local corner shops, food chefs, and grocery stores with modern digital sales and ultra-fast logistics capabilities.
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
              <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 text-brand-primary flex items-center justify-center shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <div>
                <h4 className="font-display font-bold text-lg text-brand-dark">Our Vision</h4>
                <p className="mt-2 text-sm text-brand-dark/70 leading-relaxed">
                  Building a fully frictionless hyperlocal shipping mesh that ensures any household item can be obtained in minutes, sustainably.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Customer First approach */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-8 p-4 rounded-2xl bg-brand-cyan/5 border border-brand-cyan/10 flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-brand-cyan shadow-sm font-bold text-xs select-none">
              CF
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-brand-dark">Customer-First Logistics</p>
              <p className="text-xs text-brand-dark/70">Each delivery is individually packaged, temperature locked, and handled with care.</p>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Bento Grid Statistics */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-4 md:gap-6 relative">
          
          {/* Subtle background frame decorative border */}
          <div className="absolute inset-[-12px] border border-brand-dark/5 rounded-[36px] pointer-events-none" />

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
                <div className="w-10 h-10 rounded-xl bg-brand-primary/5 text-brand-primary flex items-center justify-center mb-6">
                  <LucideIcon name={stat.iconName} size={18} />
                </div>

                <div className="flex flex-col">
                  <span className="font-display font-extrabold text-3xl md:text-4xl text-brand-primary tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-[10px] font-mono tracking-wider text-brand-dark/50 uppercase mt-1.5 font-bold">
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
