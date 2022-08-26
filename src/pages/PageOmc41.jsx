import React, { Fragment,useState} from 'react'
import Omcn1 from '../components/omc41/omcn1'
import Omcn2 from '../components/omc41/omcn2'
import Omcn3 from '../components/omc41/omcn3'
import Omcn4 from '../components/omc41/omcn4'
import Omcn5 from '../components/omc41/omcn5'
import Omcn6 from '../components/omc41/omcn6';
import Footer from '../components/footer'
import ModalEdid from '../components/omc41/ModalEdid'
import {Toaster} from 'react-hot-toast'
import { useOmc41 } from '../context/omc41/ContextOmc41'
import Aside from '../components/omc41/aside'
import Modal2Add from '../components/omc41/Modal2Add'
import ButtonExel from '../components/buttonExel'
export default function PageOmc41() {


  const {UpdateOmc41Url,
    dataomcn2,
    dataomcn3,
    dataomcn4,
    dataomcn5,
    dataomcn6,
    omc41n1,
    omc41n2,
    omc41n3,
    omc41n4,
    omc41n5,
    omc41n6,
    selectOpp,
    selectOpp2,
    selectOpp3,
    selectOpp4,
    selectOpp5
  } =  useOmc41()

  const [numeroTabla,setnumeroTabla] = useState()
  const [dataFormAdd,setdataFormAdd] = useState([])
  const [select, setselect] = useState()
  const [current,setcurrent]=useState({
    codigo:'',
    anioReg:'',
    definicionEng:'',
    definicionSpa:'',
    descriEng:'',
    descriSpa:'',
    regFinal:'',
   })


//Funcion para seleccionar fk
  const selectFk = (codigo)=>{
    const codigoN = dataFormAdd.filter(fk=> fk.codigo === codigo)
    setselect(codigoN[0].codigo)
  }

   

   const edidrow = (id,data)=>{
    setnumeroTabla(id)
    setcurrent({
      codigo: data.codigo, 
      anioReg:data.anioReg, 
      definicionEng:data.definicionEng,
      definicionSpa:data.definicionSpa,
      descriEng:data.descriEng,
      descriSpa:data.descriSpa,
      regFinal:data.regFinal,
    })
    setactiveedit(true)
  }

  //Estado Modales
  const [active,setactive]= useState(false)
  const [showT,setShowT]= useState(false)
  const [activeedit,setactiveedit] = useState(false)

  const createReciveTable = (idtable)=>{
    
       setnumeroTabla(idtable)
       setactive(true) 
       switch(idtable){
        case 2:{
          setdataFormAdd(omc41n1)
        }break;
        case 3:{
 
          setdataFormAdd(omc41n2)
        }break;
        case 4:{

          setdataFormAdd(omc41n3)
        }break;
        case 5:{

          setdataFormAdd(omc41n4)
        }break;
        case 6:{

          setdataFormAdd(omc41n5)
        }break;
      }
  }
  
   const updateRegistro = (data)=>{
    setcurrent(data)
    
    switch(numeroTabla){
      case 1:{
        const idRegistro = omc41n1.filter(reg=>reg.codigo==data.codigo)
        UpdateOmc41Url(numeroTabla,idRegistro[0].idOmc41N1,data)
      }break;
      case 2:{
        console.log('es el updateRegistro', data)
        const idRegistro = omc41n2.filter(reg=>reg.codigo==data.codigo)
        UpdateOmc41Url(numeroTabla,idRegistro[0].idOmc41N2,data,idRegistro[0].fk_Omc41N1)
      }break;
      case 3:{
        const idRegistro = omc41n3.filter(reg=>reg.codigo==data.codigo)
        UpdateOmc41Url(numeroTabla,idRegistro[0].idOmc41N3,data,idRegistro[0].fk_Omc41N2)
      }break;
      case 4:{
        const idRegistro = omc41n4.filter(reg=>reg.codigo==data.codigo)
        UpdateOmc41Url(numeroTabla,idRegistro[0].idOmc41N4,data,idRegistro[0].fk_Omc41N3)
      }break;
      case 5:{
        const idRegistro = omc41n5.filter(reg=>reg.codigo==data.codigo)
        UpdateOmc41Url(numeroTabla,idRegistro[0].idOmc41N5,data,idRegistro[0].fk_Omc41N4)
      }break;
      case 6:{
        const idRegistro = omc41n6.filter(reg=>reg.codigo==data.codigo)
        UpdateOmc41Url(numeroTabla,idRegistro[0].idOmc41N6,data,idRegistro[0].fk_Omc41N5)
      }break;
    }
    

  }

  const ActiveModalAddBtn = (showTable,idTabla,codigo)=>{
    console.log(codigo)
    setselect(codigo)
    setnumeroTabla(idTabla)
    setactive(showTable)
    setShowT(showTable)

  }



   return (
     <Fragment>
      
       <div className='container marginDivTable' style={{}}>
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
        
        <ButtonExel/>
        <div className='containerTitle'>
          <p className='textTitle'>Norma Omniclass 41: Materiales</p>
          <hr className='hrTitle'/>
        </div>

        <Omcn1 Omcn1={omc41n1} selectOpp={selectOpp} edidrow={edidrow}/>
        {dataomcn2.length>0 ?(<Omcn2 dataomcn2={dataomcn2} active={ActiveModalAddBtn} selectOpp2={selectOpp2} edidrow={edidrow}/>):(null)}       
        {dataomcn3.length>0  ?(<Omcn3 dataomcn3={dataomcn3} active={ActiveModalAddBtn} selectOpp3={selectOpp3} edidrow={edidrow}/>):(null)}  
        {dataomcn4.length>0  ?(<Omcn4 dataomcn4={dataomcn4} active={ActiveModalAddBtn} selectOpp4={selectOpp4} edidrow={edidrow}/>):(null)}
        {dataomcn5.length>0  ?(<Omcn5 dataomcn5={dataomcn5} active={ActiveModalAddBtn} selectOpp5={selectOpp5} edidrow={edidrow}/>):(null)}
        {dataomcn6.length>0 ?(<Omcn6 dataomcn6={dataomcn6} active={ActiveModalAddBtn} edidrow={edidrow}/>):(null)}

        <ModalEdid current={current} setactive={setactiveedit} active={activeedit}   numeroTabla={numeroTabla} updateRegistro={updateRegistro}/>
        
        </div>
        <Footer/>
        <Aside createReciveTable={createReciveTable}/>
        <Modal2Add 
        active={active} 
        numeroTabla={numeroTabla} 
        selectFk={selectFk} 
        dataAdd={dataFormAdd} 
        setactive={setactive} 
        select={select}
        setselect={setselect}
        showT={showT}
        setShowT={setShowT}
        >
        </Modal2Add>
     </Fragment >
   )
 }