import {createBrowserRouter, Outlet, RouterProvider} from 'react-router-dom';
import Home from './pages/Home';
import Erreur from './pages/Erreur';
import PiedPage from './components/PiedPage';
import Info from './pages/Info';
import Client from './pages/Client';
import Transactions from './pages/Transactions';
import Transaction from './pages/Transaction';
import Retrait from './pages/Retrait';
import Depot from './pages/Depot';
import RecuDepot from './pages/RecuDepot';
import RecuRetrait from './pages/RecuRetrait';
import Dette from './pages/Dette';


const string_uri = "http://localhost:4500";
const apiKey = "ekonzo";

const chemin = createBrowserRouter([
        {
            path: "/",
            element: <>
                <Outlet/>
                <PiedPage/>
            </>,
            errorElement: <Erreur/>,
            children: [
                {
                    path: "/login",
                    element: <div className="">Login</div>
                },
                {
                    path: "",
                    element: <Home/>
                },
                {
                    path: "/info_client/:code",
                    element: <Info/>,
                    loader: ({params}) => fetch(`${string_uri}/${apiKey}/single_client/${params.code}`)
                },
                {
                    path: "/create",
                    element: <Client/>,
                    loader: () => fetch(`${string_uri}/${apiKey}/adress_max_id`)
                },
                {
                    path: "/transactions/:id",
                    element: <Transactions/>,
                    loader: ({params}) => fetch(`${string_uri}/${apiKey}/single_client/${params.id}`)
                },
                {
                    path: "/transaction/:id",
                    element: <Transaction/>,
                    loader: ({params}) => fetch(`${string_uri}/${apiKey}/single_client/${params.id}`)
                },
                {
                    path: "/liste_retraits",
                    element: <Retrait/>,
                    loader: () => fetch(`${string_uri}/${apiKey}/all_retraits`)
                },
                {
                    path: "/liste_dettes",
                    element: <Dette/>,
                    loader: () => fetch(`${string_uri}/${apiKey}/all_dettes`)
                },
                {
                    path: "/liste_depots",
                    element: <Depot/>,                    
                    loader: () => fetch(`${string_uri}/${apiKey}/all_depots`)
                },
                {
                    path: "/recu_depot",
                    element: <RecuDepot/>,
                    loader: () => fetch(`${string_uri}/${apiKey}/recu_transaction_depot`)
                },
                {
                    path: "/recu_retrait",
                    element: <RecuRetrait/>,
                    loader: () => fetch(`${string_uri}/${apiKey}/recu_transaction_retrait`)
                }
            ]
        }
    ],
)

const App = () => {
    

    return (
        <div className="max-h-full bg-base-200">
            <RouterProvider router={chemin}/>
        </div>
    );
};

export default App;