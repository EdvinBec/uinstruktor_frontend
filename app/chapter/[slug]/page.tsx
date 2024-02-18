import RoadmapItem from "@/components/Roadmap/roadmapItem";
import { getChapterTasks } from "@/lib/Services";
import { decryptToken } from "@/lib/auth";
import { Task } from "@/types";
import { cookies } from "next/headers";

const ChapterPage = async ({ params }: { params: { slug: string } }) => {
  const cookie = cookies();
  const username = await decryptToken(cookie.get("token")?.value!);

  const tasks: Task[] = await getChapterTasks(params.slug, username as string);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-4">
        {tasks.map((item: Task, itemIdx: number) => {
          return (
            <RoadmapItem
              chapterID={params.slug}
              key={itemIdx}
              title={item.title}
              description={item.description}
              tags={["item.taglines", "test"]}
              taskID={item.taskID}
              disabled={
                (itemIdx === 0 && true) ||
                (itemIdx - 1 > 0 && tasks[itemIdx - 1].isCompleted)
              }
              side={itemIdx % 2 == 0 ? "left" : "right"}
              variant={itemIdx % 2 == 0 ? "yellow" : "purple"}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ChapterPage;
