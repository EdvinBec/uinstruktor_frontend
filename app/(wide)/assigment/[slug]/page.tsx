import IDE from "@/components/IDE";
import { getAssigmentData } from "@/lib/class";
import React from "react";

const AssigmentPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const assigment = await getAssigmentData(slug);
  return (
    <div className="p-2">
      <IDE
        title={assigment.title}
        description={assigment.description}
        taglines={""}
        language="cpp"
        type="assigment"
        ID={slug}
      />
    </div>
  );
};

export default AssigmentPage;
