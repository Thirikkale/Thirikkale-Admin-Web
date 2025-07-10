// app/api/auth/[...nextauth]/route.ts (or similar file depending on your setup)

import NextAuth from "next-auth"
import { DefaultSession } from "next-auth"
import { ZodError } from "zod"
import Credentials from "next-auth/providers/credentials"
import { signInSchema } from "@/lib/zod" // Zod schema to validate login form
// import { saltAndHashPassword } from "@/utils/password" // Optional: to hash passwords
import type { Session, User } from "next-auth"
import type { JWT } from "next-auth/jwt"

// ✅ Initialize NextAuth
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    // ✅ Use credentials-based login
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          console.log("Received credentials:", credentials)

          // ✅ Validate with Zod
          const { email, password } = await signInSchema.parseAsync(credentials)

          // ✅ Simulated users
          const mockUsers = [
            {
              email: "admin@gmail.com",
              password: "123", // Plaintext for mock; use hash check in real use
              userType: "Admin",
            },
            {
              email: "userhandler@gmail.com",
              password: "123",
              userType: "UserHandler",
            },
            {
              email: "tripsupport@gmail.com",
              password: "123",
              userType: "TripSupport",
            },
            {
              email: "marketing@gmail.com",
              password: "123",
              userType: "MarketingHandler",
            },
            {
              email: "finance@gmail.com",
              password: "123",
              userType: "FinanceHandler",
            },
          ]

          // ✅ Find matching user
          const foundUser = mockUsers.find(
            (user) => user.email === email && user.password === password
          )

          if (!foundUser) {
            console.warn("Invalid credentials")
            return null
          }

          // ✅ Optional: simulate hashing (not used in mock check)
          // const hashedPassword = await saltAndHashPassword(foundUser.password)

          const userDetails = {
            id: foundUser.email, // NextAuth requires an id field
            email: foundUser.email,
            userType: foundUser.userType,
            jwt: "test-jwt-token", // Mock token for testing
          }

          console.log("Authorized user:", userDetails)
          return userDetails
        } catch (error) {
          console.error("Authorization error:", error)
          return null
        }
      },
    }),
  ],

  // ✅ Fallback secret for JWT
  secret: process.env.NEXTAUTH_SECRET || "your-fallback-secret",

  session: {
    strategy: "jwt", // Use JWT-based session (stateless)
  },

  callbacks: {
    // ✅ Called when JWT is created/updated
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.jwt = (user as User & { jwt?: string }).jwt
        token.userType = (user as User & { userType?: string }).userType
      }
      return token
    },

    // ✅ Called whenever a session is checked on the client
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session.jwt = token.jwt as string
        session.userType = token.userType as string
        session.user = {
          ...session.user,
          userType: token.userType as string,
        }
      }
      return session
    },
  },
})
