import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { hashPassword, verifyPassword } from "./argon2";
import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins"
import { ac, roles } from "./premisions";
import { sendEmailAction } from "@/app/actions/send-emails";


export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET!,
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
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
    },
    requireEmailVerification: true,
  },
  emailVerification: {
    sendOnSignUp: true,
    expiresIn: 60 * 60,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      const link = new URL(url);
      link.searchParams.set("callbackURL", "/auth/verify");

      await sendEmailAction({
        to: user.email,
        subject: "Verify your email address",
        meta: {
          description:
            "Please verify your email address to complete the registration process.",
          link: String(link),
        },
      });
    }

  }
  ,
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!
    }
  }
  ,
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const admins = process.env.ADMIN_EMAILS?.split(";") || []
          if (admins.includes(user.email)) {
            return { data: { ...user, role: "ADMIN" } }
          }

          return { data: user }
        }
      }
    }
  },
  user: {
    additionalFields: {
      role: {
        type: ["USER", "ADMIN", "SUPER_ADMIN"],
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
  account: {
    accountLinking: {
      enabled: false
    }
  },
  advanced: {
    database: {
      generateId: false
    }
  },

  plugins: [nextCookies(), admin(
    {
      defaultRole: "USER",
      adminRoles: ["ADMIN", "SUPER_ADMIN"],
      ac,
      roles

    }
  )]
});


export type ErrorCode = keyof typeof auth.$ERROR_CODES | "UNKNOWN";