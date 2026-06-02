import React, { useEffect, useState } from 'react';
import { getClient } from '../service';
import { formatCurrent } from '../utils/helpers';
import { Eye } from 'lucide-react';

const ClientRecent = () => {

    const [clients, setClient] = useState([])

    useEffect(() => {
        getClient().then(setClient)
        clients
    }, [clients])

    const clientResponse = clients.filter(client => client.id_client === Math.max(...clients.map(client => client.id_client)))
    const clientRecent = Array.isArray(clientResponse) ? clientResponse[0] : clientResponse
    
    return (
        <div>
           <button
                className="btn btn-lg btn-circle btn-primary"
                onClick={() =>
                    document.getElementById("modal_client-recent").showModal()
                }
            > <Eye/> </button>

      
      <dialog id="modal_client-recent" className="modal">
        <div className="modal-box w-full lg:w-150 bg-green-50 max-h-8/12">
          <div className="max-h-screen flex flex-col justify-center items-center w-full">
            <h5 className='font-bold w-full text-primary-content text-center text-2xl py-2 bg-primary'>
                {clientRecent?.Code_client}
                
            </h5>
            <h4 className='text-lg font-bold'> {`${clientRecent?.Nom_client} ${clientRecent?.Post_Nom_client} ${clientRecent?.Prenom_client}`} </h4>
            <h4 className='font-bold text-4xl'>  
                {formatCurrent(clientRecent?.Mise_client)} 
            </h4>
          </div>
          
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
        </div>
    );
};

export default ClientRecent;