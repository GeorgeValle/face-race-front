
import styleInput from './TextInput.module.css'


const TextInput = ({typeInput="text", nameInput="", isLabel=false, titleLabel="", nameLabel="", sideLabel=false,  placeholderText="", value="", onChange=null, } ) => {

    return (
        <>
            <div className={`${styleInput.inputText_group} ${sideLabel&&styleInput.side}`}>
                {
                    isLabel&&(<label className={styleInput.label}>{titleLabel}&nbsp;</label> )
                }

                <input  name={nameInput} id={nameLabel} onChange={onChange} value={value} className={styleInput.inputText} type={typeInput} placeholder={placeholderText}   />
            </div>
        </>    
        
    );
};

export default TextInput;