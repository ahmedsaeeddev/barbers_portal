"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Scissors, LayoutDashboard, Store, Users, MessageSquare, CreditCard,
  Tag, BarChart3, Bell, Menu, X, LogOut, Shield
} from "lucide-react";
import { cn } from "@/lib/utils";
import { BRAND, ADMIN_LINKS } from "@/lib/constants";
import { useAppStore } from "@/lib/store";
import { ToastContainer } from "@/components/ui/toast";

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard, Store, Users, MessageSquare, CreditCard, Tag, BarChart3, Bell,
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { sidebarOpen, setSidebarOpen, logout } = useAppStore();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => { if (isMobile) setSidebarOpen(false); }, [pathname, isMobile, setSidebarOpen]);

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <AnimatePresence>
        {(sidebarOpen || !isMobile) && (
          <>
            {isMobile && sidebarOpen && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={() => setSidebarOpen(false)} />
            )}
            <motion.aside
              initial={isMobile ? { x: -280 } : false}
              animate={{ x: 0 }}
              exit={isMobile ? { x: -280 } : undefined}
              className={cn("fixed top-0 left-0 bottom-0 z-50 w-64 bg-card border-r border-border flex flex-col", !sidebarOpen && !isMobile && "w-16")}
            >
              <div className="h-16 flex items-center px-4 border-b border-border gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center shrink-0">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                {(sidebarOpen || isMobile) && (
                  <div>
                    <p className="text-sm font-bold">{BRAND.name}</p>
                    <p className="text-[10px] text-red-400 font-semibold">Admin Panel</p>
                  </div>
                )}
              </div>
              <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
                {ADMIN_LINKS.map((link) => {
                  const Icon = iconMap[link.icon] || LayoutDashboard;
                  const isActive = pathname === link.href;
                  return (
                    <Link key={link.href} href={link.href} className={cn("flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all", isActive ? "bg-gold/10 text-gold" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground")}>
                      <Icon className="w-5 h-5 shrink-0" />
                      {(sidebarOpen || isMobile) && <span>{link.label}</span>}
                    </Link>
                  );
                })}
              </nav>
              {(sidebarOpen || isMobile) && (
                <div className="p-3 border-t border-border">
                  <Link href="/" onClick={() => logout()} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-red-500/10 hover:text-red-400 transition-all">
                    <LogOut className="w-5 h-5" /> Sign Out
                  </Link>
                </div>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className={cn("transition-all duration-300", sidebarOpen ? "lg:ml-64" : "lg:ml-16")}>
        <header className="sticky top-0 z-30 h-16 bg-background/80 backdrop-blur-xl border-b border-border flex items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50">
              <Menu className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-semibold hidden sm:block">
              {ADMIN_LINKS.find((l) => l.href === pathname)?.label || "Admin"}
            </h2>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-red-500/10">
            <Shield className="w-4 h-4 text-red-400" />
            <span className="text-sm font-medium text-red-400">Admin</span>
          </div>
        </header>
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
      <ToastContainer />
    </div>
  );
}
