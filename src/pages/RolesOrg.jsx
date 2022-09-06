import React, { Fragment } from 'react'
import { useOmcCon34 } from '../context/omc34/ContextOmcCon34';
import { Toaster} from "react-hot-toast";
import TablaOmc34N from '../components/omc34RolesO/TablaOmc34N'
import FormOmc34 from '../components/omc34RolesO/FormOmc34'
import Footer from '../components/footer'

import '../styles/omc34/styles.css'

function RolesOrg() {
  const {nextNivel,
          descripcion,
          datamap,
          previusLevel,
          numLevel,
          dataForm,
          registrarRolOrg,
          setdataForm,
          formhiden,
          setformhiden,
          RegistrarRolOrg} = useOmcCon34()



  return (
<Fragment>
      <Toaster
          position='bottom-right'
          toastOptions={{
            duration:3000,
            style:{
              background:'#222',
              color:'white'
            }
          }}
        />
      <div className='container containerOmc34RolOrg' style={{marginTop:'20px'}}>
          {/* <TablaOmc34 datamap={datamap} nextNivel={nextNivel}  nivel={numLevel}/>    */}
          <div className='containerTitle'>
          <p className='textTitle'>Complementar Norma Omniclass 34: <p style={{fontZise:''}}>Formulario de Registro de Nuevos Roles Organizacionales</p></p>
          <hr className='hrTitle'/>
        </div>
          <TablaOmc34N datamap={datamap} nextNivel={nextNivel} registrarRolOrg={registrarRolOrg}  nivel={numLevel}  />              
          {
            descripcion.length>0?(
              <div className='ContainertabsOmc34RolOrg' style={{height:'100px'}}>
                  {descripcion.map((desc,index)=>(
                      <div onClick={()=>{previusLevel(desc.nivel);setformhiden(false)}} title={desc.descripcion} key={index} className='tabsOmc34RolOrg'>{desc.nivel}</div>
                    ))}
              </div> 
            ):(null)
          } 
      

         {
          formhiden?(<FormOmc34 RegistrarRolOrg={RegistrarRolOrg} nivel={numLevel}  dataForm={dataForm} setformhiden={setformhiden} setdataForm={setdataForm} />):(null)
         }

          

          
      </div>
      <Footer/>
      </Fragment>
  )
}

export default RolesOrg
