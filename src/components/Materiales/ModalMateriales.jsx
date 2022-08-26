import "./TableApi.css";
import { Modal } from "react-bootstrap";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { TableContext } from "../../context/Materiales/TableContext";
import { FaFilter } from "react-icons/fa";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

function ModalMateriales() {
  const {
    datosConcreto,
    datoBaseTabla,
    addTable,
    deleteTableMaterials,
    resetTabla,
  } = React.useContext(TableContext);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <OverlayTrigger
        placement="right"
        overlay={<Tooltip id="tooltip-disabled">Añadir datos</Tooltip>}
      >
        <span>
          <FaFilter
            onClick={handleShow}
            className="h3 text-primary seleccionar"
          />
        </span>
      </OverlayTrigger>
      <Modal show={show} onHide={handleClose} size="lg" centered scrollable>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body height={"100px !important"}>
          <div className="row">
            <div className="col-6">
              <p>Datos en pantalla</p>
              {datoBaseTabla.map((item, index) => (
                <ul
                  key={index}
                  className="list-group"
                  onClick={() => deleteTableMaterials(item)}
                >
                  <ol className="list-group-item seleccionar seleccion">
                    {item}
                  </ol>
                </ul>
              ))}
            </div>
            <div className="col-6">
              <div
                data-bs-spy="scroll"
                data-bs-target="#navbar-example3"
                data-bs-smooth-scroll="true"
                tabIndex={"0"}
              >
                <p>Añadir datos</p>
                {datosConcreto.map((item, index) => (
                  <ul
                    key={index}
                    className="list-group"
                    onClick={() => addTable(item)}
                  >
                    <ol className="list-group-item seleccionar seleccion">
                      {item}
                    </ol>
                  </ul>
                ))}
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={resetTabla}>
            Restablecer
          </Button>
          <Button variant="warning" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export { ModalMateriales };
