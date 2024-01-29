import { Course, Problem } from "@/types";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const Login = (email: string, password: string) => {
  const result = fetch(baseURL + "/api/auth/login", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ email: email, password: password }),
  });

  return result;
};

export const Signup = (
  email: string,
  password: string,
  username: string,
  role: string
) => {
  const result = fetch(baseURL + "/api/auth/register", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
      email: email,
      role: role,
    }),
  });

  return result;
};

export const getProblemsList = async (username?: string) => {
  const result = await fetch(baseURL + `/api/problem/list/${username}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      "Cache-Control": "no-store",
    },
  });
  if (!result.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const data = await result.json();

  return data.data as Problem[];
};

export const getCourses = async () => {
  const result = await fetch(baseURL + "/api/course", {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
  if (!result.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const data = await result.json();

  return data.data as Course[];
};
