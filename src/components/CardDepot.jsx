import {useState, useEffect} from "react";
import {Card, CorpsCard} from "./Hero";
import {Link} from "react-router-dom";
import {getScoresDepot, getScoresDepots} from "../service";
import {Download} from "lucide-react";


const nmbr_format = new Intl.NumberFormat("fr-CD", {
    style: "currency",
    currency: "CDF"
});

const CardDepot = () => {
    const [depot, setDepot] = useState([]);
    const [depots, setDepots] = useState([]);

    useEffect(() => {
        getScoresDepot().then(setDepot),
        getScoresDepots().then(setDepots)
    }, []);

    const titre = "Dépot journalière";
    const depot_J = nmbr_format.format(depot);
    const depot_M = nmbr_format.format(depots);

    return (
        <Card>

            <CorpsCard
                title={<div className="pt-2"> {titre} </div>}
                number={depot_J}
                icon={
                    <div className="btn btn-circle btn-ghost text-green-600 ">
                        <Link to={"/liste_depots"}>
                            <Download className="size-7"/>
                        </Link>
                    </div>
                }
            />

            <CorpsCard
                title={"Dépot mensuel"}
                number={depot_M}
                icon={
                    <div className="btn btn-circle btn-ghost text-green-600 ">
                        <Link to={"/liste_depots"}>
                            <Download className="size-7"/>
                        </Link>
                    </div>
                }
            />
        </Card>
    );
};

export default CardDepot;