import axios from 'axios'

const string_uri = 'http://127.0.0.1:4500' 
const apiKey = 'ekonzo'


const apiClient = axios.create({ baseURL:  string_uri || ''})
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('ekonzo_token')
  if (token) {
    if (!config.headers) config.headers = {}
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

/***********************************\
 * ************ User ****************
\***********************************/

export function loginUser(credentials) {
  return apiClient.post(`${apiKey}/login`, credentials).then((res) => res.data)
};

export function singUp(val) {
    return apiClient.post(`${apiKey}/register`, val).then((res) => res.data).catch((err) => console.error(err));
};


/***********************************\
 ************* Client **************
\***********************************/

export function getClient() {
    return new Promise((resolve) => {
        apiClient.get(`${apiKey}/all_clients`)
            .then(res => res.data)
            .then(resolve);
    });
};

export function getSingleClient(id) {
    return new Promise((resolve) => {
        apiClient.get(`${apiKey}/client/${id}`)
            .then(res => res.data)
            .then(resolve);
    });
};

export function getAdresses() {
    return new Promise((resolve) => {
        apiClient.get(`${apiKey}/all_adresses`)
            .then(res => res.data)
            .then(resolve);
    });
};

export function getNbrCarte() {
    return new Promise((resolve) => {
        apiClient.get(`${apiKey}/nombre_carte`)
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

export function createClient(val) {
    return apiClient.post(`${apiKey}/create_client`, val).then((res) => res.data).catch((err) => console.error(err));
};

export function updateClient(val, id) {
    return apiClient.put(`${apiKey}/update_client/${id}`, val).then((res) => res.data).catch((err) => console.error(err));
}

export function supprimerClient(id) {
    return apiClient.delete(`${apiKey}/delete_client/${id}`).then((res) => res.data).catch((err) => console.error(err));
}

/***********************************\
 ************** Dépot ***************
\***********************************/

export function getDepots() {
    return new Promise((resolve) => {
        apiClient.get(`${apiKey}/all_depots`)
            .then(res => res.data)
            .then(resolve);
    });
};

export function getNbrDepot() {
    return new Promise((resolve) => {
        apiClient.get(`${apiKey}/nombre_de_depot`)
            .then(res => res.data)
            .then(resolve)
            .catch(err => console.error(err))
    })
};

export function getTopCinq() {
    return new Promise((resolve) => {
        apiClient.get(`${apiKey}/top5demeilleurdepotjour`)
            .then(res => res.data)
            .then(resolve)
            .catch(err => console.error(err))
    });
};

export function addDepot(val) {
    return apiClient.post(`${apiKey}/add_depot`, val).then((res) => res.data).catch((err) => console.error(err));
};

/***********************************\
 ************** Retrait ************
\***********************************/

export function getRetraits() {
    return new Promise((resolve) => {
        apiClient.get(`${apiKey}/all_retraits`)
            .then(res => res.data)
            .then(resolve);
    });
}

export function getEtatRetrait() {
    return new Promise((resolve) => {
        apiClient.get(`${apiKey}/etat_retraits`)
            .then(res => res.data)
            .then(resolve);
    });
}

export function getDettes() {
    return new Promise((resolve) => {
        apiClient.get(`${apiKey}/all_dettes`)
            .then(res => res.data)
            .then(resolve);
    });
}

export function getNbrRetrait() {
    return new Promise((resolve) => {
        apiClient.get(`${apiKey}/nombre_de_retrait`)
            .then(res => res.data)
            .then(resolve)
            .catch(err => console.error(err))
    })
}

export function addRetrait(val) {
    return apiClient.post(`${apiKey}/add_retrait`, val).then((res) => res.data).catch((err) => console.error(err));
};