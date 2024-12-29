import BtnClose from '../../btns/btnClose/BtnClose'
import Style from './EditQuantityItemModal.module.css'
import TextInputStyled from '../../inputs/inputTextStyled/TextInputStyled'
import { useState } from 'react'

// eslint-disable-next-line react/prop-types
const EditQuantityItemModal = ({onSubmit=null, initQuantity=0, code=0, onClose=null }) => {
    const [quantity, setQuantity] = useState(initQuantity);

    const handleQuantity = (event) =>{
        setQuantity(event.target.value);
    }

    const handleDelete = ()=>{
        if(onSubmit !== null){
            onSubmit(code, quantity);
            onClose();
        }
    }

return (
    <div className={Style.modal_container} onClick=
    {(e)=>{if(e.target.className === Style.modal_container){onClose()}}}>
        <dialog open className={Style.modal}>
            <div >
                <div className={Style.modal_header}>
                    <BtnClose close={onClose}/>
                </div>
                <div className={Style.modal_content}>
                    <p>{`Cambia la Cantidad del Item`}</p>
                    <TextInputStyled typeInput={"number"} titleLabel={"Editar Cantidad"} onChange={handleQuantity} value={quantity}></TextInputStyled>

                </div>
                <div className={Style.modal_footer}>
                    <div className={Style.modal_buttons}>
                        <button /* type="submit" */ className={`${Style.btn} ${Style.btn_submit}`} onClick={ handleDelete} > Editar </button>
                        <button className={`${Style.btn} ${Style.btn_cancel}`} onClick={() => onClose()}>Cancelar </button>
                    </div>
                </div>
            </div>
        </dialog>
    </div>
)
}

export default EditQuantityItemModal