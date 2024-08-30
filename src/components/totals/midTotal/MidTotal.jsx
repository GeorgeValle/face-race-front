import React from 'react'
import Style from './MidTotal.module.css'

const MidTotal = (subTotal=0, recargo=0, total=0) => {
    return (
        <article className={Style.midTotal}>
            <div className={Style.subtotal}>
                <h4>Subtotal:</h4><h4>$ {subTotal}</h4>
            </div>
            <div className={Style.descuento}>
                <h4>Descuento/Recargo:</h4><h4>$ {recargo}</h4>
            </div>
            <div className={Style.totals}>
                <h2>TOTAL:</h2><h2>{total}</h2>
            </div>
        </article>
    )
}

export default MidTotal