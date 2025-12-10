//import './TableQuotation.module.css';
import Style from './TableAppointmentsClient.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
// import EditQuantityItemModal from '../../modals/editQuantityItemModal/EditQuantityItemModal';
// import Dialog from '../../modals/dialog/Dialog';

// deleteRow, editRow

export const TableAppointmentsClient = ({ appointments, size = false, perPage = 6, onShow = null }) => {
    const itemsPerPage = perPage; // Número de items por página
    const [currentPage, setCurrentPage] = useState(0); // Página actual
    // const [isModalQuantity, setIsModalQuantity] = useState(false);
    // const [isDialog, setIsDialog] = useState(false);
    // const [defaultQuantity, setDefaultQuantity] = useState(0);
    // const [defaultCode, setdefaultCode] = useState(0);
    // const [init, setInit]=useState(false)

    //Handles 
    // handle quantity
    // const handleClose = () =>{
    //     setIsDialog(false);
    //     setIsModalQuantity(false);
    // }
    // const handleEditQuantity = (code, quantity) => {
    //     setDefaultQuantity(quantity);
    //     setdefaultCode(code);
    //     setIsModalQuantity(true);
    //     }

    // const handleCheckedStatus = (code, checked, quantity) =>{
    //     try{
    //         editChecked(code, checked, quantity)
    //         setInit(true)
    //     }catch(error)
    //     {
    //         setInit(false)
    //     }
    // }

    //handleDeleteRow
    // const handleModalDialogDeleteRow = (code) => {
    //     setDefaultQuantity(0);
    //     setdefaultCode(code);
    //     setIsDialog(true);
    //     }

    // const handleDeleteRow = () =>{
    //     setIsDialog(false);
    //     modalRemoveItem(defaultCode);
    // }

    // calculate index start and end of appointments to show
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    //const currentItems = rows.slice(startIndex, endIndex); // Items a mostrar en la página actual


    // Crear un array de items a mostrar, rellenando con objetos vacíos si es necesario
    const currentItems = [...appointments.slice(startIndex, endIndex), ...Array(Math.max(0, itemsPerPage - appointments.length)).fill({ dni: '', shiftDate:'', timeSlot: '', status: '-' })];

    // useEffect(() => {
    //     const currentItems = [...rows.slice(startIndex, endIndex), ...Array(Math.max(0, itemsPerPage - rows.length)).fill({ code: '', item: '', quantity: '', price: 0 })];
    //     setCurrentItems(currentItems);
    //   }, [rows, startIndex, endIndex, itemsPerPage]);

    // Calculate the total number of pages 
    const totalPages = Math.ceil(appointments.length / itemsPerPage);

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

    // Function for calculate amount of each item 
    // const calculateAmount = (quantity, price) => {
    //     return quantity * price;
    // };

    // Function for add all amounts 
    // const sumTotalAmount = () => {
    //     return rows.reduce((total, row) => total + calculateAmount(row.quantity, row.price), 0);
    // };

    // const totalAmount = sumTotalAmount(); // Total de todos los amounts

    // totals(totalAmount);

    function formatDateToSpanish(dateString) {

        if (dateString) {
            // Create a object Date whit a String
            const date = new Date(dateString);

            // Obtain day, month and year
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();

            // Format to spanish DD-MM-YYYY
            return `${day}-${month}-${year}`;
        } else {
            return " - "
        }
    }

    function formatEnglish(dateString){
        if (dateString) {
        // Create a object Date whit a String
            const date = new Date(dateString);

            // Obtain day, month and year
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();

            // Format to spanish DD-MM-YYYY
            return `${month}-${day}-${year}`;
        } else {
            return " - "
        }
    }

    function formatHour(hour) {
        switch (hour) {
            case '10-12':
                return '10:00 a 12:00';

            case '13-15':
                return '13:00 a 15:00';

            case '16-18':
                return '16:00 a 18:00';

            default:
                return "-";
        }
    }

    function formatStatus(status) {
        switch (status) {
            case 'pending':
                return 'Pendiente';

            case 'attended':
                return 'Atendido';

            case 'canceled':
                return 'Cancelado';
            case 'missing':
                return 'Ausente';

            default:
                return '-';
        }
    }
        const handleOnShow = (shiftDate,timeSlot) => {
            onShow(shiftDate,timeSlot)
        }

        // Function for format price numbers
        // const formatNumber = (number) => {
        //     return number.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        // };  

        return (<div className={Style.table_wrapper}>
            {/* isDialog&&<Dialog onSubmit={handleDeleteRow} messageModal={"Seguro quiere eliminar este Árticulo"} messageConfirm={"Eliminar"} onClose={handleClose} ></Dialog> */}
            {/* isModalQuantity&&<EditQuantityItemModal onSubmit={modalUpdateItem} initQuantity={defaultQuantity} code={defaultCode}  onClose={handleClose} ></EditQuantityItemModal> */}
            <table className={`${Style.table} ${size ? Style.sizeM : Style.sizeL}`}>
                <thead>
                    <tr>
                        <th>Ver</th>
                        <th>DNI</th>
                        <th >Fecha</th>
                        <th>Hora</th>
                        <th>Estado</th>
                        {/* <th>DNI</th> */}
                    </tr>
                </thead>
                <tbody>
                    {
                        currentItems.map((row, idx) => {
                            //  const statusText = row.status.chartAt(0).toUpperCase() + row.status.slice(1);
                            //const amount = calculateAmount(row.quantity, row.price); // Calcular el amount para cada item

                            return (
                                <tr key={idx}>
                                    <td>
                                        {row.dni && (
                                            <span className={Style.actions}>
                                                <FontAwesomeIcon icon={faMagnifyingGlass} className={`${Style.magnifying_glass}`} onClick={() => handleOnShow(formatEnglish(row.shiftDate), row.timeSlot)} />
                                                {/*isEdit&&<FontAwesomeIcon icon={faMagnifyingGlass} className={`${row.checked?Style.unpen_btn:Style.pen_btn} ${init&&Style.checked_init}`} onClick={()=> handleEditQuantity(row.code||0, row.quantity||0) } />*/}
                                                {/*isChecked&&<FontAwesomeIcon icon={faCircleCheck} className={`${row.checked?Style.checked:Style.unchecked} ${init&&Style.checked_init}`} onClick={()=> handleCheckedStatus(row.code||0, row.checked||false, row.quantity||0) } /> */}
                                            </span>
                                        ) || '-'}
                                    </td>
                                    <td className={`${Style.expand}`}>{row.dni || '-'}</td>
                                    <td >{formatDateToSpanish(row.shiftDate) || '-'}</td>
                                    <td>{formatHour(row.timeSlot) || 0}</td>
                                    <td>
                                        {formatStatus(row.status)}
                                        {/* <span className={` ${Style.label} ${Style.label_`${row.status}`}`}>{statusText}</span> */}
                                    </td>
                                    {/* <td>$ {formatNumber(amount)}</td> */}
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