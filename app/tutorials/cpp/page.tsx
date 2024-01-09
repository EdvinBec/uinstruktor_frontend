"use client";
import CodeBlock from "@/components/Tutorials/CodeBlock";
import {
  Navigation,
  NavigationChapter,
  NavigationHeading,
  NavigationItem,
} from "@/components/Tutorials/Navigation";

import React, { useState } from "react";

const CppTutorialPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const test = `type function_name(type1 param1, type2 param2, ...) {
  // code
}`;

  return (
    <div className="w-full h-full">
      <Navigation setIsOpen={toggleMenu}>
        <NavigationChapter>
          <NavigationHeading>Variables</NavigationHeading>
          <NavigationItem id="variables-declaration">
            Declaration
          </NavigationItem>
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
      {menuOpen && (
        <div className=" space-y-8">
          <CodeBlock
            id="variables-declaration"
            header="User input"
            description="Lorem ipsum dolor sit amet."
            code="int main() {}"
            language="cpp"
          />
          <CodeBlock
            id="function-declaration"
            header="Function declaration"
            description="Lorem ipsum dolor sit amet."
            code={test}
            language="cpp"
          />
        </div>
      )}
    </div>
  );
};

export default CppTutorialPage;
