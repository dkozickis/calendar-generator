export const generateCalendar = ({
  year,
  month,
}: {
  year: number;
  month: number;
}) => {
  const firstDay = new Date(year, month, 1);
  let startDay = firstDay.getDay() - 1;
  if (startDay === -1) startDay = 6;

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const calendarDays: (Date | null)[] = [];

  for (let i = 0; i < startDay; i++) {
    calendarDays.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    // Update to push ISO date string
    calendarDays.push(new Date(year, month, day));
  }

  const totalCells = calendarDays.length;
  const cellsToAdd = 7 - (totalCells % 7);
  if (cellsToAdd < 7) {
    for (let i = 0; i < cellsToAdd; i++) {
      calendarDays.push(null);
    }
  }

  return calendarDays;
};
