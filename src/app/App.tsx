import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AppProviders } from "./providers";
import { router } from "./router";

export default function App() {
  return (
    <AppProviders>
      <RouterProvider router={router} />
      <Toaster 
        position="bottom-center"
        toastOptions={{
          className: "bg-surface text-text-primary border border-border shadow-lg rounded-2xl font-bold",
          success: {
            iconTheme: {
              primary: "#4ade80",
              secondary: "#18181b",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#18181b",
            },
          },
        }}
      />
    </AppProviders>
  );
}
