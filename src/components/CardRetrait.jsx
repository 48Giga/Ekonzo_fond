import React from 'react';
import {Card, CorpsCard} from './Hero';
import {Link} from 'react-router-dom';
import {Upload} from 'lucide-react';
import { formatCurrent } from '../utils/helpers';
import { useAppContext } from '../context';



const CardRetrait = () => {

    const { retraitMensuel, retraitJournalier } = useAppContext()
    

    const titre = "Rétrait journalière";
    //const retrait_J = ;
    //const retrait_m = ;


    return (
        <Card>
            <CorpsCard
                title={<div className="pt-2"> {titre} </div>}
                number={!retraitJournalier ? (<span className="loading loading-ring loading-lg"></span>) 
                    : formatCurrent(retraitJournalier)}
                icon={
                    <div className="btn btn-circle btn-ghost text-primary">
                        <Link to={"/liste_retraits"}>
                            <Upload className='size-6'/>
                        </Link>
                    </div>
                }
            />

            <CorpsCard
                title={"Retrait mensuel"}
                number={!retraitMensuel ? (<span className="loading loading-ring loading-lg"></span>)
                    : formatCurrent(retraitMensuel)
                }
                icon={
                    <div className="btn btn-circle btn-ghost text-primary">
                        <Link to={"/liste_retraits"}>
                            <Upload className='size-6'/>
                        </Link>
                    </div>
                }
            />
        </Card>
    );
};

export default CardRetrait;

