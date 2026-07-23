import Home from './Contents/Home/Home'
import EmployeeList from './Contents/Employee/EmployeeList'
import EmployeeCreate from './Contents/Employee/EmployeeCreate'
import EmployeeEdit from './Contents/Employee/EmployeeEdit'
import Profile from './Contents/Profile/Profile'
import DashBoard from './Contents/DashBoard'
import { Navigate, Route, Routes, Outlet } from 'react-router-dom'
import Login from './Contents/Auth/Login'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from './redux/user/userSlice'

const ProtectedRoutes = ({ user }) => {
  if (!user) return <Navigate to='/login' replace={true} />
  return <Outlet />
}

function App() {
  
  const currentUser = useSelector(selectCurrentUser)

  return (
    <Routes>
      <Route path="/login" element={ currentUser ? <Navigate to="/" replace /> : <Login />}
    />
      <Route element={<ProtectedRoutes user={currentUser} />}>
        <Route element={<DashBoard />}>
          <Route path="/" element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="employees" element={<EmployeeList />} />
          <Route path="employees/create" element={<EmployeeCreate />} />
          <Route  path="employees/edit/:id"  element={<EmployeeEdit />}/>
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App