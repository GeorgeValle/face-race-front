 //Function for format price numbers

    export const formatNumber = (number) => {
        //let final = parseFloat(number)
        return (number || 0).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };  
    // export const formatNumber = (number) => {
    // if (!isNaN(number)) {
    //         return number.toLocaleString('es-AR', {
    //             minimumFractionDigits: 2,
    //             maximumFractionDigits: 2,
    //         });
    //     } else {
    //         return 0
    //     }
    // }

    