"use client";

import { motion } from "framer-motion";
import { CreditCard, Check, Download, ArrowUpRight } from "lucide-react";
import { mockPricingPlans, mockInvoices } from "@/lib/mock-data";
import { formatPrice } from "@/lib/utils";

export default function BillingPage() {
  const currentPlan = mockPricingPlans[1]; // Starter

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Billing & Subscription</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your plan and billing</p>
      </div>

      {/* Current Plan */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="premium-card p-6 border-gold/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-lg">{currentPlan.name} Plan</h3>
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-500 text-xs font-bold">Active</span>
            </div>
            <p className="text-sm text-muted-foreground">{formatPrice(currentPlan.price)}/{currentPlan.period}</p>
            <p className="text-xs text-muted-foreground mt-1">Next billing: June 1, 2025</p>
          </div>
          <div className="flex gap-3">
            <button className="btn-gold px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2">
              <ArrowUpRight className="w-4 h-4" /> Upgrade Plan
            </button>
            <button className="px-5 py-2.5 rounded-xl border border-border text-sm font-medium hover:border-red-500/50 hover:text-red-400 transition-all">
              Cancel
            </button>
          </div>
        </div>
      </motion.div>

      {/* Features */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="premium-card p-6">
        <h3 className="font-bold mb-4">Your Plan Features</h3>
        <div className="grid sm:grid-cols-2 gap-2">
          {currentPlan.features.map((f) => (
            <div key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
              <Check className="w-4 h-4 text-gold shrink-0" />
              {f}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Invoices */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="premium-card overflow-hidden">
        <div className="p-6 border-b border-border">
          <h3 className="font-bold">Payment History</h3>
        </div>
        <div className="divide-y divide-border">
          {mockInvoices.map((inv) => (
            <div key={inv.id} className="px-6 py-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{inv.id}</p>
                <p className="text-xs text-muted-foreground">{inv.date} · {inv.plan} Plan</p>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-2 py-0.5 rounded-md text-xs font-semibold ${inv.status === "paid" ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"}`}>{inv.status}</span>
                <span className="text-sm font-semibold">{formatPrice(inv.amount)}</span>
                <button className="p-1.5 rounded-lg hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-all">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
