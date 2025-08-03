import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateSlot } from "../hooks/useCreateSlot";
import { useState } from "react";

const schema = z.object({
  startTime: z
    .string()
    .nonempty("Start time is required")
    .refine(
      (val) => {
        const selected = new Date(val).getTime();
        const now = Date.now();
        return selected > now;
      },
      {
        message: "Start time must be in the future",
      }
    ),
  maxBookings: z.number().min(1, "Must allow at least 1 booking"),
});

type FormData = z.infer<typeof schema>;

const defaultTime = new Date().toISOString().slice(0, 16); // "YYYY-MM-DDTHH:MM"

export default function SlotForm() {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      startTime: defaultTime,
      maxBookings: 1,
    },
  });

  const { mutate: createSlot, isLoading } = useCreateSlot();

  const onSubmit = (data: FormData) => {
    const payload = {
      startTime: new Date(data.startTime).toISOString(),
      maxBookings: data.maxBookings,
    };

    createSlot(payload, {
      onSuccess: () => {
        reset();
        setSuccessMessage("✅ Slot created successfully!");
        setTimeout(() => setSuccessMessage(null), 4000);
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='space-y-4 max-w-md bg-white p-6 rounded-xl shadow'
    >
      <h2 className='text-2xl font-bold text-blue-600'>🛠 Create a New Slot</h2>

      {successMessage && (
        <div className='bg-green-100 text-green-800 border border-green-300 px-4 py-3 rounded text-sm font-medium'>
          {successMessage}
        </div>
      )}

      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Start Time
        </label>
        <input
          type='datetime-local'
          min={defaultTime}
          {...register("startTime")}
          className='w-full border border-gray-300 rounded px-3 py-2'
        />
        {errors.startTime && (
          <p className='text-red-500 text-sm mt-1'>
            {errors.startTime.message}
          </p>
        )}
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Max Bookings
        </label>
        <input
          type='number'
          {...register("maxBookings", { valueAsNumber: true })}
          className='w-full border border-gray-300 rounded px-3 py-2'
        />
        {errors.maxBookings && (
          <p className='text-red-500 text-sm mt-1'>
            {errors.maxBookings.message}
          </p>
        )}
      </div>

      <button
        type='submit'
        disabled={isLoading}
        className='w-full py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50'
      >
        {isLoading ? "Creating..." : "Create Slot"}
      </button>

      <button
        type='button'
        onClick={() => reset()}
        className='w-full py-2 px-4 bg-gray-200 text-gray-800 rounded hover:bg-gray-300'
      >
        Clear Form
      </button>
    </form>
  );
}
