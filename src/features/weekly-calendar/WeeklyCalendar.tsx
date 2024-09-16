import { DaySquare, WeekdayHeader } from "../../components/WeekdayHeader.tsx";
import { useLocalStorage } from "../../utils/hooks.ts";

const weekdays = Array.from({ length: 5 }, (_, i) => {
  return new Intl.DateTimeFormat("ru-RU", { weekday: "long" }).format(
    new Date(2022, 0, i + 3),
  );
});

export const WeeklyCalendar = () => {
  const [names, setNames] = useLocalStorage<string[] | null>(
    "weekly-calendar-names",
    null,
  );

  return (
    <div className="flex flex-col items-center p-4 bg-white h-screen">
      <div className="mb-4 print:hidden">
        <textarea
          className="border-2"
          onChange={(e) => {
            const newLineSplit = e.target.value.split("\n");

            setNames(newLineSplit);
          }}
          value={names?.join("\n")}
        />
      </div>

      <div className="grid grid-cols-6 gap-1 w-full h-[calc(100%-3rem)] grid-rows-[min-content_auto]">
        <WeekdayHeader key={"name"} index={6} />
        {weekdays.map((day, index) => (
          <WeekdayHeader key={day} index={index} children={day} />
        ))}
        {names?.map((name) => (
          <>
            <div
              className={`flex justify-center items-center font-bold p-2 text-3xl text-center rounded-lg border-2 text-white capitalize bg-[#45B7B8] border-[#45B7B8]`}
            >
              {name}
            </div>
            {Array.from({ length: 5 }, (_, i) => (
              <DaySquare
                index={i}
                day={null}
                keyPrefix={`weekly-calendar-${name}-${i}`}
              />
            ))}
          </>
        ))}
      </div>
    </div>
  );
};
