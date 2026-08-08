import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { hasPermission } from '~/utils/authorization'
import { selectCurrentUser } from '~/redux/user/userSlice'


function PermissionRoute({resource, permission }) {

  const currentUser = useSelector(selectCurrentUser)

  const allowed = hasPermission(currentUser?.RoleId,resource, permission )

  if (!allowed) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default PermissionRoute