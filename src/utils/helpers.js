

export const formatCurrent = (amout) => {
    return new Intl.NumberFormat("fr-CD", {
        style: "currency",
        currency: "CDF",
    }).format( Number(amout) || 0)
}