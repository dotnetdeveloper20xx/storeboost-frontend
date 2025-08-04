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



# 🧠 StoreBoost React Application – Deep Dive into Technologies and Patterns

This document is designed to explain the core technologies and architectural patterns used in the StoreBoost React application. It not only explains **what** was used, but also **why**, **how**, and compares with alternative options.

---

## 1. ⚡ Vite

### ✅ Why We Used It
Vite is a next-generation frontend tooling that offers:
- Lightning-fast cold starts using `esbuild`
- Hot Module Replacement (HMR) for near-instant feedback
- Native ESM support

### 🔍 Expert Details
- Replaces older bundlers like Webpack, especially for small to medium projects.
- Lazy-loads modules only when needed using native ES modules.
- Uses a dev server that serves files on-demand.

### 🔁 Alternatives
| Alternative | Comparison |
|-------------|------------|
| Webpack     | Powerful but slower, requires more config |
| CRA (Create React App) | Popular but bloated and less customizable |
| Parcel      | Zero config like Vite but slower rebuild times |

---

## 2. 💬 TypeScript

### ✅ Why We Used It
- Adds static typing to JavaScript.
- Catches errors during development, not at runtime.
- Enhances code readability and IDE support.

### 🔍 Expert Details
- Improves self-documentation and team collaboration.
- Works seamlessly with JSX and React component props.
- Interfaces enforce data contracts (e.g., `Slot` model).

### 🔁 Alternatives
- **JavaScript** (No typing, faster to prototype but riskier)
- **Flow** (Facebook’s static type checker, less maintained)

---

## 3. 🧠 React Query (`@tanstack/react-query`)

### ✅ Why We Used It
- Handles server state (API calls, cache, revalidation).
- Eliminates useEffect + useState boilerplate for data fetching.

### 🔍 Expert Details
- Supports stale-while-revalidate, background refetching.
- Easily integrates with Axios and custom APIs.
- Each query is cached and keyed (e.g. `['slots']`).
- Mutation hooks (`useMutation`) for writing data.

### 🔁 Alternatives
| Tool       | Notes |
|------------|-------|
| SWR        | Simpler, similar pattern but less powerful than React Query |
| Redux-Thunk or Redux-Saga | Can handle fetching but more boilerplate-heavy |
| Apollo Client | Great for GraphQL but overkill for REST-only APIs |

---

## 4. 🌐 Axios

### ✅ Why We Used It
- Simplifies HTTP requests compared to `fetch`.
- Supports interceptors, request/response handling, and error boundaries.

### 🔍 Expert Details
- Automatically transforms JSON responses.
- Easily extendable with auth headers and retry logic.
- Used in an `api/` folder for clean separation.

### 🔁 Alternatives
- `fetch()` (built-in, needs more boilerplate)
- `ky`, `got`, `superagent` (smaller or specialized use cases)

---

## 5. 🎨 Tailwind CSS

### ✅ Why We Used It
- Utility-first CSS framework — design directly in JSX.
- Faster prototyping, consistent spacing, and reusable classes.

### 🔍 Expert Details
- Uses PostCSS to purge unused CSS for small bundles.
- Encourages design tokens (p-x, text-sm) and eliminates global styles.
- Promotes design systems and responsiveness.

### 🔁 Alternatives
| Tool         | Notes |
|--------------|-------|
| SCSS         | Customizable but adds maintenance overhead |
| CSS Modules  | Safer but verbose |
| styled-components | Powerful but adds runtime cost |
| Chakra UI    | Component-based abstraction over Tailwind (can be easier for teams) |

---

## 6. 🧪 react-hook-form + zod

### ✅ Why We Used It
- Handles form state and validation with minimal re-renders.
- Zod provides a type-safe, declarative schema for inputs.

### 🔍 Expert Details
- `useForm()` manages dirty state, validation, and submission.
- `z.object({...})` defines field constraints and refinement rules.
- Works seamlessly with TypeScript + controlled inputs.

### 🔁 Alternatives
| Tool       | Notes |
|------------|-------|
| Formik     | Full-featured, more boilerplate |
| Yup        | Schema validation like Zod, but not TypeScript-first |
| React Final Form | Lightweight, but dated |

---

## 7. 📦 Zustand

### ✅ Why We Used It
- Minimal global state management (used for selected slot ID, UI toggles).
- Very ergonomic for small-to-medium projects.

### 🔍 Expert Details
- API: `create((set) => ({...}))` creates a lightweight state container.
- No provider or reducers needed.
- Easy integration with React DevTools and middleware.

### 🔁 Alternatives
| Tool      | Notes |
|-----------|-------|
| Redux Toolkit | Best for large apps, but more verbose |
| Recoil     | Good for graph-like state |
| Jotai      | Atom-based, similar philosophy to Zustand |

---

## 8. 🔃 React Router DOM

### ✅ Why We Used It
- Manages client-side routing.
- Enables navigation between pages (All, Available, Admin).

### 🔍 Expert Details
- `BrowserRouter` provides context.
- `Routes` + `Route` defines pages.
- `Link` enables client-side navigation.

### 🔁 Alternatives
| Tool | Notes |
|------|-------|
| Next.js | Has file-based routing but is SSR-first |
| Reach Router | Old but was merged into React Router v6 |

---

## 9. ✅ Project Structure: Feature-Sliced Architecture

### ✅ Why We Used It
- Keeps related logic (API, hooks, components) together.
- Scales easily across teams and features.

### 🧠 Structure
```
features/slots/
├── api/
├── hooks/
├── components/
├── pages/
└── model/
```

### 🔁 Alternatives
| Style | Notes |
|-------|-------|
| Flat structure | Simple, but hard to scale |
| Type-based (components/, hooks/) | Common, but separates concerns too much |

---

## 10. 🧪 Testing (Suggested)

- `@testing-library/react` + `Jest`
- Unit tests for hooks and components
- Integration for booking flow, form validation

---

## 🧠 Summary

| Area               | Stack                               | Why |
|--------------------|--------------------------------------|-----|
| App Bootstrapping  | Vite + TypeScript                    | Fast dev & type-safe |
| Styling            | Tailwind CSS                        | Utility-first, consistent UI |
| Server State       | React Query + Axios                  | Declarative fetching & caching |
| Forms              | react-hook-form + zod                | Minimal + typed validation |
| State              | Zustand                              | Global state without boilerplate |
| Routing            | React Router DOM                     | SPA routing |
| Structure          | Feature-sliced architecture          | Modular and scalable |

---

Designed for speed, clarity, modularity, and growth. This stack balances **modern simplicity** with **enterprise scalability**.
