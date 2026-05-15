"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { BRAND } from "@/lib/constants";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email";
    if (!form.subject.trim()) e.subject = "Subject is required";
    if (!form.message.trim()) e.message = "Message is required";
    else if (form.message.length < 10) e.message = "Message too short";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="pt-32 pb-16">
        <div className="max-w-lg mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="premium-card p-12">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-emerald-500" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Message Sent!</h2>
            <p className="text-muted-foreground mb-6">Thank you for reaching out. We&apos;ll get back to you within 24 hours.</p>
            <button onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }} className="btn-gold px-6 py-3 rounded-xl text-sm font-semibold">
              Send Another Message
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16 pt-8">
          <span className="text-gold text-sm font-semibold uppercase tracking-wider">Contact</span>
          <h1 className="text-3xl sm:text-4xl font-bold mt-2">Get In Touch</h1>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">Have questions about Nayi Bhaee? We&apos;d love to hear from you.</p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Form */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="premium-card p-6 sm:p-8 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Full Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl bg-background border text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all ${errors.name ? "border-red-500" : "border-border"}`}
                    placeholder="Your name"
                  />
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl bg-background border text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all ${errors.email ? "border-red-500" : "border-border"}`}
                    placeholder="you@example.com"
                  />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Subject</label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl bg-background border text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all ${errors.subject ? "border-red-500" : "border-border"}`}
                  placeholder="What is this about?"
                />
                {errors.subject && <p className="text-xs text-red-500 mt-1">{errors.subject}</p>}
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Message</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={5}
                  className={`w-full px-4 py-3 rounded-xl bg-background border text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all resize-none ${errors.message ? "border-red-500" : "border-border"}`}
                  placeholder="Your message..."
                />
                {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
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
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-2 space-y-4">
            {[
              { icon: Mail, label: "Email Us", value: BRAND.email, href: `mailto:${BRAND.email}` },
              { icon: Phone, label: "Call Us", value: BRAND.phone, href: `tel:${BRAND.phone}` },
              { icon: MapPin, label: "Visit Us", value: BRAND.address, href: "#" },
            ].map((item) => (
              <a key={item.label} href={item.href} className="premium-card p-5 flex items-start gap-4 group block">
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center shrink-0 group-hover:bg-gold/20 transition-colors">
                  <item.icon className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-0.5">{item.label}</h3>
                  <p className="text-sm text-muted-foreground">{item.value}</p>
                </div>
              </a>
            ))}

            <div className="premium-card p-6">
              <h3 className="font-semibold mb-2">Business Hours</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between"><span>Monday – Friday</span><span>9:00 AM – 6:00 PM</span></div>
                <div className="flex justify-between"><span>Saturday</span><span>10:00 AM – 4:00 PM</span></div>
                <div className="flex justify-between"><span>Sunday</span><span className="text-red-400">Closed</span></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
