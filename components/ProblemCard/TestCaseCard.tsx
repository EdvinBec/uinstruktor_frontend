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
      className={`my-4 w-1/2 border shadow  rounded-xl flex flex-col justify-center transition-all`}
    >
      <div
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={`flex flex-row justify-between cursor-pointer p-2 ${
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
        <div className="mt-2 border-t flex flex-row items-center justify-end">
          <Flag size={17} />
          <Button variant={"link"}>Report a problem</Button>
        </div>
      </div>
    </div>
  );
};

export default TestCaseCard;
