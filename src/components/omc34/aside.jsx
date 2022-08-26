import React,{useState} from 'react'
import '../../styles/omc23/aside.css'

export default function Aside(props) {

    const [name,setname]= useState('containerAsideOpacity');
    const Show = (e)=>{
        if(name=='containerAsideOpacity'){setname('containerAside')}
        if(name=='containerAside'){setname('containerAsideOpacity')}
        
    }

  return (
    <div className={name}>
     
        <div className='tag' onClick={(e)=>Show(e)} title='Registrar nuevo concepto'><i className="fa-solid fa-arrow-right" style={{color:'#fff', padding:'7px', fontSize:'25px'}}></i></div>
      <ul className='navAside'>

        <li className='ListItems' style={{borderRadius:'8px 0px 0px 0px'}} onClick={()=>props.createReciveTable(1)}><div className='asideText'>Nivel1</div></li>
        <li className='ListItems' onClick={()=>props.createReciveTable(2)}><div className='asideText'>Nivel2</div></li>
        <li className='ListItems' onClick={()=>props.createReciveTable(3)}><div className='asideText'>Nivel3</div></li>
        <li className='ListItems' style={{borderRadius:'0px 0px 0px 8px'}} onClick={()=>props.createReciveTable(4)}><div className='asideText'>Nivel4</div></li>

      </ul>
      <div className='asideTitle'>Selecciona un Nivel</div>
    </div>
  )
}


