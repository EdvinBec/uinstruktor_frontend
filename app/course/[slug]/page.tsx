import ChapterList from "@/components/Course/ChapterList";
import { Button } from "@/components/ui/button";
import { getCourses } from "@/lib/Services";
import { decryptToken } from "@/lib/auth";
import { Chapter, Course } from "@/types";
import { cookies } from "next/headers";

const CoursePage = async ({ params }: { params: { slug: string } }) => {
  const cookie = cookies();
  const username = await decryptToken(cookie.get("token")?.value!);

  const courses: Course[] = await getCourses(username as string);
  const filteredCourse: Course | undefined = courses.find(
    (item: Course) => item.courseID === params.slug
  );

  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-start">
        <div className="flex w-full items-end justify-between">
          <div>
            <h1 className="text-4xl font-bold mt-12">{filteredCourse?.name}</h1>
            <p className=" font-normal mt-2">
              Learn the basics of C++, through interactive coding problems and
              quizes.
            </p>
          </div>
          <h1 className="text-white font-bold text-6xl">
            {filteredCourse?.progress === null ? 0 : filteredCourse?.progress}%
          </h1>
        </div>
        <Button className="mt-6">Resume Course</Button>
      </div>
      <div>
        <ChapterList courseID={params.slug} />
      </div>
    </div>
  );
};

export default CoursePage;
