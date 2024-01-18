import { getProblemsList } from "@/lib/Services";
import { Problem } from "@/types";
import Abstract1 from "@/assets/1.png";
import Abstract2 from "@/assets/2.png";
import Abstract3 from "@/assets/3.png";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { CheckCheck } from "lucide-react";
import Link from "next/link";

const ExplorePage = async () => {
  const problems = await (await getProblemsList()).json();
  const probs: Problem[] = problems.data;
  let previousNum = 0;

  const cardBackgrounds = [Abstract1, Abstract2, Abstract3];

  return (
    <div>
      <h1 className="font-bold text-3xl mb-8 mt-12 tracking-wide">
        Explore tasks
      </h1>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-8">
        {probs.map((item: Problem, itemIdx: number) => {
          while (item) {
            let imageNum = Math.floor(Math.random() * 3);
            if (imageNum === previousNum) {
              imageNum = Math.floor(Math.random() * 3);
            } else {
              previousNum = imageNum;
              return (
                <Link
                  href={`/problem/${item.problemID}`}
                  key={itemIdx}
                  className="relative hover:opacity-80 transition-all ease-in-out duration-100 cursor-pointer"
                >
                  <Image
                    src={cardBackgrounds[imageNum]}
                    alt="Problem Card"
                    className="w-full h-[450px] rounded-md bg-white"
                  />
                  <div className="absolute z-20 bottom-0 left-0 w-full h-1/3 flex flex-col items-start justify-end px-4 pb-4">
                    <h1 className="font-bold text-xl">{item.title}</h1>
                    <Label className="text-xs mt-1">UInstuktor Team</Label>
                    <div className="flex gap-4 items-center mt-1">
                      <Label className="text-xs capitalize opacity-70">
                        {item.difficulty}
                      </Label>
                      <CheckCheck size={18} />
                      <Label className="text-xs capitalize opacity-70">
                        20min
                      </Label>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black opacity-30 to-transparent"></div>
                </Link>
              );
            }
          }
        })}
      </div>
    </div>
  );
};

export default ExplorePage;
