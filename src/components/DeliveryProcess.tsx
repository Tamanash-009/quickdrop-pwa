import { motion } from "motion/react";
import { deliveryProcessData } from "../data";
import LucideIcon from "./LucideIcon";

export default function DeliveryProcess() {
  return (
    <section
      id="delivery-process"
      className="py-24 px-6 md:px-12 relative overflow-hidden bg-white/30"
    >
      {/* Decorative ambient blurred spots */}
      <div className="absolute top-[20%] left-[-10%] w-[350px] aspect-square rounded-full bg-brand-cyan/5 blur-[100px]" />
      <div className="absolute bottom-[20%] right-[-10%] w-[400px] aspect-square rounded-full bg-brand-primary/5 blur-[120px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-3.5 py-1 rounded-full bg-brand-primary/10 text-[11px] font-mono tracking-widest font-bold uppercase text-brand-primary inline-flex items-center gap-1.5 mb-4"
          >
            <span>How it works</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display font-extrabold text-4xl md:text-5xl text-brand-dark tracking-tight"
          >
            Our Simple Delivery Process
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base md:text-lg text-brand-dark/70"
          >
            Five simple, automated logistics milestones connecting local shops directly to your tabletop.
          </motion.p>
        </div>

        {/* Responsive Timeline Container */}
        <div className="relative">
          
          {/* Connecting Line - Horizontal on Desktop, Hidden on Mobile */}
          <div className="hidden lg:block absolute top-12 left-12 right-12 h-[2px] bg-gradient-to-r from-brand-primary/20 via-brand-cyan/20 to-brand-primary/20 z-0" />

          {/* Connected Steps Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-6 relative z-10">
            {deliveryProcessData.map((step, index) => {
              return (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  key={step.stepNumber}
                  className="flex flex-col items-center lg:items-start text-center lg:text-left group"
                >
                  
                  {/* Step Bubble & Connectors */}
                  <div className="flex items-center justify-center relative mb-6">
                    {/* Animated Ripple ring */}
                    <span className="absolute inset-0 rounded-2xl bg-brand-primary/10 scale-110 group-hover:scale-130 opacity-60 group-hover:opacity-0 transition-all duration-500" />
                    
                    {/* Numeric Badge Indicator */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-tr from-brand-primary to-brand-gradient-end text-white text-[10px] font-extrabold flex items-center justify-center border-2 border-white shadow-sm">
                      {step.stepNumber}
                    </div>

                    {/* Core Vector Circle */}
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-white to-white/70 glass border-white/80 shadow-md group-hover:shadow-xl group-hover:border-brand-primary/20 flex items-center justify-center text-brand-primary group-hover:text-white group-hover:from-brand-primary group-hover:to-brand-cyan transition-all duration-500">
                      <LucideIcon name={step.iconName} size={28} className="transition-transform duration-500 group-hover:scale-110" />
                    </div>

                    {/* Vertical Connecting Line - Mobile Only */}
                    {index < deliveryProcessData.length - 1 && (
                      <div className="lg:hidden absolute top-24 left-1/2 -translate-x-1/2 h-10 w-[2px] bg-gradient-to-b from-brand-cyan/40 to-transparent" />
                    )}
                  </div>

                  {/* Text Description Block */}
                  <div className="max-w-[240px] lg:max-w-none px-4 lg:px-0">
                    <h3 className="font-display font-extrabold text-xl text-brand-dark group-hover:text-brand-primary transition-colors">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm text-brand-dark/70 leading-relaxed font-normal">
                      {step.description}
                    </p>
                  </div>

                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
