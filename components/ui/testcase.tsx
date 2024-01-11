import React from "react";
import { Label } from "./label";
import { Input } from "./input";

type TestCase = {
  input: string;
  output: string;
};

type Props = {
  value: TestCase;
  index: number;
  setTestCases: React.Dispatch<React.SetStateAction<TestCase[]>>;
};

const Testcase = ({ value, index, setTestCases }: Props) => {
  function handleTestCaseInput(value: string) {
    setTestCases((prev) => {
      const newTestCases = [...prev];
      newTestCases[index].input = value;
      return newTestCases;
    });
  }
  function handleTestCaseOutput(value: string) {
    setTestCases((prev) => {
      const newTestCases = [...prev];
      newTestCases[index].output = value;
      return newTestCases;
    });
  }

  return (
    <div className="p-2 rounded-xl border">
      <h3 className="text-lg">Test case {index + 1}</h3>
      <Label>
        Input
        <Input value={value.input} onValueChange={handleTestCaseInput} />
      </Label>
      <Label>
        Output
        <Input value={value.output} onValueChange={handleTestCaseOutput} />
      </Label>
    </div>
  );
};

export default Testcase;
