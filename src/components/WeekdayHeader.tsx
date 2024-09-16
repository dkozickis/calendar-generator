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
  day,
  index,
}: {
  index: number;
  day: string;
}) => (
  <div
    className={`font-bold p-2 text-xl text-center rounded-lg ${colors[index].bg} text-white capitalize`}
  >
    {day}
  </div>
);

export const DaySquare = ({
  day,
  index,
}: {
  index: number;
  day: number | null;
}) => (
  <div
    className={`p-1 text-center h-16 flex text-2xl rounded-lg ${colors[index % 7].border} border-2 h-full`}
  >
    <span className="self-end justify-self-end ml-auto font-semibold text-slate-700">
      {day}
    </span>
  </div>
);
