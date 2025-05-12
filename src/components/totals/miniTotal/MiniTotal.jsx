import style from './MiniTotal.module.css'
import { formatNumber } from '../../../utils/amountUtils/formatNumber'

const MiniTotal = ({children}) => {
  return (
    <article className={style.article} >
        <h2>TOTAL:</h2>
        <h2>$ {formatNumber(children)}</h2>
    </article>
  )
}

export default MiniTotal