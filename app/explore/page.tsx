import { Button } from "@/components/ui/button";
import Link from "next/link";

const ExplorePage = () => {
  return (
    <div className="h-full">
      Welcome to UI!
      <Link href={"/editor"}>
        <Button>Code editor</Button>
      </Link>
    </div>
  );
};

export default ExplorePage;
