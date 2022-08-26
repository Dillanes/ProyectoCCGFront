import React from "react";
import { TableContext } from "../../context/Materiales/TableContext";
// import VistaParcial from "./VistaParcial";
import "./TableApi.css";
import { Link } from "react-router-dom";

function TableApi41() {
  const {
    volver,
    niveles,
    informacion,
    datos,
    getNiveles,
    setDescripcion,
    // formularioActivate,
    getVistaParcial,
  } = React.useContext(TableContext);

  return (
    <React.Fragment>
      <section className="mb-3 ">
        <div className="table-responsive-md">
          <table className="table" id="tableMaterials">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Código</th>
                <th scope="col">Descripción en Español</th>
                <th scope="col">Descripción en Ingles</th>
                <th className="text-center" scope="col">
                  Acción
                </th>
              </tr>
            </thead>
            <tbody>
              {datos.map((item, index) => (
                <tr key={index} className="seleccion" id={item.idOmc41N1}>
                  <td className="col-1">
                    {item.idOmc41N1
                      ? item.idOmc41N1
                      : item.idOmc41N2
                      ? item.idOmc41N2
                      : item.idOmc41N3
                      ? item.idOmc41N3
                      : item.idOmc41N4
                      ? item.idOmc41N4
                      : item.idOmc41N5}
                  </td>
                  <td className="col-2">{item.Codigo}</td>
                  <td className="col-4">{item.descriSpa}</td>
                  <td className="col-4">{item.descriEng}</td>
                  {item.regFinal ? (
                    <td className="text-center">
                      <Link
                        style={{ width: "100px" }}
                        type="button"
                        className="btn btn-info btn-sm"
                        onClick={() => getVistaParcial(item.Codigo)}
                        to="/formulario"
                      >
                        Seleccionar
                      </Link>
                    </td>
                  ) : (
                    <td className="text-center">
                      <button
                        style={{ width: "100px" }}
                        type="button"
                        className="btn btn-dark btn-sm"
                        onClick={() => {
                          setDescripcion(item.descriSpa);
                          getNiveles(
                            item.idOmc41N1
                              ? item.idOmc41N1
                              : item.idOmc41N2
                              ? item.idOmc41N2
                              : item.idOmc41N3
                              ? item.idOmc41N3
                              : item.idOmc41N4
                              ? item.idOmc41N4
                              : item.idOmc41N5
                              ? item.idOmc41N5
                              : item.idOmc41N6
                          );
                        }}
                      >
                        {item.regFinal ? "Seleccionar" : `Nivel ${niveles}`}
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* <button className="btn btn-dark" onClick={() => volver(informacion.length-1)}>Regresar</button> */}
        {informacion.map((item, index) => (
          <Link
            to
            className="pe-2"
            key={index}
            onClick={() => volver(index)}
          >{`${item.nivel} ${item.descrip}>`}</Link>
        ))}
        {/* <h2>Nivel {niveles-1} <h3>{descripcion}</h3></h2> */}
      </section>

      {/* {formularioActivate ? <VistaParcial /> : ""} */}
    </React.Fragment>
  );
}

export { TableApi41 };
