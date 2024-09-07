import React from 'react'
import Container from '../../components/container/Container'
import MiniNavBar from '../../components/miniNavbar/MIniNavBar'
import MiniBtn from '../../components/btns/miniBtn/MiniBtn'
import BtnCommon from '../../components/btns/btnCommon/BtnCommon'
import TextInputStyled from '../../components/inputs/inputTextStyled/TextInputStyled'
import MidTotal from '../../components/totals/midTotal/MidTotal'
import Style from './RegisterCash.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faPlus, faUserPlus, faWallet,faXmark} from "@fortawesome/free-solid-svg-icons";
import { TableQuotation } from '../../components/tables/tableQuotation/TableQuotation'
import BtnVioletLarge from '../../components/btns/btnVioletLarge/BtnVioletLarge'


const item1 =[
    {code:323434,item:"Zapatillas Casual para motocicletas",quantity:2,price:"12,00",amount:54.45},
    {code:323434,item:"Camperas para motocicletas",quantity:2,price:12000.00,amount:12000.00},
    {code:1,item:"",quantity:0,price:0.00,amount:0.00},
    {code:2,item:"",quantity:0,price:0.00,amount:0.00},
    {code:3,item:"",quantity:0,price:0.00,amount:0.00}

]

const RegisterCash = () => {
    
    const handleBill = () =>{

    }

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
                    <TableQuotation rows={item1} size={true} />
                    </div>
                    <div className={Style.row3}>

                    </div>
                    
                </div>
                <div className={Style.column2}>
                <MidTotal/>
                    <div className={Style.BtnLarge}>
                        <BtnVioletLarge onClick={handleBill} >Cobrar <FontAwesomeIcon icon={faWallet}/></BtnVioletLarge>
                    </div>
                    <div className={Style.BtnsShort}>
                        <BtnCommon title={"Cliente "} colorViolet={true}><FontAwesomeIcon icon={faUserPlus}/></BtnCommon>
                        <BtnCommon title={"Cancelar "} colorRed={true}> <FontAwesomeIcon icon={faXmark}/> </BtnCommon>
                    </div>
                </div>
                    
                </article>
            </Container>
        </div>
    )
}

export default RegisterCash