import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelBooking } from "../api/slotApi";
import toast from "react-hot-toast";

export const useCancelBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelBooking,
    onSuccess: () => {
      toast.success("Booking cancelled.");
      queryClient.invalidateQueries(["slots"]);
    },
    onError: (err: any) => {
      const message = err.response?.data?.message ?? "Cancel failed.";
      toast.error(message);
    },
  });
};
