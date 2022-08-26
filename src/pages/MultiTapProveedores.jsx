import { Box, Tab, Tabs } from "@mui/material";
import React from "react";
import { Toaster } from "react-hot-toast";
//Pages
import PageIndiceProveedores from "./PageIndiceProveedores";
import PageMarcaxProveedor from "./PageMarcaxProveedor";
function MultiTapProveedores() {

    const [value, setValue] = React.useState(1);
    const handleChange = (event, newValue) => {
        setValue(newValue);
        console.log(newValue)

    };



  return (
    <>
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{}}
      toastOptions={{}}
/>
    <Box sx={{ bgcolor: "", color: "", marginTop:'60px' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        <Tab className="fw-bold" value={1} label="Roles Organizacionales" style={{textTransform:'capitalize'}} />
        <Tab className="fw-bold" value={2} label= "Registro de Nuevos Roles Organizacionales" style={{textTransform:'capitalize'}}/>
        <Tab className="fw-bold" value={3} label="Consulta Roles Organizacionales" style={{textTransform:'capitalize'}}/>

      </Tabs>
    </Box>
    {value===1?(<PageIndiceProveedores/>):(null)}
    {value===2?(<PageMarcaxProveedor/>):(null)}
    {value===3?(<PageIndiceProveedores/>):(null)}

    </>
  );
}

export default MultiTapProveedores