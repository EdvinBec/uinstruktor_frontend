"use client";

import { decryptAuthToken, verifyJwtToken } from "@/lib/auth";
import { JWTPayload } from "jose";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

type Auth = {
  token: JWTPayload | null;
  username: string;
  role: string;
  profilePic: string;
};

const useAuth = () => {
  const cookies = new Cookies();
  const [auth, setAuth] = useState<Auth>();

  const decryptToken = async () => {
    const decryptedToken = await decryptAuthToken(cookies.get("token"));
    setAuth({
      token: cookies.get("token"),
      username: decryptedToken?.username!,
      role: decryptedToken?.role!,
      profilePic: decryptedToken?.profilePicUrl!,
    });
  };

  useEffect(() => {
    decryptToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return auth;
};

export default useAuth;
