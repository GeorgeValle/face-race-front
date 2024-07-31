import './TableQuotation.module.css';
import Style from './TableQuotation.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash,faPencil} from '@fortawesome/free-solid-svg-icons';

// deleteRow, editRow

export const TableQuotation = ({rows}) =>{
    return( <div className={Style.table_wrapper}>
     <table className={Style.table}>
         <thead>
                    {/* <tr>
                        <th></th>
                    </tr> */}
            <tr>
                <th>Editar</th>
                <th>Código</th>
                <th className={Style.expand}>Artículo</th>
                <th>Cant.</th>
                <th>Uní.</th>
                <th>Importe</th>
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
                 rows.map((row, idx)=>{
                    //  const statusText = row.status.chartAt(0).toUpperCase() + row.status.slice(1);
                     
                     return( 
                        <tr key={idx}>
                                <td>
                                    <span className={Style.actions}>
                                        <FontAwesomeIcon icon={faTrash} className={Style.delete_btn} /*onClick={()=>deleteRow(idx)}*//>
                                        <FontAwesomeIcon icon={faPencil} /*onClick={()=> editRow(idx)}*/ />                                   
                                    </span>
                                </td>
                                <td>{row.code}</td>
                                <td className={Style.expand}>{row.item}</td>
                                <td>{row.quantity}</td>
                                <td>
                                    $ {row.price}
                                    {/* <span className={` ${Style.label} ${Style.label_`${row.status}`}`}>{statusText}</span> */}
                                </td>
                                <td>$ {row.amount}</td>  
                        </tr>
                        ) ;  
                        
                    } )
            }
         </tbody>
     </table>
   </div>
 )}