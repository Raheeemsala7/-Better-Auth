import { inferAdditionalFields , adminClient } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"
import { auth } from "@/lib/auth"
import { ac, roles } from "./premisions"
export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    // baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    plugins : [inferAdditionalFields<typeof auth>() , adminClient({ac , roles})]

})



export const { signIn, signUp , signOut , useSession , admin} = authClient