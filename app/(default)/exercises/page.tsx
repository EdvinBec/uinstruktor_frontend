"use client";
import React, { useEffect, useState } from "react";
import Exercise from "./components/Exercise";
import Filter from "./components/Filter";
import { Exercise as ExerciseT } from "@/types";
import { getExercises } from "@/lib/Services";

const ExercisesPage = () => {
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
  }, []);

  useEffect(() => {
    console.log(filter);
  }, [filter]);

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
    <div className="mt-16 h-screen">
      <h1 className="text-5xl font-bold">Vaje</h1>
      <p className="my-4">
        Želiš izboljšati svoje znanje v jeziku C++? Raziščite našo obsežno
        knjižnico vaj za C ++, ki so posebej zasnovane tako za začetnike kot za
        bolj napredne programerje. Ponujamo velik izbor vaj za kodiranje, ki
        pokrivajo vse pomembne teme, vključno z razredi, predmeti, nizi,
        matrikami in kazalci.
      </p>
      <div className="mt-16">
        <h2 className="border-b text-3xl font-semibold pb-2">
          C++ Vaje{" "}
          <span className="text-xl font-medium text-neutral-600 ml-8">
            {exercises.length} {pravaOblika(exercises.length)}
          </span>
        </h2>
        <div className="flex flex-row py-6 px-1 gap-6">
          <div className="flex-1">
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
          <div className="flex-[5] grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
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
