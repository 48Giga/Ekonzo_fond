import React, { useEffect, useState } from 'react';
import { createClient, getAdresses } from '../service';
import confetti from 'canvas-confetti';
import { formatCurrent } from '../utils/helpers';
import { UserPlus2 } from 'lucide-react';
import ClientRecent from './ClientRecent';

const ClientForm = () => {

    const initialClient = { prenom: "", nom: "", postnom: "", adresse: "", mise: 0 }

    const [adresses, setAdresses] = useState([])
    const [apercu, setApercu] = useState(null)
    const [message, setMessage] = useState('')
    const [erreur, setErreur] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [values, setValues] = useState(initialClient);

    useEffect(() => {
        getAdresses().then(setAdresses)
    }, [])

    const handleApercu = async (e) => {
        e.preventDefault();
        await setApercu(values)
        setErreur('')
        setMessage('')
        document.getElementById('modal_frm_create').close()
        document.getElementById('modal_apercu').showModal()
    }

    const submitClient = async () => {
        setIsLoading(true)
        setMessage('')

        const response = await createClient(values);
        if (response?.success) {
            setMessage(response?.message || 'Enregistrement réussie')
            confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, zIndex: 9999 })
        }
        setValues("")
        setTimeout(async () => {
            await document.getElementById('modal_apercu').close()
            await  document.getElementById("modal_client-recent").showModal()
        }, 5000);
       

    };

    const handleAnnuler = () => {
        setApercu(null)
        document.getElementById('frm_client').reset()
        document.getElementById('modal_apercu').close()
        setErreur('Apercu annuler, désolé !!!')
    }

    return (
        <div>

            <button
                className="btn btn-lg btn-circle btn-primary"
                onClick={() =>
                    document.getElementById("modal_frm_create").showModal()
                }
            >
                <UserPlus2 />
            </button>

            <dialog id="modal_frm_create" className="modal">
                <div className="modal-box w-100  max-sm:w-full">
                    <h4 className="mb-4 text-center bg-primary text-neutral-content font-semibold text-lg py-2">
                        Ajouter client
                    </h4>
                    <form action="" onSubmit={handleApercu} id="frm_client">
                        <div className="grid grid-cols-2 gap-2 max-sm:grid-cols-1">
                            <label className="floating-label">
                                <span>Prenon du client</span>
                                <input
                                    type="text"
                                    onChange={(e) =>
                                        setValues({ ...values, prenom: e.target.value })
                                    }
                                    className="input max-sm:w-full"
                                    placeholder="Prenon du client"
                                    required
                                />
                            </label>

                            <label className="floating-label">
                                <span>Nom du client</span>
                                <input
                                    type="text"
                                    onChange={(e) =>
                                        setValues({ ...values, nom: e.target.value })
                                    }
                                    className="input max-sm:w-full"
                                    placeholder="Nom du client"
                                    required
                                />
                            </label>

                            <label className="floating-label">
                                <span>Post-nom du client</span>
                                <input
                                    type="text"
                                    onChange={(e) =>
                                        setValues({ ...values, postnom: e.target.value })
                                    }
                                    className="input max-sm:w-full"
                                    placeholder="Post-nom du client"
                                    required
                                />
                            </label>

                            <select
                                name=""
                                onChange={(e) =>
                                    setValues({ ...values, adresse: e.target.value })
                                }
                                className="select max-sm:w-full"
                                required
                            >
                                <option className="text-primary" value="">
                                    Choisir adresse
                                </option>
                                {adresses.length === 0 ? (
                                    <span className="loading loading-spinner loading-md"></span>
                                ) : adresses.map((adresse, i) => {
                                    return (
                                        <option key={i} value={adresse?.Adresse_client}>
                                            {adresse["Adresse_client"]}
                                        </option>
                                    );
                                })}
                            </select>

                            <label className="floating-label">
                                <span>Mise du client</span>
                                <input
                                    type="number"
                                    onChange={(e) =>
                                        setValues({ ...values, mise: e.target.valueAsNumber })
                                    }
                                    className="input max-sm:w-full"
                                    placeholder="Mise"
                                    required
                                />
                            </label>
                            <button
                                type="submit"
                                className="btn btn-primary btn-block hover:bg-primary hover:text-white"
                            >
                                Enregistrer
                            </button>
                        </div>
                    </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>Close</button>
                </form>
            </dialog>

            <dialog className="modal" id="modal_apercu">
                <div className="modal-box w-100">
                    {apercu && (
                        <div className="">
                            <h2 className="text-xl text-primary font-bold">
                                Vérification des informations
                            </h2>
                            <div className="mt-4">
                                <div className="flex gap-4 items-center">
                                    <h4>Noms :</h4>
                                    <span className="text-xs font-bold text-primary uppercase opacity-80">
                                        {`${apercu.nom} - ${apercu.postnom} `}
                                    </span>
                                    <span className="text-xs font-bold text-primary capitalize opacity-80">
                                        {apercu.prenom}
                                    </span>
                                </div>
                                <div className="flex gap-4 items-center">
                                    <h4>Adresse : </h4>
                                    <span className="text-xs font-bold text-primary capitalize opacity-80">
                                        {apercu.adresse}
                                    </span>
                                </div>
                                <div className="flex gap-4 items-center">
                                    <h4>Mise : </h4>
                                    <span className="text-xs font-bold text-primary capitalize opacity-80">
                                        {formatCurrent(apercu.mise) }
                                    </span>
                                </div>
                            </div>
                            <hr className="text-primary my-4" />
                            <div className="space-x-4">
                                <button
                                    onClick={submitClient}
                                    disabled={isLoading}
                                    className="btn btn-primary">
                                    {isLoading ? (
                                        <span className="loading loading-spinner loading-md"></span>
                                    ) : "Confirmer"}
                                </button>
                                <button
                                    onClick={handleAnnuler}
                                    disabled={isLoading}
                                    className="btn btn-outline btn-primary">
                                    Annuler
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                    {erreur ? <div className="toast toast-middle toast-center"><div className="alert font-bold alert-error">{erreur}</div></div> : null}
                    {message ? <div className="toast toast-bottom toast-center"><div className="alert font-bold alert-success">{message}</div></div> : null}
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

            <ClientRecent/>
        </div>
    );
};

export default ClientForm;