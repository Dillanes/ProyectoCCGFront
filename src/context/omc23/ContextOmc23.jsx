
import axios from "axios";
import React, { useEffect, useState, useMemo } from "react";
import {toast} from "react-hot-toast";
import { useLogin } from "../LoginContext";
// import { fetchAllUsers,fetchAllOMCN2,fetchAllOMCN3,fetchAllOMCN4,fetchAllOMCN5,fetchAllOMCN6} from '../../redux/slices'
const Omc23Context = React.createContext();

export function Omc23Provider(props) {
  // const URLBASE = 'http://127.0.0.1:8080/'
  const URLBASE = "http://127.0.0.1:8000/";
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
  const [dataomcn5, setdataomcn5] = useState([]);
  const [dataomcn6, setdataomcn6] = useState([]);

  const [selectcodigo1, setselectcodigo1] = useState();
  const [selectcodigo2, setselectcodigo2] = useState();
  const [selectcodigo3, setselectcodigo3] = useState();
  const [selectcodigo4, setselectcodigo4] = useState();
  const [selectcodigo5, setselectcodigo5] = useState();

  //ESTADOS
  const [omc23n1, setomc23n1] = useState([]);
  const [omc23n2, setomc23n2] = useState([]);
  const [omc23n3, setomc23n3] = useState([]);
  const [omc23n4, setomc23n4] = useState([]);
  const [omc23n5, setomc23n5] = useState([]);
  const [omc23n6, setomc23n6] = useState([]);
  const [response, setresponse] = useState([]);


  //Funciones para filtrar
  //FUNCIONES PARA FILTRAR
  const selectOpp = (data, dataApi) => {
    setselectcodigo1(data);
    const selectid = omc23n1.filter((dato) => dato.codigo === data);
    if (dataApi != null) {
      setdataomcn2(
        dataApi.filter((dato) => dato.fk_Omc23N1 === selectid[0].idOmc23N1)
      );
    } else {
      setdataomcn2(
        omc23n2.filter((dato) => dato.fk_Omc23N1 === selectid[0].idOmc23N1)
      );
    }
    setdataomcn3([]);
    setdataomcn4([]);
    setdataomcn5([]);
  };

  const selectOpp2 = (data, dataApi) => {
    setselectcodigo2(data);
    const selectid = omc23n2.filter((dato) => dato.codigo === data);
    if (dataApi != null) {
      setdataomcn3(
        dataApi.filter((dato) => dato.fk_Omc23N2 === selectid[0].idOmc23N2)
      );
    } else {
      setdataomcn3(
        omc23n3.filter((dato) => dato.fk_Omc23N2 === selectid[0].idOmc23N2)
      );
    }

    setdataomcn4([]);
    setdataomcn5([]);
    setdataomcn6([]);
  };

  const selectOpp3 = (data, dataApi) => {
    setselectcodigo3(data);
    const selectid = omc23n3.filter((dato) => dato.codigo === data);
    if (dataApi != null) {
      setdataomcn4(
        dataApi.filter((dato) => dato.fk_Omc23N3 === selectid[0].idOmc23N3)
      );
    } else {
      setdataomcn4(
        omc23n4.filter((dato) => dato.fk_Omc23N3 === selectid[0].idOmc23N3)
      );
    }
    setdataomcn5([]);
    setdataomcn6([]);
  };

  const selectOpp4 = (data, dataApi) => {
    setselectcodigo4(data);
    const selectid = omc23n4.filter((dato) => dato.codigo === data);
    if (dataApi != null) {
      setdataomcn5(
        dataApi.filter((dato) => dato.fk_Omc23N4 === selectid[0].idOmc23N4)
      );
    } else {
      setdataomcn5(
        omc23n5.filter((dato) => dato.fk_Omc23N4 === selectid[0].idOmc23N4)
      );
    }
    setdataomcn6([]);
  };

  const selectOpp5 = (data, dataApi) => {
    setselectcodigo5(data);
    const selectid = omc23n5.filter((dato) => dato.codigo === data);
    if (dataApi != null) {
      setdataomcn6(
        dataApi.filter((dato) => dato.fk_Omc23N5 === selectid[0].idOmc23N5)
      );
    } else {
      setdataomcn6(
        omc23n6.filter((dato) => dato.fk_Omc23N5 === selectid[0].idOmc23N5)
      );
    }
  };

  //LLAMADO A LAS APIS
  const fetchData = async (num) => {
    axios
      .get(`${URLBASE}apiomcproductos/OMC23Nivel1/`, headers)
      .then((response) => {
        setomc23n1(response.data.results);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get(`${URLBASE}apiomcproductos/OMC23Nivel2/`, headers)
      .then((response) => {
        setomc23n2(response.data.results);
        if (num === 2) {
          selectOpp(selectcodigo1, response.data.results);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`${URLBASE}apiomcproductos/OMC23Nivel3/`, headers)
      .then((response) => {
        setomc23n3(response.data.results);
        if (num === 3) {
          selectOpp2(selectcodigo2, response.data.results);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`${URLBASE}apiomcproductos/OMC23Nivel4/`, headers)
      .then((response) => {
        setomc23n4(response.data.results);
        if (num === 4) {
          selectOpp3(selectcodigo3, response.data.results);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`${URLBASE}apiomcproductos/OMC23Nivel5/`, headers)
      .then((response) => {
        setomc23n5(response.data.results);
        if (num === 5) {
          selectOpp4(selectcodigo4, response.data.results);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`${URLBASE}apiomcproductos/OMC23Nivel6/`, headers)
      .then((response) => {
        setomc23n6(response.data.results);
        if (num === 6) {
          selectOpp5(selectcodigo5, response.data.results);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Funcion crear omc23
  const CreateOmc23Url = async (Data, idtabla, codigo) => {
    switch (idtabla) {
      case 1:
        axios
          .post(
            `${URLBASE}apiomcproductos/OMC23Nivel${idtabla}/`,
            {
              codigo: Data.codigo,
              anioReg: Data.anioReg,
              definicionEng: Data.definicionEng,
              definicionSpa: Data.definicionSpa,
              descriEng: Data.descriEng,
              descriSpa: Data.descriSpa,
              ejemploEng: Data.ejemploEng,
              ejemploSpa: Data.ejemploSpa,
            },
            headers
          )
          .then((response) => {
            console.log(response);
            fetchData();
            if (response.request.status === 201) {
              return (
                toast.success("EL registro se ha creado exitosamente"),
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
        const register1 = omc23n1.filter((select) => select.codigo === codigo);
        axios
          .post(
            `${URLBASE}apiomcproductos/OMC23Nivel${idtabla}/`,
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
              fk_Omc23N1: register1[0].idOmc23N1,
            },
            headers
          )
          .then((response) => {
            fetchData(2);
            if (response.request.status === 201) {
              return toast.success("EL registro se ha creado exitosamente");
            }
            setresponse(response.request.status);
          })
          .catch((error) => {
            console.log(error);
          });

        break;
      case 3:
        const register2 = omc23n2.filter((select) => select.codigo === codigo);
        axios
          .post(
            `${URLBASE}apiomcproductos/OMC23Nivel${idtabla}/`,
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
              fk_Omc23N2: register2[0].idOmc23N2,
            },
            headers
          )
          .then((response) => {
            fetchData(3);
            if (response.request.status === 201) {
              return toast.success("EL registro se ha creado exitosamente");
            }
            setresponse(response.request.status);
          })
          .catch((error) => {
            console.log(error);
          });
        break;
      case 4:
        const register3 = omc23n3.filter((select) => select.codigo === codigo);
        axios
          .post(
            `${URLBASE}apiomcproductos/OMC23Nivel${idtabla}/`,
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
              fk_Omc23N3: register3[0].idOmc23N3,
            },
            headers
          )
          .then((response) => {
            fetchData(4);
            if (response.request.status === 201) {
              return toast.success("EL registro se ha creado exitosamente");
            }
            setresponse(response.request.status);
          })
          .catch((error) => {
            console.log(error);
          });
        break;
      case 5:
        const register4 = omc23n4.filter((select) => select.codigo === codigo);
        axios
          .post(
            `${URLBASE}apiomcproductos/OMC23Nivel${idtabla}/`,
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
              fk_Omc23N4: register4[0].idOmc23N4,
            },
            headers
          )
          .then((response) => {
            fetchData(5);
            if (response.request.status === 201) {
              return toast.success("EL registro se ha creado exitosamente");
            }
            setresponse(response.request.status);
          })
          .catch((error) => {
            console.log(error);
          });
        break;
      case 6:
        const register5 = omc23n5.filter((select) => select.codigo === codigo);
        axios
          .post(
            `${URLBASE}apiomcproductos/OMC23Nivel${idtabla}/`,
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
              fk_Omc23N5: register5[0].idOmc23N5,
            },
            headers
          )
          .then((response) => {
            fetchData(6);
            if (response.request.status === 201) {
              return toast.success("EL registro se ha creado exitosamente");
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

  //funcion actualizar registro omc23
  const UpdateOmc23Url = async (idtabla, id, Data, fk) => {
    switch (idtabla) {
      case 1:
        axios
          .put(
            `${URLBASE}apiomcproductos/OMC23Nivel1/${id}/`,
            {
              codigo: Data.codigo,
              anioReg: Data.anioReg,
              definicionEng: Data.definicionEng,
              definicionSpa: Data.definicionSpa,
              descriEng: Data.descriEng,
              descriSpa: Data.descriSpa,
              ejemploEng: Data.ejemploEng,
              ejemploSpa: Data.ejemploSpa,
            },
            headers
          )
          .then((response) => {
            console.log(response);
            fetchData(1);
            if (response.request.status === 200) {
              return toast.success("El registro se ha actualizado");
            }
            setresponse(response.request.status);
          });
        break;
      case 2:
        axios
          .put(
            `${URLBASE}apiomcproductos/OMC23Nivel2/${id}/`,
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
              fk_Omc23N1: fk,
            },
            headers
          )
          .then((response) => {
            if (response.request.status === 200) {
              return (
                toast.success("El registro se ha actualizado"), fetchData(2)
              );
            }
            setresponse(response.request.status);
          });
        break;
      case 3:
        axios
          .put(
            `${URLBASE}apiomcproductos/OMC23Nivel3/${id}/`,
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
              fk_Omc23N2: fk,
            },
            headers
          )
          .then((response) => {
            if (response.request.status === 200) {
              return (
                toast.success("El registro se ha actualizado"), fetchData(3)
              );
            }
            setresponse(response.request.status);
          });
        break;
      case 4:
        axios
          .put(
            `${URLBASE}apiomcproductos/OMC23Nivel4/${id}/`,
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
              fk_Omc23N3: fk,
            },
            headers
          )
          .then((response) => {
            if (response.request.status === 200) {
              return (
                toast.success("El registro se ha actualizado"), fetchData(4)
              );
            }
            setresponse(response.request.status);
          });
        break;
      case 5:
        axios
          .put(
            `${URLBASE}apiomcproductos/OMC23Nivel5/${id}/`,
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
              fk_Omc23N4: fk,
            },
            headers
          )
          .then((response) => {
            if (response.request.status === 200) {
              return (
                toast.success("El registro se ha actualizado"), fetchData(5)
              );
            }

            setresponse(response.request.status);
          });

        break;
      case 6:
        axios
          .put(
            `${URLBASE}apiomcproductos/OMC23Nivel6/${id}/`,
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
              fk_Omc23N5: fk,
            },
            headers
          )
          .then((response) => {
            if (response.request.status === 200) {
              return (
                toast.success("El registro se ha actualizado"), fetchData(6)
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
      UpdateOmc23Url,
      CreateOmc23Url,
      omc23n1,
      omc23n2,
      omc23n3,
      omc23n4,
      omc23n5,
      omc23n6,
      response,
      dataomcn2,
      dataomcn3,
      dataomcn4,
      dataomcn5,
      dataomcn6,
      selectOpp,
      selectOpp2,
      selectOpp3,
      selectOpp4,
      selectOpp5,
      selectcodigo1,
      selectcodigo2,
      selectcodigo3,
      selectcodigo4,
      selectcodigo5,
    };
  }, [
    omc23n1,
    omc23n2,
    omc23n3,
    omc23n4,
    omc23n5,
    omc23n6,
    response,
    dataomcn2,
    dataomcn3,
    dataomcn4,
    dataomcn5,
    dataomcn6,
    selectcodigo1,
    selectcodigo2,
    selectcodigo3,
    selectcodigo4,
    selectcodigo5,
  ]);

  return <Omc23Context.Provider value={value} {...props} />;
}

export function useOmc23() {
  const context = React.useContext(Omc23Context);
  if (!context) {
    throw new "useOmc23 debe estar dentroi del provedor omc23Context"();
  }

  return context;
}
