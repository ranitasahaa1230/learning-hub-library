const { createContext, useContext } = require("react");

const ThemeContext = createContext("");

const ThemeProvider = ({ children }) => {
  return(
  <ThemeContext.Provider>
        {children}
  </ThemeContext.Provider>
)
};

const useTheme = () => useContext(ThemeContext);

export { useTheme, ThemeProvider };
