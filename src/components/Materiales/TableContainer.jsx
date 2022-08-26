import React from "react";
import { TableContext } from "../../context/Materiales/TableContext";
import { ButtonClass } from "./ButtonClass";
import { TableApi } from "./TableApi";
import { TableApi41 } from "./TableApi41";

function TableContainer() {
  const { tableBool } = React.useContext(TableContext);

  return (
    <div className="container mt-5 pt-3" id="omniclass">
      <br />
      <ButtonClass />
      {tableBool ? <TableApi41 /> : <TableApi />}
    </div>
  );
}

export { TableContainer };
