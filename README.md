# 📱 StoreBoost Appointment Booking – User Overview & Stories

## 🧾 What is StoreBoost?

**StoreBoost** is a modern web application that allows users to view, book, and manage appointment time slots. It includes a dedicated Admin interface to manage the creation of available time slots for users. The system is responsive, intuitive, and built for both general users and internal administrators.

Built using **React + Vite**, the app leverages **Tailwind CSS** for styling, **React Query** for API state, **Zustand** for minimal client state, and **react-hook-form + zod** for interactive and validated forms.

---

## 👥 Who is this for?

### 🔹 General Users
- Users who want to view available time slots
- Users who want to book or cancel appointments

### 🔹 Admin Users
- Admins who create and manage appointment slots
- Admins who need an overview of all scheduled slots grouped by date

---

## ✅ What can users do?

### 🧍‍♂️ General User Capabilities
- View **all appointment slots** (booked and available)
- View **only available slots** (for easier filtering)
- Book a slot, if it's not already full
- Cancel a previously booked slot
- Get visual feedback during actions (e.g. “Booking...”, “Cancelled”, etc.)

### 👨‍💼 Admin User Capabilities
- Navigate to the **Admin Panel**
- Create new time slots via a form with validation:
  - Choose date and time (`datetime-local`)
  - Specify max number of bookings allowed
- See a success banner when a slot is created
- View a grouped overview of all existing slots by **calendar date**
- Manage slot entries with full contextual detail

---

## 🧾 User Stories

### General Users
- ✅ As a user, I want to see a list of available appointment slots so I can book one.
- ✅ As a user, I want to filter out fully booked slots so I only see open options.
- ✅ As a user, I want to book a slot with one click.
- ✅ As a user, I want to cancel my booking if I change my mind.
- ✅ As a user, I want visual confirmation that a booking or cancellation was successful.

### Admin Users
- ✅ As an admin, I want to add a new appointment slot by entering date and max bookings.
- ✅ As an admin, I want the form to prevent past or invalid slot creation.
- ✅ As an admin, I want to reset the form fields if I change my mind.
- ✅ As an admin, I want to see a success banner when a slot is successfully created.
- ✅ As an admin, I want to view all slots grouped by date to better understand bookings.

---

## 🧠 Built for Simplicity, Clarity, and Speed

The app is optimized for fast development and smooth user interaction using the latest modern tooling in the frontend ecosystem. Designed to be scalable, testable, and intuitive for both new developers and users.

---


# 📦 StoreBoost Request-Response Architecture 

This document provides a detailed walkthrough of every API request, how it is handled in the frontend code, and how it fits into the broader architecture and developer principles of the StoreBoost React application.

---

## 🔗 Base API URL

```
https://localhost:7009/api
```

---

## 1. `GET /slots` — Fetch All Slots

### Purpose
Retrieve all appointment slots (booked and available).

### Frontend Flow

| File | Role |
|------|------|
| `src/features/slots/api/slotApi.ts` | `fetchAllSlots()` sends GET request |
| `src/features/slots/hooks/useAllSlots.ts` | React Query hook manages fetching and caching |
| `SlotCard.tsx` | Renders individual slot UI |
| `AllSlotsPage.tsx` | Calls hook and renders list |

### Developer Principles
- Server state separation via React Query
- Reusable UI components
- Declarative data fetching

---

## 2. `GET /slots/available` — Fetch Available Slots

### Purpose
Show only slots that are still open for booking.

### Frontend Flow

| File | Role |
|------|------|
| `slotApi.ts` | `fetchAvailableSlots()` |
| `useAvailableSlots.ts` | Custom React Query hook |
| `AvailableSlotsPage.tsx` | Page displaying filtered slot cards |

---

## 3. `POST /slots` — Create New Slot (Admin)

### Purpose
Allows admin users to define new time slots.

### Frontend Flow

| File | Role |
|------|------|
| `SlotForm.tsx` | Form using `react-hook-form` + `zod` |
| `useCreateSlot.ts` | Mutation hook to create slot |
| `AdminPage.tsx` | Hosts form and success banner |

### Request
```json
{
  "startTime": "2025-08-02T14:00:00Z",
  "maxBookings": 3
}
```

### Response
```json
{
  "success": true,
  "message": "Slot created successfully.",
  "data": "guid"
}
```

### Developer Principles
- Schema-based validation
- Localized success banners
- Separation of form and API logic

---

## 4. `POST /slots/{slotId}/book` — Book a Slot

### Purpose
Book a specific appointment slot by its ID.

### Frontend Flow

| File | Role |
|------|------|
| `slotApi.ts` | `bookSlot(id)` API function |
| `useBookSlot.ts` | React Query mutation hook |
| `SlotCard.tsx` | Contains button logic and loading state |

### Success Response
```json
{
  "success": true,
  "message": "Slot booked successfully.",
  "data": true
}
```

### Failure Response
```json
{
  "success": false,
  "message": "Slot is already fully booked."
}
```

---

## 5. `POST /slots/{slotId}/cancel` — Cancel Booking

### Purpose
Cancel a user's existing booking.

### Frontend Flow

| File | Role |
|------|------|
| `slotApi.ts` | `cancelBooking(id)` method |
| `useCancelBooking.ts` | Mutation + cache invalidation |
| `SlotCard.tsx` | Displays "Cancel" button if booked |

### Success Response
```json
{
  "success": true,
  "message": "Booking successfully cancelled.",
  "data": true
}
```

---

## Common Error Format

```json
{
  "success": false,
  "message": "Reason for failure"
}
```

Frontend displays inline error messages or toast banners.

---

## Key Frontend Files

| Concern | Files |
|--------|-------|
| API | `slotApi.ts` |
| Hooks | `useAllSlots.ts`, `useBookSlot.ts`, etc. |
| UI | `SlotCard.tsx`, `SlotForm.tsx` |
| Pages | `AllSlotsPage.tsx`, `AdminPage.tsx` |
| Routing | `App.tsx` |
| Providers | `main.tsx` (React Query, Zustand) |

---

## Summary of Developer Patterns

| Pattern | Example |
|--------|---------|
| Feature-Sliced Architecture | `features/slots/*` |
| Type-Safe Forms | `react-hook-form` + `zod` |
| Declarative Data | React Query hooks |
| UX Feedback | Banners, loading states |
| Clean Separation | API, hooks, UI are modularized |

---

Built with using React, TypeScript, Zustand, React Query, Tailwind, and Zod.


