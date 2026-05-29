import {useEffect, useState} from 'react';
import {Card, CorpsCard} from './Hero';
import {getScoresCommission, getScoresCommissions} from '../service';
import {Link} from 'react-router-dom';
import { Download, DownloadIcon, Upload } from 'lucide-react';
import { formatCurrent } from '../utils/helpers';



const CardCommission = () => {
    const [commission, setCommission] = useState([]);
    const [commissions, setCommissions] = useState([]);

    useEffect(() => {
        getScoresCommission().then(setCommission),
        getScoresCommissions().then(setCommissions)
    }, []);

    const titre = "Commission journalière";
    const commission_j = formatCurrent(commission);
    const commission_M = formatCurrent(commissions);

    return (
        <Card>
            <CorpsCard
                title={<div className="pt-2"> {titre} </div>}
                number={commission_j}
                icon={
                    <div className="btn btn-circle btn-ghost text-primary ">
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
                    <div className="btn btn-circle btn-ghost text-primary ">
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