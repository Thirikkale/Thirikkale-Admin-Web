import NextAuth from "next-auth"
import { DefaultSession } from "next-auth"
import { ZodError } from "zod"
import Credentials from "next-auth/providers/credentials"
import { signInSchema } from "./lib/zod"
import { saltAndHashPassword } from "@/utils/password"
import { getAuthDetails } from "@/utils/db"
import type { Session, User } from "next-auth"
import type { JWT } from "next-auth/jwt"

// // Add userType to the Session type
// declare module "next-auth" {
//   interface Session {
//     userType?: string
//     jwt?: string
//     user: {
//       userType?: string
//     } & DefaultSession["user"]
//   }
// }

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          console.log("Credentials received:", credentials)
          const { email, password } = await signInSchema.parseAsync(credentials)
          const testUser = { email: 'test@gmail.com', password: 'test' } // Example test user
        
          // Check against test user
          if (email === testUser.email && password === testUser.password) {
            const hashedPassword = await saltAndHashPassword(testUser.password)
            
            const userDetails = { 
              email: testUser.email, 
              password: hashedPassword, 
              jwt: "test-jwt-token",
              userType: ["Admin", "RiderSupport", "DriverSupport"][Math.floor(Math.random() * 3)] // Assign a random userType
            };
            console.log("User details : ", userDetails);
            return userDetails;
          }
          return null
        } catch (error) {
          console.error("Auth error:", error)
          return null
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "your-fallback-secret-here",
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        // Transfer user properties to token
        token.jwt = (user as any).jwt
        token.userType = (user as any).userType
      }
      return token
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      // Transfer token properties to session
      if (token) {
        session.jwt = token.jwt as string
        session.userType = token.userType as string
        
        // Also add to session.user for easier access
        session.user = {
          ...session.user,
          userType: token.userType as string
        }
      }
      return session
    },
  },
})