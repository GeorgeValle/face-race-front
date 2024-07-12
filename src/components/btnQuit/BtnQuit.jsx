import StyleBtn from './BtnQuit.module.css';
import { Link } from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";




const BtnQuit = () => {
    return(
        <>
        <div className={StyleBtn.divButton}>
            <Link 
                to={'/logout'}               
                className={StyleBtn.btnLink}>
                    <span className={StyleBtn.texts}>
                        <FontAwesomeIcon icon={faXmark} size="lg" /> Salir
                    </span>                   
            </Link>
        </div> 
        </>  
    );
}

export default BtnQuit;