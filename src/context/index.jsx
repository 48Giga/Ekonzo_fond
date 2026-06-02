import {createContext, useContext, useEffect, useMemo, useState} from 'react'
import { getClient, getDepots, getEtatRetrait } from '../service'


const AppContext = createContext()
const {Provider} = AppContext

const AppProvider = ({children}) => {
   
    const [token, setToken] = useState(localStorage.getItem('ekonzo_token') || null)
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem('ekonzo_user')
        return stored ? JSON.parse(stored) : null
    })
    
    const[clients, setClients] = useState([])
    const[depots, setDepots] = useState([])
    const[retraits, setRetraits] = useState([])


    const login = ({token, user}) => {
        setToken(token)
        setUser(user)
        localStorage.setItem('ekonzo_token', token)
        localStorage.setItem('ekonzo_user', JSON.stringify(user))
    }

    const logout = () => {
        setToken(null)
        setUser(null)
        localStorage.removeItem('ekonzo_token')
        localStorage.removeItem('ekonzo_user')
    }

    useEffect(()=>{
        getClient().then(setClients)
        getDepots().then(setDepots)
        getEtatRetrait().then(setRetraits)
    },[])

    const value = useMemo(() => {

        const soldeGlobal = clients.reduce((sum, solde) => sum + Number(solde?.Solde_client || 0), 0 )
        const depotMensuel = depots.reduce((sum, depot) => sum + Number(depot?.Montant || 0), 0)
        const depotJournaliere = depots.filter(depot => new Date(depot.Date_depot).toLocaleDateString() === new Date().toLocaleDateString()).reduce((sum, depot) => sum + Number(depot?.Montant || 0), 0)
        const retraitMensuel = retraits.reduce((sum, retrait) => sum + Number(retrait?.Montant || 0),0)
        const retraitJournalier = retraits
        .filter( retrait => new Date(retrait?.Date_retrait).toLocaleDateString() === new Date().toLocaleDateString())
        .reduce((sum, retrait) => sum + Number(retrait?.Montant || 0), 0)
        const commission = retraits.reduce((sum, comm)=> sum + Number(comm.Commission || 0), 0)
        const comJornaliere = retraits.filter(retrait => new Date(retrait?.Date_retrait).toLocaleDateString() === new Date().toLocaleDateString())
        .reduce((sum, comm)=> sum + Number(comm.Commission || 0), 0)

        return { token,
        user,
        login,
        logout, soldeGlobal, depotMensuel, depotJournaliere, retraitMensuel, retraitJournalier, commission, comJornaliere }
    },[token, user, clients, depots, retraits])

    return <Provider value={value}>{children}</Provider>
}

export const useAppContext = () => useContext(AppContext)

export default AppProvider;