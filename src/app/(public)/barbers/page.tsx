"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, SlidersHorizontal, Grid3X3, List, MapPin, Star, Clock,
  BadgeCheck, X, ChevronDown, ChevronLeft, ChevronRight
} from "lucide-react";
import { mockBarberShops } from "@/lib/mock-data";
import { CITIES } from "@/lib/constants";

export default function BarbersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [openNow, setOpenNow] = useState(false);
  const [sortBy, setSortBy] = useState("rating");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 6;

  const filtered = useMemo(() => {
    let shops = [...mockBarberShops];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      shops = shops.filter(
        (s) => s.name.toLowerCase().includes(q) || s.area.toLowerCase().includes(q) || s.city.toLowerCase().includes(q)
      );
    }
    if (selectedCity) shops = shops.filter((s) => s.city === selectedCity);
    if (minRating) shops = shops.filter((s) => s.rating >= minRating);
    if (openNow) shops = shops.filter((s) => s.isOpen);
    shops.sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "reviews") return b.totalReviews - a.totalReviews;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });
    return shops;
  }, [searchQuery, selectedCity, minRating, openNow, sortBy]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);
  const hasFilters = selectedCity || minRating || openNow;

  const clearFilters = () => {
    setSelectedCity("");
    setMinRating(0);
    setOpenNow(false);
    setCurrentPage(1);
  };

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold">Find Barber Shops</h1>
          <p className="text-muted-foreground mt-2">Discover the best barber shops across Pakistan</p>
        </div>

        {/* Search & Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name, area, or city..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/50 transition-all"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-3.5 rounded-xl border font-medium text-sm flex items-center gap-2 transition-all ${showFilters ? "border-gold text-gold bg-gold/10" : "border-border text-muted-foreground hover:border-foreground/20"}`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {hasFilters && <span className="w-5 h-5 rounded-full bg-gold text-charcoal text-xs flex items-center justify-center font-bold">!</span>}
            </button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3.5 rounded-xl bg-card border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 cursor-pointer"
            >
              <option value="rating">Top Rated</option>
              <option value="reviews">Most Reviewed</option>
              <option value="name">Name A-Z</option>
            </select>
            <div className="hidden sm:flex border border-border rounded-xl overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-3.5 ${viewMode === "grid" ? "bg-gold/10 text-gold" : "text-muted-foreground hover:text-foreground"}`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-3.5 ${viewMode === "list" ? "bg-gold/10 text-gold" : "text-muted-foreground hover:text-foreground"}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-6"
            >
              <div className="premium-card p-6">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* City */}
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">City</label>
                    <select
                      value={selectedCity}
                      onChange={(e) => { setSelectedCity(e.target.value); setCurrentPage(1); }}
                      className="w-full px-3 py-2.5 rounded-lg bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
                    >
                      <option value="">All Cities</option>
                      {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  {/* Rating */}
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Min Rating</label>
                    <select
                      value={minRating}
                      onChange={(e) => { setMinRating(Number(e.target.value)); setCurrentPage(1); }}
                      className="w-full px-3 py-2.5 rounded-lg bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
                    >
                      <option value={0}>Any Rating</option>
                      <option value={4}>4+ Stars</option>
                      <option value={4.5}>4.5+ Stars</option>
                    </select>
                  </div>
                  {/* Open Now */}
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Availability</label>
                    <button
                      onClick={() => { setOpenNow(!openNow); setCurrentPage(1); }}
                      className={`w-full px-3 py-2.5 rounded-lg border text-sm font-medium transition-all ${openNow ? "border-emerald-500 bg-emerald-500/10 text-emerald-500" : "border-border text-muted-foreground hover:border-foreground/20"}`}
                    >
                      {openNow ? "✓ Open Now" : "Open Now"}
                    </button>
                  </div>
                  {/* Clear */}
                  <div className="flex items-end">
                    {hasFilters && (
                      <button onClick={clearFilters} className="w-full px-3 py-2.5 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground flex items-center justify-center gap-2 transition-all">
                        <X className="w-3.5 h-3.5" />
                        Clear Filters
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results count */}
        <p className="text-sm text-muted-foreground mb-6">{filtered.length} barber shop{filtered.length !== 1 ? "s" : ""} found</p>

        {/* Results */}
        {paginated.length === 0 ? (
          <div className="premium-card p-16 text-center">
            <Search className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No shops found</h3>
            <p className="text-sm text-muted-foreground mb-4">Try adjusting your filters or search query</p>
            <button onClick={clearFilters} className="btn-gold px-6 py-2.5 rounded-xl text-sm font-semibold">Clear Filters</button>
          </div>
        ) : (
          <div className={viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
            {paginated.map((shop, i) => (
              <motion.div
                key={shop.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={`/barbers/${shop.slug}`}
                  className={`block premium-card overflow-hidden group ${viewMode === "list" ? "flex" : ""}`}
                >
                  {/* Image */}
                  <div className={`relative overflow-hidden ${viewMode === "list" ? "w-48 shrink-0" : "h-48"}`}>
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                      style={{ backgroundImage: `url(${shop.coverImage})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute top-3 left-3 flex gap-2">
                      {shop.isVerified && (
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-gold/90 text-charcoal text-[11px] font-semibold">
                          <BadgeCheck className="w-3 h-3" /> Verified
                        </span>
                      )}
                    </div>
                    {shop.isOpen && (
                      <span className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-emerald-500/90 text-white text-[11px] font-semibold flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> Open
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5 flex-1">
                    <h3 className="font-bold group-hover:text-gold transition-colors text-lg">{shop.name}</h3>
                    <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {shop.area}, {shop.city}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-gold fill-gold" />
                        {shop.rating}
                        <span className="text-xs">({shop.totalReviews})</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {shop.timings[0]?.openTime} – {shop.timings[0]?.closeTime}
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {shop.services.filter(s => s.isPopular).slice(0, 3).map((s) => (
                        <span key={s.id} className="px-2 py-0.5 rounded-md bg-muted text-[11px] font-medium text-muted-foreground">{s.name}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2.5 rounded-xl border border-border disabled:opacity-30 hover:border-gold/50 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-10 h-10 rounded-xl text-sm font-medium transition-all ${currentPage === i + 1 ? "bg-gold text-charcoal" : "border border-border hover:border-gold/50"}`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2.5 rounded-xl border border-border disabled:opacity-30 hover:border-gold/50 transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
