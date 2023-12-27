//UI Components
import { Button } from "./ui/button";

//Hooks
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toggle } from "@/slices/SidebarStatus";

//Other
import Cookies from "universal-cookie";
import { RootState } from "@/store";

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

  const isSidebarOpen = useSelector(
    (state: RootState) => state.SidebarStatus.isOpen,
  );

  return (
    <div
      className={classname + " cursor-pointer"}
      onClick={() => {
        cookies.remove("token");
        isSidebarOpen && dispatch(toggle());
        router.replace("/login");
        location.reload();
      }}
    >
      Sign Out
    </div>
  );
};

export default SignOutButton;
