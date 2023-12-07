import { getProblemsList } from "@/lib/Services";
import ProblemCard from "@/components/ProblemCard/ProblemCard";
import { Problem } from "@/types";
import ProblemCategory from "@/components/ProblemCard/Category";

const ExplorePage = async () => {
  const problems = await (await getProblemsList()).json();
  const probs: Problem[] = problems.data;

  return (
    <div className="h-full flex flex-col gap-4 px-4">
      <ProblemCategory category="strings" problems={probs} />
      <ProblemCategory category="arrays" problems={probs} />
      <ProblemCategory category="files" problems={probs} />
    </div>
  );
};

export default ExplorePage;
