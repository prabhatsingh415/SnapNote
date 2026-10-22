import { ThemeState } from "../types/Store";
import { create, StateCreator } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

const themeStore: StateCreator<ThemeState> = (set) => ({
  theme: "light",

  toggleTheme: (): void => {
    set((state: ThemeState) => ({
      theme: state.theme === "light" ? "dark" : "light",
    }));
  },
});

const useThemeStore = create<ThemeState>()(
  persist(devtools(themeStore), {
    name: "user-storage",
    storage: createJSONStorage(() => AsyncStorage),
  })
);

export default useThemeStore;
