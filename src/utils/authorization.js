import { ROLE_PERMISSIONS } from '../config/rolePermissions'

export const hasPermission = (roleId, permission) => {
  if (!roleId || !permission) return false

  const permissions = ROLE_PERMISSIONS[Number(roleId)] || []

  return permissions.includes(permission)
}