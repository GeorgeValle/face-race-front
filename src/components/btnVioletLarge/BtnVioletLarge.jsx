// 
import styled from 'styled-components';
import {ContainerRoboto} from './BtnVioletLarge.js';


const BtnViolet= ({children, onClick, btnType="button"}) => (
    <button  onClick={onClick} type={btnType} >
//             <ContainerRoboto>{children}</ContainerRoboto>                   
//         </button>
);



const BtnVioletLarge = styled(BtnViolet)`
    display: block;
    flex-shrink: 0;
    width:100px;
    border-radius: 10px;
    border: 1px solid #000000;
    color: linear-gradient(90deg, rgba(81,97,230,1) 0%, rgba(213,81,230,1) 100%);
    box-shadow: 6px 6px 4px 0px rgba(0, 0, 0, 0.25); 
`

return(
            <>
            <button  onClick={onclick} type={btnType} >
                {children}                   
            </button> 
            </>  
        );
        
        
export default BtnVioletLarge;

// const BtnVioletLarge = ({children, onClick, btnType="button"}) => {

//     return(
//         <>
//         <button  onClick={onclick} type={btnType} claseName={StyleBtn.buttonLarge}>
//             <span className={StyleBtn.texts}>{children}</span>                   
//         </button> 
//         </>  
//     );
// }

// export default BtnVioletLarge;