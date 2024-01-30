import { getCourseChapters } from "@/lib/Services";
import { decryptToken } from "@/lib/auth";
import { Chapter } from "@/types";
import ChapterListItem from "./ChapterListItem";
import { cookies } from "next/headers";
import { Button } from "../ui/button";
import Link from "next/link";

const ChapterList = async ({ courseID }: { courseID: string }) => {
  const cookie = cookies();
  const username = await decryptToken(cookie.get("token")?.value!);

  const chapters = await getCourseChapters(courseID, username as string);

  return (
    <div className="max-w-[800px] px-6 py-4 bg-black text-white dark:bg-white dark:text-black mt-12 rounded-md">
      <h2 className="font-bold text-2xl mb-4">Modules</h2>
      <div>
        {chapters.map((item: Chapter, itemIdx: number) => {
          return (
            <Link
              href={`/course/chapter/${item.chapterID}`}
              key={itemIdx}
              className="hover:opacity-75 transition-all ease-in-out duration-150"
            >
              <ChapterListItem
                name={item.name}
                idx={itemIdx}
                solvedTaskNum={2}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ChapterList;
