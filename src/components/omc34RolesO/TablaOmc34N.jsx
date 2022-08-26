import React from 'react'

function TablaOmc34N(props) {
    
    function cleanTr() {
        document.querySelectorAll(".row-selected").forEach(function (index) {
          index.classList.remove("row-selected");
        });
      }
    
      const selectRow = (e) => {
        const selectRowTag = e.currentTarget;
        if (selectRowTag.classList.contains("row-selected")) {
        } else {
          cleanTr();
          selectRowTag.classList.add("row-selected");
        }
      };
  return (
    <div className="containerTable">
      <div className="headerTable">
        <div className="col-md-7 col-sm-5">
          <h2 className="mt-3 textTable">Nivel {props.nivel}</h2>
        </div>
        <div className="col-md-5 col-sm-7">
        <div className=''><input className="form-control mt-3" placeholder='Buscar...' type="search" aria-label="Search"  /></div>
        </div>
      </div>
       
      <div className="table-responsive shadow-lg">
        <table className="table table-hover mt-1">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Código</th>
                    <th>Descripción en Inglés</th>
                    <th>Descripción en Español</th>
                    <th>Definición en Inglés</th>
                    <th>Definición en Español</th>
                    <th>Acción</th>
                </tr>
            </thead>
            <tbody>

                {props.datamap.length>0?(
                   props.datamap.map((data,index)=>(
                        <tr key={index} onClick={(e) => selectRow(e)} style={{ fontSize: "12px", fontFamily: "arial" }}>
                            <td>{index+1}</td>
                            <td style={{width:'100px'}}>{data.codigo}</td>
                            <td>{data.descriEng}</td>
                            <td>{data.descriSpa}</td>
                            <td>{data.definicionEng}</td>
                            <td>{data.definicionSpa}</td>
                            <td>{data.regFinal===true?(
                                    <button
                                    type="button"
                                    className="btn btn-info"
                                    style={{ marginTop: "20%" }}
                                    onClick={() => props.registrarRolOrg(data)}
                                    >
                                    {" "}
                                    seleccionar
                                    </button>
                            ):(
                                <button
                                  type="button"
                                  className="btn btn-dark"
                                  style={{ marginTop: "20%" }}
                                  onClick={() => props.nextNivel(data,props.nivel)}
                                  >
                                  {" "}
                                  Nivel{props.nivel+1}
                                  </button>
                            )}</td>
                        </tr>
                   ) ) 
                ):(null)}
            </tbody>

        </table>
      </div>
      </div>
  )
}

export default TablaOmc34N
