import {
  TutorialChapter,
  TutorialLi,
  TutorialNavigation,
} from "@/components/Tutorials/TutorialNavigation";
import Link from "next/link";
import React from "react";
//import { TutorialChapters } from "./config";
import { getTutorialChapters } from "@/lib/Services";

type Tutorial = {
  id: string;
  name: string;
  items: { title: string; id: string }[] | null;
};

const TutorialLayout = async ({ children }: { children: React.ReactNode }) => {
  const tutorialChapters = (await getTutorialChapters()) as Tutorial[];

  return (
    <div className="flex flex-row gap-4 h-screen">
      <nav className="flex-1 mt-6">
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
  );
};

export default TutorialLayout;
