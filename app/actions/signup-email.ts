"use server"

import { auth } from "@/lib/auth"
import { ApiResponse } from "@/lib/types"
import { toast } from "sonner"



export async function SignupEmail(formData: FormData): Promise<ApiResponse> {

    const name = String(formData.get("name"))
    const email = String(formData.get("email"))
    const password = String(formData.get("password"))

    if (!name) toast.error("Prease Enter Name")
    if (!email) toast.error("Prease Enter Email")
    if (!password) toast.error("Prease Enter Password")


    try {
        await auth.api.signUpEmail({
            body: {
                name,
                email,
                password,
            },
        })

        return {
            status: "success",
            message: "User Created Successfully go to login"
        }
    } catch {
        return {
            status: "error",
            message: "User Not Created"
        }
    }

}