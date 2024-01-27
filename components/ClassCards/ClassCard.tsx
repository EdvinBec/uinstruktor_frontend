import Image from "next/image";
import React from "react";
import Placeholder from "@/assets/img/gradient2.jpg";
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

type Props = {
  title: string;
  description: string;
  src?: string;
};

const ClassCard = ({ title, description, src }: Props) => {
  return (
    <div className="w-full h-full rounded-xl border hover:shadow-2xl shadow-lg transition-all duration-300">
      <div className="shadow-inner">
        <Image
          src={Placeholder}
          className="rounded-t-xl max-h-[150px] object-cover object-center"
          width={500}
          height={150}
          alt="Class banner image"
        />
      </div>
      <div className="border-t p-4">
        <h2 className="text-2xl  font-medium">{title}</h2>
        <div className=" pt-2">
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ClassCard;
