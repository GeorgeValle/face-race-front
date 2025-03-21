import Style from './TableCategoryItems.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencil } from '@fortawesome/free-solid-svg-icons';

// deleteRow, editRow

export const TableCategoryItems = ({ rows, size=false, onEdit=null, onDelete=null}) => {
    return (<div className={Style.table_wrapper}>
        <table className={`${Style.table} ${size?Style.sizeM:Style.sizeL}`}>
            <thead>
                {/* <tr>
                        <th></th>
                    </tr> */}
                <tr>
                    <th>Editar</th>
                    <th>Código</th>
                    <th className={Style.expand}>Artículo</th>
                    <th>Cant.</th>
                    <th>Precio</th>
                    <th>Categoría</th>
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

                        return (
                            <tr key={idx}>
                                <td>
                                    <span className={Style.actions}>
                                        <FontAwesomeIcon icon={faTrash} className={Style.delete_btn} onClick={()=>onDelete(row.code)} />
                                        <FontAwesomeIcon icon={faPencil} onClick={()=> onEdit(row.code)} />
                                    </span>
                                </td>
                                <td>{row.code}</td>
                                <td className={Style.expand}>{`${row.name} ${row.brand}`}</td>
                                <td>{row.stockQuantity}</td>
                                <td>
                                    $ {row.price}
                                    {/* <span className={` ${Style.label} ${Style.label_`${row.status}`}`}>{statusText}</span> */}
                                </td>
                                <td> {row.category}</td>
                            </tr>
                        );

                    })
                }
            </tbody>
        </table>
    </div>
    )
}