import React, { useState,useEffect } from 'react'
import { useProveedores } from '../context/Proveedores/ProveedoresContext'
import SubTablaSxP from '../components/Proveedores/SubTablaSxP';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { Toaster } from "react-hot-toast";
import AgregarSucursalxProveedor from '../components/Proveedores/AgregarSucursalxProveedor';
import FormularioEditarSucursal from '../components/Proveedores/FormularioEditarSucursal';


function PageSucursalesxProveedor() {
const {dataSxP,
        DataProveedores,
        EliminarSucursal,
        dataCP,
        dataMunicipio,
        dataEstado,
        dataPais,
        FuncDataSucursal,
        EditarSucursal,
        AddSucursal} = useProveedores()

const[showAlias,setshowAlias] = useState(false)
const[showCP,setshowCP] = useState(false)
const[showMunicipio,setshowMunicipio] = useState(false)
const[showEstado,setshowEstado] = useState(false)
const[filtrarP,setfiltrarP] = useState()
const[showPais,setshowPais] = useState(false)
const[showEliminar,setshowEliminar] = useState(false)
const[showEditar,setshowEditar] = useState(false)
const[activeFormSxP,setactiveFormSxP] = useState(false)
const [personName, setPersonName] = useState(['Email','Observaciones']);



const renderizarTabla = ()=>{
  dataSxP.map((reg,index)=>{
    const renderRow =  document.getElementsByClassName(`${reg.RFC}`)
    if(renderRow.length!==0){
      console.log(String(renderRow[1].childNodes[0].data)==='+'?'hola1':renderRow[1].click()) 
    }
  })
}

useEffect(() => {
  
  renderizarTabla()

}, [dataSxP]);

//SELECT COLUMNAR
const names = [
  'Nombre Proveedor',
  'RFC',
  'Email',
  'Observaciones',
  'Alias Sucursal',
  'CP',
  'Pais',
  'Estado',
  'Municipio',
  'Editar',
  'Eliminar',
  ]

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;

  

  //FUNCION OCULTAR COLUMNAS
  const handleChange = (event) => {
    const NombreP = document.getElementsByName('ColumnShowNPS')
    const NombreRFC = document.getElementsByName('ColumnShowRfcS')
    const NombreE = document.getElementsByName('ColumnShowEmS')
    const NombreF = document.getElementsByName('ColumnShowObS')

    const { target: { value },} = event;

    setshowAlias(value.includes('Alias Sucursal'))
    setshowCP(value.includes('CP'))
    setshowMunicipio(value.includes('Municipio'))
    setshowEstado(value.includes('Estado'))
    setshowPais(value.includes('Pais'))
    setshowEliminar(value.includes('Eliminar'))
    setshowEditar(value.includes('Editar'))
    
    console.log(value)

    setPersonName(
      typeof value === 'string' ? value.split(',') : value,
    )
    //ocultar nombre Proveedor
    if(value.includes('Nombre Proveedor')){
         for(let itemNp of NombreP){
             itemNp.setAttribute('hidden','true')
         }
    }else{
      for(let itemNp of NombreP){
        itemNp.removeAttribute('hidden')
    }
    }

    //Ocultar RFC
    if(value.includes('RFC')){
      for(let itemRFC of NombreRFC){
          itemRFC.setAttribute('hidden','true')
      }
    }else{
      for(let itemRFC of NombreRFC){
      itemRFC.removeAttribute('hidden')
      }
    }

    //Ocultar ColumnShowE
    if(value.includes('Email')){
      for(let itemE of NombreE){
          itemE.setAttribute('hidden','true')
      }
    }else{
      for(let itemE of NombreE){
      itemE.removeAttribute('hidden')
      }
    }

    //Ocultar ColumnShowF
    if(value.includes('Observaciones')){
      for(let itemF of NombreF){
          itemF.setAttribute('hidden','true')
      }
    }else{
      for(let itemF of NombreF){
      itemF.removeAttribute('hidden')
      }
    }  
  } 

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
      },
    }

//ESTADOS COLUMNAS
const dataShow = {
  showAlias:showAlias,
  showCP:showCP,
  showMunicipio:showMunicipio,
  showEstado:showEstado,
  showPais:showPais,
  showEliminar:showEliminar,
  showEditar:showEditar
}


//FILTRA DATOS
let data;

if(filtrarP!=null){
  data = dataSxP.filter(data=> data.nombre.toLowerCase().trim().includes(filtrarP.toLowerCase().trim())||
                                data.RFC.toLowerCase().trim().includes(filtrarP.toLowerCase().trim()) ||
                                data.email.toLowerCase().trim().includes(filtrarP.toLowerCase().trim())||
                                data.observaciones.toLowerCase().trim().includes(filtrarP.toLowerCase().trim()))
}else{
  data = dataSxP
}

//FUNCION HANDLE INPUT BUSQUEDA
const FiltarSxp = (e)=>{
  setfiltrarP(e.target.value)
}

const SelectRow = (e)=>{
  //variables
  const nameSelect = e.currentTarget.getAttribute('id')
  const listNodosProveedor = document.getElementsByClassName(`${nameSelect}`)
  const listNodos = document.getElementsByName(`${nameSelect}`)
  const tamano = listNodos.length+1

  //Ocultar los subTR eccepto  el primero
  for(let i=1; i<= listNodos.length-1;i++){
    listNodos[i].toggleAttribute('hidden')
  }
if(!listNodos[1]){
   alert('No hay mas registros asociados')
}else if(listNodos[1].getAttribute('hidden')===null){
    for(let i=0; i<=listNodosProveedor.length-1;i++){
      listNodosProveedor[i].setAttribute('rowSpan',`${tamano}`)
    }
    e.target.removeChild(e.target.childNodes[0])
    e.target.appendChild(document.createTextNode('-'))
}else{
  for(let i=0; i<=listNodosProveedor.length-1;i++){
    listNodosProveedor[i].setAttribute('rowSpan','2')
  }
  e.target.removeChild(e.target.childNodes[0])
  e.target.appendChild(document.createTextNode('+'))
}

}

const FuncionDataEdit = (id)=>{
  FuncDataSucursal(id)
  setactiveFormSxP(!activeFormSxP)

}

const selectS = (val)=>{

    const municipio = document.getElementById('selectMunicipio')
    let bandera = 0
    //PRIMER SELECT
    for(let it of municipio.childNodes){
      if(it.value.toLowerCase().trim() === val.toLowerCase().trim()){
        it.setAttribute('selected','')
        municipio.setAttribute('disabled','')
        console.log(municipio.childNodes.length) 
      }else{
        it.removeAttribute('selected')
        bandera+=1;
      }
    }
    if(bandera === municipio.childNodes.length){
      municipio.removeAttribute('disabled')
    }
    //SEGUNDO SELECT


    // const sel = document.getElementsByClassName('id4')[0]
    // console.log(sel)
    // console.log(sel.getAttribute('selected'))
    // if(sel.getAttribute('selected')!=null){
    //    sel.removeAttribute('selected')
    // }else{
    //   sel.setAttribute('selected','')
    // }
    

}

  return (
    <div className='container' style={{marginTop:'80px'}}>
      <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{}}
      toastOptions={{
        duration: 2000,
      }}
/>
      <div className='containerTitle'>
        <p className='textTitle col-sm-12 col-md-9'  >Lista de Sucursales por Proveedores</p>
        <hr className='hrTitle'/> 
    </div>
    {/* <button className='btn btn-success' onClick={()=>selectS()}>Select</button> */}

    <div style={{ marginBottom:'20px',display:'flex', gap:'20px'}}>

      <div style={{display:'flex',justifyContent:'flex-end',width:'100%',gap:'10px'}}>
      <div className="form-group col-4" >
         <input type="text" style={{height:'40px', width:'100%'}} onChange={(e)=>FiltarSxp(e)}  className="form-control" id="inputEmail4" placeholder="Buscar por Proveedor..."/>
       </div>
       <FormControl style={{ width: 200}}>
        <InputLabel id="demo-multiple-checkbox-label" style={{lineHeight:'15px'}}>Ocultar Columnas</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          style={{height:'40px'}}
          value={personName} 
          onChange={handleChange}
          input={<OutlinedInput label="Ocultar Columnas" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}>
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={personName.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      </div>
      </div>
      <div className='table-responsive'>
      <table className='table' id='tablaMMP' style={{marginTop:'20px'}}>
        <thead className='table-dark'>
          <tr>
            <th>id</th>
            <th>Opcion</th>
            <th name='ColumnShowNPS'>Proveedor</th>
            <th name='ColumnShowRfcS'>RFC</th>
            <th name='ColumnShowEmS'>Email</th>
            <th name='ColumnShowObS'>Observaciones</th>
            {showAlias?null:<th>Alias</th>}
            {showCP?null:<th>C.P</th>}
            {showPais?null:<th>Pais</th>}
            {showEstado?null:<th>Estado</th>}
            {showMunicipio?null:<th>Municipio</th>}
            {showEliminar?null:<th>Eliminar</th>}
            {showEditar?null:<th>Editar</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((data,index)=>(
            <>
            <tr key={index}>
              <td className={data.RFC} rowSpan={2}>{index+1}</td>
              <td className={data.RFC} rowSpan={2} id={data.RFC} onClick={(e)=>SelectRow(e)} style={{fontSize:'28px', lineHeight:'20px',cursor:'pointer'}}>+</td>
              <td className={data.RFC} rowSpan={2} name='ColumnShowNPS'>{data.nombre}</td>
              <td className={data.RFC} rowSpan={2} name='ColumnShowRfcS'>{data.RFC}</td>
              <td className={data.RFC} rowSpan={2} name='ColumnShowEmS'>{data.email}</td> 
              <td className={data.RFC} rowSpan={2} name='ColumnShowObS'>{data.observaciones}</td> 
            </tr>
              <SubTablaSxP 
              FuncionDataEdit={FuncionDataEdit}
              data={data} 
              EliminarSucursal={EliminarSucursal} 
              dataShow={dataShow}
              /> 
            </>
          ))
          }
        </tbody>
      </table>
      </div>
      <FormularioEditarSucursal 
        activeFormSxP={activeFormSxP}  
        setactiveFormSxP={setactiveFormSxP} 
        dataCP={dataCP}
        dataMunicipio={dataMunicipio}
        dataEstado={dataEstado}
        dataPais={dataPais}
        EditarSucursal={EditarSucursal}
        />
     <AgregarSucursalxProveedor 
      DataProveedores={DataProveedores} 
      dataCP={dataCP}
      dataMunicipio={dataMunicipio}
      dataEstado={dataEstado}
      dataPais={dataPais}      
      AddSucursal={AddSucursal}                 
      />
    </div>                            
  )                           
}                           

export default PageSucursalesxProveedor
