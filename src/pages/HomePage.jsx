import { auth } from "../lib/firebase";

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
    <h2>Saerom</h2>
    <button onClick={handleClick}>Log out</button>
    </>
  );
}
