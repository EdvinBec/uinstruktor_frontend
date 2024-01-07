import Image from "next/image";
import ProblemImage from "@/assets/img/img.png";
import CardContent from "./CardContent";
import { cm } from "@/lib/utils";

type Props = {
  title: string;
  difficulty: string;
  id: number;
  className?: string;
};

const ProblemCard = ({ difficulty, title, id, className }: Props) => {
  return (
    <div
      className={cm(
        "w-1/5 h-auto relative rounded-lg shadow-md min-w-[250px]",
        className!,
      )}
    >
      <Image
        src={ProblemImage}
        alt="puzzle-image"
        className="z-0 rounded-t-md mb-24 bg-blue-500"
      />
      <CardContent id={id} title={title} difficulty={difficulty} />
    </div>
  );
};

export default ProblemCard;
