import { JWTPayload } from "jose";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface Class {
  classID: string;
  className: string;
  classCreator: string;
  description: string;
  bannerSrc: string;
}
export interface Assigment {
  assigmentID: string;
  title: string;
  description: string;
  shortDescription: string;
  timeCreated: Date;
  timeExpiration: Date;
  classID: string;
  template: string;
  lang: string;
  completedUsers: string[] | null | undefined;
}
type User = {
  username: string;
  email: string;
  role: string;
};

export interface ClassData extends Class {
  assigments: Assigment[];
  users: User[];
  joinCode: string;
}

export async function getClasses(username: string) {
  const result = await fetch(baseURL + `/api/class/list/${username}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
  if (!result.ok) {
    throw new Error("Failed to retrieve classes");
  }
  const data = await result.json();
  return data.data.classes as Class[];
}

export async function getAssigmentData(assigmentID: string) {
  const result = await fetch(baseURL + `/api/class/assigment/${assigmentID}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
  if (!result.ok) {
    throw new Error("Failed to assigment data.");
  }
  return (await result.json()) as Assigment;
}

export async function joinNewClass(joinCode: string, username: string) {
  const result = await fetch(baseURL + `/api/class/join`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ classCode: joinCode, username: username }),
  });

  return await result.json();
}

export async function getAssigments(classID: string) {
  const result = await fetch(baseURL + `/api/class/assigments/${classID}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
  if (!result.ok) {
    throw new Error("Failed to retrieve assignments");
  }
  return (await result.json()) as Assigment[];
}

export async function getClassData(classID: string) {
  const result = await fetch(baseURL + `/api/class/${classID}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      "Cache-Control": "no-store",
    },
  });
  return (await result.json()).data as ClassData;
}
export async function publishAssigment(
  assigment: {
    title: string;
    description: string;
    shortDescription: string;
    timeCreated: Date;
    timeExpiration: Date;
    classID: string;
    lang: string;
  },
  token: unknown,
) {
  const result = await fetch(baseURL + `/api/class/assigments/new`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "Cache-Control": "no-store",
      Authorization: token as string,
    },
    body: JSON.stringify(assigment),
  });
  console.log(result);
}
