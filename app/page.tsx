import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (

    <div className="py-16 flex flex-col justify-center  items-center gap-6 ">
      <Link href={"/auth/login"} className={buttonVariants()} >Sign in</Link>
      <Link href={"/auth/register"} className={buttonVariants()} >Sign up</Link>
    </div>


  );
}
