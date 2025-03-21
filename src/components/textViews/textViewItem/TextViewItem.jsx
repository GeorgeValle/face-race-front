import Style from './TextViewItem.module.css'
import MiniBtn from '../../btns/miniBtn/MiniBtn'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faPencil } from "@fortawesome/free-solid-svg-icons"

// ,onEdit=null, onDelete=null
//<div className={Style.row_title}><MiniBtn onClick={onEdit} isWhite={true}><FontAwesomeIcon icon={faPencil}/></MiniBtn><MiniBtn onClick={onDelete} isRed={true}><FontAwesomeIcon icon={faTrash}/></MiniBtn></div>

const TextViewItem = ({ TheItem = null, onEdit = null, onDelete = null }) => {
    return (
        <div className={Style.item}>
            <div className={Style.row_title}><MiniBtn onClick={ onEdit} isWhite={true}><FontAwesomeIcon icon={faPencil} /></MiniBtn><MiniBtn onClick={() => onDelete(TheItem.code)} isRed={true}><FontAwesomeIcon icon={faTrash} /></MiniBtn></div>
            <table className={`${Style.table} ${Style.content}`}>
                <thead >
                    <tr>
                        <th colSpan="4" >DATOS DEL ARTÍCULO</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>Código:</th>
                        <td>{TheItem.code}</td>
                        <th>Nombre:</th>
                        <td>{TheItem.name}</td>
                    </tr>
                    <tr>
                        <th>Cantidad:</th>
                        <td>{TheItem.stockQuantity}</td>
                        <th>Precio:</th>
                        <td>{TheItem.price}</td>
                    </tr>
                    <tr>
                        <th>Categoría:</th>
                        <td>{TheItem.category}</td>
                        <th>Marca:</th>
                        <td>{TheItem.brand}</td>
                    </tr>
                    <tr>
                        <th>Modelo:</th>
                        <td>{TheItem.model}</td>
                        <th>Origen:</th>
                        <td>{TheItem.origin}</td>
                    </tr>
                    <tr>
                        <th>Ubicación:</th>
                        <td>{TheItem.warehouseLocation}</td>
                        <th>Observación:</th>
                        <td >{TheItem.description}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default TextViewItem