"use client";

import CodeEditor from "@/components/ui/code-editor";
import React, { useState } from "react";

const EvalJobPage = ({ params }: { params: { slug: string } }) => {
  const [code, setCode] = useState("");

  const handleEditorChange = (value: string | undefined) => {};

  return (
    <div>
      <div>EvalJobPage {params.slug}</div>
      <div className="flex flex-row overflow-hidden">
        <div className="flex-1">
          <h2 className="text-4xl font-semibold">Description</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
            saepe placeat dicta harum exercitationem consequuntur tenetur illum
            tempore cupiditate, iste quidem ipsa esse natus debitis quod tempora
            delectus vero atque?
          </p>
        </div>
        <div className="flex-1">
          <CodeEditor
            defaultLanguage={params.slug === "cpp" ? "cpp" : "python"}
            defaultValue=""
            value={code}
            width=""
            onChange={handleEditorChange}
          />
        </div>
      </div>
    </div>
  );
};

export default EvalJobPage;
