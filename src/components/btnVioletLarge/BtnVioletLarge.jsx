import StyleBtn from './BtnVioletLarge.module.css';




const BtnVioletLarge = ({children, onClick, btnType="button"}) => {

    return(
        <>
        <div className={StyleBtn.divButton}>
            <button  onClick={onclick} type={btnType} className={StyleBtn.buttonLarge}>
                <span className={StyleBtn.texts}>{children}</span>                   
            </button>
        </div> 
        </>  
    );
}

export default BtnVioletLarge;