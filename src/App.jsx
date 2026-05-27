import {createBrowserRouter, Navigate, Outlet, redirect, RouterProvider} from 'react-router-dom'
import Home from './pages/Home'
import Erreur from './pages/Erreur'
import PiedPage from './components/PiedPage'
import Info from './pages/Info'
import Client from './pages/Client'
import Transactions from './pages/Transactions'
import Transaction from './pages/Transaction'
import Retrait from './pages/Retrait'
import Depot from './pages/Depot'
import RecuDepot from './pages/RecuDepot'
import RecuRetrait from './pages/RecuRetrait'
import Dette from './pages/Dette'
import Login from './pages/Login'
import { useAppContext } from './context/index.jsx'

const string_uri = 'http://localhost:4500'
const apiKey = 'ekonzo'

const getAuthHeaders = () => {
  const token = localStorage.getItem('ekonzo_token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

const protectedFetch = async (url) => {
  const token = localStorage.getItem('ekonzo_token')
  if (!token) return redirect('/login')
  const response = await fetch(url, { headers: getAuthHeaders() })
  if (response.status === 401) return redirect('/login')
  return response.json()
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
        path: '/info_client/:code',
        element: (
          <ProtectedRoute>
            <Info />
          </ProtectedRoute>
        ),
        loader: ({ params }) => protectedFetch(`${string_uri}/${apiKey}/single_client/${params.code}`),
      },
      {
        path: '/create',
        element: (
          <ProtectedRoute>
            <Client />
          </ProtectedRoute>
        ),
        loader: () => protectedFetch(`${string_uri}/${apiKey}/adress_max_id`),
      },
      {
        path: '/transactions/:id',
        element: (
          <ProtectedRoute>
            <Transactions />
          </ProtectedRoute>
        ),
        loader: ({ params }) => protectedFetch(`${string_uri}/${apiKey}/single_client/${params.id}`),
      },
      {
        path: '/transaction/:id',
        element: (
          <ProtectedRoute>
            <Transaction />
          </ProtectedRoute>
        ),
        loader: ({ params }) => protectedFetch(`${string_uri}/${apiKey}/single_client/${params.id}`),
      },
      {
        path: '/liste_retraits',
        element: (
          <ProtectedRoute>
            <Retrait />
          </ProtectedRoute>
        ),
        loader: () => protectedFetch(`${string_uri}/${apiKey}/all_retraits`),
      },
      {
        path: '/liste_dettes',
        element: (
          <ProtectedRoute>
            <Dette />
          </ProtectedRoute>
        ),
        loader: () => protectedFetch(`${string_uri}/${apiKey}/all_dettes`),
      },
      {
        path: '/liste_depots',
        element: (
          <ProtectedRoute>
            <Depot />
          </ProtectedRoute>
        ),
        loader: () => protectedFetch(`${string_uri}/${apiKey}/all_depots`),
      },
      {
        path: '/recu_depot',
        element: (
          <ProtectedRoute>
            <RecuDepot />
          </ProtectedRoute>
        ),
        loader: () => protectedFetch(`${string_uri}/${apiKey}/recu_transaction_depot`),
      },
      {
        path: '/recu_retrait',
        element: (
          <ProtectedRoute>
            <RecuRetrait />
          </ProtectedRoute>
        ),
        loader: () => protectedFetch(`${string_uri}/${apiKey}/recu_transaction_retrait`),
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
