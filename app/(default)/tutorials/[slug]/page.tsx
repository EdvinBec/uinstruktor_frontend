import React from "react";
import CodeBlock from "@/components/Tutorials/CodeBlock";
import Paginator from "@/components/ui/paginator";
import { getTutorialItem } from "@/lib/Services";
import { letterToUpper } from "@/lib/utils";

type TutorialItem = {
  id: string;
  chapterID: string;
  title: string;
  description: string;
  code: string;
  created_at: string;
};

const TutorialPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const tutorial = (await getTutorialItem(slug)) as TutorialItem[];

  return (
    <div className="p-4">
      <Paginator
        links={[
          { display: "C++", href: "/tutorials" },
          {
            display: `${letterToUpper(slug.split("-").join(" "))}`,
            href: "",
            current: true,
          },
        ]}
      />
      <div className="mt-8 space-y-6">
        {tutorial.map((item, idx) => {
          return (
            <CodeBlock
              key={idx}
              title={item.title}
              description={item.description}
              code={item.code}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TutorialPage;
