import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../service'
import { useAppContext } from '../context/index.jsx'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAppContext()
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)
    try {
      const data = await loginUser({ email, password })
      if (data?.token) {
        login({ token: data.token, user: data.user })
        navigate('/')
      } else {
        setError(data?.message || 'Impossible de se connecter.')
      }
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.message || err.message || 'Erreur de connexion.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-base-200 hero px-4  sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl hero-content flex-row-reverse  gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <section className="space-y-5">
          <div className="badge badge-primary badge-lg">Ekonzo Finance</div>
          <h1 className="text-4xl font-medium text-base-content sm:text-5xl">
            Plateforme microfinance <span className="text-primary font-bold">Ekonzo</span>  pour dépôt, retrait, ouverture de compte.
          </h1>
          <p className="text-lg text-base-content/80">
            Bwakisa carte modernisée, sécurisez l’accès aux opérations financières, pour la gestion quotidienne.
          </p>
          
        </section>
        <section>
          <div className="w-full max-w-md bg-base-100 p-8 rounded-lg shadow-lg">
              <h1 className="text-2xl text-primary font-bold mb-4 text-center">Connexion</h1>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="input input-bordered w-full"
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">Mot de passe</span>
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="input input-bordered w-full"
                  />
                </div>
                {error && <div className="text-error text-sm">{error}</div>}
                <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                  {loading ? 'Connexion...' : 'Se connecter'}
                </button>
              </form>
            </div>
        </section>
      </div>
    </main>
  )
}

export default Login
