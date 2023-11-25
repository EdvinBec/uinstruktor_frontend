const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface Class {
  classID: string;
  className: string;
  classCreator: string;
  description: string;
}
export interface Assigment {
  assigmentID: string;
  title: string;
  description: string;
  time_created: Date;
  time_expiration: Date;
  classID: string;
  codeTemplate: string;
}

export async function getClasses(username: string) {
  const result = await fetch(baseURL + `/api/class/list/${username}`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
    },
  });
  if (!result.ok) {
    throw new Error('Failed to retrieve classes');
  }
  const data = await result.json();
  return data.data.classes as Class[];
}

export async function getAssigmentData(assigmentID: string) {
  const result = await fetch(baseURL + `/api/class/assigment/${assigmentID}`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
    },
  });
  if (!result.ok) {
    throw new Error('Failed to assigment data.');
  }
  return (await result.json()) as Assigment;
}

export async function getAssigments(classID: string) {
  const result = await fetch(baseURL + `/api/class/assigments/${classID}`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
    },
  });
  if (!result.ok) {
    throw new Error('Failed to retrieve assignments');
  }
  return (await result.json()) as Assigment[];
}
