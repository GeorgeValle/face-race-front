import './TableQuotation.module.css';
import Style from './TableQuotation.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencil } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

// deleteRow, editRow

export const TableQuotation = ({ rows , size=false}) => {
    const itemsPerPage = 6; // Número de items por página
    const [currentPage, setCurrentPage] = useState(0); // Página actual

    // Calcular el índice de inicio y fin de los items a mostrar
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    //const currentItems = rows.slice(startIndex, endIndex); // Items a mostrar en la página actual
    // Crear un array de items a mostrar, rellenando con objetos vacíos si es necesario
    const currentItems = [...rows.slice(startIndex, endIndex), ...Array(Math.max(0, itemsPerPage - rows.length)).fill({ code: '', item: '', quantity: '', price: 0 })];

    // Calcular el número total de páginas
    const totalPages = Math.ceil(rows.length / itemsPerPage);

    // Funciones para cambiar de página
    const nextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Función para calcular el amount de cada item
    const calculateAmount = (quantity, price) => {
        return quantity * price;
    };

    // Función para sumar todos los amounts
    const sumTotalAmount = () => {
        return rows.reduce((total, row) => total + calculateAmount(row.quantity, row.price), 0);
    };

    const totalAmount = sumTotalAmount(); // Total de todos los amounts

    // Función para formatear números
    const formatNumber = (number) => {
        return number.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };  

    return (<div className={Style.table_wrapper}>
        <table className={`${Style.table} ${size?Style.sizeM:Style.sizeL}`}>
            <thead>
                <tr>
                    <th>Editar</th>
                    <th>Código</th>
                    <th className={Style.expand}>Artículo</th>
                    <th>Cant.</th>
                    <th>Uní.</th>
                    <th>Importe</th>
                </tr>
            </thead>
            <tbody>
                {
                    currentItems.map((row, idx) => {
                        //  const statusText = row.status.chartAt(0).toUpperCase() + row.status.slice(1);
                        const amount = calculateAmount(row.quantity, row.price); // Calcular el amount para cada item
                        return (
                            <tr key={idx}>
                                <td>
                                    <span className={Style.actions}>
                                        <FontAwesomeIcon icon={faTrash} className={Style.delete_btn} /*onClick={()=>deleteRow(idx)}*/ />
                                        <FontAwesomeIcon icon={faPencil} /*onClick={()=> editRow(idx)}*/ />
                                    </span>
                                </td>
                                <td>{row.code|| '-'}</td>
                                <td className={Style.expand}>{row.item || '-'}</td>
                                <td>{row.quantity||0}</td>
                                <td>
                                    $ {formatNumber(row.price)}
                                    {/* <span className={` ${Style.label} ${Style.label_`${row.status}`}`}>{statusText}</span> */}
                                </td>
                                <td>$ {formatNumber(amount)}</td>
                            </tr>
                        );

                    })
                }
            </tbody>
        </table>
        <div className={Style.pagination}>
                <button onClick={prevPage} disabled={currentPage === 0}>Anterior</button>
                <span>Página {currentPage + 1} de {totalPages}</span>
                <button onClick={nextPage} disabled={currentPage === totalPages - 1}>Siguiente</button>
        </div>
        <div className={Style.totalAmount}>
                <strong>Total Amount: $ {formatNumber(totalAmount)}</strong> {/* Mostrar el total de todos los amounts */}
        </div>
    </div>
    )
}