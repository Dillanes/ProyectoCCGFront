import React,{Fragment} from 'react'
import {MdDeleteSweep} from 'react-icons/md'
import {toast} from 'react-hot-toast'


function SubTablaMxP({data,showNameM,showA,showDelet,DeletMarcaProveedor}) {
//   const {setclotch, setRegG,clotch,RegG} = useProveedores()
//   setclotch(RegG===data.nombre?1:0)
//   setRegG(data.nombre)


  return (
    <Fragment>
      {
        data.Marca.map((Sdata,index)=>(
          index===0?(
          <tr name={data.RFC}>
            {showNameM?null:<td>{Sdata.nombreMarca}</td>}  
            {showA?null:<td>{Sdata.activoMar?'Activo':'Desactivo'}</td>}
            {showDelet?null:<td onClick={()=>toast((t) => (
            <span style={{textAlign:'center'}}>
              <h6>Deseas borrar este registro?</h6>
              <div className='row'>
              <button className='btn btn-danger col-5' onClick={() => {DeletMarcaProveedor(Sdata.idProvMar);toast.dismiss(t.id)}}>
                Borrar
              </button>
              <button className='btn btn-light col 5' onClick={() => toast.dismiss(t.id)}>
                Cancelar
              </button>
              </div>
            </span>))} style={{cursor:'pointer',color:'rgb(177, 3, 43)'}}><MdDeleteSweep/></td>}
          </tr>):(
            <tr hidden name={data.RFC}>
            {showNameM?null:<td>{Sdata.nombreMarca}</td>}  
            {showA?null:<td>{Sdata.activoMar?'Activo':'Desactivo'}</td>}
            {showDelet?null:<td onClick={()=>toast((t) => (
            <span style={{textAlign:'center'}}>
              <h6>Deseas borrar este registro?</h6>
              <div className='row'>
              <button className='btn btn-danger col-5' onClick={() => {DeletMarcaProveedor(Sdata.idProvMar);toast.dismiss(t.id)}}>
                Borrar
              </button>
              <button className='btn btn-light col 5' onClick={() => toast.dismiss(t.id)}>
                Cancelar
              </button>
              </div>
            </span>))} style={{cursor:'pointer',color:'rgb(177, 3, 43)'}}><MdDeleteSweep/></td>}
          </tr>

          ) 
        ))
      }

    </Fragment>

    // <tr key={index}>
    // <td>{index+1}</td>
    // {clotch=== 1?null:<td>{data.nombre}</td>}
    // <td>{data.RFC}</td>
    // </tr>
  )
}

export default SubTablaMxP
