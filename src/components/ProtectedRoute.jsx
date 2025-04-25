import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, role }) => {
  const { authUser } = useAuth();

  if (!authUser) return <Navigate to="/login" />;
  if (authUser.role !== role && authUser.role !== "admin") return <Navigate to="/" />;

  return children;
};

export default ProtectedRoute;
