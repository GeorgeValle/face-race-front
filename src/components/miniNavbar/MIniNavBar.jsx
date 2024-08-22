import logo from '../../assets/images/general/logo-collaneri.png'
import navStyles from './MiniNavBar.module.css'
// import { NavLink } from 'react-router-dom'
import BtnBack from '../btns/btnBack/BtnBack';
import BtnQuit from '../btns/btnQuit/BtnQuit';
import BtnClose from '../btns/btnClose/BtnClose';


const MiniNavBar = ({btnBack=false, miniTitle="Aquí va el título", btnQuit=false, btnClose=false, close}) => {

    return (
        <>
            <nav className={navStyles.bar}>

            {
                btnBack &&
                <BtnBack/>    
            }

            {
                btnQuit && <BtnQuit/>
            }
                <div >
                    <h2 className={navStyles.title} >{miniTitle}</h2>                
                </div>
                
                
                <img
                    alt="logo Collaneri"
                    src={logo}
                    className={navStyles.miniLogo}
                />
                
                {
                    btnClose && <BtnClose close={close}/>
                }

            </nav>
        </>    
        
    );
};

export default MiniNavBar;