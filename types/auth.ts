export type UserRole = "user" | "mentor" | "admin"

export interface UserSession {
  id: string
  name: string
  email: string
  image?: string
  role: UserRole
}

