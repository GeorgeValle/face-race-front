/* eslint-disable react/prop-types */
import styleInput from './TextInputStyled.module.css'


const TextInputStyled = ({typeInput="text", titleLabel="", nameLabel="", placeholderText="", size=true, onChange=null, value="" }) => {

    return (
        <>
            <div className={`${styleInput.inputText_group} `}>
                
                    <label className={`${styleInput.label}`}>{titleLabel}</label>
                
                <input autoComplete="off" name={nameLabel} className={`${styleInput.inputText} ${size?styleInput.sizeS:styleInput.sizeM} `} type={typeInput} placeholder={placeholderText} value={value} onChange={onChange}/>
            </div>
        </>    
        
    );
};

export default TextInputStyled;