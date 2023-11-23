const baseURL = "http://46.150.38.29:5000/api/auth/login";

export const login = (email: string, password: string) => {
  const result = fetch(baseURL, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ email: email, password: password }),
  });

  return result;
};

export const protectedRoutes = ["/protected"];
export const authRoutes = ["/login"];
export const publicRoutes = ["/"];
