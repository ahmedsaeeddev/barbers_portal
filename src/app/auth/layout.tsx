import { Scissors } from "lucide-react";
import Link from "next/link";
import { BRAND } from "@/lib/constants";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* Left - Brand Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-charcoal relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.12),_transparent_60%)]" />
        <div className="relative z-10 text-center px-12 max-w-md">
          <Link href="/" className="inline-flex items-center gap-3 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center shadow-xl shadow-gold/20">
              <Scissors className="w-7 h-7 text-charcoal" />
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-3">{BRAND.name}</h1>
          <p className="text-lg text-white/50 mb-2">{BRAND.nameUrdu}</p>
          <p className="text-sm text-white/40 leading-relaxed">{BRAND.tagline}</p>
          <div className="mt-12 flex items-center justify-center gap-6 text-white/30 text-xs">
            <span>150+ Shops</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span>8 Cities</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span>10K+ Reviews</span>
          </div>
        </div>
      </div>

      {/* Right - Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-8 py-12 bg-background">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
