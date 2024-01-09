import { Navigate } from "react-router-dom";
import useAuth from "../hooks/auth";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (user === null) {
    return <Navigate to={"/login"} />
  }

  return children;
}
