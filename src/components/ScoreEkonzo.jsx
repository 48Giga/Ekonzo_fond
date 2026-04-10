import React from 'react';
import {useState, useEffect} from 'react';
import {Card, CorpsCard} from './Hero';
import {getClient, getScoreEkonzo} from '../service';
import {Link} from 'react-router-dom';
import { ArrowUpDown } from 'lucide-react';

const nmbr_format = new Intl.NumberFormat("fr-CD", {
    style: "currency",
    currency: "CDF",
    minimumFractionDigits: 2,
})

const ScoreEkonzo = () => {
    const [score, setScore] = useState([]);
    const [clients, setClients] = useState([])

    useEffect(() => {
        getScoreEkonzo().then(setScore)
        getClient().then(setClients)
    }, []);

    const titre = "Effectif client";
    const effectifs = clients.length
    const caise = nmbr_format.format(score) 

    return (
        <Card>
            <CorpsCard
                title={<div className="pt-2"> {titre} </div>}
                number={
                  clients.length === 0 ? (<span className="loading loading-spinner loading-md"></span>) : effectifs
                }
                icon={
                    <div className="btn btn-circle btn-ghost text-primary">
                        <Link to={"/create"}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="size-8"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z"
                                    clipRule="evenodd"
                                />
                                <path
                                    d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z"/>
                            </svg>
                        </Link>
                    </div>
                }
            />
            <CorpsCard
                title={"Caise"}
                number={
                  caise
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