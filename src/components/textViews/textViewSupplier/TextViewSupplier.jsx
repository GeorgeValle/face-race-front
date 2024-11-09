import Style from './TextViewSupplier.module.css'
import MiniBtn from '../../btns/miniBtn/MiniBtn'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faPencil } from "@fortawesome/free-solid-svg-icons"

// ,onEdit=null, onDelete=null
//<div className={Style.row_title}><MiniBtn onClick={onEdit} isWhite={true}><FontAwesomeIcon icon={faPencil}/></MiniBtn><MiniBtn onClick={onDelete} isRed={true}><FontAwesomeIcon icon={faTrash}/></MiniBtn></div>

const TextViewSupplier = ({ TheSupplier = null, onEdit = null, onDelete = null }) => {
    return (
        <div className={Style.supplier}>
            <div className={Style.row_title}><MiniBtn onClick={onEdit} isWhite={true}><FontAwesomeIcon icon={faPencil} /></MiniBtn><MiniBtn onClick={onDelete} isRed={true}><FontAwesomeIcon icon={faTrash} /></MiniBtn></div>
            <table className={`${Style.table} ${Style.content}`}>
                <thead >
                    <tr>
                        <th colSpan="4" >DATOS DEL PROVEEDOR</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>Email:</th>
                        <td>{TheSupplier.email}</td>
                        <th>DNI/CUIT:</th>
                        <td>{TheSupplier.cuit}</td>
                    </tr>
                    <tr>
                        <th>Nombre comercial:</th>
                        <td>{TheSupplier.businessName}</td>
                        <th>Razón Social:</th>
                        <td>{TheSupplier.companyName}</td>
                    </tr>
                    <tr>
                        <th>Dirección:</th>
                        <td>{TheSupplier.address}</td>
                        <th>Ciudad:</th>
                        <td>{TheSupplier.city}</td>
                    </tr>
                    <tr>
                        <th>Provincia:</th>
                        <td>{TheSupplier.province}</td>
                        <th>Código Postal:</th>
                        <td>{TheSupplier.postalCode}</td>
                    </tr>
                    <tr>
                        <th>Teléfono:</th>
                        <td>{TheSupplier.phone}</td>
                        <th>Celular:</th>
                        <td>{TheSupplier.cel}</td>
                    </tr>
                    <tr>
                        <th>Ramo:</th>
                        <td>{TheSupplier.coreBusiness}</td>
                        <th>Observación:</th>
                        <td >{TheSupplier.description}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default TextViewSupplier