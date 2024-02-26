import {
  TutorialChapter,
  TutorialLi,
  TutorialNavigation,
} from "@/components/Tutorials/TutorialNavigation";
import Link from "next/link";
import React from "react";
//import { TutorialChapters } from "./config";
import { getTutorialChapters } from "@/lib/Services";
import PageHeader from "../exercises/components/PageHeader";

type Tutorial = {
  id: string;
  name: string;
  items: { title: string; id: string }[] | null;
};

const TutorialLayout = async ({ children }: { children: React.ReactNode }) => {
  const tutorialChapters = (await getTutorialChapters()) as Tutorial[];

  return (
    <div>
      <PageHeader
        title="C++ Gradivo"
        descritpion="Tukaj si lahko ogledate vse od osnov do naprednih konceptov C++ jezika. To gradivo vsebuje vse kar je potrebno, da uspešno reušujete vaje in tečaje na platformi."
        classname="mt-8 mb-16"
      />
      <div className="flex flex-row gap-12 h-screen">
        <nav className="w-[200px] hidden md:block">
          <TutorialNavigation>
            {tutorialChapters.map((chapter, idx) => {
              return (
                <TutorialChapter key={idx} title={chapter.name}>
                  {chapter.items &&
                    chapter.items.map((item, itemIdx: number) => {
                      return (
                        <TutorialLi href={item.id} key={itemIdx}>
                          {item.title}
                        </TutorialLi>
                      );
                    })}
                </TutorialChapter>
              );
            })}
          </TutorialNavigation>
        </nav>
        <div className="flex-[4]">{children}</div>
      </div>
    </div>
  );
};

export default TutorialLayout;
