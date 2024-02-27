import RoadmapItem from "@/components/Roadmap/roadmapItem";
import Paginator from "@/components/ui/paginator";
import { getChapterData, getChapterTasks } from "@/lib/Services";
import { decryptToken } from "@/lib/auth";
import { Task } from "@/types";
import { cookies } from "next/headers";

const ChapterPage = async ({ params }: { params: { slug: string } }) => {
  const cookie = cookies();
  const username = await decryptToken(cookie.get("token")?.value!);
  const chapter = await getChapterData(params.slug);
  const tasks: Task[] = await getChapterTasks(params.slug, username as string);
  return (
    <div>
      <Paginator
        links={[
          { display: "Tečaji", href: "/explore" },
          { display: chapter.courseTitle, href: `/course/${chapter.courseID}` },
          { display: chapter.name, href: "", current: true },
        ]}
      />
      <div className="hidden flex-col gap-4 md:flex">
        {tasks.map((item: Task, itemIdx: number) => {
          const wordsArray = item?.taglines

            .split(",")
            .slice(0, 2)
            .map((word) => word.trim());

          return (
            <RoadmapItem
              isCompleted={item.isCompleted}
              chapterID={params.slug}
              key={itemIdx}
              title={item.title}
              description={item.description}
              tags={wordsArray}
              taskID={item.taskID}
              disabled={false}
              side={itemIdx % 2 == 0 ? "left" : "right"}
            />
          );
        })}
      </div>
      <div className="flex flex-col gap-4 md:hidden">
        {tasks.map((item: Task, itemIdx: number) => {
          const wordsArray = item?.taglines

            .split(",")
            .slice(0, 2)
            .map((word) => word.trim());

          return (
            <RoadmapItem
              isCompleted={item.isCompleted}
              chapterID={params.slug}
              key={itemIdx}
              title={item.title}
              description={item.description}
              tags={wordsArray}
              taskID={item.taskID}
              disabled={false}
              side={"left"}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ChapterPage;
