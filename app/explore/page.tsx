import { getProblemsList } from "@/lib/Services";
import ProblemCard from "@/components/ProblemCard/ProblemCard";

type Problem = {
  problemID: number;
  title: string;
  lang: string;
  difficulty: string;
  category: string;
};

const ExplorePage = async () => {
  const problems = await (await getProblemsList()).json();
  const probs: Problem[] = problems.data;

  return (
    <div className="h-full flex flex-col gap-4 px-4">
      <div>
        <h1 className="font-medium text-2xl tracking-wide mb-4">Strings</h1>
        <div className="flex gap-4">
          {probs.map((item: Problem, itemIdx: number) => {
            if (item.category == "strings") {
              return (
                <ProblemCard
                  key={itemIdx}
                  difficulty={item.difficulty}
                  title={item.title}
                  id={item.problemID}
                />
              );
            }
          })}
        </div>
      </div>
      <div>
        <h1 className="font-medium text-2xl tracking-wide mb-4">Arrays</h1>
        <div className="flex gap-4">
          {probs.map((item: Problem, itemIdx: number) => {
            if (item.category == "arrays") {
              return (
                <ProblemCard
                  key={itemIdx}
                  difficulty={item.difficulty}
                  title={item.title}
                  id={item.problemID}
                />
              );
            }
          })}
        </div>
      </div>
      <div>
        <h1 className="font-medium text-2xl tracking-wide mb-4">Files</h1>
        <div className="flex gap-4">
          {probs.map((item: Problem, itemIdx: number) => {
            if (item.category == "files") {
              return (
                <ProblemCard
                  key={itemIdx}
                  difficulty={item.difficulty}
                  title={item.title}
                  id={item.problemID}
                />
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
