import LogoLight from "@/assets/img/logo.svg";
import LogoDark from "@/assets/img/logo-white.svg";
import Image from "next/image";
import Link from "next/link";

const Logo = ({ classname }: { classname?: string }) => {
  return (
    <Link href={"/explore"}>
      <Image
        className={`max-w-[175px] dark:hidden ${classname}`}
        src={LogoLight}
        alt="uinstruktor-logo"
      />
      <Image
        className={`max-w-[200px] hidden dark:block ${classname}`}
        src={LogoDark}
        alt="uinstruktor-logo"
      />
    </Link>
  );
};

export default Logo;
