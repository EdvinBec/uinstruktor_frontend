import Image from "next/image";
import React from "react";
import Placeholder from "@/assets/img/gradient2.jpg";

type Props = {
  title: string;
  description: string;
};

const ClassCard = ({ title, description }: Props) => {
  return (
    <div className="md:min-w-[350px] rounded-xl hover:shadow-2xl shadow-lg transition-all">
      <div className="rounded-t-xl dark:border-neutral-400 border-neutral-300 border">
        <Image
          src={Placeholder}
          className="rounded-t-lg max-h-[150px]"
          alt="Gradient grainy gradient"
        />
      </div>
      <div className="border-x dark:border-neutral-400 border-neutral-300 border-b rounded-b-xl p-2">
        <h2 className="text-2xl  font-medium">{title}</h2>
        <div className="p-1 pt-2">
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ClassCard;
