import Image from "next/image";
import React from "react";
import Placeholder from "@/assets/img/gradient.jpg";

type Props = {
  title: string;
  description: string;
};

const AssigmentCard = ({ title, description }: Props) => {
  return (
    <div className=" w-full h-full rounded-xl border hover:shadow-2xl shadow-lg transition-all duration-300">
      <div className=" shadow-inner">
        <Image
          src={Placeholder}
          className="rounded-t-xl max-h-[150px]"
          alt="Gradient grainy gradient"
        />
      </div>
      <div className="p-2 border-t">
        <h2 className="text-2xl font-medium">{title}</h2>
        <div className="p-1 pt-2">
          <p className="font-normal">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default AssigmentCard;
