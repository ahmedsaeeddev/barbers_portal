"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, Tag } from "lucide-react";
import { SERVICE_CATEGORIES } from "@/lib/constants";
import { useToastStore } from "@/components/ui/toast";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<string[]>([...SERVICE_CATEGORIES]);
  const [newCat, setNewCat] = useState("");
  const { addToast } = useToastStore();

  const addCategory = () => {
    if (!newCat.trim()) return;
    setCategories([...categories, newCat.trim()]);
    setNewCat("");
    addToast("Category added!", "success");
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold">Categories</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage service categories</p>
      </div>

      <div className="flex gap-3">
        <input type="text" value={newCat} onChange={(e) => setNewCat(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addCategory()} placeholder="New category name..." className="flex-1 px-4 py-3 rounded-xl bg-card border border-border text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" />
        <button onClick={addCategory} className="btn-gold px-5 py-3 rounded-xl text-sm font-semibold flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>

      <div className="space-y-2">
        {categories.map((cat, i) => (
          <motion.div key={`${cat}-${i}`} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className="premium-card px-5 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Tag className="w-4 h-4 text-gold" />
              <span className="font-medium text-sm">{cat}</span>
            </div>
            <button onClick={() => { setCategories(categories.filter((_, j) => j !== i)); addToast("Removed", "info"); }} className="p-2 rounded-lg hover:bg-red-500/10 text-muted-foreground hover:text-red-400">
              <Trash2 className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
