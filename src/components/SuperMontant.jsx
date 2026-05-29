import React, { useEffect, useState } from "react";
import { getSuperMontant } from "../service";
import { Card } from "./Hero";
import { formatCurrent } from "../utils/helpers";



function SuperMontant() {
  const [data, setData] = useState([]);
  const [nmbrItems, setNmbrItems] = useState(5);

  useEffect(() => {
    getSuperMontant().then(setData);
  }, []);

  return (
    <Card>
      <div className="grid gap-2 lg:flex  lg:justify-between">
        <h4 className="lg:text-lg font-bold text-secondary/60">
          Top 5 de supérieur montant
        </h4>
        <div className="">
          <input
            type="range"
            min={3}
            max={data.length}
            defaultValue={nmbrItems}
            onChange={(e) => setNmbrItems(e.target.value)}
            className="range range-sm range-primary print:hidden"
          />
        </div>
      </div>

      <div className="pt-2">
        <h4 className="bg-primary py-4 text-lg font-bold text-neutral-content ps-8 flex justify-between">
            <span >Nom Post-nom</span>
            <span className="px-6">Solde</span>
        </h4>
        <ul className="list bg-base-100 rounded-box shadow-md">
          {data.length === 0 ? (
            <span className="loading loading-spinner loading-lg"></span>
          ) : (
            data.slice(0, nmbrItems).map((d) => {
                const avatar = d.Nom_client.charAt(0) + d.Post_Nom_client.charAt(0);
                return (
                    <li
                key={d.id_client}
                className="grid grid-cols-2 px-4 py-1 border-b-1 border-gray-200 even:bg-base-200 max-sm:px-1 max-sm:flex max-sm:justify-between"
              >
                <div className="flex gap-4">
                  <div>
                    <div className="avatar avatar-placeholder">
                      <div className="w-10 bg-primary text-neutral-content rounded-full">
                        <span className="font-bold uppercase">{avatar}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    
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
                    
                  </div>
                </div>

                <div className="">
                  <div className="text-center">
                    {/* <div className="text-primary font-semibold">Solde</div> */}
                    <div className="lg:text-lg text-end text-secondary uppercase font-[consolas] font-semibold opacity-60 max-sm:-z-10">
                      {formatCurrent(d.Solde_client)}
                    </div>
                  </div>
                </div>
              </li>
                )
            })
          )}
        </ul>
        
      </div>
    </Card>
  );
}

export default SuperMontant;
