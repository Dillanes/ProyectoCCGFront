import React, { Fragment } from 'react'
import Slider from '../components/Slider'
import logoCCG from '../assets/img/logoConsulting.png'
import { Toaster } from 'react-hot-toast'
function Home() {
  return (
    <Fragment>
      <Toaster
          position='top-center'
          toastOptions={{
            duration:3000,
            style:{
              background:'#222',
              color:'white'
            }
          }}
        />
      <div className='containerHome'>
        <div className='targetHome'></div>
           <h1 className='tituloHome'>SISTEMA DE GESTIÓN DE INFORMACIÓN CONSULTING & CONSTRUCTION</h1>
           <div><img className='imgHome2' src={logoCCG}/></div>
           
    </div>
    <div className='sliderHome'>
        <Slider/>
    </div>
    </Fragment>
    
)
}

export default Home