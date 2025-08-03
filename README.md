
# 📘 Step 1: Project Initialization with Vite + React + TypeScript

## ✅ What we did:
We bootstrapped a new React project using Vite and TypeScript with the following commands:

```bash
npm create vite@latest storeboost-frontend -- --template react-ts
cd storeboost-frontend
npm install
```

---

## ❓ Why we did this:

### 🔷 Vite
- Offers ultra-fast startup and HMR (Hot Module Replacement)
- Uses `esbuild` — faster builds and dev server than Webpack (used in CRA)
- Lightweight, zero-config out of the box

### 🔷 TypeScript
- Enforces strong typing and self-documenting code
- Helps avoid runtime errors by catching mistakes early
- Improves IDE experience (autocomplete, type hints)

### 🔷 Naming
We named the project `storeboost-frontend` to align with the backend and product domain (`StoreBoost` appointment system).

---

## 🛠 How it helps:

- Enables usage of modern tools like Zustand, React Query
- Supports scalable folder structures and type-safe API interaction
- Fast reloads and modular builds improve dev efficiency

---

## 📁 Files generated:

- `index.html`, `main.tsx`, `App.tsx`: App entry
- `vite.config.ts`: Vite config
- `tsconfig.json`: TypeScript setup

---

## 🧠 Developer Principles Applied:

| Principle | How |
|----------|-----|
| Modern DX | Chose Vite over CRA for speed and developer experience |
| Type Safety | Used TypeScript for type-first architecture |
| Lean & Scalable | Started from minimal base to control dependencies |


# 📘 Step 2: Install Core Dependencies & Tailwind Setup

## ✅ What we did:

Installed essential frontend dependencies for state, styling, networking, and server state management:

```bash
npm install axios react-hot-toast zustand @tanstack/react-query
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

---

## ❓ Why we did this:

### 🔧 Axios
- Simplifies HTTP requests compared to `fetch()`.
- Supports interceptors and automatic JSON transformation.
- Centralized way to access backend APIs.

### 🔔 react-hot-toast
- Non-intrusive toast notifications.
- Perfect for showing feedback (e.g., “Slot created successfully!”).
- Later replaced by a custom banner.

### ⚙️ Zustand
- Lightweight alternative to Redux.
- Perfect for simple global UI state (e.g., selected slot ID).
- No boilerplate, very ergonomic for React.

### 🔁 @tanstack/react-query
- Handles **server state**: caching, refetching, and background updates.
- Eliminates the need for `useEffect + useState` patterns.
- Automatically syncs with backend changes.

### 🎨 Tailwind CSS + PostCSS + Autoprefixer
- Utility-first CSS framework for scalable and responsive styling.
- Promotes consistent UI and removes need for CSS-in-JS or global SCSS.
- PostCSS and Autoprefixer required for Tailwind to compile CSS.

---

## 🛠 How it helps:

- React Query improves network sync and UX.
- Zustand keeps shared client state simple.
- Tailwind makes component layout fast and responsive.
- Axios abstracts all API networking.

---

## 🧠 Developer Principles Applied:

| Principle              | How                                                                 |
|------------------------|----------------------------------------------------------------------|
| State Separation       | Zustand for UI state, React Query for remote/server state            |
| Reusable Networking    | Axios methods encapsulated in API layer (`/api`)                     |
| Utility-First Styling  | Tailwind used instead of verbose or unscalable CSS/SCSS              |
| Clean Architecture     | React Query hooks for fetching, Zustand store for minimal app state  |


# 📘 Step 3: Tailwind CSS Configuration & Styling Setup

## ✅ What we did:

1. Updated `tailwind.config.js` to define which files Tailwind should scan for class names:
```js
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: { extend: {} },
  plugins: [],
}
```

2. Added Tailwind directives to `src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

3. Verified Tailwind setup by styling the `<App />` component with Tailwind utility classes.

---

## ❓ Why we did this:

### Tailwind CSS
- Offers **utility-first** styling: `p-4`, `text-xl`, `rounded-lg`, etc.
- Removes the need for writing custom CSS or managing component SCSS files.
- Enforces consistency across all UI components.
- Built for responsiveness and theming from the ground up.

### Content Paths in `tailwind.config.js`
- Tailwind needs to know **which files to scan** for class names.
- Limiting to `src/**/*.{js,ts,jsx,tsx}` avoids bloated CSS output.

### `@tailwind` directives in `index.css`
- These import Tailwind’s styles at the base level of the application.
- Allows us to use Tailwind utilities in any component.

---

## 🛠 How it helps:

- Enables **rapid prototyping** and production-quality UIs using only class names.
- Scales better than CSS modules or styled-components in team settings.
- Developers can focus on UI behavior instead of writing/revising CSS.

---

## 🧠 Developer Principles Applied:

| Principle              | How                                                                 |
|------------------------|----------------------------------------------------------------------|
| Utility-First Design   | All UIs are composed with Tailwind utilities                        |
| Consistency by Default | All layouts follow Tailwind’s spacing, font, and color scale        |
| Developer Velocity     | Design + layout done in JSX, with zero context switching            |
| Zero CSS Debt          | Avoids legacy `styles.css`, `theme.scss`, or unused class bloat     |

# 📘 Step 4: Project Folder Structure & Architecture

## ✅ What we did:

Created a modular, scalable folder structure following feature-sliced and atomic principles:

```
src/
├── app/               # Global setup: Zustand store, React Query client
├── features/slots/    # All slot-related logic and UI
│   ├── api/           # API methods (axios)
│   ├── hooks/         # React Query & Zustand hooks
│   ├── components/    # SlotCard, SlotForm, etc.
│   ├── pages/         # Route-level components (AllSlotsPage, AdminPage)
│   └── model/         # Shared types like Slot interface
├── shared/ui/         # Reusable UI components (e.g., CustomToaster)
├── styles/            # Tailwind/base styles (optional)
├── main.tsx           # App entry with providers
└── App.tsx            # App shell with routes
```

---

## ❓ Why we did this:

### 🔸 Feature-Sliced Architecture
- Code is grouped by **feature** not by type.
- This improves modularity and encapsulation.
- Example: `features/slots/` contains everything related to booking slots.

### 🔸 Separation of Concerns
- `api/`: Axios functions for backend calls
- `hooks/`: Custom hooks for data fetching or state
- `components/`: UI pieces that use those hooks
- `pages/`: Routed views used in React Router

### 🔸 Shared Layer (`shared/ui/`)
- Cross-feature UI elements (e.g., buttons, toasters)
- Enables design system reuse without duplication

### 🔸 app/
- Holds **global application context**, like Zustand store and React Query client setup.

---

## 🛠 How it helps:

- Makes the project easy to scale and test
- Enables feature-based collaboration (e.g., 2 devs working on different features)
- Reduces context switching by keeping related logic together

---

## 🧠 Developer Principles Applied:

| Principle              | How                                                                 |
|------------------------|----------------------------------------------------------------------|
| Feature Encapsulation  | All slot logic (API, UI, hooks) lives in `features/slots/`          |
| Separation of Concerns | `app/`, `shared/`, and `features/*` divide responsibilities clearly |
| Scalability            | Easy to add more features like users, analytics, etc.               |
| Maintainability        | Small, reusable, self-contained modules                             |

# 📘 Step 5: API Integration – Fetching Slots with React Query

## ✅ What we did:

1. Created an API method to call `GET /slots`
```ts
// src/features/slots/api/slotApi.ts
export const fetchAllSlots = async () => {
  const response = await axios.get('/api/slots');
  return response.data.data;
};
```

2. Built a custom React Query hook to use this method:
```ts
// src/features/slots/hooks/useAllSlots.ts
import { useQuery } from '@tanstack/react-query';
export const useAllSlots = () => {
  return useQuery(['slots'], fetchAllSlots);
};
```

3. Created a `SlotCard` component to display each slot.
4. Rendered all slots using the `useAllSlots()` hook in the main UI.

---

## ❓ Why we did this:

### React Query
- Handles **server state**: fetching, caching, background updates.
- Automatically manages loading, error, and refetching states.
- Eliminates need for manual `useEffect + useState` combo.

### Axios
- Encapsulates HTTP logic so UI code stays clean.
- Future-proofed for token headers, retries, etc.

### SlotCard Component
- Visual display of one slot (date, time, bookings, status).
- Decoupled UI that consumes props and handles conditional styles.

---

## 🛠 How it helps:

- All API calls are declarative and cached by React Query.
- Data stays fresh without reloading the page.
- UI is reactive and automatically re-renders on slot updates.

---

## 🧠 Developer Principles Applied:

| Principle              | How                                                                 |
|------------------------|----------------------------------------------------------------------|
| Server State Separation| API state handled by React Query, not by local component state       |
| Reusability            | `useAllSlots()` can be used across pages (home, admin, available)   |
| Composable UI          | `SlotCard` used in lists, admin views, etc.                         |
| Declarative Data Fetching | React Query + Axios makes fetch logic expressive and composable   |

# 📘 Step 6: Booking & Canceling Slots with `useMutation`

## ✅ What we did:

1. Created two API methods for booking and cancelling:

```ts
// slotApi.ts
export const bookSlot = (id: string) => axios.post(`/api/slots/${id}/book`);
export const cancelBooking = (id: string) => axios.post(`/api/slots/${id}/cancel`);
```

2. Built two React Query mutation hooks:

```ts
// useBookSlot.ts
export const useBookSlot = () => {
  const queryClient = useQueryClient();
  return useMutation(bookSlot, {
    onSuccess: () => {
      queryClient.invalidateQueries(['slots']);
    }
  });
};
```

```ts
// useCancelBooking.ts
export const useCancelBooking = () => {
  const queryClient = useQueryClient();
  return useMutation(cancelBooking, {
    onSuccess: () => {
      queryClient.invalidateQueries(['slots']);
    }
  });
};
```

3. Updated the `SlotCard` component:
- Displays “Book Slot” button if available
- Displays “Cancel Booking” button if already booked
- Reacts to loading state, disables while mutating

---

## ❓ Why we did this:

### React Query Mutations
- `useMutation()` is perfect for writing/updating server-side data.
- Can be optimistically updated, retried, or rolled back.

### SlotCard Button Logic
- Centralizes user interaction within a single component.
- Keeps UI reactive based on slot state (`isBooked`).

### Cache Invalidation
- After a booking or cancel action, we invalidate `['slots']` so the slot list re-fetches with correct state.

---

## 🛠 How it helps:

- Gives real-time UX feedback (button label + disabled state).
- Ensures backend and frontend stay in sync without manual refetch.
- Simple hook-based structure supports reuse across pages.

---

## 🧠 Developer Principles Applied:

| Principle              | How                                                                      |
|------------------------|---------------------------------------------------------------------------|
| Declarative Updates    | `useMutation` reflects server state changes without managing loading state manually |
| Encapsulated Behavior  | Booking logic lives in hooks, not UI files                                |
| User Feedback          | Button reflects live status: “Booking…”, “Cancelling…”, or disabled       |
| Single Source of Truth | UI derives from API state via React Query                                |


# 📘 Step 7: Routing Setup with React Router

## ✅ What we did:

1. Installed React Router DOM:
```bash
npm install react-router-dom
```

2. Wrapped the app with `<BrowserRouter>` in `main.tsx`:

```tsx
import { BrowserRouter } from "react-router-dom";

<BrowserRouter>
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
</BrowserRouter>
```

3. Set up routes in `App.tsx` using `<Routes>` and `<Route>`:

```tsx
<Routes>
  <Route path="/" element={<AllSlotsPage />} />
  <Route path="/available" element={<AvailableSlotsPage />} />
  <Route path="/admin" element={<AdminPage />} />
</Routes>
```

4. Created a navigation bar using `<Link>` components:

```tsx
<Link to="/">All Slots</Link>
<Link to="/available">Available Slots</Link>
<Link to="/admin">Admin</Link>
```

---

## ❓ Why we did this:

### React Router
- Enables single-page app routing without full page reloads.
- Each route loads its own page-level component.
- Works well with our folder structure (each feature has a `pages/` subfolder).

### Navigation Bar
- Lets users navigate between All, Available, and Admin views.
- Responsive, fixed-top header using Tailwind classes.

---

## 🛠 How it helps:

- Makes the app modular and easier to extend with new pages (e.g., login, settings).
- Keeps all route-level code in one place (`App.tsx`).
- Encourages separation between UI layout and route logic.

---

## 🧠 Developer Principles Applied:

| Principle              | How                                                                 |
|------------------------|----------------------------------------------------------------------|
| Page-based Routing     | Each page (All, Available, Admin) has its own route + component      |
| Decoupled Navigation   | Routing is defined once, layout is shared                           |
| Scalable Architecture  | Easily supports adding protected routes, nested routes, etc.        |

# 📘 Step 8: Admin Slot Creation Form with Validation

## ✅ What we did:

1. Created `SlotForm.tsx` using `react-hook-form` + `zod` for form handling and validation.

2. Defined the form schema:

```ts
const schema = z.object({
  startTime: z
    .string()
    .nonempty("Start time is required")
    .refine((val) => new Date(val).getTime() > Date.now(), {
      message: "Start time must be in the future",
    }),
  maxBookings: z.number().min(1, "Must allow at least 1 booking"),
});
```

3. Integrated it with `useForm()` and the `useCreateSlot` mutation hook.

4. UI form includes:
- `startTime` field (datetime-local)
- `maxBookings` field (number)
- Error messages from validation
- Submit and Clear buttons

---

## ❓ Why we did this:

### react-hook-form
- Efficient and performant form state management.
- Reduces re-renders and boilerplate code.

### zod
- Declarative validation schema.
- Works seamlessly with `react-hook-form` via `zodResolver`.

### Admin Page Form
- Allows creation of new slots by setting start time and max bookings.
- Required for internal tools or admin UI access.

---

## 🛠 How it helps:

- Reusable and type-safe form validation.
- Server-side slot creation integrated with React Query mutation.
- Form resets automatically after submit.

---

## 🧠 Developer Principles Applied:

| Principle              | How                                                                 |
|------------------------|----------------------------------------------------------------------|
| Form Abstraction       | Used schema-based validation with `zod`                            |
| Declarative Validation | One source of truth for all field rules                            |
| UX Feedback            | Inline errors + disable on submit state                            |
| Code Reuse             | Schema + validation can be shared across client/server if needed   |

# 📘 Step 9: Admin View – Group Slots by Date

## ✅ What we did:

1. In `AdminPage.tsx`, transformed the fetched slots using a `groupSlotsByDate()` utility:

```ts
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
```

2. Rendered each group with a heading and a list of `SlotCard`s:

```tsx
{Object.entries(grouped).map(([date, slots]) => (
  <div key={date}>
    <h3>{date}</h3>
    <div className="grid ...">
      {slots.map(slot => <SlotCard key={slot.id} slot={slot} />)}
    </div>
  </div>
))}
```

---

## ❓ Why we did this:

### UX Enhancement
- Admins can easily scan which days are overloaded or underbooked.
- Visually groups related slots together (e.g., by date).

### Data Normalization
- All slot dates are normalized to local calendar format using `toLocaleDateString()`.
- Prevents mis-sorting when displaying raw timestamps.

---

## 🛠 How it helps:

- Makes the admin view easier to navigate and digest.
- Shows which slots belong to which days at a glance.
- Prepares UI for future calendar, analytics, or filters.

---

## 🧠 Developer Principles Applied:

| Principle              | How                                                                 |
|------------------------|----------------------------------------------------------------------|
| Grouped Presentation   | Data grouped before rendering for easier UI digestion               |
| Declarative Mapping    | Pure function (`groupSlotsByDate`) separates logic from rendering   |
| Separation of Concerns | Grouping logic is modular, reusable, and isolated from JSX          |

# 📘 Step 10: Replacing Toast Notifications with Banner-Style Success Messages

## ✅ What we did:

1. Removed `toast.success(...)` from the slot creation form.
2. Added a `useState` hook to track success messages:
```tsx
const [successMessage, setSuccessMessage] = useState<string | null>(null);
```

3. Updated the `onSubmit` handler:
```tsx
createSlot(payload, {
  onSuccess: () => {
    reset();
    setSuccessMessage("✅ Slot created successfully!");
    setTimeout(() => setSuccessMessage(null), 4000);
  }
});
```

4. Displayed the banner conditionally in JSX:
```tsx
{successMessage && (
  <div className="bg-green-100 text-green-800 border border-green-300 px-4 py-3 rounded text-sm font-medium">
    {successMessage}
  </div>
)}
```

---

## ❓ Why we did this:

### Visual UX Alignment
- Toasts can be dismissed or missed; banners are fixed in context.
- Banners fit naturally above a form, showing feedback inline.

### Minimal Library Dependence
- Reduces reliance on `react-hot-toast`.
- Keeps feedback fully contained inside the form component.

### Controlled Feedback Lifecycle
- `setTimeout` auto-dismisses the message after 4 seconds.
- Easy to expand into full alert components if needed.

---

## 🛠 How it helps:

- Makes success feedback persistent, styled, and consistent.
- Gives users confidence that their action succeeded without needing to chase floating toasts.
- Helps with accessibility and UI predictability.

---

## 🧠 Developer Principles Applied:

| Principle              | How                                                                 |
|------------------------|----------------------------------------------------------------------|
| Contextual UX          | Banners appear where the user just acted (top of form)              |
| Component-local State  | Uses `useState` instead of global notification system               |
| Accessibility & Clarity| Message is visible, semantic, styled with Tailwind                 |

# 📘 Step 11: Git & GitHub Setup and Push Workflow

## ✅ What we did:

1. Initialized a local Git repo:
```bash
git init
```

2. Created a GitHub repository named `storeboost-frontend` at:
[https://github.com/dotnetdeveloper20xx/storeboost-frontend](https://github.com/dotnetdeveloper20xx/storeboost-frontend)

3. Linked the local repo to GitHub:
```bash
git remote add origin https://github.com/dotnetdeveloper20xx/storeboost-frontend.git
```

4. Renamed the default branch to `main`:
```bash
git branch -M main
```

5. Pulled remote `README.md` and merged conflicts if needed:
```bash
git pull origin main --allow-unrelated-histories
# resolved README.md conflict
# git add README.md && git commit -m "Resolve merge conflict"
```

6. Pushed the full local project to GitHub:
```bash
git push -u origin main
```

7. Added `.gitignore` to prevent pushing build artifacts and sensitive files:

```gitignore
node_modules/
dist/
.env
.vscode/
*.log
```
---

## ❓ Why we did this:

### Git & GitHub
- Version control is critical for tracking changes and collaboration.
- GitHub is the central source of truth and hosts your project repo.

### Branch Naming
- `main` is now the standard default branch name (instead of `master`).

### Merge Conflict Resolution
- Important learning step: local and remote both had README.md — required manual resolution.

### `.gitignore`
- Prevents clutter and accidental pushes of sensitive or unnecessary files.

---

## 🛠 How it helps:

- Enables GitHub collaboration, pull requests, CI/CD, and history tracking.
- Keeps the repo clean and professional.
- Allows other developers to clone and contribute instantly.

---

## 🧠 Developer Principles Applied:

| Principle              | How                                                                 |
|------------------------|----------------------------------------------------------------------|
| Version Control        | Used Git to track project history                                   |
| Remote Source of Truth | All changes pushed to GitHub repo                                   |
| Clean Repository       | Used `.gitignore` to filter out build/system/junk files             |
| Conflict Resolution    | Manually merged `README.md` and understood fetch/push behavior      |
