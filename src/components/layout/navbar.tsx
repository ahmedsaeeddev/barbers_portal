"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Scissors, Sun, Moon, User, LogIn } from "lucide-react";
import { useTheme } from "next-themes";
import { NAV_LINKS, BRAND } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/lib/store";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { isAuthenticated, user } = useAppStore();

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-lg shadow-black/5"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center shadow-lg shadow-gold/20 group-hover:shadow-gold/40 transition-shadow">
                <Scissors className="w-5 h-5 text-charcoal" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight leading-none">
                  {BRAND.name}
                </span>
                <span className="text-[10px] text-muted-foreground font-medium tracking-wider uppercase">
                  {BRAND.nameUrdu}
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                      isActive
                        ? "text-gold"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="navbar-active"
                        className="absolute bottom-0 left-2 right-2 h-0.5 bg-gold rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right Section */}
            <div className="hidden lg:flex items-center gap-3">
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
                </button>
              )}

              {isAuthenticated ? (
                <Link
                  href={user?.role === "admin" ? "/admin" : "/dashboard"}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-muted/50 hover:bg-muted text-sm font-medium transition-all"
                >
                  <User className="w-4 h-4" />
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/register"
                    className="btn-gold px-5 py-2.5 rounded-xl text-sm font-semibold inline-flex items-center gap-2"
                  >
                    <LogIn className="w-4 h-4" />
                    Register
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="relative bg-card border-b border-border mt-16 mx-0 shadow-2xl"
            >
              <div className="p-4 space-y-1">
                {NAV_LINKS.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "block px-4 py-3 rounded-xl text-base font-medium transition-all",
                        isActive
                          ? "text-gold bg-gold/10"
                          : "text-foreground hover:bg-muted/50"
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                })}

                <div className="pt-4 mt-4 border-t border-border flex flex-col gap-2">
                  {mounted && (
                    <button
                      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
                    >
                      {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                      {theme === "dark" ? "Light Mode" : "Dark Mode"}
                    </button>
                  )}
                  {!isAuthenticated && (
                    <>
                      <Link
                        href="/auth/login"
                        className="block px-4 py-3 rounded-xl text-base font-medium text-foreground hover:bg-muted/50 transition-all"
                      >
                        Login
                      </Link>
                      <Link
                        href="/auth/register"
                        className="btn-gold block px-4 py-3 rounded-xl text-base font-semibold text-center"
                      >
                        Register Your Shop
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
