export type Inputs = {
  email: string;
  password: string;
  username?: string;
  role?: string;
};
export type UserToken = {
  username: string;
  role: "student" | "teacher";
  iat: Date;
  exp: Date;
};
export interface ApiResponse {
  message: string;
  status: "success" | "error" | "denied";
}
export interface ApiResponseError extends ApiResponse {
  err: unknown;
}
export interface ApiResponseData<T> extends ApiResponse {
  data: T | T[];
}
export type CodeProblem = {
  problemID: string;
  title: string;
  description: string;
  timeCreated: Date;
  userCodeTemplate: string;
  serverCodeTemplate: string;
  lang: string;
};
export type TestCase = {
  input: string;
  expectedOutput: string;
  actualOutput: string;
  matching: boolean;
};

export interface ApiResponseCompiler extends ApiResponse {
  compile_status: boolean;
  id: string;
  message: string;
  result: {
    testCases: TestCase[];
  };
  err: string;
}

export type Problem = {
  problemID: number;
  title: string;
  lang: string;
  difficulty: string;
  category: string;
};
