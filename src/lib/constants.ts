export const BRAND = {
  name: "Nayi Bhaee",
  nameUrdu: "بھئی نائی",
  tagline: "Pakistan's Digital Barber Platform",
  taglineAlt: "Your Barber Shop, Now Online",
  parent: "Zayro Studio",
  parentTagline: "Powered by Zayro Studio",
  email: "hello@nayibhaee.pk",
  phone: "+92 300 1234567",
  address: "Zayro Studio, Gulberg III, Lahore, Pakistan",
  socials: {
    instagram: "https://instagram.com/nayibhaee",
    facebook: "https://facebook.com/nayibhaee",
    twitter: "https://twitter.com/nayibhaee",
    whatsapp: "https://wa.me/923001234567",
  },
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Find Barbers", href: "/barbers" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const DASHBOARD_LINKS = [
  { label: "Overview", href: "/dashboard", icon: "LayoutDashboard" },
  { label: "Shop Profile", href: "/dashboard/shop", icon: "Store" },
  { label: "Services", href: "/dashboard/services", icon: "Scissors" },
  { label: "Team", href: "/dashboard/team", icon: "Users" },
  { label: "Gallery", href: "/dashboard/gallery", icon: "Image" },
  { label: "Reviews", href: "/dashboard/reviews", icon: "Star" },
  { label: "QR Code", href: "/dashboard/qr", icon: "QrCode" },
  { label: "Billing", href: "/dashboard/billing", icon: "CreditCard" },
  { label: "Settings", href: "/dashboard/settings", icon: "Settings" },
] as const;

export const ADMIN_LINKS = [
  { label: "Dashboard", href: "/admin", icon: "LayoutDashboard" },
  { label: "Barber Shops", href: "/admin/shops", icon: "Store" },
  { label: "Users", href: "/admin/users", icon: "Users" },
  { label: "Reviews", href: "/admin/reviews", icon: "MessageSquare" },
  { label: "Subscriptions", href: "/admin/subscriptions", icon: "CreditCard" },
  { label: "Categories", href: "/admin/categories", icon: "Tag" },
  { label: "Analytics", href: "/admin/analytics", icon: "BarChart3" },
  { label: "Notifications", href: "/admin/notifications", icon: "Bell" },
] as const;

export const CITIES = [
  "Karachi",
  "Lahore",
  "Islamabad",
  "Rawalpindi",
  "Faisalabad",
  "Multan",
  "Peshawar",
  "Quetta",
] as const;

export const SERVICE_CATEGORIES = [
  "Haircut",
  "Beard Trim",
  "Shave",
  "Hair Color",
  "Facial",
  "Head Massage",
  "Hair Treatment",
  "Kids Haircut",
  "Bridal Groom",
  "Hair Wash",
] as const;
