"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, BadgeCheck, MoreHorizontal, Eye, Trash2, Ban } from "lucide-react";
import { mockBarberShops } from "@/lib/mock-data";

export default function AdminShopsPage() {
  const [search, setSearch] = useState("");
  const shops = mockBarberShops.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Barber Shops</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage all registered shops</p>
        </div>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search shops..." className="w-full pl-11 pr-4 py-3 rounded-xl bg-card border border-border text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" />
      </div>

      <div className="premium-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="px-6 py-4 font-semibold text-muted-foreground">Shop</th>
                <th className="px-6 py-4 font-semibold text-muted-foreground">City</th>
                <th className="px-6 py-4 font-semibold text-muted-foreground">Rating</th>
                <th className="px-6 py-4 font-semibold text-muted-foreground">Status</th>
                <th className="px-6 py-4 font-semibold text-muted-foreground">Plan</th>
                <th className="px-6 py-4 font-semibold text-muted-foreground text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {shops.map((shop) => (
                <tr key={shop.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-gold/30 to-gold/10 flex items-center justify-center shrink-0">
                        <span className="text-xs font-bold text-gold">{shop.name[0]}</span>
                      </div>
                      <div>
                        <p className="font-semibold flex items-center gap-1">
                          {shop.name}
                          {shop.isVerified && <BadgeCheck className="w-3.5 h-3.5 text-gold" />}
                        </p>
                        <p className="text-xs text-muted-foreground">{shop.owner}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{shop.city}</td>
                  <td className="px-6 py-4">
                    <span className="text-gold font-semibold">★ {shop.rating}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded-md text-xs font-bold ${shop.isVerified ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-400"}`}>
                      {shop.isVerified ? "Verified" : "Pending"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded-md text-xs font-bold ${shop.isPremium ? "bg-gold/10 text-gold" : "bg-muted text-muted-foreground"}`}>
                      {shop.isPremium ? "Premium" : "Free"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-2 rounded-lg hover:bg-muted/50 text-muted-foreground hover:text-foreground"><Eye className="w-4 h-4" /></button>
                      <button className="p-2 rounded-lg hover:bg-red-500/10 text-muted-foreground hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
