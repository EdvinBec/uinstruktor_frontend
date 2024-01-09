import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Problem } from "./problem";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function groupProblems(problems: Problem[]) {
  const groups: { [key: string]: Problem[] } = {};
  problems.forEach((problem) => {
    if (!groups[problem.category]) {
      groups[problem.category] = [];
    }
    groups[problem.category].push(problem);
  });
  return groups;
}

export function cm(...classNames: string[]) {
  return classNames.join(" ");
}

export function letterToUpper(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
