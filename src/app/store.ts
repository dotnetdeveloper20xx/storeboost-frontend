import { create } from "zustand";

type GlobalState = {
  selectedSlotId: string | null;
  setSelectedSlotId: (id: string | null) => void;
};

export const useGlobalStore = create<GlobalState>((set) => ({
  selectedSlotId: null,
  setSelectedSlotId: (id) => set({ selectedSlotId: id }),
}));
