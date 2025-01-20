import React, { useState, useEffect } from "react";

// moroor UseState vaghti mikhai chiziro zakhire koni va taghir bedi
// modiriate THEM
const ThemeManager = () => {
  const [theme, setTheme] = useState(
    // ghablan THEM dar LocalStorage zakhire shode darim ya na
// agar zakhire shode nadarim pishfarz tire bashe
    localStorage.getItem("theme") || "dark"
  ); 

 // moroor UseEffect vaghti mikhai baad az etefaghi kari anjam beshe
 // pas harbar THEM taghir kone ejra mishe
  useEffect(() => {
    // zakhire THEM jadid
    localStorage.setItem("theme", theme);
//Dependency [theme] // faghat zamani k THEM taghir kone ejra mishe
  }, [theme]);


  const toggleTheme = () => {
// meghdare ghabli THEM ra daryaft va taghir mide
// Condition?ValueIfTrue:ValueIfFalse
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };


  return (
    <div className={theme}>
      <h1>Theme Manager</h1>
      <button onClick={toggleTheme}>
      Change theme to {theme === "light" ? "dark" : "light"}
      </button>
    </div>
  );
};

export default ThemeManager;

