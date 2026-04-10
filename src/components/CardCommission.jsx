import {useEffect, useState} from 'react';
import {Card, CorpsCard} from './Hero';
import {getScoresCommission, getScoresCommissions} from '../service';
import {Link} from 'react-router-dom';
import { Download, DownloadIcon, Upload } from 'lucide-react';


const nmbr_format = new Intl.NumberFormat("fr-CD", {
    style: "currency",
    currency: "CDF",
    minimumFractionDigits: 2,
});

const CardCommission = () => {
    const [commission, setCommission] = useState([]);
    const [commissions, setCommissions] = useState([]);

    useEffect(() => {
        getScoresCommission().then(setCommission),
        getScoresCommissions().then(setCommissions)
    }, []);

    const titre = "Commission journalière";
    const commission_j = nmbr_format.format(commission);
    const commission_M = nmbr_format.format(commissions);

    return (
        <Card>
            <CorpsCard
                title={<div className="pt-2"> {titre} </div>}
                number={commission_j}
                icon={
                    <div className="btn btn-circle btn-ghost text-green-600 ">
                        <Link to={"/liste_dettes"}>
                        <Download/>
                            
                        </Link>
                    </div>
                }
            />

            <CorpsCard
                title={"Commission mensuel"}
                number={commission_M}
                icon={
                    <div className="btn btn-circle btn-ghost text-green-600 ">
                        <Link to={"/liste_dettes"}>
                            <Download/>
                        </Link>
                    </div>
                }
            />
        </Card>
    );
};

export default CardCommission;