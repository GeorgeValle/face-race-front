 // Function for format price numbers
    export const formatNumber = (number) => {
        return number.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };  