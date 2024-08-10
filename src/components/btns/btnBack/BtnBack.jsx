import StyleBtn from './BtnBack.module.css';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";




const BtnBack = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className={StyleBtn.divButton}>
                <Link
                    to={'..'}
                    onClick={(e) => {
                        e.preventDefault();
                        navigate(-1);
                    }} className={StyleBtn.btnLink}>
                    <span className={StyleBtn.texts}>
                        <FontAwesomeIcon icon={faAngleLeft} size="lg" />  Atrás
                    </span>
                </Link>
            </div>
        </>
    );
}

export default BtnBack;