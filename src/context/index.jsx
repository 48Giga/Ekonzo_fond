import {createContext, useContext, useMemo, useState} from 'react'
import {getClient, getNbrDepot, getNbrRetrait} from '../service'

const AppContext = createContext()
const {Provider} = AppContext

const AppProvider = ({children}) => {
    const [clients, setClients] = useState([])
    const [nombreDepot, setNombreDepot] = useState([])
    const [nombreRetrait, setNombreRetrait] = useState([])
    const [token, setToken] = useState(localStorage.getItem('ekonzo_token') || null)
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem('ekonzo_user')
        return stored ? JSON.parse(stored) : null
    })

    const fetchClients = () => {
        getClient().then(setClients)
    }

    const fetchNombreDepot = () => {
        getNbrDepot().then(setNombreDepot)
    }

    const fetchNombreRetrait = () => {
        getNbrRetrait().then(setNombreRetrait)
    }

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

    const value = useMemo(() => ({
        clients,
        fetchClients,
        nombreDepot,
        fetchNombreDepot,
        nombreRetrait,
        fetchNombreRetrait,
        token,
        user,
        login,
        logout,
    }), [clients, nombreDepot, nombreRetrait, token, user])

    return <Provider value={value}>{children}</Provider>
}

export const useAppContext = () => useContext(AppContext)

export default AppProvider;