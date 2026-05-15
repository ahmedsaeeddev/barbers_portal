"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import Link from "next/link";
import { mockPricingPlans } from "@/lib/mock-data";
import { formatPrice } from "@/lib/utils";

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center pt-8 mb-16">
          <span className="text-gold text-sm font-semibold uppercase tracking-wider">Pricing</span>
          <h1 className="text-3xl sm:text-4xl font-bold mt-2">Simple, Transparent Pricing</h1>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">Start free and upgrade as your business grows. No hidden fees.</p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <span className={`text-sm font-medium ${!annual ? "text-foreground" : "text-muted-foreground"}`}>Monthly</span>
            <button
              onClick={() => setAnnual(!annual)}
              className={`relative w-14 h-7 rounded-full transition-colors ${annual ? "bg-gold" : "bg-muted"}`}
            >
              <div className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-md transition-transform ${annual ? "translate-x-7" : "translate-x-0.5"}`} />
            </button>
            <span className={`text-sm font-medium ${annual ? "text-foreground" : "text-muted-foreground"}`}>
              Annual <span className="text-xs text-gold">(Save 20%)</span>
            </span>
          </div>
        </motion.div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {mockPricingPlans.map((plan, i) => {
            const price = annual && plan.price > 0 ? Math.round(plan.price * 0.8) : plan.price;
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`relative rounded-2xl border p-8 flex flex-col ${
                  plan.isPopular
                    ? "border-gold bg-gold/5 shadow-xl shadow-gold/10"
                    : "border-border bg-card"
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full bg-gold text-charcoal text-xs font-bold shadow-lg shadow-gold/30">
                      <Sparkles className="w-3 h-3" />
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-bold">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">{price === 0 ? "Free" : formatPrice(price)}</span>
                    {price > 0 && <span className="text-muted-foreground text-sm">/{plan.period}</span>}
                  </div>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm">
                      <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/auth/register"
                  className={`w-full py-3.5 rounded-xl text-sm font-semibold text-center block transition-all ${
                    plan.isPopular
                      ? "btn-gold"
                      : "border border-border hover:border-gold/50 hover:bg-gold/5"
                  }`}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* FAQ note */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-16">
          <p className="text-sm text-muted-foreground">
            All plans include basic support. Have questions?{" "}
            <Link href="/contact" className="text-gold hover:text-gold-light font-medium">Contact us</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
