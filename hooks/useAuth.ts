"use client";

import { verifyJwtToken } from "@/lib/auth";
import { JWTPayload } from "jose";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

type Auth = {
  token: JWTPayload | null;
  isValid: boolean;
};

const useAuth = () => {
  const cookies = new Cookies();
  const [auth, setAuth] = useState<Auth>();

  const getVerifiedToken = async () => {
    let validation = false;
    const token = cookies.get("token");
    const verifiedToken = await verifyJwtToken(token!);
    if (Date.now() >= verifiedToken?.exp! * 1000) {
      validation = false;
    } else {
      validation = true;
    }

    setAuth({ token: verifiedToken, isValid: validation });
  };

  useEffect(() => {
    getVerifiedToken();
  }, []);

  return auth;
};

export default useAuth;
