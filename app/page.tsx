"use client"
import { Button,  } from "@/components/ui/button";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";

export default function Home() {

  const { data : session  } = useSession()
  const href = session !== null ? "/profile" : "/auth/login";

  return (
    <div className="flex flex-col items-center gap-4 h-screen justify-center">
      <h1 className="text-5xl font-bold">Better Authly</h1>
      <Button asChild>
        <Link href={href}>Get Started</Link>
      </Button>
      {session && (
        <p className="flex items-center gap-2">
          <span
            data-role={session.user.role}
            className="size-4 rounded-full animate-pulse   data-[role=USER]:bg-blue-600 data-[role=ADMIN]:bg-red-600"
          />
          Welcome back, {session.user.name}!
        </p>
      )}
    </div>
  );
}

