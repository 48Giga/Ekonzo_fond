import React, {useEffect, useState} from "react";
import {getSuperMontant} from "../service";
import {Card} from "./Hero";


const number_format = new Intl.NumberFormat("fr-CD", {
    style: "currency",
    currency: "CDF",
    minimumFractionDigits: 2,
})

function SuperMontant() {
    const [data, setData] = useState([])
    const [nmbrItems, setNmbrItems] = useState(5)
   
    useEffect(() => {
        getSuperMontant().then(setData)
    }, [])


    return (
        <Card>
            <div className="flex justify-between max-sm:grid max-sm:grid-cols-1 max-sm:gap-2 max-sm:py-2">
                <h4 className="text-lg font-bold text-primary/60">
                    Top 5 de supérieur montant
                </h4>
                <div className="">
                    <input type="range"
                           min={3} max={data.length}
                           defaultValue={nmbrItems}
                           onChange={e => setNmbrItems(e.target.value)}
                           className="range range-sm range-primary print:hidden"
                    />
                </div>
            </div>

            <div className="">
                <table className="table w-full table-zebra max-2xl:table-lg">
                    <thead>
                    <tr className="text-lg text-neutral-content bg-primary">
                        <td>Code</td>
                        <td>Nom</td>
                        <td className="text-end">Solde</td>
                    </tr>
                    </thead>
                    <tbody>
                    { data.length === 0 ? (
                        <span className="loading loading-spinner loading-lg"></span>
                    ) :
                        data.slice(0, nmbrItems)
                        .map(s => (
                            <tr key={s?.id_client}>
                                <td className="uppercase max-lg:text-2xl">{s?.Code_client}</td>
                                <td className="capitalize">{`${s?.Nom_client}  ${s?.Post_Nom_client}  ${s?.Prenom_client}`}</td>
                                <td className="text-end font-[consolas] font-bold ">{number_format.format(s?.Solde_client)}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </Card>
    );
}

export default SuperMontant;
