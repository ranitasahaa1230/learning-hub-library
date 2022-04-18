import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../../contexts";


export const RequireAuth = ({ children }) => {
  const {
    state: { isAuth },
  } = useAuth();

  const location = useLocation();
  const from = location;

  return isAuth ? children : <Navigate to="/login" state={from} replace />;
};