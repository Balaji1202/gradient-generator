import { create } from "zustand";
import { temporal } from 'zundo';
type ColorStore = {
    startColor: string;
    endColor: string;
    setStartColor: (color: string) => void;
    setEndColor: (color: string) => void;
}

export const useColorStore = create<ColorStore>()(temporal(
  (set) => ({
    startColor: '#f69d3c',
    endColor: '#3f87a6',
    setStartColor: (color: string) => {
      set({ startColor: color });
    },
    setEndColor: (color: string) => {
      set({ endColor: color });
    },
  })
));