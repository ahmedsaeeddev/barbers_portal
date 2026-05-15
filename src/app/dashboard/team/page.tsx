"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, X, Save } from "lucide-react";
import { mockBarberShops } from "@/lib/mock-data";
import { useToastStore } from "@/components/ui/toast";
import { BarberTeamMember } from "@/types";

export default function TeamPage() {
  const [team, setTeam] = useState<BarberTeamMember[]>([...mockBarberShops[0].team]);
  const [editing, setEditing] = useState<BarberTeamMember | null>(null);
  const [showModal, setShowModal] = useState(false);
  const { addToast } = useToastStore();

  const blank: BarberTeamMember = { id: "", name: "", role: "", specialties: [], experience: 0, image: "" };
  const openAdd = () => { setEditing({ ...blank, id: Date.now().toString() }); setShowModal(true); };
  const openEdit = (m: BarberTeamMember) => { setEditing({ ...m }); setShowModal(true); };

  const handleSave = () => {
    if (!editing) return;
    const exists = team.find((t) => t.id === editing.id);
    if (exists) {
      setTeam(team.map((t) => (t.id === editing.id ? editing : t)));
      addToast("Team member updated!", "success");
    } else {
      setTeam([...team, editing]);
      addToast("Team member added!", "success");
    }
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Barber Team</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your team members</p>
        </div>
        <button onClick={openAdd} className="btn-gold px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Member
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {team.map((member, i) => (
          <motion.div key={member.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="premium-card p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold/30 to-gold/10 flex items-center justify-center">
                <span className="text-xl font-bold text-gold">{member.name[0]}</span>
              </div>
              <div className="flex gap-1">
                <button onClick={() => openEdit(member)} className="p-2 rounded-lg hover:bg-muted/50 text-muted-foreground hover:text-foreground"><Pencil className="w-4 h-4" /></button>
                <button onClick={() => { setTeam(team.filter((t) => t.id !== member.id)); addToast("Removed", "info"); }} className="p-2 rounded-lg hover:bg-red-500/10 text-muted-foreground hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
            <h3 className="font-bold">{member.name}</h3>
            <p className="text-sm text-gold">{member.role}</p>
            <p className="text-xs text-muted-foreground mt-1">{member.experience} years experience</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {member.specialties.map((s) => (
                <span key={s} className="px-2 py-0.5 rounded-md bg-muted text-[10px] text-muted-foreground">{s}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && editing && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} onClick={(e) => e.stopPropagation()} className="bg-card border border-border rounded-2xl w-full max-w-lg p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold">{team.find((t) => t.id === editing.id) ? "Edit" : "Add"} Team Member</h3>
                <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-muted/50"><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Name</label>
                  <input type="text" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Role</label>
                    <input type="text" value={editing.role} onChange={(e) => setEditing({ ...editing, role: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Experience (years)</label>
                    <input type="number" value={editing.experience} onChange={(e) => setEditing({ ...editing, experience: Number(e.target.value) })} className="w-full px-4 py-3 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Specialties (comma-separated)</label>
                  <input type="text" value={editing.specialties.join(", ")} onChange={(e) => setEditing({ ...editing, specialties: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} className="w-full px-4 py-3 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" />
                </div>
                <button onClick={handleSave} className="btn-gold w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"><Save className="w-4 h-4" /> Save</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
