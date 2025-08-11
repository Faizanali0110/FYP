import { useState, useEffect } from "react";

export default function DarkModeToggle() {
  // Default: read from localStorage OR fallback to system preference
  const [dark, setDark] = useState(() => {
    if (typeof localStorage !== "undefined" && localStorage.getItem("theme")) {
      return localStorage.getItem("theme") === "dark";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // Apply theme changes whenever "dark" changes
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      console.log("Dark mode enabled");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      console.log(localStorage.setItem("theme", "light"));
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark((prev) => !prev)}
      className="px-4 py-2 rounded-lg bg-gray-300 dark:bg-gray-700 text-black dark:text-white"
    >
      {dark ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
}
