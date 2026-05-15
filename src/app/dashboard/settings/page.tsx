"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Save, Eye, EyeOff, Bell, Shield, User } from "lucide-react";
import { useToastStore } from "@/components/ui/toast";
import { useAppStore } from "@/lib/store";

export default function SettingsPage() {
  const { user } = useAppStore();
  const { addToast } = useToastStore();
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    currentPassword: "",
    newPassword: "",
    notifications: { email: true, sms: false, reviews: true, marketing: false },
  });

  const handleSave = () => {
    addToast("Settings saved successfully!", "success");
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your account preferences</p>
      </div>

      {/* Profile */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="premium-card p-6">
        <h3 className="font-bold flex items-center gap-2 mb-4"><User className="w-5 h-5 text-gold" /> Profile</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Name</label>
            <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Email</label>
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" />
          </div>
        </div>
      </motion.div>

      {/* Password */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="premium-card p-6">
        <h3 className="font-bold flex items-center gap-2 mb-4"><Shield className="w-5 h-5 text-gold" /> Change Password</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Current Password</label>
            <div className="relative">
              <input type={showPass ? "text" : "password"} value={form.currentPassword} onChange={(e) => setForm({ ...form, currentPassword: e.target.value })} className="w-full px-4 py-3 pr-12 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">New Password</label>
            <input type="password" value={form.newPassword} onChange={(e) => setForm({ ...form, newPassword: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" />
          </div>
        </div>
      </motion.div>

      {/* Notifications */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="premium-card p-6">
        <h3 className="font-bold flex items-center gap-2 mb-4"><Bell className="w-5 h-5 text-gold" /> Notifications</h3>
        <div className="space-y-3">
          {[
            { key: "email", label: "Email notifications" },
            { key: "sms", label: "SMS notifications" },
            { key: "reviews", label: "New review alerts" },
            { key: "marketing", label: "Marketing updates" },
          ].map((item) => (
            <label key={item.key} className="flex items-center justify-between cursor-pointer py-2">
              <span className="text-sm">{item.label}</span>
              <button
                onClick={() => setForm({
                  ...form,
                  notifications: { ...form.notifications, [item.key]: !form.notifications[item.key as keyof typeof form.notifications] },
                })}
                className={`relative w-11 h-6 rounded-full transition-colors ${form.notifications[item.key as keyof typeof form.notifications] ? "bg-gold" : "bg-muted"}`}
              >
                <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${form.notifications[item.key as keyof typeof form.notifications] ? "translate-x-5" : "translate-x-0.5"}`} />
              </button>
            </label>
          ))}
        </div>
      </motion.div>

      <button onClick={handleSave} className="btn-gold px-6 py-3 rounded-xl text-sm font-semibold flex items-center gap-2">
        <Save className="w-4 h-4" /> Save Settings
      </button>
    </div>
  );
}
