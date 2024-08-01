
import Style from './TextViewClient.module.css'

const TextViewClient = () => {
  return (
    <div className={Style.client}>
        <label for="cliente" className={Style.label_text_view}>Datos Del Cliente:</label>

        <div id="cliente" name="cliente"  className={Style.text_view}>
        It was a dark and stormy night...
        </div>
    </div>
  )
}

export default TextViewClient