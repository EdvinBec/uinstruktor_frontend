import CourseDrawer from "@/components/Course/CourseDrawer";
import { getCourses } from "@/lib/Services";
import { decryptToken } from "@/lib/auth";
import { Course } from "@/types";
import { cookies } from "next/headers";

const ExplorePage = async () => {
  const cookie = cookies();
  const username = await decryptToken(cookie.get("token")?.value!);

  const course = await getCourses(username as string);
  return (
    <div className="flex flex-col gap-4">
      {course.map((item: Course, itemIdx: number) => {
        return (
          <CourseDrawer
            key={itemIdx}
            courseID={item.courseID}
            name={item.name}
            username={username as string}
            progress={item.progress!}
          />
        );
      })}
    </div>
  );
};

export default ExplorePage;
