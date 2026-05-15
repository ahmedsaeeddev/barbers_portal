"use client";

import { create } from "zustand";

interface AppState {
  user: { id: string; name: string; email: string; role: "owner" | "admin" | "customer"; avatar: string; shopId?: string } | null;
  isAuthenticated: boolean;
  sidebarOpen: boolean;
  login: (user: AppState["user"]) => void;
  logout: () => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  isAuthenticated: false,
  sidebarOpen: true,
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
}));
