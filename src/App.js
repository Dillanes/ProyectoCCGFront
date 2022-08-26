import React, { useEffect, useState } from "react";
import Login from "./pages/Login";
//redux
import { Omc23Provider } from "./context/omc23/ContextOmc23";
import { Provider } from "react-redux";
import store from './redux'
import './styles/omc23/styles.css'
import './styles/modalsStyle.css'
import './styles/buttons.css'
import './styles/styles.css'
import { Rutas } from "./Routes/Rutas";
import { TableProvider } from "./context/Materiales/TableContext";
import { Container } from "./components/Materiales/Container";
import { LoginProvider } from "./context/LoginContext";
import { useLogin } from "./context/LoginContext";
import { Omc41Provider } from "./context/omc41/ContextOmc41";
import { Omc34Provider } from "./context/omc34/ContextOmc34";
import { Omc34ConProvider } from "./context/omc34/ContextOmcCon34";
import { ProveedoresProvider } from "./context/Proveedores/ProveedoresContext";



function App() {

  const { dataToken, authentication, setDataToken, setauthentication } = useLogin()


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('ccgData')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setDataToken(user)
      setauthentication(true)
    }

  }, [])

  if (authentication === false) {
    return (

      <Login />

    )
  }

  if (authentication === true) {
    return (
      <div className="" >

        <Provider store={store}>
          <Omc23Provider>
            <TableProvider>
              <Omc34ConProvider>
                <Omc34Provider>
                  <Omc41Provider>
                    <ProveedoresProvider>
                      <Rutas />
                    </ProveedoresProvider>
                  </Omc41Provider>
                </Omc34Provider>
              </Omc34ConProvider>
            </TableProvider>
          </Omc23Provider>
        </Provider>
      </div>
    )
  }

}

export default App;
