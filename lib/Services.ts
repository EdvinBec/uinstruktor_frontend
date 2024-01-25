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
  role: string,
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
  const data = await result.json();
  return await data;
};
