// app/api/auth/[...nextauth]/route.ts (or similar file depending on your setup)

// app/api/auth/[...nextauth]/route.ts (or similar file depending on your setup)

import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { signInSchema } from "@/lib/zod" // Zod schema to validate login form
// import { saltAndHashPassword } from "@/utils/password" // Optional: to hash passwords
import type { Session, User } from "next-auth"
import type { JWT } from "next-auth/jwt"

// ✅ Initialize NextAuth
// ✅ Initialize NextAuth
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    // ✅ Use credentials-based login
    // ✅ Use credentials-based login
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          console.log("🔐 Authenticating with backend API...")

          // ✅ Validate with Zod
          const { email, password } = await signInSchema.parseAsync(credentials)

          // ✅ Call backend admin login API
          // Use NEXT_PUBLIC_USER_SERVICE_URL from .env.local
          const userServiceUrl = process.env.NEXT_PUBLIC_USER_SERVICE_URL || "http://localhost:8081/user-service"
          const loginUrl = `${userServiceUrl}/api/v1/auth/admin/login`
          
          console.log("📡 Login URL:", loginUrl)
          console.log("📧 Email:", email)

          const response = await fetch(loginUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              emailOrPhone: email,
              password: password,
            }),
          })

          console.log("📊 Response status:", response.status)

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}))
            console.error("❌ Login failed:", response.status, errorData)
            return null
          }

          const data = await response.json()
          console.log("✅ Login successful! User type:", data.userType)

          // ✅ Map backend response to NextAuth user format
          const userDetails = {
            id: data.userId, // NextAuth requires an id field
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            phoneNumber: data.phoneNumber,
            userType: data.userType, // e.g., "ADMIN_ADMIN", "ADMIN_FINANCE_HANDLER"
            jwt: data.accessToken,
            refreshToken: data.refreshToken,
          }

          console.log("👤 Authorized user:", userDetails.email, userDetails.userType)
          return userDetails
        } catch (error) {
          console.error("💥 Authorization error:", error)
          return null
        }
      },
    }),
  ],

  // ✅ Fallback secret for JWT
  secret: process.env.NEXTAUTH_SECRET || "your-fallback-secret",


  // ✅ Fallback secret for JWT
  secret: process.env.NEXTAUTH_SECRET || "your-fallback-secret",

  session: {
    strategy: "jwt", // Use JWT-based session (stateless)
    strategy: "jwt", // Use JWT-based session (stateless)
  },


  callbacks: {
    // ✅ Called when JWT is created/updated
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.jwt = (user as User & { jwt?: string }).jwt
        token.refreshToken = (user as User & { refreshToken?: string }).refreshToken
        token.userType = (user as User & { userType?: string }).userType
        token.firstName = (user as User & { firstName?: string }).firstName
        token.lastName = (user as User & { lastName?: string }).lastName
        token.phoneNumber = (user as User & { phoneNumber?: string }).phoneNumber
      }
      return token
    },

    // ✅ Called whenever a session is checked on the client
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session.jwt = token.jwt as string
        session.refreshToken = token.refreshToken as string
        session.userType = token.userType as string
        session.user = {
          ...session.user,
          firstName: token.firstName as string,
          lastName: token.lastName as string,
          phoneNumber: token.phoneNumber as string,
          userType: token.userType as string,
        }
      }
      return session
    },
  },
})

