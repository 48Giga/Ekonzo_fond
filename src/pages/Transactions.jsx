import { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addRetrait, getSingleClient } from "../service";
import Utilisateur from "../components/Utilisateur";
import RecuRetraitModal from "../components/RecuRetraitModal";
import {
  ArrowBigLeft,
  LucideArrowDownUp,
  Upload,
  UploadIcon,
  X,
} from "lucide-react";
import { formatCurrent } from "../utils/helpers";
import confetti from 'canvas-confetti';


const Transactions = () => {
  
  const {id} = useParams()
  const navigate = useNavigate();
  const [clientRes, setClientRes] = useState(null)
  const [apercu, setApercu] = useState(null);
  const [message, setMessage] = useState("");
  const [erreur, setErreur] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showRecuModal, setShowRecuModal] = useState(false)

  
  const client = clientRes || null

   //Proprieter de retrait

  const [retraitValues, setRetraitValues] = useState({
    clientId: id,
    commission: Number(client?.Mise_client),
    montant: 0,
    date: new Date().toISOString().split('T')[0]
  });

  //Proprieter de dette

  const [detteValues, setDetteValues] = useState({
    clientId: id,
    commission: 0,
    montant: 0,
    date: "",
  });


  useEffect(() => {
    if (id) {
      getSingleClient(id).then((res) => {
        const data = Array.isArray(res) ? res[0] : res
        setClientRes(data)
      })
      
    }
  }, [id])

  useEffect(() => {
    if (client?.id_client) {
      setRetraitValues(prev => ({...prev, clientId: client?.id_client, commission: Number(client.Mise_client)}))
      setDetteValues(prev => ({...prev, clientId: client?.id_client}))
    }
  }, [client?.id_client, client?.Mise_client])


  if (!client) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  }

  const nbr_case = client && client.Mise_client ? parseFloat(client.Solde_client || 0) / parseFloat(client.Mise_client) : 0;
  const prenom = client?.Prenom_client?.toLowerCase() || '';
  

const code = (() => {
    const value = client?.Code_client || ''
    const longueurCode = value.length
    const lastLetter = value.at(-1) || ''
    const firstLetter = value.substring(0, 2)
    const midwere = value.substring(0, Math.max(0, longueurCode - 1))
    const midwerLetter = midwere.substring(2)
    return `${firstLetter} - ${midwerLetter} - ${lastLetter}`
  })()

  //  Checking solde retrait
  const insufisantFond = () => {
    if ((parseInt(client?.Solde_client) || 0) <= (parseInt(client?.Mise_client) || 0)) {
      setErreur(
        "Impossible d'effectuer cette opération, le client manque de fond désolé !!!"
      );
    } else {
      document.getElementById("modal_frm_retrait").showModal();
    }
  };

  //  Checking solde dette
  const checkingSolde = () => {
    if (
      (parseInt(client?.Solde_client) || 0) <= ((parseInt(client?.Mise_client) || 0) * 2)
    ) {
      setErreur(
        "Impossible d'effectuer cette opération\nle client manque de fond désolé !!!"
      );
    } else {
      document.getElementById("modal_frm_dette").showModal();
    }
  };

  // Operation de retrait numérique et calcule
  const numeriCalcul = (val) => {
    if (isNaN(val.target.value) || val.target.value <= 0) {
      val.target.value = 1;
    }

    let total =
      (Number(client?.Solde_client) || 0) - (Number(client?.Mise_client) || 0);
    if (val.target.value > total) {
      setErreur(`
                Solde insuffisant, veuillez reduirer le montant. \nLe client doit retiré que :
                ${formatCurrent(total)} 
                `);
      document.getElementById("frm-retrait").reset();
      document.getElementById("modal_frm_retrait").close();
    }
  };

  // Operation de dette numérique et calcule
  const numeriCalcule = (val) => {
    if (isNaN(val.target.value) || val.target.value <= 0) {
      val.target.value = 1;
    }

    let total = (Number(client?.Solde_client) || 0) - ((Number(client?.Mise_client) || 0) * 2);
    if (val.target.value > total) {
      setErreur(
        `Solde du client est insuffisant, veuillez reduirer le montant.\nLe client doit prêté que :
          ${formatCurrent(total)} `
      );

      document.getElementById("frm-dette").reset();
      document.getElementById("modal_frm_dette").close();
    }
  };

  const handleAnnuler = () => {
    setApercu(null);
    setMessage("Rétrait annuler !!!");
    document.getElementById("modal-apercu").close();
  };

  //submit retraite
  const submitRetrait = async() => {
    setIsLoading(true);
    setErreur("");
    try {
     const response = await addRetrait(retraitValues);
     if (response?.success) {
      setMessage(response?.message || 'Retrait effecué')
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, zIndex: 9999 })
      setTimeout( async () => {
        await setShowRecuModal(true)
      }, 3000)
     }
    } catch (error) {
      setErreur(`Erreur lors d'opération retrait : ${error}`)
    }
  };

  const handleApercu = (e) => {
    e.preventDefault();
    setApercu(retraitValues);
    setMessage("");

    document.getElementById("modal_frm_retrait").close();
    document.getElementById("frm-retrait").reset();
    document.getElementById("modal-apercu").showModal();
  };

  const handleCloseRecuModal = () => {
    setShowRecuModal(false)
    navigate('/')
  };;

  //submit dette
  const submitDette = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    try {
      const response = await addRetrait(detteValues);
      if (response?.success) {
        setMessage(response?.message || 'Retrait prêt effecué')
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, zIndex: 9999 })
        setShowRecuModal(true)
      }
    } catch (error) {
      setErreur(`Erreur d'opération : ${error}`);
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <Navigation
      titre={
        <Link to={"/"} className="flex gap-6 text-white items-center px-2">
          <span className="">
            <ArrowBigLeft />
          </span>
          <span className="flex items-center gap-2 text-2xl font-bold max-sm:text-xl">
            {code.toUpperCase()}
          </span>
        </Link>
      }
      winget={<Utilisateur />}
    >
      <div className="max-w-100 mx-auto p-4 bg-base-100 shadow-lg rounded-lg">
        
          <h1 className="font-bold text-lg text-primary/60 uppercase max-sm:text-lg max-sm:py-2">
            Retrait | Dette
          </h1>
          <div className="text-center font-bold text-shadow-lg py-2 px-4 bg-primary">
            <span className="font-bold uppercase text-primary-content ">
                  {`${client?.Nom_client} ${client?.Post_Nom_client} `}
                </span>
                <span className="font-bold text-primary-content capitalize">
                  {prenom}
                </span>
          </div>
          <div key={id} className="px-1  max-sm:w-full">
            
            <h4 className="text-start text-primary text-[14px] py-2 opacity-85 font-semibold">
              Finance du client
            </h4>

            <div className="grid justify-center">
              <h4 className="font-bold font-[consolas] text-primary stat-value">
                {formatCurrent(client?.Solde_client)}
              </h4>
              <div className="flex items-center gap-2">
                <h4 className="opacity-60">Mise :</h4>
                <h4 className="font-bold font-[consolas] text-primary capitalize text-xs">
                  {formatCurrent(client?.Mise_client)}
                </h4>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <h4 className="opacity-60">Nombre de case :</h4>
              <h4 className="font-bold text-primary capitalize text-xs">
                {nbr_case.toFixed(0)}
              </h4>
            </div>
            
            <hr />
          </div>
          {/*Deux formulaires */}

          <div className="flex justify-center gap-6 mt-4 print:hidden">
            <button
              className=" place-items-center btn  btn-primary text-primary-content hover:btn-error"
              onClick={() => insufisantFond()}
            >
              <Upload />
              Rétrait
            </button>
            <button
              className="btn btn-primary btn-outline text-primary btn-ghost place-items-center hover:text-white hover:btn-error"
              onClick={() => checkingSolde()}
            >
              <UploadIcon />
              Dette
            </button>
          </div>
        
      </div>

      {/* Formulaire retrait */}

      <dialog id="modal_frm_retrait" className="modal">
        <div className="modal-box lg:w-100">
          <div className="">
            <form method="dialog">
            <button
              onClick={() => document.getElementById("frm-retrait").reset()}
              className="btn btn-ghost btn-circle top-0 absolute right-2 hover:text-white hover:btn-error"
            >
              <X />
            </button>
          </form>
          </div>
          <form action="" onSubmit={handleApercu} id="frm-retrait">
            <div className="bg-primary text-neutral-content py-2 w-full rounded-lg mb-2 -top-4">
              <h4 className="text-center font-bold uppercase">
                Formulaire retrait
              </h4>
            </div>

            <div className="grid gap-4 items-center py-4">

              <label className="floating-label">
                <span>Date</span>

                <input
                type="hidden"
                value={retraitValues?.clientId}
                onChange={(e) =>
                  setRetraitValues({
                    ...retraitValues,
                    clientId: e.target.value,
                  })
                }
              />
              
                <input
                  type="date"
                  onChange={(e) =>
                    setRetraitValues({
                      ...retraitValues,
                      date: e.target.value,
                    })
                  }
                  className="input lg:input-lg lg:w-55"
                  value={retraitValues.date}
                  required
                />
              </label>
            <div className="grid max-sm:gap-4 lg:join">
              <input
                type="number"
                onChange={(e) =>
                  setRetraitValues({
                    ...retraitValues,
                    montant: e.target.valueAsNumber,
                  })
                }
                onKeyUp={numeriCalcul}
                className="input text-center lg:input-lg lg:rounded-l-lg"
                placeholder="Montant"
                required
              />

            <button
              type="submit"
              className="btn item-join lg:rounded-r-lg lg:btn-lg  max-sm:btn-block btn-primary hover:btn-primary mb-4 hover:text-neutral-content"
            >
              Soumettrer
            </button>
              </div>
            </div>

          </form>

          
        </div>
      </dialog>
      {/* Formulaire dette */}

      <dialog id="modal_frm_dette" className="modal">
        <div className="modal-box w-2xs">
          <form action="" onSubmit={submitDette} id="frm-dette">
            <div className="bg-primary text-neutral-content py-2 w-full rounded-lg mb-2 -top-4">
              <h4 className="text-center font-bold uppercase">
                Formulaire dette
              </h4>
            </div>

            <div className="flex items-center gap-2">
              <label className="floating-label">
                <span>Date</span>
                <input
                  type="date"
                  onChange={(e) =>
                    setDetteValues({ ...detteValues, date: e.target.value })
                  }
                  className="input"
                  placeholder="Date"
                  required
                />
              </label>

              <input
                type="number"
                onChange={(e) =>
                  setDetteValues({
                    ...detteValues,
                    montant: e.target.valueAsNumber,
                  })
                }
                onKeyUp={numeriCalcule}
                className="input  my-2"
                placeholder="Montant"
                required
              />
              <input
                type="hidden"
                value={detteValues?.clientId}
                onChange={(e) =>
                  setDetteValues({ ...detteValues, clientId: e.target.value })
                }
              />
            </div>

            <button
              type="submit"
              className="btn btn-block btn-outline btn-primary   hover:btn-primary hover:text-neutral-content"
            >
              {isLoading ? (
                <span className="loading loading-spinner loading-md"></span>
              ) : 
                "Confirmer"
              }
            </button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={() => document.getElementById("frm-dette").reset()}>
            Close
          </button>
        </form>
      </dialog>

      <dialog className="modal" id="modal-apercu">
        <div className="modal-box lg:w-150">
          <div className="">
            <h4 className="font-bold text-primary ">
              Vérification des informations
            </h4>
            <form method="dialog">
              <button className="btn btn-ghost btn-circle top-0 absolute right-2 hover:text-white hover:btn-error">
                X
              </button>
            </form>
          </div>

          {apercu && (
            <div className="pt-4">
              <div className="stat-title space-x-4">
                <span>Date du rétrait :</span>
                <span> {new Date(apercu.date).toLocaleDateString()} </span>
              </div>
              <hr className="opacity-20" />
              <div className="stat-title">
                <span>Montant rétiré : </span>
              </div>
              <div className="stat-value text-center text-primary opacity-60">
                {formatCurrent(apercu.montant)}
              </div>
              <div className="stat-actions space-x-4">
                <span className="opacity-40">Commission :</span>
                <span className="font-semibold text-primary opacity-40">
                  {formatCurrent(apercu.commission)}
                </span>
              </div>
              <div className="stat-title space-x-4">
                <span>ID du client :</span>
                <span> {apercu.clientId} </span>
              </div>
              <hr className="opacity-20 pt-4" />
              <div className="space-x-6">
                <button
                  onClick={submitRetrait}
                  disabled={isLoading}
                  className="btn btn-primary"
                >
                  {isLoading ? (
                    <span className="loading loading-spinner loading-md"></span>
                  ) : "Confirmer"}
                </button>
                <button
                  onClick={handleAnnuler}
                  disabled={isLoading}
                  className="btn btn-outline btn-primary"
                >
                  Annuler
                </button>
              </div>
            </div>
          )}
        </div>
       

      </dialog>

      <RecuRetraitModal 
        isOpen={showRecuModal} 
        onClose={handleCloseRecuModal}
      />

       <div className="toast toast-top toast-center z-99"> {message && ( <div className={`alert alert-success bg-green-500"`}><span className="text-white">{message}</span></div>)} </div>
        <div className="toast toast-top toast-center z-99"> {erreur && ( <div className={`alert alert-error bg-red-500"`}><span className="text-white">{erreur}</span></div>)} </div>

    </Navigation>
  );
};

export default Transactions;
