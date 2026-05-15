import Link from "next/link";
import { Scissors } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-3xl bg-gold/10 flex items-center justify-center mx-auto mb-8">
          <Scissors className="w-10 h-10 text-gold" />
        </div>
        <h1 className="text-7xl font-bold gold-text mb-4">404</h1>
        <h2 className="text-2xl font-bold mb-3">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn-gold px-6 py-3 rounded-xl text-sm font-semibold inline-block text-center">
            Go Home
          </Link>
          <Link href="/barbers" className="px-6 py-3 rounded-xl border border-border text-sm font-semibold hover:border-gold/50 transition-all inline-block text-center">
            Find Barbers
          </Link>
        </div>
      </div>
    </div>
  );
}
