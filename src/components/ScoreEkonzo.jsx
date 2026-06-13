import {useState, useEffect} from 'react';
import {Card, CorpsCard} from './Hero';
import {getClient} from '../service';
import {Link} from 'react-router-dom';
import { ArrowUpDown, LucideUsers, User2 } from 'lucide-react';
import { formatCurrent } from '../utils/helpers';
import { useAppContext } from '../context';



const ScoreEkonzo = () => {
    const [clients, setClients] = useState([])

    useEffect(() => {
        getClient().then(setClients)
    }, []);

    const { soldeGlobal } = useAppContext()

    const titre = "Effectif client";
    const effectifs = clients.length

    useEffect(() => {
        soldeGlobal
    }, [soldeGlobal])

    return (
        <Card>
            <CorpsCard
                title={<div className="pt-2"> {titre} </div>}
                number={
                  clients.length === 0 ? (<span className="loading loading-ring loading-md"></span>) : effectifs
                }
                icon={
                    <div className="btn btn-circle btn-ghost text-primary">
                        
                        <LucideUsers/>
                    </div>
                }
            />
            <CorpsCard
                title={"Caise"}
                number={!soldeGlobal ? (<span className="loading loading-ring loading-lg"></span>)
                      :   formatCurrent(soldeGlobal)
                }
                icon={
                    <div className="btn btn-circle btn-ghost font-bold text-primary ">
                        <ArrowUpDown />
                    </div>
                }
            />

        </Card>
    );
};

export default ScoreEkonzo;