import { createFileRoute } from '@tanstack/react-router'
import { zodSearchValidator } from '@tanstack/router-zod-adapter'
import { WeeklyCalendar } from '../features/weekly-calendar/WeeklyCalendar.tsx'
import { z } from 'zod'

const weeklySchema = z.object({
  dayCount: z.union([z.literal(5), z.literal(7)]).default(5),
})

export const Route = createFileRoute('/weekly')({
  component: () => <WeeklyCalendar />,
  validateSearch: zodSearchValidator(weeklySchema),
})
