import {
  CardDetails,
  CardHeading,
  TutorialLangCard,
} from "@/components/Tutorials/TutorialLangCard";
import { BookOpenText } from "lucide-react";
import { tutorials } from "@/lib/tutorial";
import React from "react";

const TutorialPage = () => {
  return (
    <div className="h-[85vh] md:w-3/4 w-full">
      <div className="flex flex-col items-center justify-center  mb-8">
        <BookOpenText size={100} />
        <h1 className="text-6xl font-bold mb-2">Tutorials</h1>
        <h3>Code examples and explanations in different languages.</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {tutorials.map((tutorial, index) => (
          <TutorialLangCard key={index} href={tutorial.href}>
            <CardHeading>{tutorial.title}</CardHeading>
            <CardDetails numOf={Math.floor(Math.random() * (15 - 1))} />
          </TutorialLangCard>
        ))}
      </div>
    </div>
  );
};

export default TutorialPage;
