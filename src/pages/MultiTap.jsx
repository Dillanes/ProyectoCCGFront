import { Box, Tab, Tabs } from "@mui/material";
import React from "react";
//Pages
import RolesOrg from "./RolesOrg";
import PageConsultaOrg from "./PageConsultaOrg";
import PageOmc34 from "./PageOmc34";



function MultiTap() {

    const [value, setValue] = React.useState(1);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        console.log(newValue)

    };



  return (
    <>
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
    {value===1?(<PageOmc34/>):(null)}
    {value===2?(<RolesOrg/>):(null)}
    {value===3?(<PageConsultaOrg/>):(null)}
    </>
  );
}

export default MultiTap



