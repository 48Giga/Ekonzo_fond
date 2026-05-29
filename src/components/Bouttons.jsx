import { useEffect, useState } from "react";
import Liste from "./Liste";
import { Link } from "react-router-dom";
import { Download, Upload } from "lucide-react";
import { getClient } from "../service";

function Bouttons() {

  const [clients, setClients] = useState([])
  const [search, setSearche] = useState("");

  useEffect(() => {
    getClient().then(setClients);
  }, [])

  const handlerSearche = (e) => {
    const value = e.target.value;
    value.length > 2 && setSearche(value);
  };

  return (
    <>
      <section className="fixed z-30 w-full p-2  bottom-16  print:hidden">
        <div className="flex justify-center gap-6">
          <Liste
            titre={
              <span className="btn btn-primary hover:btn-success text-neutral-content">
                <Download />
                Dépot
              </span>
            }
          >
            <input
              type="search"
              onChange={handlerSearche}
              className="input w-full mb-2 bg-green-50 text-lg"
              placeholder="Saisir le code du client"
              autoComplete="off"
            />
            <ul className="list bg-base-100 px-4 rounded-box shadow-md">
              {clients
                .filter((s) => {
                  return s.Code_client.toLowerCase().includes(
                    search.toLowerCase()
                  );
                })
                .map((s) => {
                  const avatar =
                    s.Nom_client.charAt(0) + s.Post_Nom_client.charAt(0);

                  return (
                    <div className="" key={s?.id_client}>
                      {search.toLowerCase() === s.Code_client.toLowerCase() && (
                        <li className="mb-2 even:bg-base-200">
                          <div className="flex gap-4">
                            <div>
                              <div className="avatar avatar-placeholder">
                                <div className="w-10 bg-primary text-neutral-content rounded-full">
                                  <span className=" uppercase font-bold">
                                    {avatar}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div>
                              <Link to={`/transaction/${s.id_client}`}>
                                <div className="text-primary uppercase font-semibold">
                                  {s.Code_client}
                                </div>

                                <div className="">
                                  <span className="text-xs text-primary uppercase trucante font-semibold opacity-60">
                                    {`${s.Nom_client} ${s.Post_Nom_client} `}
                                  </span>
                                  <span className="text-xs text-primary font-semibold opacity-60 max-sm:hidden">
                                    {s.Prenom_client}
                                  </span>
                                </div>
                              </Link>
                            </div>
                          </div>
                        </li>
                      )}
                    </div>
                  );
                })}
            </ul>
          </Liste>

          <button
            className="btn btn-outline btn-primary hover:btn-error hover:text-white"
            onClick={() => document.getElementById("liste_retrait").showModal()}
          >
            <Upload />
            Retrait
          </button>
        </div>
      </section>


      <dialog id="liste_retrait" className="modal">
        <div className="modal-box w-[400px] bg-red-50 max-h-8/12">
          <input
            type="search"
            onChange={handlerSearche}
            className="input w-full mb-2 text-lg bg-transparent"
            placeholder="Saisir le code du client"
            autoComplete="off"
          />
          <ul className="list bg-base-100 px-4 rounded-box shadow-md">
            {clients
              .filter((s) => {
                return s.Code_client.toLowerCase().includes(
                  search.toLowerCase()
                );
              })
              .map((s) => {
                const avatar =
                  s.Nom_client.charAt(0) + s.Post_Nom_client.charAt(0);

                return (
                  <div className="" key={s?.id_client}>
                    {search.toLowerCase() === s.Code_client.toLowerCase() && (
                      <li className="mb-2 even:bg-base-200">
                        <div className="flex gap-4">
                          <div>
                            <div className="avatar avatar-placeholder">
                              <div className="w-10 bg-primary text-neutral-content rounded-full">
                                <span className=" uppercase font-bold">
                                  {avatar}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <Link to={`/transactions/${s.id_client}`}>
                              <div className="text-primary uppercase font-semibold">
                                {s.Code_client}
                              </div>

                              <div className="">
                                <span className="text-xs text-primary uppercase trucante font-semibold opacity-60">
                                  {`${s.Nom_client} ${s.Post_Nom_client} `}
                                </span>
                                <span className="text-xs text-primary font-semibold opacity-60 max-sm:hidden">
                                  {s.Prenom_client}
                                </span>
                              </div>
                            </Link>
                          </div>
                        </div>
                      </li>
                    )}
                  </div>
                );
              })}
          </ul>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}

export default Bouttons;
