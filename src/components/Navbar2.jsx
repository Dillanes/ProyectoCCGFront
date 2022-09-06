import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { GiMaterialsScience } from "react-icons/gi";
import { RiUserSettingsFill } from "react-icons/ri";
import { VscOrganization } from "react-icons/vsc";
import { BiCuboid } from "react-icons/bi";
import { TbBuildingStore } from "react-icons/tb";
import { BsTools } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { AiFillDownCircle } from "react-icons/ai";
import { SiSuperuser } from "react-icons/si";
import { useLogin } from "../context/LoginContext";
import { TableContext } from "../context/Materiales/TableContext";



export default function Navbar() {
  const [estadoUser, setestadoUser] = useState("bx bx-menu");
 const {Logout} = useLogin()
  const menuEmpezar = (e) => {
    const toggle = document.getElementById("header-toggle"),
      nav = document.getElementById("nav-bar"),
      bodypd = document.getElementById("body-pd"),
      headerpd = document.getElementById("header"),
      iconClose = document.getElementById("iconClose"),
      subListM = document.getElementById("subMaterials"),
      subListP = document.getElementById("subProviders");

    subListM.setAttribute("hidden", "none");
    subListP.setAttribute("hidden", "none");
    // // show navbar
    nav.classList.toggle("show");
    // change icon
    toggle.classList.toggle("bx-x");
    //recorrer icon close
    iconClose.classList.toggle("dez");
    // add padding to body
    bodypd.classList.toggle("body-pd");
    // add padding to header
    headerpd.classList.toggle("body-pd");
    setestadoUser(e.target.className);
    /*===== LINK ACTIVE =====*/
    const linkColor = document.querySelectorAll(".nav_link");

    function colorLink() {
      if (linkColor) {
        linkColor.forEach((l) => l.classList.remove("active"));
        this.classList.add("active");
      }
    }
    linkColor.forEach((l) => l.addEventListener("click", colorLink));

    // Your code to run since DOM is loaded and ready
  };

  const showListMaterials = () => {
    const subList = document.getElementById("subMaterials");
    subList.toggleAttribute("hidden");
  };

  const showListProviders = () => {
    const subList = document.getElementById("subProviders");
    subList.toggleAttribute("hidden");
  };
  const { fetchMateriales } = React.useContext(TableContext);

  return (
    <div id="body-pd">
      <header className="header" id="header">
        <div className="header_toggle" id="iconClose">
          <i
            className="bx bx-menu"
            onClick={(e) => menuEmpezar(e)}
            id="header-toggle"
          ></i>
        </div>

        <img
          className="imgLogo"
          src="https://consulting.construction/wp-content/uploads/elementor/thumbs/Consulting-Construction_Soluciones-integrales-para-la-industria-AEC_logoW-po2z60znnm1ypcpd6tsb9443x322o3bd1tlfnfbtb0.png"
          alt=""
        />
      </header>
      <div className="l-navbar" id="nav-bar">
        <nav className="nav">
        <div>
            {estadoUser === "bx bx-menu" ? (
              <NavLink to="/#" className="nav_logo">
                <SiSuperuser className="bx bx-layer nav_logo-icon" />
                <span className="nav_logo-name">PERFIL</span>
              </NavLink>
            ) : (
              <div className="nav_logo containerAvatarImg" id="avatarLogin">
                <img
                  className="avatarImg"
                  alt=""
                  src="https://thumbs.dreamstime.com/b/icono-de-hombre-negocios-imagen-avatar-macho-vector-perfil-con-gafas-y-peinado-barba-179728610.jpg"
                ></img>
              </div>
            )}

            <NavLink to="/#" className="nav_logo">
              <FaUserAlt className="bx bx-layer nav_logo-icon" />
              <span className="nav_logo-name">PERFIL</span>
            </NavLink>
            <div className="nav_list">
              <NavLink
                to="/listaDeMateriales"
                onClick={fetchMateriales}
                className="nav_link"
              >
                <i className="bx bx-grid-alt nav_icon"></i>
                <span className="nav_name">ELEMENTOS DE CONSTRUCCION</span>
              </NavLink>
              <NavLink to="/omniclass41" className="nav_link">
                <GiMaterialsScience className="bx bx-user nav_icon" />
                <span className="nav_name">MATERIALES</span>
              </NavLink>
              <NavLink to="/tablaReact" className="nav_link">
                <BiCuboid className="bx bx-bookmark nav_icon" />
                <span className="nav_name">PRODUCTOS</span>
              </NavLink>
              <NavLink to="/omniclass" className="nav_link">
                <i className="bx bx-message-square-detail nav_icon"></i>
                <span className="nav_name">ACTIVIDADES</span>
              </NavLink>
              <NavLink to="/RolesOrg" className="nav_link">
                <VscOrganization className="bx bx-folder nav_icon" />
                <span className="nav_name">ROLES ORGANIZACIONALES</span>
              </NavLink>
              <NavLink to="/RolesOrg" className="nav_link">
                <BsTools className="bx bx-bar-chart-alt-2 nav_icon" />
                <span className="nav_name">HERRAMIENTA Y EQUIPO</span>
              </NavLink>
              <div className="nav_link" onClick={() => showListMaterials()}>
                <RiUserSettingsFill className="bx bx-bar-chart-alt-2 nav_icon" />
                <span className="nav_name buttonSubList">
                  COMPLEMENTAR NORMA{" "}
                  <i
                    className="fa-solid fa-angle-right"
                    style={{ color: "#fff" }}
                  />
                  <i
                    className="fa-solid fa-angle-right"
                    style={{ color: "#fff" }}
                  />
                </span>
              </div>
              {/* Lista desplegable */}
              <div id="subMaterials" className="subListMenu" hidden>
                <NavLink to="/#" className="nav_link">
                  <AiFillDownCircle className="bx bx-bar-chart-alt-2 nav_icon" />
                  <span className="nav_name">Registro</span>
                </NavLink>
                <NavLink to="/#" className="nav_link">
                  <AiFillDownCircle className="bx bx-bar-chart-alt-2 nav_icon" />
                  <span className="nav_name">Consulta</span>
                </NavLink>
              </div>

              <div className="nav_link" onClick={() => showListProviders()}>
                <TbBuildingStore className="bx bx-bar-chart-alt-2 nav_icon" />
                <span className="nav_name  buttonSubList">
                  PROVEEDORES{" "}
                  <i
                    className="fa-solid fa-angle-right"
                    style={{ color: "#fff" }}
                  />
                  <i
                    className="fa-solid fa-angle-right"
                    style={{ color: "#fff" }}
                  />
                </span>
              </div>
              <div id="subProviders" className="subListMenu" hidden>
                <NavLink to="/IndiceProveedores" className="nav_link">
                  <AiFillDownCircle className="bx bx-bar-chart-alt-2 nav_icon" />
                  <span className="nav_name">Indice de Proveedores</span>
                </NavLink>
                <NavLink to="/#" className="nav_link">
                  <AiFillDownCircle className="bx bx-bar-chart-alt-2 nav_icon" />
                  <span className="nav_name">Materiales según proveedor</span>
                </NavLink>
                <NavLink to="/marcas" className="nav_link">
                  <AiFillDownCircle className="bx bx-bar-chart-alt-2 nav_icon" />
                  <span className="nav_name">Marca</span>
                </NavLink>
                <NavLink to="/SectoresDeMercado" className="nav_link">
                  <AiFillDownCircle className="bx bx-bar-chart-alt-2 nav_icon" />
                  <span className="nav_name">Sectores de Mercado</span>
                </NavLink>
                <NavLink to="/Sucursales" className="nav_link">
                  <AiFillDownCircle className="bx bx-bar-chart-alt-2 nav_icon" />
                  <span className="nav_name">Sucursales</span>
                </NavLink>
              </div>
            </div>
            <div onClick={() => Logout()} className="nav_link">
              <i className="bx bx-log-out nav_icon"></i>
              <span className="nav_name">Salir</span>
            </div>
          </div>
        </nav>
      </div>

      {/* <nav className="navbar navbar-expand-lg navbar-black bg-black">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo03"
            aria-controls="navbarTogglerDemo03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <a className="navbar-brand" href="/#">
            <img
              width={"100px"}
              src="https://consulting.construction/wp-content/uploads/elementor/thumbs/Consulting-Construction_Soluciones-integrales-para-la-industria-AEC_logoW-po2z60znnm1ypcpd6tsb9443x322o3bd1tlfnfbtb0.png"
              alt=""
            />
          </a>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/#">
                  Home
                </a>
              </li>
            </ul>
            <p className="text-white h5 pe-2">Modo Nocturno</p>
            <form className="d-flex form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
              />
            </form>
          </div>
        </div>
      </nav> */}
    </div>
  );
}
