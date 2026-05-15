"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Store, Sparkles, QrCode, ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-charcoal" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(212,175,55,0.15),_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(212,175,55,0.08),_transparent_50%)]" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating orbs */}
      <motion.div
        animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-1/4 w-64 h-64 bg-gold/5 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ y: [20, -20, 20] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/3 left-1/4 w-48 h-48 bg-gold/3 rounded-full blur-3xl"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <div className="space-y-8 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                Pakistan&apos;s #1 Digital Barber Platform
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] tracking-tight"
            >
              Bring Your{" "}
              <span className="gold-text">Barber Shop</span>{" "}
              Online
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-white/60 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              Create your digital business profile, showcase services & pricing,
              receive customer reviews, and get discovered by thousands of
              customers across Pakistan.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link
                href="/barbers"
                className="btn-gold px-8 py-4 rounded-2xl text-base font-semibold inline-flex items-center justify-center gap-2 group"
              >
                <Search className="w-5 h-5" />
                Find Barbers
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/auth/register"
                className="px-8 py-4 rounded-2xl text-base font-semibold border border-white/20 text-white hover:bg-white/5 inline-flex items-center justify-center gap-2 transition-all"
              >
                <Store className="w-5 h-5" />
                Register Your Shop
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-8 justify-center lg:justify-start text-white/40 text-sm"
            >
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                150+ Barber Shops
              </span>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gold" />
                8 Cities
              </span>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-400" />
                10K+ Reviews
              </span>
            </motion.div>
          </div>

          {/* Right - Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Phone Mockup */}
              <div className="relative mx-auto w-[280px]">
                <div className="bg-charcoal-light rounded-[2.5rem] p-3 border border-white/10 shadow-2xl shadow-black/50">
                  <div className="bg-gradient-to-b from-charcoal to-charcoal-medium rounded-[2rem] overflow-hidden">
                    {/* Status Bar */}
                    <div className="px-6 pt-4 pb-2 flex items-center justify-between">
                      <span className="text-[10px] text-white/40">9:41</span>
                      <div className="w-20 h-5 bg-black rounded-full" />
                      <span className="text-[10px] text-white/40">100%</span>
                    </div>
                    {/* App Content */}
                    <div className="px-4 pb-6 space-y-3">
                      <div className="text-center py-3">
                        <div className="w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center mx-auto mb-2">
                          <QrCode className="w-6 h-6 text-gold" />
                        </div>
                        <p className="text-xs text-white/80 font-medium">Scan QR Code</p>
                        <p className="text-[10px] text-white/40">View shop profile instantly</p>
                      </div>
                      {/* Mini Cards */}
                      {["Royal Cuts", "Sultan's Lounge", "Elite Barbers"].map((name, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold/30 to-gold/10 flex items-center justify-center shrink-0">
                            <span className="text-xs font-bold text-gold">{name[0]}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-white/90 font-medium truncate">{name}</p>
                            <p className="text-[10px] text-white/40">⭐ 4.{8 - i} · Open Now</p>
                          </div>
                          <div className="text-[10px] text-gold font-medium">View</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Decorative glow */}
                <div className="absolute -inset-4 bg-gold/5 rounded-[3rem] blur-2xl -z-10" />
              </div>

              {/* Floating Badge */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-8 top-12 bg-charcoal-light border border-white/10 rounded-2xl p-4 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                    <span className="text-emerald-400 text-sm">✓</span>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-white/90">Verified Shop</p>
                    <p className="text-[10px] text-white/40">Premium Member</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating Reviews */}
              <motion.div
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-12 bottom-16 bg-charcoal-light border border-white/10 rounded-2xl p-4 shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-7 h-7 rounded-full bg-gradient-to-br from-gold/50 to-gold/20 border-2 border-charcoal-light" />
                    ))}
                  </div>
                  <div>
                    <p className="text-xs font-medium text-white/90">10K+ Reviews</p>
                    <p className="text-[10px] text-gold">⭐⭐⭐⭐⭐</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
