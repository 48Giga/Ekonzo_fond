

export const formatCurrent = (amout) => {
    return new Intl.NumberFormat("fr-CD", {
        style: "currency",
        currency: "CDF",
        minimumFractionDigits:0
    }).format( Number(amout) || 0)
}