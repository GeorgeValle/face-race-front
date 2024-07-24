import Container from '../../components/container/Container'
import MiniNavBar from '../../components/miniNavbar/MIniNavBar'
import BtnVioletLarge from '../../components/btnVioletLarge/BtnVioletLarge'
import Style from './Logout.module.css'
import { Link } from 'react-router-dom'

const Logout = () =>{
    return(

        <div style={{width:"876px", heigth:"700px",margin:"auto"}}>
            <Container>
                <MiniNavBar  miniTitle={"HASTA LUEGO"}/>
                <article className={Style.content}>
                    <div className={Style.item1}>
                    <Link to='/'><BtnVioletLarge>Iniciar Sesión Nuevamente</BtnVioletLarge></Link>
                    </div>  
                </article>   
            </Container>
        </div>
    )
}

export default Logout