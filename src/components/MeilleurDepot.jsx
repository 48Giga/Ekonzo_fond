import React, {useEffect, useState} from "react";
import {getTopCinq} from "../service";
import {Card} from "./Hero";

const nmbr_format = new Intl.NumberFormat("fr-CD", {
    style: "currency",
    currency: "CDF"
});

function MeilleurDepot() {
    const [data, setData] = useState([])
    const [nbrItems, setNbrItems] = useState(5)

    useEffect(() => {
        getTopCinq().then(setData)
    }, [])



    return (
        <Card>
            <div className="flex justify-between max-sm:grid max-sm:grid-cols-1 max-sm:gap-2 max-sm:py-2">
                <h4 className="text-lg font-bold text-primary/60">
                Top 5 de meilleur dépot journalière
            </h4>
            <div className="">
                <input type="range" 
                min={3} max={data.length}
                defaultValue={nbrItems}
                onChange={e => setNbrItems(e.target.value)}
                className="range range-primary range-sm"/>
            </div>
            
            </div>
            
            <div className="">
                <table className="table w-full table-zebra max-2xl:table-lg">
                    <thead>
                    <tr className="text-lg text-neutral-content bg-primary">
                        <td>Code</td>
                        <td>Nom</td>
                        <td className="text-end">Montant</td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        data.length !== 0 ?

                            data.slice(0, nbrItems).map((d, i) => {

                                return (

                                    <tr key={i}>
                                        <td className="uppercase">{d?.Code_client}</td>
                                        <td className="capitalize">{d?.Nom_client + " " + d?.Post_Nom_client + " " + d?.Prenom_client}</td>
                                        <td className="text-end font-[consolas] font-bold">{nmbr_format.format(d?.Montant)}</td>
                                    </tr>
                                )
                            }) : <td>Aucun dépot n'effectuer</td>
                    }
                    </tbody>
                </table>
            </div>

        </Card>
    );
}

export default MeilleurDepot;
