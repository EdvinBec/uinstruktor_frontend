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
  const [isColapsed, setIsColapsed] = useState(true);

  return (
    <div
      onClick={() => setIsColapsed(!isColapsed)}
      className={`my-4 h-[60px] w-1/2 border p-4 shadow-lg rounded-xl transition-all ${
        passed && "h-[100px]"
      }`}
    >
      <div className="flex flex-row justify-between">
        <div>
          {isColapsed ? (
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
      {!isColapsed && (
        <div>
          <p>Input: {input}</p>
        </div>
      )}
    </div>
  );
};

export default TestCaseCard;
