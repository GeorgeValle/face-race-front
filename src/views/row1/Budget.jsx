// ******* budget = presupuesto in spanish ************

import Container from '../../components/container/Container'
import MiniNavBar from '../../components/miniNavbar/MIniNavBar'
import MiniBtn from '../../components/btns/miniBtn/MiniBtn'
import BtnCommon from '../../components/btns/btnCommon/BtnCommon'
import TextInputStyled from '../../components/inputs/inputTextStyled/TextInputStyled'
import {TableClient} from '../../components/tables/tableClient/TableClient'
import {TableQuotation} from '../../components/tables/tableQuotation/TableQuotation'
import Style from './Budget.module.css'
import MiniTotal from '../../components/totals/miniTotal/MiniTotal'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass, faPlus, faPrint} from "@fortawesome/free-solid-svg-icons";
import MessageModal from '../../components/modals/messageModal/MessageModal';
import {useState} from 'react';
import {modal} from 'react-dom';


const Budget = () =>{
    const [modalOpen, setModalOpen] = useState(false);
    
    function print() {

        // window.print();
        setModalOpen(true)
        const timer = setTimeout(() => {
            setModalOpen(false);
                    }, 3500);
    }

    function CloseMessageModal(){
        setModalOpen(false);
    }
    
    
    const item1 =[{code:323434,item:"Zapatillas Casual para motocicletas",quantity:2,price:"12,00",amount:54.45},{code:323434,item:"Camperas para motocicletas",quantity:2,price:12000.00,amount:12000.00}]

    const row1={id:1,name:"Victor",surname:"Perez",date:"",email:"losespinos@gmail.com",dni:23456789,tel:3514585956,cel:234564554}
    return(

        <div className={Style.mainContainer}>
            <Container>
                <MiniNavBar miniTitle={"PRESUPUESTO"} btnBack={true}/>
                {modalOpen && (<MessageModal onClose={CloseMessageModal} >Impreso</MessageModal>)}
                <article className={Style.content}>
                    <div className={Style.item1}>
                        <article className={Style.center}>     
                            <div className={Style.article}>
                                <TextInputStyled placeholderText={"Ej: 11711455"} typeInput={"number"} titleLabel="Código de Barras" size={false} />
                                <MiniBtn ><FontAwesomeIcon icon={faMagnifyingGlass} /></MiniBtn>
                            </div>
                            <div className={Style.article}>
                                <TextInputStyled placeholderText={"Ej: Guantes "} typeInput={"text"} titleLabel="Nombre Artículo" size={false} />
                                <MiniBtn ><FontAwesomeIcon icon={faMagnifyingGlass} /></MiniBtn>
                            </div>
                            <div className={Style.article}>
                                <TextInputStyled placeholderText={"Ej: 1"} typeInput={"number"} titleLabel="Cantidad" />
                                <MiniBtn ><FontAwesomeIcon icon={faPlus} /></MiniBtn>
                            </div>
                        </article>
                    </div>
                    <div className={Style.item2}>
                        <TableQuotation rows={item1} ></TableQuotation>
                    </div>
                    <div className={Style.item3}>
                        <article>
                            <TableClient row={row1}/>
                        </article> 
                    </div>
                    <div className={Style.item4}>
                        <article className={Style.separate}>
                                <div className={Style.article}>
                                    <TextInputStyled placeholderText={"Ej: 40112233"} typeInput={"number"} titleLabel="DNI Cliente" />
                                    <MiniBtn ><FontAwesomeIcon icon={faMagnifyingGlass} /></MiniBtn>
                                </div>
                                <BtnCommon title={"Imprimir "} ColorRed={true} onClick={()=>print()} ><FontAwesomeIcon icon={faPrint} /></BtnCommon>
                                <MiniTotal>0,00</MiniTotal>
                        </article> 
                    </div>
                </article>
                        
            </Container>
        </div>
    )
}

export default Budget