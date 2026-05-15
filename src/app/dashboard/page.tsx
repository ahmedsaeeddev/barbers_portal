"use client";

import { motion } from "framer-motion";
import { Eye, QrCode, Star, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { mockDashboardStats } from "@/lib/mock-data";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

const stats = [
  { label: "Profile Views", value: mockDashboardStats.profileViews, change: mockDashboardStats.profileViewsChange, icon: Eye, color: "text-blue-400", bg: "bg-blue-500/10" },
  { label: "QR Scans", value: mockDashboardStats.qrScans, change: mockDashboardStats.qrScansChange, icon: QrCode, color: "text-emerald-400", bg: "bg-emerald-500/10" },
  { label: "Total Reviews", value: mockDashboardStats.totalReviews, change: mockDashboardStats.reviewsChange, icon: Star, color: "text-gold", bg: "bg-gold/10" },
  { label: "Avg Rating", value: mockDashboardStats.avgRating, change: mockDashboardStats.ratingChange, icon: TrendingUp, color: "text-purple-400", bg: "bg-purple-500/10" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <p className="text-sm text-muted-foreground mt-1">Welcome back! Here&apos;s how your shop is performing.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="premium-card p-5"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <span className={`flex items-center gap-0.5 text-xs font-semibold ${stat.change >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                {stat.change >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {Math.abs(stat.change)}%
              </span>
            </div>
            <p className="text-2xl font-bold">{stat.value.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="premium-card p-6"
      >
        <h3 className="font-bold mb-6">Monthly Performance</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockDashboardStats.monthlyData}>
              <defs>
                <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="scansGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#34D399" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#34D399" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" stroke="#737373" fontSize={12} />
              <YAxis stroke="#737373" fontSize={12} />
              <Tooltip
                contentStyle={{ background: "#1A1A1A", border: "1px solid #333", borderRadius: "12px", fontSize: 13 }}
                labelStyle={{ color: "#D4AF37" }}
              />
              <Area type="monotone" dataKey="views" stroke="#D4AF37" fill="url(#viewsGrad)" strokeWidth={2} name="Profile Views" />
              <Area type="monotone" dataKey="scans" stroke="#34D399" fill="url(#scansGrad)" strokeWidth={2} name="QR Scans" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { label: "Edit Shop Profile", href: "/dashboard/shop", emoji: "🏪" },
          { label: "Manage Services", href: "/dashboard/services", emoji: "✂️" },
          { label: "View QR Code", href: "/dashboard/qr", emoji: "📱" },
        ].map((action, i) => (
          <motion.a
            key={action.label}
            href={action.href}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.05 }}
            className="premium-card p-5 flex items-center gap-4 group"
          >
            <span className="text-2xl">{action.emoji}</span>
            <span className="font-medium text-sm group-hover:text-gold transition-colors">{action.label}</span>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
