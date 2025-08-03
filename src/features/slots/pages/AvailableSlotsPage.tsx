import { useAvailableSlots } from "../hooks/useAvailableSlots";
import SlotCard from "../components/SlotCard";

export default function AvailableSlotsPage() {
  const { data: slots, isLoading, isError } = useAvailableSlots();

  return (
    <div className='p-10 space-y-6'>
      <h1 className='text-3xl font-bold'>✅ Available Slots</h1>

      {isLoading && <p>Loading available slots...</p>}
      {isError && <p className='text-red-500'>Failed to load slots.</p>}

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {slots?.map((slot) => (
          <SlotCard key={slot.id} slot={slot} />
        ))}
      </div>
    </div>
  );
}
