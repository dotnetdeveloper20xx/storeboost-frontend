
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
