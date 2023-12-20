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
    <div className="w-full h-full border border-transparent hover:shadow-2xl shadow-lg transition-all duration-300">
      <div className="rounded-t-xl dark:border-neutral-400 border-neutral-300 border">
        <Image
          src={src ? `${baseURL}${src}` : Placeholder}
          className="rounded-t-lg max-h-[150px] object-cover object-center"
          width={500}
          height={150}
          alt="Gradient grainy gradient"
        />
      </div>
      <div className="border-x border-t border-b rounded-b-xl p-2">
        <h2 className="text-2xl  font-medium">{title}</h2>
        <div className="p-1 pt-2">
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ClassCard;
