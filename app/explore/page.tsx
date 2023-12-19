import { getProblemsList } from "@/lib/Services";
import { Problem } from "@/types";
import ProblemCategory from "@/components/ProblemCard/Category";
import useAuth from "@/hooks/useAuth";

const ExplorePage = async () => {
  const problems = await (await getProblemsList()).json();
  const probs: Problem[] = problems.data;

  return (
    <div className=" flex flex-col gap-4">
      <ProblemCategory
        description="Master the Art of String Manipulation"
        category="strings"
        problems={probs}
      />
      <ProblemCategory
        description="Elevate Your Array Expertise for Superior Coding Mastery"
        category="arrays"
        problems={probs}
      />
      <ProblemCategory
        description="Enhance Your File Handling Prowess for Seamless Data Management"
        category="files"
        problems={probs}
      />
    </div>
  );
};

export default ExplorePage;
