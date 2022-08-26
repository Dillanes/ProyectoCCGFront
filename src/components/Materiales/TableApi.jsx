import React from "react";
import { Link } from "react-router-dom";
import { TableContext } from "../../context/Materiales/TableContext";
// import VistaParcial from "./VistaParcial";

function TableApi() {
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
      <section className="mb-3">
        <table className="table align-middle" id="tableMaterials">
          <thead>
            <tr>
              <th scope="row">ID</th>
              <th scope="row">Código</th>
              <th scope="row">Descripción en Español</th>
              <th scope="row">Descripción en Ingles</th>
              <th className="text-center" scope="row">
                Acción
              </th>
            </tr>
          </thead>
          <tbody>
            {datos.map((item, index) => (
              <tr key={index} className="seleccion" id={item.idOmc23N1}>
                <td className="col-1">
                  {item.idOmc23N1
                    ? item.idOmc23N1
                    : item.idOmc23N2
                    ? item.idOmc23N2
                    : item.idOmc23N3
                    ? item.idOmc23N3
                    : item.idOmc23N4
                    ? item.idOmc23N4
                    : item.idOmc23N5}
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
                          item.idOmc23N1
                            ? item.idOmc23N1
                            : item.idOmc23N2
                            ? item.idOmc23N2
                            : item.idOmc23N3
                            ? item.idOmc23N3
                            : item.idOmc23N4
                            ? item.idOmc23N4
                            : item.idOmc23N5
                            ? item.idOmc23N5
                            : item.idOmc23N6
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
        {/* <button className="btn btn-dark" onClick={() => volver(informacion.length-1)}>Regresar</button> */}
        {informacion.map((item, index) => (
          <Link
            className="pe-2"
            key={index}
            to
            onClick={() => volver(index)}
          >{`${item.nivel} ${item.descrip}>`}</Link>
        ))}
        {/* <h2>Nivel {niveles-1} <h3>{descripcion}</h3></h2> */}
      </section>

      {/* {formularioActivate ? <VistaParcial /> : ""} */}
    </React.Fragment>
  );
}

export { TableApi };
