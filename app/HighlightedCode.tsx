import { Fragment, type CSSProperties } from "react";
import { createHighlighter } from "shiki";
import { CodeBlock } from "./CodeBlock";

const highlighter = createHighlighter({
  themes: ["github-light-default", "github-dark-default"],
  langs: ["bash"],
});

export async function HighlightedCode({ content, language }: { content: string; language?: string }) {
  const engine = await highlighter;
  const shell = ["bash", "sh", "shell", "shellscript"].includes(language || "bash");
  const { tokens } = engine.codeToTokens(content, {
    lang: shell ? "bash" : "text",
    themes: { light: "github-light-default", dark: "github-dark-default" },
    defaultColor: false,
  });

  return <CodeBlock content={content} language={language}>
    {tokens.map((line, lineIndex) => <Fragment key={lineIndex}>
      {line.map((token, tokenIndex) => <span key={tokenIndex} style={token.htmlStyle as CSSProperties}>{token.content}</span>)}
      {lineIndex < tokens.length - 1 ? "\n" : null}
    </Fragment>)}
  </CodeBlock>;
}
