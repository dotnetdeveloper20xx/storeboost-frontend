import { useQuery } from "@tanstack/react-query";
import { fetchAllSlots } from "../api/slotApi";
import type { Slot } from "../model/slot";


export const useAllSlots = () => {
  return useQuery<Slot[]>({
    queryKey: ["slots"],
    queryFn: fetchAllSlots,
  });
};
