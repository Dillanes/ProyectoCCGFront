import React,{useState} from 'react'
import "rsuite/dist/rsuite.min.css";
import { useOmcCon34 } from '../../context/omc34/ContextOmcCon34'
import TreeComponent from './TreeComponent';
import FormularioEditarCO from './FormularioEditarCO';




function ListaConsulta() {

 const {omc34n1TreeData,setColap,Colap} = useOmcCon34()
 





const searchReg = (e)=>{
  setColap(true)
  const TablaRow = document.getElementById('TablaCRO')
  const TrCRO = TablaRow.getElementsByTagName('tr')

  
  for(let tr = 1; tr <= TrCRO.length-1; tr++){

    
    let codigo = Array(TrCRO[tr].childNodes[1].firstChild)[0].wholeText.trim().toLowerCase()
    let condicion = Array(TrCRO[tr].childNodes[2].firstChild)[0].data.toLowerCase()
    let descSpa = Array(TrCRO[tr].childNodes[3].firstChild)[0].data.toLowerCase()
    let defEng = Array(TrCRO[tr].childNodes[4].firstChild)[0].data.toLowerCase()
    let defSpa = Array(TrCRO[tr].childNodes[5].firstChild)[0].data.toLowerCase()


    if(codigo.includes(e.target.value.toLowerCase()) ||
       condicion.includes(e.target.value.toLowerCase()) ||
       descSpa.includes(e.target.value.toLowerCase()) ||
       defEng.includes(e.target.value.toLowerCase()) ||
       defSpa.includes(e.target.value.toLowerCase()) ||
         !e.target.value ){
      // console.log(TrCRO[tr].childNodes[2].firstChild)
         TrCRO[tr].removeAttribute('hidden')
    }else{
      // console.log(TrCRO[tr].childNodes[2].firstChild)
      TrCRO[tr].setAttribute('hidden','true')
    }
    if(!e.target.value){setColap(false)}
    
  }

}




let valor = 1
let ident = 0
  return ( 

    <div style={{width:'100%'}}>   
      <div className='row justify-content-end gap-3'>
        <div className='col-3 '> <input type='search'  onChange={(e)=>{searchReg(e)}} className='form-control' placeholder='Buscar..' ></input></div>
        <button className='btn btn-primary col-md-1 col-sm-3 ' onClick={()=>setColap(!Colap)} style={{marginBottom:'10px'}}>Colapsar</button>
      </div>
    <div className='table-responsive'>
       <table className='table shadow' id='TablaCRO'>
        <thead className = 'table-dark'>
          <tr>
            <th>Col</th>
            <th>Código</th>
            <th>Descripción en Inglés</th>
            <th>Descripción en Español</th>
            <th>Definición en Inglés</th>
            <th>Definición en Español</th>
            <th style={{textAlign:'center'}}>Opcion</th>
          </tr>
        </thead>
        <tbody>  
        <TreeComponent data={omc34n1TreeData} valor={valor} ident={ident}/>
        </tbody>
       </table> 
       </div>
       <FormularioEditarCO />  
    </div>
  )
}


export default ListaConsulta

