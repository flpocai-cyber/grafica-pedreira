import { AdminDashboard } from './AdminDashboard'
import { AdminLogin } from './AdminLogin'
import { useAdminAuth } from '../hooks/useAdminAuth'

export const AdminRoute = () => {
  const { isAuthenticated } = useAdminAuth()

  return isAuthenticated ? <AdminDashboard /> : <AdminLogin />
}
