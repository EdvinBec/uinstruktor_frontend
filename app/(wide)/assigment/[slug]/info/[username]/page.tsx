import Paginator from "@/components/ui/paginator";
import { getAssigmentInfo } from "@/lib/Services";
import React from "react";
import Highlighter from "../../../components/highliter";
import { letterToUpper } from "@/lib/utils";

const UserDetailsPage = async ({
  params,
}: {
  params: { slug: string; username: string };
}) => {
  const assigments: {
    username: string;
    completed: boolean;
    solution: string | null;
    timestamp: Date | null;
  }[] = await getAssigmentInfo(params.slug);

  const filtered = assigments.filter((a) => a.username === params.username);

  return (
    <div className="h-full">
      <Paginator
        links={[
          { display: "Učilnica", href: "/class" },
          { display: "Naloga", href: `/assigment/${params.slug}` },
          {
            display: "Podrobnosti",
            href: `/assigment/${params.slug}/info`,
          },
          {
            display: `Učenec ${letterToUpper(params.username)}`,
            href: "",
            current: true,
          },
        ]}
      />
      {filtered[0].completed ? (
        <div className="bg-white rounded-xl p-4 space-y-4">
          <p className="text-xl font-semibold">
            <span className="text-neutral-500 font-normal">Učenec</span>{" "}
            <span className="capitalize">{params.username}</span>
          </p>
          <p className="text-xl font-semibold">
            <span className="text-neutral-500 font-normal">Rešeno:</span>{" "}
            {new Date(filtered[0].timestamp!).toLocaleString("si", {
              localeMatcher: "best fit",
              hour: "numeric",
              minute: "numeric",

              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
          </p>
          <Highlighter code={filtered[0].solution!} />
        </div>
      ) : (
        <div className="mt-16">
          <h1 className="text-3xl text-neutral-600 font-semibold text-center">
            Učenec{" "}
            <span className="capitalize text-black font-bold">
              {params.username}
            </span>{" "}
            še ni naredil naloge.{" "}
          </h1>
        </div>
      )}
    </div>
  );
};

export default UserDetailsPage;
