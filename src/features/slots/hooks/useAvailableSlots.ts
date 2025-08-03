import { useQuery } from "@tanstack/react-query";
import { fetchAvailableSlots } from "../api/slotApi";
import type { Slot } from "../model/slot";

export const useAvailableSlots = () => {
  return useQuery<Slot[]>({
    queryKey: ["slots", "available"],
    queryFn: fetchAvailableSlots,
  });
};
