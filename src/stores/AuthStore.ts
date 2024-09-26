import { User } from "@/contexts/AuthContext";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface AuthStoreState {
  user: User | null;
  setUser: (user: User | null) => void; // Ensure the user can be User or null
}

export const useAuthStore = create<AuthStoreState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: User | null) => set(() => ({ user })), // Explicitly type user as User | null
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage), // Session storage for persistence
    }
  )
);
