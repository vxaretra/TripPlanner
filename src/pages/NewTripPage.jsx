import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import NewTripForm from "../components/NewTripForm";

export default function NewTripPage() {
  return (
    <div>
      <Link to={".."} relative="path">
        <Button>Back</Button>
      </Link>
      <NewTripForm />
    </div>
  )
}
