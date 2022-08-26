import React from 'react'
import { useForm } from "react-hook-form";
import '../styles/login/styles.css'
import { useLogin } from '../context/LoginContext';
import { Toaster } from 'react-hot-toast';

import Logo from '../assets/img/logoConsulting.png'

const Login = () => {
    const {register,formState:{errors} ,handleSubmit,setValue} = useForm();
    
    const {Login} = useLogin()

    const onSubmit = (data,e)=>{
        Login(data)
    }


  return (
   

     <div className='containerLoginInicio'>
      
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
        <div className="sidenav" >
         <div className="login-main-text">
            <div className='ContainerImgLogin'>
            <div className='brilloLogo'></div>
            <div className='brilloLogo2'></div>
            <img className='LogoCCGLogin' src={Logo}/>
            </div>
            <div className='textLoginDesc'>
               <h3>IMPULSAMOS LA TRANSFORMACIÓN<br/> HACIA LA CONSTRUCCIÓN 4.0 </h3>
               <p>Integración de Tecnologías para la Administración de
               Proyectos de Arquitectura, Ingeniería y Construcción</p>
            </div>
            
         </div>
      </div>
      <div className="main">
         <div className="col-md-6 col-sm-12">
            <div className="login-form">
               <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
                  <div className="form-group">
                     <label>Nombre de Usuario:</label>
                     <input type="text" className="form-control" {...register("username",{required:true})} placeholder="Usuario.."/>
                     {errors.username && <span className="text-danger text-small d-block mb-2">Se requiere el nombre de usuario</span>}
                  </div>
                  <div className="form-group">
                     <label>Contraseña:</label>
                     <input type="password" className="form-control" {...register("password",{required:true})} placeholder="Contraseña.."/>
                     {errors.password && <span className="text-danger text-small d-block mb-2">Se requiere la contraseña</span>}
                  </div>
                  
                  <button style={{color:'#fff',marginTop:'4px'}} type="submit" className="botonInicioLogin">Ingresar</button>
               </form>
            </div>
         </div>
         </div>
         </div>




  )
}

export default Login;
