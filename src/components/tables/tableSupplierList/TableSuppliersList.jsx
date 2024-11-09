
import Style from './TableSupplierList.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencil } from '@fortawesome/free-solid-svg-icons';

// deleteRow, editRow

export const TableSupplierList = ({ rows , size=false}) => {
    return (<div className={Style.table_wrapper}>
        <table className={`${Style.table} ${size?Style.sizeM:Style.sizeL}`}>
            <thead>
                {/* <tr>
                        <th></th>
                    </tr> */}
                <tr>
                    <th>Editar</th>
                    <th>Cuit</th>
                    <th className={Style.expand}>Nombre</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Código Postal</th>
                </tr>


                {/* <tr>
                 <th>Page</th>
                 <th className={Style.expand}>Description</th>
                 <th>Status</th>
                 <th>Actions</th>
             </tr> */}
            </thead>
            <tbody>
                {
                    rows.map((row, idx) => {
                        //  const statusText = row.status.chartAt(0).toUpperCase() + row.status.slice(1);
                        return(
                            <tr key={idx}>
                                <td>
                                    <span className={Style.actions}>
                                        <FontAwesomeIcon icon={faTrash} className={Style.delete_btn} /*onClick={()=>deleteRow(idx)}*/ />
                                        <FontAwesomeIcon icon={faPencil} /*onClick={()=> editRow(idx)}*/ />
                                    </span>
                                </td>
                                <td>{row.cuit}</td>
                                <td className={Style.expand}>{row.businessName}</td>
                                <td>{row.email}</td>
                                <td>
                                    {row.address}
                                    {/* <span className={` ${Style.label} ${Style.label_`${row.status}`}`}>{statusText}</span> */}
                                </td>
                                <td> {row.postalCode}</td>
                            </tr>
                        );

                    })
                }
            </tbody>
        </table>
    </div>
    )
}