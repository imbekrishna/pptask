import { useEffect, useState } from "react";

import HomePage from "./pages/HomePage";

import DarkIcon from "./assets/icons/icon-sun.svg?react";
import LightIcon from "./assets/icons/icon-moon.svg?react";

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
        {isDark ? (
          <LightIcon onClick={() => setIsDark((prev) => !prev)} />
        ) : (
          <DarkIcon onClick={() => setIsDark((prev) => !prev)} />
        )}
      </header>
      <HomePage />
    </>
  );
};
export default App;
