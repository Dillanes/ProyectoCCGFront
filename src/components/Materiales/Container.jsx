import React from "react";
import { TableContext } from "../../context/Materiales/TableContext";
import { ListaDeMateriales } from "./ListaDeMateriales";
import { TableContainer } from "./TableContainer";
import { Loading } from "./Loading";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function Container() {
  const { nivel5 } = React.useContext(TableContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={nivel5 ? <Loading /> : <TableContainer />} />
        <Route path="/listaDeMateriales" element={<ListaDeMateriales />} />
      </Routes>
    </BrowserRouter>
  );
}

export { Container };
