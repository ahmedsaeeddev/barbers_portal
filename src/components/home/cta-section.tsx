"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Scissors, ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-charcoal" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.15),_transparent_60%)]" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="w-16 h-16 rounded-2xl bg-gold/20 flex items-center justify-center mx-auto animate-pulse-gold">
            <Scissors className="w-8 h-8 text-gold" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Ready to Bring Your<br />
            <span className="gold-text">Barber Shop Online?</span>
          </h2>

          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Join 150+ barber shops across Pakistan who are already growing their business with Nayi Bhaee.
            Start for free today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/register"
              className="btn-gold px-8 py-4 rounded-2xl text-base font-semibold inline-flex items-center justify-center gap-2 group"
            >
              Register Your Shop — Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/pricing"
              className="px-8 py-4 rounded-2xl text-base font-semibold border border-white/20 text-white hover:bg-white/5 inline-flex items-center justify-center transition-all"
            >
              View Pricing
            </Link>
          </div>

          <p className="text-sm text-white/30">
            No credit card required · Free forever plan available · Setup in 5 minutes
          </p>
        </motion.div>
      </div>
    </section>
  );
}
