import { ApiResponse, CodeProblem } from "@/types";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

type TestCase = {
  input: string;
  output: string;
};

export const uploadCode = (
  code: string,
  assigmentId: string,
  lang: string,
  classID: string,
  username: string,
) => {
  const result = fetch(baseURL + "/api/code/submission", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      lang: lang,
      source: code,
      assigmentID: assigmentId,
      classID: classID,
      username: username,
    }),
  });
  return result;
};
export const uploadCodeTask = (
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
      lang: lang,
      source: code,
      taskID: taskID,
      username: username,
    }),
  });
  return result;
};
export const uploadCodeProblem = async (
  problem: CodeProblem,
  testCases: TestCase[],
) => {
  const result = fetch(baseURL + "/api/code/problem/new", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      problem: { ...problem },
      testCases: testCases,
    }),
  });
  return (await result).json();
};

export const uploadCodeProblemCode = (
  code: string,
  problemID: string,
  lang: string,
) => {
  const result = fetch(baseURL + "/api/code/submission/assigment", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ lang: lang, source: code, problemID: problemID }),
  });
  return result;
};

export const uploadTestCases = (
  testCases: {
    input: string;
    output: string;
  }[],
) => {
  const result = fetch(baseURL + "/api/code/testcases/submit", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      testCases: testCases,
    }),
  });
  return result;
};

export const fetchProblem = async (problemID: string) => {
  const result = await fetch(baseURL + "/api/code/problem/" + problemID, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
  const data = (await result.json()) as ApiResponse<CodeProblem>;

  return data.data as CodeProblem;
};

export async function saveCode(
  username: string,
  taskID: string,
  source: string,
) {
  const result = fetch(baseURL + "/api/code/save", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      source: source,
      username: username,
      taskID: taskID,
    }),
  });
  console.log((await result).json());
  return result;
}
