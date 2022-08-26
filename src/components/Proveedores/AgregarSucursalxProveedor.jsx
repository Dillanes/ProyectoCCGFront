import React,{useState} from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
function AgregarSucursalxProveedor(props) {

    const [valueForm, setValueForm] = useState([['','','','','','','','','','','','','']]);
    const [inputValue, setInputValue] = useState('');
    
    const [municipio,setMunicipio]=useState(props.dataMunicipio)
    const [estado,setEstado]=useState(props.dataEstado)
    const [pais,setPais]=useState(props.dataPais)




    const addNewRow = (e)=>{
      setValueForm([...valueForm,['','','','','','','','','','','','','']])
    }

    const handleInput = (nuevoV,index,position)=>{
        valueForm[index][position] = nuevoV;
        setValueForm([...valueForm])
    }

    

    const deletReg = (position)=>{
      setValueForm([...valueForm.filter((_,index)=>index!=position)])
    }
    
    const handleChangeReg = (e)=>{
      e.preventDefault()
      const registrooSelect = props.DataProveedores.filter(data=>data.nombre === inputValue)[0]
      props.AddSucursal(valueForm,registrooSelect.idProveedor)
      setValueForm([['','','','','','','','','','','','','']])
      document.getElementsByClassName('MuiAutocomplete-clearIndicator')[0].click()
      setInputValue('')
    }

    const onChangueLocalitation = (valor)=>{
        const municipio = document.getElementById('municipioSxP')
        const estado = document.getElementById('estadoSxP')
        const pais = document.getElementById('paisSxP')
        const inputIn = document.getElementById('cpAddSxP')
        const regCp = props.dataCP.filter(data => data.cp === parseInt(valor))

        if(regCp[0]){
          municipio.childNodes.forEach((elementM,index) => {
              if(parseInt(elementM.value) === regCp[0].fk_MunDeleg){
                elementM.setAttribute('selected','')
                estado.childNodes.forEach((elementE,indexE)=>{
                  if(parseInt(elementM.getAttribute('name')) === parseInt(elementE.value)){
                    elementE.setAttribute('selected','')
                    pais.childNodes.forEach((elementP,indexP)=>{
                      if(parseInt(elementE.getAttribute('name')) === parseInt(elementP.value)){
                        elementP.setAttribute('selected','')
                      }else{
                        elementP.removeAttribute('selected')
                      }
                  })
                }else{
                  elementE.removeAttribute('selected')
                }
              }
              )
              }else{
                elementM.removeAttribute('selected')
              }
            })
            inputIn.removeAttribute('title')
        }else{
          municipio.childNodes.forEach((Mun,index)=>{
            Mun.removeAttribute('selected')
          })
          estado.childNodes.forEach((Mun,index)=>{
            Mun.removeAttribute('selected')
          })
          pais.childNodes.forEach((Mun,index)=>{
            Mun.removeAttribute('selected')
          })
          inputIn.setAttribute('title','NO SE ENCONTRO REGISTRO')
        }
    }


  return (
    <div>
    <hr></hr>
     <Autocomplete
     id="country-select-demo"
     sx={{ width:'40%'}}
     // value={value}
     // onChange={(event, newValue) => {
     //   console.log(newValue.nombre)
     //   setValue(newValue.nombre);
     // }}
     inputValue={inputValue}
     onInputChange={(event, newInputValue) => {
       if(!newInputValue){
        setValueForm([['','','','','','','','','','','','','']])
       }
       setInputValue(newInputValue);
       
     }}

     options={props.DataProveedores}
     autoHighlight
     getOptionLabel={(option) => option.nombre}
     renderInput={(params) => (
       <TextField {...params} label="Proveedor" inputProps={{...params.inputProps,autoComplete: 'new-password',}}/>
     )}/>

     {inputValue === ''?(null): (<div className='mt-4 mb-5 shadow'>
       <div className='row m-1' style={{paddingTop:'20px'}}><h3 className='col-md-11' >Proveedor:{inputValue}</h3><div className='col-md-1'><button onClick={(e)=>addNewRow(e)} className='btn btn-success'>Agregar</button></div></div>

    <form id='formAddS' onSubmit={(e)=>handleChangeReg(e)}>
     {valueForm.map((reg,index)=>(
        <div className='mb-2' key={index} style={{padding:'20px'}}>
        <div className='row' ><h3 className='col-md-11'>Sucursal {index+1}</h3><div className='col-md-1'>{index===0?null:<input type='button' value='Eliminar' className='btn btn-danger' onClick={()=>deletReg(index)}/>}</div></div>
        <div className='row'>
        <div className="mb-3 col-sm-12 col-md-4">
          <input onChange={(e)=>handleInput(e.target.value,index,0)} required value={reg[0]} type="text" className="form-control" placeholder='Sucursal' />
        </div>
        <div className="mb-3 col-sm-12 col-md-4">       
          <input onChange={(e)=>handleInput(e.target.value,index,1)} required value={reg[1]} type="tel" className="form-control" placeholder='Telefono' />
        </div>
        <div className="mb-3 col-sm-12 col-md-4">         
          <input onChange={(e)=>handleInput(e.target.value,index,2)} value={reg[2]} type="text" className="form-control" required placeholder='Contacto de Atención' />
        </div>
        </div>
        <div className='row'>
        <div className="mb-3 col-sm-12 col-md-4">
          <input onChange={(e)=>handleInput(e.target.value,index,4)} value={reg[4]} type="text" className="form-control" required placeholder='Cargo Superior' />
        </div>
        <div className="mb-3 col-sm-12 col-md-4">       
          <input onChange={(e)=>handleInput(e.target.value,index,3)} value={reg[3]} type="text" className="form-control" required placeholder='Nombre Superior' />
        </div>
        </div>
        <div className='row m-1'>DIRECCIÓN:</div>
        <div className='row'>
        <div className="mb-3 col-sm-12 col-md-1">
          <input id='cpAddSxP' onChange={(e)=>{handleInput(e.target.value,index,5);onChangueLocalitation(e.target.value)}} value={reg[5]} type="number" maxLength='5' className="form-control" required placeholder='CP' />
        </div>
        <div className="mb-3 col-sm-12 col-md-4">
          <select id='municipioSxP' disabled className='form-select'>
            <option value='mun'>---------</option>
            {!props.dataMunicipio?(null):(
              props.dataMunicipio.map((op,index)=>(
                  <option value={op.idMunDeleg} name={op.fk_Estado} >{op.nombre}</option>
              )))
            }
          </select>
        </div>
        <div className="mb-3 col-sm-12 col-md-4">
        <select id='estadoSxP' disabled className='form-select'>
            <option value='mun'>---------</option>
            {!props.dataEstado?(null):(
              props.dataEstado.map((op,index)=>(
                  <option value={op.idEstado} name={op.fk_Pais}>{op.nombre}</option>
              )))
            }
            </select>
        </div>
        <div className="mb-3 col-sm-12 col-md-3">
        <select id='paisSxP' disabled className='form-select'>
            <option value='mun'>---------</option>
            {!props.dataPais?(null):(
              props.dataPais.map((op,index)=>(
                  <option value={op.idPais}>{op.nombre}</option>
              )))
            }
            </select>
        </div>
        </div>
        <div className='row'>
        <div className="mb-3 col-sm-12 col-md-3">
          <input onChange={(e)=>handleInput(e.target.value,index,9)} value={reg[9]} type="text" className="form-control" required placeholder='Colonia' />
        </div>
        <div className="mb-3 col-sm-12 col-md-3">
          <input onChange={(e)=>handleInput(e.target.value,index,10)} value={reg[10]} type="text" className="form-control" required placeholder='Calle' />
        </div>
        <div className="mb-3 col-sm-12 col-md-1">
          <input onChange={(e)=>handleInput(e.target.value,index,11)} value={reg[11]} type="number" className="form-control" required placeholder='No.Int' />
        </div>
        <div className="mb-3 col-sm-12 col-md-1">
          <input onChange={(e)=>handleInput(e.target.value,index,12)} value={reg[12]} type="number" className="form-control" required placeholder='No.Ext'/>
        </div>
        </div>
        <hr></hr>
      </div>
    
     ))}
     <div style={{display:'flex', justifyContent:'flex-end' }}><div className='m-3'><input type='submit' value='  Enviar  ' className='btn btn-success'/></div></div>
     
     </form>
       
       

     </div>)}
     
     </div>
  )
}

export default AgregarSucursalxProveedor
