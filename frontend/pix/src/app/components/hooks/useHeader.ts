import { create } from "zustand";

interface HeaderStore {
  isLogged: boolean;
  isLoggedOut: () => void;
    isLoggedin: () => void;

}

const useHeaderStore = create<HeaderStore>((set) => ({
    isLogged: false,
    isLoggedOut: () => set({ isLogged: false }),
    isLoggedin: () => set({ isLogged: true }),
    }));

export default useHeaderStore;