import StyleLink from './LinkCommon.module.css'
import { Link } from "react-router-dom";


const LinkCommon = ({children, link="/lost_password"}) =>{
    return(
        <Link to={link} className={StyleLink.linkStyle}>{children}</Link>
    )
}

export default LinkCommon