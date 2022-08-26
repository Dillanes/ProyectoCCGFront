import React,{Fragment} from 'react'
import { useForm } from "react-hook-form";
import { useOmcCon34 } from '../../context/omc34/ContextOmcCon34';
import Tooltip from '@mui/material/Tooltip';


const FormularioEditarCO =(props)=>{

  const {editarConsultaR,
            nivelConsultaRoll,
            showNodalEditCR,
            setshowNodalEditCR,
            EditarConsultaRolesO} = useOmcCon34()

  const {register,formState:{errors},handleSubmit,setValue,reset} = useForm({
    defaultValues:props.data
  })

    if(editarConsultaR != null){
        setValue('codigo',editarConsultaR[0].codigo)
        setValue('descriEng',editarConsultaR[0].descriEng)
        setValue('descriSpa', editarConsultaR[0].descriSpa)
        setValue('definicionEng',editarConsultaR[0].definicionEng)
        setValue('definicionSpa',editarConsultaR[0].definicionSpa)
        setValue('anioReg',editarConsultaR[0].anioReg)
        setValue('regFinal',editarConsultaR[0].regFinal)
        setValue('regUsuario',editarConsultaR[0].regUsuario)
        setValue('fuenteInf',editarConsultaR[0].fuenteInf)
        setValue('anioRegInf',editarConsultaR[0].anioRegInf)
    }



    const onSubmit = (data,e)=>{
        if(nivelConsultaRoll===1){
            EditarConsultaRolesO(data,nivelConsultaRoll,editarConsultaR[0].idOmc34N1)
        }else if(nivelConsultaRoll===2){
            EditarConsultaRolesO(data,nivelConsultaRoll,editarConsultaR[0].idOmc34N2,editarConsultaR[0].fk_Omc34N1)
        }else if(nivelConsultaRoll===3){
            EditarConsultaRolesO(data,nivelConsultaRoll,editarConsultaR[0].idOmc34N3,editarConsultaR[0].fk_Omc34N2)
        }else if(nivelConsultaRoll===4){
            EditarConsultaRolesO(data,nivelConsultaRoll,editarConsultaR[0].idOmc34N4,editarConsultaR[0].fk_Omc34N3)
        }else if(nivelConsultaRoll===5){
            EditarConsultaRolesO(data,nivelConsultaRoll,editarConsultaR[0].idOmc34N5,editarConsultaR[0].fk_Omc34N4)
        }
        
      reset()
      setTimeout(() => {
        setshowNodalEditCR(false)
      }, 500);
    }
  
  if(showNodalEditCR===false) return null


  return (
    <Fragment>
    <div className='overlay' >
    <div className='modalContainer'>
        <button className='closeBtn'  onClick={()=>setshowNodalEditCR(false)}>X</button>
        <div className='headerTittle'> Editar registro complementario de la norma Omniclass 34: Nivel {nivelConsultaRoll}</div>
        

        <div className='form' style={{marginTop:'40px'}}>
        <form className='row formOmc34' onSubmit={handleSubmit(onSubmit)}>
            <div className='row'>
              <div className="mb-3 col-sm-12 col-md-2">
                <label htmlFor="exampleInputEmail1" className="form-label">Codigo</label>
                <input type="text" className="form-control" id="exampleInputEmail1"   {...register('codigo',{required:true})} disabled aria-describedby="emailHelp"/>
                {errors.codigo && <span className="text-danger text-small d-block mb-2">No valido</span>}
              </div>
              <div className="mb-3 col-sm-12 col-md-2">
                <label htmlFor="exampleInputEmail1"  className="form-label">Año de Registro</label>
                <input type="text" className="form-control" {...register('anioReg',{required:true})} id="exampleInputEmail1" aria-describedby="emailHelp"/>
                {errors.anioReg && <span className="text-danger text-small d-block mb-2">No valido</span>}
              </div>
              <div className="mb-3 col-sm-12 col-md-4">
                <label htmlFor="exampleInputEmail1" className="form-label">Descripción en Inglés</label>
                <input type="text" className="form-control" id="exampleInputEmail1" {...register('descriEng',{required:true})} aria-describedby="emailHelp"/>
                {errors.descriEng && <span className="text-danger text-small d-block mb-2">No valido</span>}
              </div>
              <div className="mb-3 col-sm-12 col-md-4">
                <label htmlFor="exampleInputEmail1" className="form-label">Descripción en Español</label>
                <input type="text" className="form-control" id="exampleInputEmail1" {...register('descriSpa',{required:true})} aria-describedby="emailHelp"/>
                {errors.descriSpa && <span className="text-danger text-small d-block mb-2">No valido</span>}
              </div>
              </div>
               
               <div className='row'>

              <div class="col-sm-12 mb-3 col-md-4">
              <label htmlFor="exampleInputEmail1" className="form-label">Definición en Inglés</label>
                <textarea class="form-control textAreaFormOmc34" {...register('definicionEng',{required:true})}   id="floatingTextarea"></textarea>
                {errors.definicionEng && <span className="text-danger text-small d-block mb-2">No valido</span>}
              </div>
              <div class=" col-sm-12 mb-3 col-md-4">
              <label htmlFor="exampleInputEmail1" className="form-label">Definición en Español</label>
                <textarea class="form-control textAreaFormOmc34" {...register('definicionSpa',{required:true})}   id="floatingTextarea"></textarea> 
                {errors.definicionSpa && <span className="text-danger text-small d-block mb-2">No valido</span>}
              </div>

              {nivelConsultaRoll>=2?(
                <div className='col-md-4 mt-md-4'>
                <div className="custom-control col-md-12  mt-md-4 custom-checkbox" >
                <Tooltip placement='top' title="APLICA COMO  REGISTRO FINAL">
                <input type="checkbox"  className="custom-control-input m-2" {...register("regFinal")} id="customCheck1"/>
                </Tooltip>
                {errors.regFinal && <span className="text-danger text-small d-block mb-2">{errors.regFinal}</span>}          
                <label className="custom-control-label" htmlFor="customCheck1">Aplica como registro Final?</label>           
                </div>
                {nivelConsultaRoll>=3?(
                <div className="custom-control col-md-12 mt-md-4 custom-checkbox">
                <Tooltip placement='bottom' title="APLICA COMO REGISTRO DE USUARIO">
                <input type="checkbox"  className="custom-control-input m-2" {...register("regUsuario")} id="customCheck1"/>
                </Tooltip>
                {errors.regUsuario && <span className="text-danger text-small d-block mb-2">{errors.regUsuario}</span>}
                <label className="custom-control-label" htmlFor="customCheck1">Aplica como registro de Usuario?</label>
              </div>):(null)}
                </div>
                ):(null)}




              </div>
             
       {nivelConsultaRoll>=3?(
            <div className='row  mt-2 ' >
              <div className="mb-3 col-sm-12 col-md-4">
                <label htmlFor="exampleInputEmail1"  className="form-label">Fuente de Información</label>
                <input type="text" className="form-control" {...register('fuenteInf')} id="exampleInputEmail1" aria-describedby="emailHelp"/>
                {errors.fuenteInf && <span className="text-danger text-small d-block mb-2">No valido</span>}
              </div>,
              <div className="mb-3 col-sm-12 col-md-4">
                <label htmlFor="exampleInputEmail1" className="form-label">Año de alta del registro</label>
                <input type="date" className="form-control" {...register('anioRegInf')} id="exampleInputEmail1" aria-describedby="emailHelp"/>
                {errors.fecRegInf && <span className="text-danger text-small d-block mb-2">{errors.fecRegInf}</span>}
              </div>
              </div> 
            ):(null)} 
                
                


                <div className='d-flex mb-3 align-items-end flex-column'>
                  <div>
                    <button type="submit" className="btn m-2  btn-primary mt-3">Guardar</button>
                    <button type="reset" onClick={()=>setshowNodalEditCR(false)} className="btn m-2 btn-danger mt-3">Cancelar</button>
                  </div>
                 </div>
            </form>
  
            </div>
            </div>

        </div>
        <div className='modal-backdrop fade show' style={{zIndex:50}}></div>
        </Fragment>

  )
}

export default FormularioEditarCO