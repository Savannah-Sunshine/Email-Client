import { create } from 'zustand'; // zustand does state management w/ hooks
import { persist } from 'zustand/middleware';


const useThemeStore = create(
  persist(
    (set) => ({
      theme: 'dark',
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set((state) => {
        // Cycle through themes: dark -> light -> blue
        const themeOrder = ['dark', 'light', 'Ocean'];
        const currentIndex = themeOrder.indexOf(state.theme);
        const nextIndex = (currentIndex + 1) % themeOrder.length;
        return { theme: themeOrder[nextIndex] };
      }),
    }),
    {
      name: 'theme-storage',
      getStorage: () => localStorage,
    }
  )
);

export default useThemeStore; 