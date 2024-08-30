import React from 'react'
import Container from '../../components/container/Container'
import MiniNavBar from '../../components/miniNavbar/MIniNavBar'
import MiniBtn from '../../components/btns/miniBtn/MiniBtn'
import BtnCommon from '../../components/btns/btnCommon/BtnCommon'
import TextInputStyled from '../../components/inputs/inputTextStyled/TextInputStyled'
import MidTotal from '../../components/totals/midTotal/MidTotal'
import Style from './RegisterCash.module.css'

const RegisterCash = () => {
    return (
        <div className={Style.mainContainer}>
            <Container>
                <MiniNavBar miniTitle={"Caja"} btnBack={true}/>
                <article className={Style.content}>
                <div className={Style.item1}>
                    <TextInputStyled/>
                </div>
                <div className={Style.item2}>
                </div>
                <div className={Style.item3}>
                </div>
                <div className={Style.item4}>
                </div>
                <div className={Style.item5}>
                
                </div>
                    
                </article>
            </Container>
        </div>
    )
}

export default RegisterCash