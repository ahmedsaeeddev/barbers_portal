export interface BarberShop {
  id: string;
  name: string;
  slug: string;
  description: string;
  owner: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  city: string;
  area: string;
  latitude: number;
  longitude: number;
  rating: number;
  totalReviews: number;
  images: string[];
  coverImage: string;
  logo: string;
  services: Service[];
  team: BarberTeamMember[];
  timings: DayTiming[];
  isVerified: boolean;
  isOpen: boolean;
  isPremium: boolean;
  badges: string[];
  createdAt: string;
  monthlyVisits: number;
  qrScans: number;
}

export interface Service {
  id: string;
  name: string;
  category: string;
  price: number;
  duration: number; // minutes
  description: string;
  isPopular: boolean;
}

export interface BarberTeamMember {
  id: string;
  name: string;
  role: string;
  specialties: string[];
  experience: number; // years
  image: string;
}

export interface DayTiming {
  day: string;
  openTime: string;
  closeTime: string;
  isClosed: boolean;
}

export interface Review {
  id: string;
  shopId: string;
  customerName: string;
  customerImage: string;
  rating: number;
  comment: string;
  date: string;
  reply?: string;
  replyDate?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  isPopular: boolean;
  cta: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "owner" | "admin" | "customer";
  avatar: string;
  shopId?: string;
}

export interface DashboardStats {
  profileViews: number;
  profileViewsChange: number;
  qrScans: number;
  qrScansChange: number;
  totalReviews: number;
  reviewsChange: number;
  avgRating: number;
  ratingChange: number;
  monthlyData: { month: string; views: number; scans: number }[];
}

export interface AdminStats {
  totalShops: number;
  activeShops: number;
  pendingApproval: number;
  totalUsers: number;
  totalRevenue: number;
  monthlyRevenue: number;
  revenueData: { month: string; revenue: number; shops: number }[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  date: string;
}

export interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
  plan: string;
}
