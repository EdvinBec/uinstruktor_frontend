"use client";
import ProblemCard from "@/components/ProblemCard/ProblemCard";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "@/components/ui/dropdown";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Problem, fetchProblems } from "@/lib/problem";
import { groupProblems } from "@/lib/utils";
import { useEffect, useState } from "react";

const ProblemsPage = () => {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [search, setSearch] = useState({ name: "", category: "" });
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

  const handleCategoryFilter = (value: string) => {
    setSearch({ ...search, category: value });
  };

  return (
    <div>
      <div className="p-2 flex flex-row gap-4">
        <div>
          <Label htmlFor="problemSearch">
            Problem name
            <Input
              id="problemSearch"
              value={search.name}
              onValueChange={(value) => setSearch({ ...search, name: value })}
            />
          </Label>
        </div>
        <Label>
          Filter by category
          <Dropdown
            value={search.category}
            onValueChange={handleCategoryFilter}
          >
            <DropdownTrigger>Categories</DropdownTrigger>
            <DropdownContent>
              {Object.keys(groupProblems(problems)).map((category, index) => (
                <DropdownItem key={index}>{category}</DropdownItem>
              ))}
            </DropdownContent>
          </Dropdown>
        </Label>
      </div>
      <div className="flex flex-col items-center md:flex-row flex-wrap gap-4">
        {problems
          .filter((item) => {
            if (search.name === "") {
              return item;
            } else if (
              item.title.toLowerCase().includes(search.name.toLowerCase())
            ) {
              return item;
            }
          })
          .map((problem, index) => (
            <ProblemCard
              id={Number(problem.problemID)}
              className="w-full md:w-1/5"
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
