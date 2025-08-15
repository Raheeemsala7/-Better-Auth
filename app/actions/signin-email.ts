"use server"

import { auth, ErrorCode } from "@/lib/auth"
import { ApiResponse } from "@/lib/types"
import { headers } from "next/headers"
import { APIError } from "better-auth/api";
import { redirect } from "next/navigation"
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
    } catch (err) {
        if (err instanceof APIError) {
            // const errCode = err.body ? (err.body.code as ErrorCode) : "UNKNOWN";
            // console.dir(err, { depth: 5 });
            // switch (errCode) {
            //     case "EMAIL_NOT_VERIFIED":
            //         redirect("/auth/verify?error=email_not_verified");
            //     default:
                    return {
                        status: "error",
                        message: String(err.message)
                    };
            // }
        }
        return {
            status: "error",
            message: "Error in login"
        }
    }

}