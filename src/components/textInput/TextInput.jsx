
import styleInput from './TextInput.module.css'


const TextInput = ({typeInput="text", isLabel=false, titleLabel="", nameLabel="", sideLabel=false, placeholderText=""}) => {

    return (
        <>
            <div className={styleInput.input_group}>
                {
                    isLabel&&<label className={styleInput.label}>{titleLabel}</label>
                }
                <input autoComplete="off" name={nameLabel} id={nameLabel} className={styleInput.input} type={typeInput} placeholder={placeholderText} />
            </div>
        </>    
        
    );
};

export default TextInput;