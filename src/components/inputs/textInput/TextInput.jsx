
import styleInput from './TextInput.module.css'


const TextInput = ({typeInput="text", isLabel=false, titleLabel="", nameLabel="", sideLabel=false, placeholderText="", data=null}) => {

    return (
        <>
            <div className={`${styleInput.inputText_group} ${sideLabel&&styleInput.side}`}>
                {
                    isLabel&&(<label className={styleInput.label}>{titleLabel}&nbsp;</label> )
                }

                <input autoComplete="off" name={nameLabel} id={nameLabel} className={styleInput.inputText} type={typeInput} placeholder={placeholderText} defaultValue={data} />
            </div>
        </>    
        
    );
};

export default TextInput;