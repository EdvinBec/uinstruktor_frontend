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
    <div className="h-screen w-full mt-16">
      <div className="w-full flex flex-col flex-start bg-white dark:bg-black rounded-md px-16 py-8">
        <div className="flex flex-col items-center text-center self-center md:self-start">
          <User
            size={128}
            className="p-8 bg-black text-white dark:text-black dark:bg-white rounded-full"
          />
          <p className="font-bold text-2xl capitalize mt-2">
            {userData.data?.username}
          </p>
          <p className="font-medium">{userData.data?.email}</p>
        </div>
      </div>
      <div className="w-full flex flex-col bg-white dark:bg-black mt-4 p-4 md:py-12 md:px-12">
        <div className="md:self-center">
          <h1 className="font-bold text-2xl ml-2 mb-2">Prikaz aktivnosti</h1>
          <ActivityBar username={userID} />
        </div>
      </div>
    </div>
  );
};

export default UserPage;
