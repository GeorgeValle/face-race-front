import logo from '../../assets/images/general/logo-collaneri.png'
import navStyles from './MiniNavBar.module.css'
import { NavLink } from 'react-router-dom'


const MiniNavBar = () => {

    return (
        
            <nav className={navStyles.bar}>

                <NavLink to='/panel' >
                </NavLink>

                <div >
                    <h2 className={navStyles.title} >BIENVENIDOS</h2>                
                </div>
                
                
                <img
                    alt="logo Collaneri"
                    src={logo}
                    className={navStyles.miniLogo}
                />

                {/* <div className={navStyles.miniLogo}>

                </div> */}
                

               
            </nav>
            
        
    );
};

export default MiniNavBar;