import StyleLink from './LinkCommon.module.css'
import { Link } from "react-router-dom";


const LinkCommon = ({children}) =>{
    return(
        <Link to="/lost_password" className={StyleLink.linkStyle}>{children}</Link>
    )
}

export default LinkCommon