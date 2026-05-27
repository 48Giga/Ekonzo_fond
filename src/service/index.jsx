import axios from 'axios'

const string_uri = 'http://127.0.0.1:4500'
const apiKey = 'ekonzo'

const apiClient = axios.create({ baseURL: string_uri })
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('ekonzo_token')
  if (token) {
    if (!config.headers) config.headers = {}
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export function loginUser(credentials) {
  return apiClient.post(`${apiKey}/login`, credentials).then((res) => res.data)
}


export function getClient() {
    return new Promise((resolve) => {
        apiClient.get(`${apiKey}/all_clients`)
            .then(res => res.data)
            .then(resolve);
    });
}

export function getById({params}) {
    return new Promise((resolve) => {
        apiClient.get(`${apiKey}/single_client/${params.id}`)
        .then(res => res.data)
        .then(resolve);
    })

}

export function getScoreEkonzo() {
    return new Promise((resolve) => {
        apiClient.get(`${apiKey}/score_ekonzo`)
            .then(res => res.data)
            .then(resolve)
            .catch(err => console.error(err))
    })
}


export function getNbrDepot() {
    return new Promise((resolve) => {
        apiClient.get(`${apiKey}/nombre_de_depot`)
            .then(res => res.data)
            .then(resolve)
            .catch(err => console.error(err))
    })
}

export function getNbrRetrait() {
    return new Promise((resolve) => {
        apiClient.get(`${apiKey}/nombre_de_retrait`)
            .then(res => res.data)
            .then(resolve)
            .catch(err => console.error(err))
    })
}

export function getNbrCarte() {
    return new Promise((resolve) => {
        apiClient.get(`${apiKey}/nombre_carte`)
            .then(res => res.data)
            .then(resolve)
            .catch(err => console.error(err))
    })
}


export function getScoresDepot() {
    return new Promise((resolve) => {
        apiClient.get(`${apiKey}/scores_depot`)
            .then(res => res.data)
            .then(resolve)
            .catch(err => console.error(err))
    })
}

export function getScoresDepots() {
    return new Promise((resolve) => {
        apiClient.get(`${apiKey}/scores_depots`)
            .then(res => res.data)
            .then(resolve)
            .catch(err => console.error(err))
    })
}


export function getScoresRetrait() {
    return new Promise((resolve) => {
        apiClient.get(`${apiKey}/scores_retrait`)
            .then(res => res.data)
            .then(resolve)
            .catch(err => console.error(err))
    })
}

export function getScoresRetraits() {
    return new Promise((resolve) => {
        apiClient.get(`${apiKey}/scores_retraits`)
            .then(res => res.data)
            .then(resolve)
            .catch(err => console.error(err))
    })
}

export function getScoresCommission() {
    return new Promise((resolve) => {
        apiClient.get(`${apiKey}/scores_commission`)
            .then(res => res.data)
            .then(resolve)
            .catch(err => console.error(err))
    })
}

export function getScoresCommissions() {
    return new Promise((resolve) => {
        apiClient.get(`${apiKey}/scores_commissions`)
            .then(res => res.data)
            .then(resolve)
            .catch(err => console.error(err))
    })
}


export function getSuperMontant() {
    return new Promise((resolve) => {
        apiClient.get(`${apiKey}/top5desupermontant`)
            .then(res => res.data)
            .then(resolve)
            .catch(err => console.error(err))
    });
};

export function getTopCinq() {
    return new Promise((resolve) => {
        apiClient.get(`${apiKey}/top5demeilleurdepotjour`)
            .then(res => res.data)
            .then(resolve)
            .catch(err => console.error(err))
    });
};

export function supprimerClient(id) {
    return apiClient.delete(`${apiKey}/delete_client/${id}`).then((res) => res.data).catch((err) => console.error(err));
}

export function addRetrait(val) {
    return apiClient.post(`${apiKey}/add_retrait`, val).then((res) => res.data).catch((err) => console.error(err));
}

export function addDepot(val) {
    return apiClient.post(`${apiKey}/add_depot`, val).then((res) => res.data).catch((err) => console.error(err));
}

export function createClient(val) {
    return apiClient.post(`${apiKey}/create_client`, val).then((res) => res.data).catch((err) => console.error(err));
}

export function updateClient(val, id) {
    return apiClient.put(`${apiKey}/update_clien/${id}`, val).then((res) => res.data).catch((err) => console.error(err));
}