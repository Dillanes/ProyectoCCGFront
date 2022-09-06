import React from 'react'
import { useNavigate } from 'react-router-dom'

function Previsualizacion(props) {

    const navegadr = useNavigate()

if (!props.ShowModalPrevisualizar) return null

  
return (
    <>    
    <div className='overlay' >
    <div className='modalContainer'>
      <button className='closeBtn'  onClick={()=>props.setShowModalPrevisualizar(false)}>X</button>
      <div className='headerTittle'>Previsualizar Datos</div>
          <div className='TargetScroll' style={{marginTop:'40px'}}>
            
            <div className='row justify-content-between'>
                <div className='col-md-2 col-sm-12 mb-4'>
                    <label className='form-label'><strong>Código:</strong></label>
                    <div>{props.datosEnviar.codigo}</div>
                </div>
                <div className='col-md-2 col-sm-12 mb-2'>
                    <label className='form-label'><strong>Consecutivo:</strong></label>
                    <div>{props.datosEnviar.consecutivo}</div>
                </div>
                <div className='col-md-4 col-sm-12 mb-2'>
                    <label className='form-label'><strong>Descripción en Inglés:</strong></label>
                    <div>{props.datosEnviar.descriEng}</div>
                </div>
                <div className='col-md-4 col-sm-12 mb-2'>
                    <label className='form-label'><strong>Descripción en Español:</strong></label>
                    <div>{props.datosEnviar.descriSpa}</div>
                </div>
                </div>
                <hr/>
                {/*CEMENTO */}
                {props.datosEnviar.numMat===300&&(
                    <div className='row'>
                        <div className='col-md-4 col-sm-12 mb-2'>
                            <label className='form-label'><strong>Clase de Resistencia</strong></label>
                            <div>{props.datosEnviar.claseCemento}</div>
                        </div>
                        <div className='col-md-4 col-sm-12 mb-2'>
                        <label className='form-label'><strong>Tipo de Cemento</strong></label>
                        <div>{props.datosEnviar.tipoCemento}</div>
                        </div>
                    </div>
                )}
                {/* ACEROS */}
                {props.datosEnviar.numMat===500&&(<><div className='row justify-content-between'>
                <div className='col-md-6 col-sm-12 mb-2'>
                    <label className='form-label'><strong>Tipo de Esfuerzo:</strong></label>
                    <div>{props.datosEnviar.esfuerzo}</div>
                </div>
                <div className='col-md-3 col-sm-12 mb-2'>
                    <label className='form-label'><strong>Grado:</strong></label>
                    <div>{props.datosEnviar.grado}</div>
                </div>
                <div className='col-md-3 col-sm-12 mb-2'>
                    <label className='form-label'><strong>Masa:</strong></label>
                    <div>{props.datosEnviar.masa}</div>
                </div>
                </div>
                <hr/>
                <div className='row justify-content-between'>
                <div className='col-md-3 col-sm-12 mb-2'>
                    <label className='form-label'><strong>No. de Varilla:</strong></label>
                    <div>{props.datosEnviar.numVarilla}</div>
                </div>
                <div className='col-md-3 col-sm-12 mb-2'>
                    <label className='form-label'><strong>Diámetro:</strong></label>
                    <div>{props.datosEnviar.diametro}</div>
                </div>
                <div className='col-md-3 col-sm-12 mb-2'>
                    <label className='form-label'><strong>Área:</strong></label>
                    <div>{props.datosEnviar.area}</div>
                </div>
                <div className='col-md-3 col-sm-12 mb-2'>
                    <label className='form-label'><strong>Perimetro:</strong></label>
                    <div>{props.datosEnviar.perimetro}</div>
                </div>
                
                </div></>)}
                <hr/>   
          </div>
          <div className='row mt-2 justify-content-end'>
                  <input type='submit' className='btn btn-primary col-md-2 m-2' form='fromAMxP' onClick={()=>{props.AddRegistroAceroR(props.datosEnviar);navegadr('/omniclass');props.setShowModalPrevisualizar(false)}} />
                  <button  className='btn btn-danger col-md-2 m-2' form='fromAMxP'  onClick={()=>props.setShowModalPrevisualizar(false)} >Cancelar</button>
              </div>
      </div>

      </div>
      <div className='modal-backdrop fade show' style={{zIndex:50}}></div>
      </>
  )
}

export default Previsualizacion
