import { ChangeEventHandler, useState } from "react";
import { generateCalendar } from "../../utils/calendar.ts";
import { DaySquare, WeekdayHeader } from "../../components/WeekdayHeader.tsx";

const monthNames = Array.from({ length: 12 }, (_, i) => {
  return new Intl.DateTimeFormat("ru-RU", { month: "long" }).format(
    new Date(2000, i),
  );
});

const weekdays = Array.from({ length: 7 }, (_, i) => {
  return new Intl.DateTimeFormat("ru-RU", { weekday: "long" }).format(
    new Date(2022, 0, i + 3),
  );
});

export const MonthlyCalendar = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [calendar, setCalendar] = useState<(Date | null)[]>(() =>
    generateCalendar({ year, month }),
  );

  const handleYearChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const newYear = parseInt(e.target.value);
    setYear(newYear);
    setCalendar(generateCalendar({ year: newYear, month }));
  };

  const handleMonthChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const newMonth = parseInt(e.target.value);
    setMonth(newMonth);
    setCalendar(generateCalendar({ year, month: newMonth }));
  };

  return (
    <div className="flex flex-col items-center p-4 bg-white h-screen">
      <div className="mb-4 print:hidden">
        <label htmlFor="year" className="mr-2 font-bold">
          Год:
        </label>
        <input
          type="number"
          id="year"
          value={year}
          onChange={handleYearChange}
          min="1900"
          max="2100"
          className="border p-1 mr-4 rounded"
        />
        <label htmlFor="month" className="mr-2 font-bold">
          Месяц:
        </label>
        <select
          id="month"
          value={month}
          onChange={handleMonthChange}
          className="border p-1 rounded"
        >
          {monthNames.map((name, index) => (
            <option key={index} value={index}>
              {name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex w-full justify-between mb-4 text-4xl font-bold capitalize">
        <span className="text-slate-700">{monthNames[month]}</span>
        <span className="text-slate-700">{year}</span>
      </div>
      <div className="grid grid-cols-7 gap-1 w-full h-[calc(100%-3rem)] grid-rows-[min-content_auto]">
        {weekdays.map((day, index) => (
          <WeekdayHeader key={day} index={index}>
            {day}
          </WeekdayHeader>
        ))}
        {calendar.map((day, index) => (
          <DaySquare
            key={index}
            index={index}
            day={day}
            keyPrefix={"monthly-calendar"}
          />
        ))}
      </div>
    </div>
  );
};
