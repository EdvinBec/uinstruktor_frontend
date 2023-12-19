import {
  ApiResponse,
  ApiResponseData,
  ApiResponseError,
  CodeProblem,
} from "@/types";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

type TestCase = {
  input: string;
  output: string;
};

export const codeTPython = {
  client: `
def functionName():
  return value
`,
  server: `
input = input()
print(functionName(input))
`,
};
export const codeTCpp = {
  client: `
type functionName(type input) {
  return variable;
}
`,
  server: `
#include <iostream>
#inlude <string>

using namespace std;

int main() {
  type input;
  cin>>input;
  // or
  getline(cin, input);
}
`,
};
export const uploadCode = (code: string, assigmentId: string, lang: string) => {
  const result = fetch(baseURL + "/api/code/submission", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      lang: lang,
      source: code,
      assigmentID: assigmentId,
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
  const result = fetch(baseURL + "/api/code/submission", {
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
  const data = (await result.json()) as ApiResponseData<CodeProblem>;

  return data.data as CodeProblem;
};
