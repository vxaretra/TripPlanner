import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AppLayout from "./AppLayout";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

import useAuth from "../hooks/auth";
import { Spinner } from "flowbite-react";

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
  { path: "/register", element: <RegisterPage /> },
]);

export default function App() {

  const { isAuthenticating } = useAuth();
  if (isAuthenticating) {
    return <Spinner size="xl" /> 
  }

  return <RouterProvider router={router} />;
}
