import React,{Fragment,useState} from 'react'
import {RiDeleteBack2Fill, RiRegisteredFill} from 'react-icons/ri'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {useForm} from 'react-hook-form' 
// import Box from '@mui/material/Box';
import { useProveedores } from '../../context/Proveedores/ProveedoresContext';
// import { height } from '@mui/system';
function FormularioAsignarMarca(props) {
 
    const {dataMarca,DataProveedores,AltaRelacionMxP} = useProveedores()
    const {register,handleSubmit} = useForm()
    const [SaveData,setSaveData] = useState([['','']])

    const onSubmit = (data,e)=>{
        AltaRelacionMxP(SaveData)
        
        setTimeout(() => {
            props.setactiveFormMxP(false)
            setSaveData([['','']])
        }, 500);
    }
    
    const handleInput = (nuevoV,index,position)=>{
        SaveData[index][position] = nuevoV;
        setSaveData([...SaveData])

    }


    const AddRow = (e)=>{
        e.preventDefault()
        setSaveData([...SaveData,['','']])

    }

    const DeletRow = (position)=>{
        setSaveData([...SaveData.filter((_,index)=>index != position)])

    }

    if (!props.activeFormMxP) return null
    return (
      <Fragment>
      <div className='overlay' >
      <div className='modalContainer'>
        <button className='closeBtn'  onClick={()=>{props.setactiveFormMxP(false);setSaveData([['','']])}}>X</button>
        <div className='headerTittle'> Asignar Marca a Proveedor</div>
            <div className='TargetScroll' style={{marginTop:'40px'}}>
                <form  encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}  id='formMxP'  >
                    <div className='table-responsive'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Proveedor</th>
                                <th>Marcas</th>
                                <th style={{textAlign:'center'}}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {SaveData.map((reg,index)=>(
                                <tr key={index}>
                                <td>{index+1}</td>
                                <td><div>
                                {/* SELECT PROVEEDOR*/}
                                <Autocomplete

                                inputValue={SaveData[index][0]}
                                onInputChange={(event, newValue) => {
                                    handleInput(newValue,index,0)
                                }}
                                
                                
                                id="combo-box-demo"
                                options={DataProveedores}
                                getOptionLabel={(option)=>option.nombre}
                                renderInput={(params) => 
                                <TextField {...params} label="Proveedor" {...register(`Proveedor${index+1}`,{require:true})}/>}
                                />
                                {/* SELECT MARCA*/}
                                </div></td>
                                <td><div>
                                <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                name='Marca[]'

                                onInputChange={(event, newInputValue) => {

                                    handleInput(newInputValue,index,1)

                                }}

                                options={dataMarca}
                                getOptionLabel={(option)=>option.nombre}
                                renderInput={(params) => 
                                <TextField  {...params}  label="Marca" {...register(`Marca${index+1}`,{require:true})}/>}
                                />
                                </div></td>
                                {index != 0 && index === SaveData.length-1  ?
                                <td style={{textAlign:'center', color:'red', fontSize:'20px'}}>
                                    <RiDeleteBack2Fill style={{cursor:'pointer'}} onClick={()=>DeletRow(index)}/>
                                </td>:null}
                            </tr>
                            ))
                            }
                        </tbody>
                    </table>
                    </div>
                    
                </form>
            </div>
            <div className='m-2 row'>
            <button  className='btn btn-success col-md-1 ' onClick={(e)=>AddRow(e)} >
                        +
                    </button>
                    </div>
            <div className='row justify-content-end'>
                    <input type='submit' className='btn btn-primary col-md-2 m-2' form='formMxP' value='Guardar'/>
                    <input type='button' className='btn btn-danger col-md-2 m-2' form='formMxP' value='Cancelar' onClick={()=>{props.setactiveFormMxP(false);setSaveData([['','']])}}/>
                </div>
        </div>
  
        </div>
        <div className='modal-backdrop fade show' style={{zIndex:50}}></div>
        </Fragment>
    )
}

export default FormularioAsignarMarca
