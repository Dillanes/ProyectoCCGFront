import React,{
    useEffect,
    useState,
    useMemo,
    createContext,
    useContext} from 'react'
import { useLogin } from '../LoginContext'
import {toast} from "react-hot-toast";
import axios from 'axios'
import img from '../../assets/img/defaultLogo.png'


const ProveedoresContext = createContext()


export function ProveedoresProvider(props) {
    //Token de autentificacion
    const {dataToken} = useLogin()

    //Headers por defecto para la configuracion de las APIS
    const headers = {
        headers:{
            Authorization: `Token ${dataToken.token}`,
        }
    }

    //Url por defecto
    const URLBASE = "http://127.0.0.1:8000/";

    //UseEffect, renderizar la data 
    useEffect(() => {
       fetchData()
    }, [])


    //LISTA DE LOS ESTADOS
    const [DataProveedores, setDataProveedores] = useState([]);

    //Formulario Editar
    const [dataFormulario, setdataFormulario] = useState([])
    const [activeFormP,setactiveFormP] = useState(false)
    const [ImgSave,setImgSave] = useState()
    const [clotch,setclotch] = useState()
    const [RegG,setRegG] = useState()
    const [dataSucursal,setdataSucursal] = useState([])
    //Data estados geograficos
    const[dataCP,setdataCP] = useState([])
    const[dataMunicipio,setdataMunicipio] = useState([])
    const[dataEstado,setdataEstado] = useState([])
    const[dataPais,setdataPais] = useState([])
   
    // console.log(dataMunicipio)
    // console.log(dataEstado)
    // console.log(dataPais)
    //SUCURSALES POR PROVEEDOR
    const [dataSxP,setdataSxP] = useState([])
    //ESTADO MARCAS MANEJADAS POR PROVEEDOR
   const [DataMarcaxProveedores,setDataMarcaxProveedores] = useState([])
   const [dataMarca,setdataMarca] = useState()

       //data editar sucursal
       const[dataEditS,setDataEditS]= useState([])

  
       //FUNCION ENVIAR DATA
       const FuncDataSucursal = (id)=>{
        console.log('idddd',id)
        setDataEditS(dataSucursal.filter(data=>data.idSucProv ===id)[0])
       }

    //LLAMADO A LAS APIS DE PROVEEDORES y MARCAS
    const fetchData = async()=>{
       //PROVEEDOR
        axios.get(`${URLBASE}apiproveedores/Proveedor/`,headers)
        .then((response)=>{
            setDataProveedores(response.data.results)
        })
        .catch((error)=>{
            console.log(error);
        })
        
        //MARCA X PROVEEDOR
        axios.get(`${URLBASE}apiproveedores/Marca/`,headers)
        .then((response)=>{
            setdataMarca(response.data.results)
        })
        .catch((error)=>{
            console.log(error);
        })

        axios.get(`${URLBASE}apiproveedores/ListarMarcaXProveedor/`,headers)
        .then((response)=>{
            setDataMarcaxProveedores(response.data.reduce((NewArray,reg)=>{
            const regS = NewArray.filter(regSelect=>regSelect.nombreProv === reg.nombreProv)
            if(NewArray.filter((dato)=>dato.nombreProv === reg.nombreProv).length > 0){
                regS[0].Marca[regS[0].Marca.length] = {
                nombreMarca:reg.nombreMarca,
                activoMar:reg.activoMar,
                idProvMar:reg.idProvMar
            }
                return NewArray
            }else{
              reg.Marca = [{
                nombreMarca:reg.nombreMarca,
                activoMar:reg.activoMar,
                idProvMar:reg.idProvMar
              }]
              return [...NewArray,reg]
            }
            
          },[])

                )
        }
        
        
        )
        .catch((error)=>{
            console.log(error);
        })


        axios.get(`${URLBASE}apiproveedores/ListarSucursalXProveedor/`,headers).then(response=>{
            setdataSxP(response.data.reduce((NewArray,reg)=>{
            const regS = NewArray.filter(regSelect=>regSelect.nombre === reg.nombre)
            if(NewArray.filter((dato)=>dato.nombre === reg.nombre).length > 0){
                regS[0].Sucursales[regS[0].Sucursales.length] = {
                    alias:reg.alias,
                    CP:reg.CP,
                    municipio:reg.municipio,
                    estado:reg.estado,
                    calle:reg.calle,
                    noInt:reg.noInt,
                    noExt:reg.noExt, 
                    urlSitioWeb: reg.urlSitioWeb,
                    fabricante:reg.fabricante,
                    activo: reg.activo,
                    numTel: reg.numTel,
                    pais:reg.pais,
                    idSucProv:reg.idSucProv,
                    contactoAten:reg.contactoAten,
                    nomSuperior:reg.nomSuperior,
                    cargoSuperior:reg.cargoSuperior
                }
                     return NewArray
            }else{
                reg.Sucursales = [{
                    alias:reg.alias,
                    CP:reg.CP,
                    pais:reg.pais,
                    municipio:reg.municipio,
                    estado:reg.estado,
                    calle:reg.calle,
                    noInt:reg.noInt,
                    noExt:reg.noExt,
                    urlSitioWeb: reg.urlSitioWeb,
                    fabricante:reg.fabricante,
                    activo: reg.activo,
                    idSucProv:reg.idSucProv,
                    numTel: reg.numTel,
                    contactoAten:reg.contactoAten,
                    nomSuperior:reg.nomSuperior,
                    cargoSuperior:reg.cargoSuperior
                  }]
                  return [...NewArray,reg]

            }
              

            },[]))
        }).catch((error)=>{
            console.log(error)
            
        })

        //GET SUCURSAL
        axios.get(`${URLBASE}apiproveedores/SucursalProveedor/`,headers)
        .then((response)=>{
            setdataSucursal(response.data.results)
            console.log('dfdsfdsf',response.data.results)
        })
        .catch((error)=>{
            console.log('SALE ESTE ERROR:',error);
        })

        //GET CP
        axios.get(`${URLBASE}apigeograficos/CodigoPostal/`,headers)
        .then((response)=>{
            setdataCP(response.data.results)
        })
        .catch((error)=>{
            console.log(error);
        })
        //GET MUNICIPIO
        axios.get(`${URLBASE}apigeograficos/Municipio/`,headers)
        .then((response)=>{
            setdataMunicipio(response.data.results)
        })
        .catch((error)=>{
            console.log(error);
        })
        //GET ESTADO
        axios.get(`${URLBASE}apigeograficos/Estado/`,headers)
        .then((response)=>{
            setdataEstado(response.data.results)
        })
        .catch((error)=>{
            console.log(error);
        })

        //GET PAIS
        axios.get(`${URLBASE}apigeograficos/Pais/`,headers)
        .then((response)=>{
            setdataPais(response.data.results)
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    const RegistarProveedores = async(data,EnviarImg)=>{

        let dataImg = new FormData()
        dataImg.append('nombre', data.nombre);
        dataImg.append('RFC', data.RFC);
        dataImg.append('email', data.email);
        dataImg.append('fabricante',data.fabricante);
        dataImg.append('activo', data.activo);
        dataImg.append('observaciones', data.observaciones);
        dataImg.append('logoImg', EnviarImg);
        dataImg.append('urlSitioWeb', data.urlSitioWeb);

        axios.post(`${URLBASE}apiproveedores/Proveedor/`,dataImg,headers)
            .then((response)=>{
               fetchData()
               toast.success("EL registro se guardo exitosamente");
            })
            .catch((error)=>{
                console.log(error)
                return toast.error("Error al guardar el registro");
            })
    }

    //EDITAR PROVEEDORES
    const EditarProveedores = async(data,id,img,imgEdit)=>{
            let Imagen = imgEdit===null?img:imgEdit
            let dataImg = new FormData()
            dataImg.append('nombre', data.nombre);
            dataImg.append('RFC', data.RFC);
            dataImg.append('email', data.email);
            dataImg.append('fabricante',data.fabricante);
            dataImg.append('activo', data.activo);
            dataImg.append('observaciones', data.observaciones);
            dataImg.append('logoImg', Imagen);
            dataImg.append('urlSitioWeb', data.urlSitioWeb);
            axios.put(`${URLBASE}apiproveedores/Proveedor/${id}/`,dataImg,headers)
            .then((response)=>{
               console.log(response)
               fetchData()
               toast.success("EL registro se actualizo exitosamente");
            })
            .catch((error)=>{
                console.log(error)
                return toast.error("No se pudo actualizar el registro");
            })
    }

    //ELIMINAR PROVEEDOR
    const EliminarProvedor = (id)=>{
        axios.delete(`${URLBASE}apiproveedores/Proveedor/${id}`,headers)
        .then((response)=>{
             fetchData()
             toast.success("EL registro se elimino exitosamente");

        }).catch((error)=>{
            console.log(error)
            return toast.error("No se pudo eliminar el registro");
        })
    }

    //Funcion mostrar Modal
    const ShowModal = (data)=>{
        if(data.logoImg==='http://127.0.0.1:8000/media/0%00'){
            setImgSave(img)
        }else{
            setImgSave(data.logoImg)
        }
        setdataFormulario(data)
        setactiveFormP(true)
    }

    //ELIMINAR RELACION MARCA PROVEEDOR
    const DeletMarcaProveedor = (id)=>{
        console.log(id)
        axios.delete(`${URLBASE}apiproveedores/ProveedorMarca/${id}/`,headers)
        .then((response)=>{
            fetchData()
            toast.success("EL registro se elimino exitosamente");
       }).catch((error)=>{
        console.log(error)
        return toast.error("No se pudo eliminar el registro");
    })
    }

    //DAR DE ALTA RELACION PROVEEDORES
    const AltaRelacionMxP = (data)=>{
          if(data!=null){
            for(let reg of data){
                const idProve = DataProveedores.filter(data=>data.nombre === reg[0])
                const idMarca = dataMarca.filter(data=>data.nombre === reg[1])
                
                console.log('Proveedor id: ',idProve[0].idProveedor)
                console.log('Marcaca id: ',idMarca[0].idMarca)
                let dataMxP = new FormData()
                dataMxP.append('fk_Proveedor', idProve[0].idProveedor);
                dataMxP.append('fk_Marca', idMarca[0].idMarca);

                axios.post(`${URLBASE}apiproveedores/ProveedorMarca/`,dataMxP,headers)
                    .then((response)=>{
                    console.log(response)
                    fetchData()
                    toast.success("EL registro se guardo exitosamente");
                    })
                    .catch((error)=>{
                    console.log(error)
                    return toast.error("Error al guardar el registro");
                     })

            }
          }
    }
 

    //ELIMINAR SUCURSAL
    const EliminarSucursal = (id)=>{
          axios.delete(`${URLBASE}apiproveedores/SucursalProveedor/${id}/`,headers)
        .then((response)=>{
            fetchData()
            toast.success("EL registro se elimino exitosamente");
       }).catch((error)=>{
        return toast.error("No se pudo eliminar el registro");
    })
    }

    //EDITAR SUCURSAL
    const EditarSucursal = (data,id,fkP)=>{
        axios.put(`${URLBASE}apiproveedores/SucursalProveedor/${id}/`,{
            alias:data.alias,
            numTel:data.numTel,
            contactoAten:data.contactoAten,
            nomSuperior:data.nomSuperior,
            cargoSuperior:data.cargoSuperior,
            calle:data.calle,
            noInt:data.noInt,
            noExt:data.noExt,
            colonia:data.colonia,
            fk_CP:data.cp,
            fk_Proveedor:fkP
        },headers).then((response)=>{
            toast.success("EL registro se actualizo");
            fetchData()
        }).catch((errors)=>{
            console.log(errors)
        })

    }

      //ADD SUCURSAL
      const AddSucursal = (data,fkP)=>{
        for(let reg of data ){
            axios.post(`${URLBASE}apiproveedores/SucursalProveedor/`,{
                alias:reg[0],
                numTel:reg[1],
                contactoAten:reg[2],
                nomSuperior:reg[3],
                cargoSuperior:reg[4],
                calle:reg[10],
                noInt:reg[11],
                noExt:reg[12],
                colonia:reg[9],
                fk_CP:reg[5],
                fk_Proveedor:fkP
            },headers).then((response)=>{
                toast.success("EL registro se guardo exitosamente");
                fetchData()
            }).catch((errors)=>{
                console.log(errors)
            })
        }
    }


    const value = useMemo(()=>{
        return{
            DataProveedores,
            EliminarProvedor,
            ShowModal,
            dataFormulario,
            activeFormP,
            setactiveFormP,
            EditarProveedores,
            RegistarProveedores,
            ImgSave,
            setImgSave,
            DataMarcaxProveedores,
            clotch,
            setclotch,
            RegG,
            setRegG,
            DeletMarcaProveedor,
            dataMarca,
            AltaRelacionMxP,
            dataSxP,
            setdataSxP,
            EliminarSucursal,
            dataCP,
            dataMunicipio,
            dataEstado,
            dataPais,
            dataEditS,
            FuncDataSucursal,
            EditarSucursal,
            AddSucursal

        }
    },[
        DataProveedores,
        dataFormulario,
        activeFormP,
        ImgSave,
        setImgSave,
        DataMarcaxProveedores,
        clotch,
        RegG,
        dataMarca,
        dataSxP,
        dataCP,
        dataMunicipio,
        dataEstado,
        dataPais,
        dataEditS
    ])

   return <ProveedoresContext.Provider value={value} {...props}/>

}


export function useProveedores(){
    const context = useContext(ProveedoresContext)
    if(!context){
        throw new "UseProveedores debe de estar dentro del provedor"();
    }
    return context;
}
