"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const value = saved ? saved === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    const timer = window.setTimeout(() => setDark(value), 0);
    document.documentElement.dataset.theme = value ? "dark" : "light";
    return () => window.clearTimeout(timer);
  }, []);
  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? "dark" : "light";
    localStorage.setItem("theme", next ? "dark" : "light");
  }
  return <button className="theme-toggle" onClick={toggle} aria-label={`Switch to ${dark ? "light" : "dark"} theme`}><svg aria-hidden="true" viewBox="0 0 24 24">{dark ? <><circle cx="12" cy="12" r="3.5"/><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42"/></> : <path d="M20 15.1A8.5 8.5 0 0 1 8.9 4a8.5 8.5 0 1 0 11.1 11.1Z"/>}</svg></button>;
}
