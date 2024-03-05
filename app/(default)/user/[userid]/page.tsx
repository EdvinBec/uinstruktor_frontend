import ActivityBar from "@/components/ui/activity-bar";

import { fetchUserData } from "@/lib/user";
import { User } from "lucide-react";
import Image from "next/image";
import React from "react";

const UserPage = async ({ params }: { params: { userid: string } }) => {
  const userID = params.userid;
  const userData = await fetchUserData(userID);
  if (userData.status === "error" && userData.message === "user/not-exist") {
    return <h1 className="text-center text-4xl">User does not exist.</h1>;
  }

  return (
    <div className="h-screen mt-16">
      <div className="inline-block">
        <div className="bg-white dark:bg-black rounded-full p-16">
          <User size={128} />
        </div>

        <div className="text-center md:text-left">
          <p>{userData.data?.username}</p>
          <p>{userData.data?.email}</p>
        </div>
        <ActivityBar username={userID} />
      </div>
    </div>
  );
};

export default UserPage;
