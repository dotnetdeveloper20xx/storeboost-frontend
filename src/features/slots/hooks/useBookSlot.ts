import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bookSlot } from "../api/slotApi";
import toast from "react-hot-toast";

export const useBookSlot = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bookSlot,
    onSuccess: () => {
      toast.success("Slot booked successfully!");
      queryClient.invalidateQueries(["slots"]); // ✅ Refresh slot list
    },
    onError: (err: any) => {
      const message = err.response?.data?.message ?? "Booking failed.";
      toast.error(message);
    },
  });
};
