
import Style from './TextViewClient.module.css'

const TextViewClient = (TheClient) => {
  return (
    <div className={Style.client}>
        <table className={`${Style.table} ${Style.content}`}>
          <thead >
            <tr>
              <th colspan="4">DATOS DEL CLIENTE</th>
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
              <td>{TheClient.addres}</td>
              <th>Ciudad:</th>
              <td>{TheClient.city}</td>
            </tr>
            <tr>
              <th>Provincia:</th>
              <td>{TheClient.province}</td>
              <th>Código Postal:</th>
              <td>{TheClient.cp}</td>
            </tr>
            <tr>
              <th>Teléfono:</th>
              <td>{TheClient.phone}</td>
              <th>Celular:</th>
              <td>{TheClient.cel}</td>
            </tr>
            <tr>
              <th>Observación:</th>
              <td colspan="3">{TheClient.obs}</td>
            </tr>
          </tbody>
        </table>
    </div>
  )
}

export default TextViewClient