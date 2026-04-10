import axios from 'axios';

/**
 * Dans cette page index.js ce trouve presque tous nos appel reseaux
 * Dont d'autre ont été appel à partire de router
 */

const string_uri = "http://127.0.0.1:4500";
const apiKey = "ekonzo";


export function getClient() {
    return new Promise((resolve) => {
        axios.get(`${string_uri}/${apiKey}/all_clients`)
            .then(res => res.status === 200 && res.data)
            .then(resolve);
    });
}

 export function getScoreEkonzo() {
    return new Promise((resolve) => {
        axios.get(`${string_uri}/${apiKey}/score_ekonzo`)
            .then(res => res.status === 200 && res.data)
            .then(resolve)
            .catch(err => console.error(err))
    })
}


export function getNbrDepot() {
    return new Promise((resolve) => {
        axios.get(`${string_uri}/${apiKey}/nombre_de_depot`)
            .then(res => res.status === 200 && res.data)
            .then(resolve)
            .catch(err => console.error(err))
    })
}

export function getNbrRetrait() {
    return new Promise((resolve) => {
        axios.get(`${string_uri}/${apiKey}/nombre_de_retrait`)
            .then(res => res.status === 200 && res.data)
            .then(resolve)
            .catch(err => console.error(err))
    })
}

export function getNbrCarte() {
    return new Promise((resolve) => {
        axios.get(`${string_uri}/${apiKey}/nombre_carte`)
            .then(res => res.status === 200 && res.data)
            .then(resolve)
            .catch(err => console.error(err))
    })
}


export function getScoresDepot() {
    return new Promise((resolve) => {
        axios.get(`${string_uri}/${apiKey}/scores_depot`)
            .then(res => res.status === 200 && res.data)
            .then(resolve)
            .catch(err => console.error(err))
    })
}

export function getScoresDepots() {
    return new Promise((resolve) => {
        axios.get(`${string_uri}/${apiKey}/scores_depots`)
            .then(res => res.status === 200 && res.data)
            .then(resolve)
            .catch(err => console.error(err))
    })
}


export function getScoresRetrait() {
    return new Promise((resolve) => {
        axios.get(`${string_uri}/${apiKey}/scores_retrait`)
            .then(res => res.status === 200 && res.data)
            .then(resolve)
            .catch(err => console.error(err))
    })
}

export function getScoresRetraits() {
    return new Promise((resolve) => {
        axios.get(`${string_uri}/${apiKey}/scores_retraits`)
            .then(res => res.status === 200 && res.data)
            .then(resolve)
            .catch(err => console.error(err))
    })
}

export function getScoresCommission() {
    return new Promise((resolve) => {
        axios.get(`${string_uri}/${apiKey}/scores_commission`)
            .then(res => res.status === 200 && res.data)
            .then(resolve)
            .catch(err => console.error(err))
    })
}

export function getScoresCommissions() {
    return new Promise((resolve) => {
        axios.get(`${string_uri}/${apiKey}/scores_commissions`)
            .then(res => res.status === 200 && res.data)
            .then(resolve)
            .catch(err => console.error(err))
    })
}


export function getSuperMontant() {
    return new Promise((resolve) => {
        axios.get(`${string_uri}/${apiKey}/top5desupermontant`)
            .then(res => res.status === 200 && res.data)
            .then(resolve)
            .catch(err => console.error(err))
    });
};

export function getTopCinq() {
    return new Promise((resolve) => {
        axios.get(`${string_uri}/${apiKey}/top5demeilleurdepotjour`)
            .then(res => res.status === 200 && res.data)
            .then(resolve)
            .catch(err => console.error(err))
    });
};

export function supprimerClient(id) {
    axios.delete(`${string_uri}/${apiKey}/delete_client/${id}`)
        .then(() => console.log("Suppression ok"))
        .catch((err) => console.error(err));
}

export function addRetrait(val) {
    axios.post(`${string_uri}/${apiKey}/add_retrait`, val)
        .then(res => res.status === 200 && res.data)
        .then(response => response.success && alert(response.message))
        .catch((err) => console.error(err));
}

export function addDepot(val) {
    axios.post(`${string_uri}/${apiKey}/add_depot`, val)
        .then(res => res.status === 200 && res.data)
        .then(response => response.success && alert(response.message))
        .catch((err) => console.error(err));
}

export function createClient(val) {
    axios.post(`${string_uri}/${apiKey}/create_client`, val)
        .then(res => res.status === 200 && res.data)
        .then(response => response.success && alert(response.message))
        .catch((err) => console.error(err));
}

export function updateClient(val, id) {
    axios.put(`${string_uri}/${apiKey}/update_clien/${id}`, val)
        .then(res => res.status === 200 && res.data)
        .then(response => response.success && alert(response.message))
        .catch((err) => console.error(err));
}