import { Link,  useNavigate, useParams } from "react-router-dom";
import { getSingleClient, supprimerClient, updateClient } from "../service";
import Navigation from "../components/Navigation";
import { useEffect, useState } from "react";
import Utilisateur from "../components/Utilisateur";
import { ArrowBigLeft, Edit, Trash, Trash2, User } from "lucide-react";
import { formatCurrent } from "../utils/helpers";
import confetti from "canvas-confetti";



const Info = () => {

  const {id} = useParams()
  const [clientId, setClientId] = useState([])

  
  const client = clientId[0] || null


  const nbr_case =
    parseFloat(client?.Solde_client) / parseFloat(client?.Mise_client);
  const prenom = client?.Prenom_client.toLowerCase();

  

  const code = (() => {
    const value = client?.Code_client || ''
    const longueurCode = value.length
    const lastLetter = value.at(-1) || ''
    const firstLetter = value.substring(0, 2)
    const midwere = value.substring(0, Math.max(0, longueurCode - 1))
    const midwerLetter = midwere.substring(2)
    return `${firstLetter} - ${midwerLetter} - ${lastLetter}`
  })()

  const navigate = useNavigate();

  const handlerDelete = async(id) => {
    if (confirm("Voullez-vous vraiment supprimer ce client ?")) {
      await supprimerClient(id);
      navigate("/manager");
    }
  };

  const created = new Date(client?.Date_creation).toLocaleDateString();

  const [modifierValues, setModifierValues] = useState({
    id: 0,
    code: "",
    prenom: "",
    nom: "",
    postnom: "",
    adresse: "",
    mise: 0,
    solde: 0,
  });

  const [apercu, setApercu] = useState(null)
  const [message, setMessage] = useState('')
  const [erreur, setErreur] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    getSingleClient(id).then(setClientId)
  }, [id]);

  useEffect(() => {
    if (client?.id_client) {
      setModifierValues(prev => ({
        ...prev,
        code: client?.Code_client,
        prenom: client?.Prenom_client,
        nom: client?.Nom_client,
        postnom: client?.Post_Nom_client,
        adresse: client?.Adresse_client,
        mise: client?.Mise_client,
        solde: client?.Solde_client,
        id: client?.id_client,
      }));
    }
  }, [client]);

  const handleApercu = e => {
    e.preventDefault()
    setApercu('')
    setApercu(modifierValues)
    document.getElementById('modal_apercu').showModal()
    document.getElementById('modal_frm_edit').close()
    return;
  }

  const handleAnnuler = () => {
    setApercu(null)
     document.getElementById('modal_apercu').close()
    setErreur('Modification annuler, désolé !!!')
  }

  const submitModifier = async () => {
    setIsLoading(true)
    setErreur('')

    try {
      const response = await updateClient(modifierValues, client?.id_client);
      if(response?.success) {
        setMessage(response?.message)
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, zIndex: 9999 })
      }
      
      setTimeout( async () => await location.reload(), 5000);
    } catch (error) {
      setErreur(`Erreur de modification, ${error}`)
    }
  };

  return (
    <>
      <Navigation
        titre={
          <Link
            to={"/manager"}
            className="flex gap-6 text-neutral-content items-center px-2"
          >
            <ArrowBigLeft />
            <span className="flex items-center text-2xl font-bold max-sm:text-xl">
                {code}
            </span>
          </Link>
        }
        winget={<Utilisateur />}
      >
        <div className="w-full place-items-center py-8 max-md:pb-2">
          <div className="max-w-150 mx-auto p-4 bg-base-100 shadow-lg rounded-lg">
            <h1 className="font-bold text-lg text-center text-secondary/60  uppercase max-sm:text-lg max-sm:py-2">
              Detail du client
            </h1>
            <h2 className="text-center font-bold text-shadow-2xs text-neutral-content bg-primary">
              {code.toUpperCase()}
            </h2>
            <div className="px-1  max-sm:w-full">
              <h4 className="text-start text-secondary text-[14px] py-2 opacity-60 font-semibold">
                Identité du client
              </h4>
              <hr className="w-2xs text-gray-200 text-center" />
              <div className="flex gap-2 items-center">
                <h4 className="opacity-60">Noms :</h4>
                <div>
                  <span className="font-bold uppercase text-secondary text-xs">
                    {`${client?.Nom_client} ${client?.Post_Nom_client} `}
                  </span>
                  <span className="font-bold text-secondary text-xs capitalize">
                    {prenom}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <h4 className="opacity-60">Adresse :</h4>
                <h4 className="font-bold text-secondary capitalize text-xs">
                  {client?.Adresse_client}
                </h4>
              </div>

              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <h4 className="opacity-60">Créé :</h4>
                  <h4 className="font-bold text-secondary capitalize text-xs">
                    {created}
                  </h4>
                </div>
                <div className="flex items-center gap-2">
                  <h4 className="opacity-60">Actuel :</h4>
                  <h4 className="font-bold text-secondary capitalize text-xs">
                    {new Date().toLocaleDateString()}
                  </h4>
                </div>
              </div>

              {/* <div className="py-2 max-sm:py-1"></div> */}
              <h4 className="text-start text-secondary text-[14px] py-2 opacity-60 font-semibold">
                Finance du client
              </h4>
              <hr className="w-2xs text-gray-200 text-center" />
              <div className="flex items-center gap-2">
                <h4 className="opacity-60">Nombre de case :</h4>
                <h4 className="font-bold text-secondary capitalize text-xs">
                  {nbr_case.toFixed(0)}
                </h4>
              </div>
              <div className="flex items-center gap-2">
                <h4 className="opacity-60">Mise :</h4>
                <h4 className="font-bold font-[consolas] text-secondary capitalize text-xs">
                  {formatCurrent(client?.Mise_client)}
                </h4>
              </div>

              <div className="flex items-center gap-2">
                <h4 className="opacity-60">Solde :</h4>
                <h4 className="font-bold font-[consolas] text-secondary capitalize text-xs">
                  {formatCurrent(client?.Solde_client)}
                </h4>
              </div>
              <hr />
            </div>
            <div className="flex justify-center gap-6 mt-2 max-md:mt-0 print:hidden">
              <button
                className="btn btn-square btn-ghost text-warning hover:text-white hover:bg-warning"
                onClick={() =>
                  document.getElementById("modal_frm_edit").showModal()
                }
              >
                <Edit/>
              </button>

              <button
                onClick={() => handlerDelete(client?.id_client)}
                className="btn btn-square btn-ghost text-error hover:text-white hover:bg-error"
              >
                <Trash2/>
              </button>
            </div>

            {/* Formulaire de modification */}

            <dialog id="modal_frm_edit" className="modal">
              <div className="modal-box w-150">
                <h4 className="mb-4 bg-primary py-2 text-center font-bold uppercase text-lg text-neutral-content">
                  Modifier client
                </h4>
                <form action="" onSubmit={handleApercu}>
                  <div className="grid grid-cols-2 gap-4 max-sm:grid max-sm:grid-cols-1">
                    <label className="floating-label">
                      <span>Code client</span>
                      <input
                        type="text"
                        value={modifierValues.code}
                        onChange={(e) =>
                          setModifierValues({
                            ...modifierValues,
                            code: e.target.value,
                          })
                        }
                        className="input opacity-60"
                      />
                    </label>

                    <label className="floating-label">
                      <span>Prenon du client</span>
                      <input
                        type="text"
                        value={modifierValues.prenom}
                        onChange={(e) =>
                          setModifierValues({
                            ...modifierValues,
                            prenom: e.target.value,
                          })
                        }
                        className="input opacity-60"
                      />
                    </label>

                    <label className="floating-label">
                      <span>Nom du client</span>
                      <input
                        type="text"
                        value={modifierValues.nom}
                        onChange={(e) =>
                          setModifierValues({
                            ...modifierValues,
                            nom: e.target.value,
                          })
                        }
                        className="input opacity-60"
                      />
                    </label>

                    <label className="floating-label">
                      <span>Post-nom du client</span>
                      <input
                        type="text"
                        value={modifierValues.postnom}
                        onChange={(e) =>
                          setModifierValues({
                            ...modifierValues,
                            postnom: e.target.value,
                          })
                        }
                        className="input opacity-60"
                      />
                    </label>

                    <label className="floating-label">
                      <span>Adresse du client</span>
                      <input
                        type="text"
                        value={modifierValues.adresse}
                        onChange={(e) =>
                          setModifierValues({
                            ...modifierValues,
                            adresse: e.target.value,
                          })
                        }
                        className="input opacity-60"
                      />
                    </label>

                    <label className="floating-label">
                      <span>Date de creation</span>
                      <input
                        type="text"
                        defaultValue={created}
                        className="input opacity-60"
                      />
                    </label>

                    <label className="floating-label">
                      <span>Mise</span>
                      <input
                        type="number"
                        value={modifierValues.mise}
                        onChange={(e) =>
                          setModifierValues({
                            ...modifierValues,
                            mise: e.target.valueAsNumber,
                          })
                        }
                        className="input opacity-60"
                      />
                    </label>

                    <label className="floating-label">
                      <span>Solde</span>
                      <input
                        type="number"
                        value={modifierValues.solde}
                        onChange={(e) =>
                          setModifierValues({
                            ...modifierValues,
                            solde: e.target.valueAsNumber,
                          })
                        }
                        className="input opacity-60"
                      />
                    </label>
                    <input
                      type="hidden"
                      value={modifierValues.id}
                      onChange={(e) =>
                        setModifierValues({
                          ...modifierValues,
                          id: e.target.valueAsNumber,
                        })
                      }
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-block btn-ghost bg-primary-content text-neutral/30 mt-2 hover:bg-primary hover:text-neutral-content"
                  >
                    Modifier
                  </button>
                </form>
              </div>
              <form method="dialog" className="modal-backdrop">
                <button>Close</button>
              </form>
            </dialog>

            <dialog className="modal" id="modal_apercu">
        <div className="modal-box w-150">
          {apercu && (
            <div className="">
              <h2 className="text-x text-primary font-bold">
                Etes-vous sûr de bien vouloir modifier <br/> Les informations ci-après :
              </h2>
              <hr />
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
                    {formatCurrent(apercu.mise)}
                  </span>
                </div>
                <div className="flex gap-4 items-center">
                  <h4>Solde : </h4>
                  <span className="text-xs font-bold text-primary capitalize opacity-80">
                    {formatCurrent(apercu.solde)}
                  </span>
                </div>
              </div>
              <hr className="text-primary my-4" />
              <div className="space-x-4">
                <button 
                onClick={submitModifier}
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
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
          </div>
        </div>
        <div className="h-16 max-sm:h-0" ></div>

        <div className="toast toast-top toast-center z-99 ">{message && ( <div className={`alert alert-success bg-green-600`} ><span className="text-white">{message}</span></div>)}</div>
        <div className="toast toast-top toast-center z-99 ">{erreur && ( <div className={`alert alert-error bg-red-600`} ><span className="text-white">{erreur}</span></div>)}</div>
      </Navigation>
    </>
  );
};

export default Info;
