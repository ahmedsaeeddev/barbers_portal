"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Reply } from "lucide-react";
import { mockReviews } from "@/lib/mock-data";
import { useToastStore } from "@/components/ui/toast";

export default function ReviewsPage() {
  const reviews = mockReviews.filter((r) => r.shopId === "1");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const { addToast } = useToastStore();

  const handleReply = (id: string) => {
    addToast("Reply submitted!", "success");
    setReplyingTo(null);
    setReplyText("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Reviews</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage and respond to customer reviews</p>
      </div>

      <div className="space-y-4">
        {reviews.map((review, i) => (
          <motion.div key={review.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="premium-card p-5">
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
            <p className="text-sm text-foreground/80 leading-relaxed mb-3">{review.comment}</p>

            {replyingTo === review.id ? (
              <div className="mt-3 pl-4 border-l-2 border-gold/30">
                <textarea value={replyText} onChange={(e) => setReplyText(e.target.value)} rows={2} placeholder="Write your reply..." className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 resize-none" />
                <div className="flex gap-2 mt-2">
                  <button onClick={() => handleReply(review.id)} className="btn-gold px-4 py-2 rounded-lg text-xs font-semibold">Submit Reply</button>
                  <button onClick={() => setReplyingTo(null)} className="px-4 py-2 rounded-lg border border-border text-xs font-medium hover:bg-muted/50">Cancel</button>
                </div>
              </div>
            ) : (
              <button onClick={() => setReplyingTo(review.id)} className="flex items-center gap-1.5 text-sm text-gold hover:text-gold-light font-medium">
                <Reply className="w-4 h-4" /> Reply
              </button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
