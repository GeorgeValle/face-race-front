import "./Table.module.css";
import Style from "./Table.module.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash,faPencil} from "@fortawesome/free-solid-svg-icons";

export const Table = (rows, deleteRow, editRow) =>{
    return( <div className={Style.table_wrapper}>
     <table className={Style.table}>
         <thead>
         
             <tr>
                 <th>Page</th>
                 <th className={Style.expand}>Description</th>
                 <th>Status</th>
                 <th>Actions</th>
             </tr>
         </thead>
         <tbody>
             {
                 rows.map((row, idx)=>{
                     const statusText = row.status.chartAt(0).toUpperCase() + row.status.slice(1);
                     
                     return( 
                        <tr key={idx}>
                                <td>{row.page}</td>
                                <td className={Style.expand}>{row.description}</td>
                                <td>
                                    <span className={` ${Style.label} ${Style.label_`${row.status}`}`}>{statusText}</span>
                                </td>
                                <td>
                                    <span className={Style.actions}>
                                        <FontAwesomeIcon icon={faTrash} className={Style.delete_btn} onClick={()=>deleteRow(idx)}/>
                                        <FontAwesomeIcon icon={faPencil} onClick={()=> editRow(idx)} />                                   
                                    </span>
                                </td>
                        </tr>
                        ) ;  
                        
                    } )
            }
         </tbody>
     </table>
   </div>
 )}