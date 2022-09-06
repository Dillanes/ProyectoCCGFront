import React,{Fragment,useState,useEffect} from 'react'
import {useForm} from 'react-hook-form'
import { useProveedores } from '../../context/Proveedores/ProveedoresContext'
import {BiImageAdd} from 'react-icons/bi'
import defaultImg from '../../assets/img/defaultLogo.png'
function FormularioEditar(props) {


    const {activeFormP,
        setactiveFormP,
        dataFormulario,
        ImgSave,
        setImgSave,
        EditarProveedores
        } = useProveedores()

    const [image, setImage] = useState()
    // const [cambio,setcambio] = useState(false)
    // const [Imgenviar,setImgenviar] = useState()
    
    

    const {register,formState:{errors},handleSubmit,setValue,reset} = useForm({
        defaultValues:props.data
    })


    useEffect(() => {
      setValue('nombre',dataFormulario.nombre)
      setValue('RFC',dataFormulario.RFC)
      setValue('email', dataFormulario.name)
      setValue('fabricante',dataFormulario.fabricante)
      setValue('activo',dataFormulario.activo)
      setValue('observaciones',dataFormulario.observaciones)
      setValue('logoImg',dataFormulario.logoImg)
      setValue('urlSitioWeb',dataFormulario.urlSitioWeb)
    }, [activeFormP]); 




const onImageChange = (event)=>{
    if (event.target.files && event.target.files[0]) {
        setImgSave(URL.createObjectURL(event.target.files[0]))
        setImage(event.target.files[0])
      }
}

const onSubmit = (data,event)=>{
    EditarProveedores(data,dataFormulario.idProveedor,ImgSave,image)
    setTimeout(() => {
        setactiveFormP(false)
        reset()
    }, 500);
    
}


  if (!activeFormP) return null

  return (
    <Fragment>
    <div className='overlay' >
    <div className='modalContainer'>
        <button className='closeBtn'  onClick={()=>{setactiveFormP(false);reset();setImage(null)}}>X</button>
        <div className='headerTittle'> Editar Proveedores</div>
        

        <div className='TargetScroll' style={{marginTop:'40px'}}>
        <form onSubmit={handleSubmit(onSubmit)} id='formProveedorEdit' encType="multipart/form-data">
       <div className="row mt-2">
        <div className="form-group col-sm-12 mt-2 col-md-6">
         <input type="text"  className="form-control" id="inputEmail4" {...register("nombre",{required:true})} placeholder="Nombre"/>
         {errors.nombre && <span className="text-danger text-small d-block mb-2">No valido</span>}
         
       </div>
       <div className="form-group col-sm-12 mt-2 col-md-4">
         <input type="text" maxLength='13' className="form-control" id="inputPassword4" {...register("RFC",{maxLength:13})} placeholder="RFC"/>
         {errors.RFC && <span className="text-danger text-small d-block mb-2">No valido</span>}
       </div>
     </div>
     <div className="row mt-sm-2 mt-2">
     <div className="form-group col-sm-12 mt-2 col-md-6">
       <input className="form-control" maxLength='45' type='email' id="exampleFormControlTextarea1" placeholder='Email' {...register("email",{ maxLength:45})} rows="3"/>
       {errors.email && <span className="text-danger text-small d-block mb-2">No valido</span>}
     </div>
     <div className="form-group col-sm-12 mt-2 col-md-6">
       <input className="form-control" id="exampleFormControlTextarea1" placeholder='URL de sitio Web' rows="3" {...register("urlSitioWeb",{maxLength:100})}/>
       {errors.urlSitioWeb && <span className="text-danger text-small d-block mb-2">No valido</span>}
     </div>
     </div>
     <div className="row mt-2 InputAdd">
     <div className="form-group mt-2 col-sm-12 mt-2 col-md-6">
       <textarea className="form-control" id="exampleFormControlTextarea1" maxLength='500' placeholder='Observaciones' {...register("observaciones",{maxLength:500})} rows="3"></textarea>
       {errors.observaciones && <span className="text-danger text-small d-block mb-2">No valido</span>}
     </div>
          <div className="custom-control col-sm-6 mt-2 col-md-3 custom-checkbox">
       <input type="checkbox"  className="custom-control-input m-2" {...register("activo")} id="customCheck1"/>
       <label className="custom-control-label" htmlFor="customCheck1">Activo?</label>
       </div>
       <div className="custom-control col-sm-6 mt-2 col-md-3 custom-checkbox">
       <input type="checkbox"  className="custom-control-input m-2" {...register("fabricante")} id="customCheck1"/>
       <label className="custom-control-label" htmlFor="customCheck1">Fabricante?</label>
       </div>
     </div>
     <div className="row mt-2 InputAdd">
         <div className="form-group mt-2 col-sm-12 mt-2 col-md-3">
          <label className='imgss' style={{cursor:'pointer'}} >
            <span>Seleccionar Img<BiImageAdd  style={{fontSize:'45px'}}/>
            <input className='imgss' name='img' type="file" onChange={onImageChange}  style={{display:'none'}}  />
            </span></label>
         </div>
         <div className="form-group mt-2 col-sm-6 mt-2 col-md-3">
           <img src={ImgSave}  height='150' width='150'/>
         </div>
         </div>


       
   </form>
  
            </div>
            <div className='d-flex align-items-end flex-column'>
      <div><button type="submit" className="btn m-2  btn-primary mt-3" form='formProveedorEdit'>Guardar</button>
     <button type="reset" form='formProveedorEdit' onClick={()=>{reset();setactiveFormP(false);setImage(null)}} className="btn m-2 btn-danger mt-3">Cancelar</button></div>
     </div>
</div>

        </div>
        <div className='modal-backdrop fade show' style={{zIndex:50}}></div>
        </Fragment>
  )
}

export default FormularioEditar
