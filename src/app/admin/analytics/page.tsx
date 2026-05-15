"use client";

import { motion } from "framer-motion";
import { mockAdminStats } from "@/lib/mock-data";
import { formatPrice } from "@/lib/utils";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const COLORS = ["#D4AF37", "#34D399", "#60A5FA", "#F472B6", "#A78BFA"];
const cityData = [
  { city: "Lahore", shops: 42 }, { city: "Karachi", shops: 38 }, { city: "Islamabad", shops: 28 },
  { city: "Rawalpindi", shops: 18 }, { city: "Others", shops: 30 },
];

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-sm text-muted-foreground mt-1">Platform-wide analytics and insights</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="premium-card p-6">
          <h3 className="font-bold mb-6">Revenue Over Time</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockAdminStats.revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" stroke="#737373" fontSize={12} />
                <YAxis stroke="#737373" fontSize={12} />
                <Tooltip contentStyle={{ background: "#1A1A1A", border: "1px solid #333", borderRadius: "12px", fontSize: 13 }} />
                <Line type="monotone" dataKey="revenue" stroke="#D4AF37" strokeWidth={2} dot={{ fill: "#D4AF37" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="premium-card p-6">
          <h3 className="font-bold mb-6">Shops by City</h3>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={cityData} dataKey="shops" nameKey="city" cx="50%" cy="50%" outerRadius={90} innerRadius={50} paddingAngle={4}>
                  {cityData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "#1A1A1A", border: "1px solid #333", borderRadius: "12px", fontSize: 13 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-2">
            {cityData.map((d, i) => (
              <span key={d.city} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS[i] }} />
                {d.city} ({d.shops})
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="premium-card p-6">
        <h3 className="font-bold mb-6">Shop Registration Trend</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockAdminStats.revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" stroke="#737373" fontSize={12} />
              <YAxis stroke="#737373" fontSize={12} />
              <Tooltip contentStyle={{ background: "#1A1A1A", border: "1px solid #333", borderRadius: "12px", fontSize: 13 }} />
              <Bar dataKey="shops" fill="#34D399" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}
