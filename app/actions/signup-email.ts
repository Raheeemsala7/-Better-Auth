"use server"

import { auth, ErrorCode } from "@/lib/auth"
import { ApiResponse } from "@/lib/types"
import { APIError } from "better-auth/api"



export async function SignupEmail(formData: FormData): Promise<ApiResponse> {

    const name = String(formData.get("name"))
    const email = String(formData.get("email"))
    const password = String(formData.get("password"))

        if (!name || !email || !password) {
            return {
                status : "error",
                message : "Please fill in all fields"

            }
        }

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
    } catch (err) {

        if (err instanceof APIError) {
            const errorCode = err.body ? (err.body.code as ErrorCode) : "UNKNOW";

            switch (errorCode) {
                case "USER_ALREADY_EXISTS":
                    return {
                        status: "error",
                        message: "Oops! Something went wrong. Please try again."
                    }
                default: return {
                    status: "error",
                    message: err.message
                }
            }

        }
        return {
            status: "error",
            message: "User Not Created"
        }
    }

}