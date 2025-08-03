import { Routes, Route, Link } from "react-router-dom";
import AllSlotsPage from "./features/slots/pages/AllSlotsPage";
import AvailableSlotsPage from "./features/slots/pages/AvailableSlotsPage";
import AdminPage from "./features/slots/pages/AdminPage";

export default function App() {
  return (
    <div className='min-h-screen bg-gray-50'>
      {/* 💼 Top Navigation */}
      <header className='bg-white shadow sticky top-0 z-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between'>
          <h1 className='text-2xl font-bold text-blue-700 tracking-tight'>
            StoreBoost 🕑
          </h1>
          <nav className='flex gap-6 text-lg'>
            <Link
              to='/'
              className='text-gray-700 hover:text-blue-600 transition font-medium'
            >
              All Slots
            </Link>
            <Link
              to='/available'
              className='text-gray-700 hover:text-blue-600 transition font-medium'
            >
              Available Slots
            </Link>
            <Link
              to='/admin'
              className='text-gray-700 hover:text-blue-600 transition font-medium'
            >
              Admin
            </Link>
          </nav>
        </div>
      </header>

      {/* 🧾 Main Content */}
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10'>
        <Routes>
          <Route path='/' element={<AllSlotsPage />} />
          <Route path='/available' element={<AvailableSlotsPage />} />
          <Route path='/admin' element={<AdminPage />} />
        </Routes>
      </main>
    </div>
  );
}
