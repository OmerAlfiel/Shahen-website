/**
 * Authentication utility functions
 */

/**
 * Check if user is authenticated by calling the /api/auth/me endpoint
 */
export async function checkAuth(): Promise<{ isAuthenticated: boolean; user?: any }> {
  try {
    const response = await fetch("/api/auth/me", {
      method: "GET",
      credentials: "include",
    })

    if (response.ok) {
      const data = await response.json()
      return { isAuthenticated: true, user: data.user }
    }

    return { isAuthenticated: false }
  } catch (error) {
    console.error("[v0] Auth check error:", error)
    return { isAuthenticated: false }
  }
}

/**
 * Logout user by calling the /api/auth/logout endpoint
 */
export async function logout(): Promise<boolean> {
  try {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    })

    return response.ok
  } catch (error) {
    console.error("[v0] Logout error:", error)
    return false
  }
}

/**
 * Get auth token from cookie (client-side helper)
 * Note: This won't work for HTTP-only cookies, use checkAuth() instead
 */
export function getAuthToken(): string | null {
  if (typeof document === "undefined") return null

  const cookies = document.cookie.split(";")
  const authCookie = cookies.find((cookie) => cookie.trim().startsWith("auth_token="))

  if (authCookie) {
    return authCookie.split("=")[1]
  }

  return null
}
