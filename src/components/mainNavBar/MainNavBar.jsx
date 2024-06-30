import logo from '../../assets/images/general/logo-face-race.png'

import navStyles from './MainNavBar.module.css';
import { NavLink } from "react-router-dom";

const MainNavBar = () => {

    return (
        
            <nav className={navStyles.nav_bar}>
                
                <NavLink to='/panel' >
                <img
                    alt="logo"
                    src={logo}
                    className={navStyles.logo}
                />
                </NavLink>

                <div >
                    <h1 className={navStyles.main_title} >COLANERI MOTOSHOP</h1>                
                </div>
            </nav>
            
        
    );
};

export default MainNavBar;