export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
} as const;

type USER_ROLES_KEYS = keyof typeof USER_ROLES;
export type USER_ROLE = (typeof USER_ROLES)[USER_ROLES_KEYS];
