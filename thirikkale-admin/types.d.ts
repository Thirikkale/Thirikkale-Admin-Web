import { DefaultSession } from "next-auth"

declare module "next-auth" {
  // The `JWT` interface can be found in the `next-auth/jwt` submodule
  import { JWT } from "next-auth/jwt"
  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {
    firstName?: string
    lastName?: string
    phoneNumber?: string
    jwt?: string
    refreshToken?: string
    userType?: string
  }
  /**
   * The shape of the account object returned in the OAuth providers' `account` callback,
   * Usually contains information about the provider being used, like OAuth tokens (`access_token`, etc).
   */
  interface Account {}
 
  /**
   * Returned by `useSession`, `auth`, contains information about the active session.
   */
  interface Session {
    jwt?: string
    refreshToken?: string
    userType?: string
    user?: {
      firstName?: string
      lastName?: string
      phoneNumber?: string
      userType?: string
    } & DefaultSession["user"]
  }
}
 
 
declare module "next-auth/jwt" {
  interface JWT {
    jwt?: string
    refreshToken?: string
    userType?: string
    firstName?: string
    lastName?: string
    phoneNumber?: string
  }
}