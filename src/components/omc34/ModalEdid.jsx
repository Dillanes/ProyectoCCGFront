import React,{useState,Fragment} from "react";
import { useForm } from "react-hook-form";
import '../../styles/omc23/styles.css'


export default function ModalEdid(props) {
  

  const {register,formState:{errors} ,handleSubmit,setValue} = useForm({
    defaultValues:props.current
  });

  setValue('codigo',props.current.codigo)
  setValue('descriEng',props.current.descriEng)
  setValue('descriSpa',props.current.descriSpa)
  setValue('definicionEng',props.current.definicionEng)
  setValue('definicionSpa',props.current.definicionSpa)
  // setValue('ejemploEng',props.current.ejemploEng)
  // setValue('ejemploSpa',props.current.ejemploSpa)
  setValue('anioReg',props.current.anioReg)
  setValue('regFinal',props.current.regFinal)

  const onSubmit = (data,e)=>{

          if(e.target.regFinal){console.log(e.target.regFinal.checked)}
          props.updateRegistro(data)
          console.log('datos de onsubmit', data)
          props.setactive(false)
      }

  if (!props.active) return null

  return (
    <Fragment>
    <div className='overlay' >
    <div className='modalContainer'>
        <button className='closeBtn'  onClick={()=>props.setactive(false)}>X</button>
        <div className='headerTittle'> Editar concepto de la norma Omniclass 34: Roles Organizacionales Nivel {props.numeroTabla}</div>
        

        <div className='form' style={{marginTop:'40px'}}>
        <form onSubmit={handleSubmit(onSubmit)}>
       <div className="row InputAdd">
        <div className="form-group mt-sm-2 col-md-6">
         <label htmlFor="inputEmail4">Código</label>
         <input type="text" maxLength='9' className="form-control" id="inputEmail4" {...register("codigo",{required:true,minLength:9})} placeholder="Código"/>
         {errors.codigo && <span className="text-danger text-small d-block mb-2">No valido</span>}
         
       </div>
       <div className="form-group mt-sm-2 col-md-4">
         <label htmlFor="inputPassword4">Año de Registro</label>
         <input type="text" maxLength='4' className="form-control" id="inputPassword4" {...register("anioReg",{required:true,maxLength:4})} placeholder="Año de Registro"/>
         {errors.anioReg && <span className="text-danger text-small d-block mb-2">No valido</span>}
       </div>
     </div>
     <div className="row mt-sm-2 mt-2">
     <div className="form-group mt-2 col-md-6 col-sm-12">
       <input className="form-control" id="exampleFormControlTextarea1" maxLength='100' placeholder='Descripción en Inglés' {...register("descriEng",{ maxLength:100})} rows="3"/>
       {errors.descriEng && <span className="text-danger text-small d-block mb-2">No valido</span>}
     </div>
     <div className="form-group mt-2 col-md-6 col-sm-12">
       <input className="form-control" id="exampleFormControlTextarea1" maxLength='100' placeholder='Descripción en Español' rows="3" {...register("descriSpa",{maxLength:100})}/>
       {errors.descriSpa && <span className="text-danger text-small d-block mb-2">No valido</span>}
     </div>
     </div>
     <div className="row mt-2 InputAdd">
     <div className="form-group mt-2 col-md-6 col-sm-12">
       <textarea className="form-control" id="exampleFormControlTextarea1" maxLength='300' placeholder='Definición en Inglés' {...register("definicionEng",{maxLength:300})} rows="3"></textarea>
       {errors.definicionEng && <span className="text-danger text-small d-block mb-2">No valido</span>}
     </div>
     <div className="form-group mt-2 col-md-6 col-sm-12">
       <textarea className="form-control" id="exampleFormControlTextarea1" maxLength='470' placeholder='Definición en Español' {...register("definicionSpa",{maxLength:470})} rows="3"></textarea>
       {errors.definicionSpa && <span className="text-danger text-small d-block mb-2">No valido</span>}
     </div>
     </div>
     {props.numeroTabla>1? (
       <div className="custom-control mt-2 col-md-6 custom-checkbox">
       <input type="checkbox"  className="custom-control-input m-2" {...register("regFinal")} id="customCheck1"/>
       <label className="custom-control-label" htmlFor="customCheck1">Aplica como registro Final?</label>
       </div>):(null)}
     
       <div className='d-flex align-items-end flex-column'>
      <div><button type="submit" className="btn m-2  btn-primary mt-3">Guardar</button>
     <button type="reset" onClick={()=>props.setactive(false)} className="btn m-2 btn-danger mt-3">Cancelar</button></div>
     </div>
   </form>
  
            </div>
</div>

        </div>
        <div className='modal-backdrop fade show' style={{zIndex:50}}></div>
        </Fragment>
      )
}

