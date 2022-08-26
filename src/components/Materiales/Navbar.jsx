import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  const menuEmpezar = () => {
    const toggle = document.getElementById("header-toggle"),
      nav = document.getElementById("nav-bar"),
      bodypd = document.getElementById("body-pd"),
      headerpd = document.getElementById("header");

    // // show navbar
    nav.classList.toggle("show-navbar");
    // change icon
    toggle.classList.toggle("bx-x");
    // add padding to body
    bodypd.classList.toggle("body-pd");
    // add padding to header
    headerpd.classList.toggle("body-pd");

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

  return (
    <div id="body-pd">
      <header className="header" id="header">
        <div className="header_toggle">
          <i
            className="bx bx-menu"
            onClick={() => menuEmpezar()}
            id="header-toggle"
          ></i>
        </div>
        <div className="header_img">
          <img src="https://i.imgur.com/hczKIze.jpg" alt="" />
        </div>
      </header>
      <div className="l-navbar" id="nav-bar">
        <nav className="nav">
          <div>
            <NavLink to="/#" className="nav_logo">
              <i className="bx bx-layer nav_logo-icon"></i>
              <span className="nav_logo-name">Home</span>
            </NavLink>
            <div className="nav_list">
              <NavLink to="/#" className="nav_link">
                <i className="bx bx-grid-alt nav_icon"></i>
                <span className="nav_name">Dashboard</span>
              </NavLink>
              <NavLink to="/#" className="nav_link">
                <i className="bx bx-user nav_icon"></i>
                <span className="nav_name">Users</span>
              </NavLink>
              <NavLink to="/listaDeMateriales" className="nav_link">
                <i className="bx bx-message-square-detail nav_icon"></i>
                <span className="nav_name">Materiales</span>
              </NavLink>
              <NavLink to="/#" className="nav_link">
                <i className="bx bx-bookmark nav_icon"></i>
                <span className="nav_name">Bookmark</span>
              </NavLink>
              <NavLink to="/#" className="nav_link">
                <i className="bx bx-folder nav_icon"></i>
                <span className="nav_name">Files</span>
              </NavLink>
              <NavLink to="/#" className="nav_link">
                <i className="bx bx-bar-chart-alt-2 nav_icon"></i>
                <span className="nav_name">Stats</span>
              </NavLink>
            </div>
          </div>
          <NavLink to="/#" className="nav_link">
            <i className="bx bx-log-out nav_icon"></i>
            <span className="nav_name">SignOut</span>
          </NavLink>
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

export { Navbar };
