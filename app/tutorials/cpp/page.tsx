import CodeBlock from "@/components/Tutorials/CodeBlock";
import React from "react";

const CppTutorialPage = () => {
  return (
    <div className="w-full ">
      {/*
        Neki menu treba zgruntat da bo lepo zgledo
      */}
      <div>
        <CodeBlock
          header="User input"
          description="Lorem ipsum dolor sit amet."
          code="int main() {}"
          language="cpp"
        />
      </div>
    </div>
  );
};

export default CppTutorialPage;
