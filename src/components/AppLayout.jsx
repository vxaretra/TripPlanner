import { useState } from "react";
import { Navigate, Link, Outlet } from "react-router-dom";
import { Sidebar } from "flowbite-react";
import useAuth from "../hooks/auth";
import Hamburger from "./Hamburger";

export default function AppLayout() {
  const { user } = useAuth();
  const [show, setShow] = useState(false);

  if (!user) {
    return <Navigate to={"/login"} replace />;
  }

  return (
    <>
      <Sidebar className={`fixed w-64 z-40 transition-transform ${show ? "" : "-translate-x-full"} sm:translate-x-0`}>
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item as={Link} to="/">Home</Sidebar.Item>
            <Sidebar.Item as={Link} to="/trips">Trips</Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
      <button className="ml-4 mt-4 md:hidden bg-transparent" onClick={() => setShow(!show)}><Hamburger /></button>
      <div className="p-4 sm:ml-64">
        <Outlet />
      </div>
      <div className={`${show ? "md:hidden" : "hidden"} bg-gray-400 fixed inset-0 z-30`} onClick={() => setShow(false)}></div>
    </>
  );
}
