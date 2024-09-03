import { useState, ChangeEventHandler, useEffect } from "react";

const monthNames = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

const weekdays = [
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
  "Воскресенье",
];

const colors = [
  { bg: "bg-[#5DADE2]", border: "border-[#5DADE2]" },
  { bg: "bg-[#FF7E67]", border: "border-[#FF7E67]" },
  { bg: "bg-[#A6D683]", border: "border-[#A6D683]" },
  { bg: "bg-[#FFD166]", border: "border-[#FFD166]" },
  { bg: "bg-[#FF9FF3]", border: "border-[#FF9FF3]" },
  { bg: "bg-[#45B7B8]", border: "border-[#45B7B8]" },
  { bg: "bg-[#FF6B6B]", border: "border-[#FF6B6B]" },
];

const generateCalendar = ({ year, month }: { year: number; month: number }) => {
  const firstDay = new Date(year, month, 1);
  let startDay = firstDay.getDay() - 1;
  if (startDay === -1) startDay = 6;

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const calendarDays = [];

  for (let i = 0; i < startDay; i++) {
    calendarDays.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
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

const Calendar = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [calendar, setCalendar] = useState<(number | null)[]>(() =>
    generateCalendar({ year, month }),
  );

  useEffect(() => {
    // Set print orientation to landscape
    const style = document.createElement("style");
    style.textContent = `
      @page {
        size: landscape;
      }
      @media print {
        body, html {
          height: 100%;
          margin: 0;
          padding: 0;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

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
      <div className="flex w-full justify-between mb-4 text-4xl font-bold">
        <span className="text-slate-700">{monthNames[month]}</span>
        <span className="text-slate-700">{year}</span>
      </div>
      <div className="grid grid-cols-7 gap-1 w-full h-[calc(100%-3rem)] grid-rows-[min-content_auto]">
        {weekdays.map((day, index) => (
          <div
            key={day}
            className={`font-bold p-2 text-center rounded-lg ${colors[index].bg} text-white`}
          >
            {day}
          </div>
        ))}
        {calendar.map((day, index) => (
          <div
            key={index}
            className={`p-1 text-center h-16 flex text-xl rounded-lg ${colors[index % 7].border} border-2 h-full`}
          >
            <span className="self-end justify-self-end ml-auto font-semibold text-slate-700">
              {day}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
