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
export interface ApiResponse<T> {
  message: string;
  status: "success" | "error" | "denied";
  data: T | undefined;
  err: unknown | undefined;
}

export type CodeProblem = {
  problemID: string;
  title: string;
  description: string;
  timeCreated: Date;
  template: string;
  lang: string;
};
export type TestCase = {
  input: string;
  expectedOutput: string;
  actualOutput: string;
  matching: boolean;
};

export interface ApiResponseCompiler extends ApiResponse<{}> {
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
