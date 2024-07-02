import StyleBtn from './BtnVioletLarge.module.css';




const BtnVioletLarge = ({children, onClick, btnType="button"}) => {

    return(
        <>
        <button  onClick={onclick} type={btnType} claseName={StyleBtn.buttonLarge}>
            <span className={StyleBtn.texts}>{children}</span>                   
        </button> 
        </>  
    );
}

export default BtnVioletLarge;