import React, { useMemo } from "react";
import {
  useTable,
  usePagination,
  useGlobalFilter,
  useSortBy,
} from "react-table";
import GlobalFilter from "../GlobalFilter";
import "../../styles/omc23/styles.css";


export default function Omcn1(props) {

  //ESTILOS CSS PARA SELECCIONAR FILA
  function cleanTr() {
    document.querySelectorAll(".row-selected").forEach(function (index) {
      index.classList.remove("row-selected");
      index.classList.remove("other-clic");
    });
  }

  const selectRow = (e) => {
    const selectRowTag = e.currentTarget;
    if (selectRowTag.classList.contains("row-selected")) {
    } else {
      cleanTr();
      selectRowTag.classList.add("row-selected");
    }
  };

  const data = useMemo(() => [...props.Omcn1], [props.Omcn1]);

  const columns = React.useMemo(
    () => [
      {
        Header: "No",
        accessor: "",
        Cell: (row) => {
          return <div>{Number(row.row.id) + 1}</div>;
        },
        style: {
          textAlign: "center",
        },
      },

      {
        Header: "Código",
        accessor: "codigo",
        className: "codigo",
        style: {
          width: "100px",
        },
      },
      {
        Header: "Descripción en Inglés",
        accessor: "descriEng",
      },
      {
        Header: "Descripción en Español",
        accessor: "descriSpa",
      },
      {
        Header: "Definición en Inglés",
        accessor: "definicionEng",
      },
      {
        Header: "Definición en Español",
        accessor: "definicionSpa",
      },
      {
        Header: "Año de Registro",
        accessor: "anioReg",
      },
    ],
    []
  );

  //  const dataColumns = useMemo(()=> props.Omcn1[0] ? Object.keys(props.Omcn1[0]).map((key)=>{
  //   return {Header:key, accesor:key};
  //  }):[null],[props.Omcn1]);
  //   console.log(dataColumns)

  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "Edit",
        Header: "Editar",
        Cell: ({ row }) => (
          <button
            type="button"
            className="btn btn-success"
            style={{ marginTop: "20%" }}
            onClick={() => props.edidrow(1, row.values)}
          >
            {" "}
            Editar
          </button>
        ),
      },
    ]);
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    pageOptions,
    prepareRow,
    state: { pageIndex },
    state,
    setGlobalFilter,
  } = useTable(
    { columns, data },
    useGlobalFilter,
    useSortBy,
    usePagination,
    tableHooks
  );

  const { globalFilter } = state;

  return (
    <div className="containerTable">
      <div className="headerTable">
        <div className="col-md-7 col-sm-5">
          <h2 className="mt-3 textTable">OMC Nivel 1</h2>
        </div>
        <div className="col-md-5 col-sm-7">
          <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        </div>
      </div>

      <div className="table-responsive shadow-lg">
        <table  {...getTableProps()} className="table table-hover mt-1">
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
                  style={{ fontSize: "12px", fontFamily: "arial" }}
                  {...row.getRowProps()}
                  onClick={(e) => {
                    selectRow(e); props.selectOpp(row.original.codigo,null)
                  }}
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
  );
}
