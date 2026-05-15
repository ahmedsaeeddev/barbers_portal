"use client";

import { motion } from "framer-motion";
import { Store, Users, CreditCard, TrendingUp, ArrowUpRight, Clock, BadgeCheck } from "lucide-react";
import { mockAdminStats, mockBarberShops } from "@/lib/mock-data";
import { formatPrice } from "@/lib/utils";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line
} from "recharts";

const stats = [
  { label: "Total Shops", value: mockAdminStats.totalShops, icon: Store, color: "text-blue-400", bg: "bg-blue-500/10" },
  { label: "Active Shops", value: mockAdminStats.activeShops, icon: BadgeCheck, color: "text-emerald-400", bg: "bg-emerald-500/10" },
  { label: "Pending Approval", value: mockAdminStats.pendingApproval, icon: Clock, color: "text-amber-400", bg: "bg-amber-500/10" },
  { label: "Total Users", value: mockAdminStats.totalUsers, icon: Users, color: "text-purple-400", bg: "bg-purple-500/10" },
  { label: "Monthly Revenue", value: mockAdminStats.monthlyRevenue, icon: CreditCard, color: "text-gold", bg: "bg-gold/10", isCurrency: true },
  { label: "Total Revenue", value: mockAdminStats.totalRevenue, icon: TrendingUp, color: "text-rose-400", bg: "bg-rose-500/10", isCurrency: true },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Platform overview and management</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="premium-card p-5">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </div>
            <p className="text-2xl font-bold">{stat.isCurrency ? formatPrice(stat.value) : stat.value.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="premium-card p-6">
          <h3 className="font-bold mb-6">Revenue Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockAdminStats.revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" stroke="#737373" fontSize={12} />
                <YAxis stroke="#737373" fontSize={12} />
                <Tooltip contentStyle={{ background: "#1A1A1A", border: "1px solid #333", borderRadius: "12px", fontSize: 13 }} />
                <Bar dataKey="revenue" fill="#D4AF37" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Shops Growth */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="premium-card p-6">
          <h3 className="font-bold mb-6">Shop Growth</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockAdminStats.revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" stroke="#737373" fontSize={12} />
                <YAxis stroke="#737373" fontSize={12} />
                <Tooltip contentStyle={{ background: "#1A1A1A", border: "1px solid #333", borderRadius: "12px", fontSize: 13 }} />
                <Line type="monotone" dataKey="shops" stroke="#34D399" strokeWidth={2} dot={{ fill: "#34D399" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Pending Approvals */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="premium-card overflow-hidden">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h3 className="font-bold">Pending Approvals</h3>
          <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-400 text-xs font-bold">{mockAdminStats.pendingApproval} pending</span>
        </div>
        <div className="divide-y divide-border">
          {mockBarberShops.filter((s) => !s.isVerified).map((shop) => (
            <div key={shop.id} className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold/30 to-gold/10 flex items-center justify-center">
                  <span className="text-sm font-bold text-gold">{shop.name[0]}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold">{shop.name}</p>
                  <p className="text-xs text-muted-foreground">{shop.city} · {shop.area}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-500 text-xs font-bold hover:bg-emerald-500/20 transition-all">Approve</button>
                <button className="px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 text-xs font-bold hover:bg-red-500/20 transition-all">Reject</button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
