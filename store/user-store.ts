import { create } from "zustand";
import Cookies from "js-cookie";

type User = {
  id: string;
  name: string;
  email: string;
  balance: number;
  saving: number;
};

type UserStore = {
  user: User | null;
  setUser: (user: User) => void;
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
    removeUser: () => {
      Cookies.remove("user");
      set({ user: null });
    },
    getUser: () => get().user,
  };
});