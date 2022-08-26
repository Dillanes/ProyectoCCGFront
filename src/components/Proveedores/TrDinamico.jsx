import React from 'react'
import {RiDeleteBack2Fill} from 'react-icons/ri'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function TrDinamico(props) {
  return (
    <tr>
    <td>1</td>
    <td><div>
    {/* SELECT PROVEEDOR*/}
    <Autocomplete
    disablePortal
    id="combo-box-demo"
    options={props.DataProveedores}
    onReset={()=>alert('hols')}
    getOptionLabel={(option)=>option.nombre}
    // renderOption={(props,option)=>(
    //     <Box component="li" {...props}>
    //     {option.idProveedor}.- {option.nombre}
    //     </Box>
    // )}

    renderInput={(params) => 
    <TextField {...params} label="Proveedor"  {...props.register("nombreP1",{required:true})} />}
    />
    {/* SELECT MARCA*/}
    </div></td>
    <td><div>
    <Autocomplete
    disablePortal
    id="combo-box-demo"
    options={props.dataMarca}
    getOptionLabel={(option)=>option.nombre}
    renderInput={(params) => 
    <TextField {...params} label="Marca" {...props.register("nombreM1",{required:true})}/>}
    />
    </div></td>
    <td style={{textAlign:'center', color:'red', fontSize:'20px'}}>
        <RiDeleteBack2Fill style={{cursor:'pointer'}}/>
    </td>
</tr>
  )
}
