"use client";

import { decryptAuthToken, verifyJwtToken } from "@/lib/auth";
import { JWTPayload } from "jose";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

type Auth = {
  token: JWTPayload | null;
  username: string;
  permissions?: { isAdmin: boolean; isTeacher: boolean };
  profilePic: string;
};

const useAuth = () => {
  const cookies = new Cookies();
  const [auth, setAuth] = useState<Auth>();

  const decryptToken = async () => {
    const decryptedToken = await decryptAuthToken(cookies.get("token"));
    if (decryptedToken) {
      decryptedToken.permissions.isAdmin = Boolean(
        decryptedToken?.permissions.isAdmin,
      );
      decryptedToken.permissions.isTeacher = Boolean(
        decryptedToken?.permissions.isTeacher,
      );
    }

    setAuth({
      token: cookies.get("token"),
      username: decryptedToken?.username!,
      permissions: decryptedToken?.permissions!,
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
