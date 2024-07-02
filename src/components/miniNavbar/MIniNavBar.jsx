import logo from '../../assets/images/general/logo-collaneri.png'
import navStyles from './MiniNavBar.module.css'
import { NavLink } from 'react-router-dom'


const MiniNavBar = ({btnBack=false, miniTitle="Aquí va el título"}) => {

    return (
        <>
            <nav className={navStyles.bar}>

            {
                btnBack &&
                <NavLink to='/panel' >
                </NavLink>
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