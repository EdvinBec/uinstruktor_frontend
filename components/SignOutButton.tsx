//Hooks
import { useRouter } from "next/navigation";

//Other
import Cookies from "universal-cookie";

type Props = {
  classname?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "active"
    | null
    | undefined;
};

const SignOutButton = ({ classname, variant }: Props) => {
  const cookies = new Cookies();
  const router = useRouter();

  return (
    <div
      className={classname + " cursor-pointer"}
      onClick={() => {
        cookies.remove("token");
        router.replace("/login");
        location.reload();
      }}
    >
      Sign Out
    </div>
  );
};

export default SignOutButton;
