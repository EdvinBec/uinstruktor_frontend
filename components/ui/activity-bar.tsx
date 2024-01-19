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

const Day = ({ value }: { value: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className="relative"
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        style={{
          backgroundColor: value !== 0 ? `rgba(0, 200, 0, ${value / 10})` : "",
        }}
        className={cm(
          "w-3 h-3 rounded-sm",
          value === 0 ? "bg-neutral-800" : "",
        )}
      ></div>
      {isHovered && (
        <div className="absolute z-50 top-[-30px] bg-neutral-700 left-1/2 translate-x-[-50%] px-2 py-1 rounded-lg">
          {/* <ChevronDown className="absolute left-1/2 bottom-[-15px] translate-x-[-50%] " /> */}
          <p className="text-sm whitespace-nowrap">
            Completed {value / 5} tasks
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

  return (
    <>
      {err ? (
        <p></p>
      ) : (
        <div className="">
          {/* <div className="flex flex-row justify-between">
        {monthNames.map((month, index) => (
          <p key={index}>{month}</p>
        ))}
      </div> */}
          <div className=" overflow-x-auto p-2 rounded-lg flex-row flex gap-1">
            {entries.map((week, weekIndex) => {
              return (
                <div key={weekIndex} className="flex flex-col gap-1">
                  {week.map((day, dayIndex) => {
                    return <Day value={day.value} key={dayIndex} />;
                  })}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default ActivityBar;
