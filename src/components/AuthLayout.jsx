import { useState } from "react";
import { Outlet } from "react-router-dom";
import { auth } from "../lib/firebase/firebase";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Spin } from "antd";

export default function AuthLayout() {
  const [user, setUser] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAuthenticating(false)
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    }
  }, []);

  if (isAuthenticating) {
    return <Spin size="large" />;
  }

  return <Outlet context={{ isAuthenticating, user }} />;
}
