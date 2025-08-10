"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { ApiResponse } from "@/lib/types"
import { revalidatePath } from "next/cache"
import { headers } from "next/headers"

export async function deleteUserAction({ userId }: { userId: string }): Promise<ApiResponse> {

    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        throw new Error("UNAUTHORIZED")
    }

    if (session?.user.role !== "SUPER_ADMIN" && session?.user.role !== "ADMIN") {
        return {
            status:"error",
            message : "You do not have permission to delete a user"
        }
    }

    try {
        await prisma.user.deleteMany({
            where: {
                id: userId, 
                role: {
                    in: ["USER", "ADMIN"]
                }
            }
        })

        if (session.user.id === userId) {
            await auth.api.signOut({
                headers: await headers()
            })
        }
        revalidatePath("/admin/dashboard")

        return {
            status: "success",
            message: "User deleted successfully"
        }
    } catch (error) {
        if (error instanceof Error) {
            return {
                status: "error",
                message: error.message
            }
        }
        return {
            status: "error",
            message: "An error occurred while deleting the user"
        }
    }
}