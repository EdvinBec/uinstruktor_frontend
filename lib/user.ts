import { ApiResponse } from "@/types";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

type User = {
  username: string;
  email: string;
  profilePicture: string;
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
  }
  const result = await fetch(src, {
    method: "GET",
  });
  if (result.status === 404) {
    return false;
  }
  return true;
};
