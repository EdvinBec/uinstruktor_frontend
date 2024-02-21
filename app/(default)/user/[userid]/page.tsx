import ActivityBar from "@/components/ui/activity-bar";

import { fetchUserData } from "@/lib/user";
import { User } from "lucide-react";
import Image from "next/image";
import React from "react";
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

const UserPage = async ({ params }: { params: { userid: string } }) => {
  const userID = params.userid;
  const userData = await fetchUserData(userID);
  if (userData.status === "error" && userData.message === "user/not-exist") {
    return <h1 className="text-center text-4xl">User does not exist.</h1>;
  }

  return (
    <div className="h-screen flex justify-center mt-16">
      <div className="md:w-1/2">
        {userData.data?.profilePicture ? (
          <Image
            width={150}
            src={`${baseURL}/${userData.data?.profilePicture}`}
            height={150}
            className="rounded-full aspect-square object-center"
            alt="User profile picture"
          />
        ) : (
          <User />
        )}
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
