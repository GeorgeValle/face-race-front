import styles from './InputSelectStyled.module.css'

// eslint-disable-next-line react/prop-types
const InputSelectStyled = ({defaultValue="", onSetValue=null, onLabel="", options=[] } ) => {

    

    const handleSelectedChange = (event) => {
        onSetValue(event.target.value);
    };

    return (
        <div className={styles.inputDate_group} >
            <label className={styles.label}>
                    {onLabel}
            </label>
                <select className={styles.styledSelect} value={defaultValue} onChange={handleSelectedChange}>
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