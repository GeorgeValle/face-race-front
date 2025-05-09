// format 
export const formatHourFromISO = (isoString) => {
    try {
        const date = new Date(isoString);
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    } catch (error) {
        console.error("Error al formatear la hora:", error);
        return ""; // O podrías devolver otro valor por defecto o lanzar el error
    }
};