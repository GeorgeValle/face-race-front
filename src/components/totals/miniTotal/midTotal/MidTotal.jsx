import React from 'react'
import Style from './MidTotal.module.css'

const MidTotal = () => {
    return (
        <article className={Style.MidTotal}>
            <div className={Style.subtotal}>
                <span></span>
            </div>
            <div className={Style.descuento}>
                <span></span>
            </div>
            <div className={Style.total}>
                <span></span>
            </div>
        </article>
    )
}

export default MidTotal