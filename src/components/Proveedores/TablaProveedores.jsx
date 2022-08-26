import React,{useMemo,useState} from 'react'
import {
    useTable,
    usePagination,
    useGlobalFilter,
    useSortBy,
  } from "react-table";
import { useProveedores } from '../../context/Proveedores/ProveedoresContext';
import GlobalFilter from '../GlobalFilter'
import {toast} from 'react-hot-toast'
import {FiEdit} from 'react-icons/fi'
import {MdDeleteSweep} from 'react-icons/md'
import {RiFileExcel2Line} from 'react-icons/ri'
import {GrDocumentTxt} from 'react-icons/gr'
import {BsFillFileEarmarkPdfFill} from 'react-icons/bs'


function TablaProveedores(props) {
  
    const {EliminarProvedor,ShowModal}= useProveedores()
    //ESTILOS CSS PARA SELECCIONAR FILA
  function cleanTr() {
    document.querySelectorAll(".row-selected").forEach(function (index) {
      index.classList.remove("row-selected")
      index.classList.remove("other-clic")
    })
  }

  const selectRow = (e) => {
    const selectRowTag = e.currentTarget;
    if (selectRowTag.classList.contains("row-selected")) {
    } else {
      cleanTr()
      selectRowTag.classList.add("row-selected")
    }
  }

  const data = useMemo(() => [...props.DataProveedores], [props.DataProveedores])

  const columns = useMemo(()=>[
    {
    Header:'No',
    accessor:'idProveedor',
    Cell: (row)=>{
        return <div>{Number(row.row.id)+1}</div>;
    },
    style:{
        textAlign:'center'
    }
    },
    {
        Header:'Nombre',
        accessor:'nombre',
        style:{
            with:'100px'
        },
    },
    {
        Header: 'RFC',
        accessor:'RFC'
    },
    {
        Header:'Email',
        accessor:'email'
    },
    {
        Header:'Fabricante',
        accessor:'fabricante',
        Cell:(row)=>{
            return row.row.original.fabricante?'Activo':'Desactivo'
        }
    },
    {
        Header:'Se encuentra activo?',
        accessor:'activo',
        Cell:(row)=>{
            return row.row.original.activo?'Activo':'Desactivo'
        }
    },
    {
        Header:'Observaciones',
        accessor:'observaciones'
    },
    {
        Header:'Logo',
        accessor:'logoImg',
        style:{
            maxWidth:'100px'
        },
        Cell:(row)=>{
            return row.row.original.logoImg === 'http://127.0.0.1:8000/media/0%00'?null:<img src={row.row.original.logoImg} height='50' width='50' />

        }
    },
    {
        Header:'Sitio Web',
        accessor:'urlSitioWeb'
    },{
        Header:'Editar',
        accessor:'',
        style:{
          textAlign:'center'
        },
        Cell:(row)=>{
          
            return <FiEdit style={{fontSize:'20px',color:'green',cursor:'pointer'}} onClick={()=>{ShowModal(row.row.values)}}/>

            // row.row.actvio?'Activo':'Desactivo'
        }
    },{
        Header:'Eliminar',
        accessor:'',
        style:{
            textAlign:'center'
        },
        Cell:(row)=>{
          return <MdDeleteSweep style={{fontSize:'25px',color:'rgb(177, 3, 43)',cursor:'pointer'}} onClick={()=>toast((t) => (
            <span style={{textAlign:'center'}}>
              <h6>Deseas borrar este registro?</h6>
              <div className='row'>
              <button className='btn btn-danger col-5' onClick={() => {EliminarProvedor(row.row.values.idProveedor);toast.dismiss(t.id)}}>
                Borrar
              </button>
              <button className='btn btn-light col 5' onClick={() => toast.dismiss(t.id)}>
                Cancelar
              </button>
              </div>
            </span>))}
          />
            // return <button className='btn btn-danger' onClick={()=>toast((t) => (
            //     <span style={{textAlign:'center'}}>
            //       <h6>Deseas borrar este registro?</h6>
            //       <div className='row'>
            //       <button className='btn btn-danger col-5' onClick={() => {EliminarProvedor(row.row.values.idProveedor);toast.dismiss(t.id)}}>
            //         Borrar
            //       </button>
            //       <button className='btn btn-light col 5' onClick={() => toast.dismiss(t.id)}>
            //         Cancelar
            //       </button>
            //       </div>
            //     </span>
            //   ))}>Borrar</button>

            // row.row.actvio?'Activo':'Desactivo'EliminarProvedor(row.row.values.idProveedor)
        }
    }

],[])
 


const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    pageOptions,
    prepareRow,
    state: { pageIndex,pageSize},
    state,
    setPageSize,
    setGlobalFilter,
  } = useTable( 
    { columns, data },
    useGlobalFilter,
    useSortBy,
    usePagination,
  );

  const { globalFilter } = state;


  

//   setPageSize(numnero)
  return (
    <div className="containerTable">
        <div className="headerTable">
        <div className="col-md-5 col-sm-7" style={{marginBottom:'10px'}}>
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        </div>
        <div className='col-md-5'></div>
        <div className="col-md-2 col-sm-7  mt-3" style={{textAlign:''}} >
        <div className='row' style={{textAlign:'right'}}>
             <BsFillFileEarmarkPdfFill  onClick={()=>alert('PDF')} className='col-md-3 fs-3' style={{color:'#B20E0F',cursor:'pointer'}} />
             <RiFileExcel2Line onClick={()=>alert('Excel')} className='col-md-3 fs-3' style={{color:'#016F3E',cursor:'pointer'}} />
             <GrDocumentTxt onClick={()=>alert('TXT')} className='col-md-3 fs-3 ' style={{color:'#546A7A',cursor:'pointer'}}/>
            </div>
        </div>
        </div>
        <div className="table-responsive shadow-lg">
        <table {...getTableProps()} className="table table-hover mt-1" >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    style={{ color: "black" }}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render("Header")}
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <i className="fa-solid fa-angle-down"></i>
                      ) : (
                        <i className="fa-solid fa-angle-up"></i>
                      )
                    ) : (
                      ""
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);

              return (
                <tr
                  style={{ fontSize: "13px", fontFamily: "arial" }}
                  {...row.getRowProps()}
                  onClick={(e) => (selectRow(e))}
                >
                  {row.cells.map((cell, idx) => {
                    return (
                      <td
                        {...cell.getCellProps([
                          {
                            className: cell.column.className,
                            style: cell.column.style,
                          },
                        ])}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
        <div className="footerTable">
        <button
          type="button"
          className="btn btn-dark m-1"
          onClick={() => previousPage()}
        >
          Previous
        </button>
        <button
          type="button"
          className="btn btn-dark"
          onClick={() => nextPage()}
        >
          Next
        </button>
        <br />
        <span>
          <strong>
            Página {pageIndex + 1} de {pageOptions.length}
          </strong>{" "}
        </span>
      </div>
    </div>
  )
}

export default TablaProveedores
