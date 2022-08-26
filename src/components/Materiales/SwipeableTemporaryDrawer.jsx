import React from "react";
import { Link } from "react-router-dom";
import { TableContext } from "../../context/Materiales/TableContext";
import { AiFillSetting } from "react-icons/ai";

function SwipeableTemporaryDrawer() {
  const {
    listarTMA,
    listarValorEsfuerzo,
    listarTipoResistencia,
    listarConcretosMateriales,
    setListarConcretosMaterialesCopia,
    listarDensidad,
    listarFlujoRev,
    listarRevenimiento,
    listarFibraConcre,
    listarClasExposicion,
    listarSistColocacion,
  } = React.useContext(TableContext);

  const [busqueda2, setBusqueda2] = React.useState("");

  const hangleChange2 = (e) => {
    setBusqueda2(e.target.value);
    filtradoEspecial(e.target.value);
    console.log(busqueda2);
  };

  const filtradoEspecial = (terminoDeBusqueda) => {
    // eslint-disable-next-line array-callback-return
    var resultadoBusqueda2 = listarConcretosMateriales.filter((elemento) => {
      if (
        elemento.valRev
          .toLowerCase()
          .includes(terminoDeBusqueda.toLowerCase()) ||
        elemento.valTma.toLowerCase().includes(terminoDeBusqueda.toLowerCase())
      ) {
        return elemento;
      }
    });
    setListarConcretosMaterialesCopia(resultadoBusqueda2);
  };

  return (
    <div>
      <AiFillSetting
        className="h3"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasRight"
        aria-controls="offcanvasRight"
      >
        Toggle right offcanvas
      </AiFillSetting>

      <div
        className="offcanvas offcanvas-end"
        tabindex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h5 id="offcanvasRightLabel">Filtrar materiales</h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>

        <div className="offcanvas-body">
          <ul className="" aria-labelledby="dropdownMenuLink">
            <li>
              <Link className="dropdown-item" to>
                <div className="">
                  <select name="" id="" className="form-select">
                    <option value="">Clase</option>
                  </select>
                </div>
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to>
                <select
                  name=""
                  id=""
                  onChange={hangleChange2}
                  className="form-select"
                >
                  <option value="">TMA</option>
                  {listarTMA.map((value, index) => (
                    <option key={index} value={value.valTma}>
                      {value.valTma}
                    </option>
                  ))}
                </select>
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to>
                <select name="" id="" className="form-select">
                  <option value="">Valor del Esfuerzo</option>
                  {listarValorEsfuerzo.map((valorEs, index) => (
                    <option key={index} value={valorEs.idValEsf}>
                      {valorEs.Valor}
                    </option>
                  ))}
                </select>
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to>
                <select name="" id="" className="form-select">
                  <option value="">Tipo de Esfuerzo</option>
                  {
                    <option value={1}>
                      Resistencia a la compresión del concreto
                    </option>
                  }
                </select>
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to>
                <select name="" id="" className="form-select">
                  <option value="">Tipo de Resistencia</option>
                  {listarTipoResistencia.map((value, index) => (
                    <option key={index} value={value.idTipoResist}>
                      {value.Tipo}
                    </option>
                  ))}
                </select>
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to>
                <select name="" id="" className="form-select">
                  <option value="">Densidad</option>
                  <option value="">Selecciona...</option>
                  {listarDensidad.map((value, index) => (
                    <option key={index} value={value.idDensidad}>
                      {value.valDensidad}
                    </option>
                  ))}
                </select>
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to>
                <select name="" id="" className="form-select">
                  <option value="">Tipo de Densidad</option>
                </select>
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to>
                <select name="" id="" className="form-select">
                  <option value="">Tipo de consistencia</option>
                </select>
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to>
                <select name="" id="" className="form-select">
                  <option value="">Flujo de revenimiento</option>
                  {listarFlujoRev.map((value, index) => (
                    <option key={index} value={value.idFlujoRev}>
                      {value.valFluRev}
                    </option>
                  ))}
                </select>
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to>
                <select
                  name=""
                  id=""
                  onChange={hangleChange2}
                  className="form-select"
                >
                  <option value="">Valor de revenimiento</option>
                  {listarRevenimiento.map((value, index) => (
                    <option key={index} value={value.valRev}>
                      {value.valRev}
                    </option>
                  ))}
                </select>
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to>
                <select name="" id="" className="form-select">
                  <option value="">Fibra</option>
                  {listarFibraConcre.map((value, index) => (
                    <option key={index} value={value.idFibraCon}>
                      {value.Fibras}
                    </option>
                  ))}
                </select>
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to>
                <select name="" id="" className="form-select">
                  <option value="">Relación agua cemento</option>
                </select>
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to>
                <select name="" id="" className="form-select">
                  <option value="">Categoria de exposición</option>
                  {listarClasExposicion.map((value, index) => (
                    <option key={index} value={value.idClasExpo}>
                      {value.Condicion}
                    </option>
                  ))}
                </select>
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to>
                <select name="" id="" className="form-select">
                  <option value="">Sistema de colocación</option>
                  {listarSistColocacion.map((value, index) => (
                    <option key={index} value={value.idSistColoc}>
                      {value.tipoSistema}
                    </option>
                  ))}
                </select>
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to></Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export { SwipeableTemporaryDrawer };
