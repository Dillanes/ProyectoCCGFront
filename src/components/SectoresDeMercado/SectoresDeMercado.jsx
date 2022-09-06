import React from "react";
import axios from "axios";
import { RiFileEditFill } from "react-icons/ri";
import { FcFullTrash } from "react-icons/fc";
import { ImCross } from "react-icons/im";
import { FiAlertCircle } from "react-icons/fi";
import { TbArrowsDown, TbArrowsUp, TbArrowsDownUp } from "react-icons/tb";
import { useLogin } from "../../context/LoginContext";
import Pagination from "@mui/material/Pagination";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Alert, Button } from "@mui/material";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function SectoresDeMercado() {
  const { dataToken } = useLogin();

  //URL base for API requests
  const BASEURL = "http://127.0.0.1:8000/";
  //   const BASEURL = "https://msdocs-python-sqlserver-api-215.azurewebsites.net/";

  //Api request
  const api = axios.create({
    baseURL: BASEURL,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: `Token ${dataToken.token}`,
    },
  });

  const [provedores, setProvedores] = React.useState(); //Api de provedores
  const [copiaProvedores, setCopiaProvedores] = React.useState(); //Copia para la edicion de provedores, es la que se muestra en pantalla
  const [provedoresCount, setProvedoresCount] = React.useState(); //Contador de cuantos productos hay
  const [busqueda, setBusqueda] = React.useState(""); //Valor del filtro de busqueda
  const [editarNombre, setEditarNombre] = React.useState(""); //Valor de la edicion del nombre
  const [tipoDeAlerta, setTipoDeAlerta] = React.useState(""); //Tipo de alerta "success"#4caf50, "error"#ef5350, "warning"#ff9800 or "info"#03a9f4
  const [contenidoDeAlerta, setContenidoDeAlerta] = React.useState(""); //Informacion que se mostrara a traves de la alerta
  const [qtyArrays, setQtyArrays] = React.useState(2); //Cantidad de array de copiaProvedores
  const [rowsPagination, setRowsPagination] = React.useState(10); //Cantidad de hileras que se mostraran en pantalla. El valor predeterminado sera de 10
  const [containerPagination, setContainerPagination] = React.useState(0); //Muestra en que pagina se encuentra, el valor predeterminado es 0
  const [paginationBottoms, setPaginationBottoms] = React.useState(); //Array de botones de paginacion
  const [editAvailable, setEditAvailable] = React.useState(false); //Validador de edicion de nombre
  const [alerta, setAlerta] = React.useState(false); //Si se muestra la alerta
  const [idName, setIdName] = React.useState(); //Id de nombre, se usa para actualizar el nombre
  const [sortAlphabetic, setSortAlphabetic] = React.useState(""); //Asignacion de valor de Sort "Down", "up" or ""
  const [open, setOpen] = React.useState(false); //Abrir y cerrar el modal

  //UseEffect initializes the Api
  React.useEffect(() => {
    fetchApis();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //llamado de Api
  const fetchApis = async () => {
    const { data: provedor } = await api("apiproveedores/SectorMercado/");
    await paginationBottom(provedor.count, rowsPagination);
    await setCopiaProvedores(provedor.results);
    await setProvedores(provedor.results);
    await setProvedoresCount(provedor.count);
  };

  //Creador de arrays dinamico para la paginacion
  const paginationBottom = (lenght, rows) => {
    const pagination = Math.ceil(lenght / rows);
    let bottom = [];
    for (let index = 0; index < pagination; index++) {
      bottom.push(index);
    }
    return setPaginationBottoms(bottom);
  };

  //Asignacion de valor de buscador y ejecuta el filtrado
  const buscador = (e) => {
    setBusqueda(e.target.value);
    buscadorFiltrado(e.target.value);
  };

  //Sistema de filtrado del buscador
  const buscadorFiltrado = (filtro) => {
    if (filtro.lenght === 0) {
      setCopiaProvedores(provedores);
    } else {
      // eslint-disable-next-line array-callback-return
      var resultadoBusqueda = provedores.filter((productoFiltrado) => {
        if (
          productoFiltrado.Nombre.toLowerCase().includes(filtro.toLowerCase())
        ) {
          return productoFiltrado;
        }
      });
      setCopiaProvedores(resultadoBusqueda);
    }
    setQtyArrays(resultadoBusqueda.length);
    paginationBottom(resultadoBusqueda.length, rowsPagination);
    setContainerPagination(0);
  };

  //Eliminar busqueda y restablece
  const borrarBusqueda = () => {
    setBusqueda("");
    buscadorFiltrado("");
  };

  //Asignacion de en cual paginado nos encontramos
  const handleChange = (event, value) => {
    setContainerPagination(value - 1);
  };

  //Asignacion de cuantas columnas se veran en la pantalla
  const handleChangeRows = async (event) => {
    await setRowsPagination(event.target.value);
    await paginationBottom(provedores.length, event.target.value);
    setContainerPagination(0);
  };

  //Generador de alertas, mse les asiga el tipo asi como su contenido
  const generadorDeAlertas = (tipo, contenido) => {
    setTipoDeAlerta(tipo);
    setContenidoDeAlerta(contenido);
    setAlerta(true);
    setTimeout(() => {
      setAlerta(false);
      setTipoDeAlerta("");
    }, 3000);
  };

  //Actualiza el nombre, mediante el metodo put
  const nameCreator = (metodo, id) => {
    var URL;
    if (metodo === "post") {
      URL = `${BASEURL}apiproveedores/SectorMercado/`;
    } else {
      URL = `${BASEURL}apiproveedores/SectorMercado/${id}/`;
    }
    var data = JSON.stringify({
      Nombre: editarNombre,
    });

    var config = {
      method: metodo,
      url: URL,
      headers: {
        Authorization: `Token ${dataToken.token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data.mensaje));
        setEditAvailable(false);
        generadorDeAlertas("success", response.data.mensaje);
      })
      .catch(function (error) {
        console.log(error);
        generadorDeAlertas("error", error.response.data.error);
      });
  };

  //Se restablecen los campos
  const restablecerValores = async () => {
    await setProvedores([]);
    await setCopiaProvedores([]);
    await setBusqueda("");
    await setSortAlphabetic("");
    await setEditarNombre("");
    await setContainerPagination(0);
    await setEditAvailable(false);
    await fetchApis();
  };

  //Se hacen las validaciones de guardar la edicion del campo nombre
  const guardarEdicionDeNombre = async () => {
    if (editarNombre.trim() === "") {
      generadorDeAlertas("error", "No se puede guardar con nombre en blanco!");
    } else {
      await nameCreator("put", idName);
      // await generadorDeAlertas("success", "Se actualizo el nombre con exito!");
      await restablecerValores();
    }
  };

  //Se crea el nombre
  const crearNombreValidacion = async () => {
    if (editarNombre.trim() === "") {
      generadorDeAlertas("error", "No se puede crear con nombre en blanco!");
    } else {
      await nameCreator("post");
      await restablecerValores();
    }
  };

  //Se eliminan el nombre
  const eliminarNombre = async (id) => {
    await nameCreator("delete", id);
    await restablecerValores();
  };

  //Se ordena alfabeticamente el contenido de provedores y se hacen cambios de estatus
  const ordenarAlfabeticamente = () => {
    var listaOrdenada = copiaProvedores.sort((a, b) => {
      if (a.Nombre > b.Nombre) {
        return 1;
      } else {
        return 0;
      }
    });
    if (sortAlphabetic === "") {
      setSortAlphabetic("down");
      setCopiaProvedores(listaOrdenada);
    } else if (sortAlphabetic === "down") {
      listaOrdenada.reverse();
      setSortAlphabetic("up");
    } else if (sortAlphabetic === "up") {
      buscadorFiltrado(busqueda);
      setSortAlphabetic("");
    }
  };

  return (
    <div className="container pt-5 mt-2">
      <br />
      <h3 className="h1 text-center" id="sectoresDeMercado">
        Sectores del mercado
      </h3>
      <br />
      <div className="mb-3 d-flex align-items-center">
        {/* <span className="input-group-text" id="inputGroup-sizing-sm">
          Small
        </span> */}
        <input
          type="text"
          id="buscador"
          className="form-control w-50 "
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-sm"
          placeholder="Buscar..."
          onChange={buscador}
          value={busqueda}
        />
        {busqueda ? (
          <ImCross
            className="mx-2"
            cursor={"pointer"}
            onClick={() => borrarBusqueda()}
          />
        ) : null}
        <FormControl
          className="ms-auto"
          sx={{ m: 1, minWidth: 85 }}
          size="small"
        >
          <InputLabel id="demo-select-small">Rows</InputLabel>
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            value={rowsPagination}
            label="Age"
            onChange={handleChangeRows}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
            <MenuItem value={30}>30</MenuItem>
          </Select>
        </FormControl>
      </div>
      {alerta && (
        <Alert severity={tipoDeAlerta} className="mt-3">
          {contenidoDeAlerta}
        </Alert>
      )}
      {provedores ? (
        <table className="table">
          <thead>
            <tr>
              <th
                onClick={() => ordenarAlfabeticamente()}
                style={{ cursor: "pointer" }}
              >
                Nombre de la clasificación{" "}
                {sortAlphabetic === "down" && <TbArrowsDown />}
                {sortAlphabetic === "up" && <TbArrowsUp />}
                {sortAlphabetic === "" && <TbArrowsDownUp />}
              </th>
              <th className="text-center">Editar</th>
              <th className="text-center">Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {copiaProvedores
              .slice(
                containerPagination * rowsPagination,
                containerPagination * rowsPagination + rowsPagination
              )
              .map((item, index) => (
                <tr key={index}>
                  <td className="col-10">{item.Nombre}</td>
                  <td className="col-1 text-center">
                    <a href="#editarSectoresDeMercado">
                      <RiFileEditFill
                        className="editar"
                        onClick={() => {
                          setEditarNombre(item.Nombre);
                          setIdName(item.idSecMer);
                          setEditAvailable(true);
                        }}
                      />
                    </a>
                  </td>
                  <td className="col-1 text-center">
                    <FcFullTrash
                      className="trash"
                      onClick={() => {
                        setIdName(item.idSecMer);
                        // eliminarNombre(item.idSecMer);
                        setOpen(true);
                      }}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <h2>Cargando ...</h2>
      )}
      {qtyArrays === 0 && <h1>No hay información</h1>}
      <div className="mb-3 d-flex align-items-center">
        <Pagination
          count={provedores ? paginationBottoms.length : 0}
          showFirstButton
          showLastButton
          // variant="outlined"
          color="primary"
          onChange={handleChange}
          page={containerPagination + 1}
        />
        <p className="m-auto">
          {containerPagination * rowsPagination + 1}
          {" - "}
          {containerPagination * rowsPagination + rowsPagination}
          {" de "}
          {provedoresCount}
        </p>
        <FormControl
          className="ms-auto"
          sx={{ m: 1, minWidth: 85 }}
          size="small"
        >
          <InputLabel id="demo-select-small">Rows</InputLabel>
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            value={rowsPagination}
            label="Rows"
            onChange={handleChangeRows}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
            <MenuItem value={30}>30</MenuItem>
          </Select>
        </FormControl>
      </div>
      <br />
      <section id="editarSectoresDeMercadoFormulario">
        <h2>
          {editAvailable
            ? "Editar nombre de la clasificación"
            : "Crear nombre de la clasificación"}
        </h2>

        {tipoDeAlerta === "error" && (
          <Alert severity={tipoDeAlerta} className="mt-3">
            {contenidoDeAlerta}
          </Alert>
        )}
        <div className="d-flex align-items-end">
          <input
            type="text"
            id="editarSectoresDeMercado"
            className="form-control w-25 mt-4"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm"
            placeholder=""
            onChange={(e) => setEditarNombre(e.target.value)}
            value={editarNombre}
          />
          <Button
            color="success"
            className="ms-3"
            variant="outlined"
            onClick={
              editAvailable
                ? () => guardarEdicionDeNombre()
                : () => crearNombreValidacion()
            }
            size="large"
            disabled={editarNombre === ""}
          >
            {editAvailable ? "Actualizar" : "Crear"}
          </Button>
          {editAvailable && (
            <Button
              color="error"
              className="ms-2"
              variant="outlined"
              onClick={() => {
                setEditAvailable(false);
                setEditarNombre("");
              }}
              size="large"
              href="#sectoresDeMercado"
            >
              Cancelar
            </Button>
          )}
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </section>

      <div id="modalParaEliminar">
        <Dialog
          open={open}
          maxWidth={"xs"}
          onClose={() => setOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle
            id="alert-dialog-title"
            sx={{ fontSize: 60 }}
            className="text-center text-danger"
          >
            <FiAlertCircle />
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Esta seguro que desea eliminar este registro?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Box
              noValidate
              component="form"
              sx={{
                display: "flex",
                flexDirection: "",
                m: "auto",
                width: "fit-content",
              }}
            >
              <Button
                color="error"
                variant="contained"
                className="me-2"
                onClick={() => setOpen(false)}
              >
                Cancelar
              </Button>
              <Button
                color="info"
                variant="contained"
                onClick={() => {
                  setOpen(false);
                  eliminarNombre(idName);
                }}
              >
                Si, eliminar!
              </Button>
            </Box>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}


