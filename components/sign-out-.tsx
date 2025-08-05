"use client"

import { useTransition } from "react"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"
import { signOut } from "@/lib/auth-client"
import { toast } from "sonner"



export const SignOutButton = () => {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()



    function handelClick() {
        startTransition(async () => {
            await signOut({
                fetchOptions: {
                    onError: (ctx) => { toast.error(ctx.error.message) },
                    onRequest: () => { },
                    onSuccess: () => { toast.success("Successfully signed out") },
                }
            })
            router.push("/")
        })
    }


    return <Button variant={"destructive"} onClick={handelClick} disabled={isPending}>
        {isPending ? "Signing out..." : "Sign out"}
    </Button>


}