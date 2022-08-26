import axios from "axios";
import React, { useEffect, useState, useMemo } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useLogin } from "../LoginContext";

const Omc34ConContext = React.createContext();

export function Omc34ConProvider(props){
  const {dataToken} = useLogin()
  const URLBASE = 'http://127.0.0.1:8000/'
  
  //TOKEN
   


  const headers = { headers:{
    'Authorization': `Token ${dataToken.token}`
  }}



    useEffect(() => {
        fetData()
       }, []);

    const [omc34n1,setomc34n1] = useState([])
    const [omc34n2,setomc34n2] = useState([])
    const [omc34n3,setomc34n3] = useState([])
    const [omc34n4,setomc34n4] = useState([])
    const [omc34n5,setomc34n5] = useState([])
    const [omc34n1TreeData,setomc34n1TreeData] = useState([])
    const [numLevel, setnumLevel]= useState(1)
    const [dataomc34n2,setdataomc34n2]= useState()
    const [dataomc34n3,setdataomc34n3]= useState()
    const [RolesOrg,setRolesOrg] = useState()
    const [dataForm,setdataForm] = useState()
    const [datamap,setdatamap] = useState([])
    const [contador,setcontador] = useState(1)
    const [descripcion,setdescripcion] = useState([])
    const [formhiden,setformhiden] =useState(false)
    const [Colap,setColap] = useState(false)
    const [Interlineado,setInterlineado] = useState(100)
    const [childVisible, setchildVisible] = useState(false);
    const [editarConsultaR,seteditarConsultaR] = useState()
    const [nivelConsultaRoll,setnivelConsultaRoll] = useState()
    const [showNodalEditCR,setshowNodalEditCR] = useState(false)


    
     
      // var indent = 1


      //   function walk(tree) {
          
      //     tree.forEach(function (node) {
      //       if(node.children){
              
      //         const add = RolesOrg.filter((data)=>data.codigo === node.codigo)
      //         // console.log('DATA FILTRADA',add)
      //         if(add.length>0){
      //           node.children.push(add)
      //         }       
  
  
      //       }
            

  
      //         if(node.length){
      //           node.forEach(element=>console.log("--" + Array(indent).join("--"),element.codigo))
               
      //         }else{
      //           console.log("--" + Array(indent).join("--"), node.codigo)
                
      //         }
              
            
            
  
      //       if(node.children){
      //         if (node.children.length>0) {
      //           indent++;
      //           walk(node.children);
      //         }
      //       }
            
      //       if (tree.indexOf(node) === tree.length - 1) {
      //         indent--;
      //       }
      //     });
      // }

    
      
      // walk(omc34n1TreeData)

    

    //ESTADOS Y FUNCIONES | CONSULTA ROLES ORGANIZACIONALES

    // Estados para la consulta de Roles Organizacionales


    
   const previusLevel = async(nivel)=>{
          switch (nivel) {
            case 'Nivel1':
                await setdatamap(omc34n1)
                console.log(descripcion)
                setdescripcion([])
                setnumLevel(1)
              break;
              case 'Nivel2':
                await setdatamap(dataomc34n2)
                setdescripcion([descripcion[0]])
                setnumLevel(2)
              break;
              case 'Nivel3':
                await setdatamap(dataomc34n3)
                setdescripcion([descripcion[0],descripcion[1]])
                setnumLevel(3)
              break;
          
            default:
              break;
          }
          
   }
     
   const registrarRolOrg =async(data)=>{
         setdataForm(data)
         setformhiden(true)
         fetData()
   } 


    const nextNivel = async(data,numNivel)=>{
          switch (numNivel) {
            case 1:
                const id = omc34n1.filter((omcdata)=>omcdata.codigo === data.codigo)
                 await setdatamap(omc34n2.filter((omcdata)=>omcdata.fk_Omc34N1===id[0].idOmc34N1))
                 setdescripcion([...descripcion,{nivel:`Nivel${numNivel}`, descripcion:data.descriSpa}])
                 setdataomc34n2(omc34n2.filter((omcdata)=>omcdata.fk_Omc34N1===id[0].idOmc34N1))
                 setnumLevel(numNivel+1)
                // setdataomc34n2()
              break;

            case 2:
              const id2 = omc34n2.filter((omcdata)=>omcdata.codigo === data.codigo)
              await setdatamap(omc34n3.filter((omcdata)=>omcdata.fk_Omc34N2===id2[0].idOmc34N2))
              await setdescripcion([...descripcion,{nivel:`Nivel${numNivel}`, descripcion:data.descriSpa}])
              setdataomc34n3(omc34n3.filter((omcdata)=>omcdata.fk_Omc34N2===id2[0].idOmc34N2))
              await setnumLevel(numNivel+1)
              break;

            case 3:
              const id3 = omc34n3.filter((omcdata)=>omcdata.codigo === data.codigo)
              await setdatamap(omc34n4.filter((omcdata)=>omcdata.fk_Omc34N3===id3[0].idOmc34N3))
              await setdescripcion([...descripcion,{nivel:`Nivel${numNivel}`, descripcion:data.descriSp}])
              await setnumLevel(numNivel+1)
              break;
          
            default:
              break;
          }
    }

    const RegistrarRolOrg = async(Data,Nivel,id)=>{
      const CodigoCon = `${Data.codigo.trim()}-${String(Data.Consecutivo)}`
      console.log('FK: ',id)
      axios
      .post(`${URLBASE}apirolesorg/RolesOrg/`,{
        cveMo:null,
        codigo:Data.codigo,
        consecutivo:Data.Consecutivo ,
        descriEng:Data.descriEng ,
        descriSpa:Data.descriSpa ,
        definicionEng:Data.definicionEng ,
        definicionSpa:Data.definicionSpa ,
        fuenteInf:Data.fuenteInf,
        fecRegInf:Data.fecRegIng,
        
    }
    
    ,headers)
      .then((response) => {
            fetData()
            console.log(response.request.status)
      }).catch((error)=>{
        console.log(error)
      });

     if(Nivel===2){
      axios.post(
        `${URLBASE}apiomcroles/OMC34Nivel3/`,
        {
          codigo: CodigoCon,
          descriEng: Data.descriEng,
          descriSpa: Data.descriSpa,
          definicionEng: Data.definicionEng,
          definicionSpa: Data.definicionSpa,
          regFinal:Data.regFinal,
          regUsuario:Data.regUsuario,
          anioRegInf:Data.fecRegIng,
          fk_Omc34N2:id
          }
         
        ,headers).then((response) => {
          fetData()
          toast.success("EL registro se ha creado exitosamente")
          console.log(response.request.status)
    }).catch((error)=>{
      console.log(error)
    });
     }

     if(Nivel===3){
      axios.post(
        `${URLBASE}apiomcroles/OMC34Nivel4/`,
        {
          codigo: CodigoCon,
          descriEng: Data.descriEng,
          descriSpa: Data.descriSpa,
          definicionEng: Data.definicionEng,
          definicionSpa: Data.definicionSpa,
          anioRegInf:Data.fecRegIng,
          regFinal:Data.regFinal,
          regUsuario:Data.regUsuario,
          fk_Omc34N3:id
          }
         
        ,headers).then((response) => {
          fetData()
          toast.success("EL registro se ha creado exitosamente")
          console.log(response.request.status)
    }).catch((error)=>{
      console.log(error)
    });
     }

     if(Nivel===4){
      axios.post(
        `${URLBASE}apiomcroles/OMC34Nivel5/`,
        {
          codigo: CodigoCon,
          descriEng: Data.descriEng,
          descriSpa: Data.descriSpa,
          definicionEng: Data.definicionEng,
          definicionSpa: Data.definicionSpa,
          regFinal:Data.regFinal,
          regUsuario:Data.regUsuario,
          anioRegInf:Data.fecRegIng,
          fk_Omc34N4:id
          }
         
        ,headers).then((response) => {
          fetData()
          toast.success("EL registro se ha creado exitosamente")
          console.log(response.request.status)
    }).catch((error)=>{
      console.log(error)
    });
     }
      

     }
      
          

    






    const fetData = async()=>{
      axios
      .get(`${URLBASE}apiomcroles/OMC34Nivel1/`,headers)
      .then((response) => {
        setomc34n1(response.data.results);
        if(contador===1){
          setdatamap(response.data.results)
          setcontador(5)
        } 
      }).catch((error)=>{
        console.log(error)
      }).finally(()=> console.log('se acabo la peticion'))

      axios
      .get(`${URLBASE}apiomcroles/OMC34Nivel2/`,headers)
      .then((response) => {
        setomc34n2(response.data.results);
      }).catch((error)=>{
        console.log(error)
      });
    
    axios
      .get(`${URLBASE}apiomcroles/OMC34Nivel3/`,headers)
      .then((response) => {
        setomc34n3(response.data.results);
      }).catch((error)=>{
        console.log(error)
      });

      axios
      .get(`${URLBASE}apiomcroles/OMC34Nivel4/`,headers)
      .then((response) => {
        setomc34n4(response.data.results);
      }).catch((error)=>{
        console.log(error)
      });

      axios
      .get(`${URLBASE}apiomcroles/OMC34Nivel5/`,headers)
      .then((response) => {
        setomc34n5(response.data.results);
      }).catch((error)=>{
        console.log(error)
      });

      axios
      .get(`${URLBASE}apirolesorg/RolesOrg/`,headers)
      .then((response) => {
        setRolesOrg(response.data.results);
      }).catch((error)=>{
        console.log(error)
      });

      axios
      .get(`${URLBASE}apiomcroles/OMC34Nivel1Relation/`,headers)
      .then((response) => {
        setomc34n1TreeData(response.data.results);
        console.log('DATA: ',response.data.results)


      }).catch((error)=>{
        console.log(error)
      });

     
    }
    
 ///  FUNCION EDITAR CONSULTA ROLL ORGANIZACIONAL
      
const EditRollOrganizacional = (codigo,nivel)=>{
    switch (nivel) {
      case 1:
          seteditarConsultaR(omc34n1.filter(data=>data.codigo === codigo))
          console.log('dfgdfgdfgdfgfd')
          break;
        case 2:
          seteditarConsultaR(omc34n2.filter(data=>data.codigo === codigo))
          console.log('desde contex',codigo,nivel)
          break;
        case 3:
          seteditarConsultaR(omc34n3.filter(data=>data.codigo === codigo))
        break;
        case 4:
          seteditarConsultaR(omc34n4.filter(data=>data.codigo === codigo))
        break;
        case 5:
          seteditarConsultaR(omc34n5.filter(data=>data.codigo === codigo))
        break;
        default:
          break;
    }
    setnivelConsultaRoll(nivel)
    setshowNodalEditCR(true)


}

//EDITAR CONSULTA ROLES ORGANIZACIONALES
const EditarConsultaRolesO = async(Data,nivel,id,fk)=>{
  switch (nivel) {
    case 1:
      axios.put(`${URLBASE}apiomcroles/OMC34Nivel${nivel}/${id}/`,{
        codigo: Data.codigo,
        descriEng: Data.descriEng,
        descriSpa: Data.descriSpa,
        definicionEng: Data.definicionEng,
        definicionSpa: Data.definicionSpa,
        anioReg:Data.anioReg,
      },headers)
      .then(response=>{
        fetData()
        toast.success("EL registro se ha creado exitosamente")
        console.log(response)
      }).catch(error=>{
        console.log(error)
      })
      break;
    case 2:
      axios.put(`${URLBASE}apiomcroles/OMC34Nivel${nivel}/${id}/`,{
        codigo: Data.codigo,
        descriEng: Data.descriEng,
        descriSpa: Data.descriSpa,
        definicionEng: Data.definicionEng,
        definicionSpa: Data.definicionSpa,
        regFinal:Data.regFinal,
        anioReg:Data.anioReg,
        fk_Omc34N1: fk,
      },headers)
      .then(response=>{
        fetData()
        toast.success("EL registro se ha creado exitosamente")
        console.log(response)
      }).catch(error=>{
        console.log(error)
      })
      break;
    case 3:
      axios.put(`${URLBASE}apiomcroles/OMC34Nivel${nivel}/${id}/`,{
        codigo: Data.codigo,
        descriEng: Data.descriEng,
        descriSpa: Data.descriSpa,
        definicionEng: Data.definicionEng,
        definicionSpa: Data.definicionSpa,
        regFinal:Data.regFinal,
        anioReg:Data.anioReg,
        fuenteInf:Data.fuenteInf,
        regUsuario:Data.regUsuario,
        anioRegInf:Data.fecRegIng,
        fk_Omc34N2:fk,
      },headers)
      .then(response=>{
        fetData()
        toast.success("EL registro se ha creado exitosamente")
        console.log(response)
      }).catch(error=>{
        console.log(error)
      })
      break;
    case 4:
      axios.put(`${URLBASE}apiomcroles/OMC34Nivel${nivel}/${id}/`,{
        codigo: Data.codigo,
        descriEng: Data.descriEng,
        descriSpa: Data.descriSpa,
        definicionEng: Data.definicionEng,
        definicionSpa: Data.definicionSpa,
        regFinal:Data.regFinal,
        anioReg:Data.anioReg,
        fuenteInf:Data.fuenteInf,
        regUsuario:Data.regUsuario,
        anioRegInf:Data.fecRegIng,
        fk_Omc34N3:fk,
      },headers)
      .then(response=>{
        fetData()
        toast.success("EL registro se ha creado exitosamente")
        console.log(response)
      }).catch(error=>{
        console.log(error)
      })
      break;
    case 5:
      axios.put(`${URLBASE}apiomcroles/OMC34Nivel${nivel}/${id}/`,{
        codigo: Data.codigo,
        descriEng: Data.descriEng,
        descriSpa: Data.descriSpa,
        definicionEng: Data.definicionEng,
        definicionSpa: Data.definicionSpa,
        regFinal:Data.regFinal,
        anioReg:Data.anioReg,
        fuenteInf:Data.fuenteInf,
        regUsuario:Data.regUsuario,
        anioRegInf:Data.fecRegIng,
        fk_Omc34N4:fk,
      },headers)
      .then(response=>{
        fetData()
        toast.success("EL registro se ha creado exitosamente")
        console.log(response)
      }).catch(error=>{
        console.log(error)
      })
      break;
  
    default:
      break;
  }


}
    


    const value = useMemo(() => {
      return {
        omc34n1,
        omc34n2,
        omc34n3,
        omc34n4,
        nextNivel,
        dataomc34n2,
        dataomc34n3,
        descripcion,
        datamap,
        previusLevel,
        numLevel,
        RolesOrg,
        dataForm,
        registrarRolOrg,
        setdataForm,
        formhiden,
        setformhiden,
        RegistrarRolOrg,
        omc34n1TreeData,
        childVisible,
        setchildVisible,
        Colap,
        setColap,
        Interlineado,
        setInterlineado,
        EditRollOrganizacional,
        editarConsultaR,
        nivelConsultaRoll,
        showNodalEditCR,
        setshowNodalEditCR,
        EditarConsultaRolesO,
      };
    }, [
        omc34n1,
        omc34n2,
        omc34n3,
        omc34n4,
        descripcion,
        numLevel,
        datamap,
        dataomc34n2,
        dataomc34n3,
        dataForm,
        formhiden,
        RolesOrg,
        childVisible,
        omc34n1TreeData,
        Colap,
        Interlineado,
        editarConsultaR,
        nivelConsultaRoll,
        showNodalEditCR,
    ]);
  
    return <Omc34ConContext.Provider value={value} {...props} />;
}

export function useOmcCon34() {
  const context = React.useContext(Omc34ConContext);
  if (!context) {
    throw new "useOmc34 debe estar dentroi del provedor Omc34Context"();
  }

  return context;
}