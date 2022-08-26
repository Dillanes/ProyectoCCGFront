import React,{useState} from 'react'
import {useForm} from 'react-hook-form'
import image from '../../assets/img/defaultLogo.png'
import { useProveedores } from '../../context/Proveedores/ProveedoresContext'
import {BiImageAdd} from 'react-icons/bi'

export default function FormularioRegistrar () {

        const {RegistarProveedores} = useProveedores()
        const {register,formState:{errors},handleSubmit,reset} = useForm()
        const[NewImg,setNewImg] = useState(image)
        const[EnviarImg,setEnviarImg] = useState()

        const onImageChange = (event)=>{
            if (event.target.files && event.target.files[0]) {
                setNewImg(URL.createObjectURL(event.target.files[0]))
                setEnviarImg(event.target.files[0])
              }
        }

        const onSubmit = (data)=>{
            RegistarProveedores(data,EnviarImg)
            setNewImg(image)

        }
        
    return (
        <div className='container mt-5 shadow' style={{position:'relative', marginBottom:'40px' }}>
            <div style={{backgroundColor:'#000', color:'#fff', position:'absolute', width:'100%', left:'0',paddingLeft:'10px'}}>FORMULARIO PARA REGISTRAR PROVEEDOR</div>
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" style={{paddingTop:'40px', }}>
           <div className="row mt-2">
            <div className="form-group col-sm-12 mt-2 col-md-6">
             <input type="text"  className="form-control" id="inputEmail4" {...register("nombre",{required:true})} placeholder="Nombre"/>
             {errors.nombre && <span className="text-danger text-small d-block mb-2">No valido</span>}
             
           </div>
           <div className="form-group col-sm-12 mt-2 col-md-6">
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
           <img src={NewImg} height='150' width='150'/>
         </div>
         </div>
    
    
           <div className='d-flex align-items-end flex-column'>
          <div><button type="submit" className="btn m-2  btn-primary mt-3">Guardar</button>
         <button type="reset" onClick={()=>{reset();setEnviarImg([]);setNewImg(image) }} className="btn m-2 btn-danger mt-3">Cancelar</button></div>
         </div>
       </form>
        </div>
      )

}
  


