import { useEffect, useState } from 'react';
import { Card } from './Hero';
import { getDepots, getRetraits, getNbrCarte, getNbrDepot, getNbrRetrait } from '../service';
import UserForm from './UserForm';



const UserManager = () => {
    const [countCarte, setCountCarte] = useState([]) 
    const [countRetrait, setCountRetrait] = useState([]) 
    const [countDepot, setCountDepot] = useState([]) 
    const [nombreDepot, setNombreDepot] = useState([]);
    const [nombreRetrait, setNombreRetrait] = useState([]);

useEffect(() => {
    getNbrCarte().then(setCountCarte)
    getRetraits().then(setCountRetrait)
    getDepots().then(setCountDepot)
    getNbrDepot().then(setNombreDepot)
    getNbrRetrait().then(setNombreRetrait)
}, [])

const retrait = countRetrait.filter(retrait => new Date(retrait?.Date_retrait).getMonth() === new Date().getMonth() && new Date(retrait?.Date_retrait).getFullYear() === new Date().getFullYear())
const depot = countDepot.filter(depot => new Date(depot.Date_depot).getMonth() === new Date().getMonth() && new Date(depot.Date_depot).getFullYear() === new Date().getFullYear())
    return (
        <div>
            <div className="max-w-4xl mx-auto m-4">
                <div className="grid lg:grid-cols-3 w-full gap-6">
                    <Card>
                        <div className='text-center py-2'>
                            <h4 className="stat-title font-medium py-2 px-4">Nombre de dépot</h4>
                            <h2 className='stat-value'> {Number(depot.length || 0)} </h2>
                            <h4 className='stat-desc'> {Number(nombreDepot)} Suivi de dépot journalière</h4>
                        </div>

                    </Card>

                    <Card>
                        <div className='text-center py-2'>
                            <h4 className="stat-title font-medium py-2 px-4">Nombre de retrait</h4>
                            <h2 className='stat-value'> {Number(retrait.length || 0)} </h2>
                            <h4 className='stat-desc'> {Number(nombreRetrait || 0)} Suivi de retrait journalière</h4>
                        </div>
                    </Card>

                    <Card>
                        <div className='text-center py-2'>
                            <h4 className="stat-title font-medium py-2 px-4">Nombre de carte créer</h4>
                            <h2 className='stat-value'> {Number(countCarte || 0)} </h2>
                            <h4 className='stat-desc'>Suivi de carte créer en ce mois</h4>
                        </div>
                    </Card>

                </div>

            </div>

        

        <div className="max-w-4xl mx-auto m-4">
            <Card>
            <div>
                <h4 className="text-xl font-medium py-2 px-4">Liste des utilisateurs</h4>
            </div>
            
            </Card> 

            <UserForm/>
        </div>
        </div>
    );
};

export default UserManager;