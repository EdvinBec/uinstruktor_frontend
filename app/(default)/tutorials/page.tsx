"use client";
import CodeBlock from "@/components/Tutorials/CodeBlock";
import {
  Navigation,
  NavigationChapter,
  NavigationHeading,
  NavigationItem,
} from "@/components/Tutorials/Navigation";

import React, { useState } from "react";
import { ListItem, VariablesChapter } from "./config";

const CppTutorialPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const test = `type function_name(type1 param1, type2 param2, ...) {
  // code
}`;

  return (
    <div className="w-full flex gap-8">
      <div className="hidden md:block">
        <Navigation setIsOpen={toggleMenu}>
          <NavigationChapter>
            <NavigationHeading>Variables</NavigationHeading>
            {VariablesChapter.map((item: ListItem, itemIdx: number) => {
              return (
                <NavigationItem key={itemIdx} id="variables-declaration">
                  {item.header}
                </NavigationItem>
              );
            })}
          </NavigationChapter>
          <NavigationChapter>
            <NavigationHeading>Functions</NavigationHeading>
            <NavigationItem id="function-declaration">
              Declaration{" "}
            </NavigationItem>
            <NavigationItem id="function-calling">Calling</NavigationItem>
            <NavigationItem id="function-params">Parameters</NavigationItem>
          </NavigationChapter>
        </Navigation>
      </div>
      <div className="md:overflow-y-auto md:h-[90vh] space-y-8 w-[400px] md:w-full">
        {VariablesChapter.map((item: ListItem, itemIdx: number) => {
          return (
            <CodeBlock
              key={itemIdx}
              id={item.id}
              header={item.header}
              description={item.description}
              code={item.code}
              language="cpp"
            />
          );
        })}
      </div>
    </div>
  );
};

export default CppTutorialPage;
