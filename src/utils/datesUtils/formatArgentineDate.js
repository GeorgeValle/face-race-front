export function formatArgentineDate(isoDate) {
    const date = new Date(isoDate);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // months init in 0 i js
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}