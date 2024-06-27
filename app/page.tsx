import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="p-8 space-y-4 container grid justify-items-center">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Welcome!
      </h1>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Decision fatigue? Let us help.
      </h3>
      <Button asChild className="p-6">
        <Link href="/do" className="text-3xl">
          Do one thing
        </Link>
      </Button>

    </div>

  );
}
