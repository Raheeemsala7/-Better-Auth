// "use server"

// import { auth, ErrorCode } from "@/lib/auth"
// import { ApiResponse } from "@/lib/types"
// import { APIError } from "better-auth/api"



// export async function SignupEmail(formData: FormData): Promise<ApiResponse> {

//     const name = String(formData.get("name"))
//     const email = String(formData.get("email"))
//     const password = String(formData.get("password"))

//         if (!name || !email || !password) {
//             return {
//                 status : "error",
//                 message : "Please fill in all fields"

//             }
//         }

//     try {
//         await auth.api.signUpEmail({
//             body: {
//                 name,
//                 email,
//                 password,
//             },
//         })

//         return {
//             status: "success",
//             message: "User Created Successfully go to login"
//         }
//     } catch (err) {

//         if (err instanceof APIError) {
//             const errorCode = err.body ? (err.body.code as ErrorCode) : "UNKNOW";

//             switch (errorCode) {
//                 case "USER_ALREADY_EXISTS":
//                     return {
//                         status: "error",
//                         message: "Oops! Something went wrong. Please try again."
//                     }
//                 default: return {
//                     status: "error",
//                     message: err.message
//                 }
//             }

//         }
//         return {
//             status: "error",
//             message: "User Not Created"
//         }
//     }

// }



"use server"

import { auth, ErrorCode } from "@/lib/auth"
import { ApiResponse } from "@/lib/types"
import { APIError } from "better-auth/api"

export async function SignupEmail(formData: FormData): Promise<ApiResponse> {
    // تشخيص Environment Variables
    console.log("=== ENVIRONMENT DEBUG ===");
    console.log("DATABASE_URL exists:", !!process.env.DATABASE_URL);
    console.log("BETTER_AUTH_SECRET exists:", !!process.env.BETTER_AUTH_SECRET);
    console.log("BETTER_AUTH_URL:", process.env.BETTER_AUTH_URL);
    console.log("NODE_ENV:", process.env.NODE_ENV);
    
    const name = String(formData.get("name"))
    const email = String(formData.get("email"))
    const password = String(formData.get("password"))

    console.log("=== FORM DATA DEBUG ===");
    console.log("Name:", name ? "✓" : "✗");
    console.log("Email:", email ? "✓" : "✗");
    console.log("Password length:", password.length);

    if (!name || !email || !password) {
        return {
            status: "error",
            message: "Please fill in all fields"
        }
    }

    try {
        console.log("=== ATTEMPTING SIGNUP ===");
        
        const result = await auth.api.signUpEmail({
            body: {
                name,
                email,
                password,
            },
        })
        
        console.log("=== SIGNUP SUCCESS ===");
        console.log("Result:", result);

        return {
            status: "success",
            message: "User Created Successfully go to login"
        }
    } catch (err) {
        // تشخيص مفصل للخطأ
        console.error("=== SIGNUP ERROR DEBUG ===");
        console.error("Full error:", err);
        console.error("Error type:", typeof err);
        console.error("Error constructor:", err?.constructor?.name);
        console.error("Error message:", err instanceof Error ? err.message : String(err));
        
        if (err instanceof APIError) {
            console.error("APIError body:", err.body);
            console.error("APIError status:", err.status);
            
            const errorCode = err.body ? (err.body.code as ErrorCode) : "UNKNOWN";
            console.error("Error code:", errorCode);

            switch (errorCode) {
                case "USER_ALREADY_EXISTS":
                    return {
                        status: "error",
                        message: "User already exists with this email"
                    }
                case "INVALID_EMAIL":
                    return {
                        status: "error",
                        message: "Invalid email format"
                    }
                default: 
                    return {
                        status: "error",
                        message: err.message || `Registration failed: ${errorCode}`
                    }
            }
        }

        // للأخطاء العادية
        if (err instanceof Error) {
            console.error("Standard Error stack:", err.stack);
            return {
                status: "error",
                message: `Registration failed: ${err.message}`
            }
        }

        // للأخطاء غير المعرّفة
        console.error("Unknown error type");
        return {
            status: "error",
            message: `Registration failed: ${String(err)}`
        }
    }
}