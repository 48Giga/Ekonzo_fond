
import Navigation from '../components/Navigation';
import { Link, useLoaderData } from 'react-router-dom';
import { ArrowBigLeft } from 'lucide-react';
import Utilisateur from '../components/Utilisateur';
import { formatCurrent } from '../utils/helpers';



const RecuDepot = () => {

    const client = useLoaderData()

    const code = (() => {
    const value = client?.Code_client || ''
    const longueurCode = value.length
    const lastLetter = value.at(-1) || ''
    const firstLetter = value.substring(0, 2)
    const midwere = value.substring(0, Math.max(0, longueurCode - 1))
    const midwerLetter = midwere.substring(2)
    return `${firstLetter} - ${midwerLetter} - ${lastLetter}`
  })()

    

    return (
        <Navigation
        titre={
            <Link to={"/"} className="flex gap-2 text-white items-center px-2">
                <ArrowBigLeft/>
            <span className="text-2xl font-bold max-sm:text-xl">Retour</span>
            </Link>
        }
        winget={<Utilisateur/>}
        >
           <div className="h-12"></div>
                    <div className="max-w-150 mx-auto p-4 bg-base-100 max-sm:px-4 shadow-lg rounded-lg">
                        <h4 className='text-center'>Transaction</h4>
                       <div className="header">
                         <h1 className="font-bold text-lg text-primary/60 text-center uppercase max-sm:text-lg max-sm:py-2">Depot</h1>
                         
                        <h2 className="text-center text-lg font-bold text-shadow-2xs text-neutral-content bg-primary">
                            {code.toUpperCase()}
                        </h2>
                       </div>
                       <div className="flex gap-2 items-center">
                                <h4 className="opacity-60">Date d'édition :</h4>
                                <div className='space-x-2'>
                                    <span className="font-bold text-primary text-xs">
                                      {new Date().toLocaleDateString('Fr-CD', {day: "numeric", month: "long", year: "numeric"})}
                                    </span>
                                </div>
                        </div>
                       <hr className='text-zinc-300' />
                       <div className="Body py-2 flex justify-center">
                        <span className="text-3xl font-[consolas] text-primary/60 font-bold">
                         {formatCurrent(client[0]?.Montant)}
                        </span>
                       </div>
                       <hr className='text-zinc-300' />
                        <div className="flex gap-2 items-center py-2">
                                <h4 className="opacity-60">Client(e) :</h4>
                                <div className='space-x-2'>
                                    <span className="font-bold  uppercase text-primary">
                                       {`${client[0].Nom_client} ${client[0].Post_Nom_client}`}
                                    </span>
                                    <span className="font-bold text-primary  capitalize">
                                        {client[0].Prenom_client}
                                    </span>
                                </div>
                        </div>
                        <div className="flex gap-2 items-center">
                                <h4 className="opacity-60">Date :</h4>
                                <div className='space-x-2'>
                                    <span className="font-bold  uppercase text-primary text-xs">
                                       {`${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`}
                                    </span>
                                </div>
                        </div>
                        <div className="flex gap-2 items-center">
                                <h4 className="opacity-60">ID du transaction :</h4>
                                <div className='space-x-2'>
                                    <span className="font-bold  uppercase text-primary text-xs">
                                       {client[0].iddepot}
                                    </span>
                                </div>
                        </div>
                        <div className="flex gap-2 items-center">
                                <h4 className="opacity-60">Statut :</h4>
                                <div className='space-x-2'>
                                    <span className="font-bold  uppercase text-primary text-xs">
                                      succèss
                                    </span>
                                </div>
                        </div>
                            <hr className='text-zinc-300' />
                            <div className="h-6"></div>
                            <div className="grid grid-cols-2 gap-6 py-2">
                                <button className='btn btn-primary'>
                                    <Link to={'/liste_depots'}>Liste de dépots</Link>                                    
                                </button>
                                <Link to={'/'} className='btn btn-outline text-primary hover:bg-primary hover:text-white'>
                                Ferme</Link>
                            </div>
                    </div>  
                    <div className="h-12"></div>  
                        
        </Navigation>
    );
};

export default RecuDepot;