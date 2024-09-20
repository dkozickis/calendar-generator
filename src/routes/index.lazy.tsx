import { createLazyFileRoute } from "@tanstack/react-router";
import { MonthlyCalendar } from "../features/monthly-calendar/MonthlyCalendar.tsx";

export const Route = createLazyFileRoute("/")({
  component: () => <MonthlyCalendar />,
});
