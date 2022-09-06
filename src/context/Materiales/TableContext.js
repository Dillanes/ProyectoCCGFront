import axios from "axios";
import React, { useState } from "react";
import { useLogin } from "../LoginContext";
import toast from "react-hot-toast";
const TableContext = React.createContext();

function TableProvider(props) {

  const { dataToken } = useLogin()
  //Variables for Omniclass 23
  const [datos, setDatos] = React.useState([]);
  const [descripcion, setDescripcion] = React.useState("");
  const [niveles, setNiveles] = React.useState("2");
  const [nivel1, setNivel1] = React.useState([]);
  const [nivel2, setNivel2] = React.useState([]);
  const [nivel2View, setNivel2View] = React.useState([]);
  const [nivel3, setNivel3] = React.useState([]);
  const [nivel3View, setNivel3View] = React.useState([]);
  const [nivel4, setNivel4] = React.useState([]);
  const [nivel4View, setNivel4View] = React.useState([]);
  const [nivel5, setNivel5] = React.useState([]);
  const [nivel5View, setNivel5View] = React.useState([]);
  const [nivel6, setNivel6] = React.useState([]);
  const [informacion, setInformacion] = React.useState([]);
  const [material, setMaterial] = React.useState('');
  const [numMaterial, setNumMaterial] = React.useState('');
  const [concreto, setConcreto] = React.useState('');
  const [vistaParcial, setVistaParcial] = React.useState({})
  const [formularioActivate, setFormularioActivate] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [tableBool, setTablesBool] = React.useState(false);
  const [listarEsfuerzo, setListarEsfuerzo] = React.useState([])
  const [listarValorEsfuerzo, setListarValorEsfuerzo] = React.useState([])
  const [listarUnidadesMedida, setListarUnidadesMedida] = React.useState([])
  const [listarTipoResistencia, setListarTipoResistencia] = React.useState([])
  const [listarAplPrincipales, setListarAplPrincipales] = React.useState([])
  const [listarTMA, setListarTMA] = React.useState([])
  const [listarRevenimiento, setListarRevenimiento] = React.useState([])
  const [listarDensidad, setListarDensidad] = React.useState([])
  const [listarSistColocacion, setListarSistColocacion] = React.useState([])
  const [listarClasExposicion, setListarClasExposicion] = React.useState([])
  const [listarFlujoRev, setListarFlujoRev] = React.useState([])
  const [listarIonCloruro, setListarIonCloruro] = React.useState([])
  const [listarFibraConcre, setListarFibraConcre] = React.useState([])
  const [datosConcreto, setDatosConcreto] = React.useState([])
  const [listarConcretosMateriales, setListarConcretosMateriales] = React.useState([])
  const [listarConcretosMaterialesCopia, setListarConcretosMaterialesCopia] = React.useState([])
  const [omniClass, setOmniClass] = React.useState(23)
  const [datosModal, setDatosModal] = React.useState('')
  const [datoBaseTabla, setDatoBaseTabla] = React.useState([]);
  const [estructura, setEstructura] = React.useState(false);
  const [informationComplete, setInformationComplete] = React.useState(false);
  const [dataEsfuerzo,setDataEsfuerzo] = React.useState([])
  const [dataGrado,setDataGrado] = React.useState([])
  
  const [dataMaterialAdd,setdataMaterialAdd ] = React.useState([])
  const [ dataMarca,setDataMarca] = React.useState()
  const [ dataSucursal,setDataSucursal] = React.useState()
  const [ dataMarcaSucursal,setDataMarcaSucursal] = React.useState()
  const [DataClaseResist,setDataClaseResist] = React.useState()
  const [DataClasifCemento,setDataClasifCemento] = React.useState()

  //UseEffect initializes the Api
  React.useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  ;

  //URL base for API requests
  const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': `Token ${dataToken.token}`
    }
  })

  const headers = {
    headers:{
        Authorization: `Token ${dataToken.token}`,
    }
}

  // const URL = 'http://127.0.0.1:8000/';

  const FuncionShowModalPxM = (codigo,tipo)=>{
    switch (tipo) {
      case 'Concreto':
        setdataMaterialAdd(listarConcretosMateriales.filter(data=>data.codigoOmc === codigo)[0])
 
        break;
    
      default:
        break;
    }
    

  }


  const datosBaseParaLaTabla = [
    "Consecutivo",
    "codigoOmc",
    "descriCorta",
    "SiglaEsf",
    "ValorEsfuerzo",
    "Unidadval",
    "TipoResistencia",
    "SiglaTma",
    "valTma",
    "SiglaRev",
    "valRev",
    "Unidad",
  ];

  const datosFaltantesTabla = [
    "numMat",
    "descriLarga",
    "Comentarios",
    "palabrasCve",
    "desCorEng",
    "desLargEng",
    "fuenteInf",
    "fecRegInf",
    "codigoBimsa",
    "Nombre",
    "tipoEsfuerzo",
    "tmaFrac",
    "TipoCons",
    "modElast",
    "Acronimo",
    "Edad",
    "absorcionCap",
    "Acronimo2",
    "trabaExtend",
    "Clase",
    "Color",
    "Comportamiento",
    "conAire",
    "conIonClor",
    "tiempoPrueba",
    "tipoSistema",
  ]

  //Get API
  const fetchData = async () => {
    fetchMarca()
    apis();
    setOmniClass(41);
    fetchMateriales();
  };

  //LLAMADO A LAS APIS DE MARCAS Y SUCURSAL
  const fetchMarca = ()=>{
    axios.get(`http://localhost:8000/apiproveedores/Marca/`, headers).
    then((response)=>{
      setDataMarca(response.data.results)
    }).catch(errors=>{
      console.log(errors)
    })
    axios.get(`http://localhost:8000/apiproveedores/SucursalProveedor/`,headers)
    .then((response)=>{
      setDataSucursal(response.data.results)
    })
    .catch((error)=>{
        console.log('SALE ESTE ERROR:',error);
    })


    axios.get(`http://localhost:8000/apiproveedores/ProveedorMarca/`,headers)
    .then((response)=>{
      setDataMarcaSucursal(response.data.results)
    })
    .catch((error)=>{
        console.log('SALE ESTE ERROR:',error);
    })
  //ESFUERZO
    axios.get(`http://localhost:8000/apimateriales/ListarEsfuerzo/`,headers)
    .then((response)=>{
      setDataEsfuerzo(response.data.results)
    })
    .catch((error)=>{
        console.log('SALE ESTE ERROR:',error);
    })

    //GRADO
    axios.get(`http://localhost:8000/apimateriales/ListarGrado/`,headers)
    .then((response)=>{
      setDataGrado(response.data.results)
    })
    .catch((error)=>{
        console.log('SALE ESTE ERROR:',error);
    })

    //CLASIFICACION RESISTENCIA CEMENTO
    axios.get(`http://localhost:8000/apimateriales/ListarClaseResist/`,headers)
    .then((response)=>{
      setDataClaseResist(response.data.results)
    })
    .catch((error)=>{
        console.log('SALE ESTE ERROR:',error);
    })

    //CLASIFICACION CEMENTO 
    axios.get(`http://localhost:8000/apimateriales/ListarClasifCemento/`,headers)
    .then((response)=>{
      setDataClasifCemento(response.data.results)
    })
    .catch((error)=>{
        console.log('SALE ESTE ERROR:',error);
    })

  }

  let fecha = new Date()


  //AGREGAR REGISTRO OMC23
  const AddRegistroAceroR = (data)=>{
    console.log('DESDE EL CONTEX',data)

    // GREGAR MATERIAL
    axios.post(`http://localhost:8000/apimateriales/Material/`,{
    numMat:data.numMat,
    codigoOmc:data.codigo,
    consecutivo:data.consecutivo,
    descriCorta:`${data.descriSpa}-${data.esfuerzo}`,
    descriLarga:`${data.descriSpa}-${data.descriEng}-${data.esfuerzo}-${data.comentarios}`,
    comentarios:data.comentarios,
    palabrasCve:data.palabrasClave,
    desCorEng:data.descriEng,
    desLargEng:data.descriEng,
    fuenteInf:data.fuenteInf,
    fecRegInf:data.fecha
  },headers).then((response)=>{
    console.log('RESPUESTA DE AADD MATERIALES',response)
  }).catch(errors=>{console.log('RESPUESTA DE AADD MATERIALES',errors)})
 
 //AGREGAR DIMENCIONES
  if(data.numMat === 500){ 
  axios.post(`http://localhost:8000/apimateriales/Dimensiones/`,{
    noVarilla:`No.${data.numVarilla}`,
    diametro:data.diametro,
    area:data.area,
    perimetro:data.perimetro,
    masa:data.masa
  },headers).then(response=>{
    console.log('RESPUESTA ADD DIMENSIONES',response)
  }).catch(errors=>{
    console.log('RESPUESTA ADD DIMENSIONES',errors)
  })

  }


  
  setTimeout(async() => {
    const RegPrueba = await axios.get('http://localhost:8000/apimateriales/Material/',headers)
    const Material = RegPrueba.data.results[RegPrueba.data.results.length-1]
    const RegPruebaD = await axios.get('http://localhost:8000/apimateriales/Dimensiones/',headers)
    const Dimencion = RegPruebaD.data.results[RegPruebaD.data.results.length-1]
    console.log('MATERIALES DATOS:',Material)
    console.log('DIMENCION DATOS:',Dimencion)
    switch (data.numMat) {
      case 500:  
        //ACEROS REFORZADOS 
        axios.post(`http://localhost:8000/apimateriales/AceroRefuerzo/`,{
          numMat:data.numMat,
          codigo:data.codigo,
          fk_Material:Material.idMaterial,
          fk_Grado:data.idGrado,
          fk_Dimensiones:Dimencion.idDimensiones,
          fk_Esfuerzo:data.idEsfuerzo
        },headers).then(response=>{
          toast.success("EL registro se guardo exitosamente")
    
              }).catch(errors=>console.log('Respuesta AceroRefuerzo',errors))
        break;
      case 300:
        
        axios.post('http://localhost:8000/apimateriales/Cemento/',{
          numMat:data.numMat,
          codigo:data.codigo,
          fk_Material:Material.idMaterial,
          fk_ClasCem:data.idTipoCemento,
          fk_ClasRe:data.idClaseResist

        },headers).then(response=>{
              toast.success("EL registro se guardo exitosamente")
    
              }).catch(errors=>console.log('Respuesta AceroRefuerzo',errors))
        
        break;
              
      default:
        break;
    }


  }, 500)

  }


  const AddMaterialProvedor = (data,fkMaterial,fkProvMarca,fkSucProv)=>{

        console.log('prueva')
        axios.post(`http://localhost:8000/apiproveedores/MaterialProveedor/`,{
          precio:data.pMercado,
          fechaAct:fecha.toISOString(),
          fuenteInfo:data.fuenteInf,
          fk_Material:fkMaterial,
          fk_ProvMar:fkProvMarca,
          fk_SucProv:fkSucProv,
        },headers).then((response)=>{
            toast.success("EL registro se guardo exitosamente");
            fetchData()
        }).catch((errors)=>{
            console.log(errors)
        })

}

  const fetchMateriales = async () => {

    const { data: listarConcretosMaterial } = await api(`apimateriales/ListarConcretosMateriales/`);
    await setListarConcretosMateriales(listarConcretosMaterial);
    await setListarConcretosMaterialesCopia(listarConcretosMaterial);

    setDatosConcreto([
      "numMat",
      "descriLarga",
      "Comentarios",
      "palabrasCve",
      "desCorEng",
      "desLargEng",
      "fuenteInf",
      "fecRegInf",
      "codigoBimsa",
      "Nombre",
      "tipoEsfuerzo",
      "tmaFrac",
      "TipoCons",
      "modElast",
      "Acronimo",
      "Edad",
      "absorcionCap",
      "Acronimo2",
      "trabaExtend",
      "Clase",
      "Color",
      "Comportamiento",
      "conAire",
      "conIonClor",
      "tiempoPrueba",
      "tipoSistema",
    ])
    setDatoBaseTabla(datosBaseParaLaTabla);

    const { data: materials } = await api(`apimateriales/Material/`)
    const numero = materials.count + 1;
    await setMaterial(String(numero).padStart(5, 0));

    const { data: listarEsfuerzo } = await api(`apimateriales/ListarEsfuerzo/`)
    await setListarEsfuerzo(listarEsfuerzo.results);

    const { data: esfuerzo } = await api(`apimateriales/ListarValorEsfuerzo/`)
    await setListarValorEsfuerzo(esfuerzo.results);

    const { data: listarUnidad } = await api(`apiunidadesmedida/UnidadesMedida/`)
    await setListarUnidadesMedida(listarUnidad.results);

    const { data: listarTipoResistencia } = await api(`apimateriales/ListarTipoResistencia/`)
    await setListarTipoResistencia(listarTipoResistencia.results);

    const { data: listarAplPrincipales } = await api(`apimateriales/ListarAplPrincipales/`)
    await setListarAplPrincipales(listarAplPrincipales.results);

    const { data: listarTMA } = await api(`apimateriales/ListarTMA/`)
    await setListarTMA(listarTMA.results);

    const { data: listarRevenimiento } = await api(`apimateriales/ListarRevenimiento/`)
    await setListarRevenimiento(listarRevenimiento.results);

    const { data: listarDensidad } = await api(`apimateriales/ListarDensidad/`)
    await setListarDensidad(listarDensidad.results);

    const { data: listarSistColocacion } = await api(`apimateriales/ListarSistColocacion/`)
    await setListarSistColocacion(listarSistColocacion.results);

    const { data: listarClasExposicion } = await api(`apimateriales/ListarClasExposicion/`)
    await setListarClasExposicion(listarClasExposicion.results);

    const { data: listarFlujoRev } = await api(`apimateriales/ListarFlujoRev/`)
    await setListarFlujoRev(listarFlujoRev.results);

    const { data: listarIonCloruro } = await api(`apimateriales/ListarIonCloruro/`)
    await setListarIonCloruro(listarIonCloruro.results);

    const { data: listarFibraConcre } = await api(`apimateriales/ListarFibraConcre/`)
    await setListarFibraConcre(listarFibraConcre.results);
  }

  const apis = async () => {

    var URLDatosOmniClass = ''
    if (omniClass === 23) {
      URLDatosOmniClass = 'apiomcproductos/OMC23'
    } else {
      URLDatosOmniClass = 'apiomcmateriales/OMC41'
    }
    //Level 1 data
    const { data } = await api(`${URLDatosOmniClass}Nivel1/`)
    // const users = await data.json();
    await setNivel1(data.results);
    await setDatos(data.results);

    //Level 2 data
    const { data: data2 } = await api(`${URLDatosOmniClass}Nivel2/`)
    // const users2 = await data2.json();
    await setNivel2(data2.results);

    //Level 3 data
    const { data: data3 } = await api(`${URLDatosOmniClass}Nivel3/`)
    // const users3 = await data3.json();
    await setNivel3(data3.results);

    //Level 4 data
    const { data: data4 } = await api(`${URLDatosOmniClass}Nivel4/`)
    // const users4 = await data4.json();
    await setNivel4(data4.results);

    //Level 5 data
    const { data: data5 } = await api(`${URLDatosOmniClass}Nivel5/`)
    // const users5 = await data5.json();
    await setNivel5(data5.results);
    //Level 6 data
    const { data: data6 } = await api(`${URLDatosOmniClass}Nivel6/`)
    // const users6 = await data6.json();
    await setNivel6(data6.results);
    await setInformationComplete(true)
  }


  //get levels
  const getNiveles = (idLevel) => {
    switch (niveles) {
      case '2':
        getNivel2(idLevel);
        break;
      case '3':
        getNivel3(idLevel);
        break;
      case '4':
        getNivel4(idLevel);
        break;
      case '5':
        getNivel5(idLevel);
        break;
      case '6':
        getNivel6(idLevel);
        break;

      default:
        break;
    };
  };


  const getNivel2 = async (idLevel) => {
    if (!tableBool) {
      const reg = nivel2.filter(reg => reg.fk_Omc23N1 === idLevel);
      await setDatos(reg)
      await setNivel2View(reg);
    } else {
      const reg = nivel2.filter(reg => reg.fk_Omc41N1 === idLevel);
      await setDatos(reg)
      await setNivel2View(reg);
    }
    setNiveles("3")
    await setInformacion([...informacion, { nivel: 'Nivel 1', descrip: descripcion }]);

  }
  const getNivel3 = async (idLevel) => {
    if (!tableBool) {
      const reg = nivel3.filter(reg => reg.fk_Omc23N2 === idLevel);
      await setDatos(reg)
      await setNivel3View(reg);
    } else {
      const reg = nivel3.filter(reg => reg.fk_Omc41N2 === idLevel);
      await setDatos(reg)
      await setNivel3View(reg);
    }
    setNiveles("4")
    setInformacion([...informacion, { nivel: 'Nivel 2', descrip: descripcion }]);
  }
  const getNivel4 = async (idLevel) => {
    if (!tableBool) {
      const reg = nivel4.filter(reg => reg.fk_Omc23N3 === idLevel);
      await setDatos(reg)
      await setNivel4View(reg);
    } else {
      const reg = nivel4.filter(reg => reg.fk_Omc41N3 === idLevel);
      await setDatos(reg)
      await setNivel4View(reg);
    }
    setNiveles("5")
    setInformacion([...informacion, { nivel: 'Nivel 3', descrip: descripcion }]);
  }
  const getNivel5 = async (idLevel) => {
    if (!tableBool) {
      const reg = nivel5.filter(reg => reg.fk_Omc23N4 === idLevel);
      await setDatos(reg)
      await setNivel5View(reg);
    } else {
      const reg = nivel5.filter(reg => reg.fk_Omc41N4 === idLevel);
      await setDatos(reg)
      await setNivel5View(reg);
    }
    setNiveles("6")
    setInformacion([...informacion, { nivel: 'Nivel 4', descrip: descripcion }]);
  }
  const getNivel6 = async (idLevel) => {
    if (!tableBool) {
      const reg = nivel6.filter(reg => reg.fk_Omc23N5 === idLevel);
      await setDatos(reg)
      setNiveles("7")
    } else {
      const reg = nivel6.filter(reg => reg.fk_Omc41N5 === idLevel);
      await setDatos(reg)
      setNiveles("7")
    }
    setInformacion([...informacion, { nivel: 'Nivel 5', descrip: descripcion }]);
  }
  //Return Values
  const volver = (valor) => {
    switch (valor) {
      case 0:
        setDatos(nivel1);
        setNiveles('2');
        setInformacion([]);
        setDescripcion("");
        setFormularioActivate(false);
        break;
      case 1:
        setDatos(nivel2View);
        setNiveles('3');
        setInformacion(informacion.slice(0, 2));
        setFormularioActivate(false);
        break;
      case 2:
        setDatos(nivel3View);
        setNiveles('4');
        setInformacion(informacion.slice(0, 3));
        setFormularioActivate(false);
        break;
      case 3:
        setDatos(nivel4View);
        setNiveles('5');
        setInformacion(informacion.slice(0, 4));
        setFormularioActivate(false);
        break;
      case 4:
        setDatos(nivel5View);
        setNiveles('6');
        setInformacion(informacion.slice(0, 5));
        setFormularioActivate(false);
        break;
      default:
        break;
    }
  }

  // const getVistaParcial = async (item) => {
  //   const { data: materials } = await api(`apimateriales/Material/`)
  //   // const materialsData = await materials.json();
  //   const numero = materials.count + 1;
  //   await setMaterial(String(numero).padStart(5, 0));
  //   await setNumMaterial(numero);
  //   const { data: concreto } = await api(`apimateriales/ListarConcretosMateriales/`)
  //   // const concretoData = await concreto.json();
  //   const numeroConcreto = concreto.count + 1;
  //   await setConcreto(numeroConcreto);
  //   const reg = datos.filter(reg => reg.codigo === item.codigo)
  //   console.log('Que tiene registro',reg)
  //   await setVistaParcial(reg)
  //   setFormularioActivate(true)
  //   unidadesConcreto()
  // }

  const getVistaParcial = async (codigo) => {
    const { data: materials } = await api(`apimateriales/Material/`)
    // const materialsData = await materials.json();
    const numero = materials.count + 1;
    await setMaterial(String(numero).padStart(5, 0));
    await setNumMaterial(numero);
    const { data: concreto } = await api(`apimateriales/ListarConcretosMateriales/`)
    // const concretoData = await concreto.json();
    const numeroConcreto = concreto.count + 1;
    await setConcreto(numeroConcreto);
    const reg = datos.filter(reg => reg.codigo === codigo)
    await setVistaParcial(reg)
    setFormularioActivate(true)
    unidadesConcreto()
  }



  const omniclass41 = async () => {
    volver(0)
    setTablesBool(!tableBool)
    await setOmniClass(41)
    setInformationComplete(false)
    apis()
    setTimeout(() => {
      setOmniClass(23)
      setLoading(false);
    }, 2000);
    // setOmniClass(valor);
    // apis();
    // setTimeout(() => {
    //   volver(0);  
    //   setLoading(false);
    // }, 1000);
    // setTablesBool(!tableBool);
    setLoading(true);
  }

  const omniclass23 = () => {
    volver(0)
    setTablesBool(!tableBool)
    setOmniClass(23);
    setInformationComplete(false)
    apis();
    setLoading(true);
    setTimeout(() => {
      setOmniClass(41)

      setLoading(false);
    }, 2000);
  }

  const descripcioncorta = () => {

  }

  const addTable = (name) => {
    setDatoBaseTabla([...datoBaseTabla, name]);
    setDatosConcreto(datosConcreto.filter((reg) => reg !== name));
  };

  const deleteTableMaterials = (name) => {
    setDatosConcreto([...datosConcreto, name]);
    setDatoBaseTabla(datoBaseTabla.filter((datos) => datos !== name));
  };

  const resetTabla = () => {
    setDatoBaseTabla(datosBaseParaLaTabla);
    setDatosConcreto(datosFaltantesTabla);
  };

  const [datosConcretos, setDatosConcretos] = React.useState([])

  const unidadesConcreto = async () => {

    var datooo = {
      0: [76, 78, 79,],
      1: [5, 7, 1,],
      2: [65, 67,],
      3: [83],
      4: [76, 78, 79,],
      5: [65,],
      6: [85,],
      7: [38, 37,],
    }

    var x = []
    datooo[0].forEach((element) => {
      const aw = listarUnidadesMedida.filter(dat => dat.idUniMed === element)[0].Unidad
      x.push(aw)

    });

    await setDatosConcretos(x)

  }


  return (
    <TableContext.Provider value={{
      volver,
      niveles,
      informacion,
      datos,
      getNiveles,
      setDescripcion,
      descripcion,
      getVistaParcial,
      vistaParcial,
      formularioActivate,
      material,
      concreto,
      numMaterial,
      listarEsfuerzo,
      listarValorEsfuerzo,
      listarUnidadesMedida,
      listarTipoResistencia,
      listarAplPrincipales,
      listarTMA,
      listarRevenimiento,
      listarDensidad,
      listarSistColocacion,
      listarClasExposicion,
      listarFlujoRev,
      setFormularioActivate,
      listarIonCloruro,
      listarFibraConcre,
      omniclass23,
      omniclass41,
      omniClass,
      tableBool,
      loading,
      descripcioncorta,
      setDatosModal,
      datosModal,
      listarConcretosMateriales,
      datosConcreto,
      DataClasifCemento,
      setDatosConcreto,
      setDatoBaseTabla,
      datoBaseTabla,
      datosBaseParaLaTabla,
      datosFaltantesTabla,
      addTable,
      deleteTableMaterials,
      resetTabla,
      datosConcretos,
      fetchMateriales,
      setOmniClass,
      apis,
      api,
      listarConcretosMaterialesCopia,
      setListarConcretosMaterialesCopia,
      estructura, setEstructura,
      informationComplete,
      FuncionShowModalPxM,
      dataMaterialAdd,
      dataMarca,
      dataSucursal,
      AddMaterialProvedor,
      dataMarcaSucursal,
      dataEsfuerzo,
      dataGrado,
      AddRegistroAceroR,
      DataClaseResist

 

    }}>
      {props.children}
    </TableContext.Provider>
  );
}

export { TableContext, TableProvider } 