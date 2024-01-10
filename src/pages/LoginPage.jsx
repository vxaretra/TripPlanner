import useAuth from "../hooks/auth";
import { Navigate } from "react-router-dom";

export default function LoginPage() {
  const { user } = useAuth();
  if (user) {
    return <Navigate to={"/"} replace />;
  }

  return (
    <div className="h-screen mx-auto">

    </div>
  );
}
