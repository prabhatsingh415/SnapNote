import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type PhotoQuality = "high" | "medium" | "low";

interface SettingsState {
  autoSync: boolean;
  wifiOnly: boolean;
  saveToGallery: boolean;
  compressPhotos: boolean;
  photoQuality: PhotoQuality;

  setAutoSync: (value: boolean) => void;
  setWifiOnly: (value: boolean) => void;
  setSaveToGallery: (value: boolean) => void;
  setCompressPhotos: (value: boolean) => void;
  setPhotoQuality: (value: PhotoQuality) => void;
}

const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      autoSync: true,
      wifiOnly: true,
      saveToGallery: false,
      compressPhotos: true,
      photoQuality: "high",

      setAutoSync: (value) => set({ autoSync: value }),

      setWifiOnly: (value) => set({ wifiOnly: value }),

      setSaveToGallery: (value) =>
        set({
          saveToGallery: value,
        }),

      setCompressPhotos: (value) =>
        set({
          compressPhotos: value,
        }),

      setPhotoQuality: (value) =>
        set({
          photoQuality: value,
        }),
    }),
    {
      name: "snapnote-settings",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useSettingsStore;
