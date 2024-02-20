import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const CourseHeader = ({
  title,
  description,
  progress,
}: {
  title: string;
  description: string;
  progress: number;
}) => {
  return (
    <div className="w-3/5">
      <h1 className="font-bold text-3xl tracking-wide">{title}</h1>
      <Button className="my-4">Nadaljuj z učenjem</Button>
      <p className="mt-2">{description}</p>
      <div className="mt-4">
        <h2 className="mb-2 font-bold text-xl">Napredek</h2>
        <Progress value={progress} />
      </div>
    </div>
  );
};

export default CourseHeader;
