import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext({userTheme:"dark"});

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(false);

  const changeTheme = () => {
    setTheme((prevTheme) =>!prevTheme);
  };

  useEffect(() => {
    setTheme(JSON.parse(localStorage.getItem("userTheme")) ?? false)
  }, [])
  
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
