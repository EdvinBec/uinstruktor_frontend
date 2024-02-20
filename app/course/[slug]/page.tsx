import { getCourseChapters, getCourses, resumeLearning } from "@/lib/Services";
import { decryptToken } from "@/lib/auth";
import { Chapter, Course } from "@/types";

import { cookies } from "next/headers";
import CourseFeatures from "../components/CourseFeatures";
import CourseHeader from "../components/CourseHeader";
import ChapterDrawer from "../components/ChapterDrawer";

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
    <div className="w-full">
      <div className="flex my-12 gap-12">
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
      <div>
        <h2 className="font-bold text-2xl">Trenutno poglavje</h2>
        <ChapterDrawer
          username={username as string}
          currentModule={
            currentModule.nextChapter === null
              ? chapters[0]
              : chapters.find(
                  (item: Chapter) =>
                    currentModule.nextChapter === item.chapterID
                )!
          }
        />
      </div>
      <div className="mt-8">
        <h2 className="font-bold text-2xl">Kazalo vsebine</h2>
        {chapters.map((item: Chapter, itemIdx) => {
          return (
            <ChapterDrawer
              key={itemIdx}
              username={username as string}
              currentModule={item}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CoursePage;
