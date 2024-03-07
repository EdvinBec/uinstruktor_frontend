"use client";
import { useTheme } from "next-themes";
import React from "react";

import SyntaxHighlighter from "react-syntax-highlighter";
import {
  atelierCaveLight,
  atelierCaveDark,
  githubGist,
} from "react-syntax-highlighter/dist/esm/styles/hljs";

const Highlighter = ({ code }: { code: string }) => {
  const { theme } = useTheme();
  return (
    <SyntaxHighlighter
      style={theme === "light" ? githubGist : atelierCaveDark}
      className="rounded-xl bg-neutral-100"
      language={"cpp"}
    >
      {code}
    </SyntaxHighlighter>
  );
};

export default Highlighter;
