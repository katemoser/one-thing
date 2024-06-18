import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1> This is the homepage!</h1>
      <Link
        href="/do">
        <p>Do one thing</p>
      </Link>

    </>
  );
}
