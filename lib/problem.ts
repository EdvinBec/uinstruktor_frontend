const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface Problem {
  problemID: string;
  title: string;
  description: string;
  timeCreated: Date;
  template: string;
  lang: string;
  difficulty: string;
  category: string;
}

export async function fetchProblems() {
  const res = await fetch(`${baseURL}/api/problem/list`);
  const data = await res.json();
  if (res.ok) {
    return data.data as Problem[];
  }
  return false;
}
