"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Star, MapPin, Clock, ArrowRight, BadgeCheck } from "lucide-react";
import { mockBarberShops } from "@/lib/mock-data";

export default function FeaturedShops() {
  const featured = mockBarberShops.filter((s) => s.isPremium).slice(0, 3);

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-gold text-sm font-semibold uppercase tracking-wider">Featured</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2">Top Rated Barber Shops</h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            Discover the best barber shops in Pakistan, handpicked for quality and excellence.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((shop, i) => (
            <motion.div
              key={shop.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={`/barbers/${shop.slug}`} className="block premium-card overflow-hidden group">
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url(${shop.coverImage})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    {shop.isVerified && (
                      <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gold/90 text-charcoal text-xs font-semibold">
                        <BadgeCheck className="w-3.5 h-3.5" />
                        Verified
                      </span>
                    )}
                    {shop.isOpen && (
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-500/90 text-white text-xs font-semibold flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        Open
                      </span>
                    )}
                  </div>
                  {/* Rating */}
                  <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-sm text-white text-sm font-medium">
                    <Star className="w-3.5 h-3.5 text-gold fill-gold" />
                    {shop.rating}
                    <span className="text-white/50 text-xs">({shop.totalReviews})</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <h3 className="text-lg font-bold group-hover:text-gold transition-colors">{shop.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      {shop.area}, {shop.city}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {shop.timings[0]?.openTime} - {shop.timings[0]?.closeTime}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {shop.services.slice(0, 3).map((s) => (
                      <span key={s.id} className="px-2.5 py-1 rounded-lg bg-muted text-xs font-medium text-muted-foreground">
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/barbers"
            className="inline-flex items-center gap-2 text-gold hover:text-gold-light font-semibold transition-colors group"
          >
            View All Barber Shops
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
