"use client";

import { motion } from "framer-motion";
import { Star, Flag, Check, X } from "lucide-react";
import { useState } from "react";
import { mockReviews } from "@/lib/mock-data";
import { useToastStore } from "@/components/ui/toast";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState(mockReviews);
  const { addToast } = useToastStore();

  const removeReview = (id: string) => {
    setReviews(reviews.filter((r) => r.id !== id));
    addToast("Review removed", "info");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Reviews Moderation</h1>
        <p className="text-sm text-muted-foreground mt-1">Moderate and manage all platform reviews</p>
      </div>

      <div className="space-y-3">
        {reviews.map((review, i) => (
          <motion.div key={review.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }} className="premium-card p-5 flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold text-sm">{review.customerName}</span>
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <Star key={j} className="w-3 h-3 text-gold fill-gold" />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">· Shop #{review.shopId}</span>
              </div>
              <p className="text-sm text-muted-foreground">{review.comment}</p>
              <p className="text-[10px] text-muted-foreground mt-1">{review.date}</p>
            </div>
            <div className="flex gap-1 shrink-0">
              <button className="p-2 rounded-lg hover:bg-emerald-500/10 text-muted-foreground hover:text-emerald-500" title="Approve">
                <Check className="w-4 h-4" />
              </button>
              <button onClick={() => removeReview(review.id)} className="p-2 rounded-lg hover:bg-red-500/10 text-muted-foreground hover:text-red-400" title="Remove">
                <X className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-lg hover:bg-amber-500/10 text-muted-foreground hover:text-amber-400" title="Flag">
                <Flag className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
