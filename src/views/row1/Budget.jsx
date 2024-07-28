//budget = presupuesto in spanish

import Container from '../../components/container/Container'
import MiniNavBar from '../../components/miniNavbar/MIniNavBar'
import MiniBtn from '../../components/btns/miniBtn/MiniBtn'
import BtnCommon from '../../components/btns/btnCommon/BtnCommon'
import {TableClient} from '../../components/tables/tableClient/TableClient'
import Style from './Budget.module.css'

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass, faPlus, faPrint, faPen} from "@fortawesome/free-solid-svg-icons";


// import {faXmark} from "@fortawesome/free-solid-svg-icons";

const Budget = () =>{

    // const headTitles = [{index:1,title:"ID Cliente"},{index:2,title:"Nombre"},{index:3,title:"Apellido"},{index:4,title:"Fecha / Hora"},{index:5,title:"Email"},{index:6,title:"DNI"},{index:7,title:"Tel."},{index:8,title:"Cel."}]

    const row1={id:1,name:"Victor",surname:"Perez",date:"",email:"losespinos@gmail.com",dni:23456789,tel:3514585956,cel:234564554}
    return(

        <div className={Style.mainContainer}>
            <Container>
                <MiniNavBar miniTitle={"PRESUPUESTO"} btnBack={true}/>
                <article className={Style.content}>
                    <div className={Style.item1}>
                        <MiniBtn ><FontAwesomeIcon icon={faMagnifyingGlass} /></MiniBtn>
                        <MiniBtn ><FontAwesomeIcon icon={faPlus} /></MiniBtn>
                    </div>
                    <div className={Style.item2}>
                        <BtnCommon title={"Imprimir "} ColorRed={true} ><FontAwesomeIcon icon={faPrint} /></BtnCommon>
                    </div>
                    <div className={Style.item3}>
                        <BtnCommon title={"Editar "} colorViolet={true}><FontAwesomeIcon icon={faPen} /></BtnCommon>
                    </div>
                    <div className={Style.item4}>
                        
                    </div>
                    <div className={Style.item5}>
                        
                    </div>
                    <div className={Style.item6}>
                        <article>
                            <TableClient row={row1}/>
                        </article>
                    </div>
                    <div className={Style.item7}>
                        
                    </div>
                    <div className={Style.item8}>
                        
                    </div>
                    <div className={Style.item9}>
                        
                    </div>
                    <div className={Style.item10}>
                       
                    </div>

                    
                </article>
                    
            </Container>
        </div>
    )
}

export default Budget