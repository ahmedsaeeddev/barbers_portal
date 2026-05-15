"use client";

import { motion } from "framer-motion";
import { mockBarberShops } from "@/lib/mock-data";
import { formatPrice } from "@/lib/utils";

const subscriptions = mockBarberShops.map((shop) => ({
  id: shop.id,
  shop: shop.name,
  owner: shop.owner,
  plan: shop.isPremium ? "Premium" : shop.isVerified ? "Starter" : "Free",
  amount: shop.isPremium ? 500 : shop.isVerified ? 200 : 0,
  status: "active" as const,
  renewDate: "2025-06-01",
}));

export default function AdminSubscriptionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Subscriptions</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage shop subscriptions and billing</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div className="premium-card p-5 text-center">
          <p className="text-3xl font-bold text-gold">{subscriptions.filter((s) => s.plan !== "Free").length}</p>
          <p className="text-xs text-muted-foreground mt-1">Paid Subscribers</p>
        </div>
        <div className="premium-card p-5 text-center">
          <p className="text-3xl font-bold text-gold">{formatPrice(subscriptions.reduce((a, b) => a + b.amount, 0))}</p>
          <p className="text-xs text-muted-foreground mt-1">Monthly Revenue</p>
        </div>
        <div className="premium-card p-5 text-center">
          <p className="text-3xl font-bold text-gold">{subscriptions.filter((s) => s.plan === "Free").length}</p>
          <p className="text-xs text-muted-foreground mt-1">Free Tier</p>
        </div>
      </div>

      <div className="premium-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="px-6 py-4 font-semibold text-muted-foreground">Shop</th>
                <th className="px-6 py-4 font-semibold text-muted-foreground">Plan</th>
                <th className="px-6 py-4 font-semibold text-muted-foreground">Amount</th>
                <th className="px-6 py-4 font-semibold text-muted-foreground">Status</th>
                <th className="px-6 py-4 font-semibold text-muted-foreground">Renewal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {subscriptions.map((sub) => (
                <tr key={sub.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-semibold">{sub.shop}</p>
                    <p className="text-xs text-muted-foreground">{sub.owner}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded-md text-xs font-bold ${sub.plan === "Premium" ? "bg-gold/10 text-gold" : sub.plan === "Starter" ? "bg-blue-500/10 text-blue-400" : "bg-muted text-muted-foreground"}`}>{sub.plan}</span>
                  </td>
                  <td className="px-6 py-4 font-medium">{sub.amount > 0 ? formatPrice(sub.amount) : "Free"}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-500 text-xs font-bold">{sub.status}</span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{sub.amount > 0 ? sub.renewDate : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
