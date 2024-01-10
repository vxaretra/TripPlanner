import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AppLayout from "./AppLayout";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";

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
  { path: "/login", element: <LoginPage /> },
]);

export default function App() {

  const { isAuthenticating } = useAuth();
  if (isAuthenticating) {
    return <Spin size="large" />;
  }

  return <RouterProvider router={router} />;
}
