import {createContext, useContext, useMemo, useState} from "react";
import {getClient, getNbrDepot, getNbrRetrait} from "../service";

const AppContext = createContext()
const {Provider} = AppContext

const AppProvider = ({children}) => {

    const [clients, setClients] = useState([]);
    const [nombreDepot, setNombreDepot] = useState([])
    const [nombreRetrait, setNombreRetrait] = useState([])

    const fetchClients = () => {
        getClient().then(setClients)
    }

    const fetchNombreDepot = () => {
        getNbrDepot().then(setNombreDepot)
    }

    const fetchNombreRetrait = () => {
        getNbrRetrait().then(setNombreRetrait)
    }

    const value = useMemo(() => {

        return {clients, fetchClients, nombreDepot, fetchNombreDepot, nombreRetrait, fetchNombreRetrait}

    }, [clients, nombreDepot, nombreRetrait])

    return <Provider value={value}> {children} </Provider>
}

export const useAppContext = () => {
    return useContext(AppContext)
}

export default AppProvider;