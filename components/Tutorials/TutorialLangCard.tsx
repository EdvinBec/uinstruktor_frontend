import { Play } from "lucide-react";
import Link from "next/link";
import React from "react";

export const CardHeading = ({ children }: { children: React.ReactNode }) => {
  return <h2 className="text-3xl p-4 font-semibold">{children}</h2>;
};

export const CardDetails = ({ numOf }: { numOf: number }) => {
  return (
    <div className="flex flex-row border-t mt-2 justify-start gap-10 p-4 relative">
      <div className="">
        <p className="text-center font-medium text-lg">{numOf}</p>
        <p>Examples</p>
      </div>
      <div className="">
        <p className="text-center font-medium text-lg">{numOf}</p>
        <p>Exercises</p>
      </div>
      <div className="absolute top-[-33px]  right-10 bg-white dark:bg-body p-2 rounded-full border-b">
        <Play size={50} className="border transition-all rounded-full p-2" />
      </div>
    </div>
  );
};

export const TutorialLangCard = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => {
  return (
    <Link href={href}>
      <div className="border group rounded-xl shadow hover:shadow-lg transition-all">
        {children}
      </div>
    </Link>
  );
};
