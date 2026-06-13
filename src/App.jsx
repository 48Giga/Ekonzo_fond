import {createBrowserRouter, Navigate, Outlet, redirect, RouterProvider} from 'react-router-dom'
import Home from './pages/Home'
import Erreur from './pages/Erreur'
import PiedPage from './components/PiedPage'
import Info from './pages/Info'
import Transactions from './pages/Transactions'
import Transaction from './pages/Transaction'
import Login from './pages/Login'
import { useAppContext } from './context/index.jsx'
import Admin from './pages/Admin.jsx'

const string_uri = 'http://localhost:4500'
const apiKey = 'ekonzo'

const protectedFetch = async (url) => {
  const token = localStorage.getItem('ekonzo_token')
  if (!token) return redirect('/login')
  const response = await fetch(url, { headers: getAuthHeaders() })
  if (response.status === 401) return redirect('/login')
  return response.json()
}

const getAuthHeaders = () => {
  const token = localStorage.getItem('ekonzo_token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

const ProtectedRoute = ({ children }) => {
  const { token } = useAppContext()
  return token ? children : <Navigate to="/login" replace />
}

const LoginRoute = () => {
  const { token } = useAppContext()
  return token ? <Navigate to="/" replace /> : <Login />
}

const chemin = createBrowserRouter([
  {
    path: '/',
    element: <>
      <Outlet />
      <PiedPage />
    </>,
    errorElement: <Erreur />,
    children: [
      {
        path: '/login',
        element: <LoginRoute />,
      },
      {
        path: '',
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: '/info_client/:id',
        element: (
          <ProtectedRoute>
            <Info />
          </ProtectedRoute>
        ),
    
      },
      {
        path: '/manager',
        element: (
          <ProtectedRoute>
            <Admin/>
          </ProtectedRoute>
        )
      },
      {
        path: '/transactions/:id',
        element: (
          <ProtectedRoute>
            <Transactions />
          </ProtectedRoute>
        )
      },
      {
        path: '/transaction/:id',
        element: (
          <ProtectedRoute>
            <Transaction />
          </ProtectedRoute>
        )
      },
    ],
  },
])

const App = () => {
  return (
    <div className="max-h-full bg-base-200">
      <RouterProvider router={chemin} />
    </div>
  )
}

export default App
