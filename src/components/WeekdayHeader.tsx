import { useLocalStorage } from "../utils/hooks.ts";
import { ChangeEvent, PropsWithChildren } from "react";

const colors = [
  { bg: "bg-[#5DADE2]", border: "border-[#5DADE2]" },
  { bg: "bg-[#FF7E67]", border: "border-[#FF7E67]" },
  { bg: "bg-[#A6D683]", border: "border-[#A6D683]" },
  { bg: "bg-[#FFD166]", border: "border-[#FFD166]" },
  { bg: "bg-[#FF9FF3]", border: "border-[#FF9FF3]" },
  { bg: "bg-[#45B7B8]", border: "border-[#45B7B8]" },
  { bg: "bg-[#FF6B6B]", border: "border-[#FF6B6B]" },
];

export const WeekdayHeader = ({
  children,
  index,
}: PropsWithChildren<{
  index: number;
}>) => (
  <div
    className={`font-bold p-2 text-xl text-center rounded-lg ${colors[index].bg} text-white capitalize`}
  >
    {children}
  </div>
);

export const DaySquare = ({
  day,
  index,
  keyPrefix,
}: {
  day: Date | null;
  index: number;
  keyPrefix: string;
}) => {
  const storageKey = day
    ? `${keyPrefix}_day_${day.getFullYear()}_${day.getMonth() + 1}_${day.getDate()}`
    : keyPrefix;

  const [inputValue, setInputValue] = useLocalStorage(storageKey, "");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div
      className={`p-1 h-16 relative text-2xl rounded-lg ${colors[index % 7].border} border-2 h-full dayContainer`}
    >
      <input
        className="w-full h-full p-2 dayContainerChild text-center"
        value={inputValue}
        onChange={handleInputChange}
      />
      {day ? (
        <>
          <span className="right-2 bottom-2 absolute font-semibold text-slate-700">
            {day.getDate()}
          </span>
        </>
      ) : null}
    </div>
  );
};
