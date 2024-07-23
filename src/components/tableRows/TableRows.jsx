import React from 'react'
import StyleTable from './TableRows.module.css'

const TableRows = ({rowsItems}) => {

  
  return (
    <>
        {rowsItems?.map((item)=>{return (      <div className={StyleTable.row} >{item.id}</div>,
                                              <div className={StyleTable.row} >{item.name}</div>,
                                              <div className={StyleTable.row} >{item.surname}</div>,
                                              <div className={StyleTable.row} >{item.date}</div>,
                                              <div className={StyleTable.row} >{item.email}</div>,
                                              <div className={StyleTable.row} >{item.dni}</div>,
                                              <div className={StyleTable.row} >{item.cel}</div>             
      
      
      );})}
    </>
    
  )
}

export default TableRows