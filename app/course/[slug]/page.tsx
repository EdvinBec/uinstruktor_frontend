import { getCourseChapters, getCourses } from "@/lib/Services";
import { decryptToken } from "@/lib/auth";
import { Course } from "@/types";

import { cookies } from "next/headers";
import CourseFeatures from "../components/CourseFeatures";
import CourseHeader from "../components/CourseHeader";

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

  // Splitting skills from single string into string[]
  const wordsArray = filteredCourse?.skills
    .split(",")
    .map((word) => word.trim());

  return (
    <div className="flex w-full my-12 gap-12">
      <CourseHeader
        firstChapter={chapters[0].chapterID}
        courseId={filteredCourse?.courseID!}
        username={username as string}
        title={filteredCourse?.title!}
        description={filteredCourse?.description!}
        progress={filteredCourse?.progress!}
      />
      <CourseFeatures
        skillLevel={filteredCourse?.skillLevel!}
        skills={wordsArray!}
      />
    </div>
  );
};

export default CoursePage;
