import { useState } from "react";
import Navigation from "../components/Navigation";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { addRetrait } from "../service";
import Utilisateur from "../components/Utilisateur";
import {
  ArrowBigLeft,
  LucideArrowDownUp,
  Upload,
  UploadIcon,
} from "lucide-react";

const nmbr_format = new Intl.NumberFormat("fr-CD", {
  style: "currency",
  currency: "CDF",
  minimumFractionDigits: 2,
});

const Transaction = () => {
  const client = useLoaderData();
  const navigate = useNavigate();

  const nbr_case =
    parseFloat(client[0].Solde_client) / parseFloat(client[0].Mise_client);
  const prenom = client[0].Prenom_client.toLowerCase();

  let longueurCode = client[0].Code_client.length;
  const lastLetter = client[0].Code_client.at(-1); // output last lette
  const firstLetter = client[0].Code_client.substring(0, 2); // output two first letter
  const midwere = client[0].Code_client.substring(0, longueurCode - 1); // soustrer last letter
  const midwerLetter = midwere.substring(2); //output midwere letter

  const code = firstLetter + " - " + midwerLetter + " - " + lastLetter;

  // const [checked, setChecked] = useState(true);

  //  Checking solde retrait
  const insufisantFond = () => {
    if (parseInt(client[0].Solde_client) <= parseInt(client[0].Mise_client)) {
      setMessage(
        "Impossible d'effectuer cette opération <br/> le client manque de fond désolé !!!"
      );
    } else {
      document.getElementById("modal_frm_retrait").showModal();
    }
  };

  //  Checking solde dette
  const checkingSolde = () => {
    if (
      parseInt(client[0].Solde_client) <= parseInt(client[0].Mise_client * 2)
    ) {
      setMessage(
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
      parseInt(client[0].Solde_client) - parseInt(client[0].Mise_client);
    if (val.target.value > total) {
      setMessage(`
                Solde insuffisant, veuillez reduirer le montant. \nLe client doit retiré que :
                ${nmbr_format.format(total)} 
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

    let total =
      parseInt(client[0].Solde_client) - parseInt(client[0].Mise_client * 2);
    if (val.target.value > total) {
      setMessage(
        `Solde du client est insuffisant, veuillez reduirer le montant.\nLe client doit prêté que :
                ${nmbr_format.format(total)} `
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

  //Proprieter de retrait

  const [retraitValues, setRetraitValues] = useState({
    clientId: client[0].id_client,
    commission: client[0].Mise_client,
    montant: 0,
    date: "",
  });

  //Proprieter de dette

  const [detteValues, setDetteValues] = useState({
    clientId: client[0].id_client,
    commission: 0,
    montant: 0,
    date: "",
  });

  const [apercu, setApercu] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // const toggleCheck = () => {
  //     setChecked(!checked);
  //     setRetraitValues({
  //         ...retraitValues,
  //         commission: 0,
  //     });
  // };

  //submit retraite
  const submitRetrait = () => {
    setIsLoading(true);
    addRetrait(retraitValues);
    setMessage("");
    setTimeout(async () => await navigate("/recu_retrait"), 2000);
  };

  const handleApercu = (e) => {
    e.preventDefault();
    setApercu(retraitValues);
    setMessage("");

    document.getElementById("modal_frm_retrait").close();
    document.getElementById("frm-retrait").reset();
    document.getElementById("modal-apercu").showModal();
  };

  //submit dette
  const submitDette = (event) => {
    event.preventDefault();

    setIsLoading(true);
    try {
      addRetrait(detteValues);
      setTimeout(async () => await navigate("/recu_retrait"), 2000);
    } catch (error) {
      setMessage("Erreur d'opération", error);
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
            <LucideArrowDownUp />
            Transactions
          </span>
        </Link>
      }
      winget={<Utilisateur />}
    >
      <div className="w-full place-items-center py-8 max-sm:pb-0">
        <div className="w-[400px] mx-auto p-4 bg-base-100 shadow-lg rounded-lg">
          <h1 className="font-bold text-lg text-primary/60 uppercase max-sm:text-lg max-sm:py-2">
            Retrait | Dette
          </h1>
          <h2 className="text-center font-bold text-shadow-2xs text-white bg-primary">
            {code.toUpperCase()}
          </h2>
          <div key={client[0].id_client} className="px-1  max-sm:w-full">
            <h4 className="text-start text-primary text-[14px]  opacity-85 font-semibold">
              Client
            </h4>

            <div className="flex gap-2 items-center">
              <div>
                <span className="font-bold uppercase text-primary ">
                  {`${client[0]?.Nom_client} ${client[0]?.Post_Nom_client} `}
                </span>
                <span className="font-bold text-primary capitalize">
                  {prenom}
                </span>
              </div>
            </div>

            {/* <div className="py-2 max-sm:py-1"></div> */}
            <hr className="opacity-20" />
            <h4 className="text-start text-primary text-[14px] py-2 opacity-85 font-semibold">
              Finance du client
            </h4>

            <div className="flex items-center gap-2">
              <h4 className="opacity-60">Nombre de case :</h4>
              <h4 className="font-bold text-primary capitalize text-xs">
                {nbr_case.toFixed(0)}
              </h4>
            </div>
            <div className="flex items-center gap-2">
              <h4 className="opacity-60">Mise :</h4>
              <h4 className="font-bold font-[consolas] text-primary capitalize text-xs">
                {nmbr_format.format(client[0]?.Mise_client)}
              </h4>
            </div>

            <div className="flex items-center gap-2">
              <h4 className="opacity-60">Solde :</h4>
              <h4 className="font-bold font-[consolas] text-primary capitalize text-xs">
                {nmbr_format.format(client[0]?.Solde_client)}
              </h4>
            </div>
            <hr />
          </div>
          {/*Deux formulaires */}

          <div className="flex justify-center gap-6 mt-4 print:hidden">
            <button
              className=" place-items-center btn  btn-primary text-white hover:btn-error"
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
      </div>

      {/* Formulaire retrait */}

      <dialog id="modal_frm_retrait" className="modal">
        <div className="modal-box w-[320px]">
          <form action="" onSubmit={handleApercu} id="frm-retrait">
            <div className="bg-primary text-neutral-content py-2 w-full rounded-lg mb-2 -top-4">
              <h4 className="text-center font-bold uppercase">
                Formulaire retrait
              </h4>
            </div>

            <div className="flex items-center gap-2">
              <label className="floating-label">
                <span>Date</span>
                <input
                  type="date"
                  onChange={(e) =>
                    setRetraitValues({
                      ...retraitValues,
                      date: e.target.value,
                    })
                  }
                  className="input"
                  placeholder="Date"
                  required
                />
              </label>

              <input
                type="number"
                onChange={(e) =>
                  setRetraitValues({
                    ...retraitValues,
                    montant: e.target.valueAsNumber,
                  })
                }
                onKeyUp={numeriCalcul}
                className="input  my-2"
                placeholder="Montant"
                required
              />
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
            </div>

            <button
              type="submit"
              className="btn btn-block btn-primary hover:btn-primary mb-4 hover:text-neutral-content"
            >
              Soumettrer
            </button>
          </form>

          <form method="dialog" className="modal-backdrop">
            <button
              onClick={() => document.getElementById("frm-retrait").reset()}
              className="btn btn-outline btn-primary"
            >
              Fermer
            </button>
          </form>
        </div>
      </dialog>
      {/* Formulaire dette */}

      {/* toast */}
      <div className="toast toast-top toast-center z-10 ">
        {message && (
          <div
            className={`alert ${
              message.includes("ok") ? "alert-success" : "alert-error"
            } `}
          >
            <span className="text-white">{message}</span>
          </div>
        )}
      </div>

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
        <div className="modal-box w-[340px]">
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
                {nmbr_format.format(apercu.montant)}
              </div>
              <div className="stat-actions space-x-4">
                <span className="opacity-40">Commission :</span>
                <span className="font-semibold text-primary opacity-40">
                  {nmbr_format.format(apercu.commission)}
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
      <div className="h-10 max-md:h-0"></div>
    </Navigation>
  );
};

export default Transaction;
