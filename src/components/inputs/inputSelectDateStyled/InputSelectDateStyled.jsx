import styles from './InputSelectDateStyled.module.css'

// eslint-disable-next-line react/prop-types
const InputSelectDateStyled = ({defaultValue="", onChange=null, onLabel="", children } ) => {

    

    // const handleSelectedChange = (event) => {
    //     onSetValue(event.target.value);
    // };

    return (
        <div className={styles.inputDate_group} >
            <label className={styles.label}>
                    {onLabel}
            </label>
                <select className={styles.styledSelect} value={defaultValue} onChange={onChange}>
                    {children}
                </select>
            </div>
    )
}


export default InputSelectDateStyled