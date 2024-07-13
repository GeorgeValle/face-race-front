import Container from '../../components/container/Container'
import MiniNavBar from '../../components/miniNavbar/MIniNavBar'

import BtnVioletLarge from '../../components/btnVioletLarge/BtnVioletLarge'
import BtnVioletPanel from '../../components/btnVioletPanel/BtnVioletPanel'
import LinkCommon from '../../components/linkCommon/LinkCommon'
import Style from './Panel.module.css'

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";

const Panel = () =>{

    
    return(

        <div style={{width:"1343px", heigth:"705px",margin:"auto"}}>
            <Container>
                <MiniNavBar miniTitle={"PANEL DE CONTROL"} btnQuit={true}/>
                <article className={Style.content}>
                    <div claseName={Style.item1}>
                        <BtnVioletPanel title={"Presupuesto"}  leftColor={true}>
                            <FontAwesomeIcon icon={faXmark} size="lg" />
                        </BtnVioletPanel>
                    </div>
                    <div claseName={Style.item2}>
                        <BtnVioletPanel title={"Clientes"}  topColor={true}>
                            <FontAwesomeIcon icon={faXmark} size="lg" />
                        </BtnVioletPanel> 
                    </div>
                    <div claseName={Style.item3}>
                        <BtnVioletPanel title={"Ventas"}  rightColor={true}>
                            <FontAwesomeIcon icon={faXmark} size="lg" />
                        </BtnVioletPanel>
                    </div>
                    <div claseName={Style.item4}>
                        <BtnVioletPanel title={"Caja"}  bottomColor={true}>
                            <FontAwesomeIcon icon={faXmark} size="lg" />
                        </BtnVioletPanel>
                    </div>
                    <div claseName={Style.item5}>
                        <BtnVioletPanel title={"Pedidos"}  leftColor={true}>
                            <FontAwesomeIcon icon={faXmark} size="lg" />
                        </BtnVioletPanel>
                    </div>
                    <div claseName={Style.item6}>
                        <BtnVioletPanel title={"Compras"}  topColor={true}>
                            <FontAwesomeIcon icon={faXmark} size="lg" />
                        </BtnVioletPanel>
                    </div>
                    <div claseName={Style.item7}>
                        <BtnVioletPanel title={"Proveedores"}  rightColor={true}>
                            <FontAwesomeIcon icon={faXmark} size="lg" />
                        </BtnVioletPanel>
                    </div>
                    <div claseName={Style.item8}>
                        <BtnVioletPanel title={"Inventario"}  bottomColor={true}>
                            <FontAwesomeIcon icon={faXmark} size="lg" />
                        </BtnVioletPanel>
                    </div>
                    <div claseName={Style.item9}>
                        <BtnVioletPanel title={"Turnos"}  leftColor={true}>
                            <FontAwesomeIcon icon={faXmark} size="lg" />
                        </BtnVioletPanel>
                    </div>
                    <div claseName={Style.item10}>
                        <BtnVioletPanel title={"Rectificaciones"}  topColor={true}>
                            <FontAwesomeIcon icon={faXmark} size="lg" />
                        </BtnVioletPanel>
                    </div>

                    
                </article>
                    
            </Container>
        </div>
    )
}

export default Panel