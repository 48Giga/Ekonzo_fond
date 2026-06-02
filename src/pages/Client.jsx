
import { Card } from "../components/Hero";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getClient, getNbrCarte } from "../service";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { formatCurrent } from "../utils/helpers";
import ClientForm from "../components/ClientForm";


const Client = () => {

  const [clients, setClients] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [nmbrItems, setNmbrItems] = useState(10);
  const [search, setSearche] = useState("");


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

  const [nbrCarte, setNbrCarte] = useState([]);

  useEffect(() => {
    getNbrCarte().then(setNbrCarte);
    getClient().then(setClients);
  }, []);

  //Pagination
  const startItems = (currentPage - 1) * nmbrItems;
  // const endItems = startItems + nmbrItems;

  return (
    <div>
      <div className="max-w-2xl mx-auto m-4 print:w-full print:m-0">
        <Card>
          <div>
            <h4 className="text-xl font-medium py-2 px-4">
              Liste de client actif
            </h4>

          </div>
          <div className="px-6 pb-4">

            <ul className="list bg-base-100 rounded-box shadow-md">

              <div className=" mb-4 flex justify-between py-2 max-sm:grid print:hidden">
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

              {clients.length === 0 ? (
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
                              <span className="font-bold text-primary-content uppercase">
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
                  <ChevronLeft className="text-primary" />
                </button>
                <div className="text-primary font-bold">
                  <span>{`${startItems + 1} à ${currentPage * nmbrItems
                    } sur ${clients.length}`}</span>
                </div>
                <button className={`join-item btn ${currentPage === clients.length ? 'disabled:btn' : ''}`}
                  onClick={() => handlePageChange(currentPage + 1)}
                  aria-label="Bouton suivent"
                >
                  <ChevronRight className="text-primary" />
                </button>
              </div>
            </div>

          </div>
        </Card>
      </div>

      <ClientForm/>

    </div>
  );
};

export default Client;
