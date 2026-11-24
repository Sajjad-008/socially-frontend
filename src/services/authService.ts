import type { User } from '@/types'
import { users } from '@/mocks/users'

export interface RegisterCredentials {
  name: string
  email: string
  password: string
}

const registeredUsers: User[] = []

function findUserByEmail(email: string) {
  const normalizedEmail = email.trim().toLowerCase()

  return [...users, ...registeredUsers].find(
    (user) => user.email.toLowerCase() === normalizedEmail,
  )
}

function createUsername(name: string, id: string) {
  const baseUsername = name.toLowerCase().replace(/[^\p{L}\p{N}]/gu, '') || 'user'
  const takenUsernames = new Set(
    [...users, ...registeredUsers].map((user) => user.username),
  )
  let username = baseUsername
  let suffix = 1

  while (takenUsernames.has(username)) {
    username = `${baseUsername}${suffix}`
    suffix += 1
  }

  return username || id
}

export const authService = {
  async login(email: string, password: string): Promise<User> {
    // The mock user fixtures do not include passwords, so login matches by email.
    void password
    const user = findUserByEmail(email)

    if (!user) {
      throw new Error('No account was found for this email address.')
    }

    return user
  },

  async register({ name, email, password }: RegisterCredentials): Promise<User> {
    // Passwords are accepted by this mock service but are not persisted.
    void password

    if (findUserByEmail(email)) {
      throw new Error('An account with this email already exists.')
    }

    const id = `mock-user-${registeredUsers.length + 1}`
    const user: User = {
      id,
      name: name.trim(),
      username: createUsername(name.trim(), id),
      email: email.trim().toLowerCase(),
      joinedAt: new Date().toISOString(),
      followingIds: [],
    }

    registeredUsers.push(user)
    return user
  },
}

export default authService
