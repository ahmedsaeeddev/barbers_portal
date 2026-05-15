"use client";

import { motion } from "framer-motion";
import { QrCode, Download, Share2, Copy, Check } from "lucide-react";
import { useState } from "react";
import { mockBarberShops } from "@/lib/mock-data";
import { BRAND } from "@/lib/constants";

export default function QRPage() {
  const shop = mockBarberShops[0];
  const [copied, setCopied] = useState(false);
  const profileUrl = `https://nayibhaee.pk/${shop.slug}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">QR Code</h1>
        <p className="text-sm text-muted-foreground mt-1">Your shop&apos;s unique QR code for instant discovery</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* QR Display */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="premium-card p-8 text-center">
          <div className="w-64 h-64 mx-auto bg-white rounded-3xl p-6 shadow-xl mb-6">
            <div className="w-full h-full border-4 border-charcoal rounded-2xl flex items-center justify-center relative">
              <QrCode className="w-32 h-32 text-charcoal" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 rounded-lg bg-gold flex items-center justify-center">
                  <span className="text-charcoal font-bold text-sm">NB</span>
                </div>
              </div>
            </div>
          </div>
          <h3 className="font-bold text-lg mb-1">{shop.name}</h3>
          <p className="text-sm text-muted-foreground mb-4">Scan to view shop profile</p>

          <div className="flex gap-3 justify-center">
            <button className="btn-gold px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2">
              <Download className="w-4 h-4" /> Download
            </button>
            <button className="px-5 py-2.5 rounded-xl border border-border text-sm font-semibold flex items-center gap-2 hover:border-gold/50 transition-all">
              <Share2 className="w-4 h-4" /> Share
            </button>
          </div>
        </motion.div>

        {/* Info */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-4">
          <div className="premium-card p-6">
            <h3 className="font-bold mb-3">Profile URL</h3>
            <div className="flex items-center gap-2">
              <div className="flex-1 px-4 py-3 rounded-xl bg-background border border-border text-sm text-muted-foreground truncate">{profileUrl}</div>
              <button onClick={handleCopy} className="px-4 py-3 rounded-xl border border-border hover:border-gold/50 transition-all">
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="premium-card p-6">
            <h3 className="font-bold mb-3">How to use your QR Code</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2"><span className="text-gold font-bold">1.</span> Print the QR code and display it at your shop entrance</li>
              <li className="flex items-start gap-2"><span className="text-gold font-bold">2.</span> Add it to your business cards and marketing materials</li>
              <li className="flex items-start gap-2"><span className="text-gold font-bold">3.</span> Share it on social media for instant customer access</li>
              <li className="flex items-start gap-2"><span className="text-gold font-bold">4.</span> Customers scan and instantly see your services, pricing & reviews</li>
            </ul>
          </div>

          <div className="premium-card p-6">
            <h3 className="font-bold mb-2">QR Scan Stats</h3>
            <div className="grid grid-cols-2 gap-4 mt-3">
              <div className="text-center p-3 rounded-xl bg-muted/50">
                <p className="text-2xl font-bold text-gold">340</p>
                <p className="text-xs text-muted-foreground">Total Scans</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-muted/50">
                <p className="text-2xl font-bold text-gold">52</p>
                <p className="text-xs text-muted-foreground">This Week</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
