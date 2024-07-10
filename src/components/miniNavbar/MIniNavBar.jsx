import logo from '../../assets/images/general/logo-collaneri.png'
import navStyles from './MiniNavBar.module.css'
// import { NavLink } from 'react-router-dom'
import BtnBack from '../../components/btnBack/BtnBack'


const MiniNavBar = ({btnBack=false, miniTitle="Aquí va el título"}) => {

    return (
        <>
            <nav className={navStyles.bar}>

            {
                btnBack &&
                <BtnBack/>
                
            }
                <div >
                    <h2 className={navStyles.title} >{miniTitle}</h2>                
                </div>
                
                
                <img
                    alt="logo Collaneri"
                    src={logo}
                    className={navStyles.miniLogo}
                />
                

               
            </nav>
        </>    
        
    );
};

export default MiniNavBar;