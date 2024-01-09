import { useContext } from "react";
import { AuthContext } from "../context/auth";

export default function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth used outside of Provider");
  }

  return { user: context.user, isAuthenticating: context.isAuthenticating };
}
