import SlotForm from "../components/SlotForm";
import { useAllSlots } from "../hooks/useAllSlots";
import SlotCard from "../components/SlotCard";
import type { Slot } from "../model/slot";

function groupSlotsByDate(slots: Slot[]): Record<string, Slot[]> {
  return slots.reduce((acc, slot) => {
    const date = new Date(slot.startTime).toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    acc[date] = acc[date] || [];
    acc[date].push(slot);
    return acc;
  }, {} as Record<string, Slot[]>);
}

export default function AdminPage() {
  const { data: slots, isLoading, isError } = useAllSlots();

  const grouped = slots ? groupSlotsByDate(slots) : {};

  return (
    <div className='space-y-10'>
      <h1 className='text-3xl font-bold text-blue-700'>🛠 Admin Panel</h1>

      <div className='bg-white p-6 rounded-xl shadow max-w-lg'>
        <SlotForm />
      </div>

      <div>
        <h2 className='text-2xl font-semibold text-gray-800 mb-4'>
          Existing Slots
        </h2>

        {isLoading && <p>Loading slots...</p>}
        {isError && (
          <p className='text-red-500'>Failed to load slots from backend.</p>
        )}

        {Object.keys(grouped).length === 0 && !isLoading && (
          <p className='text-gray-600'>No slots available yet.</p>
        )}

        {Object.entries(grouped).map(([date, slots]) => (
          <div key={date} className='mb-10'>
            <h3 className='text-xl font-bold text-gray-700 mb-3 border-b pb-1'>
              {date}
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {slots.map((slot) => (
                <SlotCard key={slot.id} slot={slot} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
