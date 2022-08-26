import axios from "axios";
import React, { useEffect } from "react";
import { useLogin } from "../../context/LoginContext";

function TestDeOmc34() {
  // Se añade la data de inicio de sesion
  const { dataToken } = useLogin();

  //   config de axios
  const api = axios.create({
    baseURL: "http://127.0.0.1:8000/",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: `Token ${dataToken.token}`,
    },
  });

  const [nivel, setNivel] = React.useState();
  const [nivel1, setNivel1] = React.useState([]);
  const [nivel2, setNivel2] = React.useState([]);
  const [nivel2View, setNivel2View] = React.useState([]);
  const [nivel3, setNivel3] = React.useState([]);
  const [nivel3View, setNivel3View] = React.useState([]);
  const [nivel4, setNivel4] = React.useState([]);
  const [nivel4View, setNivel4View] = React.useState([]);
  const [nivel5, setNivel5] = React.useState([]);
  const [nivel5View, setNivel5View] = React.useState([]);
  const [nivel6, setNivel6] = React.useState([]);
  const [nivel6View, setNivel6View] = React.useState([]);
  const [id1, setId1] = React.useState([]);

  useEffect(() => {
    getOmc34();
  }, []);

  const getOmc34 = async () => {
    const { data: level1 } = await api("apiOMC34/OMC34Nivel1/");
    await setNivel1(level1.results);
    const { data: level2 } = await api("apiOMC34/OMC34Nivel2/");
    await setNivel2(level2.results);
    const { data: level3 } = await api("apiOMC34/OMC34Nivel3/");
    await setNivel3(level3.results);
    const { data: level4 } = await api("apiOMC34/OMC34Nivel4/");
    await setNivel4(level4.results);
    niveles();
  };

  const listaDeNivel2 = (id) => {
    const datooo = nivel2.filter((data) => data.fk_Omc34N1 === id);
    return datooo;
  };

  const listarNivel3 = (id) => {
    const datooo = nivel3.filter((data) => data.fk_Omc34N2 === id);
    return datooo;
  };

  const listaDeNivel3 = (id) => {
    var datoooo = [];
    listaDeNivel2(id).forEach((element1) => {
      const data = listarNivel3(element1.idOmc34N2);
      datoooo.push(data);
    });
    return datoooo;
  };

  const niveles = () => {
    var x = [];
    nivel1.forEach((element, index) => {
      var dato = listaDeNivel3(element.idOmc34N1);
      var datos = {
        level1: element,
        level2: listaDeNivel2(element.idOmc34N1),
        level3: dato,
      };
      //   console.table(datos);
      //   console.table(
      //     listaDeNivel2(element.idOmc34N1).forEach((element1) => {
      //       console.log(element1);
      //     })
      //   );

      x.push(datos);
    });

    setNivel(x);
    console.table(nivel);
  };

  return (
    <div className="pt-5 mt-5">
      <table className="table">
        <thead>
          <tr>
            <th>id</th>
            <th>codigo</th>
            <th>descripcion</th>
          </tr>
        </thead>
        <tbody>
          {nivel1.map((level1, index) => (
            <tr key={index} onClick={() => setId1(level1.idOmc34N1)}>
              <td>{level1.idOmc34N1}</td>
              <td>{level1.Codigo}</td>
              <td>{level1.descriSpa}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {nivel ? (
        <div>
          {nivel.map((level1, index) => (
            <ul key={index}>
              <li>{level1.level1.Codigo}</li>
              <ul>
                <li>{level1.level2[0].Codigo}</li>
              </ul>
            </ul>
          ))}
        </div>
      ) : (
        "puto"
      )}
    </div>
  );
}

export { TestDeOmc34 };
