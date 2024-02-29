import { getCourseChapters, getCourses, resumeLearning } from "@/lib/Services";
import { decryptToken } from "@/lib/auth";
import { Chapter, Course } from "@/types";

import { cookies } from "next/headers";
import CourseFeatures from "../components/CourseFeatures";
import CourseHeader from "../components/CourseHeader";
import ChapterDrawer from "../components/ChapterDrawer";
import Paginator from "@/components/ui/paginator";
import CourseComponent from "../components/CourseComponent";

const CoursePage = async ({ params }: { params: { slug: string } }) => {
  const cookie = cookies();
  const username = await decryptToken(cookie.get("token")?.value!);

  // Fetching courses and extracting the correct one
  const courses: Course[] = await getCourses(username as string);
  const filteredCourse: Course | undefined = courses.find(
    (item: Course) => item.courseID === params.slug
  );

  const chapters = await getCourseChapters(
    filteredCourse?.courseID!,
    username as string
  );

  const currentModule = await resumeLearning(username as string);

  // Splitting skills from single string into string[]
  const wordsArray = filteredCourse?.skills
    .split(",")
    .map((word) => word.trim());

  return (
    <CourseComponent
      filteredCourse={filteredCourse!}
      currentModule={currentModule}
      wordsArray={wordsArray!}
      chapters={chapters}
      username={username as string}
    />
  );
};

export default CoursePage;
