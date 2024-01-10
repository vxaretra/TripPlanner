import LoginForm from "../components/LoginForm";
import useAuth from "../hooks/auth";
import { Navigate } from "react-router-dom";

export default function LoginPage() {
  const { user } = useAuth();
  if (user) {
    return <Navigate to={"/"} replace />;
  }

  return (
    <div className="grid items-center px-4 h-screen mx-auto lg:w-1/4">
      <LoginForm />
    </div>
  );
}
