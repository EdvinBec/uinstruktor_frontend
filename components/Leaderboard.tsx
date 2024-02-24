import { cm } from "@/lib/utils";
import { Badge, User } from "lucide-react";
import React from "react";

const Leaderboard = () => {
  return (
    <div className="rounded-xl border sm:max-w-[80%] md:max-w-[50%] min-w-[30%] sm:min-w-[40%] border-gray-400 p-4">
      <div className="flex flex-col md:flex-row justify-between">
        <h2 className="font-semibold font-lg">Lestvica najboljših</h2>
        <p className="text-neutral-600 dark:text-neutral-400">
          Dnevni prispevek
        </p>
      </div>
      <div className="divide-x flex flex-row my-4">
        <div className="pr-4">
          <p className="font-semibold">{Math.floor(Math.random() * 1000)}</p>
          <p className="text-neutral-600">XP</p>
        </div>
        <div className="pl-4">
          <p className="font-semibold">{Math.floor(Math.random() * 30)}</p>
          <p className="text-neutral-600">Trenutna pozicija</p>
        </div>
      </div>
      <div className="mt-4">
        <div className="p-2 flex justify-between">
          <div>
            <span className="text-neutral-600">#</span>
            <span className="text-neutral-600 ml-8">User</span>
          </div>
          <p className="text-neutral-600 dark:text-neutral-400">XP</p>
        </div>
        <div className="divide-y">
          {Array.from({ length: 10 }).map((_, index) => {
            return (
              <div
                key={index}
                className={cm(
                  "flex justify-between p-2",
                  index === 0
                    ? "bg-gradient-to-r to-50% from-amber-400/30"
                    : index === 1
                    ? "bg-gradient-to-r to-50% from-zinc-400/30"
                    : index === 2
                    ? "bg-gradient-to-r to-50% from-[#cd7f32]/30"
                    : "",
                )}
              >
                <div className="flex flex-row items-center gap-2">
                  <div className="relative">
                    <p>{index + 1}</p>
                  </div>
                  <div className="ml-8 bg-neutral-400 rounded-full p-1 w-max">
                    <User />
                  </div>
                  <p className="">John Doe</p>
                </div>
                <p>{Math.floor(Math.random() * 1000)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
