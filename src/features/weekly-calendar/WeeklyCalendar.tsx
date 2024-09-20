import { DaySquare, WeekdayHeader } from "../../components/WeekdayHeader.tsx";
import { useLocalStorage } from "../../utils/hooks.ts";
import { getRouteApi } from "@tanstack/react-router";

const getWeekdays = (count: number = 5) =>
  Array.from({ length: count }, (_, i) =>
    new Intl.DateTimeFormat("ru-RU", { weekday: "long" }).format(
      new Date(2022, 0, i + 3),
    ),
  );

const route = getRouteApi("/weekly");

const gridColVariants = {
  5: "grid-cols-6",
  7: "grid-cols-8",
} as const;

export const WeeklyCalendar = () => {
  const { dayCount } = route.useSearch();

  const [names, setNames] = useLocalStorage<string[] | null>(
    `weekly-calendar-names-${dayCount}`,
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

      <div
        className={`grid ${gridColVariants[dayCount]} gap-1 w-full h-[calc(100%-3rem)] grid-rows-[min-content_auto]`}
      >
        <WeekdayHeader key={"name"} index={6} />
        {getWeekdays(Number(dayCount)).map((day, index) => (
          <WeekdayHeader key={day} index={index} children={day} />
        ))}
        {names?.map((name) => (
          <>
            <div
              key={name}
              className={`flex justify-center items-center font-bold p-2 text-3xl text-center rounded-lg border-2 text-white capitalize bg-[#45B7B8] border-[#45B7B8]`}
            >
              {name}
            </div>
            {Array.from({ length: dayCount }, (_, i) => (
              <DaySquare
                key={i}
                index={i}
                day={null}
                keyPrefix={`weekly-calendar-${dayCount}-${name}-${i}`}
              />
            ))}
          </>
        ))}
      </div>
    </div>
  );
};
