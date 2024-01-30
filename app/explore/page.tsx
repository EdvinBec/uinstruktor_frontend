import CourseDrawer from "@/components/CourseDrawer/CourseDrawer";
import { getCourses } from "@/lib/Services";
import { decryptToken } from "@/lib/auth";
import { Course } from "@/types";
import Cookies from "universal-cookie";

const ExplorePage = async () => {
  const cookies = new Cookies();
  const username = await decryptToken(cookies.get("token"));

  const course = await getCourses();
  return (
    <div className="flex flex-col gap-4">
      {course.map((item: Course, itemIdx: number) => {
        return (
          <CourseDrawer
            key={itemIdx}
            courseID={item.courseID}
            name={item.name}
            username={username as string}
          />
        );
      })}
    </div>
  );
};

export default ExplorePage;
