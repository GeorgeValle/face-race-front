//import React from 'react'
import Style from './MidTotal.module.css'
import {formatNumber} from '../../../utils/amountUtils/formatNumber'



const MidTotal = ({subTotal=0, adjustment=0, total=0}) => {

    // Function for format numbers
    // const formatNumber = (number) => {
    //     return number.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    // };

    return (
        <article className={Style.midTotal}>
            <div className={Style.subtotal}>
                <h4 >Subtotal:</h4> <h4>$ {formatNumber(subTotal)}</h4>
            </div>
            <div className={Style.descuento}>
                <h4>Descuento/Recargo:</h4><h4>$ {formatNumber(adjustment)}</h4>
            </div>
            <div className={Style.totals}>
                <h2>TOTAL:</h2><h2>$ {formatNumber(total)}</h2>
            </div>
        </article>
    )
}

export default MidTotal