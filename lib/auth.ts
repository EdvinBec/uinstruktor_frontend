import { jwtDecrypt, jwtVerify } from "jose";

export const GetJwtSecretKey = () => {
  const secret = process.env.NEXT_PUBLIC_JWT_SECRET_KEY;
  if (!secret) {
    throw new Error("JWT secret key is not matched!");
  }
  return new TextEncoder().encode(secret);
};

export const decryptToken = async (token: string) => {
  try {
    const { payload } = await jwtVerify(token, GetJwtSecretKey());
    return payload.username;
  } catch (error) {}
};

export const decryptAuthToken = async (token: string) => {
  try {
    const { payload } = await jwtVerify(token, GetJwtSecretKey());
    const username = payload.username as string;
    const role = payload.role as string;
    const profilePicUrl = payload.profilePicture as string;
    return { role, username, profilePicUrl };
  } catch (error) {}
};

export const verifyJwtToken = async (token: string) => {
  try {
    const { payload } = await jwtVerify(token, GetJwtSecretKey());
    return payload;
  } catch (error) {
    return null;
  }
};
