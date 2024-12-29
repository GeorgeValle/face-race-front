import './TableQuotation.module.css';
import Style from './TableQuotation.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencil } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import EditQuantityItemModal from '../../modals/editQuantityItemModal/EditQuantityItemModal';
import Dialog from '../../modals/dialog/Dialog';

// deleteRow, editRow

export const TableQuotation = ({ rows , size=false, totals=null, modalRemoveItem=null, modalUpdateItem=null}) => {
    const itemsPerPage = 6; // Número de items por página
    const [currentPage, setCurrentPage] = useState(0); // Página actual
    const [isModalQuantity, setIsModalQuantity] = useState(false);
    const [isDialog, setIsDialog] = useState(false);
    const [defaultQuantity, setDefaultQuantity] = useState(0);
    const [defaultCode, setdefaultCode] = useState(0);

    //Handles 
    // handle quantity
    const handleClose = () =>{
        setIsDialog(false);
        setIsModalQuantity(false);
    }
    const handleEditQuantity = (code, quantity) => {
        setDefaultQuantity(quantity);
        setdefaultCode(code);
        setIsModalQuantity(true);
        }

        //handleDeleteRow
        const handleModalDialogDeleteRow = (code) => {
            setDefaultQuantity(0);
            setdefaultCode(code);
            setIsDialog(true);
            }

        const handleDeleteRow = () =>{
            setIsDialog(false);
            modalRemoveItem(defaultCode);
        }
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

    totals(totalAmount);

    // Función para formatear números
    const formatNumber = (number) => {
        return number.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };  

    return (<div className={Style.table_wrapper}>
        {isDialog&&<Dialog onSubmit={handleDeleteRow} messageModal={"Seguro quiere eliminar este Árticulo"} messageConfirm={"Eliminar"} onClose={handleClose} ></Dialog>}
        {isModalQuantity&&<EditQuantityItemModal onSubmit={modalUpdateItem} initQuantity={defaultQuantity} code={defaultCode}  onClose={handleClose} ></EditQuantityItemModal>}
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
                                        <FontAwesomeIcon icon={faTrash} className={Style.delete_btn} onClick={()=>handleModalDialogDeleteRow(row.code||0)} />
                                        <FontAwesomeIcon icon={faPencil} onClick={()=> handleEditQuantity(row.code||0, row.quantity||0) } />
                                    </span>
                                </td>
                                <td>{row.code|| '-'}</td>
                                <td className={Style.expand}>{row.name || '-'}</td>
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
                <button className={Style.btn} onClick={prevPage} disabled={currentPage === 0}>Anterior</button>
                <span>Página {currentPage + 1} de {totalPages}</span>
                <button className={Style.btn} onClick={nextPage} disabled={currentPage === totalPages - 1}>Siguiente</button>
        </div>
    
    </div>
    )
}