import Container from '../../components/container/Container'
import MiniNavBar from '../../components/miniNavbar/MIniNavBar'
import BtnVioletPanel from '../../components/btns/btnVioletPanel/BtnVioletPanel'
import Style from './Panel.module.css'

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark, faCalculator, faAddressBook, faCashRegister, faCalendarDay, faTableList, faTruckField, faWarehouse, faTruckRampBox, faCalendarPlus, faMotorcycle} from "@fortawesome/free-solid-svg-icons";

const Panel = () =>{

    
    return(

        <div style={{width:"1343px", heigth:"705px",margin:"auto"}}>
            <Container>
                <MiniNavBar miniTitle={"PANEL DE CONTROL"} btnQuit={true}/>
                <article className={Style.content}>
                    <div className={Style.item1}>
                        <BtnVioletPanel title={"Presupuestar"} path={"/budget"} leftColor={true}>
                            <FontAwesomeIcon icon={faCalculator} size="lg" />
                        </BtnVioletPanel>
                    </div>
                    <div className={Style.item2}>
                        <BtnVioletPanel title={"Clientes"} path={"/client"}  topColor={true}>
                            <FontAwesomeIcon icon={faAddressBook} size="lg" />
                        </BtnVioletPanel> 
                    </div>
                    <div className={Style.item3}>
                        <BtnVioletPanel title={"Cobrar"}  rightColor={true}>
                            <FontAwesomeIcon icon={faCashRegister} size="lg" />
                        </BtnVioletPanel>
                    </div>
                    <div className={Style.item4}>
                        <BtnVioletPanel title={"Ventas"}  bottomColor={true}>
                            <FontAwesomeIcon icon={faCalendarDay} size="lg" />
                        </BtnVioletPanel>
                        
                    </div>
                    <div claseName={Style.item5}>
                        <BtnVioletPanel title={"Pedidos"}  leftColor={true}>
                            <FontAwesomeIcon icon={faTableList} size="lg" />
                        </BtnVioletPanel>
                    </div>
                    <div className={Style.item6}>
                        <BtnVioletPanel title={"Proveedores"}  topColor={true}>
                            <FontAwesomeIcon icon={faTruckField} size="lg" />
                        </BtnVioletPanel>
                    </div>
                    <div className={Style.item7}>
                        <BtnVioletPanel title={"Compras"}  rightColor={true}>
                            <FontAwesomeIcon icon={faTruckRampBox} size="lg" />
                        </BtnVioletPanel>
                    </div>
                    <div className={Style.item8}>
                        <BtnVioletPanel title={"Inventario"}  bottomColor={true}>
                            <FontAwesomeIcon icon={faWarehouse} size="lg" />
                        </BtnVioletPanel>
                    </div>
                    <div className={Style.item9}>
                        <BtnVioletPanel title={"Turnos"}  leftColor={true}>
                            <FontAwesomeIcon icon={faCalendarPlus} size="lg" />
                        </BtnVioletPanel>
                    </div>
                    <div className={Style.item10}>
                        <BtnVioletPanel title={"Rectificaciones"}  topColor={true}>
                            <FontAwesomeIcon icon={faMotorcycle} size="lg" />
                        </BtnVioletPanel>
                    </div>

                    
                </article>
                    
            </Container>
        </div>
    )
}

export default Panel