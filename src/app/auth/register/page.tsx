"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { CITIES } from "@/lib/constants";

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAppStore();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirmPassword: "", shopName: "", city: "", agree: false });
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);

  const validateStep1 = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.email.trim()) e.email = "Required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email";
    if (!form.phone.trim()) e.phone = "Required";
    if (!form.password) e.password = "Required";
    else if (form.password.length < 6) e.password = "Min 6 characters";
    if (form.password !== form.confirmPassword) e.confirmPassword = "Passwords don't match";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e: Record<string, string> = {};
    if (!form.shopName.trim()) e.shopName = "Required";
    if (!form.city) e.city = "Required";
    if (!form.agree) e.agree = "You must agree";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 2 && !validateStep2()) return;
    setStep(3); // OTP step
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    login({ id: "1", name: form.name, email: form.email, role: "owner", avatar: "", shopId: "1" });
    setLoading(false);
    router.push("/dashboard");
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 3) {
      const next = document.getElementById(`otp-${index + 1}`);
      next?.focus();
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      {/* Step Indicator */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${step >= s ? "bg-gold text-charcoal" : "bg-muted text-muted-foreground"}`}>{s}</div>
            {s < 3 && <div className={`w-8 h-0.5 ${step > s ? "bg-gold" : "bg-muted"}`} />}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div>
          <h2 className="text-2xl font-bold mb-1">Create Account</h2>
          <p className="text-sm text-muted-foreground mb-6">Enter your personal details</p>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Full Name</label>
              <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={`w-full px-4 py-3 rounded-xl bg-card border text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 ${errors.name ? "border-red-500" : "border-border"}`} placeholder="Your full name" />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Email</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={`w-full px-4 py-3 rounded-xl bg-card border text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 ${errors.email ? "border-red-500" : "border-border"}`} placeholder="you@example.com" />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Phone Number</label>
              <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={`w-full px-4 py-3 rounded-xl bg-card border text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 ${errors.phone ? "border-red-500" : "border-border"}`} placeholder="+92 3XX XXXXXXX" />
              {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Password</label>
              <div className="relative">
                <input type={showPass ? "text" : "password"} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className={`w-full px-4 py-3 pr-12 rounded-xl bg-card border text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 ${errors.password ? "border-red-500" : "border-border"}`} placeholder="••••••••" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"><EyeOff className="w-4 h-4" /></button>
              </div>
              {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Confirm Password</label>
              <input type="password" value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} className={`w-full px-4 py-3 rounded-xl bg-card border text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 ${errors.confirmPassword ? "border-red-500" : "border-border"}`} placeholder="••••••••" />
              {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>}
            </div>
            <button type="button" onClick={handleNext} className="btn-gold w-full py-3.5 rounded-xl text-sm font-semibold">Next Step</button>
          </div>
        </div>
      )}

      {step === 2 && (
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-1">Shop Details</h2>
          <p className="text-sm text-muted-foreground mb-6">Tell us about your barber shop</p>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Shop Name</label>
              <input type="text" value={form.shopName} onChange={(e) => setForm({ ...form, shopName: e.target.value })} className={`w-full px-4 py-3 rounded-xl bg-card border text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 ${errors.shopName ? "border-red-500" : "border-border"}`} placeholder="Your Barber Shop" />
              {errors.shopName && <p className="text-xs text-red-500 mt-1">{errors.shopName}</p>}
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">City</label>
              <select value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className={`w-full px-4 py-3 rounded-xl bg-card border text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 ${errors.city ? "border-red-500" : "border-border"}`}>
                <option value="">Select city</option>
                {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
            </div>
            <label className="flex items-start gap-2 cursor-pointer">
              <input type="checkbox" checked={form.agree} onChange={(e) => setForm({ ...form, agree: e.target.checked })} className="mt-0.5 accent-gold" />
              <span className="text-sm text-muted-foreground">I agree to the Terms of Service and Privacy Policy</span>
            </label>
            {errors.agree && <p className="text-xs text-red-500">{errors.agree}</p>}
            <div className="flex gap-3">
              <button type="button" onClick={() => setStep(1)} className="flex-1 py-3.5 rounded-xl border border-border text-sm font-semibold hover:bg-muted/50 transition-all">Back</button>
              <button type="submit" className="flex-1 btn-gold py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2">
                <UserPlus className="w-4 h-4" /> Register
              </button>
            </div>
          </div>
        </form>
      )}

      {step === 3 && (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-1">Verify Your Email</h2>
          <p className="text-sm text-muted-foreground mb-8">We sent a 4-digit code to {form.email}</p>
          <div className="flex justify-center gap-3 mb-8">
            {otp.map((digit, i) => (
              <input
                key={i}
                id={`otp-${i}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(i, e.target.value)}
                className="w-14 h-14 text-center text-2xl font-bold rounded-xl bg-card border border-border focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
              />
            ))}
          </div>
          <button onClick={handleVerifyOtp} disabled={loading || otp.some((d) => !d)} className="btn-gold w-full py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-60">
            {loading ? <div className="w-5 h-5 border-2 border-charcoal/30 border-t-charcoal rounded-full animate-spin" /> : "Verify & Continue"}
          </button>
          <button className="text-sm text-gold hover:text-gold-light font-medium mt-4">Resend Code</button>
        </div>
      )}

      <p className="text-sm text-center text-muted-foreground mt-6">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-gold hover:text-gold-light font-medium">Sign In</Link>
      </p>
    </motion.div>
  );
}
