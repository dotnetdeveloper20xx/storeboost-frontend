import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSlot } from "../api/slotApi";
import toast from "react-hot-toast";

export const useCreateSlot = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSlot,
    onSuccess: () => {
      toast.success("Slot created!");
      queryClient.invalidateQueries(["slots"]);
    },
    onError: (err: any) => {
      const message = err.response?.data?.message ?? "Failed to create slot.";
      toast.error(message);
    },
  });
};
