"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Scissors, LayoutDashboard, Store, Users, Image, Star, QrCode,
  CreditCard, Settings, Menu, X, LogOut, Bell, ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";
import { BRAND, DASHBOARD_LINKS } from "@/lib/constants";
import { useAppStore } from "@/lib/store";
import { ToastContainer } from "@/components/ui/toast";
import { mockNotifications } from "@/lib/mock-data";

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard, Store, Scissors, Users, Image, Star, QrCode, CreditCard, Settings,
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { sidebarOpen, setSidebarOpen, user, logout } = useAppStore();
  const [showNotifs, setShowNotifs] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const unreadCount = mockNotifications.filter((n) => !n.read).length;

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (isMobile) setSidebarOpen(false);
  }, [pathname, isMobile, setSidebarOpen]);

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <AnimatePresence>
        {(sidebarOpen || !isMobile) && (
          <>
            {isMobile && sidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40 bg-black/60 lg:hidden"
                onClick={() => setSidebarOpen(false)}
              />
            )}
            <motion.aside
              initial={isMobile ? { x: -280 } : false}
              animate={{ x: 0 }}
              exit={isMobile ? { x: -280 } : undefined}
              className={cn(
                "fixed top-0 left-0 bottom-0 z-50 w-64 bg-card border-r border-border flex flex-col",
                !sidebarOpen && !isMobile && "w-16"
              )}
            >
              {/* Logo */}
              <div className="h-16 flex items-center px-4 border-b border-border gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center shrink-0">
                  <Scissors className="w-4 h-4 text-charcoal" />
                </div>
                {(sidebarOpen || isMobile) && (
                  <div className="min-w-0">
                    <p className="text-sm font-bold truncate">{BRAND.name}</p>
                    <p className="text-[10px] text-muted-foreground">Dashboard</p>
                  </div>
                )}
              </div>

              {/* Nav */}
              <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
                {DASHBOARD_LINKS.map((link) => {
                  const Icon = iconMap[link.icon] || LayoutDashboard;
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                        isActive
                          ? "bg-gold/10 text-gold"
                          : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                      )}
                    >
                      <Icon className="w-5 h-5 shrink-0" />
                      {(sidebarOpen || isMobile) && <span>{link.label}</span>}
                    </Link>
                  );
                })}
              </nav>

              {/* Bottom */}
              {(sidebarOpen || isMobile) && (
                <div className="p-3 border-t border-border">
                  <Link
                    href="/"
                    onClick={() => logout()}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-red-500/10 hover:text-red-400 transition-all"
                  >
                    <LogOut className="w-5 h-5" />
                    Sign Out
                  </Link>
                </div>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className={cn("transition-all duration-300", sidebarOpen ? "lg:ml-64" : "lg:ml-16")}>
        {/* Top Bar */}
        <header className="sticky top-0 z-30 h-16 bg-background/80 backdrop-blur-xl border-b border-border flex items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all">
              {sidebarOpen ? <X className="w-5 h-5 lg:hidden" /> : <Menu className="w-5 h-5" />}
              <Menu className="w-5 h-5 hidden lg:block" />
            </button>
            <h2 className="text-lg font-semibold hidden sm:block">
              {DASHBOARD_LINKS.find((l) => l.href === pathname)?.label || "Dashboard"}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Notifications */}
            <div className="relative">
              <button onClick={() => setShowNotifs(!showNotifs)} className="p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all relative">
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-gold text-charcoal text-[10px] font-bold flex items-center justify-center">{unreadCount}</span>
                )}
              </button>
              <AnimatePresence>
                {showNotifs && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute right-0 top-12 w-80 bg-card border border-border rounded-2xl shadow-2xl overflow-hidden z-50"
                  >
                    <div className="p-4 border-b border-border">
                      <h3 className="font-semibold text-sm">Notifications</h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {mockNotifications.map((n) => (
                        <div key={n.id} className={`p-4 border-b border-border last:border-0 ${!n.read ? "bg-gold/5" : ""}`}>
                          <p className="text-sm font-medium">{n.title}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{n.message}</p>
                          <p className="text-[10px] text-muted-foreground mt-1">{n.date}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-muted/50">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-gold/30 to-gold/10 flex items-center justify-center">
                <span className="text-xs font-bold text-gold">{(user?.name || "U")[0]}</span>
              </div>
              <span className="text-sm font-medium hidden sm:block">{user?.name || "User"}</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
      <ToastContainer />
    </div>
  );
}
