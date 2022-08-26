import { render, renderHook } from "@testing-library/react";
import axios from "axios";
import React, { useEffect, useState, useMemo } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useLogin } from "../LoginContext";
// import { fetchAllUsers,fetchAllOMCN2,fetchAllOMCN3,fetchAllOMCN4,fetchAllOMCN5,fetchAllOMCN6} from '../../redux/slices'
const Omc34Context = React.createContext();

export function Omc34Provider(props) {
  const URLBASE = 'http://127.0.0.1:8000/'
  // const URLBASE = "https://msdocs-python-sqlserver-api-215.azurewebsites.net/";

  const { dataToken } = useLogin();

  useEffect(() => {
    fetchData(1);
  }, []);

  const headers = {
    headers: {
      Authorization: `Token ${dataToken.token}`,
    },
  };

  //Listado de Tablas
  const [dataomcn2, setdataomcn2] = useState([]);
  const [dataomcn3, setdataomcn3] = useState([]);
  const [dataomcn4, setdataomcn4] = useState([]);

  const [selectcodigo1, setselectcodigo1] = useState();
  const [selectcodigo2, setselectcodigo2] = useState();
  const [selectcodigo3, setselectcodigo3] = useState();

  //ESTADOS
  const [omc34n1, setomc34n1] = useState([]);
  const [omc34n2, setomc34n2] = useState([]);
  const [omc34n3, setomc34n3] = useState([]);
  const [omc34n4, setomc34n4] = useState([]);
  const [response, setresponse] = useState([]);

  //Funciones para filtrar
  //FUNCIONES PARA FILTRAR
  const selectOpp = (data, dataApi) => {
    setselectcodigo1(data);
    const selectid = omc34n1.filter((dato) => dato.codigo === data);
    if (dataApi != null) {
      setdataomcn2(
        dataApi.filter((dato) => dato.fk_Omc34N1 === selectid[0].idOmc34N1)
      );
    } else {
      setdataomcn2(
        omc34n2.filter((dato) => dato.fk_Omc34N1 === selectid[0].idOmc34N1)
      );
    }
    setdataomcn3([]);
    setdataomcn4([]);
  };

  const selectOpp2 = (data, dataApi) => {
    setselectcodigo2(data);
    const selectid = omc34n2.filter((dato) => dato.codigo === data)
    console.log(data)
    if (dataApi != null) {
      
      setdataomcn3(
        dataApi.filter((dato) => dato.fk_Omc34N2 === selectid[0].idOmc34N2)
      );
    } else {
      setdataomcn3(
        omc34n3.filter((dato) => dato.fk_Omc34N2 === selectid[0].idOmc34N2)
      );
    }

    setdataomcn4([]);
  };

  const selectOpp3 = (data, dataApi) => {
    setselectcodigo3(data);
    const selectid = omc34n3.filter((dato) => dato.codigo === data);
    if (dataApi != null) {
      setdataomcn4(
        dataApi.filter((dato) => dato.fk_Omc34N3 === selectid[0].idOmc34N3)
      );
    } else {
      setdataomcn4(
        omc34n4.filter((dato) => dato.fk_Omc34N3 === selectid[0].idOmc34N3)
      );
    }
  };

  //LLAMADO A LAS APIS
  const fetchData = async (num) => {
    axios
      .get(`${URLBASE}apiomcroles/OMC34Nivel1/`, headers)
      .then((response) => {
        setomc34n1(response.data.results);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get(`${URLBASE}apiomcroles/OMC34Nivel2/`, headers)
      .then((response) => {
        setomc34n2(response.data.results);
        if (num === 2) {
          selectOpp(selectcodigo1, response.data.results);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`${URLBASE}apiomcroles/OMC34Nivel3/`, headers)
      .then((response) => {
        setomc34n3(response.data.results);
        if (num === 3) {
          selectOpp2(selectcodigo2, response.data.results);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`${URLBASE}apiomcroles/OMC34Nivel4/`, headers)
      .then((response) => {
        setomc34n4(response.data.results);
        if (num === 4) {
          selectOpp3(selectcodigo3, response.data.results);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Funcion crear omc34
  const CreateOmc34Url = async (Data, idtabla, codigo) => {
    switch (idtabla) {
      case 1:
        axios
          .post(
            `${URLBASE}apiomcroles/OMC34Nivel${idtabla}/`,
            {
              codigo: Data.codigo,
              anioReg: Data.anioReg,
              definicionEng: Data.definicionEng,
              definicionSpa: Data.definicionSpa,
              descriEng: Data.descriEng,
              descriSpa: Data.descriSpa,
            },
            headers
          )
          .then((response) => {
            console.log(response);
            fetchData();
            if (response.request.status === 201) {
              return (
                toast.success(`EL registro se ha creado exitosamente`),
                console.log(response.request.status)
              );
            }
            setresponse(response.request.status);
          })
          .catch((error) => {
            console.log(error);
          });
        break;
      case 2:
        const register1 = omc34n1.filter((select) => select.codigo === codigo);
        axios
          .post(
            `${URLBASE}apiomcroles/OMC34Nivel${idtabla}/`,
            {
              codigo: Data.codigo,
              anioReg: Data.anioReg,
              definicionEng: Data.definicionEng,
              definicionSpa: Data.definicionSpa,
              descriEng: Data.descriEng,
              descriSpa: Data.descriSpa,
              regFinal: Data.regFinal,
              fk_Omc34N1: register1[0].idOmc34N1,
            },
            headers
          )
          .then((response) => {
            fetchData(2);
            if (response.request.status === 201) {
              return toast.success(`EL registro se ha creado exitosamente`);
            }
            setresponse(response.request.status);
          })
          .catch((error) => {
            console.log(error);
          });

        break;
      case 3:
        const register2 = omc34n2.filter((select) => select.codigo === codigo);
        axios
          .post(
            `${URLBASE}apiomcroles/OMC34Nivel${idtabla}/`,
            {
              codigo: Data.codigo,
              anioReg: Data.anioReg,
              definicionEng: Data.definicionEng,
              definicionSpa: Data.definicionSpa,
              descriEng: Data.descriEng,
              descriSpa: Data.descriSpa,
              regFinal: Data.regFinal,
              fk_Omc34N2: register2[0].idOmc34N2,
            },
            headers
          )
          .then((response) => {
            fetchData(3);
            if (response.request.status === 201) {
              return toast.success(`EL registro se ha creado exitosamente`);
            }
            setresponse(response.request.status);
          })
          .catch((error) => {
            console.log(error);
          });
        break;
      case 4:
        const register3 = omc34n3.filter((select) => select.codigo === codigo);
        axios
          .post(
            `${URLBASE}apiomcroles/OMC34Nivel${idtabla}/`,
            {
              codigo: Data.codigo,
              anioReg: Data.anioReg,
              definicionEng: Data.definicionEng,
              definicionSpa: Data.definicionSpa,
              descriEng: Data.descriEng,
              descriSpa: Data.descriSpa,
              regFinal: Data.regFinal,
              fk_Omc34N3: register3[0].idOmc34N3,
            },
            headers
          )
          .then((response) => {
            fetchData(4);
            if (response.request.status === 201) {
              return toast.success(`EL registro se ha creado exitosamente`);
            }
            setresponse(response.request.status);
          })
          .catch((error) => {
            console.log(error);
          });
        break;
      default:
        break;
    }
  };

  //funcion actualizar registro omc34
  const UpdateOmc34Url = async (idtabla, id, Data, fk) => {
    switch (idtabla) {
      case 1:
        axios
          .put(
            `${URLBASE}apiomcroles/OMC34Nivel1/${id}/`,
            {
              codigo: Data.codigo,
              anioReg: Data.anioReg,
              definicionEng: Data.definicionEng,
              definicionSpa: Data.definicionSpa,
              descriEng: Data.descriEng,
              descriSpa: Data.descriSpa,
            },
            headers
          )
          .then((response) => {
            console.log(response);
            fetchData(1);
            if (response.request.status === 200) {
              return toast.success(`El registro se ha actualizado`);
            }
            setresponse(response.request.status);
          });
        break;
      case 2:
        axios
          .put(
            `${URLBASE}apiomcroles/OMC34Nivel2/${id}/`,
            {
              codigo: Data.codigo,
              anioReg: Data.anioReg,
              definicionEng: Data.definicionEng,
              definicionSpa: Data.definicionSpa,
              descriEng: Data.descriEng,
              descriSpa: Data.descriSpa,
              ejemploEng: Data.ejemploEng,
              ejemploSpa: Data.ejemploSpa,
              regFinal: Data.regFinal,
              fk_Omc34N1: fk,
            },
            headers
          )
          .then((response) => {
            if (response.request.status === 200) {
              return (
                toast.success(`El registro se ha actualizado`), fetchData(2)
              );
            }
            setresponse(response.request.status);
          });
        break;
      case 3:
        axios
          .put(
            `${URLBASE}apiomcroles/OMC34Nivel3/${id}/`,
            {
              codigo: Data.codigo,
              anioReg: Data.anioReg,
              definicionEng: Data.definicionEng,
              definicionSpa: Data.definicionSpa,
              descriEng: Data.descriEng,
              descriSpa: Data.descriSpa,
              regFinal: Data.regFinal,
              fk_Omc34N2: fk,
            },
            headers
          )
          .then((response) => {
            if (response.request.status === 200) {
              return (
                toast.success(`El registro se ha actualizado`), fetchData(3)
              );
            }
            setresponse(response.request.status);
          });
        break;
      case 4:
        axios
          .put(
            `${URLBASE}apiomcroles/OMC34Nivel4/${id}/`,
            {
              codigo: Data.codigo,
              anioReg: Data.anioReg,
              definicionEng: Data.definicionEng,
              definicionSpa: Data.definicionSpa,
              descriEng: Data.descriEng,
              descriSpa: Data.descriSpa,
              regFinal: Data.regFinal,
              fk_Omc34N3: fk,
            },
            headers
          )
          .then((response) => {
            if (response.request.status === 200) {
              return (
                toast.success(`El registro se ha actualizado`), fetchData(4)
              );
            }
            setresponse(response.request.status);
          });
        break;
      default:
        break;
    }
  };

  const value = useMemo(() => {
    return {
      UpdateOmc34Url,
      CreateOmc34Url,
      omc34n1,
      omc34n2,
      omc34n3,
      omc34n4,
      response,
      dataomcn2,
      dataomcn3,
      dataomcn4,
      selectOpp,
      selectOpp2,
      selectOpp3,
      selectcodigo1,
      selectcodigo2,
      selectcodigo3,
    };
  }, [
    omc34n1,
    omc34n2,
    omc34n3,
    omc34n4,
    response,
    dataomcn2,
    dataomcn3,
    dataomcn4,
    selectcodigo1,
    selectcodigo2,
    selectcodigo3,
  ]);

  return <Omc34Context.Provider value={value} {...props} />;
}

export function useOmc34() {
  const context = React.useContext(Omc34Context);
  if (!context) {
    throw new `useOmc34 debe estar dentroi del provedor omc34Context`();
  }

  return context;
}
