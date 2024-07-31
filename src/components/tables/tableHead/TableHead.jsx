

import React from 'react'
import StyleTable from './TableHead.module.css'

const TableHead = ({headItems}) => {
  return (
    <>
        {headItems?.map((item)=>{return (<div key={item.index} className={StyleTable.head}>
          {item.title}
          </div>);})}
    </>
    
  )
}

export default TableHead