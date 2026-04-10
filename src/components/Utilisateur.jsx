import { UserPlus2 } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const Utilisateur = () => {
    const d = new Date();
    const heure = d.getHours();

    const salutation = heure < 18 ? "Bonjour" : "Bonsoir";
    return (
        <div className='flex items-center space-x-4'>
            <div className="flex-1">
                <div className="space-x-2 max-sm:grid max-sm:grid-cols-1">
                    <span className="text-white/85">{salutation}</span>
                    <span className="text-lg text-white">Fabrice</span>
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
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                    >
                        <li>
                            <Link to='/create' className="btn btn-primary text-white btn-sm justify-between" >

                            Ajouter client
                                <span className="badge"><UserPlus2/></span>
                                
                            </Link>
                        </li>
                        <li>
                            <a>Settings</a>
                        </li>
                        <li>
                            <a>Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Utilisateur;