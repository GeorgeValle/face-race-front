import React from 'react'
import Container from '../../components/container/Container'
import MiniNavBar from '../../components/miniNavbar/MIniNavBar'
import MiniBtn from '../../components/btns/miniBtn/MiniBtn'
import BtnCommon from '../../components/btns/btnCommon/BtnCommon'
import TextInputStyled from '../../components/inputs/inputTextStyled/TextInputStyled'
import MidTotal from '../../components/totals/midTotal/MidTotal'
import Style from './RegisterCash.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faPlus} from "@fortawesome/free-solid-svg-icons";


const RegisterCash = () => {
    return (
        <div className={Style.mainContainer}>
            <Container>
                <MiniNavBar miniTitle={"Caja"} btnBack={true}/>
                <article className={Style.content}>
                <div className={Style.column1}>
                    <div className={Style.row1}>
                        <TextInputStyled typeInput="number" nameLabel={"codigo"} titleLabel={"Código de Barras"} placeholderText={"Ej: 1923"} size={false}/> 
                        <TextInputStyled titleLabel={"Cantidad"} nameLabel={"cantidad"} placeholderText={"Ej: 12"} typeInput="number"/>
                        <div className={Style.btnLayout}>
                            <BtnCommon title={"Agregar"} colorViolet={true}> <FontAwesomeIcon icon={faPlus} /> </BtnCommon>
                            <BtnCommon title={"Ver Precio"} colorViolet={true}> $</BtnCommon>
                        </div>
                        
                    </div>
                    <div className={Style.row2}>

                    </div>
                    <div className={Style.row3}>

                    </div>
                    
                </div>
                <div className={Style.column2}>
                <MidTotal/>
                </div>
                    
                </article>
            </Container>
        </div>
    )
}

export default RegisterCash