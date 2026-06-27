import { motion } from "motion/react";
import { whyChooseUsData } from "../data";
import LucideIcon from "./LucideIcon";

export default function WhyChooseUs() {
  return (
    <section
      id="why-choose-us"
      className="py-24 px-6 md:px-12 relative overflow-hidden bg-brand-light"
    >
      {/* Dynamic blurred background accents */}
      <div className="absolute top-[40%] left-[-15%] w-[450px] aspect-square rounded-full bg-gradient-to-r from-brand-primary/10 to-transparent blur-[120px]" />
      <div className="absolute bottom-[10%] right-[-15%] w-[400px] aspect-square rounded-full bg-gradient-to-l from-brand-cyan/10 to-transparent blur-[100px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-3.5 py-1 rounded-full bg-brand-primary/10 text-[11px] font-mono tracking-widest font-bold uppercase text-brand-primary inline-flex items-center gap-1.5 mb-4"
          >
            <span>Our Promises</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display font-extrabold text-4xl md:text-5xl text-brand-dark tracking-tight"
          >
            Why Choose QuickDrop?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base md:text-lg text-brand-dark/70"
          >
            We represent the intersection of extreme speed, uncompromising fresh quality, and professional local service.
          </motion.p>
        </div>

        {/* 6 Premium Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {whyChooseUsData.map((item, index) => {
            return (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                key={item.id}
                className="group p-8 rounded-[28px] glass-card hover:glass-card-hover border-white/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden"
              >
                {/* Floating graphic overlay lines */}
                <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full border border-brand-primary/5 group-hover:border-brand-primary/10 transition-colors pointer-events-none" />
                
                {/* Icon Container with glowing ring */}
                <div className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-brand-primary/10 to-brand-cyan/10 text-brand-primary flex items-center justify-center mb-6 group-hover:from-brand-primary group-hover:to-brand-cyan group-hover:text-white transition-all duration-500 shadow-sm group-hover:shadow-lg">
                  <span className="absolute inset-0 rounded-full border border-brand-primary/20 group-hover:scale-125 group-hover:opacity-0 transition-all duration-500" />
                  <LucideIcon name={item.iconName} className="transition-transform duration-500 group-hover:scale-110" size={26} />
                </div>

                {/* Card Title & Desc */}
                <h3 className="font-display font-bold text-lg md:text-xl text-brand-dark group-hover:text-brand-primary transition-colors">
                  {item.title}
                </h3>
                
                <p className="mt-4 text-sm text-brand-dark/70 leading-relaxed font-normal">
                  {item.description}
                </p>

                {/* Bottom colored accent strip */}
                <div className="absolute bottom-0 inset-x-0 h-1.5 bg-gradient-to-r from-brand-primary via-brand-gradient-mid to-brand-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
