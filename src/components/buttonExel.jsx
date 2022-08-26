import React from 'react'
import {RiFileExcel2Line} from 'react-icons/ri'
function ButtonExel(props) {
  return (
    <div className='containerExportExcel' onClick={(e)=>props.ActionEportExcel()}>
      <RiFileExcel2Line className='btnExportExcel'/>
      <div className='textExportExcel'>Export Exel</div>
    </div>
  )
}

export default ButtonExel
