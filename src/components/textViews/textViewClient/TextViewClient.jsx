
import Style from './TextViewClient.module.css'
import MiniBtn from '../../btns/miniBtn/MiniBtn'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faTrash, faPencil} from "@fortawesome/free-solid-svg-icons"

// ,onEdit=null, onDelete=null
//<div className={Style.row_title}><MiniBtn onClick={onEdit} isWhite={true}><FontAwesomeIcon icon={faPencil}/></MiniBtn><MiniBtn onClick={onDelete} isRed={true}><FontAwesomeIcon icon={faTrash}/></MiniBtn></div>

const TextViewClient = ({TheClient=null,onEdit=null, onDelete=null }) => {
  return (
    <div className={Style.client}>
      <div className={Style.row_title}><MiniBtn onClick={onEdit} isWhite={true}><FontAwesomeIcon icon={faPencil}/></MiniBtn><MiniBtn onClick={onDelete} isRed={true}><FontAwesomeIcon icon={faTrash}/></MiniBtn></div>
        <table className={`${Style.table} ${Style.content}`}>
          <thead >
            <tr>
              <th colSpan="4" >DATOS DEL CLIENTE</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Email:</th>
              <td>{TheClient.email}</td>
              <th>DNI/CUIT:</th>
              <td>{TheClient.dni}</td>
            </tr>
            <tr>
              <th>Nombre:</th>
              <td>{TheClient.name}</td>
              <th>Apellido:</th>
              <td>{TheClient.surname}</td>
            </tr>
            <tr>
              <th>Dirección:</th>
              <td>{TheClient.address}</td>
              <th>Ciudad:</th>
              <td>{TheClient.city}</td>
            </tr>
            <tr>
              <th>Provincia:</th>
              <td>{TheClient.province}</td>
              <th>Código Postal:</th>
              <td>{TheClient.postalCode}</td>
            </tr>
            <tr>
              <th>Teléfono:</th>
              <td>{TheClient.phone}</td>
              <th>Celular:</th>
              <td>{TheClient.cel}</td>
            </tr>
            <tr>
              <th>Observación:</th>
              <td colSpan="3">{TheClient.description}</td>
            </tr>
          </tbody>
        </table>
    </div>
  )
}

export default TextViewClient