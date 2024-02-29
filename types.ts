export type Inputs = {
  email: string;
  password: string;
  username?: string;
  repeatPassword?: string;
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
  result: TestCase[];
  err: string;
}

export type Problem = {
  problemID: number;
  title: string;
  lang: string;
  difficulty: string;
  category: string;
  isCompleted: boolean;
};

export type Course = {
  title: string;
  courseID: string;
  description: string;
  skillLevel: string;
  skills: string;
  progress?: number;
};

export type Chapter = {
  name: string;
  chapterID: string;
  solvedLessons: number;
  totalLessons: number;
};

export type Task = {
  title: string;
  description: string;
  taglines: string;
  isCompleted: boolean;
  infoPage: {
    title: string;
    description: string;
    exampleCode: string;
  };
  taskID: string; //ID tega taska
};
export type ClassT = {
  className: string;
  description: string;
  src?: string;
  classID: string;
  progress?: number;
};

export type Exercise = {
  title: string;
  exerciseID: string;
  description: string;
  difficulty: string;
  points: number;
  tags: string;
};
export type EditorType = "sandbox" | "task" | "exercise" | "assigment";

export type Resume = {
  nextChapter: null | string;
  proceed: boolean;
};

export type EditorValue = {
  id: string;
  type: string;
  children: {
    text: string;
  }[];
};