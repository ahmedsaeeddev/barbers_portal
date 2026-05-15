"use client";

import { motion } from "framer-motion";
import { Search, Shield, Store, User } from "lucide-react";
import { useState } from "react";

const mockUsers = [
  { id: "1", name: "Ahmed Khan", email: "ahmed@email.com", role: "owner", shop: "Royal Cuts", date: "2024-01-15", status: "active" },
  { id: "2", name: "Sultan Mehmood", email: "sultan@email.com", role: "owner", shop: "Sultan's Lounge", date: "2023-06-20", status: "active" },
  { id: "3", name: "Hamza Tariq", email: "hamza@email.com", role: "owner", shop: "Gentlemen's Corner", date: "2024-03-10", status: "active" },
  { id: "4", name: "Admin User", email: "admin@nayibhaee.pk", role: "admin", shop: null, date: "2023-01-01", status: "active" },
  { id: "5", name: "Imran Shah", email: "imran@email.com", role: "owner", shop: "Karachi Cutz", date: "2024-02-20", status: "suspended" },
];

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");
  const filtered = mockUsers.filter((u) => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Users</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage platform users</p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search users..." className="w-full pl-11 pr-4 py-3 rounded-xl bg-card border border-border text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" />
      </div>

      <div className="premium-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="px-6 py-4 font-semibold text-muted-foreground">User</th>
                <th className="px-6 py-4 font-semibold text-muted-foreground">Role</th>
                <th className="px-6 py-4 font-semibold text-muted-foreground">Shop</th>
                <th className="px-6 py-4 font-semibold text-muted-foreground">Joined</th>
                <th className="px-6 py-4 font-semibold text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((user) => (
                <tr key={user.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-gold/30 to-gold/10 flex items-center justify-center">
                        <span className="text-xs font-bold text-gold">{user.name[0]}</span>
                      </div>
                      <div>
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-bold ${user.role === "admin" ? "bg-red-500/10 text-red-400" : "bg-blue-500/10 text-blue-400"}`}>
                      {user.role === "admin" ? <Shield className="w-3 h-3" /> : <Store className="w-3 h-3" />}
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{user.shop || "—"}</td>
                  <td className="px-6 py-4 text-muted-foreground">{user.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded-md text-xs font-bold ${user.status === "active" ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-400"}`}>{user.status}</span>
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
