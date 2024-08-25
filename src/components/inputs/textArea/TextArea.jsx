import styleInput from './TextArea.module.css'


const TextArea = ({titleLabel="",nameLabel="", placeholderText="", sideLabel=false, data=null}) => {
    return (
        <>
        <div className={`${styleInput.inputText_group} ${sideLabel&&styleInput.side}`}>
            
                <label className={`${styleInput.label}`}>{titleLabel}</label>
            
            <textarea autoComplete="off" cols="30" rows="5" name={nameLabel} className={`${styleInput.area}  `}  placeholder={placeholderText} defaultValue={data} />
        </div>
    </>    
    )
}

export default TextArea