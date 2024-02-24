"use client";
import React, { useState } from "react";
import Exercise from "./components/Exercise";
import Filter from "./components/Filter";

const ExercisesPage = () => {
  const [filter, setFilter] = useState({
    difficulty: "",
  });

  return (
    <div className="mt-16">
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
            {8} Vaj
          </span>
        </h2>
        <div className="flex flex-row py-6 px-1 gap-6">
          <div className="flex-[0.25]">
            <Filter
              values={[
                { value: "Tezavnost", options: ["Lahko", "Srednje", "Tezko"] },
              ]}
              filter={filter}
              setFilter={setFilter}
            />
          </div>
          <div className="grid grid-cols-3 gap-6">
            {Array.from({ length: 8 }).map((_, idx) => {
              return (
                <Exercise
                  title="Ime Vaje"
                  exerciseID={""}
                  description="Kratek opis vaje. Kaj se bo moralo naret in kaj se pricakuje ter kaj se bo naucil."
                  difficulty="Lahko"
                  points={250}
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
