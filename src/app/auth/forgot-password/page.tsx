"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, CheckCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) { setError("Valid email required"); return; }
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSent(true);
  };

  if (sent) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-emerald-500" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Check Your Email</h2>
        <p className="text-sm text-muted-foreground mb-6">We&apos;ve sent a password reset link to <strong>{email}</strong></p>
        <Link href="/auth/login" className="btn-gold inline-block px-8 py-3 rounded-xl text-sm font-semibold">Back to Login</Link>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <Link href="/auth/login" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to login
      </Link>
      <h2 className="text-2xl font-bold mb-1">Forgot Password?</h2>
      <p className="text-sm text-muted-foreground mb-6">Enter your email and we&apos;ll send you a reset link.</p>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="text-sm font-medium mb-1.5 block">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={`w-full px-4 py-3 rounded-xl bg-card border text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 ${error ? "border-red-500" : "border-border"}`} placeholder="you@example.com" />
          {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
        <button type="submit" disabled={loading} className="btn-gold w-full py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-60">
          {loading ? <div className="w-5 h-5 border-2 border-charcoal/30 border-t-charcoal rounded-full animate-spin" /> : <><Mail className="w-4 h-4" /> Send Reset Link</>}
        </button>
      </form>
    </motion.div>
  );
}
