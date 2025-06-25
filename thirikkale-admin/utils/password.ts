import React from 'react'
import bcrypt from "bcryptjs"

/**
 * Hashes a password using bcrypt with a cost factor of 10.
 * @param password The plain text password to hash.
 * @returns The bcrypt hash string.
 */
export async function saltAndHashPassword(password: string): Promise<string> {
  const saltRounds = 10
  const salt = await bcrypt.genSalt(saltRounds)
  const hash = await bcrypt.hash(password, salt)
  return hash
}


