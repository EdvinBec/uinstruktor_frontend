import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  icon: LucideIcon;
  href: string;
  label: string;
};

const SidebarButton = ({ icon, href, label }: Props) => {
  const LucideIcon = icon;
  const pathname = usePathname();

  return (
    <div>
      <div className=" h-10 flex items-center">
        {pathname == href && (
          <div className="h-[90%] w-[1px] ml-1 bg-white rounded-sm"></div>
        )}
        <div
          className={`flex gap-4 items-center px-4 opacity-70 hover:opacity-100 transition-all ease-in-out duration-150 ${
            href == pathname && "text-white opacity-100"
          }`}
        >
          <LucideIcon />
          <Link
            className="w-full py-3 cursor-pointer text-sm z-20 whitespace-nowrap"
            href={href}
          >
            {label}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SidebarButton;
