import Navigation from "../components/Navigation";
import { Card } from "../components/Hero";
import { Link, useLoaderData } from "react-router-dom";
import { useState, useEffect} from "react";
import { createClient, getClient, getNbrCarte } from "../service";
import { ArrowBigDown, ArrowBigLeft, ArrowDown, ChevronLeft, ChevronRight, Download, Upload, UserPlus2, Users, Users2 } from "lucide-react";
import Utilisateur from "../components/Utilisateur";
import { formatCurrent } from "../utils/helpers";
import confetti from 'canvas-confetti'


const Client = () => {
  
  const [clients, setClients] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [nmbrItems, setNmbrItems] = useState(10);
  const [search, setSearche] = useState(""); 
  const [apercu, setApercu] = useState(null)
  const [message, setMessage] = useState('')
  const [erreur, setErreur] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const adresses = useLoaderData();
  const maxId = Number(adresses[0].adresse);

  const [values, setValues] = useState({
    prenom: "",
    nom: "",
    postnom: "",
    adresse: "",
    mise: 0,
    code: maxId + 1,
  });

  const handlerSearche = (e) => {
    const value = e.target.value;
    value.length > 2 && setSearche(value);
  };

  const handlePageChange = page => {
    if (page < 1 || page > clients.length || page === currentPage) {
      return
    }
    setCurrentPage(page)
  }

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
    
     setTimeout( async () => await location.reload(), 5000);
    
  };

  const handleAnnuler = () => {
    setApercu(null)
    document.getElementById('frm_client').reset()
    document.getElementById('modal_apercu').close()
    setErreur('Apercu annuler, désolé !!!')
  }

  const [nbrCarte, setNbrCarte] = useState([]);

  useEffect(() => {
    getNbrCarte().then(setNbrCarte);
    getClient().then(setClients);
  }, []);

//Pagination
  const startItems = ( currentPage - 1) * nmbrItems;
  // const endItems = startItems + nmbrItems;

  return (
    <Navigation
      titre={
        <Link to={"/"} className="flex lg:gap-6 text-neutral-content sm:space-x-2 items-center px-2">
          <ArrowBigLeft />

          <span className="flex items-center max-sm:hidden gap-2 lg:text-2xl font-bold">
            Tableau de bord du géstionnaire
          </span>
          <span className="flex items-center xl:hidden gap-2 text-2xl font-bold">
            Géstionnaire
          </span>

        </Link>
      }
      menu={
        <div className="flex text-neutral-content font-bold gap-6">
          <span className="flex flex-col items-center"> <Users/> Client</span>
          <span className="flex flex-col items-center"> <Download/> Depot </span>
          <span className="flex flex-col items-center"> <Upload/> Retrait</span>
        </div>
      }

      winget={
        <div className="flex space-x-4 lg:gap-8 items-center">
          <span className="text-white">
            <label className="swap">
              <div className="indicator">
                <span className="badge badge-sm indicator-item text-success font-semibold">
                  {nbrCarte}
                </span>
                <Users />
              </div>
            </label>
          </span>
          <Utilisateur />
        </div>
      }
    >
      
      <div className="w-full m-4 print:w-full print:m-0">
        <Card>
          <div>
            <h4 className="text-xl font-medium py-2 px-4">
              Liste de client actif
            </h4>
            <button
              className="fixed right-[30%] bottom-40 btn-circle btn-primary z-10 shadow-2xl btn-lg hover:bg-primary hover:text-neutral-content max-sm:right-6 btn max-sm:z-40 print:hidden"
              onClick={() =>
                document.getElementById("modal_frm_create").showModal()
              }
            >
              <UserPlus2 />
            </button>
          </div>
          <div className="px-6 pb-4">
            <ul className="list bg-base-100 xl:min-w-lvh rounded-box shadow-md">
             
              <div className="max-w-full mb-4 flex justify-between py-2 max-sm:grid print:hidden">
                <div className="px-4">
                  <label htmlFor="">Nombre de lignes :</label>
                  <select
                    className="select select-auto w-20"
                    onChange={(e) => setNmbrItems(e.target.value)}
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value={clients.length}>Tous</option>
                  </select>
                </div>
                <div className="">
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="Recherche ..."
                    onChange={handlerSearche}
                  />
                </div>
              </div>

              { clients.length === 0 ? (
                <span className="loading loading-spinner loading-md"></span>
              ) : clients
                .filter((d) => {
                  const fullname =
                    d.Code_client +
                    " " +
                    d.Nom_client +
                    " " +
                    d.Post_Nom_client +
                    " " +
                    d.Prenom_client;
                  return fullname.toLowerCase().includes(search.toLowerCase());
                })
                .splice(startItems, nmbrItems)
                .map((d) => {
                  const avatar =
                    d.Nom_client.charAt(0) + d.Post_Nom_client.charAt(0);
                  return (
                    <li
                      key={d.id_client}
                      className="grid grid-cols-2 px-4 py-1 border-b-1 w-full border-gray-200 even:bg-base-200 max-sm:px-1 max-sm:flex max-sm:justify-between"
                    >
                      <div className="flex gap-4">
                        <div>
                          <div className="avatar avatar-placeholder">
                            <div className="w-10 bg-primary text-neutral-content rounded-full">
                              <span className="font-bold uppercase">
                                {avatar}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <Link to={`/info_client/${d.id_client}`}>
                            <div className="text-primary uppercase font-semibold">
                              {d.Code_client}
                            </div>

                            <div className="">
                              <span className="text-xs text-secondary uppercase trucante font-semibold opacity-60">
                                {`${d.Nom_client} ${d.Post_Nom_client} `}
                              </span>
                              <span className="text-xs text-secondary font-semibold opacity-60 max-sm:hidden">
                                {d.Prenom_client}
                              </span>
                            </div>
                          </Link>
                        </div>
                      </div>

                      <div className="flex gap-20 max-sm:justify-between max-sm:px-4 max-sm:gap-8">
                        <div className="text-center">
                          <div className="text-primary font-semibold">Mise</div>
                          <div className="text-xs text-secondary font-[consolas] uppercase font-semibold opacity-60">
                            {formatCurrent(d.Mise_client)}
                          </div>
                        </div>

                        <div className="text-center">
                          <div className="text-primary font-semibold">
                            Solde
                          </div>
                          <div className="text-xs text-secondary uppercase font-[consolas] font-semibold opacity-60 max-sm:-z-10">
                            {formatCurrent(d.Solde_client)}
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
            </ul>
            <div className="mx-auto max-w-2xs bg-zinc-100 mt-4">
            <div className="flex items-center justify-between ">
            <button className={`join-item btn ${currentPage === 1 ? 'disabled:btn' : ''}`}
                onClick={() => handlePageChange(currentPage - 1)}
                >
                  <ChevronLeft className="text-primary"/>
                </button>
             <div className="text-primary font-bold">
                <span>{`${startItems + 1} à ${
                  currentPage * nmbrItems
                } sur ${clients.length}`}</span>
              </div>
            <button className={`join-item btn ${currentPage === clients.length ? 'disabled:btn':''}`}
                onClick={() => handlePageChange(currentPage + 1)}
                aria-label="Bouton suivent"
                >
                  <ChevronRight className="text-primary"/>
                </button>
            </div>
          </div>
            
          </div>
        </Card>
      </div>

      <dialog id="modal_frm_create" className="modal">
        <div className="modal-box w-[400px]  max-sm:w-full">
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
                <option className="text-neutral-content" value="">
                  Choisir adresse
                </option>
                {adresses.length === 0 ? (
                  <span className="loading loading-spinner loading-md"></span>
                ): adresses.map((adresse, i) => {
                  return (
                    <option key={i} value={adresse.adresse}>
                      {adresse["adresse"]}
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
        <div className="modal-box w-[360px]">
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
                    {formatCurrent(apercu.mise)}
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
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      {erreur ? <div className="toast toast-middle toast-center"><div className="alert font-bold alert-error">{erreur}</div></div> : null}
      {message ? <div className="toast toast-bottom toast-center"><div className="alert font-bold alert-success">{message}</div></div> : null}

    </Navigation>
  );
};

export default Client;
