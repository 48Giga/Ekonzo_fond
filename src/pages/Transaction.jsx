import {useState} from "react";
import Navigation from "../components/Navigation";
import {Link, useLoaderData, useNavigate} from "react-router-dom";
import {addDepot} from "../service";
import Utilisateur from "../components/Utilisateur";
import { ArrowBigLeft, DownloadIcon, LucideArrowDownUp } from "lucide-react";

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
    

    // Numerique
    const numerique = (val) => {
        if (isNaN(val.target.value) || val.target.value <= 0) {
            val.target.value = 1;
        }
    };

    //Proprieter de dépot
    const [depotValues, setDepotValues] = useState({
        idClient: client[0].id_client,
        date: "",
        montant: 0,
    });
    const [apercu, setApercu] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

     
    const handleApercu = e => {
         e.preventDefault();

         setApercu(depotValues)
         document.getElementById('modal_apercu_depot').showModal()         
    }

    const submitDepot = () => {
       setIsLoading(true)

        if(client[0].Solde_client < client[0].Mise_client * 31) {
        addDepot(depotValues);        
        setTimeout(async () => await navigate("/recu_depot"), 2000)
         }else {
            alert("Le client(e) atteint son plafond de dépot.\n qu'il (elle) commence un autre carte.")
         }
    };

    const handleAnnuler = () => {
        setApercu(null)
        document.getElementById('frm_depot').reset()
        document.getElementById('modal_apercu_depot').close()
    }
    

    return (
      <Navigation
        titre={
          <Link to={"/"} className="flex gap-6 text-white items-center px-2">
            <span className="">
              <ArrowBigLeft />
            </span>
            <span className="flex items-center gap-2 text-2xl font-bold max-sm:text-xl">
              <LucideArrowDownUp />
              Transaction
            </span>
          </Link>
        }
        winget={<Utilisateur />}
      >
        <div className="w-full place-items-center py-8 max-sm:pb-0">
          <div className="max-w-[400px] mx-auto p-4 bg-base-100 shadow-lg rounded-lg">
            <h1 className="font-bold text-xl text-center text-primary/60  uppercase max-sm:text-lg max-sm:py-2">
              Dépôt
            </h1>
            <h2 className="text-center font-bold text-shadow-2xs text-white bg-primary">
              {code.toUpperCase()}
            </h2>
            <div key={client[0].id_client} className="px-1  max-sm:w-full">
              <h4 className="text-start text-primary text-[14px] opacity-85 font-semibold">
                Client
              </h4>

              <div>
                <span className="font-bold uppercase text-primary">
                  {`${client[0]?.Nom_client} ${client[0]?.Post_Nom_client} `}
                </span>
                <span className="font-bold text-primary text-lg capitalize">
                  {prenom}
                </span>
              </div>

              {/* <div className="py-2 max-sm:py-1"></div> */}
              <hr className="opacity-20" />
              <h4 className="text-start text-primary text-[14px]  opacity-85 font-semibold">
                Finance du client
              </h4>

              <div className="flex justify-between">
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
              </div>
              <div className="flex items-center gap-2">
                <h4 className="opacity-60">Nombre de case :</h4>
                <h4 className="font-bold text-primary capitalize text-xs">
                  {nbr_case.toFixed(0)}
                </h4>
              </div>
              <hr className="opacity-20" />
            </div>
            {/* Formulaire */}
            <form action="" onSubmit={handleApercu} id="frm_depot">
              <div className="px-12 py-4">
                <input
                  type="date"
                  onChange={(e) =>
                    setDepotValues({ ...depotValues, date: e.target.value })
                  }
                  className="input input-ghost w-[140px]"
                  placeholder="Date"
                  required
                />
                <input
                  type="number"
                  onChange={(e) =>
                    setDepotValues({
                      ...depotValues,
                      montant: e.target.valueAsNumber,
                    })
                  }
                  onKeyUp={numerique}
                  className="input py-2 input-lg w-full text-center input-primary my-2"
                  placeholder="Montant"
                  required
                />
                <input
                  type="hidden"
                  onChange={(e) =>
                    setDepotValues({
                      ...depotValues,
                      idClient: e.target.valueAsNumber,
                    })
                  }
                />
              </div>
              <div className="px-12">
                <button
                  type="submit"
                  className="btn btn-primary btn-block hover:bg-primary hover:text-neutral-content"
                >
                  Soumettre
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Formulaire dépot */}

        <dialog id="modal_apercu_depot" className="modal">
          <div className="modal-box w-[340px]">
            <h4 className=" font-bold text-start text-primary">
              Vérification des informations
            </h4>
            {apercu && (
              <div className="">
                <div className="py-4">
                  <div className="space-x-4 stat-title">
                    <span>Date du dépôt :</span>
                    <span>{new Date(apercu.date).toLocaleDateString()}</span>
                  </div>
                  <hr className="opacity-20" />
                  <div className="text-primary text-center opacity-60 py-2 stat-value">
                    {nmbr_format.format(apercu.montant)}
                  </div>
                  <div className="space-x-4 stat-title ">
                    <span>ID du client :</span>
                    <span>{apercu.idClient}</span>
                  </div>
                <hr className="opacity-20" />
                </div>
                <div className="flex items-center justify-center gap-6 ">
                  <button 
                  onClick={submitDepot}
                  disabled={isLoading}
                   className="btn btn-primary">
                     {isLoading ? (<span className="loading loading-spinner loading-md"></span>) :
                      'Confirmer'} 
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
            <button>Close</button>
          </form>
        </dialog>

        <div className="h-10 max-md:h-0"></div>
      </Navigation>
    );
};

export default Transaction; 
