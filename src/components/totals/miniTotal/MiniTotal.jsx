import style from './MiniTotal.module.css'
import { formatNumber } from '../../../utils/amountUtils/formatNumber'

const MiniTotal = ({children, size=false}) => {
  return (
    <article className={`${style.article} ${size?style.article_l:""}`} >
        <h2>TOTAL:</h2>
        <h2>$ {formatNumber(children)}</h2>
    </article>
  )
}

export default MiniTotal