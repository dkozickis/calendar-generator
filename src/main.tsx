import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MonthlyCalendar } from "./features/monthly-calendar/MonthlyCalendar.tsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MonthlyCalendar />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
