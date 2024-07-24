
import Style from "./TableClient.module.css"


export const TableClient = ({row}) => {
    return (
        
            <table className={Style.table}>
                <thead>
                    <tr>
                        <th>ID Cliente</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Fecha / Hora</th>
                        <th>Correo</th>
                        <th>DNI</th>
                        <th>Tel.</th>
                        <th>Cel.</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{row.id}</td>
                        <td>{row.name}</td>
                        <td>{row.surname}</td>
                        <td>{row.date}</td>
                        <td>{row.email}</td>
                        <td>{row.dni}</td>
                        <td>{row.tel}</td>
                        <td>{row.cel}</td>
                    </tr>
                </tbody>
            </table>
       
    )
}