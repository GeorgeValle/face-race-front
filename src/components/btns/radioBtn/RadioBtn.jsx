import React from 'react'
import Style from './RadioBtn.module.css';

const RadioBtn = (nameRadio="final", valueRadio="final", titleRadio="Cliente Final:" ) => {
    return (
        <div>
            <label className={Style.label}For={nameRadio}>{titleRadio}</label>
            <input type="radio" id={nameRadio} name={nameRadio} value={valueRadio}/>
        </div>
    )
}

export default RadioBtn