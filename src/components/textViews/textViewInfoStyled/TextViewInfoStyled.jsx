import style from './TextViewInfoStyled.module.css'


const TextViewInfoStyled = ({ titleLabel="",  size=true,  value="" }) => {

    return (
        <>
            <div className={`${style.textView_group} `}>
                
                    <label className={`${style.label}`}>{titleLabel}</label>
                    <table >
                        <tbody >
                            <tr>
                                <th className={`${style.textView} ${size?style.sizeS:style.sizeM}`}  >{value}</th>
                            </tr>
                        </tbody>
                    </table>
                {/* <input autoComplete="off" name={nameLabel} className={`${style.inputText} ${size?style.sizeS:style.sizeM} `} type={typeInput} placeholder={placeholderText} value={value} /> */}
            </div>
        </>    
        
    );
};

export default TextViewInfoStyled;