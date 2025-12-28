import Cookies from "js-cookie";
import { create } from "zustand";

type User = {
  id: string;
  name: string;
  email: string;
  balance: number;
  saving: number;
  avatarUrl?: string;
};

type UserStore = {
  user: User | null;
  setUser: (user: User) => void;
  updateUserStore: (updates: Partial<Omit<User, 'id'>>) => void;
  removeUser: () => void;
  getUser: () => User | null;
};

export const useUserStore = create<UserStore>((set, get) => {
  const storedUser = Cookies.get("user");
  return {
    user: storedUser ? JSON.parse(storedUser) : null,
    
    setUser: (user: User) => {
      Cookies.set("user", JSON.stringify(user), { expires: 1 });
      set({ user });
    },
    
    updateUserStore: (updates: Partial<Omit<User, 'id'>>) => {
      const currentUser = get().user;
      
      if (!currentUser) {
        console.warn("Cannot update user: no user logged in");
        return;
      }
      
      const updatedUser = {
        ...currentUser,
        ...updates,
      };
      
      Cookies.set("user", JSON.stringify(updatedUser), { expires: 1 });
      set({ user: updatedUser });
    },
    
    removeUser: () => {
      Cookies.remove("user");
      set({ user: null });
    },
    
    getUser: () => get().user,
  };
});
