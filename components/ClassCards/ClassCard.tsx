import Image from "next/image";
import React from "react";
import Placeholder from "@/assets/img/gradient2.jpg";

type Props = {
  title: string;
  description: string;
};

const ClassCard = ({ title, description }: Props) => {
  return (
    <div className="md:min-w-[400px]">
      <div className="rounded-t-lg">
        <Image
          src={Placeholder}
          className="rounded-t-lg max-h-[150px]"
          alt="Gradient grainy gradient"
        />
      </div>
      <div className="border-x-2 border-b-2 p-2">
        <h2 className="text-2xl">{title}</h2>
        <div className="p-1 pt-2">
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ClassCard;
