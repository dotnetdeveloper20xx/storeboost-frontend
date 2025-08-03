
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





