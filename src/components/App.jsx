import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AppLayout from "./AppLayout";

import HomePage from "../pages/HomePage";
import AuthPage from "../pages/AuthPage";

import { Spin } from "antd";
import useAuth from "../hooks/auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: (
            <HomePage />
        ),
      },
    ],
  },
  { path: "/login", element: <AuthPage /> },
]);

export default function App() {

  const { isAuthenticating } = useAuth();
  if (isAuthenticating) {
    return <Spin size="large" />;
  }

  return <RouterProvider router={router} />;
}
