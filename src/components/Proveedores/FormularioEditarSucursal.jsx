import React,{useState} from 'react'
import { useProveedores } from '../../context/Proveedores/ProveedoresContext';
import {useForm} from 'react-hook-form'


function FormularioEditarSucursal(props) {
       
    const {dataEditS}= useProveedores()
    const {register,handleSubmit,setValue,formState:{errors}} = useForm()
    setValue('alias',dataEditS.alias)
    setValue('numTel',dataEditS.numTel)
    setValue('calle',dataEditS.calle)
    setValue('cargoSuperior',dataEditS.cargoSuperior)
    setValue('contactoAten',dataEditS.contactoAten)
    setValue('nomSuperior',dataEditS.nomSuperior)
    setValue('colonia',dataEditS.colonia)
    setValue('noExt',dataEditS.noExt)
    setValue('noInt',dataEditS.noInt)
    setValue('cp',dataEditS.fk_CP)



    const [municipio,setMunicipio] = useState()
    const [estado,setEstado] = useState()
    const [pais,setpais] = useState()
     
    const OnchangeCp = (val)=>{
          //  console.log(val.split(''))
          //  if(val.split('').length )
    }
   
    const onSubmit = (data,event)=>{
      props.EditarSucursal(data,dataEditS.idSucProv,dataEditS.fk_Proveedor)
      setTimeout(() => {
        props.setactiveFormSxP(false)
      }, 500);

    }


    const onChangueLocalitationEdit = (valor=dataEditS.fk_CP)=>{
      const municipio = document.getElementById('municipioEditSxP')
      const estado = document.getElementById('estadoEditSxP')
      const pais = document.getElementById('paisEditSxP')
      const inputIn = document.getElementById('cpEditSxP')
      const regCp = props.dataCP.filter(data => data.cp === parseInt(valor))

      if(regCp[0] && municipio.childNodes){
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
          }
          
          )
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
        inputIn.setAttribute('title','NO SE ENCONTRO REGISTRO COMUNÍQUECE CON EL ADMINISTRADOR')
      }
  }

  

    if (!props.activeFormSxP) return null
    
    return (
      
      <>  
     {
      setTimeout(() => {
        onChangueLocalitationEdit()
      }, 100)
     }
      
      <div className='overlay' >
      <div className='modalContainer'>
        <button className='closeBtn'  onClick={()=>props.setactiveFormSxP(false)}>X</button>
        <div className='headerTittle'>Editar Sucursal</div>
                <div className='TargetScroll' style={{marginTop:'40px'}}>
                <form  onSubmit={handleSubmit(onSubmit)} id='formMxP'  >
                <div className='row'>
                    <div className="mb-3 col-sm-12 col-md-5">
                    <label htmlFor="inputEmail4">Sucursal</label>
                      <input type="text" className="form-control"  {...register("alias",{required:true,maxLength:80})} />
                      {errors.alias && <span className="text-danger text-small d-block mb-2">no valido</span>}
                    </div>
                    <div className="mb-3 col-sm-12 col-md-3">
                        <label htmlFor="inputEmail4">Telefono</label>       
                      <input type="tel" className="form-control"  {...register("numTel",{required:true,maxLength:20})}/>
                      {errors.numTel && <span className="text-danger text-small d-block mb-2">no valido</span>}
                    </div>
                    <div className="mb-3 col-sm-12 col-md-4">
                        <label htmlFor="inputEmail4">Contacto de Atención</label>         
                      <input type="text" className="form-control" {...register("contactoAten",{required:true,maxLength:50})} />
                      {errors.contactoAten && <span className="text-danger text-small d-block mb-2">no valido</span>}
                    </div>
                    </div>
                    <div className='row'>
                    <div className="mb-3 col-sm-12 col-md-4">
                        <label htmlFor="inputEmail4">Nombre Superior</label>       
                      <input type="text" className="form-control" {...register("nomSuperior",{})} />
                    </div>
                    <div className="mb-3 col-sm-12 col-md-4">
                        <label htmlFor="inputEmail4">Cargo Superior</label>
                      <input type="text" className="form-control" {...register("cargoSuperior",{})}/>
                    </div>
                    </div>
                    <div className='row'>DIRECCIÓN:</div>
                    <div className='row'>
                    <div className="mb-3 col-sm-12 col-md-2">
                        <label htmlFor="inputEmail4">CP</label>
                      <input type="number" maxLength='5' id='cpEditSxP' className="form-control" {...register("cp",{required:true,minLength:3, maxLength:6,onChange:(e)=>onChangueLocalitationEdit(e.target.value)})}/>
                      {errors.cp && <span className="text-danger text-small d-block mb-2">no valido</span>}
                    </div>
                    <div className="mb-3 col-sm-12 col-md-4">
                        <label htmlFor="inputEmail4">Municipio</label>
                        <select id='municipioEditSxP' disabled className='form-select'>
                         <option value='mun'>---------</option>
                          {!props.dataMunicipio?(null):(
                           props.dataMunicipio.map((op,index)=>(
                               <option value={op.idMunDeleg} name={op.fk_Estado} >{op.nombre}</option>
                           )))
                         }
                        </select>
                    </div>
                    <div className="mb-3 col-sm-12 col-md-3">
                        <label htmlFor="inputEmail4">Estado</label>
                        <select id='estadoEditSxP' disabled className='form-select'>
                           <option value='mun'>---------</option>
                           {!props.dataEstado?(null):(
                             props.dataEstado.map((op,index)=>(
                                  <option value={op.idEstado} name={op.fk_Pais}>{op.nombre}</option>
                             )))
                           }
                        </select>               
                    </div>
                    <div className="mb-3 col-sm-12 col-md-3">
                        <label htmlFor="inputEmail4">Pais</label>
                        <select id='paisEditSxP' disabled className='form-select'>
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
                        <label htmlFor="inputEmail4">Colonia</label>
                      <input type="text" className="form-control" {...register("colonia",{required:true})}/>
                      {errors.colonia && <span className="text-danger text-small d-block mb-2">no valido</span>}
                    </div>
                    <div className="mb-3 col-sm-12 col-md-3">
                        <label htmlFor="inputEmail4">Calle</label>
                      <input  type="text" className="form-control" {...register("calle",{required:true})} />
                      {errors.calle && <span className="text-danger text-small d-block mb-2">no valido</span>}
                    </div>
                    <div className="mb-3 col-sm-12 col-md-2">
                        <label htmlFor="inputEmail4">No.Int</label>
                      <input  type="number" className="form-control" {...register("noInt",{minLength:3,maxLength:3})}/>
                      {errors.noInt && <span className="text-danger text-small d-block mb-2">Requiere 3 digitos</span>}
                    </div>
                    <div className="mb-3 col-sm-12 col-md-2">
                        <label htmlFor="inputEmail4">No.Ext</label>
                      <input  type="number" className="form-control" {...register("noExt",{minLength:3,maxLength:3})}/>
                      {errors.noExt && <span className="text-danger text-small d-block mb-2">Requiere 3 digitos</span>}
                    </div>
                    </div>
                </form>
            </div>
            <div className='row mt-2 justify-content-end'>
                    <input type='submit' className='btn btn-primary col-md-2 m-2' form='formMxP' value='Guardar'/>
                    <input type='reset' className='btn btn-danger col-md-2 m-2' form='formMxP' value='Cancelar' onClick={()=>props.setactiveFormSxP(false)}/>
                </div>
        </div>

        </div>
        <div className='modal-backdrop fade show' style={{zIndex:50}}></div>
        </>
        
    )
    
}

export default FormularioEditarSucursal
