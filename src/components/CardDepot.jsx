import {Card, CorpsCard} from "./Hero";
import {Link} from "react-router-dom";
import {Download} from "lucide-react";
import { formatCurrent } from "../utils/helpers";
import { useAppContext } from "../context";


const CardDepot = () => {
   
    const {depotMensuel, depotJournaliere} = useAppContext()
    
    const titre = "Dépot journalière";


    return (
        <Card>

            <CorpsCard
                title={<div className="pt-2"> {titre} </div>}
                number={!depotJournaliere ? (<span className="loading loading-ring loading-md"></span>) 
                    : formatCurrent(depotJournaliere)}
                icon={
                    <div className="btn btn-circle btn-ghost text-primary ">
                        <Link to={"/liste_depots"}>
                            <Download className="size-7"/>
                        </Link>
                    </div>
                }
            />

            <CorpsCard
                title={"Dépot mensuel"}
                number={!depotMensuel ? (<span className="loading loading-ring loading-md"></span>)
                    : formatCurrent(depotMensuel)}
                icon={
                    <div className="btn btn-circle btn-ghost text-primary ">
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