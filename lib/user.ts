import { ApiResponse } from "@/types";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

type User = {
  username: string;
  email: string;
  profilePicture: string;
};
type UserActivity = {
  value: number;
  timestamp: Date;
};

export const fetchUserData = async (userID: string) => {
  const result = await fetch(baseURL + "/api/user/" + userID, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
  return (await result.json()) as ApiResponse<User>;
};

export const checkImage = async (src: string | undefined) => {
  if (!src) {
    return false;
  } else {
    const result = await fetch(src, {
      method: "GET",
    });

    if (result.status === 404) {
      return false;
    } else {
      return true;
    }
  }
};

export const fetchUserActivity = async (userID: string) => {
  const result = await fetch(baseURL + "/api/user/" + userID + "/activity", {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
  return (await result.json()) as ApiResponse<UserActivity[]>;
};
