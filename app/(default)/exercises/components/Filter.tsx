import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import React from "react";

type Props = {
  filter: {
    difficulty: string;
    category: string;
  };
  setFilter: React.Dispatch<
    React.SetStateAction<{
      difficulty: string;
      category: string;
    }>
  >;
  values: { value: string; options: string[] }[];
};

const Filter = ({ filter, setFilter, values }: Props) => {
  const handleDifficultyChange = (difficulty: string) => {
    setFilter((prevState) => ({ ...prevState, difficulty }));
  };
  const handleCategoryChange = (category: string) => {
    setFilter((prevState) => ({ ...prevState, category }));
  };
  const clearFilters = () => {
    setFilter({ difficulty: "", category: "" });
  };

  return (
    <div className="bg-white px-8 py-8 rounded-md border-gray-200 border-[1px]">
      <Button onClick={clearFilters} className="w-full" size="sm">
        Počisti filtre
      </Button>
      <div className="flex flex-col mt-6 gap-2">
        {values.map((value, idx) => {
          return (
            <div className="py-2 space-y-2" key={idx}>
              <h3 className="font-bold text-sm">{value.value}</h3>
              {value.options.map((option, idx) => {
                return (
                  <div
                    key={idx}
                    className="flex flex-row items-center justify-start gap-2"
                  >
                    <Checkbox
                      checked={
                        value.value === "Tezavnost"
                          ? filter.difficulty === option
                          : filter.category === option
                      }
                      onCheckedChange={(checked) =>
                        checked
                          ? value.value === "Tezavnost"
                            ? handleDifficultyChange(option)
                            : handleCategoryChange(option)
                          : value.value === "Tezavnost"
                          ? handleDifficultyChange("")
                          : handleCategoryChange("")
                      }
                      className=""
                    />
                    <p className="text-sm">{option}</p>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Filter;
