import axios from "axios";
import React, { useEffect, useState, useMemo, useRef } from "react";
import Link from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { GiConsoleController } from "react-icons/gi";

const LoginContext = React.createContext();

export function LoginProvider(props) {
  const URLBASE = 'http://127.0.0.1:8000/'
  // const URLBASE = "https://msdocs-python-sqlserver-api-215.azurewebsites.net/";

  const [dataToken, setDataToken] = useState();
  const [authentication, setauthentication] = useState(false);

  const Logout = () => {
    var axios = require("axios");
    var data = JSON.stringify({
      token: dataToken.token,
    });

    var config = {
      method: "post",
      url: `${URLBASE}logout/`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    window.localStorage.removeItem("ccgData");
    axios(config)
      .then(function (response) {
        setDataToken(response.data);
        setauthentication(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const Login = async (Data) => {
    var axios = require("axios");
    var config = {
      method: "post",
      url: `${URLBASE}login/`,
      headers: {
        "Content-Type": "application/json",
      },
      data: Data,
    };

    axios(config)
      .then(function (response) {
        setDataToken(response.data);
        setauthentication(true);
        window.localStorage.setItem("ccgData", JSON.stringify(response.data));
        return toast.success("Te haz logueado exitosamente");
      })
      .catch(function (error) {
        console.log(error);
        return toast.error('Credenciales Incorrectas')
      });
  };
  // let data = JSON.stringify({
  //     username: Data.username,
  //     password: Data.password
  //   });
  // axios.post(`http://localhost:8000/Login/`,data,{headers:{"Content-Type" : "application/json"}})
  //   .then((response) => {
  //     console.log(response)
  //   })

  const value = useMemo(() => {
    return {
      Login,
      dataToken,
      Logout,
      authentication,
      setDataToken,
      setauthentication,
    };
  }, [dataToken, authentication]);

  return <LoginContext.Provider value={value} {...props} />;
}

export function useLogin() {
  const context = React.useContext(LoginContext);
  if (!context) {
    throw new "useLogin debe estar dentro del provedor loginContext"();
  }

  return context;
}
