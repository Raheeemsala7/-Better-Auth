import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { hashPassword, verifyPassword } from "./argon2";
import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins"
import { ac, roles } from "./premisions";


export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql"
  }),

  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    autoSignIn: false,
    password: {
      hash: hashPassword,
      verify: verifyPassword
    }
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const admins = process.env.ADMIN_EMAILS?.split(";") || []
          if (admins.includes(user.email)) {
            return { data: { ...user, role: "ADMIN" } }
          }

          return {data : user}
        }
      }
    }
  },
  user: {
    additionalFields: {
      role: {
        type: ["USER", "ADMIN", "SUPER_ADMIN"] ,
        input: false
      }
    },
    deleteUser: {
      enabled: true
    }
  },
  session: {
    expiresIn: 30 * 24 * 60 * 60
  },
  advanced: {
    database: {
      generateId: false
    }
  },

  plugins: [nextCookies() , admin(
    {
    defaultRole: "USER",
    adminRoles : ["ADMIN" , "SUPER_ADMIN"],
    ac,
    roles

    }
  )]
});


export type ErrorCode = keyof typeof auth.$ERROR_CODES | "UNKNOW"