import styles from './InputSelectStyled.module.css'

// eslint-disable-next-line react/prop-types
const InputSelectStyled = ({defaultValue="", onSetValue=null, onLabel="", options=[], styled=true, isLabel=false ,titleLabel="",sideLabel=false, isGroup=true }) => {

    

    const handleSelectedChange = (event) => {
        onSetValue(event.target.value);
    };

    return (
        <div className={`${isGroup&&styles.inputDate_group} ${sideLabel&&styles.side}`} >
                    {
                    isLabel&&(<label className={styles.label_alternative}>{titleLabel}&nbsp;</label> )
                    }
            <label className={styles.label}>
                    {onLabel}
            </label>
                <select className={`${styled&&styles.styledSelect} ${!styled&&styles.styleSelect} `} value={defaultValue} onChange={handleSelectedChange} >
                
                    {options.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
    )
}


export default InputSelectStyled