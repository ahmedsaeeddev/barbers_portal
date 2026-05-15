"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Check, Trash2, Send } from "lucide-react";
import { mockNotifications } from "@/lib/mock-data";
import { useToastStore } from "@/components/ui/toast";

export default function AdminNotificationsPage() {
  const [notifs, setNotifs] = useState(mockNotifications);
  const [newNotif, setNewNotif] = useState({ title: "", message: "" });
  const { addToast } = useToastStore();

  const sendNotification = () => {
    if (!newNotif.title || !newNotif.message) return;
    setNotifs([
      { id: Date.now().toString(), ...newNotif, type: "info", read: false, date: new Date().toISOString().split("T")[0] },
      ...notifs,
    ]);
    setNewNotif({ title: "", message: "" });
    addToast("Notification sent!", "success");
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold">Notifications</h1>
        <p className="text-sm text-muted-foreground mt-1">Send and manage notifications</p>
      </div>

      {/* Send New */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="premium-card p-6 space-y-4">
        <h3 className="font-bold">Send Notification</h3>
        <input type="text" value={newNotif.title} onChange={(e) => setNewNotif({ ...newNotif, title: e.target.value })} placeholder="Title" className="w-full px-4 py-3 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" />
        <textarea value={newNotif.message} onChange={(e) => setNewNotif({ ...newNotif, message: e.target.value })} placeholder="Message..." rows={2} className="w-full px-4 py-3 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 resize-none" />
        <button onClick={sendNotification} className="btn-gold px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2">
          <Send className="w-4 h-4" /> Send
        </button>
      </motion.div>

      {/* List */}
      <div className="space-y-2">
        {notifs.map((n, i) => (
          <motion.div key={n.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }} className={`premium-card px-5 py-4 flex items-center justify-between ${!n.read ? "border-gold/20" : ""}`}>
            <div className="flex items-center gap-3">
              <Bell className={`w-4 h-4 ${!n.read ? "text-gold" : "text-muted-foreground/40"}`} />
              <div>
                <p className="text-sm font-medium">{n.title}</p>
                <p className="text-xs text-muted-foreground">{n.message}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{n.date}</p>
              </div>
            </div>
            <button onClick={() => setNotifs(notifs.filter((x) => x.id !== n.id))} className="p-2 rounded-lg hover:bg-red-500/10 text-muted-foreground hover:text-red-400">
              <Trash2 className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
