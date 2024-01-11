import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Spinner } from "flowbite-react";

import AppLayout from "./AppLayout";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import TripsPage from "../pages/TripsPage";
import NewTripPage from "../pages/NewTripPage";

import useAuth from "../hooks/auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/trips",
        element: <TripsPage />,
      },
      {
        path: "/trips/new",
        element: <NewTripPage />,
      },
    ],
  },
  { path: "/login", element: <LoginPage /> },
]);

export default function App() {
  const { isAuthenticating } = useAuth();

  if (isAuthenticating) {
    return <Spinner size="xl" />;
  }

  return <RouterProvider router={router} />;
}
