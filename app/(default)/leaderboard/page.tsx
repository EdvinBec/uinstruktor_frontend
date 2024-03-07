import { Badge, User } from "lucide-react";
import React from "react";

const Leaderboard = () => {
  return (
    <div className="flex flex-col mt-16">
      <h1 className="text-3xl font-bold mb-16">Lestvica najboljših</h1>
      <div className="flex flex-row  w-full md:w-3/4 self-center justify-between gap-6 items-end">
        <div className=" w-full">
          <div className="flex flex-col items-center justify-center">
            <User size={40} />
            <p>Uporabnik</p>
          </div>
          <div className="bg-white flex-1 h-[100px] rounded-xl p-4 border-4 border-[#cd7f32]"></div>
        </div>
        <div className=" w-full">
          <div className="flex flex-col items-center justify-center">
            <User size={40} />
            <p>Uporabnik</p>
          </div>
          <div className="bg-white flex-1 h-[160px] rounded-xl p-4 border-4 border-[#d4af37]"></div>
        </div>
        <div className=" w-full">
          <div className="flex flex-col items-center justify-center">
            <User size={40} />
            <p>Uporabnik</p>
          </div>
          <div className="bg-white flex-1 h-[130px] rounded-xl p-4 border-4 border-[#c3c7c7]"></div>
        </div>
      </div>
      <div className="flex flex-col gap-6 mt-8">
        {Array.from({ length: 8 }, (_, idx) => {
          return (
            <div
              key={idx}
              className="flex items-center justify-between gap-4 bg-white dark:bg-black p-4 rounded-lg shadow-md"
            >
              <div className="flex flex-row items-center gap-4">
                <div className="relative">
                  <Badge size={35} />
                  <span className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
                    {idx + 3}
                  </span>
                </div>
                <User />
                <p className="font-medium">Uporabnik</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Leaderboard;
