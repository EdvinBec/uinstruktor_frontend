import Image from "next/image";
import React from "react";
import Placeholder from "@/assets/img/gradient.jpg";

type Props = {
  title: string;
  description: string;
};

const AssigmentCard = ({ title, description }: Props) => {
  return (
    <div className="  m-4 border border-transparent hover:shadow-2xl shadow-lg transition-all duration-300">
      <div className="rounded-t-lg shadow-inner">
        <Image
          src={Placeholder}
          className="rounded-t-lg max-h-[150px]"
          alt="Gradient grainy gradient"
        />
      </div>
      <div className="border-x border-t border-b rounded-b-xl p-2">
        <h2 className="text-2xl font-medium">{title}</h2>
        <div className="p-1 pt-2">
          <p className="font-normal">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default AssigmentCard;
