/* View Cliente whit modal New Client and modify client  */


import Container from '../../components/container/Container'
import MiniNavBar from '../../components/miniNavbar/MIniNavBar'
import MiniBtn from '../../components/btns/miniBtn/MiniBtn'
import BtnCommon from '../../components/btns/btnCommon/BtnCommon'
import TextInputStyled from '../../components/inputs/inputTextStyled/TextInputStyled'
import {TableClient} from '../../components/tables/tableClient/TableClient'
import {TableQuotation} from '../../components/tables/tableQuotation/TableQuotation'
import Style from './Budget.module.css'

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass, faPlus, faPrint} from "@fortawesome/free-solid-svg-icons";
import TextViewClient from '../../components/textViews/textViewClient/TextViewClient'

const Client = () => {
  return (
    
    <div className={Style.mainContainer}>
            <Container>
                <MiniNavBar miniTitle={"CLIENTE"} btnBack={true}/>
                <article className={Style.content}>
                    <div className={Style.item1}>
                        <article className={Style.center}>     
                            <div className={Style.article}>
                                <article className={Style.separate}>
                                    <div className={Style.article}>
                                        <TextInputStyled placeholderText={"Ej: 40112233"} typeInput={"number"} titleLabel="DNI Cliente" />
                                        <MiniBtn ><FontAwesomeIcon icon={faMagnifyingGlass} /></MiniBtn>
                                    </div>
                                </article> 
                                
                            </div>
                            <div className={Style.article}>
                                
                            </div>
                            <div className={Style.article}>
                               
                            </div>
                        </article>
                    </div>
                    <div className={Style.item2}>
                       <TextViewClient />
                    </div>
                    <div className={Style.item3}>
                        <article>
                           
                        </article> 
                    </div>
                    <div className={Style.item4}>
                        
                    </div>
                </article>
                    
            </Container>
        </div>

  )
}

export default Client