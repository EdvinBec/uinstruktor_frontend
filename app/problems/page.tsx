"use client";
import ProblemCard from "@/components/ProblemCard/ProblemCard";
import { Dropdown, DropdownTrigger } from "@/components/ui/dropdown";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Problem, fetchProblems } from "@/lib/problem";
import { groupProblems } from "@/lib/utils";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";

const ProblemsPage = () => {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [search, setSearch] = useState("");
  const [err, setErr] = useState(false);

  useEffect(() => {
    fetchProblems().then((data) => {
      if (!data) {
        setErr(true);
      } else {
        setProblems(data);
      }
    });
  }, []);

  if (!problems) {
    return <div>Error</div>;
  }

  console.log(groupProblems(problems));
  return (
    <div>
      <div className="p-2 flex flex-row gap-4">
        <div>
          <Label htmlFor="problemSearch">
            Problem name
            <Input
              id="problemSearch"
              value={search}
              onValueChange={setSearch}
            />
          </Label>
        </div>
        <Dropdown>
          <DropdownTrigger>Categories</DropdownTrigger>
        </Dropdown>
      </div>
      <div className="flex flex-row flex-wrap gap-4">
        {problems.map((problem, index) => (
          <ProblemCard
            id={index}
            title={problem.title}
            difficulty={problem.difficulty}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default ProblemsPage;
