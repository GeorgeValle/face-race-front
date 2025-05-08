export function getConcatenatedTypes(selectedSale) {
    if(!selectedSale|| !selectedSale.payment) return "";
    return selectedSale.payment
    .map(payment => payment.type)
    .join(' ')
}