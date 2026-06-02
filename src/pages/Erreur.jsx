import React from 'react';
import {Link, Navigate, useRouteError} from 'react-router-dom';

function Erreur() {

    const erreur = useRouteError()
    

    return (
        <div className=' hero bg-red-200 '>
            <div className="hero-content flex-col text-center">
                <h1 className='text-6xl font-bold text-center'>
                Erreur 404, page introuvable
            </h1>
            <p className='py-6 text-red-500 text-2xl text-center'>
                {erreur.error.toString() ?? erreur.toString()}
            </p>
                <Link to="/" className="btn btn-primary">
                    Retour à l'accueil
                </Link>
            </div>
        </div>
    );
}

export default Erreur;