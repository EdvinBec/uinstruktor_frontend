import RoadmapItem from "@/components/Roadmap/roadmapItem";
import { getProblemsList } from "@/lib/Services";
import { decryptAuthToken, decryptToken } from "@/lib/auth";
import { ApiResponse, Problem } from "@/types";
import Cookies from "universal-cookie";

const ExplorePage = async () => {
  const cookies = new Cookies();
  const username = await decryptToken(cookies.get("token"));

  const problems: ApiResponse<Problem[]> = await getProblemsList(
    username as string,
  );

  return (
    <div className="w-full flex flex-col gap-8">
      {problems.data?.map((item: Problem, itemIdx: number) => {
        console.log(item);

        return (
          <RoadmapItem
            key={itemIdx}
            title={item.title}
            description="Start your programming journey by mastering the iconic Hello, World!"
            tags={["Strings", "I/O"]}
            variant={itemIdx % 2 === 0 ? "purple" : "yellow"}
            side={itemIdx % 2 === 0 ? "left" : "right"}
            disabled={item.isCompleted!}
          />
        );
      })}
    </div>
  );
};

export default ExplorePage;
