import React from "react";
import { TableContext } from "../../context/Materiales/TableContext";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

function ButtonClass() {
  const { omniclass41, omniclass23, omniClass } =
    React.useContext(TableContext);
  return (
    //   <button
    //     onClick={omniclass23}
    //     disabled={omniClass === 41}
    //     className="btn btn-primary btn-lg"
    //   >
    //     Omnniclass 23
    //   </button>
    //   <button
    //     onClick={omniclass41}
    //     disabled={omniClass === 23}
    //     className="btn btn-primary btn-lg"
    //   >
    //     Omnniclass 41
    //   </button>
    // <Stack direction="row" spacing={2}>
    //   <Button
    //     color="primary"
    //     variant="outlined"
    //     onClick={omniclass23}
    //     disabled={omniClass === 41}
    //     className=""
    //   >
    //     Omnniclass 23
    //   </Button>
    //   <Button
    //     color="primary"
    //     variant="outlined"
    //     onClick={omniclass41}
    //     disabled={omniClass === 23}
    //     className="m-auto"
    //   >
    //     Omnniclass 41
    //   </Button>
    // </Stack>
    <Stack direction="row" justifyContent={"center"} spacing={2}>
      <Button
        color="primary"
        variant="outlined"
        onClick={omniclass23}
        size="large"
        disabled={omniClass === 41}
      >
        Omnniclass 23
      </Button>
      <Button
        color="primary"
        variant="outlined"
        onClick={omniclass41}
        size="large"
        disabled={omniClass === 23}
      >
        Omnniclass 41
      </Button>
    </Stack>
  );
}

export { ButtonClass };
