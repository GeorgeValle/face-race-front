// ******* budget = presupuesto in spanish ************

import Container from '../../components/container/Container'
import MiniNavBar from '../../components/miniNavbar/MIniNavBar'
import MiniBtn from '../../components/btns/miniBtn/MiniBtn'
import BtnCommon from '../../components/btns/btnCommon/BtnCommon'
import InputTextSearchStyled from '../../components/inputs/inputTextSearchStyled/InputTextSearchStyled'
import TextInputStyled from '../../components/inputs/inputTextStyled/TextInputStyled'
import { TableClient } from '../../components/tables/tableClient/TableClient'
import { TableQuotation } from '../../components/tables/tableQuotation/TableQuotation'
import Style from './Budget.module.css'
import MiniTotal from '../../components/totals/miniTotal/MiniTotal'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faPlus, faPrint, faBroomBall } from "@fortawesome/free-solid-svg-icons";
import MessageModal from '../../components/modals/messageModal/MessageModal';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addClient, deleteClient } from "../../redux/ClientSlice";
import axios from 'axios';
import config from "../../config/Envs"
import { addItem, deleteItem } from "../../redux/ItemSlice";
import { addItems, removeItem, clearItems, updateItemQuantity } from '../../redux/ItemsListSlice';
import { PDFDownloadLink } from '@react-pdf/renderer';
import BudgetPDF from '../../components/pdf/budgetPDF/BudgetPDF'

//import Dialog from "../../../components/modals/dialog/Dialog"
//import {modal} from 'react-dom';


const Budget = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0.00);
    const [inputClientName, setInputClientName]= useState("")
    const [inputItemName, setInputItemName] = useState("");
    const [inputDNI, setInputDNI] = useState("")
    const [modalOpenMessage, setModalOpenMessage] = useState(false);
    const [message, setMessage] = useState("");
    const [isFetchClient, setIsFetchClient] = useState(false);
    const [inputCode, setInputCode] = useState("");
    const [isItem, setIsItem] = useState(false);
    const [inputQuantity, setInputQuantity] = useState(0);



    const client = useSelector((state) => state.client);
    const item = useSelector((state) => state.item);
    const itemsList = useSelector((state) => state.itemsList);
    const dispatch = useDispatch();

    function print() {

        // window.print();
        setModalOpen(true)
        setTimeout(() => {
            setModalOpen(false);
        }, 3500);
    }

    function CloseMessageModal() {
        setModalOpen(false);
    }

    const cleanClient = () =>{
            dispatch(deleteClient()); //delete client of redux
            setInputDNI("");
            setInputClientName("");
        }

    const cleanItem = () =>{
            dispatch(deleteItem()); //delete item of redux
            setInputCode("");
            setInputItemName("");
        }

    // Function for format numbers
    const formatNumber = (number) => {
        return number.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    const handleTotalAmount = (total) => {
        setTotalAmount(total);
    }

    const handleInputDNI = (e) => {
        setInputDNI(e.target.value);
    }

    const handleInputCode = (e) =>{
        setInputCode(e.target.value);
    }

    const handleInputQuantity = (e) =>{
        setInputQuantity(e.target.value);
    }



    const MessageResponse = () => {
        setModalOpenMessage(true)
        setTimeout(() => {
            setModalOpenMessage(false);
        }, 3500);
    }

    const fetchClient = async () => {

        try {
            const request = await axios.get((`${config.API_BASE}client/dni/${inputDNI}`))
            const response = request.data
            setInputClientName(`${response.data.name} ${response.data.surname}`)
            dispatch(addClient(response.data))
            if (response.data) {
                setIsFetchClient(true);

            }
        } catch (error) {
            setMessage("Cliente NO encontrado")
            MessageResponse(message);
        }

    }

    const fetchItem = async () => {

        try {
            const request = await axios.get((`${config.API_BASE}item/code/${inputCode}`))
            const response = request.data
            setInputItemName(`${response.item.name} ${response.item.brand}`)
            dispatch(addItem(response.item))
        } catch (error) {
            setMessage("Artículo NO encontrado")
            setModalOpenMessage(true)
            setTimeout(() => {
                setModalOpenMessage();
            }, 3500);
        }


    }
    const fetchItemsByLetters = async(letters) =>{

            try{
                const request = await axios.get((`${config.API_BASE}item/name/${letters}`))
                const response = request.data
                return response.item
            }catch(error){
                
                setMessage("Artículo NO encontrado")
                setModalOpenMessage(true)
                setTimeout(() => {
                    setModalOpenMessage(false);
                            }, 3500);7
                return []
            }
        } 

        const fetchClientsByLetters = async(letters) =>{

            try{
                const request = await axios.get((`${config.API_BASE}client/name/${letters}`))
                const response = request.data
                return response.client
            }catch(error){
                
                setMessage("Cliente NO encontrado")
                setModalOpenMessage(true)
                setTimeout(() => {
                    setModalOpenMessage(false);
                            }, 3500);7
                return []
            }
        }

    const handleListResults = async(letters) =>{
        setInputItemName(letters)
        return await fetchItemsByLetters(letters)
        
    }

    const handleListResultsClients = async(letters) =>{
        setInputClientName(letters)
        return await fetchClientsByLetters(letters)
    }

    const handleFetchOneItem = (item)=>{
        dispatch(addItem(item))
        setInputCode(item.code)
        setIsItem(true)
    }

    const handleFetchOneClient = (oneClient)=>{
            dispatch(addClient(oneClient))
            setInputDNI(oneClient.dni)
            // setIsListItems(false)
            //     setIsReorderPointList(false)
            //     setIsItem(true)
    
        }

    //onKeyDown handles 

    const handleOnKeyItem = async (event) => {
        if (event.key === 'Enter' || event.key === 'Intro') {
            await fetchItem();

        }
    }

    const handleOnKeyClient = async (event) => {
        if (event.key === "Enter" || event.key === "Intro") {
            
            await fetchClient();
            
        }
    }
    

    //Items list functions
    const handleAddItem = () => {
        const newItem = { code: item.code, name: item.name, quantity: inputQuantity, price: item.price };
        dispatch(addItems(newItem)); // Agrega un nuevo item o suma la cantidad si ya existe
    };

    const handleUpdateQuantity = (code, quantity) => {
        dispatch(updateItemQuantity({ code, quantity })); // Actualiza la cantidad del item
    };

    const handleRemoveItem = (code) => {
        dispatch(removeItem(code)); // Elimina el item por código
    };

    const handleClearItems = () => {
        dispatch(clearItems()); // Borra todo el contenido del array
    };

    // Verify client data and items for enable print button
    const isDataValid = client && itemsList && itemsList.length > 0;

    //Example of item
    //const item1 = [{ code: 323434, name: "Zapatillas Casual para motocicletas", quantity: 2, price: "120250", amount: 240500.00 }, { code: 323435, name: "Camperas para motocicletas", quantity: 2, price: 190000.00, amount: 380000.00 }]

    //example of client
    //const row1 = { id: 1, name: "Victor", surname: "Perez", date: "15/12/2024", email: "losespinos@gmail.com", dni: 23456789, phone: 3514585956, cel: 234564554 }
    return (

        <div className={Style.mainContainer}>
            <Container>
                <MiniNavBar miniTitle={"PRESUPUESTO"} btnBack={true} />
                {modalOpen && (<MessageModal onClose={CloseMessageModal} messageModal={"Impreso"} />)}
                <article className={Style.content}>
                    <div className={Style.item1}>
                        <article className={Style.center}>
                            <div className={Style.article}>
                                {/*<TextInputStyled placeholderText={"Ej: 11711455"} typeInput={"number"} titleLabel="Código de Barras" size={false} value={inputCode} onChange={handleInputCode}/> */}
                                <TextInputStyled typeInput="number" nameLabel={"codigo"} titleLabel={"Código de Barras"} placeholderText={"Ej: 1923"} value={inputCode} onChange={handleInputCode} onKey={handleOnKeyItem} />
                                {/*<MiniBtn onClick={fetchItem} ><FontAwesomeIcon icon={faMagnifyingGlass} /></MiniBtn> */}
                                
                            </div>
                            <div className={Style.article}>
                                {/*<TextInputStyled placeholderText={"Ej: Guantes "} typeInput={"text"} titleLabel="Nombre Artículo" size={false} value={item.name == null ? "" : item.name} /> */}
                                <InputTextSearchStyled placeholderText={"Ej: Casco Italy "} typeInput={"text"} titleLabel="Nombre Artículo" size={false} value={inputItemName} onSearch={handleListResults} setOneResult={handleFetchOneItem} onChange={setInputItemName} displayFields={["name","brand"]}/>
                                {/*<MiniBtn ><FontAwesomeIcon icon={faMagnifyingGlass} /></MiniBtn> */}
                                <MiniBtn onClick={cleanItem} isWhite={true}> <FontAwesomeIcon icon={faBroomBall} />  </MiniBtn>
                            </div>
                            <div className={Style.article}>
                                <TextInputStyled placeholderText={"Ej: 1"} typeInput={"number"} titleLabel="Cantidad" value={inputQuantity} onChange={handleInputQuantity} />
                                <MiniBtn onClick={handleAddItem} ><FontAwesomeIcon icon={faPlus} /></MiniBtn>
                            </div>
                        </article>
                    </div>
                    <div className={Style.item2}>
                        <TableQuotation rows={itemsList} totals={handleTotalAmount} modalRemoveItem={handleRemoveItem} modalUpdateItem={handleUpdateQuantity}  ></TableQuotation>
                    </div>
                    <div className={Style.item3}>
                        <article>
                            <TableClient client={client} />
                        </article>
                    </div>
                    <div className={Style.item4}>
                        <article className={Style.separate}>
                            <div className={Style.article}>
                                {/*<TextInputStyled placeholderText={"Ej: 40112233"} typeInput={"number"} titleLabel="DNI Cliente" value={inputDNI} onChange={handleInputDNI} /> */}
                                <TextInputStyled typeInput="number" nameLabel={"dni"} titleLabel={"DNI / CUIT"} placeholderText={"Ej: 40112233"} value={inputDNI} onChange={handleInputDNI} onKey={handleOnKeyClient} />
                                <InputTextSearchStyled placeholderText={"Ej: Juan Valdez "} typeInput={"text"} titleLabel="Nombre de Cliente" size={false} value={inputClientName} onSearch={handleListResultsClients} setOneResult={handleFetchOneClient} onChange={setInputClientName} displayFields={["name","surname"]}/>
                                {/*<MiniBtn onClick={fetchClient} ><FontAwesomeIcon icon={faMagnifyingGlass} /></MiniBtn> */}
                                <MiniBtn onClick={cleanClient} isWhite={true}> <FontAwesomeIcon icon={faBroomBall} />  </MiniBtn>
                            </div>
                            {isDataValid ? (
                            <PDFDownloadLink
                                document={<BudgetPDF clientData={client} items={itemsList} />}
                                fileName="presupuesto.pdf"
                                style={{ textDecoration: 'none' }}
                            >
                                {({ loading }) => (
                                <BtnCommon title={"Imprimir "} colorRed={true} onClick={() => print()}>
                                    {loading ? "Cargando..." : <FontAwesomeIcon icon={faPrint} />}
                                </BtnCommon>
                                )}
                            </PDFDownloadLink>
                            ) : (
                                <BtnCommon title={"Imprimir "} colorGray={true}  ><FontAwesomeIcon icon={faPrint} /></BtnCommon>
                            )}   
                            {/* <BtnCommon title={"Imprimir "} ColorRed={true} onClick={() => print()} ><FontAwesomeIcon icon={faPrint} /></BtnCommon> */}
                            <MiniTotal>{formatNumber(totalAmount)}</MiniTotal>
                        </article>
                    </div>
                </article>

            </Container>
        </div>
    )
}

export default Budget