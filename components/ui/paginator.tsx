import { cm } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

type PaginatorProps = {
  links: { display: string; href: string; current?: boolean }[];
  className?: string;
};

const Paginator = ({ links, className }: PaginatorProps) => {
  return (
    <div className={cm("py-4 flex gap-3 flex-row", className!)}>
      {links.map((link, idx) => {
        if (link.current) {
          return <p key={idx + 2}>{link.display}</p>;
        }
        return (
          <div className="flex flex-row gap-3 items-center" key={idx}>
            <Link
              className="text-neutral-500 hover:underline underline-offset-4"
              href={link.href}
            >
              {link.display}
            </Link>
            <ChevronRight color="rgb(115, 115, 115)" />
          </div>
        );
      })}
    </div>
  );
};

export default Paginator;
