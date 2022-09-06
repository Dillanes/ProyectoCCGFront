import React,{useState,useEffect} from 'react'
import { useProveedores } from '../context/Proveedores/ProveedoresContext'
import SubTablaMxP from '../components/Proveedores/SubTablaMxP'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import FormularioAsignarMarca from '../components/Proveedores/FormularioAsignarMarca'

function PageMarcaxProveedor() {
  //Proveedor datos 
  const {DataMarcaxProveedores,DeletMarcaProveedor} = useProveedores()
  const [personName, setPersonName] = useState([]);
  const [showNameM,setshowNameM] = useState()
  const [showA,setshowA] = useState()
  const [showDelet,setshowDelet] = useState()
  const [activeFormMxP,setactiveFormMxP]= useState()
  const [dataMxP, setdataMxP] = useState(DataMarcaxProveedores)
  const [valueSearch,setvalueSearch] = useState()

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          width: 250,
        },
        },
      }
      const renderizarTabla = (DataMarcaxProveedores)=>{
        DataMarcaxProveedores.forEach((reg)=>{
          const renderRow =  document.getElementsByClassName(`${reg.RFC}`)
          if(renderRow.length !== 0){
            return String(renderRow[1].childNodes[0].data)==='+'?'hola1':renderRow[1].click()
          }
          
        })
      }

       
      useEffect(() => {renderizarTabla(DataMarcaxProveedores)},[DataMarcaxProveedores])

    const names = [
      'Nombre Proveedor',
      'RFC',
      'Email',
      'Fabricante',
      'Nombre Marca',
      'Activo',
      'Eliminar'
      ]


          
      const handleChange = (event) => {
        const NombreP = document.getElementsByName('ColumnShowNP')
        const NombreRFC = document.getElementsByName('ColumnShowRFC')
        const NombreF = document.getElementsByName('ColumnShowF')
        const NombreE = document.getElementsByName('ColumnShowE')
        const { target: { value },} = event;
        
        setshowNameM(value.includes('Nombre Marca'))
        setshowA(value.includes('Activo'))
        setshowDelet(value.includes('Eliminar'))
        setPersonName(
          typeof value === 'string' ? value.split(',') : value,
        )
        //ocultar nombre Proveedor
        if(value.includes('Nombre Proveedor')){
             for(let itemNp of NombreP){
                 itemNp.setAttribute('hidden','true')
             }
        }else{
          for(let itemNp of NombreP){
            itemNp.removeAttribute('hidden')
        }
        }

        //Ocultar RFC
        if(value.includes('RFC')){
          for(let itemRFC of NombreRFC){
              itemRFC.setAttribute('hidden','true')
          }
        }else{
          for(let itemRFC of NombreRFC){
          itemRFC.removeAttribute('hidden')
          }
        }

        //Ocultar ColumnShowE
        if(value.includes('Email')){
          for(let itemE of NombreE){
              itemE.setAttribute('hidden','true')
          }
        }else{
          for(let itemE of NombreE){
          itemE.removeAttribute('hidden')
          }
        }

        //Ocultar ColumnShowF
        if(value.includes('Fabricante')){
          for(let itemF of NombreF){
              itemF.setAttribute('hidden','true')
          }
        }else{
          for(let itemF of NombreF){
          itemF.removeAttribute('hidden')
          }
        }  
      } 


  

  const pruebbaa = ()=>{
    let menu = document.getElementById('PruebaDuplicar')
    menu.cloneNode(true);
  }
  


   const SelectRegS = (e)=>{
      const nameSelect = e.currentTarget.getAttribute('id')
      const listNodos = document.getElementsByName(`${nameSelect}`)
      const listNodosProveedor = document.getElementsByClassName(`${nameSelect}`)
      pruebbaa()
      const tamano = listNodos.length+1
      for(let i=1; i<= listNodos.length-1;i++){
        listNodos[i].toggleAttribute('hidden')
      }


      if(listNodos[1].getAttribute('hidden')===null){
          for(let i=0; i<=listNodosProveedor.length-1;i++){
            listNodosProveedor[i].setAttribute('rowSpan',`${tamano}`)
          }
          e.target.removeChild(e.target.childNodes[0])
          e.target.appendChild(document.createTextNode('-'))
      }else{
        for(let i=0; i<=listNodosProveedor.length-1;i++){
          listNodosProveedor[i].setAttribute('rowSpan','2')
        }
        e.target.removeChild(e.target.childNodes[0])
        e.target.appendChild(document.createTextNode('+'))
      }
   }
      
  //  const nextPage = ()=>{

  //  }

  //  const previusPage = ()=>{
    
  // }
   
  const showFormularioMxP = (e)=>{
    setactiveFormMxP(true)
  }


  const filtrarProvedor = (e)=>{
    let asig  = e.target.value.toLowerCase().trim()
    setvalueSearch(e.target.value)
    if(asig){
      setdataMxP(dataMxP.filter(data=>data.nombreProv.toLowerCase().trim().includes(asig) ||
                                      data.RFC.toLowerCase().trim().includes(asig)||
                                      data.email.toLowerCase().trim().includes(asig) ))
    }else{
      setdataMxP(DataMarcaxProveedores)
    }
    
  }

  
 
  

  


  return (
    <div className='container' style={{marginTop:'20px'}}>
    <div className='containerTitle'>
        <p className='textTitle col-sm-12 col-md-9'  >Lista de Marcas Manejadas por Proveedores</p>
        <hr className='hrTitle'/> 
    </div>
   <div style={{ marginBottom:'20px',display:'flex', gap:'20px'}}>
      <div onClick={e=>showFormularioMxP(e)} className='btn btn-info' style={{color:'#fff',width:'15%'}} >Asignar Marca</div>
      <div style={{display:'flex',justifyContent:'flex-end',width:'85%',gap:'10px'}}>
      <div className="form-group col-4" >
         <input type="text" style={{height:'40px', width:'100%'}} value={valueSearch} onChange={(e)=>filtrarProvedor(e)}  className="form-control" id="inputEmail4" placeholder="Buscar por Proveedor..."/>
       </div>
      <FormControl style={{ width: 200}}>
        <InputLabel id="demo-multiple-checkbox-label" style={{lineHeight:'15px'}}>Ocultar Columnas</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          style={{height:'40px'}}
          value={personName} 
          onChange={handleChange}
          input={<OutlinedInput label="Ocultar Columnas" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}>
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={personName.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      </div>
      </div>


  <div className='table-responsive'>
  <table className='table' id='tablaMMP' style={{marginTop:'20px'}}>
            <thead className='table-dark'>
                <tr >
                    <th>id</th>
                    <th>Opcion</th>
                    <th name='ColumnShowNP'>Nombre</th>
                    <th name='ColumnShowRFC'>RFC</th>
                    <th name='ColumnShowE'>Email</th>
                    <th name='ColumnShowF'>Fabricante</th>
                    {showNameM?null:<th>Nombre Marca</th>}
                    {showA?null:<th>Activo</th>}
                    {showDelet?null:<th>Borrar</th>}
                </tr>
            </thead>
            <tbody>

               {dataMxP.map((data,index)=>(
                <><tr key={index}>
                    
                    <td className={data.RFC} rowSpan={2}> {index+1} </td>
                    <td className={data.RFC} rowSpan={2} id={data.RFC} value={data.RFC}  onClick={(e)=>SelectRegS(e)} style={{fontSize:'28px', lineHeight:'20px',cursor:'pointer'}}>+</td>
                    <td rowSpan={2} name='ColumnShowNP' className={data.RFC} >{data.nombreProv}</td>
                    <td rowSpan={2} name='ColumnShowRFC' className={data.RFC} >{data.RFC}</td>
                    <td rowSpan={2} name='ColumnShowE' className={data.RFC} >{data.email}</td>
                    <td rowSpan={2} name='ColumnShowF' className={data.RFC} >{data.fabricante?'Activo':'Desactivo'}</td>
                </tr>

                   <SubTablaMxP data={data} DeletMarcaProveedor={DeletMarcaProveedor} showDelet={showDelet} showA={showA} showNameM={showNameM}/>
                </>
               ))}

            </tbody>       
        </table>
        <div className="footerTable" id='PruebaDuplicar'>
        <button
          type="button"
          className="btn btn-dark m-1"
          onClick={() => alert('back')}
        >
          Previous
        </button>
        <button
          type="button"
          className="btn btn-dark"
          onClick={() => alert('next')}
        >
          Next
        </button>
        <br />
        <span>
          <strong>
            Página 1 de 1
          </strong>{" "}
        </span>
      </div>
            

  </div>
  <FormularioAsignarMarca activeFormMxP={activeFormMxP} setactiveFormMxP={setactiveFormMxP}/>
  </div>
  )
}

export default PageMarcaxProveedor
