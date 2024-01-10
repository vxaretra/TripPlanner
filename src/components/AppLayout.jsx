import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/auth";


export default function AppLayout() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to={"/login"} replace />;
  }

  return (
    <div>
      <h1>layout</h1>
      <Outlet />
    </div>
  );
}
