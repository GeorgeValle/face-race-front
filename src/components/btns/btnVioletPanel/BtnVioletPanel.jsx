import StyleBtn from './BtnVioletPanel.module.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";




const BtnVioletPanel = ({ title = "", path = "/logout", children, leftColor = false, topColor = false, rightColor = false, bottomColor = false }) => {
    return (
        <>
            <Link
                to={path}
                className={`${StyleBtn.btnLink}`}>
                <div className={`${StyleBtn.divButton} ${leftColor && StyleBtn.btnLinkLeft} ${rightColor && StyleBtn.btnLinkRight} ${topColor && StyleBtn.btnLinkTop} ${bottomColor && StyleBtn.btnLinkBottom}`}>


                    <span className={`${StyleBtn.texts} `}>
                        {title}
                    </span>
                    <span className={`${StyleBtn.icono} `}>
                        {children}

                    </span>


                </div>
            </Link>
        </>
    );
}

export default BtnVioletPanel;