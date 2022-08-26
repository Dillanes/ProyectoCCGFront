//LIBRERIA AXIOS(LLAMADO DE LAS APIS) createSlice(FUNCION DE REDUX/TOOLKIT)
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//INICIALIZAMOS LA FUNCION CREATESLICE,
//NOMBRAMOS EL SLICE, AGREGAMOS VALORES INICIALES, CREAMOS LOS REDUCERS DONDE ASIGM¿NAMOS VALOR A  LOS STATE
const userSlice = createSlice({
  name: "users",
  initialState: {
    omcn1: [],
    omcn2: [],
    omcn3: [],
    omcn4: [],
    omcn5: [],
    omcn6: [],
  },
  reducers: {
    setUserList: (state, action) => {
      state.omcn1 = action.payload;
    },
    setOMCN2List: (state, action) => {
      state.omcn2 = action.payload;
    },
    setOMCN3List: (state, action) => {
      state.omcn3 = action.payload;
    },
    setOMCN4List: (state, action) => {
      state.omcn4 = action.payload;
    },
    setOMCN5List: (state, action) => {
      state.omcn5 = action.payload;
    },
    setOMCN6List: (state, action) => {
      state.omcn6 = action.payload;
    },
  },
});

//eXPORTAMOS LOS REDUCERS PARA ASIGNARLE VALOR A LOS initialState USANDO disPatch
export const {
  setUserList,
  setOMCN2List,
  setOMCN3List,
  setOMCN4List,
  setOMCN5List,
  setOMCN6List,
} = userSlice.actions;

//FUNCIONES QUE HACE LA LLAMADA A LA API, ASIGNAN EL VALOR A LOS REDUCERS

// const URL = "http://127.0.0.1:8000/"
const URL = "https://msdocs-python-sqlserver-api-215.azurewebsites.net/";

export const fetchAllUsers = () => (dispatch) => {
  try {
    axios.get(`${URL}apiOMC23/ListarOMC23Nivel1/`).then((response) => {
      dispatch(setUserList(response.data.results));
    });
  } catch (errors) {
    return console.log(errors);
  }
};

export const fetchAllOMCN2 = () => (dispatch) => {
  try {
    axios.get(`${URL}apiOMC23/ListarOMC23Nivel2/`).then((response) => {
      dispatch(setOMCN2List(response.data.results));
    });
  } catch (errors) {
    return console.log(errors);
  }
};

export const fetchAllOMCN3 = () => (dispatch) => {
  try {
    axios.get(`${URL}apiOMC23/ListarOMC23Nivel3/`).then((response) => {
      dispatch(setOMCN3List(response.data.results));
    });
  } catch (errors) {
    return console.log(errors);
  }
};

export const fetchAllOMCN4 = () => (dispatch) => {
  try {
    axios.get(`${URL}apiOMC23/ListarOMC23Nivel4/`).then((response) => {
      dispatch(setOMCN4List(response.data.results));
    });
  } catch (errors) {
    return console.log(errors);
  }
};

export const fetchAllOMCN5 = () => (dispatch) => {
  try {
    axios.get(`${URL}apiOMC23/ListarOMC23Nivel5/`).then((response) => {
      dispatch(setOMCN5List(response.data.results));
    });
  } catch (errors) {
    return console.log(errors);
  }
};

export const fetchAllOMCN6 = () => (dispatch) => {
  try {
    axios.get(`${URL}apiOMC23/ListarOMC23Nivel6/`).then((response) => {
      dispatch(setOMCN6List(response.data.results));
    });
  } catch (errors) {
    return console.log(errors);
  }
};

export default userSlice.reducer;

// export const omc2Slice = createSlice({
//     name:'omcn2',
//     initialState:{
//         listomc2:[]
//     },
//     reducers:{
//         setOMCN2List: (state,action)=>{
//             state.listomc2 = action.payload;
//        }
//     }
// });
