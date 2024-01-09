"use client";
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronRight } from "lucide-react";

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
      onClick={() => setIsCollapsed(!isCollapsed)}
      className={`my-4 w-1/2 border shadow cursor-pointer rounded-xl flex flex-col justify-center transition-all`}
    >
      <div
        className={`flex flex-row justify-between p-2 ${
          !isCollapsed && "border-b-2"
        }`}
      >
        <div>
          {isCollapsed ? (
            <ChevronRight className="inline" />
          ) : (
            <ChevronDown className="inline" />
          )}
          <h3 className="inline">Test case {index}</h3>
        </div>
        <Badge variant={passed ? "passed" : "failed"}>
          {passed ? "passed" : "failed"}
        </Badge>
      </div>

      <div
        className={`animate-open-dropdown p-2 ${
          isCollapsed ? "hidden h-0" : "block h-full"
        }`}
      >
        <p>
          Input:
          <span className=" font-medium">{input}</span>
        </p>
        <p>
          Output: <span className=" font-medium">{actualOutput}</span>
        </p>
        <p>
          Expected output:<span className=" font-medium"> {output}</span>
        </p>
      </div>
    </div>
  );
};

export default TestCaseCard;
