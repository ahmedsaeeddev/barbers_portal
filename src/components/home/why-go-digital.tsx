"use client";

import { motion } from "framer-motion";
import { Globe, Smartphone, BarChart3, Shield, Zap, Users } from "lucide-react";

const reasons = [
  { icon: Globe, title: "Online Presence", description: "Get discovered by thousands of potential customers searching for barbers online." },
  { icon: Smartphone, title: "Mobile-First", description: "Your shop profile looks stunning on every device. Optimized for mobile users." },
  { icon: BarChart3, title: "Business Analytics", description: "Track profile visits, QR scans, and customer engagement in real-time." },
  { icon: Shield, title: "Build Trust", description: "Verified profiles and genuine reviews help build customer confidence." },
  { icon: Zap, title: "Instant Discovery", description: "QR codes let customers access your services, pricing, and reviews instantly." },
  { icon: Users, title: "Customer Engagement", description: "Connect with customers via WhatsApp, respond to reviews, and build loyalty." },
];

export default function WhyGoDigital() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-gold text-sm font-semibold uppercase tracking-wider">Benefits</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2">Why Go Digital?</h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            Join the digital revolution. Here&apos;s why barber shops across Pakistan are choosing Nayi Bhaee.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="premium-card p-6 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                <item.icon className="w-6 h-6 text-gold" />
              </div>
              <h3 className="text-lg font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
