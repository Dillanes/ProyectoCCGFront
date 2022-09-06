import React,{Fragment} from 'react'
import '../styles/omc34/styles.css'
import Footer from '../components/footer'
import {Toaster} from 'react-hot-toast'
import '../styles/omc34/stylesConsulta.css'
import { useOmcCon34 } from '../context/omc34/ContextOmcCon34'
import ListaConsulta from '../components/omc34RolesO/ListaConsulta'


function PageConsultaOrg() {

  // DATOS DE LOS DISTITOS NIVELES DE Omc34
    const {
      //Registro 1
      omc34n1,
      reg1N2,
      Registro1,
      reg1N3,
      opcionCase

    }  = useOmcCon34()
   //



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
          <p className='textTitle'>Complementar Norma Omniclass 34: <p style={{fontZise:''}}>Consulta Roles Organizacionales</p></p>
          <hr className='hrTitle'/>
        <div className='containerListaConsultaOmc34'>
              <ListaConsulta omc34n1={omc34n1} regN3={reg1N3} Registro={Registro1} opcionCase={opcionCase} regN2={reg1N2}/>

          </div>
        </div>
          

          

          
      </div>
      <Footer/>
      </Fragment>
  )
}

export default PageConsultaOrg
