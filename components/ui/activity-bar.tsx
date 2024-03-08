"use client";
import { fetchUserActivity } from "@/lib/user";
import { cm, monthNames } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  username: string;
};

type Day = {
  timestamp: Date;
  value: number;
};

const Day = ({ value, timestamp }: { value: number; timestamp: Date }) => {
  const [hovered, setHovered] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  return (
    <div
      className=""
      onMouseEnter={(e) => {
        setPosition({ x: e.clientX, y: e.clientY });
      }}
      onMouseOver={(e) => {
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
    >
      <div
        style={{
          backgroundColor: value !== 0 ? `rgba(0, 200, 0, ${value / 4})` : "",
        }}
        className={cm(
          "w-3 h-3 rounded-sm",
          value === 0 ? "bg-neutral-300 dark:bg-neutral-600" : "",
        )}
      ></div>
      {hovered && (
        <div className="absolute  animate-fade-in z-50 dark:bg-neutral-700 bg-white translate-x-[-50%] translate-y-[-3rem]  border border-neutral-500 px-2 py-1 rounded-lg">
          <p className="text-sm whitespace-nowrap text-neutral-500">
            <span className="text-semibold text-black">{value}</span> nalog
            resenih na{" "}
            <span className="text-semibold text-black">
              {new Date(timestamp).toLocaleDateString("sl", {
                day: "numeric",
                month: "long",
              })}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

const ActivityBar = ({ username }: Props) => {
  const [entries, setEntries] = useState<Day[][]>([]);
  const [err, setErr] = useState(false);

  useEffect(() => {
    const populateEntries = async () => {
      const userActivity = await fetchUserActivity(username);
      console.log(userActivity);
      if (userActivity.status === "error") setErr(true);
      if (userActivity.data) {
        setEntries([]);
        let k = 0;
        for (let i = 0; i < 52; i++) {
          const week: Day[] = [];
          for (let j = 0; j < 7; j++) {
            week.push(userActivity.data[k]);
            k++;
          }
          setEntries((entries) => [...entries, week]);
        }
      }
    };
    populateEntries();
  }, [username]);

  const months: string[] = [];

  for (let i = 0; i < 11; i++) {
    const currentMonth = new Date().getMonth() - 1;
    if (currentMonth - i < 0) {
      const date = new Date();
      date.setMonth(12 - i);
      months.push(
        date.toLocaleString("sl", { month: "short" }).replace(".", ""),
      );
    } else {
      const date = new Date();
      date.setMonth(currentMonth - i);
      months.push(
        date.toLocaleString("sl", { month: "short" }).replace(".", ""),
      );
    }
  }

  return (
    <>
      {err ? (
        <p></p>
      ) : (
        <div className="overflow-x-auto self-center max-w-sm md:max-w-[850px]">
          <div className="flex px-3 flex-row justify-between w-full  gap-4">
            {months.reverse().map((month, index) => (
              <p className="capitalize" key={index}>
                {month}
              </p>
            ))}
          </div>
          <div className="p-2 rounded-lg flex-row flex gap-1">
            {entries.map((week, weekIndex) => {
              return (
                <div key={weekIndex} className="flex flex-col gap-1">
                  {week.map((day, dayIndex) => {
                    return (
                      <Day
                        value={day.value}
                        timestamp={day.timestamp}
                        key={dayIndex}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
          <div className="flex flex-row items-center gap-4 px-2">
            <p>Majn</p>
            <div className="flex flex-row gap-1">
              {Array.from({ length: 5 }, (_, idx) => {
                return (
                  <div
                    style={{
                      backgroundColor:
                        idx !== 0 ? `rgba(0, 200, 0, ${idx / 4})` : "",
                    }}
                    key={idx}
                    className="w-3 h-3 rounded-sm bg-neutral-300 dark:bg-neutral-600"
                  ></div>
                );
              })}
            </div>
            <p>Vec</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ActivityBar;
