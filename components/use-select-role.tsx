"use client"
import { admin } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";


interface UserRoleSelectProps {
    userId: string;
    role: string;
    sessionId: string;
    roleSession: string;
}

export const UserRoleSelect = ({ userId, role, sessionId,roleSession }: UserRoleSelectProps) => {



    const [isPending, setPending] = useState(false)
    const router = useRouter()

    async function handleChangeRole(evt: ChangeEvent<HTMLSelectElement>) {
        const newRole = evt.target.value;

        const canChangeRole = await admin.hasPermission({
            permissions: {
                user: ["set-role"]
            }
        });

        if (!canChangeRole.data?.success) {
            return toast.error("Forbiden")
        }

        await admin.setRole({
            userId,
            role: newRole as "USER" | "ADMIN" | "SUPER_ADMIN",
            fetchOptions: {
                onRequest: () => {
                    setPending(true)
                },
                onResponse: () => {
                    setPending(false)
                },
                onError: (ctx) => {
                    toast.error(ctx.error.message)
                },
                onSuccess: () => {
                    toast.success("Role updated")
                    router.refresh()
                }
            }

        })
    }

    return (
        <select value={role}
            onChange={handleChangeRole}
            disabled={role === "SUPER_ADMIN" ||roleSession === "ADMIN"  ||sessionId === userId || isPending}
            className="px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50">
            <option value="SUPER_ADMIN">SUPER_ADMIN</option>
            <option value="ADMIN">ADMIN</option>
            <option value="USER">USER</option>


        </select>
    )
}