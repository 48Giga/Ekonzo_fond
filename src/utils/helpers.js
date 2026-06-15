

export const formatCurrent = (amout) => {
    return new Intl.NumberFormat("fr-CD", {
        style: "currency",
        currency: "CDF",
        minimumFractionDigits:0
    }).format( Number(amout) || 0)
}

function differenceEnMoisPrecise(date1, date2) {
    
    let mois = (date2.getFullYear() - date1.getFullYear()) * 12 + (date2.getMonth() - date1.getMonth());
    
    // Si le jour de la deuxième date est inférieur au jour de la première, 
    // le dernier mois n'est pas complètement révolu.
    if (date2.getDate() < date1.getDate()) {
        mois--;
    }
    
    return mois;
}


function differenceEnJours(date1, date2) {
   
    // 2. Calculer la différence en millisecondes
    const differenceMs = Math.abs(date2 - date1);
    
    // 3. Convertir les millisecondes en jours (1 jour = 24h * 60min * 60s * 1000ms)
    const msParJour = 1000 * 60 * 60 * 24;
    return Math.floor(differenceMs / msParJour);
}

export function tempCouler(date1, date2) {
    const mois = differenceEnMoisPrecise(date1, date2);
    const jours = differenceEnJours(date1, date2); 
    const interval = mois * 30; // Approximation: 1 mois = 30 jours
    const joursRestants = jours - interval;     
    return mois === 0 ? `${joursRestants} jours` : `${mois} mois et ${joursRestants} jours`;
}