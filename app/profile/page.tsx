import { SignOutButton } from '@/components/sign-out-'
import { Button, buttonVariants } from '@/components/ui/button'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

const Page = async () => {
    const headerList = await headers()

    const session = await auth.api.getSession({
        headers: headerList
    })

    if (!session) {
        redirect("/");
    }
    if (!session) {
        return <h1 className="text-destructive">405 Unauthorized /</h1>
    }


    const FULL_POST_ACCESS = await auth.api.userHasPermission({
        headers : headerList,
        body : {
            userId : session.user.id,
            permission : {
                posts : ["update","delete"]
            }
        }
    })



    return (

        <div className="max-w-7xl py-16 px-8 mx-auto space-y-8">
            <h2 className='text-3xl bold'>Profile </h2>
            <div className='space-y-8'>
                {(session.user.role === "ADMIN" || session.user.role === "SUPER_ADMIN") && (
                    <Link className={buttonVariants()} href={"/admin/dashboard"}>Admin Dashboard</Link>
                )}
                <h2><SignOutButton /></h2>
            </div>

            <div className="text-2xl font-bold">
                Permissions
            </div>

            <div className="space-x-4">
                <Button size={"sm"}>MANGE OWN POSTS</Button>
                <Button size={"sm"} disabled={!FULL_POST_ACCESS.success}>MANGE ALL POSTS</Button>
            </div>

            <pre className="text-sm overflow-clip ">
                {JSON.stringify(session, null, 2)}
            </pre>


        </div>
    )
}

export default Page