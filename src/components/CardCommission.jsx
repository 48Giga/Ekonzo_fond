import {Card, CorpsCard} from './Hero';
import {Link} from 'react-router-dom';
import { Download, DownloadIcon, Upload } from 'lucide-react';
import { formatCurrent } from '../utils/helpers';
import { useAppContext } from '../context';



const CardCommission = () => {
   
    const { commission, comJornaliere } = useAppContext()

    const titre = "Commission journalière";
    


    return (
        <Card>
            <CorpsCard
                title={<div className="pt-2"> {titre} </div>}
                number={!comJornaliere ? (<span className="loading loading-ring loading-lg"></span>) :
                    formatCurrent(comJornaliere)
                }
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
                number={!commission ? (<span className="loading loading-ring loading-lg"></span>) 
                    : formatCurrent(commission)}
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