import React,{useEffect,useState} from 'react'
import {useForm} from 'react-hook-form'
import {TableContext} from '../../context/Materiales/TableContext'
import { useProveedores } from '../../context/Proveedores/ProveedoresContext';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


function FormularioAsignarPxM(props) {
    const {
        dataMaterialAdd,
        dataMarca,
        dataSucursal,
        AddMaterialProvedor,
        dataMarcaSucursal
      } = React.useContext(TableContext)
    const {
        DataProveedores
        } = useProveedores()


   const {register,formState:{errors},handleSubmit,reset} = useForm({})

    const [proveedorSelect,setProveedorSelect] = useState(null)
    const [ubicacionSucursal,setUbicacionSucursal] = useState(null)
    const [Marca,setMarca] = useState(dataMarca) 
    const [Sucursal,setSucursal] = useState(dataSucursal) 
    const [Proveedor,setProveedor] = useState() 
    const[fkMarca,setFkMarca]= useState()
    const[fkProveedor,setFkProveedor]= useState()

    useEffect(() => {
        setProveedor(DataProveedores)
    }, [DataProveedores]);

    const onSubmit = (data)=>{
        let fkProvMar = dataMarcaSucursal.filter(data=>data.fk_Proveedor === fkProveedor.idProveedor && data.fk_Marca === fkMarca.idMarca)[0].idProvMar
        AddMaterialProvedor(data,dataMaterialAdd.idMaterial,fkProvMar,ubicacionSucursal.idSucProv)
        
        setTimeout(() => {
            reset()
            setProveedorSelect(null)
            setUbicacionSucursal(null)
            props.setShowModalPXM(false)
        }, 200);
        
    
    }


  const AnidarProveedorSucursalMarca = (newValue)=>{
    setProveedorSelect(newValue)
   
    if(newValue){
        setSucursal(dataSucursal.filter(data => data.fk_Proveedor === newValue.idProveedor))
           const regValue =  dataMarcaSucursal.filter((data)=> data.fk_Proveedor === newValue.idProveedor)

           let arrayN = []

           if(regValue){
           for(let OpArray of regValue){
            arrayN = [...arrayN,OpArray.fk_Marca]

           }
           setMarca(dataMarca.filter(reg => arrayN.includes(reg.idMarca)  ))
        }

    }
    
  }


  const UbicacionSucursal = (newValue)=>{
    setUbicacionSucursal(newValue)
  }


    if (!props.ShowModalPXM) return null
    
    return (
      
      <>    
      <div className='overlay' >
      <div className='modalContainer'>
        <button className='closeBtn'  onClick={()=>{props.setShowModalPXM(false);reset();setProveedorSelect(null);setUbicacionSucursal(null)}}>X</button>
        <div className='headerTittle'>Asignarle Proveedor al Material</div>
                <div className='TargetScroll' style={{marginTop:'40px'}}>
                    <form id='fromAMxP' encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)} >
                    <div className='row'>
                    <div className="mb-3 col-sm-12 col-md-2">
                    <label htmlFor="inputEmail4">Codigo</label>
                      <input type="text" className="form-control"  value={dataMaterialAdd.codigoOmc}  {...register("codigoOmc",{disabled:true})} />
                      
                    </div>
                    <div className="mb-3 col-sm-12 col-md-2">
                        <label htmlFor="inputEmail4">Consecutivo</label>       
                      <input type="text" className="form-control" value={dataMaterialAdd.consecutivo}  {...register("consecutivo",{disabled:true})}/>
                    
                    </div>
                    <div className="mb-3 col-sm-12 col-md-4">
                        <label htmlFor="inputEmail4">Fuente de Información</label>         
                      <input type="text" className="form-control" required {...register("fuenteInf",{required:true})} />
                      
                    </div>
                    <div className="mb-3 col-sm-12 col-md-4">
                        <label htmlFor="inputEmail4">Precio</label>         
                      <input type="number" className="form-control" required  {...register("pMercado",{required:true})}  />
        
                    </div>
                    </div>
                    <div className='row'>
                    <div className="mb-3 col-sm-12 col-md-5">
                        <label htmlFor="inputEmail4">Descripción Corta</label>       
                      <input type="text" className="form-control" value={dataMaterialAdd.descriCorta}   {...register("descriCorta",{disabled:true})}/>
                      {errors.descriCorta && <span className="text-danger text-small d-block mb-2">no valido</span>}
                    </div>
                    <div className="mb-3 col-sm-12 col-md-7">
                        <label htmlFor="inputEmail4">Descripción Larga</label>       
                      <input type="text" className="form-control" value={dataMaterialAdd.descriLarga}   {...register("descriLarga",{disabled:true})}/>
                      {errors.descriLarga && <span className="text-danger text-small d-block mb-2">no valido</span>}
                    </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-4 col-sm-12'>
                         <Autocomplete
                                disablePortal
                                className='mb-2'
                                id="combo-box-Proveedor"
                                options={Proveedor}
                                required
                                getOptionLabel={(option)=>option.nombre}
                                onChange={(event, newValue) => {
                                    AnidarProveedorSucursalMarca(newValue)
                                    setFkProveedor(newValue)
                                }}
                                // onInputChange={(event, newInputValue) => {
                                //     handleInput(newInputValue,index,0)
                                // }}
                                renderInput={(params) => 
                                <TextField {...params} required label="Proveedor"/>}
                                />
                                </div>
                                <div className='col-md-4 col-sm-12'>
                        <Autocomplete
                                disablePortal
                                className='mb-2'
                                required
                                id="combo-box-Marca"
                                options={Marca}
                                onChange={(event, newValue) => {
                                    setFkMarca(newValue)
                                    console.log(newValue)
                                }}
                                disabled = {proveedorSelect===null?true:false}
                                getOptionLabel={(option)=>option.nombre}
                                renderInput={(params) => 
                                <TextField {...params} required label="Marca"/>}
                                />
                                </div>
                                <div className='col-md-4 col-sm-12'>
                        <Autocomplete
                                disablePortal
                                className='mb-2'
                                id="combo-box-Sucursal"
                                options={Sucursal}
                                required
                                disabled={proveedorSelect===null?true:false}
                                getOptionLabel={(option)=>option.alias}
                                onChange={(event, newValue) => {
                                    UbicacionSucursal(newValue)
                                }}
                                renderInput={(params) => 
                                <TextField {...params} required label="Sucursal"/>}
                                /></div>
                            </div>
                            {!ubicacionSucursal?null:
                            <div className='row'>
                            <div className="mb-3 col-sm-12 col-md-4">
                            <label htmlFor="inputEmail4">Colonia</label>       
                            <input type="text" className="form-control" value={ubicacionSucursal.colonia}   {...register("descriLarga",{disabled:true})}/>
                            </div>

                            <div className="mb-3 col-sm-12 col-md-4">
                            <label htmlFor="inputEmail4">Calle</label>       
                            <input type="text" className="form-control" value={ubicacionSucursal.calle}   {...register("descriLarga",{disabled:true})}/>
                            </div>

                            <div className="mb-3 col-sm-12 col-md-4">
                            <label htmlFor="inputEmail4">CP</label>       
                            <input type="text" className="form-control" value={ubicacionSucursal.fk_CP}   {...register("descriLarga",{disabled:true})}/>
                            </div>

                            </div>}
                    </form>
                
            </div>
            <div className='row mt-2 justify-content-end'>
                    <input type='submit' className='btn btn-primary col-md-2 m-2' form='fromAMxP' value='Guardar'/>
                    <input type='reset' className='btn btn-danger col-md-2 m-2' form='fromAMxP' value='Cancelar'/>
                </div>
        </div>

        </div>
        <div className='modal-backdrop fade show' style={{zIndex:50}}></div>
        </>
        
    )
    
}

export default FormularioAsignarPxM
