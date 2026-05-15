"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Star, MapPin, Clock, Phone, MessageSquare, Share2, QrCode,
  BadgeCheck, ChevronLeft, ExternalLink, Copy, Check, Scissors, Users, Image as ImageIcon
} from "lucide-react";
import { mockBarberShops, mockReviews } from "@/lib/mock-data";
import { formatPrice } from "@/lib/utils";

export default function BarberProfilePage() {
  const { slug } = useParams();
  const shop = mockBarberShops.find((s) => s.slug === slug);
  const reviews = mockReviews.filter((r) => r.shopId === shop?.id);
  const [activeTab, setActiveTab] = useState<"services" | "team" | "reviews" | "gallery">("services");
  const [copied, setCopied] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!shop) {
    return (
      <div className="pt-32 pb-16 text-center">
        <h1 className="text-2xl font-bold mb-2">Shop Not Found</h1>
        <p className="text-muted-foreground mb-6">The barber shop you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/barbers" className="btn-gold px-6 py-3 rounded-xl text-sm font-semibold">Browse Shops</Link>
      </div>
    );
  }

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const tabs = [
    { id: "services", label: "Services", icon: Scissors, count: shop.services.length },
    { id: "team", label: "Team", icon: Users, count: shop.team.length },
    { id: "reviews", label: "Reviews", icon: Star, count: reviews.length },
    { id: "gallery", label: "Gallery", icon: ImageIcon, count: shop.images.length },
  ] as const;

  return (
    <div className="pt-16">
      {/* Hero Banner */}
      <div className="relative h-64 sm:h-80 lg:h-96">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${shop.coverImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute top-20 left-4 sm:left-8">
          <Link
            href="/barbers"
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-black/40 backdrop-blur-sm text-white text-sm hover:bg-black/60 transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shop Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="premium-card p-6 sm:p-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-gold/30 to-gold/10 flex items-center justify-center shrink-0">
                  <span className="text-2xl font-bold text-gold">{shop.name[0]}</span>
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h1 className="text-2xl sm:text-3xl font-bold">{shop.name}</h1>
                    {shop.isVerified && (
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-gold/10 text-gold text-xs font-semibold">
                        <BadgeCheck className="w-3.5 h-3.5" /> Verified
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mt-2">
                    <span className="flex items-center gap-1.5">
                      <Star className="w-4 h-4 text-gold fill-gold" />
                      <strong className="text-foreground">{shop.rating}</strong> ({shop.totalReviews} reviews)
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" />
                      {shop.address}, {shop.city}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{shop.description}</p>
                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {shop.badges.map((b) => (
                      <span key={b} className="px-3 py-1 rounded-lg bg-muted text-xs font-medium">{b}</span>
                    ))}
                    <span className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 ${shop.isOpen ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"}`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${shop.isOpen ? "bg-emerald-500 animate-pulse" : "bg-red-500"}`} />
                      {shop.isOpen ? "Open Now" : "Closed"}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Tabs */}
            <div className="flex gap-1 p-1 rounded-xl bg-muted/50 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${activeTab === tab.id ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                  <span className="text-xs opacity-60">({tab.count})</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              {activeTab === "services" && (
                <div className="space-y-3">
                  {shop.services.map((service) => (
                    <div key={service.id} className="premium-card p-5 flex items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{service.name}</h3>
                          {service.isPopular && (
                            <span className="px-2 py-0.5 rounded-md bg-gold/10 text-gold text-[10px] font-bold uppercase">Popular</span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-0.5">{service.description}</p>
                        <span className="text-xs text-muted-foreground">{service.duration} min</span>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-lg font-bold text-gold">{formatPrice(service.price)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "team" && (
                <div className="grid sm:grid-cols-2 gap-4">
                  {shop.team.map((member) => (
                    <div key={member.id} className="premium-card p-5 flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold/30 to-gold/10 flex items-center justify-center shrink-0">
                        <span className="text-lg font-bold text-gold">{member.name[0]}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold">{member.name}</h3>
                        <p className="text-sm text-gold">{member.role}</p>
                        <p className="text-xs text-muted-foreground mt-1">{member.experience} years experience</p>
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {member.specialties.map((s) => (
                            <span key={s} className="px-2 py-0.5 rounded-md bg-muted text-[10px] text-muted-foreground">{s}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="space-y-4">
                  {reviews.length === 0 ? (
                    <div className="premium-card p-12 text-center">
                      <Star className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
                      <p className="text-muted-foreground">No reviews yet</p>
                    </div>
                  ) : (
                    reviews.map((review) => (
                      <div key={review.id} className="premium-card p-5">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold/30 to-gold/10 flex items-center justify-center">
                            <span className="text-sm font-bold text-gold">{review.customerName[0]}</span>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm">{review.customerName}</h4>
                            <p className="text-xs text-muted-foreground">{review.date}</p>
                          </div>
                          <div className="flex items-center gap-0.5">
                            {Array.from({ length: 5 }).map((_, j) => (
                              <Star key={j} className={`w-3.5 h-3.5 ${j < review.rating ? "text-gold fill-gold" : "text-muted-foreground/20"}`} />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-foreground/80 leading-relaxed">{review.comment}</p>
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeTab === "gallery" && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {shop.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(img)}
                      className="relative aspect-square rounded-xl overflow-hidden group"
                    >
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                        style={{ backgroundImage: `url(${img})` }}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Timings */}
            <div className="premium-card p-6">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-gold" />
                Business Hours
              </h3>
              <div className="space-y-2">
                {shop.timings.map((t) => (
                  <div key={t.day} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <span className="text-sm font-medium">{t.day}</span>
                    <span className={`text-sm ${t.isClosed ? "text-red-400" : "text-muted-foreground"}`}>
                      {t.isClosed ? "Closed" : `${t.openTime} – ${t.closeTime}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Sticky */}
          <div className="space-y-6">
            <div className="lg:sticky lg:top-24 space-y-4">
              {/* Contact Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="premium-card p-6 space-y-4"
              >
                <h3 className="font-bold">Contact Shop</h3>
                <a
                  href={`https://wa.me/${shop.whatsapp.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  WhatsApp
                </a>
                <a
                  href={`tel:${shop.phone}`}
                  className="w-full py-3 rounded-xl border border-border hover:border-gold/50 font-semibold text-sm flex items-center justify-center gap-2 transition-all"
                >
                  <Phone className="w-4 h-4" />
                  Call Now
                </a>
                <button
                  onClick={handleShare}
                  className="w-full py-3 rounded-xl border border-border hover:border-gold/50 text-sm font-medium flex items-center justify-center gap-2 transition-all"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
                  {copied ? "Link Copied!" : "Share Profile"}
                </button>
              </motion.div>

              {/* QR Code Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="premium-card p-6 text-center"
              >
                <QrCode className="w-12 h-12 text-gold mx-auto mb-3" />
                <h3 className="font-bold mb-1">QR Code</h3>
                <p className="text-xs text-muted-foreground mb-4">Scan to view this shop profile</p>
                <div className="w-40 h-40 mx-auto bg-white rounded-2xl p-3 flex items-center justify-center">
                  <div className="w-full h-full border-4 border-charcoal rounded-xl flex items-center justify-center">
                    <QrCode className="w-16 h-16 text-charcoal" />
                  </div>
                </div>
              </motion.div>

              {/* Location Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="premium-card p-6"
              >
                <h3 className="font-bold mb-3 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-gold" />
                  Location
                </h3>
                <div className="aspect-video rounded-xl bg-muted overflow-hidden relative mb-3">
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <MapPin className="w-8 h-8 mx-auto mb-2 text-gold" />
                      <p className="text-xs">Map View</p>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{shop.address}, {shop.city}</p>
                <a
                  href={`https://www.google.com/maps?q=${shop.latitude},${shop.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 text-sm text-gold hover:text-gold-light flex items-center gap-1 font-medium"
                >
                  Get Directions <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
          <button className="absolute top-4 right-4 text-white/60 hover:text-white">
            <span className="text-3xl">&times;</span>
          </button>
          <img src={selectedImage} alt="Gallery" className="max-w-full max-h-[90vh] rounded-xl object-contain" />
        </div>
      )}
    </div>
  );
}
