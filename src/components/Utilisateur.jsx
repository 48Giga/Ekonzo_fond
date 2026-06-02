import { UserPlus2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/index.jsx'

const Utilisateur = () => {
    const d = new Date()
    const heure = d.getHours()
    const { user, logout } = useAppContext()

    const salutation = heure < 18 ? 'Bonjour' : 'Bonsoir'
    return (
        <div className='flex items-center space-x-4'>
            <div className="flex-1">
                <div className="space-x-2 max-sm:grid max-sm:grid-cols-1">
                    <span className="text-white/85">{salutation}</span>
                    <span className="text-lg capitalize text-white">{user?.name || 'Invité'}</span>
                </div>
            </div>
            <div className="flex-none">
                <div className="dropdown dropdown-end">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle avatar"
                    >
                        <div className="w-10 rounded-full">
                            <img
                                alt="Profil User"
                                src="profil_defaut.png"
                                loading="lazy"
                            />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content space-y-3 bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                    >
                        <li>
                            <Link to='/manager' className="btn btn-primary justify-between">
                                Administrateur
                                <span className="badge"><UserPlus2 /></span>
                            </Link>
                        </li>
                        <li>
                            <button onClick={logout} className="btn btn-outline btn-primary w-full text-left">
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Utilisateur;