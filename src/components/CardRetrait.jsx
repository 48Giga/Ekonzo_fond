import React from 'react';
import {useState, useEffect} from 'react';
import {Card, CorpsCard} from './Hero';
import {getScoresRetrait, getScoresRetraits} from '../service';
import {Link} from 'react-router-dom';
import {Upload} from 'lucide-react';

const nmbr_format = new Intl.NumberFormat("fr-CD", {
    style: "currency",
    currency: "CDF",
    minimumFractionDigits: 2,
});

const CardRetrait = () => {
    const [retrait, setRetrait] = useState([]);
    const [retraits, setRetraits] = useState([]);

    useEffect(() => {
        getScoresRetrait().then(setRetrait),
            getScoresRetraits().then(setRetraits)
    }, []);

    const titre = "Rétrait journalière";
    const retrait_J = nmbr_format.format(retrait);
    const retrait_m = nmbr_format.format(retraits);


    return (
        <Card>
            <CorpsCard
                title={<div className="pt-2"> {titre} </div>}
                number={retrait_J}
                icon={
                    <div className="btn btn-circle btn-ghost text-red-500">
                        <Link to={"/liste_retraits"}>
                            <Upload className='size-6'/>
                        </Link>
                    </div>
                }
            />

            <CorpsCard
                title={"Retrait mensuel"}
                number={retrait_m}
                icon={
                    <div className="btn btn-circle btn-ghost text-red-500">
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

