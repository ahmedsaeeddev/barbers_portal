"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { useAppStore } from "@/lib/store";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAppStore();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 6) e.password = "Min 6 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    // Mock login - determine role from email
    const role = form.email.includes("admin") ? "admin" as const : "owner" as const;
    login({
      id: "1",
      name: role === "admin" ? "Admin User" : "Ahmed Khan",
      email: form.email,
      role,
      avatar: "",
      shopId: role === "owner" ? "1" : undefined,
    });
    setLoading(false);
    router.push(role === "admin" ? "/admin" : "/dashboard");
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="lg:hidden text-center mb-8">
        <h1 className="text-2xl font-bold">Welcome Back</h1>
        <p className="text-sm text-muted-foreground mt-1">Sign in to your Nayi Bhaee account</p>
      </div>
      <div className="hidden lg:block mb-8">
        <h2 className="text-2xl font-bold">Sign In</h2>
        <p className="text-sm text-muted-foreground mt-1">Welcome back! Please enter your credentials.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="text-sm font-medium mb-1.5 block">Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={`w-full px-4 py-3 rounded-xl bg-card border text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all ${errors.email ? "border-red-500" : "border-border"}`}
            placeholder="you@example.com"
          />
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="text-sm font-medium mb-1.5 block">Password</label>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className={`w-full px-4 py-3 pr-12 rounded-xl bg-card border text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all ${errors.password ? "border-red-500" : "border-border"}`}
              placeholder="••••••••"
            />
            <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 rounded border-border accent-gold" />
            <span className="text-sm text-muted-foreground">Remember me</span>
          </label>
          <Link href="/auth/forgot-password" className="text-sm text-gold hover:text-gold-light font-medium">Forgot password?</Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-gold w-full py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-charcoal/30 border-t-charcoal rounded-full animate-spin" />
          ) : (
            <>
              <LogIn className="w-4 h-4" />
              Sign In
            </>
          )}
        </button>
      </form>

      <p className="text-sm text-center text-muted-foreground mt-6">
        Don&apos;t have an account?{" "}
        <Link href="/auth/register" className="text-gold hover:text-gold-light font-medium">Create one</Link>
      </p>

      <p className="text-xs text-center text-muted-foreground mt-4">
        Tip: Use &quot;admin@&quot; in email for admin login, anything else for shop owner.
      </p>
    </motion.div>
  );
}
