import CourseDrawer from "@/components/CourseDrawer/CourseDrawer";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { getCourses } from "@/lib/Services";
import { Course } from "@/types";
import { ArrowDown, ArrowDownRight } from "lucide-react";

const ExplorePage = async () => {
  const course = await getCourses();
  return (
    <div className="flex flex-col gap-4">
      {course.map((item: Course, itemIdx: number) => {
        return <CourseDrawer key={itemIdx} name={item.name} />;
      })}
    </div>
  );
};

export default ExplorePage;
