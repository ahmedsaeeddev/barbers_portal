"use client";

import { motion } from "framer-motion";
import { Store, QrCode, Star, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: Store,
    step: "01",
    title: "Register Your Shop",
    description: "Create your free barber shop profile in minutes. Add your details, services, and team.",
  },
  {
    icon: QrCode,
    step: "02",
    title: "Get Your QR Code",
    description: "Receive a unique QR code for your shop. Customers can scan and view your profile instantly.",
  },
  {
    icon: Star,
    step: "03",
    title: "Collect Reviews",
    description: "Happy customers leave reviews. Build your reputation and attract new clients online.",
  },
  {
    icon: TrendingUp,
    step: "04",
    title: "Grow Your Business",
    description: "Track analytics, engage with customers, and watch your barber business grow digitally.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-gold text-sm font-semibold uppercase tracking-wider">Process</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2">How It Works</h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            Get your barber shop online in four simple steps. No technical knowledge required.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative"
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-px bg-gradient-to-r from-gold/30 to-transparent" />
              )}

              <div className="premium-card p-6 text-center relative">
                <span className="absolute -top-3 -right-3 w-8 h-8 rounded-lg bg-gold/10 border border-gold/30 text-gold text-xs font-bold flex items-center justify-center">
                  {item.step}
                </span>
                <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center mx-auto mb-5">
                  <item.icon className="w-7 h-7 text-gold" />
                </div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
