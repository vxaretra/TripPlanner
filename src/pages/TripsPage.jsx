import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

export default function TripsPage() {
  return (
    <>
      <Link to={"/trips/new"}>
        <Button>New trip +</Button>
      </Link>

      <h1>You have no trips yet</h1>
    </>
  );
}
