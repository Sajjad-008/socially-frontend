import { IS_LOGGED_IN, CURRENT_USER_ID } from '@/config/session'

export function useSession() {
  return {
    isLoggedIn: IS_LOGGED_IN,
    currentUserId: IS_LOGGED_IN ? CURRENT_USER_ID : null,
  }
}
