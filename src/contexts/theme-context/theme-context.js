import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext("");

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    JSON.parse(localStorage.getItem("userTheme")) ?? false
  );

  const changeTheme = () => {
    setTheme((prevTheme) => !prevTheme);
  };

  //update localstorage theme
  useEffect(() => {
    localStorage.setItem("userTheme", JSON.stringify(theme));
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => useContext(ThemeContext);

export { useTheme, ThemeProvider };
