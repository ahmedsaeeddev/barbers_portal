import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Nayi Bhaee (بھئی نائی) — Pakistan's Digital Barber Platform",
    template: "%s | Nayi Bhaee",
  },
  description:
    "Bring your barber shop online. Create digital profiles, showcase services, receive reviews, and modernize your barbering business with Nayi Bhaee — powered by Zayro Studio.",
  keywords: [
    "barber shop Pakistan",
    "barber booking",
    "nayi bhaee",
    "digital barber",
    "haircut Pakistan",
    "grooming platform",
  ],
  authors: [{ name: "Zayro Studio" }],
  openGraph: {
    title: "Nayi Bhaee — Pakistan's Digital Barber Platform",
    description: "Bring your barber shop online with Nayi Bhaee.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
