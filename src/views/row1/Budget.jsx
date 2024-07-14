//budget = presupuesto in spanish

import Container from '../../components/container/Container'
import MiniNavBar from '../../components/miniNavbar/MIniNavBar'
import MiniBtn from '../../components/miniBtn/MiniBtn'
import BtnCommon from '../../components/btnCommon/BtnCommon'

import Style from './Budget.module.css'

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass, faPlus, faPrint, faPen} from "@fortawesome/free-solid-svg-icons";

// import {faXmark} from "@fortawesome/free-solid-svg-icons";

const Budget = () =>{

    
    return(

        <div clasName={Style.mainContainer}>
            <Container>
                <MiniNavBar miniTitle={"PRESUPUESTO"} btnBack={true}/>
                <article className={Style.content}>
                    <div claseName={Style.item1}>
                        <MiniBtn ><FontAwesomeIcon icon={faMagnifyingGlass} /></MiniBtn>
                        <MiniBtn ><FontAwesomeIcon icon={faPlus} /></MiniBtn>
                    </div>
                    <div claseName={Style.item2}>
                        <BtnCommon title={"Imprimir "} ColorRed={true} ><FontAwesomeIcon icon={faPrint} /></BtnCommon>
                    </div>
                    <div claseName={Style.item3}>
                        <BtnCommon title={"Editar "} colorViolet={true}><FontAwesomeIcon icon={faPen} /></BtnCommon>
                    </div>
                    <div claseName={Style.item4}>
                        
                    </div>
                    <div claseName={Style.item5}>
                        
                    </div>
                    <div claseName={Style.item6}>
                        
                    </div>
                    <div claseName={Style.item7}>
                        
                    </div>
                    <div claseName={Style.item8}>
                        
                    </div>
                    <div claseName={Style.item9}>
                        
                    </div>
                    <div claseName={Style.item10}>
                       
                    </div>

                    
                </article>
                    
            </Container>
        </div>
    )
}

export default Budget