import React, { useEffect, useState } from "react";
import { Link} from "react-router-dom";
import { Card } from "../components/Hero";
import Navigation from "../components/Navigation";
import { ArrowUp, ArrowBigLeft, ChevronLeft, ChevronRight } from "lucide-react";
import Utilisateur from "../components/Utilisateur";
import { getDettes, getNbrRetrait } from "../service";
import { formatCurrent } from "../utils/helpers";


const Dette = () => {

  const [retraits, setRetrait] = useState([])
  const [recherche, setRecherche] = useState("");
  const [nombreRetrait, setNombreRetrait] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)
  const [nbrItems, setNbrItems] = useState(10);

  useEffect(() => {
    getNbrRetrait().then(setNombreRetrait)
    getDettes().then(setRetrait)
  }, [])

  const handleRecherche = (e) => {
    const val = e.target.value;
    setRecherche(val);
  };

  const handlePageChange = page => {
    if (page < 1 || page > retraits.length || page === currentPage) {
      return
    }else {
       setCurrentPage(page)
    }}

  const startItem = (currentPage -1) * nbrItems

  return (
    <div>
      <div className="max-w-2xl mx-auto m-4">

        <Card>

          <div>
            <h4 className="text-xl font-medium py-2 px-4">Liste de dettes</h4>
          </div>

          <div className="px-6 pb-4">
            <ul className="list bg-base-100 rounded-box shadow-md">
              <input
                type="range"
                min={3}
                max={retraits.length}
                defaultValue={nbrItems}
                onChange={(e) => setNbrItems(e.target.value)}
                className="range range-sm range-primary w-full"
              />

              <div className="max-w-full mx-auto py-2">
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Recherche ..."
                  onChange={handleRecherche}
                />
              </div>

              { retraits
                .filter((d) => {
                  const fullname =
                    d.Code_client +
                    " " +
                    d.Nom_client +
                    " " +
                    d.Post_Nom_client;
                  return fullname
                    .toLowerCase()
                    .includes(recherche.toLowerCase());
                })
                .splice(startItem, nbrItems)
                .map((d, i) => {
                  const avatar =
                    d.Nom_client.charAt(0) + d.Post_Nom_client.charAt(0);
                  const date = new Date(d.Date_retrait).toLocaleDateString();
                  return (
                    <li
                      key={i}
                      className="grid grid-cols-2 px-4 py-1 border-b-1 border-gray-200 even:bg-base-200 max-sm:px-1 max-sm:flex max-sm:justify-between"
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
                          <div className="text-primary uppercase font-semibold">
                            {d.Code_client}
                          </div>

                          <div className="">
                            <span className="text-xs text-primary uppercase trucante font-semibold opacity-60">
                              {`${d.Nom_client} ${d.Post_Nom_client} `}
                            </span>
                            <span className="text-xs text-primary font-semibold opacity-60 max-sm:hidden">
                                {d.Prenom_client}
                                </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between max-sm:px-4 max-sm:gap-8">
                        

                        <div className="text-center">
                          <div className="text-primary font-semibold">
                            Montant
                          </div>
                          <div className="text-xs text-primary uppercase font-semibold opacity-60 max-sm:-z-10">
                            {formatCurrent(d.Montant)}
                          </div>
                        </div>

                        <div className="text-center">
                          <div className="text-primary font-semibold">Date</div>
                          <div className="text-xs text-primary uppercase font-semibold opacity-60 max-sm:-z-10">
                            {date}
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>

          <div className="py-4">

            <div className="mx-auto max-w-2xs bg-zinc-100">
              <div className="flex items-center justify-between">
                <button
                  className="btn"
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  <ChevronLeft/>
                </button>
                <div className="text-primary font-semibold">
                  {`${startItem + 1} à ${currentPage * nbrItems} sur ${
                    retraits.length
                  }`}
                </div>
                <button
                  className={`btn ${currentPage === retraits.length ? 'disabled:btn':''}`}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  <ChevronRight/>
                </button>
              </div>
            </div>
            
          </div>

        </Card>

      </div>
    </div>
  );
};

export default Dette;
