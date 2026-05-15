"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { mockBarberShops } from "@/lib/mock-data";
import { useToastStore } from "@/components/ui/toast";

export default function GalleryPage() {
  const [images, setImages] = useState<string[]>([...mockBarberShops[0].images]);
  const [dragging, setDragging] = useState(false);
  const { addToast } = useToastStore();

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    // Mock: just add a placeholder image
    setImages([...images, `https://images.unsplash.com/photo-1585747860019-8027e1fdb9c5?w=800&q=80&t=${Date.now()}`]);
    addToast("Image uploaded!", "success");
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
    addToast("Image removed", "info");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Gallery</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your shop photos</p>
      </div>

      {/* Drop Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all cursor-pointer ${dragging ? "border-gold bg-gold/5" : "border-border hover:border-gold/50"}`}
        onClick={() => {
          setImages([...images, `https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800&q=80&t=${Date.now()}`]);
          addToast("Image uploaded!", "success");
        }}
      >
        <Upload className={`w-10 h-10 mx-auto mb-3 ${dragging ? "text-gold" : "text-muted-foreground"}`} />
        <p className="text-sm font-medium">Drag & drop images here, or click to upload</p>
        <p className="text-xs text-muted-foreground mt-1">JPEG, PNG up to 5MB</p>
      </div>

      {/* Gallery Grid */}
      {images.length === 0 ? (
        <div className="premium-card p-16 text-center">
          <ImageIcon className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
          <p className="text-muted-foreground">No images yet. Upload your first photo!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img, i) => (
            <motion.div
              key={`${img}-${i}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-square rounded-xl overflow-hidden group"
            >
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${img})` }} />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                <button onClick={() => removeImage(i)} className="opacity-0 group-hover:opacity-100 p-2 rounded-full bg-red-500 text-white transition-all hover:bg-red-600">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
