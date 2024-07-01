import { create } from "zustand";
import { CustomerDetails } from "./checkoutStore";

export interface UserData {
  name: string;
  email: string;
  phone: string;
  _id?: string;
  isVerified?: boolean;
  address?: CustomerDetails[] | string[];
  salt?: string;
  hashedPassword?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface UserStore {
  user: UserData | null;
  setUser: (userData: UserData) => void;
}

export const useUser = create<UserStore>((set) => ({
  user: null,
  setUser: (userData) => set({ user: userData }),
}));
