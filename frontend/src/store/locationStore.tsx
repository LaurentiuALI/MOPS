import { create } from "zustand";

type locationStore = {
  latitude: number;
  longitude: number;
  updateCoordinates: (lat: number, long: number) => void;
};

export const useLocationStore = create<locationStore>((set) => ({
  latitude: 44.4355355,
  longitude: 26.0995867,
  updateCoordinates: (lat: number, long: number) => {
    set({ latitude: lat, longitude: long });
  },
}));
