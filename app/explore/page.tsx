import { getCourses } from "@/lib/Services";
import { decryptToken } from "@/lib/auth";
import { cookies } from "next/headers";
import CourseCard from "./components/CourseCard";
import { Course } from "@/types";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CodeBlocks from "@/assets/img/codeblocks.svg";
import Image from "next/image";

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
      <div className="w-full flex py-12 rounded-md border-[1px] border-gray-200 mt-8">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full">
          <Image src={CodeBlocks} alt="codeBlocks" />
          <div className="w-full flex flex-col items-center text-center gap-2 md:block md:text-left md:w-1/2">
            <h2 className="font-bold text-2xl">Programiraj po svoje</h2>
            <p className="font-medium text-sm mt-1">
              Prenesi svoje ideje v kodo in eksperimentiraj s pomočjo našega
              spletnega razvijalnega okolja.
            </p>
            <Button className="flex gap-2 mt-4 bg-[#2B44E7] hover:bg-blue-500">
              <Plus size={18} strokeWidth={1.5} />
              Odpri novo okolje
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
