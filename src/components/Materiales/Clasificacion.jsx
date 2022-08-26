import { Box, Tab, Tabs } from "@mui/material";
import React from "react";
import { TableContext } from "../../context/Materiales/TableContext";

function Clasificacion() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setEstructura(false);
  };

  const { estructura, setEstructura } = React.useContext(TableContext);

  return (
    <Box sx={{ bgcolor: "", color: "" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        <Tab className="fw-bold" label="Acondicionamiento del terreno" />
        <Tab className="fw-bold" label="Cimientos" />
        <Tab
          className="fw-bold"
          label="Estructuras"
          onClick={() => setEstructura(!estructura)}
        />
        <Tab className="fw-bold" label="Fachadas y muros divisorios" />
        <Tab className="fw-bold" label="Remates y ayudas" />
        <Tab className="fw-bold" label="Firmes y pavimentos urbanos" />
        <Tab className="fw-bold" label="Instalaciones" />
        <Tab className="fw-bold" label="Equipamiento urbano" />
      </Tabs>
    </Box>
  );
}

export { Clasificacion };
