import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
    <div className="h-screen flex justify-center">
      <div className="md:w-1/2">
        <Avatar>
          <AvatarImage
            width={200}
            height={200}
            className="rounded-full shadow-xl"
            src={baseURL + "/" + userData.data?.profilePicture}
            alt="User profile picture"
          />

          <AvatarFallback>
            <User className="" size={60} />
          </AvatarFallback>
        </Avatar>
        <div className="text-center md:text-left">
          <p>{userData.data?.username}</p>
          <p>{userData.data?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
