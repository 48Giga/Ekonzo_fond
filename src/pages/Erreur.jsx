import React from 'react';
import {useRouteError} from 'react-router-dom';

function Erreur() {
    const erreur = useRouteError()
    console.error(erreur);

    return (
        <div className='max-w-4xl bg-red-200  mx-auto p-4'>
            <h1 className='text-xl font-bold text-center'>
                Erreur 404, page introuvable
            </h1>
            <p className='py-6 text-red-500 text-center'>
                {erreur.error.toString() ?? erreur.toString()}
            </p>
        </div>
    );
}

export default Erreur;