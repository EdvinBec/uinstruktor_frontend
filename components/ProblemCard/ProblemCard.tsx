import Image from "next/image";
import ProblemImage from "@/assets/img/img.png";
import CardContent from "./CardContent";

type Props = {
  title: string;
  difficulty: string;
  id: number;
};

const ProblemCard = ({ difficulty, title, id }: Props) => {
  return (
    <div className="w-1/4 h-auto relative rounded-lg shadow-md">
      <Image
        src={ProblemImage}
        alt="puzzle-image"
        className="z-0 rounded-md mb-24 bg-blue-500"
      />
      <CardContent id={id} title={title} difficulty={difficulty} />
    </div>
  );
};

export default ProblemCard;
