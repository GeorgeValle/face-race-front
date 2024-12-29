
import Style from "./TableClient.module.css"


export const TableClient = ({client}) => {
    return (
        
            <table className={Style.table}>
                <thead>
                    <tr>
                        {/* <th>ID Cliente</th> */}
                        <th>Nombre</th>
                        <th>Apellido</th>
                        {/* <th>Fecha</th> */}
                        <th>Correo</th>
                        <th>DNI</th>
                        <th>Tel.</th>
                        <th>Cel.</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {/* <td>{client._id==null?"":client._id}</td> */}
                        <td>{client.name==null?"":client.name}</td>
                        <td>{client.surname==null?"":client.surname}</td>
                        {/* <td>{client.date==null?"":client.date}</td> */}
                        <td>{client.email==null?"":client.email}</td>
                        <td>{client.dni==null?"":client.dni}</td>
                        <td>{client.phone==null?"":client.phone}</td>
                        <td>{client.cel==null?"":client.cel}</td>
                    </tr>
                </tbody>
            </table>
    )
}