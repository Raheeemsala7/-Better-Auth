
import { DeleteButtonAction, PlaceholderDeleteUserButton } from '@/components/DeleteBtn'
import { UserRoleSelect } from '@/components/use-select-role'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

const Page = async () => {

    const headerList = await headers()

    const session = await auth.api.getSession({
        headers: headerList
    })


    if (!session) redirect("/auth/login")
    const isAdmin = session?.user.role === "ADMIN" || session?.user.role === "SUPER_ADMIN";


    if (!isAdmin) {
        return (
            <div className="px py-16 container mx-auto max-w-screen-lg space-y-8">
                <div className="space-y-8">
                    <h1 className='text-3xl font-bold'>Admin Dashboard</h1>
                    <p className="p-2 rounded-md text-lg bg-red-600 text-white font-bold">
                        FORBIDEN
                    </p>
                </div>
            </div>
        )
    }

    const { users } = await auth.api.listUsers({
        headers: headerList,
        query: {
            sortBy: "name"
        }
    })

    const sortedUsers = users.sort((a, b) => {
        if (a.role === "SUPER_ADMIN") return -1;
        if (b.role === "SUPER_ADMIN") return 1;
        if (a.role === "ADMIN" && b.role === "USER") return -1;
        if (b.role === "ADMIN" && a.role === "USER") return 1;
        return 0;
    })


    return (
        <div className="px py-16 container mx-auto max-w-screen-lg space-y-8">
            <div className="space-y-8">
                <h1 className='text-3xl font-bold'>Admin Dashboard</h1>
                <p className="p-2 rounded-md text-lg bg-green-600 text-white font-bold">
                    ACCESS GRANTEND
                </p>
            </div>

            <div className="w-full overflow-x-auto">
                <table className="table-auto min-w-full whitesapce-nowrap">
                    <thead>
                        <tr className="border-b text-sm text-left">
                            <th className="px-4 py-2 text-center">ID</th>
                            <th className="px-4 py-2 text-center">Name</th>
                            <th className="px-4 py-2 text-center">Email</th>
                            <th className="px-4 py-2 text-center">Role</th>
                            <th className="px-4 py-2 text-center">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedUsers.map((user) => (
                            <tr key={user.id} className="border-b">
                                <td className="px-2 py-2 text-center">{user.id}</td>
                                <td className="px-2 py-2 text-center">{user.name}</td>
                                <td className="px-2 py-2 text-center">{user.email}</td>
                                <td className="px-2 py-2 text-center">
                                    <UserRoleSelect userId={user.id} 
                                    role={user.role as "USER" | "ADMIN" | "SUPER_ADMIN"}
                                     sessionId={session.user.id}
                                     roleSession={session.user.role}
                                     />
                                </td>
                                <td className="px-2 py-2 text-center">
                                    {session.user.role === "SUPER_ADMIN" ? (
                                        <DeleteButtonAction userId={user.id} />
                                    ) : session.user.role === "ADMIN" && user.role === "USER" ? (
                                        <DeleteButtonAction userId={user.id} />
                                    ) : (
                                        <PlaceholderDeleteUserButton />
                                    )}
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    )
}

export default Page