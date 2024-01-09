import { auth } from "../lib/firebase/firebase";

export default function HomePage() {
  async function handleClick() {
    try {
      auth.signOut()
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
    <h1>HOMEPAGE</h1>
    <button onClick={handleClick}>Log out</button>
    </>
  );
}
