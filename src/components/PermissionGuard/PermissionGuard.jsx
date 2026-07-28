import { useSelector } from 'react-redux'
import { hasPermission } from '~/utils/authorization'
import { selectCurrentUser } from '~/redux/user/userSlice'


function PermissionGuard({ permission, children, fallback = null }) {

  const currentUser = useSelector(selectCurrentUser)

  const allowed = hasPermission(  currentUser?.RoleId, permission)

  if (!allowed) {
    return fallback
  }

  return children
}

export default PermissionGuard