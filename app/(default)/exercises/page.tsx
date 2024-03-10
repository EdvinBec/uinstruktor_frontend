"use client";
import React, { useEffect, useState } from "react";
import Exercise from "./components/Exercise";
import Filter from "./components/Filter";
import { Exercise as ExerciseT } from "@/types";
import { getExercises } from "@/lib/Services";
import PageHeader from "./components/PageHeader";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useTour } from "@reactour/tour";

const ExercisesPage = () => {
  const { toast } = useToast();
  const { setIsOpen } = useTour();

  const [filter, setFilter] = useState<{
    category: string;
    difficulty: string;
  }>({
    difficulty: "",
    category: "",
  });
  const [exercises, setExercises] = useState<ExerciseT[]>([]);

  useEffect(() => {
    getExercises().then((data) => {
      setExercises(data);
    });

    if (!localStorage.getItem("exerciseTour")) {
      toast({
        title: "Uvod v vaje",
        description: "Z klikom na gumb, si lahko ogledate vodenje skozi vaje.",
        action: (
          <ToastAction
            altText="Poglej uvod"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            Poglej uvod
          </ToastAction>
        ),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function pravaOblika(stVaj: number) {
    if (stVaj === 1) {
      return "Vaja";
    } else if (stVaj === 2) {
      return "Vaji";
    } else if (stVaj === 3) {
      return "Vaje";
    } else {
      return "Vaj";
    }
  }

  return (
    <div className="mt-8 h-full dark:text-white" data-tour="step-exercise">
      <PageHeader
        title="Vaje"
        descritpion="Razišči našo obsežno knjižnico vaj za C++, ki so posebej zasnovane tako za začetnike kot za bolj napredne programerje. Z reševanjem nalog pridobijate točke, s katerimi lahko tekmujete z ostalimi uporabniki."
      />
      <div className="mt-8">
        <div className="flex flex-row py-6 px-1 gap-6">
          <div className="flex-1 hidden md:flex" data-tour="step-exercise-2">
            <Filter
              values={[
                { value: "Tezavnost", options: ["Lahko", "Srednje", "Tezko"] },
                {
                  value: "Kategorije",
                  options: ["Nizi", "Stevila", "Zanke"],
                },
              ]}
              filter={filter}
              setFilter={setFilter}
            />
          </div>
          <div
            className="flex-[5] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            data-tour="step-exercise-3"
          >
            {exercises
              .filter((vaja: ExerciseT) => {
                if (filter.difficulty === "" && filter.category === "") {
                  return true;
                } else if (
                  (filter.difficulty === "" ||
                    vaja.difficulty.toLowerCase() ===
                      filter.difficulty.toLowerCase()) &&
                  (filter.category === "" ||
                    vaja.tags
                      .toLowerCase()
                      .includes(filter.category.toLowerCase()))
                ) {
                  return true; // return true if exercise matches both filters
                } else {
                  return false; // return false if exercise doesn't match filters
                }
              })
              .map((vaja, idx) => {
                return (
                  <Exercise
                    title={vaja.title}
                    exerciseID={vaja.exerciseID}
                    description={vaja.description}
                    difficulty={vaja.difficulty}
                    points={vaja.points}
                    tags={vaja.tags}
                    key={idx}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExercisesPage;
