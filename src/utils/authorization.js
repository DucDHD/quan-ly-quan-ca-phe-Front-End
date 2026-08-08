import { ROLE_PERMISSIONS } from '../config/rolePermissions'

export const hasPermission = (roleId, resource, permission) => {
  if (!roleId || !permission) return false

  return ROLE_PERMISSIONS[roleId]?.[resource]?.includes(permission) || false
}   