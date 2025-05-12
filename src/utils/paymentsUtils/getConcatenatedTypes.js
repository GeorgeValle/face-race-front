export function getConcatenatedTypes(selectedSale) {
    if(!selectedSale|| !selectedSale.payment) return "";
    return selectedSale.payment
    .map(payment =>{
        switch(payment.type){
            case "cash":
                return "Efectivo";
                
            case "credit":
                return "Credito"
                
            case "debit":
                return "Debito";
                
            case "currentAccount":
                return "Cuenta Corriente";
                
            case "check":
                return "Cheque";
                
    }})
    .join(', ')
}