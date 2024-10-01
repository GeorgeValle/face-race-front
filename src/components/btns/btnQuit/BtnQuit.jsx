import StyleBtn from './BtnQuit.module.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import UseAxiosPost from '../../../hooks/UseAxiosPost';
import { useDispatch } from "react-redux";
import { deleteUser } from "../../../redux/UserSlice";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const BtnQuit = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleExit = async () => {
        const url = 'http://localhost:8080/api/session/logout';
        try {
            const response = await axios.post(url, {})//UseAxiosPost(url,{});
            //To do quit this console.log
            console.log(response.logout)
            dispatch(deleteUser());
            navigate('/logout');
        } catch (error) {
            //todo delete console.log
            console.log(error);
        }



    }

    return (
        <>
            {/* <div className={StyleBtn.divButton}>
            <Link 
                to={'/logout'}
                onClick={() => handleExit}               
                className={StyleBtn.btnLink}>
                    <span className={StyleBtn.texts}>
                        <FontAwesomeIcon icon={faXmark} 
                        size="lg" 
                        /> Salir
                    </span>                   
            </Link>
        </div>  */}
            <div className={StyleBtn.divButton}>
                <button type="button" onClick={() => handleExit()} className={`${StyleBtn.btn} ${StyleBtn.btnLink} `}>
                    <span className={StyleBtn.texts}>
                        <FontAwesomeIcon icon={faXmark}
                            size="lg"
                        /> Salir
                    </span>
                </button>
            </div>
        </>
    );
}

export default BtnQuit;