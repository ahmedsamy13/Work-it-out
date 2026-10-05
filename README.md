# Work It Out

A modern, highly modular fitness and workout tracking application built with React, Vite, and Supabase.

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **State Management**: Zustand (Global/Local State) + TanStack React Query (Server State)
- **Styling**: Tailwind CSS v4
- **Backend as a Service**: Supabase (Auth & Database)
- **Data Visualization**: Recharts
- **Icons**: Lucide React

## Architecture

This project follows a strict **Feature-Based (Modular) Architecture** to ensure scalability and maintainability. 

- `src/app/`: Global entry points, providers, and global routing.
- `src/features/`: The core business logic, grouped by domains (e.g., `auth`, `dashboard`, `exercises`, `workouts`). Each feature is a self-contained module with its own API, components, hooks, and store.
- `src/pages/`: Thin route-level wrappers that compose UI from features and shared components.
- `src/shared/`: Cross-cutting concerns, reusable UI components (`ui/`), generic hooks, layouts, and utilities.

*See [`ARCHITECTURE.md`](./ARCHITECTURE.md) for more details.*

## UI/UX Design

The application features a clean, professional, and accessible **Light Theme** focused on readability and comfort:
- Soft off-white backgrounds (`gray-50`, `gray-100`) to reduce glare and eye strain.
- Trustworthy and energetic **Blue** (`blue-600`) as the primary brand color.
- High-contrast typography for easy reading during workouts.

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Setup**
   Create a `.env` file in the root directory and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   ```

## Scripts

- `npm run dev`: Start the development server
- `npm run build`: Build the app for production
- `npm run preview`: Locally preview the production build
- `npm run lint`: Run ESLint on the project
