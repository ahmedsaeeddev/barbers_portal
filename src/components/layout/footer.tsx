"use client";

import Link from "next/link";
import { Scissors, Heart, ArrowUp, Mail, Phone, MapPin } from "lucide-react";
import { FaInstagram as Instagram, FaFacebookF as Facebook, FaXTwitter as X } from "react-icons/fa6";
import { BRAND, NAV_LINKS } from "@/lib/constants";

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative bg-charcoal text-white">
      {/* Gold accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
                <Scissors className="w-5 h-5 text-charcoal" />
              </div>
              <div>
                <h3 className="text-lg font-bold">{BRAND.name}</h3>
                <p className="text-xs text-white/40">{BRAND.nameUrdu}</p>
              </div>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              {BRAND.tagline}. Helping barber shops across Pakistan create their digital presence and grow their business.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Instagram, href: BRAND.socials.instagram },
                { icon: Facebook, href: BRAND.socials.facebook },
                { icon: X, href: BRAND.socials.twitter },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-gold/20 flex items-center justify-center text-white/40 hover:text-gold transition-all"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-gold transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Barbers */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gold mb-4">For Barbers</h4>
            <ul className="space-y-3">
              {[
                { label: "Register Your Shop", href: "/auth/register" },
                { label: "Pricing Plans", href: "/pricing" },
                { label: "Dashboard", href: "/dashboard" },
                { label: "How It Works", href: "/#how-it-works" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-gold transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-white/60">
                <Mail className="w-4 h-4 mt-0.5 text-gold/60 shrink-0" />
                {BRAND.email}
              </li>
              <li className="flex items-start gap-2.5 text-sm text-white/60">
                <Phone className="w-4 h-4 mt-0.5 text-gold/60 shrink-0" />
                {BRAND.phone}
              </li>
              <li className="flex items-start gap-2.5 text-sm text-white/60">
                <MapPin className="w-4 h-4 mt-0.5 text-gold/60 shrink-0" />
                {BRAND.address}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved. {BRAND.parentTagline}.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-white/40 flex items-center gap-1">
              Made with <Heart className="w-3 h-3 text-red-400 fill-red-400" /> in Pakistan
            </span>
            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-lg bg-white/5 hover:bg-gold/20 flex items-center justify-center text-white/40 hover:text-gold transition-all"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
