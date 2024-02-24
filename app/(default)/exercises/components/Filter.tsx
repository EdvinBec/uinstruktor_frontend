import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import React from "react";

type Props = {
  filter: {
    difficulty: string;
  };
  setFilter: React.Dispatch<
    React.SetStateAction<{
      difficulty: string;
    }>
  >;
  values: { value: string; options: string[] }[];
};

const Filter = ({ filter, setFilter, values }: Props) => {
  const handleDifficultyChange = (difficulty: string) => {
    setFilter({ ...filter, difficulty });
  };
  const clearFilters = () => {
    setFilter({ difficulty: "" });
  };

  return (
    <>
      <Button onClick={clearFilters} className="ml-4" size="sm">
        Pocisti filtre
      </Button>
      <div className="flex flex-col mt-6 gap-6 divide-y">
        {values.map((value, idx) => {
          return (
            <div className="py-2 space-y-2" key={idx}>
              <h3 className="font-semibold">{value.value}</h3>
              {value.options.map((option, idx) => {
                return (
                  <div
                    key={idx}
                    className="flex flex-row items-center justify-start gap-2"
                  >
                    <Checkbox
                      checked={filter.difficulty === option}
                      onCheckedChange={(checked) =>
                        checked
                          ? handleDifficultyChange(option)
                          : handleDifficultyChange("")
                      }
                      className="scale-[120%]"
                    />
                    <p>{option}</p>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Filter;
