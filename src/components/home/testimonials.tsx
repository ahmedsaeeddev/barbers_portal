"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { mockReviews } from "@/lib/mock-data";

export default function Testimonials() {
  const testimonials = mockReviews.slice(0, 6);

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-gold text-sm font-semibold uppercase tracking-wider">Reviews</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2">What Customers Say</h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            Real reviews from real customers across Pakistan.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="premium-card p-6 relative"
            >
              <Quote className="w-8 h-8 text-gold/20 absolute top-4 right-4" />
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    className={`w-4 h-4 ${j < review.rating ? "text-gold fill-gold" : "text-muted-foreground/30"}`}
                  />
                ))}
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed mb-4">&ldquo;{review.comment}&rdquo;</p>
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold/30 to-gold/10 flex items-center justify-center">
                  <span className="text-sm font-bold text-gold">{review.customerName[0]}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold">{review.customerName}</p>
                  <p className="text-xs text-muted-foreground">{review.date}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
