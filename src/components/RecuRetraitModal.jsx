import React, { useEffect, useRef, useState } from 'react';
import { formatCurrent } from '../utils/helpers';
import { getRetraits } from '../service';

const RecuRetraitModal = ({ isOpen, onClose }) => {
  const dialogRef = useRef(null);
  const [retraits, setRetraits] = useState([])
 

  useEffect(() => {
    if (isOpen && dialogRef.current) {
      dialogRef.current.showModal();
    } else if (!isOpen && dialogRef.current) {
      dialogRef.current.close();
    }
    getRetraits().then(setRetraits)
  }, [isOpen]);

  
  const retraitRes = retraits.filter(retrait => String(retrait.idretrait) === String(Math.max(...retraits.map(retrait => retrait.idretrait))))
  const dernierRetrait = Array.isArray(retraitRes) ? retraitRes[0] : retraitRes

  const code = (() => {
    const value = dernierRetrait?.Code_client || '';
    const longueurCode = value.length;
    const lastLetter = value.at(-1);
    const firstLetter = value.substring(0, 2);
    const midwere = value.substring(0, longueurCode - 1);
    const midwerLetter = midwere.substring(2);
    return `${firstLetter} - ${midwerLetter} - ${lastLetter}`;
  })();

  return (
    <dialog ref={dialogRef} className="modal">
      <div className="modal-box bg-base-100">
        <h4 className="text-center mb-4">Transaction</h4>
        <div className="header">
          <h1 className="font-bold text-lg text-primary/60 text-center uppercase max-sm:text-lg max-sm:py-2">
            Retrait
          </h1>

          <h2 className="text-center text-lg font-bold text-shadow-2xs text-neutral-content bg-primary">
            {code.toUpperCase()}
          </h2>
        </div>
        <div className="flex gap-2 items-center">
          <h4 className="opacity-60">Date d'édition :</h4>
          <div className="space-x-2">
            <span className="font-bold text-primary text-xs">
              {new Date().toLocaleDateString('Fr-CD', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </span>
          </div>
        </div>
        <hr className="text-zinc-300" />
        <div className="Body py-2 flex justify-center">
          <span className="text-3xl font-[consolas] text-primary/60 font-bold">
            {formatCurrent(dernierRetrait?.Montant)}
          </span>
        </div>
        <hr className="text-zinc-300" />
        <div className="flex gap-2 items-center py-2">
          <h4 className="opacity-60">Client(e) :</h4>
          <div className="space-x-2">
            <span className="font-bold uppercase text-primary">
              {`${dernierRetrait?.Nom_client} ${dernierRetrait?.Post_Nom_client}`}
            </span>
            <span className="font-bold text-primary capitalize">
              {dernierRetrait?.Prenom_client}
            </span>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <h4 className="opacity-60">Date :</h4>
          <div className="space-x-2">
            <span className="font-bold uppercase text-primary text-xs">
              {`${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`}
            </span>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <h4 className="opacity-60">ID du transaction :</h4>
          <div className="space-x-2">
            <span className="font-bold uppercase text-primary text-xs">
              {dernierRetrait?.idretrait}
            </span>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <h4 className="opacity-60">Statut :</h4>
          <div className="space-x-2">
            <span className="font-bold uppercase text-primary text-xs">
              succèss
            </span>
          </div>
        </div>
        <hr className="text-zinc-300" />
        <div className="modal-action">
          <button className="btn btn-primary" onClick={onClose}>
            Fermer
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default RecuRetraitModal;
