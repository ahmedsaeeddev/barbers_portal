"use client";

import { motion } from "framer-motion";
import { Target, Heart, Zap, Globe, Users, TrendingUp, Scissors } from "lucide-react";
import { BRAND } from "@/lib/constants";

export default function AboutPage() {
  return (
    <div className="pt-24 pb-16">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-charcoal" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(212,175,55,0.12),_transparent_50%)]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-gold text-sm font-semibold uppercase tracking-wider">About Us</span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mt-3 mb-6">
              Modernizing Pakistan&apos;s<br /><span className="gold-text">Barber Industry</span>
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
              Nayi Bhaee ({BRAND.nameUrdu}) is on a mission to bring every barber shop in Pakistan online,
              empowering barbers with digital tools to grow their business and serve customers better.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mission */}
        <section className="py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="text-gold text-sm font-semibold uppercase tracking-wider">Our Mission</span>
              <h2 className="text-3xl font-bold mt-2 mb-6">Empowering Barbers Through Technology</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Pakistan has over 500,000 barber shops, yet most operate without any digital presence.
                  Customers rely on word-of-mouth, and barbers miss out on reaching thousands of potential clients online.
                </p>
                <p>
                  <strong className="text-foreground">Nayi Bhaee</strong> bridges this gap. We provide every barber shop — from a small
                  neighborhood salon to a premium grooming lounge — with the tools to create a professional digital profile,
                  showcase their services, collect reviews, and grow their reputation.
                </p>
                <p>
                  Our platform is built with simplicity in mind. No technical knowledge is required. Just register,
                  add your details, and you&apos;re live. It&apos;s that simple.
                </p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="grid grid-cols-2 gap-4">
              {[
                { icon: Target, label: "Mission-Driven", desc: "Digital transformation for barbers" },
                { icon: Heart, label: "Community First", desc: "Built for Pakistani barbers" },
                { icon: Zap, label: "Simple & Fast", desc: "Setup in under 5 minutes" },
                { icon: Globe, label: "8 Cities", desc: "Expanding across Pakistan" },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="premium-card p-5 text-center"
                >
                  <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center mx-auto mb-3">
                    <item.icon className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{item.label}</h3>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Roadmap */}
        <section className="py-20 border-t border-border">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-gold text-sm font-semibold uppercase tracking-wider">Roadmap</span>
            <h2 className="text-3xl font-bold mt-2">The Future of Nayi Bhaee</h2>
          </motion.div>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              { phase: "Phase 1", title: "Digital Profiles & Discovery", status: "Live", desc: "Shop profiles, search, reviews, QR codes" },
              { phase: "Phase 2", title: "Online Booking System", status: "Q3 2025", desc: "Customers can book appointments, manage schedules" },
              { phase: "Phase 3", title: "Mobile App Launch", status: "Q4 2025", desc: "Native iOS & Android apps for barbers and customers" },
              { phase: "Phase 4", title: "Payment Integration", status: "2026", desc: "Online payments, digital wallets, subscription billing" },
            ].map((item, i) => (
              <motion.div
                key={item.phase}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="premium-card p-6 flex items-start gap-4"
              >
                <div className={`px-3 py-1 rounded-lg text-xs font-bold shrink-0 ${item.status === "Live" ? "bg-emerald-500/10 text-emerald-500" : "bg-gold/10 text-gold"}`}>
                  {item.status}
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">{item.phase}</p>
                  <h3 className="font-bold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Powered By */}
        <section className="py-20 border-t border-border text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center mx-auto mb-6">
              <Scissors className="w-8 h-8 text-gold" />
            </div>
            <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">{BRAND.parentTagline}</p>
            <h2 className="text-2xl font-bold mb-4">{BRAND.parent}</h2>
            <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Zayro Studio is a creative digital agency specializing in building innovative products
              and platforms that solve real-world problems in Pakistan. Nayi Bhaee is our flagship product
              in the grooming & lifestyle vertical.
            </p>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
