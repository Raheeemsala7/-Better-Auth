"use server"

import { auth } from "@/lib/auth"
import { ApiResponse } from "@/lib/types"
import { headers } from "next/headers"
import { toast } from "sonner"



export async function SignInWithEmail(formData: FormData): Promise<ApiResponse> {

    const email = String(formData.get("email"))
    const password = String(formData.get("password"))

    if (!email) toast.error("Prease Enter Email")
    if (!password) toast.error("Prease Enter Password")


    try {
        await auth.api.signInEmail({
            headers: await headers(),
            body: {
                email,
                password,
            },
        })
        return {
            status: "success",
            message: " Successfully login"
        }
    } catch {
        return {
            status: "error",
            message: "Error in login"
        }
    }

}