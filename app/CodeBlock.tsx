"use client";

import { useEffect, useRef, useState } from "react";

export function CodeBlock({ content, language }: { content: string; language?: string }) {
  const [status, setStatus] = useState("Copy");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(content);
      setStatus("Copied!");
    } catch {
      setStatus("Select to copy");
    }
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus("Copy"), 2500);
  }

  return <div className="bash-code">
    <div className="bash-code-bar"><span>{language || "bash"}</span><button type="button" onClick={copy} aria-label="Copy code"><span aria-live="polite">{status}</span></button></div>
    <pre tabIndex={0} aria-label={`${language || "Bash"} code example`}><code>{content}</code></pre>
  </div>;
}
