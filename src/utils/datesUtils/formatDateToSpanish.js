export function formatDateToSpanish(dateString) { 
    // Create a object Date whit a String
    const date = new Date(dateString);
    
    // Obtain day, month and year
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear();
    
    // Format to spanish DD-MM-YYYY
    return `${day}-${month}-${year}`;   
}

