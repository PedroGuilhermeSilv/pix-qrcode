import { create } from "zustand";
import { desloged, saveTokenAccess } from '../../lib/actions';

interface AuthStore {
    isAuthenticated: boolean;
    logout: () => void;
    login: (token: string) => Promise<void>;

}

const useAuthStore = create<AuthStore>((set) => ({
    isAuthenticated: false,
    logout: () => {
        desloged();
        set({ isAuthenticated: false });
    },
    login: async (token: string) => {
        saveTokenAccess(token);
        set({ isAuthenticated: true });
    },
}));

export default useAuthStore;