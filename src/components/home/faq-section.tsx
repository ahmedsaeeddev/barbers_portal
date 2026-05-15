"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "What is Nayi Bhaee?",
    a: "Nayi Bhaee is Pakistan's first digital platform for barber shops. We help barbers create online business profiles, showcase services, receive customer reviews, and grow their business digitally.",
  },
  {
    q: "Is it free to register my barber shop?",
    a: "Yes! Our Free Listing plan lets you create a basic shop profile at no cost. For advanced features like unlimited services, photo galleries, and analytics, check our affordable Starter plan at just PKR 200/month.",
  },
  {
    q: "How does the QR code work?",
    a: "Every registered shop gets a unique QR code. When customers scan it, they're taken directly to your digital shop profile where they can view services, pricing, timings, and leave reviews.",
  },
  {
    q: "Which cities do you cover?",
    a: "We currently have barber shops listed in Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, and Quetta. We're rapidly expanding to more cities!",
  },
  {
    q: "How can customers find my shop?",
    a: "Customers can search by city, area, services, ratings, and more on our platform. Featured and premium shops get priority placement in search results.",
  },
  {
    q: "Can I manage my shop from mobile?",
    a: "Absolutely. Our platform is fully mobile-responsive. You can update your profile, respond to reviews, and check analytics from any device.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-gold text-sm font-semibold uppercase tracking-wider">FAQ</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2">Frequently Asked Questions</h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="premium-card overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-semibold text-sm pr-4">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform ${openIndex === i ? "rotate-180 text-gold" : ""}`}
                />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
