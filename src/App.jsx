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
import PermissionRoute from './components/PermissionRoute/PermissionRoute'
import { PERMISSIONS } from './utils/permissions'
import TableSales from './Contents/Sales/TableSales'
import EquipmentCreate from './Contents/Equiment/EquimentCreate'
import EquipmentList from './Contents/Equiment/EquimentList'
import EquipmentEdit from './Contents/Equiment/EquipmentEdit'
import InventoryList from './Contents/Inventory/InventoryList'
import InventoryCreate from './Contents/Inventory/InventoryCreate'



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

          {/*--- Start Route quản trang cá nhân --- */}
          <Route path="profile" element={<Profile />} />
          {/*--- End Route quản trang cá nhân --- */}

          {/*--- Start Route quản lý nhân viên --- */}
          <Route element={ <PermissionRoute  resource="employees" permission={PERMISSIONS.VIEW} />} >
            <Route path="employees" element={<EmployeeList />} />
          </Route >
          <Route element={ <PermissionRoute resource="employees" permission={PERMISSIONS.CREATE} />} >
            <Route path="employees/create" element={<EmployeeCreate />} />
          </Route >
          <Route element={ <PermissionRoute resource="employees" permission={PERMISSIONS.UPDATE} />} >
            <Route  path="employees/edit/:id"  element={<EmployeeEdit />}/>
          </Route >
          {/*--- End Route quản lý nhân viên --- */}

          {/*--- Starrt Route quản lý bán hàng --- */}
          <Route path="/sales" element={<TableSales />}/>
          {/*--- End Route quản lý bán hàng --- */}

          {/*--- Starr Route quản lý Thiết bị --- */}
          <Route element={ <PermissionRoute  resource="equipments" permission={PERMISSIONS.VIEW} />} >
            <Route path="/equipments" element={<EquipmentList />}/>
          </Route>
          <Route element={ <PermissionRoute resource="equipments" permission={PERMISSIONS.CREATE} />} >
            <Route path="/equipment/create" element={<EquipmentCreate />}/>
          </Route>
          <Route element={ <PermissionRoute resource="equipments" permission={PERMISSIONS.UPDATE} />} >
            <Route  path="equipment/edit/:id"  element={<EquipmentEdit />}/>
          </Route>
          {/*--- End Route quản lý Thiết bị --- */}

          {/*--- Start Route quản lý kho hàng--- */}
          <Route element={ <PermissionRoute  resource="inventorys" permission={PERMISSIONS.VIEW} />} >
            <Route path="/inventorys" element={<InventoryList />}/>
          </Route>
          <Route element={ <PermissionRoute resource="equipments" permission={PERMISSIONS.CREATE} />} >
            <Route path="/inventory/create" element={<InventoryCreate />}/>
          </Route>

          {/*--- End Route quản lý kho hàng--- */}

        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App