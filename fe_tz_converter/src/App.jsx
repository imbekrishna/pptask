import { useEffect, useState } from "react";

import HomePage from "./pages/HomePage";

import darkIcon from "./assets/icons/icon-sun.svg";
import lightIcon from "./assets/icons/icon-moon.svg";

import "./App.css";

const App = () => {
  const [isDark, setIsDark] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    if (isDark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <>
      <header>
        <h1>TZ</h1>
        <img
          src={isDark ? lightIcon : darkIcon}
          alt=""
          role="button"
          onClick={() => setIsDark((prev) => !prev)}
        />
      </header>
      <HomePage />
    </>
  );
};
export default App;
