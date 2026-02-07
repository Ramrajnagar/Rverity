
import { create } from 'zustand';

interface AppState {
    theme: 'dark' | 'light';
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
    setTheme: (theme: 'dark' | 'light') => void;
}

export const useAppStore = create<AppState>((set) => ({
    theme: 'dark',
    isSidebarOpen: false,
    toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
    setTheme: (theme) => set({ theme }),
}));
