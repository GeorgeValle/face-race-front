import React from 'react'

const TextArea = () => {
    return (
        <>
        <div className={`${styleInput.inputText_group} `}>
            
                <label className={`${styleInput.label}`}>{titleLabel}</label>
            
            <textarea autoComplete="off" cols="30" rows="5" name={nameLabel} className={`${styleInput.inputText} ${size?styleInput.sizeS:styleInput.sizeM} `} type={typeInput} placeholder={placeholderText} />
        </div>
    </>    
    )
}

export default TextArea