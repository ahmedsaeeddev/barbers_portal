"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, X, Save } from "lucide-react";
import { mockBarberShops } from "@/lib/mock-data";
import { formatPrice } from "@/lib/utils";
import { useToastStore } from "@/components/ui/toast";
import { Service } from "@/types";

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([...mockBarberShops[0].services]);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [showModal, setShowModal] = useState(false);
  const { addToast } = useToastStore();

  const blank: Service = { id: "", name: "", category: "", price: 0, duration: 0, description: "", isPopular: false };

  const openAdd = () => { setEditingService({ ...blank, id: Date.now().toString() }); setShowModal(true); };
  const openEdit = (s: Service) => { setEditingService({ ...s }); setShowModal(true); };

  const handleSave = () => {
    if (!editingService) return;
    const exists = services.find((s) => s.id === editingService.id);
    if (exists) {
      setServices(services.map((s) => (s.id === editingService.id ? editingService : s)));
      addToast("Service updated!", "success");
    } else {
      setServices([...services, editingService]);
      addToast("Service added!", "success");
    }
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    setServices(services.filter((s) => s.id !== id));
    addToast("Service removed", "info");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Services</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your shop&apos;s services and pricing</p>
        </div>
        <button onClick={openAdd} className="btn-gold px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Service
        </button>
      </div>

      <div className="space-y-3">
        {services.map((service, i) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            className="premium-card p-5 flex items-center justify-between gap-4"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{service.name}</h3>
                {service.isPopular && <span className="px-2 py-0.5 rounded-md bg-gold/10 text-gold text-[10px] font-bold">Popular</span>}
                <span className="px-2 py-0.5 rounded-md bg-muted text-[10px] text-muted-foreground">{service.category}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-0.5 truncate">{service.description}</p>
              <span className="text-xs text-muted-foreground">{service.duration} min</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-lg font-bold text-gold whitespace-nowrap">{formatPrice(service.price)}</span>
              <button onClick={() => openEdit(service)} className="p-2 rounded-lg hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-all">
                <Pencil className="w-4 h-4" />
              </button>
              <button onClick={() => handleDelete(service.id)} className="p-2 rounded-lg hover:bg-red-500/10 text-muted-foreground hover:text-red-400 transition-all">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && editingService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card border border-border rounded-2xl w-full max-w-lg p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold">{services.find((s) => s.id === editingService.id) ? "Edit Service" : "Add Service"}</h3>
                <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-muted/50"><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Name</label>
                  <input type="text" value={editingService.name} onChange={(e) => setEditingService({ ...editingService, name: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Category</label>
                    <input type="text" value={editingService.category} onChange={(e) => setEditingService({ ...editingService, category: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Price (PKR)</label>
                    <input type="number" value={editingService.price} onChange={(e) => setEditingService({ ...editingService, price: Number(e.target.value) })} className="w-full px-4 py-3 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Duration (min)</label>
                    <input type="number" value={editingService.duration} onChange={(e) => setEditingService({ ...editingService, duration: Number(e.target.value) })} className="w-full px-4 py-3 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" />
                  </div>
                  <div className="flex items-end">
                    <label className="flex items-center gap-2 cursor-pointer pb-3">
                      <input type="checkbox" checked={editingService.isPopular} onChange={(e) => setEditingService({ ...editingService, isPopular: e.target.checked })} className="accent-gold" />
                      <span className="text-sm">Mark as Popular</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Description</label>
                  <textarea value={editingService.description} onChange={(e) => setEditingService({ ...editingService, description: e.target.value })} rows={2} className="w-full px-4 py-3 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 resize-none" />
                </div>
                <button onClick={handleSave} className="btn-gold w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2">
                  <Save className="w-4 h-4" /> Save Service
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
