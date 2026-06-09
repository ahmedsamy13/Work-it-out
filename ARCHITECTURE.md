# Architecture & Folder Structure

Welcome to the team! This document explains how our codebase is organized. We use a **Feature-Based** (or modular) architecture. 

**Why this structure?**
Instead of grouping files by technical type (e.g., all hooks together, all components together), we group them by **domain or feature** (e.g., all authentication logic together). This keeps highly related code co-located, making it easier to scale, refactor, and mentally map the app as it grows. 

Here is the breakdown of `src/` and where you should put your code.

---

## 📂 `src/app/`
**What it is:** The global entry point and application shell.
**What goes here:**
- App initialization (`main.tsx`, `App.tsx`).
- Global providers (Contexts, Query Clients, Theme Providers).
- Routing configuration (`router/`).
- Global stylesheets.
**Rule of thumb:** If it wraps the entire application or handles routing at the highest level, it belongs here.

## 📂 `src/assets/`
**What it is:** Static files that are bundled with the app.
**What goes here:** Images, fonts, and icons.

## 📂 `src/features/`
**What it is:** The core business logic of the application. 
**What goes here:** Everything specific to a particular domain (e.g., `auth`, `dashboard`, `exercises`, `workouts`). 
Each feature is essentially a mini-application and has its own internal structure:
- `api/`: API requests specific to this feature.
- `components/`: UI components used *only* within this feature.
- `hooks/`: Custom React hooks specific to this feature.
- `store/`: Local state management (e.g., Zustand stores) for this feature.
- `types/`: TypeScript interfaces and types for the feature.
- `utils/`: Helper functions specific to the feature.
**Rule of thumb:** If the code only makes sense within the context of "workouts", put it in `features/workouts`.

## 📂 `src/pages/`
**What it is:** The route-level components.
**What goes here:** Components that represent a whole screen or page (e.g., `LoginPage.tsx`, `DashboardPage.tsx`).
**Why separate from features?** 
Pages should be thin wrappers. They are responsible for reading route parameters, fetching top-level data, and composing components from `features/` and `shared/` to build the screen. Do not put complex business logic in pages.

## 📂 `src/shared/`
**What it is:** Cross-cutting concerns and highly reusable generic code.
**What goes here:**
- `constants/`: Global constants (e.g., `routes.ts`, `muscleGroups.ts`).
- `hooks/`: Generic hooks used anywhere (e.g., `useDebounce`, `useMediaQuery`).
- `layouts/`: Page layouts (`MainLayout`, `AuthLayout`).
- `lib/`: Third-party library configurations (e.g., Axios setup).
- `types/`: Generic types used across multiple features.
- `ui/`: Dumb, highly reusable UI components (Buttons, Inputs, Modals, Cards).
- `utils/`: Generic helper functions (e.g., date formatters, validation logic).
**Rule of thumb:** If the code is completely agnostic of any specific business feature and can be reused anywhere in the app, it goes in `shared`.

---

## Quick Guide: Where do I put this?

- **A button component?** ➡️ `src/shared/ui/Button/`
- **A function to calculate workout volume?** ➡️ `src/features/workouts/utils/`
- **A hook to track window size?** ➡️ `src/shared/hooks/`
- **A component that displays an exercise chart?** ➡️ `src/features/dashboard/components/`
- **A new route for user settings?** ➡️ `src/pages/profile/SettingsPage.tsx` and register in `src/app/router/`
- **An API call to update user profile?** ➡️ `src/features/auth/api/` (or a specific profile feature if separated).

Keep it modular, keep dependencies pointing inward (features can import from shared, but shared should *never* import from features), and you'll do great!
