"use client";
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronRight, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  input: string;
  output: string;
  actualOutput: string;
  passed: boolean;
  index: number;
};

const TestCaseCard = ({
  input,
  output,
  actualOutput,
  passed,
  index,
}: Props) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div
      className={`my-4 px-2 w-3/5 border-[1px] border-gray-200 bg-white dark:bg-black dark:border-0 rounded-md flex flex-col justify-center transition-all`}
    >
      <div
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={`flex flex-row justify-between items-center cursor-pointer p-2 ${
          !isCollapsed && "border-b-2"
        }`}
      >
        <div className="flex gap-2">
          {isCollapsed ? (
            <ChevronRight className="inline" size={20} />
          ) : (
            <ChevronDown className="inline" size={20} />
          )}
          <h3 className="inline text-sm font-semibold">
            Testni primer {index}
          </h3>
        </div>
        <Badge className="text-white" variant={passed ? "passed" : "failed"}>
          {passed ? "Opravljneo" : "Ni uspelo"}
        </Badge>
      </div>

      <div
        className={`animate-open-dropdown py-4 px-2 flex flex-col gap-1 ${
          isCollapsed ? "hidden h-0" : "block h-full"
        }`}
      >
        <p className="text-base font-medium">
          Vhod:
          <span className="font-bold">{input}</span>
        </p>
        <p className="text-base font-medium">
          Izpis: <span className="font-bold">{actualOutput}</span>
        </p>
        <p className="text-base font-medium">
          Pričakovan izpis:<span className="font-bold"> {output}</span>
        </p>
      </div>
    </div>
  );
};

export default TestCaseCard;
