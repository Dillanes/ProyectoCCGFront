import React, { useState } from "react";
import { TableContext } from "../../context/Materiales/TableContext";
// import { Modal } from "./Modal";
import { useLogin } from "../../context/LoginContext";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import {useParams} from 'react-router-dom'
import Previsualizacion from "./Previsualizacion";

function VistaParcial() {

  const {handleSubmit,reset,formState:{errors},register} = useForm()
   
 const {codigo} = useParams()

  console.log('CODIGOO', codigo)
  const { dataToken } = useLogin();

  const {
    formularioActivate,
    material,
    dataEsfuerzo,
    concreto,
    numMaterial,
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
    listarIonCloruro,
    setFormularioActivate,
    listarFibraConcre,
    datos,
    dataGrado,
    AddRegistroAceroR,
    DataClaseResist,
    DataClasifCemento

  } = React.useContext(TableContext);


  let vistaParcial = datos.filter(reg => reg.codigo === codigo)
  
  let MapEsfuerzo = dataEsfuerzo.filter(data=> data.idEsfuerzo === 2 || data.idEsfuerzo === 3)
  
  console.log('prorroor: ',MapEsfuerzo)
  

  
  console.log('PRUEBAss',vistaParcial)

  const [esfuerzo, setEsfuerzo] = React.useState("");
  const [valorEsfuerzo, setValorEsfuerzo] = React.useState("");
  const [uValorEsfuerzo, setUValorEsfuerzo] = React.useState("");
  const [resistenciaValorEsfuerzo, setResistenciaValorEsfuerzo] = React.useState("");
  const [aplPrincipales, setAplPrincipales] = React.useState("");
  const [TMA, setTMA] = React.useState("");
  const [uTMA, setUTMA] = React.useState("");
  const [revenimiento, setRevenimiento] = React.useState("");
  const [uRevenimiento, setURevenimiento] = React.useState("");
  const [densidad, setDensidad] = React.useState("");
  const [uDensidad, setUDensidad] = React.useState("");
  const [sisColocacion, setSisColocacion] = React.useState("");
  const [clasExposicion, setClasExposicion] = React.useState("");
  const [flujoRev, setFlujoRev] = React.useState("");
  const [uFlujoRev, setUFlujoRev] = React.useState("");
  const [uElasticidad, setUElasticidad] = React.useState("");
  const [ionCloruro, setIonCloruro] = React.useState("");
  const [fibra, setFibra] = React.useState("");
  const [abreviado, setAbreviado] = React.useState("");
  const [elasticidad, setElasticidad] = React.useState("");
  const [edad, setEdad] = React.useState("");
  const [capilar, setCapilar] = React.useState("");
  const [abreviado2, setAbreviado2] = React.useState("");
  const [trabajabilidad, setTrabajabilidad] = React.useState("");
  const [clase, setClase] = React.useState("");
  const [color, setColor] = React.useState("");
  const [comportamiento, setComportamiento] = React.useState("");
  const [contenido, setContenido] = React.useState("");
  const [contenidoIon, setContenidoIon] = React.useState("");
  const [tiempoDePrueba, setTiempoDePrueba] = React.useState("");
  const [palabrasClave, setPalabrasClave] = React.useState("");
  const [comentarios, setComentarios] = React.useState("");
  const [SelectEsfuerzo,setSelectEsfuerzo] = React.useState()
  const [SelectGrado,setSelectGrado] = React.useState()
  const [ShowModalPrevisualizar,setShowModalPrevisualizar] = React.useState(false)
  const [datosEnviar,setDatosEnviar] = React.useState([])
  
  //CEMENTO
  const [tipoCemento,setTipoCemento] = React.useState([])
  const [claseCemento,setClaseCemento] = React.useState([])

  console.log('pruebaS',SelectEsfuerzo)
  console.log('pruebaG',SelectGrado)
  const crearDatosDeMateriales = () => {
    const datosGenerales = {
      esfuerzo,
      valorEsfuerzo,
      uValorEsfuerzo,
      resistenciaValorEsfuerzo,
      aplPrincipales,
      TMA,
      uTMA,
      revenimiento,
      uRevenimiento,
      densidad,
      uDensidad,
      sisColocacion,
      clasExposicion,
      flujoRev,
      uFlujoRev,
      uElasticidad,
      ionCloruro,
      fibra,
      abreviado,
      elasticidad,
      edad,
      capilar,
      abreviado2,
      trabajabilidad,
      clase,
      color,
      comportamiento,
      contenido,
      contenidoIon,
      tiempoDePrueba,
      palabrasClave,
      comentarios,
    };
    //primer console
    console.table(datosGenerales);

    creatMaterial();

    setTimeout(() => {
      crearConcreto();
    }, 1000);

    setTimeout(() => {
      caracteristicasEspeciales();
    }, 1600);

    setFormularioActivate(false);
  };

  const creatMaterial = () => {
    let dateReferencia = new Date();
    let date =
      dateReferencia.getFullYear() +
      "-" +
      String(dateReferencia.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(dateReferencia.getDate()).padStart(2, "0");
    const datas = {
      numMat: 1,
      codigoOmc: vistaParcial[0].codigo,
      Consecutivo: material,
      descriCorta: vistaParcial[0].descriSpa.substr(0, 100),
      descriLarga: vistaParcial[0].descriSpa,
      Comentarios: comentarios,
      palabrasCve: palabrasClave,
      desCorEng: "",
      desLargEng: "",
      fuenteInf: "Bimsa",
      fecRegInf: date,
      codigoBimsa: null,
    };
    console.log(datas);

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Token ${dataToken.token}`);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(datas);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://msdocs-python-sqlserver-api-215.azurewebsites.net/apimateriales/Material/",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  const crearConcreto = () => {
    const codigo = vistaParcial[0].Codigo;

    const datas = {
      numMat: 0,
      Codigo: codigo,
      fk_Material: numMaterial,
      fk_ClasExpo: clasExposicion,
      fk_SistColoc: sisColocacion,
      fk_Densidad: densidad,
      fk_Reven: revenimiento,
      fk_FlujoRev: flujoRev,
      fk_FibraConcre: fibra,
      fk_ValEsf: valorEsfuerzo,
      fk_Tma: TMA,
      fk_AplPrinc: aplPrincipales,
    };
    //concreto
    console.log(datas);

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Token ${dataToken.token}`);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(datas);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://msdocs-python-sqlserver-api-215.azurewebsites.net/apimateriales/Concreto/",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error crear concreto", error));
  };

  const caracteristicasEspeciales = () => {
    console.log(concreto);
    const datas = {
      modElast: elasticidad,
      Acronimo: abreviado,
      Edad: edad,
      absorcionCap: capilar,
      Acronimo2: abreviado2,
      trabaExtend: trabajabilidad,
      Clase: clase,
      Color: color,
      Comportamiento: comportamiento,
      conAire: contenido,
      conIonClor: contenidoIon,
      tiempoPrueba: tiempoDePrueba,
      fk_IonClor: ionCloruro,
      fk_Concreto: concreto,
    };
    //caracteristica especial
    console.table(datas);
    console.log(datas);

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Token ${dataToken.token}`);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(datas);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://msdocs-python-sqlserver-api-215.azurewebsites.net/apimateriales/CaracEspe/",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) =>
        console.log("error crear caracteristicas Especiales", error)
      );
  };

  function validaNumericos(event) {
    if (event.charCode >= 48 && event.charCode <= 57) {
      return true;
    }
    return false;
  }

  // const descripcionc = () => {
  //   const Descripcion = `${vistaParcial[0].descriSpa} ${
  //     listarEsfuerzo[esfuerzo - 1].tipoEsfuerzo
  //   } fc=${listarValorEsfuerzo[valorEsfuerzo - 1].Valor}${
  //     listarUnidadesMedida[uValorEsfuerzo - 1].Unidad
  //   } ${listarTipoResistencia[resistenciaValorEsfuerzo - 1].Tipo}`;
  //   console.log(Descripcion);
  //   setDatosModal(Descripcion);
  // };

  var datooo = {
    0: [76, 78, 79],
    1: [5, 7, 1],
    2: [65, 67],
    3: [83],
    4: [76, 78, 79],
    5: [65],
    6: [85],
    7: [38, 37],
  };

  const [datoTipoDeResitencia, setDatoTipoDeResitencia] = React.useState(null);
  console.log(datoTipoDeResitencia);
  
  const date = new Date()
  console.log('sdsd',claseCemento)
  const onSubmit= (data)=>{
    console.log(SelectGrado?'hola':'error')
    const ColectionReg = {
      codigo:vistaParcial[0].codigo,
      consecutivo:material,
      descriEng:vistaParcial[0].descriEng,
      descriSpa:vistaParcial[0].descriSpa,
      grado:SelectGrado?SelectGrado.valorGrad:null,
      idGrado:SelectGrado?SelectGrado.idGrado:null,
      numVarilla:data.noVarilla,
      diametro:data.diametro,
      area:data.area,
      perimetro:data.perimetro,
      masa:data.masa,
      comentarios:data.comentarios,
      esfuerzo:SelectEsfuerzo?SelectEsfuerzo.tipoEsfuerzo:null,
      idEsfuerzo:SelectEsfuerzo?SelectEsfuerzo.idEsfuerzo:null,
      palabrasClave:data.palabrasClave,
      fuenteInf:data.fuenteInf,
      fecha:date.getFullYear()+'-'+date.getMonth().toString().padStart(2,'0')+'-'+date.getDate().toString().padStart(2,'0'),
      numMat:vistaParcial[0].numMat,
      //Datos de cemento
      tipoCemento:tipoCemento?tipoCemento.tipo:null,
      idTipoCemento:tipoCemento?tipoCemento.idClasCem:null,
      claseCemento:claseCemento?claseCemento.clase:null,
      idClaseResist:claseCemento?claseCemento.idClasRes:null,
      sisIng:data.sisIng
    }

    console.log(ColectionReg)
    setDatosEnviar(ColectionReg)
   setTimeout(() => {
    setShowModalPrevisualizar(true)
   }, 500);
    

    
  
  }
  

   


  return (
    <div className="container bg-light border mt-5 pt-3">
      <br />
      <h2>Registro de {vistaParcial[0].descriSpa}</h2>
      {/* <hr /> */}
      <Link to="/omniclass">
        <Button color="secondary">Regresar</Button>
      </Link>
      <br />
      <br />
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row gy-2 border pt-1 pb-3">
        <label className="col-md-2 control-label">
          Código:
          <input
            type="text"
            // value={formularioActivate ? vistaParcial[0].codigo : ""}
            name="codigoOmc"
            className="form-control"
            disabled
            {...register('codigo',{value:vistaParcial[0].codigo})}
          />
          {errors.noVarilla && <span className="text-danger text-small d-block mb-2">no valido</span>}
        </label>
        <label className="col-md-1 col-sm-12 mb-2 control-label">
          Consecutivo:
          <input
            className="form-control"
            type="text"
            value={material}
            disabled
            {...register('consecutivo')}
          />
          {errors.consecutivo && <span className="text-danger text-small d-block mb-2">no valido</span>}
        </label>
        <label className="col-md-3 col-sm-12 mb-2 control-label">
          Descripción en Inglés:
          <input
            type="text"
            className="form-control"
            value={formularioActivate ? vistaParcial[0].descriEng : ""}
            disabled
            {...register('descriEng')}
          />
          {errors.descriEng && <span className="text-danger text-small d-block mb-2">no valido</span>}
        </label>
        <label className="col-md-3 col-sm-12 mb-2 control-label">
          Descripción en Español:
          <input
            type="text"
            className="form-control"
            value={formularioActivate ? vistaParcial[0].descriSpa : ""}
            disabled
            {...register('descriSpa')}
          />
          {errors.descriSpa && <span className="text-danger text-small d-block mb-2">no valido</span>}
        </label>

        {/* SELECT GRADOS ACERO*/}
        {vistaParcial.length>0&&vistaParcial[0].numMat===500&&(<div className="col-md-3 col-sm-12 mb-2">
        <label className="control-label"></label>
        <Autocomplete
                disablePortal
                id="combo-box-Grado"
                size="small"
                options={dataGrado}
              
                getOptionLabel={(option)=>`${option.valorGrad}`}
                onChange={(event, newValue) => {
                  setSelectGrado(newValue);
                }}
                renderInput={(params) => <TextField  {...params} label="Grado" />}
              />
              </div>)}

        {/* SELECT TIPO CEMENTO*/}
        {vistaParcial.length>0&&vistaParcial[0].numMat===300&&(<div className="col-md-3 col-sm-12 mb-2">
        <label className="control-label"></label>
        <Autocomplete
                disablePortal
                id="combo-box-Grado"
                size="small"
                options={DataClasifCemento}
              
                getOptionLabel={(option)=>`${option.tipo}`}
                onChange={(event, newValue) => {
                  setTipoCemento(newValue);
                }}
                renderInput={(params) => <TextField  {...params} label="Tipo" />}
              />
              </div>)}


      </div>
      {console.log(vistaParcial)}

      {/*++++++++++CEMETO++++++++ */}
      {vistaParcial.length>0&&vistaParcial[0].numMat===300&&(
        <div className="row border">
          <div className="col-md-3 col-sm-12 mb-2">
            <label className="form-label"></label>
            <Autocomplete
                disablePortal
                id="combo-box-Grado"
                size="small"
                options={DataClaseResist}
              
                getOptionLabel={(option)=>`${option.clase}`}
                onChange={(event, newValue) => {
                  setClaseCemento(newValue);
                }}
                renderInput={(params) => <TextField  {...params} label="Clase" />}
              />
          </div>
          <div className="mb-2 col-md-3 col-sm-12 mt-md-4 form-check" >
          <label className="form-check-label" htmlFor="exampleCheck1">Sistema Inglés</label>
            <input type="checkbox" className="form-check-input" {...register('sisIng')} id="exampleCheck1"/>
            
          </div>

        </div>
      )}


      {/*++++++++++ACEROS++++++++ */}
      {vistaParcial.length>0&&vistaParcial[0].numMat===500&&(
          <div className="row mb-2">
            <div className="mb-2 col-md-2 col-sm-12">
              <label className="control-label">No. de Varrilla:</label>
              <input type='number' step="0.001" className="form-control" {...register('noVarilla',{valueAsNumber:true,required:true})}></input>
              {errors.noVarilla && <span className="text-danger text-small d-block mb-2">no valido</span>}
            </div>
            <div className="mb-2 col-md-1 col-sm-12">
              <label className="control-label">Diámetro:</label>
              <input type='number' step="0.001" className="form-control" {...register('diametro',{required:true})}></input>
              {errors.diametro && <span className="text-danger text-small d-block mb-2">no valido</span>}
            </div>
            <div className="mb-2 col-md-1 col-sm-12">
              <label className="control-label">Área:</label>
              <input type='number' step="0.001"  className="form-control" {...register('area',{valueAsNumber:true,required:true})}></input>
              {errors.area && <span className="text-danger text-small d-block mb-2">no valido</span>}
            </div>
            <div className="mb-2 col-md-2 col-sm-12">
              <label className="control-label">Perimetro:</label>
              <input type='number' step="0.001" className="form-control" {...register('perimetro',{valueAsNumber:true,required:true})}></input>
              {errors.perimetro && <span className="text-danger text-small d-block mb-2">no valido</span>}
            </div>
            <div className="mb-2 col-md-2 col-sm-12">
              <label className="control-label">Masa:</label>
              <input type='number' step="0.001" className="form-control" {...register('masa',{valueAsNumber:true,required:true})}></input>
              {errors.masa && <span className="text-danger text-small d-block mb-2">no valido</span>}
            </div>
            <div className="mb-2 col-md-4 col-sm-12">
              <label className="control-label"></label>
              <Autocomplete
                disablePortal
                id="combo-box-Esfuerzo"
                size="small"
                options={MapEsfuerzo}
                getOptionLabel={(option)=>option.tipoEsfuerzo}
                sx={{height:40}}
                onChange={(event, newValue) => {
                  setSelectEsfuerzo(newValue);
                }}
                renderInput={(params) => <TextField  {...params} label="Esfuerzo" />}
              />
            </div>

            
          </div>
          
        )}

        {vistaParcial[0].numMat===800&&(<>
          <div className="row gy-2 justify-content-between my-2">
          {/* <!--ValorEsfuerzo--> */}
          <label className="col-md-4 control-label">
            fc:
            <select
              onChange={(e) => {
                setValorEsfuerzo(e.target.value);
                setDatoTipoDeResitencia(
                  listarValorEsfuerzo.filter(
                    (val) => val.idValEsf === e.target.value.toString()
                  )[0].fk_TipoResist
                );
              }}
              id={datoTipoDeResitencia}
              className="form-select form-select-sm"
              name={valorEsfuerzo}
            >
              <option value={1}>Selecciona...</option>
              {listarValorEsfuerzo.map((valorEs, index) => (
                <option key={index} value={valorEs.idValEsf}>
                  {valorEs.Valor}
                </option>
              ))}
            </select>
          </label>
          {/* <!--UnidadesMedida para ValorEsfuerzo--> */}
          <label className="col-md-4 control-label">
            Unidad Esfuerzo:
            <select
              onChange={(e) => setUValorEsfuerzo(e.target.value)}
              className="form-select form-select-sm"
              name="idUniMedVE"
            >
              <option value="">Selecciona...</option>
              {datooo[0].map((value, index) => (
                <option
                  key={index}
                  value={
                    listarUnidadesMedida.filter(
                      (dat) => dat.idUniMed === value
                    )[0].idUniMed
                  }
                >
                  {
                    listarUnidadesMedida.filter(
                      (dat) => dat.idUniMed === value
                    )[0].Unidad
                  }
                </option>
              ))}
            </select>
          </label>
          {/* <!--TipoResistencia para ValorEsfuerzo--> */}
          <label className="col-md-4 control-label visually-hidden">
            Tipo Resistencia:
            <select
              disabled
              onChange={(e) => setResistenciaValorEsfuerzo(e.target.value)}
              className="form-select form-select-sm"
              name="idTipoResist"
            >
              {datoTipoDeResitencia ? (
                <option value={datoTipoDeResitencia}>
                  {listarTipoResistencia[datoTipoDeResitencia - 1].Tipo}
                </option>
              ) : (
                <option value={null}>Sin resistencias</option>
              )}
              {/* <option value="">{listarTipoResistencia[1].Tipo}</option> */}
              {/* {listarTipoResistencia.map((value, index) => (
                <option key={index} value={value.idTipoResist}>
                  {value.Tipo}
                </option>
              ))} */}
            </select>
          </label>
          {/* <!--Esfuerzo--> */}
          <label className="col-md-2 control-label visually-hidden">
            Esfuerzo:
            <select
              onChange={(e) => setEsfuerzo(e.target.value)}
              className="form-select form-select-sm"
              name="idEsfuerzo"
              disabled
            >
              {
                <option value={1}>
                  Resistencia a la compresión del concreto
                </option>
              }
            </select>
          </label>
          {/* <!--AplPrincipales--> */}
          <label className="col-md-4 control-label">
            Usos y/o Aplicaciones:
            <select
              onChange={(e) => setAplPrincipales(e.target.value)}
              className="form-select form-select-sm"
              name="idAplPrinc"
            >
              <option value="">Selecciona...</option>
              {listarAplPrincipales.map((value, index) => (
                <option key={index} value={value.idAplPrinc}>
                  {value.aplicaciones}
                </option>
              ))}
            </select>
          </label>
        </div>
        
        {/*BLOQUE 2*/}
        <div className="row gy-2 justify-content-between">
        {/* <!--TMA--> */}
        <label className="col-sm-3 control-label">
          TMA:
          <select
            onChange={(e) => setTMA(e.target.value)}
            className="form-select form-select-sm"
            name="idTma"
          >
            <option value="">Selecciona...</option>
            {listarTMA.map((value, index) => (
              <option key={index} value={value.idTma}>
                {value.valTma}
              </option>
            ))}
          </select>
        </label>
        {/* <!--UnidadesMedida para TMA--> */}
        <label className="col-sm-3 control-label">
          Unidad TMA:
          <select
            onChange={(e) => setUTMA(e.target.value)}
            className="form-select form-select-sm"
            name="idUniMedTMA"
          >
            <option value="">Selecciona...</option>
            {datooo[1].map((value, index) => (
              <option
                key={index}
                value={
                  listarUnidadesMedida.filter(
                    (dat) => dat.idUniMed === value
                  )[0].idUniMed
                }
              >
                {
                  listarUnidadesMedida.filter(
                    (dat) => dat.idUniMed === value
                  )[0].Unidad
                }
              </option>
            ))}
          </select>
        </label>
        {/* <!--Revenimiento--> */}
        <label className="col-sm-3 control-label">
          Revenimiento:
          <select
            onChange={(e) => setRevenimiento(e.target.value)}
            className="form-select form-select-sm"
            name="idReven"
          >
            <option value="">Selecciona...</option>
            {listarRevenimiento.map((value, index) => (
              <option key={index} value={value.idReven}>
                {value.valRev}
              </option>
            ))}
          </select>
        </label>
        {/* <!--UnidadesMedida para Revenimiento--> */}
        <label className="col-sm-3 control-label">
          Unidad de Revenimiento:
          <select
            onChange={(e) => setURevenimiento(e.target.value)}
            className="form-select form-select-sm"
            name="idUniMedR"
          >
            <option value="">Selecciona...</option>
            {datooo[1].map((value, index) => (
              <option
                key={index}
                value={
                  listarUnidadesMedida.filter(
                    (dat) => dat.idUniMed === value
                  )[0].idUniMed
                }
              >
                {
                  listarUnidadesMedida.filter(
                    (dat) => dat.idUniMed === value
                  )[0].Unidad
                }
              </option>
            ))}
          </select>
        </label>
      </div>
      {/*BLOQUE 3*/}
            {/* <!--Densidad--> */}
            <hr />
      <div className="row gy-2 justify-content-around">
        <label className="col-sm-4 control-label">
          Densidad:
          <select
            onChange={(e) => setDensidad(e.target.value)}
            className="form-select form-select-sm"
            name="idDensidad"
          >
            <option value="">Selecciona...</option>
            {listarDensidad.map((value, index) => (
              <option key={index} value={value.idDensidad}>
                {value.valDensidad}
              </option>
            ))}
          </select>
        </label>
        {/* <!--UnidadesMedida para Densidad--> */}
        <label className="col-sm-4 control-label">
          Unidad Densidad:
          <select
            onChange={(e) => setUDensidad(e.target.value)}
            className="form-select form-select-sm"
            name="idUniMedD"
          >
            <option value="">Selecciona...</option>
            {listarUnidadesMedida.map((value, index) => (
              <option key={index} value={value.idUniMed}>
                {value.Unidad}
              </option>
            ))}
          </select>
        </label>
        {/* <!--SisColocacion--> */}
        <label className="col-sm-4 control-label">
          Sistema de Colocación:
          <select
            onChange={(e) => setSisColocacion(e.target.value)}
            className="form-select form-select-sm"
            name="idSistColoc"
          >
            <option value="">Selecciona...</option>
            {listarSistColocacion.map((value, index) => (
              <option key={index} value={value.idSistColoc}>
                {value.tipoSistema}
              </option>
            ))}
          </select>
        </label>
        {/* <!--ClasExposicion--> */}
        <label className="col-sm-4 control-label">
          Clase de Exposición:
          <select
            onChange={(e) => setClasExposicion(e.target.value)}
            className="form-select form-select-sm"
            name="idClasExpo"
          >
            <option value="">Selecciona...</option>
            {listarClasExposicion.map((value, index) => (
              <option key={index} value={value.idClasExpo}>
                {value.Condicion}
              </option>
            ))}
          </select>
        </label>
        {/* <!--FlujoRev--> */}
        <label className="col-sm-4 control-label">
          Flujo de Revenimiento:
          <select
            onChange={(e) => setFlujoRev(e.target.value)}
            className="form-select form-select-sm"
            name="idFlujoRev"
          >
            <option value="">Selecciona...</option>
            {listarFlujoRev.map((value, index) => (
              <option key={index} value={value.idFlujoRev}>
                {value.valFluRev}
              </option>
            ))}
          </select>
        </label>
        {/* <!--UnidadesMedida para FlujoRev--> */}
        <label className="col-sm-4 control-label">
          Unidad FlujoRev:
          <select
            onChange={(e) => setUFlujoRev(e.target.value)}
            className="form-select form-select-sm"
            name="idUniMedFR"
          >
            <option value="">Selecciona...</option>
            {listarUnidadesMedida.map((value, index) => (
              <option key={index} value={value.idUniMed}>
                {value.Unidad}
              </option>
            ))}
          </select>
        </label>
      </div>
      {/* BLOQUE 4 */}
      <div className="card-header">
        <strong>Caracteristicas Especificas</strong>
      </div>
      <div className="card-body">
        <form className="row gy-2 justify-content-start align-items-end form">
          <div className="col-3">
            <label className="form-label" htmlFor="Abreviado">
              EC
            </label>
            <input
              className="form-control form-control-sm"
              onChange={(e) => setAbreviado(e.target.value)}
              id="Abreviado"
              type="text"
              maxLength={3}
              placeholder=""
              aria-label=""
            ></input>
          </div>

          <div className="col-3">
            <label className="form-label" htmlFor="elasticidad">
              Valor de modulo de elasticidad:
            </label>
            <input
              className="form-control form-control-sm"
              id="elasticidad"
              type="number"
              min="1"
              max="999"
              onChange={(e) => setElasticidad(e.target.value)}
              placeholder=""
              aria-label=""
            ></input>
          </div>

          <div className="col-3">
            <label className="form-label" htmlFor="elasticidad">
              Edad de resistencia especificada:
            </label>
            <div className="input-group">
              <input
                onChange={(e) => {
                  setEdad(e.target.value);
                  validaNumericos(e);
                }}
                type="number"
                pattern="[0-9]{0,3}"
                min="1"
                max="999"
                aria-label="Last name"
                className="form-control form-control-sm"
              />
              <select
                onChange={(e) => setUElasticidad(e.target.value)}
                className="form-select form-control-sm"
                id="inputGroupSelect01"
              >
                <option>Tiempo</option>
                <option defaultValue="1">Horas</option>
                <option defaultValue="2">Días</option>
              </select>
            </div>
          </div>

          <div className="col-3">
            <label className="form-label" htmlFor="elasticidad">
              Absorción Capilar:
            </label>
            <input
              className="form-control form-control-sm"
              onChange={(e) => setCapilar(e.target.value)}
              id="elasticidad"
              type="number"
              min="1"
              max="999"
              placeholder=""
              aria-label=""
            ></input>
          </div>

          <div className="col-3">
            <label className="form-label" htmlFor="elasticidad">
              Acrónimo de absorción capilar:
            </label>
            <input
              className="form-control form-control-sm"
              id="elasticidad"
              onChange={(e) => setAbreviado2(e.target.value)}
              type="text"
              maxLength={3}
              placeholder=""
              aria-label=""
            ></input>
          </div>

          <div className="col-3">
            <label className="form-label" htmlFor="elasticidad">
              Trabajabilidad Extendida:
            </label>
            <input
              className="form-control form-control-sm"
              id="elasticidad"
              type="number"
              min="1"
              max="999"
              onChange={(e) => setTrabajabilidad(e.target.value)}
              placeholder=""
              aria-label=""
            ></input>
          </div>

          <div className="col-3">
            <label className="form-label" htmlFor="elasticidad">
              Clase(NTC-CDMX):
            </label>
            <input
              className="form-control form-control-sm"
              id="elasticidad"
              type="text"
              placeholder=""
              onChange={(e) => setClase(e.target.value)}
              aria-label=""
            ></input>
          </div>

          <div className="col-3">
            <label className="form-label" htmlFor="elasticidad">
              Color:
            </label>
            <input
              className="form-control form-control-sm"
              onChange={(e) => setColor(e.target.value)}
              id="elasticidad"
              type="text"
              placeholder=""
              aria-label=""
            ></input>
          </div>

          <div className="col-3">
            <label className="form-label" htmlFor="elasticidad">
              Comportamiento:
            </label>
            <input
              className="form-control form-control-sm"
              id="elasticidad"
              type="text"
              onChange={(e) => setComportamiento(e.target.value)}
              placeholder=""
              aria-label=""
            ></input>
          </div>

          <div className="col-3">
            <label className="form-label" htmlFor="elasticidad">
              Contenido de aire:
            </label>
            <input
              className="form-control form-control-sm"
              id="elasticidad"
              type="number"
              min="1"
              max="999"
              onChange={(e) => setContenido(e.target.value)}
              placeholder=""
              aria-label=""
            ></input>
          </div>

          <div className="col-3">
            <label className="form-label" htmlFor="elasticidad">
              Contenido de Ion Cloruro:
            </label>
            <input
              className="form-control form-control-sm"
              id="elasticidad"
              type="number"
              min="1"
              max="999"
              onChange={(e) => setContenidoIon(e.target.value)}
              placeholder=""
              aria-label=""
            ></input>
          </div>

          <label className="col-md-3 control-label">
            Ion Cloruro:
            <select
              onChange={(e) => setIonCloruro(e.target.value)}
              className="form-select form-select-sm"
              name="idIonClor"
            >
              <option value="">Selecciona...</option>
              {listarIonCloruro.map((value, index) => (
                <option key={index} value={value.idIonClor}>
                  {value.tipoPenet} {value.cargaPesada} Coulomb
                </option>
              ))}
            </select>
          </label>
          <div className="col-3">
            <label className="form-label" htmlFor="elasticidad">
              {" "}
              Tiempo de Prueba del ensayo Ion Cloruro:
            </label>
            <input
              className="form-control form-control-sm"
              id="elasticidad"
              onChange={(e) => setTiempoDePrueba(e.target.value)}
              type="number"
              min="1"
              max="999"
              placeholder=""
              aria-label=""
            ></input>
          </div>

          <label className="col-md-3 control-label">
            Fibra:
            <select
              onChange={(e) => setFibra(e.target.value)}
              className="form-select form-select-sm"
              name="idFibraConcre"
            >
              <option value="">Selecciona...</option>
              {listarFibraConcre.map((value, index) => (
                <option key={index} value={value.idFibraCon}>
                  {value.Fibras}
                </option>
              ))}
            </select>
          </label>
        </form>
      </div>
      {/*BLOQUE 5 */}
                </>

        )
      }

      



      <div className="card-footer ">
        <div className="row mb-2">
          <div className="col-md-6">
            <label htmlFor="keyword" className="form-label">
              Palabras Clave:
            </label>
            <textarea
              id="keyword"
              onChange={(e) => setPalabrasClave(e.target.value)}
              className="form-control"
              rows="2"
              {...register('palabrasClave',{required:true})}
              
            ></textarea>
            {errors.palabrasClave && <span className="text-danger text-small d-block mb-2">no valido</span>}
          </div>
          <div className="col-md-6">
            <label htmlFor="comentarios" className="form-label">
              Comentarios:
            </label>
            <textarea
              className="form-control"
              id="comentarios"
              row="3"
              onChange={(e) => {
                setComentarios(e.target.value);
              }}
              {...register('comentarios',{required:true})}
            ></textarea>
            {errors.comentarios && <span className="text-danger text-small d-block mb-2">no valido</span>}
          </div>
        </div>
        <div className="row justify-content-md-center mb-2">
          <div className="col-md-4 col-sm-12 mb-2">
          <label htmlFor="keyword" className="form-label">Fuente de Informacion:</label>
          <input className="form-control" {...register('fuenteInf',{required:true})}></input></div>
          {errors.fuenteInf && <span className="text-danger text-small d-block mb-2">no valido</span>}
          <div className="col-md-4 col-sm-12 mb-2">
          <label  htmlFor="keyword" className="form-label">Fecha de Registro:</label>
          <input disabled value={date.toLocaleDateString()} className="form-control" {...register('fechaReg')}></input></div>
        </div>
        {vistaParcial[0].numMat&&(
          <div className="row justify-content-end mb-2">
            <div className="col-md-1 col-sm-12 mb-2 "><input type='submit' className="btn btn-success form-control" value='Registrar'/></div>
            <div className="col-md-1 col-sm-12 mb-2 "><input type='reset' className="btn btn-danger form-control" value='Cancelar'/></div>
          </div>
        )}

        {vistaParcial[0].numMat===800&&(
          <Link
          type="submit"
          className="btn btn-success mt-5"
          onClick={() => crearDatosDeMateriales()}
          to="/omniclass"
        >
          Registrar
        </Link>
        )}
        
        <Previsualizacion 
        ShowModalPrevisualizar={ShowModalPrevisualizar}
        setShowModalPrevisualizar={setShowModalPrevisualizar}
        datosEnviar={datosEnviar}
        AddRegistroAceroR={AddRegistroAceroR}
        />
      </div>
      <br />
      <br />
      <br />
      </form>
    </div>
  );
}

export default VistaParcial;
