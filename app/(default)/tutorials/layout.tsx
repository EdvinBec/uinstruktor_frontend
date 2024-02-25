import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import React from "react";

const TutorialLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-row">
      <ScrollArea type="always" className="h-[95vh] //my-8 //p-2 flex-[0.25]">
        {Array.from({ length: 10 }).map((_, idx) => {
          return (
            <div key={idx} className="text-lg my-8">
              <p className="font-medium">Some text</p>
              <div className="ml-2">
                <p>Some text</p>
                <p>Some text</p>
              </div>
            </div>
          );
        })}
      </ScrollArea>

      <div>{children}</div>
    </div>
  );
};

export default TutorialLayout;
