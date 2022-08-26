import React from 'react'
import { useProveedores } from '../context/Proveedores/ProveedoresContext'
import TablaProveedores from '../components/Proveedores/TablaProveedores'
import FormularioEditar from '../components/Proveedores/FormularioEditar'
import FormularioRegistrar from '../components/Proveedores/FormularioRegistrar'
import {RiFileExcel2Line} from 'react-icons/ri'
import {GrDocumentTxt} from 'react-icons/gr'
import {BsFillFileEarmarkPdfFill} from 'react-icons/bs'
function PageIndiceProveedores() {
  const {DataProveedores} = useProveedores()
  return (
    <>
      <div className='container' style={{marginTop:'20px'}}>
    <div className='containerTitle'>
          <span className='row'><p className='textTitle col-sm-12 col-md-9'>Índice de Proveedores</p> <div className='col-sm-12 col-md-3' style={{paddingTop:'30px'}}><div className='row'>
             <BsFillFileEarmarkPdfFill  onClick={()=>alert('PDF')} className='col-md-3 fs-3' style={{color:'#B20E0F',cursor:'pointer'}} />
             <RiFileExcel2Line onClick={()=>alert('Excel')} className='col-md-3 fs-3' style={{color:'#016F3E',cursor:'pointer'}} />
             <GrDocumentTxt onClick={()=>alert('TXT')} className='col-md-3 fs-3 ' style={{color:'#546A7A',cursor:'pointer'}}/>
            </div></div></span>
          <hr className='hrTitle'/>
        </div>
    <div>
       <TablaProveedores DataProveedores={DataProveedores} />
    </div>
    </div>

       <FormularioRegistrar/>
       <FormularioEditar/>
       
    </>
  )
}

export default PageIndiceProveedores
