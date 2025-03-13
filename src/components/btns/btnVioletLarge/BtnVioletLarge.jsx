import StyleBtn from './BtnVioletLarge.module.css';

// eslint-disable-next-line react/prop-types
const BtnVioletLarge = ({children,bgViolet=true, disabled=false, bgDisable=false, onClick, btnType="button"}) => {

    return(
        <>
        <div className={StyleBtn.divButton}>
            <button  onClick={onClick} type={btnType} disabled={disabled} className={`${StyleBtn.buttonLarge} ${bgViolet&&StyleBtn.bgViolet} ${bgDisable&&StyleBtn.bgDisable}`}>
                <span className={StyleBtn.texts}>{children}</span>                   
            </button>
        </div> 
        </>  
    );
}

export default BtnVioletLarge;