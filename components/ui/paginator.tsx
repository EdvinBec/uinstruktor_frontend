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
          <>
            <Link
              className="text-neutral-500 hover:underline underline-offset-4"
              href={link.href}
              key={idx}
            >
              {link.display}
            </Link>
            <ChevronRight key={idx + 1} color="rgb(115, 115, 115)" />
          </>
        );
      })}
    </div>
  );
};

export default Paginator;
