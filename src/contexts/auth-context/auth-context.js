import { createContext, useContext, useReducer, useEffect } from "react";
import { authReducer } from "../../reducers";

const initialAuthValue = {
  isAuth: false,
  user: "",
  encodedToken: "",
};

const AuthContext = createContext(initialAuthValue);

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthValue);

  useEffect(() => {
    dispatch({
      type: "AUTH_SUCCESS",
      payload: {
        user: JSON.parse(localStorage.getItem("user")),
        encodedToken: localStorage.getItem("token"),
      },
    });
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };