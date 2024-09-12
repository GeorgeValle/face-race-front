import React from 'react';
import styleInput from './InputDate.module.css';

const InputDate = ({nameLabel="fecha", placeholderText="DD-MM-AAAA", data="", isLabel=true, titleLabel=""}) => {
    return (
        <div className={styleInput.form_date}>
            {
                    isLabel&&(<label for={nameLabel} className={styleInput.label}>{titleLabel}&nbsp;</label>)
                }
            <input autoComplete="off" name={nameLabel} id={nameLabel} className={styleInput.inputText} type="date" placeholder={placeholderText} defaultValue={data} />
        </div>
    )
}

export default InputDate;