import type { Slot } from "../model/slot";
import { useBookSlot } from "../hooks/useBookSlot";
import { useCancelBooking } from "../hooks/useCancelBooking";

interface Props {
  slot: Slot;
}

export default function SlotCard({ slot }: Props) {
  const { mutate: bookSlot, isLoading: booking } = useBookSlot();
  const { mutate: cancelBooking, isLoading: cancelling } = useCancelBooking();

  const time = new Date(slot.startTime).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const date = new Date(slot.startTime).toLocaleDateString();

  return (
    <div className='border rounded-xl p-4 shadow-sm bg-white flex flex-col gap-2'>
      <div>
        <p className='text-sm text-muted-foreground'>{date}</p>
        <p className='text-lg font-semibold'>{time}</p>
      </div>
      <p className='text-sm'>
        <strong>Bookings:</strong> {slot.currentBookings} / {slot.maxBookings}
      </p>
      <p
        className={`text-sm font-medium ${
          slot.isBooked ? "text-red-500" : "text-green-600"
        }`}
      >
        {slot.isBooked ? "Fully Booked" : "Available"}
      </p>

      {slot.isBooked ? (
        <button
          disabled={cancelling}
          onClick={() => cancelBooking(slot.id)}
          className='mt-2 py-2 px-4 rounded text-white font-semibold bg-red-600 hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed'
        >
          {cancelling ? "Cancelling..." : "Cancel Booking"}
        </button>
      ) : (
        <button
          disabled={booking}
          onClick={() => bookSlot(slot.id)}
          className='mt-2 py-2 px-4 rounded text-white font-semibold bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed'
        >
          {booking ? "Booking..." : "Book Slot"}
        </button>
      )}
    </div>
  );
}
