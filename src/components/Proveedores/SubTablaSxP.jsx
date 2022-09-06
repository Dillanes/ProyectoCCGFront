import React from 'react'
import {MdDeleteSweep} from 'react-icons/md'
import {toast} from 'react-hot-toast'

function SubTablaSxP({data,dataShow,EliminarSucursal,FuncionDataEdit}) {

  return (
    <>
      {
        data.Sucursales.map((Sdata,index)=>(
            index === 0?(
                <tr key={index} name={data.RFC}>
                    {dataShow.showAlias?null:<td>{Sdata.alias}</td>}
                    {dataShow.showCP?null:<td>{Sdata.CP}</td>}
                    {dataShow.showPais?null:<td>{Sdata.pais}</td>}
                    {dataShow.showEstado?null:<td>{Sdata.estado}</td>}
                    {dataShow.showMunicipio?null:<td>{Sdata.municipio}</td>}
                    {dataShow.showEliminar?null:<td onClick={()=>toast((t) => (
                        <span style={{textAlign:'center'}}>
                        <h6>Deseas borrar este registro?</h6>
                        <div className='row'>
                        <button className='btn btn-danger col-5' onClick={() => {EliminarSucursal(Sdata.idSucProv);toast.dismiss(t.id)}}>
                        Borrar
                        </button>
                        <button className='btn btn-light col 5' onClick={() => toast.dismiss(t.id)}>
                        Cancelar
                        </button>
                        </div>

                        </span>))} style={{cursor:'pointer',color:'rgb(177, 3, 43)',textAlign:'center'}}><MdDeleteSweep/></td>}
                    {dataShow.showEditar?null:<td><button onClick={()=>FuncionDataEdit(Sdata.idSucProv)} className='btn btn-success'>Editar</button></td>}
                </tr>
            ):(
                <tr  hidden name={data.RFC}>
                    {dataShow.showAlias?null:<td>{Sdata.alias}</td>}
                    {dataShow.showCP?null:<td>{Sdata.CP}</td>}
                    {dataShow.showPais?null:<td>{Sdata.pais}</td>}
                    {dataShow.showEstado?null:<td>{Sdata.estado}</td>}
                    {dataShow.showMunicipio?null:<td>{Sdata.municipio}</td>}
                    {dataShow.showEliminar?null:<td onClick={()=>toast((t) => (
                        <span style={{textAlign:'center'}}>
                        <h6>Deseas borrar este registro?</h6>
                        <div className='row'>
                        <button className='btn btn-danger col-5' onClick={() => {EliminarSucursal(Sdata.idSucProv);toast.dismiss(t.id)}}>
                        Borrar
                        </button>
                        <button className='btn btn-light col 5' onClick={() => toast.dismiss(t.id)}>
                        Cancelar
                        </button>
                        </div>
                        </span>))} style={{cursor:'pointer',color:'rgb(177, 3, 43)',textAlign:'center'}}><MdDeleteSweep/></td>}
                    {dataShow.showEditar?null:<td><button onClick={()=>FuncionDataEdit(Sdata.idSucProv)} className='btn btn-success'>Editar</button></td>}
                </tr>
            )
        ))
      }
    </>
  )
}

export default SubTablaSxP
