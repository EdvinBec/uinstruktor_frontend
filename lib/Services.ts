import { Chapter, Course, Problem, Task } from "@/types";

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
  if (!result.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const data = await result.json();

  return data.data as Problem[];
};

export const getCourses = async (username: string) => {
  const result = await fetch(baseURL + `/api/course/${username}`, {
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

  return data.data as Course[];
};

export const getCourseChapters = async (courseID: string, username: string) => {
  const result = await fetch(
    baseURL + `/api/course/${courseID}/chapter/${username}`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    },
  );
  if (!result.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const data = await result.json();

  return data.data as Chapter[];
};

export const getChapterTasks = async (chapterID: string, username: string) => {
  const result = await fetch(
    baseURL + `/api/course/chapter/${chapterID}/${username}`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    },
  );
  if (!result.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const data = await result.json();

  return data.data as Task[];
};
export const fetchCourses = async () => {
  const result = await fetch(baseURL + `/api/course/list`, {
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

  return data.data;
};

export const saveCode = async (
  username: string,
  code: string,
  taskID: string,
) => {
  const result = await fetch(baseURL + `/api/code/save`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ username, code, taskID }),
  });
  if (!result.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const data = await result.json();

  return data.data;
};

export const getSavedCode = async (username: string, taskID: string) => {
  const result = await fetch(
    baseURL + `/api/code/saved/${username}/${taskID}`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    },
  );
  if (!result.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const data = await result.json();

  return data.data;
};

export const uploadCode = (
  code: string,
  taskID: string,
  lang: string,
  username: string,
) => {
  const result = fetch(baseURL + "/api/code/submit/task", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      lang,
      source: code,
      ID: taskID,
      username: username,
    }),
  });
  return result;
};

export const getTask = async (taskID: string) => {
  const result = await fetch(baseURL + `/api/course/task/${taskID}`, {
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

  return data.data;
};

export const resumeLearning = async (username: string) => {
  const result = await fetch(baseURL + `/api/course/resume/${username}`, {
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

  return data.data;
};

export const uploadSandboxCode = async (
  source: string,
  input: string,
  lang: string,
) => {
  const result = await fetch(baseURL + "/api/code/sandbox", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      lang,
      input,
      source,
    }),
  });
  const data = await result.json();

  return data;
};
export const fetchClasses = async (username: string) => {
  const result = await fetch(baseURL + `/api/class/list/${username}`, {
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

  return data.data.classes;
};
export const getChapterData = async (chapterID: string) => {
  const result = await fetch(baseURL + `/api/course/chapter/${chapterID}`, {
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

  return data.data;
};
