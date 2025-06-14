import style from './MiniTotal.module.css'


const MiniTotalUnformatted = ({children}) => {
  return (
    <article className={style.article} >
        <h2>TOTAL:</h2>
        <h2>$ {(children)}</h2>
    </article>
  )
}

export default MiniTotalUnformatted