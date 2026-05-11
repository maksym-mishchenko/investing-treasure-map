export interface User {
  username: string;
  role: "admin" | "user";
  displayName: string;
  image?: string;
  authenticated: boolean;
}

export function isAdmin(user: User | null): boolean {
  return user?.role === "admin";
}
