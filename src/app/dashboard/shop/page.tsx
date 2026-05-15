"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Save, MapPin, Phone, Mail, Clock, Globe } from "lucide-react";
import { mockBarberShops } from "@/lib/mock-data";
import { useToastStore } from "@/components/ui/toast";

export default function ShopManagementPage() {
  const shop = mockBarberShops[0];
  const { addToast } = useToastStore();
  const [form, setForm] = useState({
    name: shop.name,
    description: shop.description,
    phone: shop.phone,
    whatsapp: shop.whatsapp,
    email: shop.email,
    address: shop.address,
    city: shop.city,
    area: shop.area,
  });
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    addToast("Shop profile updated successfully!", "success");
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Shop Profile</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your barber shop details</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="premium-card p-6 space-y-5">
        <div>
          <label className="text-sm font-medium mb-1.5 block">Shop Name</label>
          <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" />
        </div>
        <div>
          <label className="text-sm font-medium mb-1.5 block">Description</label>
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4} className="w-full px-4 py-3 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 resize-none" />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-1.5 flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-muted-foreground" /> Phone</label>
            <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 flex items-center gap-1.5"><Globe className="w-3.5 h-3.5 text-muted-foreground" /> WhatsApp</label>
            <input type="tel" value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium mb-1.5 flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-muted-foreground" /> Email</label>
          <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" />
        </div>
        <div>
          <label className="text-sm font-medium mb-1.5 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-muted-foreground" /> Address</label>
          <input type="text" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-1.5 block">City</label>
            <input type="text" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Area</label>
            <input type="text" value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" />
          </div>
        </div>

        <button onClick={handleSave} disabled={loading} className="btn-gold px-6 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 disabled:opacity-60">
          {loading ? <div className="w-4 h-4 border-2 border-charcoal/30 border-t-charcoal rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
          Save Changes
        </button>
      </motion.div>

      {/* Timings */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="premium-card p-6">
        <h3 className="font-bold mb-4 flex items-center gap-2"><Clock className="w-5 h-5 text-gold" /> Business Hours</h3>
        <div className="space-y-3">
          {shop.timings.map((t) => (
            <div key={t.day} className="flex items-center gap-4">
              <span className="w-24 text-sm font-medium">{t.day}</span>
              <input type="text" defaultValue={t.openTime} className="flex-1 px-3 py-2 rounded-lg bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" />
              <span className="text-muted-foreground">to</span>
              <input type="text" defaultValue={t.closeTime} className="flex-1 px-3 py-2 rounded-lg bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
