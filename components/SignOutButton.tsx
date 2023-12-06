//UI Components
import { Button } from "./ui/button";

//Hooks
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toggle } from "@/slices/SidebarStatus";

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
  const dispatch = useDispatch();

  return (
    <Button
      variant={variant}
      className={classname}
      onClick={() => {
        cookies.remove("token");
        router.refresh();
        dispatch(toggle());
      }}
    >
      Sign Out
    </Button>
  );
};

export default SignOutButton;
