import { getCourses } from "@/lib/Services";
import { decryptToken } from "@/lib/auth";
import { cookies } from "next/headers";
import CourseCard from "./components/CourseCard";
import { Course } from "@/types";
import CodeBlocks from "./components/CodeBlocks";

const ExplorePage = async () => {
  const cookie = cookies();
  const username = await decryptToken(cookie.get("token")?.value!);

  const course = await getCourses(username as string);
  return (
    <div className="py-8">
      <h1 className="font-bold text-2xl mb-4">Seznam tečajev</h1>
      <div className="flex gap-8 flex-wrap lg:flex-nowrap">
        {course.map((item: Course, itemIdx: number) => {
          const wordsArray = item?.skills.split(",").map((word) => word.trim());

          return (
            <CourseCard
              key={itemIdx}
              itemIdx={itemIdx}
              courseID={item.courseID}
              skillLevel={item.skillLevel}
              wordsArray={wordsArray}
              progress={item.progress!}
              name={item.title}
            />
          );
        })}
      </div>
      <CodeBlocks />
    </div>
  );
};

export default ExplorePage;
