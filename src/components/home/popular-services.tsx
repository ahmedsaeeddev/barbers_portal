"use client";

import { motion } from "framer-motion";
import { Scissors, Paintbrush, SprayCan, Sparkles, Baby, Hand } from "lucide-react";

const services = [
  { icon: Scissors, name: "Haircut", desc: "Classic & modern cuts", price: "From PKR 300", color: "from-amber-500/20 to-amber-500/5" },
  { icon: SprayCan, name: "Beard Trim", desc: "Shape & style", price: "From PKR 200", color: "from-emerald-500/20 to-emerald-500/5" },
  { icon: Paintbrush, name: "Hair Color", desc: "Professional coloring", price: "From PKR 1,000", color: "from-blue-500/20 to-blue-500/5" },
  { icon: Sparkles, name: "Facial", desc: "Deep cleansing", price: "From PKR 500", color: "from-purple-500/20 to-purple-500/5" },
  { icon: Hand, name: "Head Massage", desc: "Relaxing therapy", price: "From PKR 300", color: "from-rose-500/20 to-rose-500/5" },
  { icon: Baby, name: "Kids Haircut", desc: "Fun styles for kids", price: "From PKR 250", color: "from-cyan-500/20 to-cyan-500/5" },
];

export default function PopularServices() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-gold text-sm font-semibold uppercase tracking-wider">Services</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2">Popular Services</h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            Browse the most popular grooming services offered by barber shops on our platform.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {services.map((service, i) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="premium-card p-5 text-center group cursor-pointer"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-b ${service.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="w-6 h-6 text-foreground/80" />
              </div>
              <h3 className="font-semibold text-sm mb-1">{service.name}</h3>
              <p className="text-xs text-muted-foreground mb-2">{service.desc}</p>
              <span className="text-xs font-medium text-gold">{service.price}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
