import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../../contexts";

export const RequireAuth = ({ children }) => {
  const {
    state: { encodedToken },
  } = useAuth();

  const location = useLocation();

  return encodedToken ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location}} replace={true}/>
  );
};
