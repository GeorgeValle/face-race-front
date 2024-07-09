import StyleLink from './LinkCommon.module.css'


const LinkCommon = ({children}) =>{
    return(
        <p className={StyleLink.linkStyle}>{children}</p>
    )
}

export default LinkCommon