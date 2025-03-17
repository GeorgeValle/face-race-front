
import style from './MiniDescription.module.css'

const MiniDescription = ({children, isWhite= false, isGreen=true, description=""}) => {
    return (
        <article className={`${style.article} ${isWhite&&style.white_font} ${isGreen&&style.green_font}`} >
            <h2>{description}:</h2>
            <h2>$ {children}</h2>
        </article>
    )
}

export default MiniDescription