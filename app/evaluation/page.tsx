import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const EvalPage = () => {
  return (
    <div className="min-w-full min-h-[82vh] flex flex-col">
      <h1 className="text-5xl font-bold text-center m-4">Hello</h1>
      <p className="w-3/4 text-justify mx-auto">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
        asperiores porro possimus beatae quas, nihil blanditiis odit fuga,
        laudantium nam nobis doloremque dolorem exercitationem! Facere
        consectetur nam unde error quos! Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Nulla cumque aspernatur dicta. Consequuntur,
        aspernatur! Magni quo vero error quasi! Nisi harum, voluptatum mollitia
        sunt temporibus nihil cumque quasi aut in!
      </p>
      <Link className="justify-self-end self-end" href={"/evaluation/0"}>
        <Button variant={"outline"}>Next</Button>
      </Link>
    </div>
  );
};

export default EvalPage;
