"use client";

import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CodeBlocksImage from "@/assets/img/codeblocks.svg";
import { useState } from "react";
import CustomButton from "@/components/CustomButton";

const CodeBlocks = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="w-full flex py-12 rounded-md border-[1px] border-gray-200 dark:border-0 mt-8 bg-white dark:bg-black">
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full">
        <Image src={CodeBlocksImage} alt="codeBlocks" />
        <div className="w-full flex flex-col items-center text-center gap-2 md:block md:text-left md:w-1/2">
          <h2 className="font-bold text-2xl">Programiraj po svoje</h2>
          <p className="font-medium text-sm mt-1">
            Prenesi svoje ideje v kodo in eksperimentiraj s pomočjo našega
            spletnega razvijalnega okolja.
          </p>
          <Link href="/sandbox" onClick={() => setIsLoading(true)}>
            <CustomButton
              isLoading={isLoading}
              label="Odpri novo okolje"
              icon={Plus}
              className="mt-4"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CodeBlocks;
