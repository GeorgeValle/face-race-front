// errorHandling.js
export function handleError(error) {
    if (error.response) {
        switch (error.response.status) {
            case 400:
                return 'Error de solicitud. Por favor, revise los datos.';
                
            case 401:
                return 'No autorizado. Por favor, inicie sesión.';
                
            case 403:
                return 'Acceso denegado. No tiene permiso para acceder a este recurso.';
            
            case 404:
                return 'No encontrado.';
            
            case 500:
                return 'Error interno del servidor. Por favor, inténtelo más tarde.';
                
            case 422:
                return 'Error de validación';
                
            case 409:
                return 'Error de conflicto. Por favor, inténtelo más tarde.';
                
            default:
                return 'Error desconocido. Por favor, inténtelo más tarde.';
                
        }
    } else {
        return 'Error desconocido. Por favor, inténtelo más tarde.';
    }
}