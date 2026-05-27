import { useEffect, useState } from 'react'
import Navigation from '../components/Navigation'
import { Link, useLoaderData, useNavigate } from 'react-router-dom'
import { addDepot } from '../service'
import Utilisateur from '../components/Utilisateur'
import { ArrowBigLeft } from 'lucide-react'

const nmbr_format = new Intl.NumberFormat('fr-CD', {
  style: 'currency',
  currency: 'CDF',
  minimumFractionDigits: 2,
})

const Transaction = () => {
  const clientResponse = useLoaderData()
  const client = Array.isArray(clientResponse) ? clientResponse[0] : clientResponse
  const navigate = useNavigate()

  const [depotValues, setDepotValues] = useState({
    idClient: client?.id_client || null,
    date: new Date().toISOString().split('T')[0],
    montant: 0,
  })
  const [apercu, setApercu] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (client?.id_client) {
      setDepotValues((prev) => ({ ...prev, idClient: client.id_client }))
    }
  }, [client?.id_client])

  if (!client) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  }

  const solde = Number(client.Solde_client || 0)
  const mise = Number(client.Mise_client || 0)
  const nbr_case = mise > 0 ? solde / mise : 0
  const prenom = client.Prenom_client?.toLowerCase() || ''

  const code = (() => {
    const value = client.Code_client || ''
    const longueurCode = value.length
    const lastLetter = value.at(-1) || ''
    const firstLetter = value.substring(0, 2)
    const midwere = value.substring(0, Math.max(0, longueurCode - 1))
    const midwerLetter = midwere.substring(2)
    return `${firstLetter} - ${midwerLetter} - ${lastLetter}`
  })()

  const numerique = (val) => {
    if (isNaN(val.target.value) || val.target.value <= 0) {
      val.target.value = 1
    }
  }

  const handleApercu = (e) => {
    e.preventDefault()
    setApercu(depotValues)
    const modal = document.getElementById('modal_apercu_depot')
    modal?.showModal()
  }

  const submitDepot = async () => {
    setIsLoading(true)
    try {
      if (solde < mise * 31) {
        const response = await addDepot(depotValues)
        if (response?.success) {
          navigate('/recu_depot')
        } else {
          alert(response?.message || 'Erreur lors du dépôt.')
        }
      } else {
        alert("Le client(e) atteint son plafond de dépôt. Qu'il (elle) commence une autre carte.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleAnnuler = () => {
    setApercu(null)
    document.getElementById('frm_depot')?.reset()
    document.getElementById('modal_apercu_depot')?.close()
  }

  return (
    <Navigation
      titre={
        <Link to={'/'} className="flex gap-6 text-white items-center px-2">
          <span>
            <ArrowBigLeft />
          </span>
          <span className="flex items-center gap-2 text-2xl font-bold max-sm:text-xl">
            {code.toUpperCase()}
          </span>
        </Link>
      }
      winget={<Utilisateur />}
    >
      <div className="w-full place-items-center py-8 max-sm:pb-0">
        <div className="max-w-2xl mx-auto p-4 bg-base-100 shadow-lg rounded-lg">
          <h1 className="font-bold text-xl text-center text-primary/60 uppercase max-sm:text-lg max-sm:py-2">
            Déposer
          </h1>
          <h2 className="text-center font-bold py-2 text-shadow-2xs text-white bg-primary">
            <span className="font-bold uppercase text-primary-content">
              {`${client.Nom_client} ${client.Post_Nom_client} `}
            </span>
            <span className="font-bold text-primary-content text-lg capitalize">
              {prenom}
            </span>
          </h2>
          <div key={client.id_client} className="px-1 max-sm:w-full">
            <h4 className="text-start text-primary text-[14px] opacity-85 font-semibold">
              Solde du client
            </h4>
            <div className="grid justify-center">
              <h4 className="font-bold font-[consolas] text-primary stat-value">
                {nmbr_format.format(client.Solde_client)}
              </h4>
              <div className="flex items-center gap-2">
                <h4 className="opacity-60">Mise :</h4>
                <h4 className="font-bold font-[consolas] text-primary capitalize text-xs">
                  {nmbr_format.format(client.Mise_client)}
                </h4>
              </div>
            </div>
            <hr className="opacity-20" />
          </div>
          <form action="" onSubmit={handleApercu} id="frm_depot">
            <div className="px-6 grid gap-2 items-center pt-2">
              <input
                type="date"
                onChange={(e) => setDepotValues({ ...depotValues, date: e.target.value })}
                className="input lg:w-[180px]"
                placeholder="Date"
                required
              />
              <div className="lg:join max-sm:space-y-2">
                <input
                  type="number"
                  onChange={(e) => setDepotValues({ ...depotValues, montant: e.target.valueAsNumber })}
                  onKeyUp={numerique}
                  className="input text-center input-primary"
                  placeholder="Montant"
                  required
                />
                <button type="submit" className="btn btn-primary join-item max-sm:btn-block">
                  Soumettre
                </button>
              </div>
            </div>
          </form>
          <hr className="opacity-20 mt-2" />
          <div className="">
            <h4 className="flex justify-between text-primary-content bg-primary px-4 py-2">
              <span>CODE</span>
              <span>MONTANT</span>
              <span>DATE</span>
            </h4>
            <ul className="list bg-base-100 rounded-box shadow-md">
              ...
              <div className="flex items-center gap-2">
                <h4 className="opacity-60">Nombre de case :</h4>
                <h4 className="font-bold text-primary capitalize text-xs">
                  {nbr_case.toFixed(0)}
                </h4>
              </div>
            </ul>
          </div>
        </div>
      </div>
      <dialog id="modal_apercu_depot" className="modal">
        <div className="modal-box w-[340px]">
          <h4 className="font-bold text-start text-primary">Vérification des informations</h4>
          {apercu && (
            <div>
              <div className="py-4">
                <div className="space-x-4 stat-title">
                  <span>Date du dépôt :</span>
                  <span>{new Date(apercu.date).toLocaleDateString()}</span>
                </div>
                <hr className="opacity-20" />
                <div className="text-primary text-center opacity-60 py-2 stat-value">
                  {nmbr_format.format(apercu.montant)}
                </div>
                <div className="space-x-4 stat-title ">
                  <span>ID du client :</span>
                  <span>{apercu.idClient}</span>
                </div>
                <hr className="opacity-20" />
              </div>
              <div className="flex items-center justify-center gap-6">
                <button onClick={submitDepot} disabled={isLoading} className="btn btn-primary">
                  {isLoading ? <span className="loading loading-spinner loading-md"></span> : 'Confirmer'}
                </button>
                <button onClick={handleAnnuler} disabled={isLoading} className="btn btn-outline btn-primary">
                  Annuler
                </button>
              </div>
            </div>
          )}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>Close</button>
        </form>
      </dialog>
    </Navigation>
  )
}

export default Transaction

      
