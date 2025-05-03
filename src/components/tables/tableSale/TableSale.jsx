//import './TableQuotation.module.css';
import Style from './TableSale.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencil } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
//import EditQuantityItemModal from '../../modals/editQuantityItemModal/EditQuantityItemModal';
import Dialog from '../../modals/dialog/Dialog';
import {formatArgentineDate} from '../../../utils/datesUtils/formatArgentineDate'


// deleteRow, editRow

export const TableSale = ({ rows , size=false, totals=null, modalDesahibilitySale=null, modalUpdateSale=null, isEdit=false}) => {
    const itemsPerPage = 6; // Número de items por página
    const [currentPage, setCurrentPage] = useState(0); // Página actual
    //const [isModalQuantity, setIsModalQuantity] = useState(false);
    const [isDialog, setIsDialog] = useState(false);
    const [defaultQuantity, setDefaultQuantity] = useState(0);
    const [defaultNumberSale, setDefaultNumberSale] = useState(0);

    //Handles 
    // handle quantity
    const handleClose = () =>{
        setIsDialog(false);
        //setIsModalQuantity(false);
    }
    const handleEditQuantity = (code, quantity) => {
        setDefaultQuantity(quantity);
        setDefaultNumberSale(code);
        //setIsModalQuantity(true);
        }

        //handleDeleteRow
        const handleModalDialogDeleteRow = (code) => {
            setDefaultQuantity(0);
            setDefaultNumberSale(code);
            setIsDialog(true);
            }

        const handleDeleteRow = () =>{
            setIsDialog(false);
            //modalRemoveSale(defaultNumberSale);
        }
    // Calcular el índice de inicio y fin de los items a mostrar
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentSales = rows.slice(startIndex, endIndex); // Items a mostrar en la página actual
    
    
    // Crear un array de items a mostrar, rellenando con objetos vacíos si es necesario
    //const currentSales = [...rows.slice(startIndex, endIndex), ...Array(Math.max(0, itemsPerPage - rows.length)).fill({ saleDate: '', saleNumber: '', name:"" , type: '', total: 0 })];

    // useEffect(() => {
    //     const currentItems = [...rows.slice(startIndex, endIndex), ...Array(Math.max(0, itemsPerPage - rows.length)).fill({ code: '', item: '', quantity: '', price: 0 })];
    //     setCurrentItems(currentItems);
    //   }, [rows, startIndex, endIndex, itemsPerPage]);

    // Calculate the total number of pages 
    const totalPages = Math.ceil(rows.length / itemsPerPage);

    // Function for change the page
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

    

    

    //const getConcatenatedTypes = () => {
    //    return rows
    //    .flatMap(item => item.payment)// flat the payment array
    //   .map(payment => payment.type)// Extract the atribute type
    //    .join(' ')//concatenated whit spaces
    //}
    const getConcatenatedTypes = (selectedSale) => {
        if(!selectedSale|| !selectedSale.payment) return "";
        return selectedSale.payment
        .map(payment => payment.type)
        .join(' ')
    }

    const getConcatenatedFullName = (selectedSale)=>{
        let fullName
        if(!selectedSale||!selectedSale.client||selectedSale.client.name) return "";
        fullName=`${selectedSale.client.name} ${selectedSale.client.surname}`
        return fullName

    }



    

    // Function for format price numbers
    const formatNumber = (number) => {
        return number.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };  
    
    //function for calculate all amount the itemList
    const calculateTotalAmount = (selectedSale) =>{
        if(!selectedSale||!selectedSale.itemList) return 0;
        return selectedSale.itemList.reduce((total, concurrent)=> total + concurrent.amount, 0)
    }

    const calculateAllSalesAmount = () =>{
        return rows
        .flatMap(item=> item.itemList)
        .reduce((total, current)=> total + current.amount, 0);
    }

    totals(calculateAllSalesAmount())

    return (<div className={Style.table_wrapper}>
        {isDialog&&<Dialog onSubmit={handleDeleteRow} messageModal={"Seguro quiere eliminar este Árticulo"} messageConfirm={"Eliminar"} onClose={handleClose} ></Dialog>}
        {/*isModalQuantity&&<EditQuantityItemModal onSubmit={modalUpdateItem} initQuantity={defaultQuantity} code={defaultCode}  onClose={handleClose} ></EditQuantityItemModal> */}
        <table className={`${Style.table} ${size?Style.sizeM:Style.sizeL}`}>
            <thead>
                <tr>
                    <th>Editar</th>
                    <th >Fecha</th>
                    <th>Número</th>                    
                    <th className={Style.expand}>Cliente</th>
                    <th >Método</th>
                    <th>Importe</th>
                </tr>
            </thead>
            <tbody>
                {
                    currentSales.map((row, idx) => {
                        //  const statusText = row.status.chartAt(0).toUpperCase() + row.status.slice(1);
                        //const amount = calculateAmount(row.quantity, row.price); // Calcular el amount para cada item

                        //let name = `${row.client.name}`
                        
                        console.log(row)
                        return (
                            <tr key={idx}>
                                <td>
                                    <span className={Style.actions}>
                                        <FontAwesomeIcon icon={faTrash} className={Style.delete_btn} onClick={()=>handleModalDialogDeleteRow(row.code||0)} />
                                        {isEdit&&<FontAwesomeIcon icon={faPencil} onClick={()=> handleEditQuantity(row.code||0, row.quantity||0) } />}
                                    </span>
                                </td>
                                <td >{formatArgentineDate(row.saleDate) || '-'}</td>
                                <td>{row.saleNumber|| '-'}</td>
                                <td className={Style.expand} >{/*getConcatenatedFullName(row)*/`${row.client.name} ${row.client.surname}`|| '-'}</td>
                                <td>
                                    {getConcatenatedTypes(row)||'-'}
                                    {/* $ {formatNumber(row.price)}*/}
                                    {/* <span className={` ${Style.label} ${Style.label_`${row.status}`}`}>{statusText}</span> */}
                                </td>
                                <td>$ {formatNumber(calculateTotalAmount(row))||  '-'}</td>
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