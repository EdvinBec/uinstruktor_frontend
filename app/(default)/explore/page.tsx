import { getCourses } from "@/lib/Services";
import { decryptToken } from "@/lib/auth";
import { cookies } from "next/headers";
import ExplorePageComponent from "./components/explorePage";

const ExplorePage = async () => {
  const cookie = cookies();
  const username = await decryptToken(cookie.get("token")?.value!);

  const course = await getCourses(username as string);
  return <ExplorePageComponent course={course} />;
};

export default ExplorePage;
