export type Inputs = {
  email: string;
  password: string;
  username?: string;
  role?: string;
};
export type UserToken = {
  username: string;
  role: 'student' | 'teacher';
  iat: Date;
  exp: Date;
};
