import React,{Fragment, useState} from 'react'
import { useOmcCon34 } from '../../context/omc34/ContextOmcCon34'
import {GrAdd} from 'react-icons/gr'
import {AiOutlineMinus} from 'react-icons/ai'

function TreeComponent({data = [],valor,ident}) {

    const {Colap,EditRollOrganizacional} = useOmcCon34() 
    
    return (
        data.map(tree=>(
            <TreeNode node={tree} Colap={Colap} valor={valor} ident={ident+28} EditRollOrganizacional={EditRollOrganizacional} />
        ))

    )
}

const TreeNode = ({node,Colap,valor,ident,EditRollOrganizacional})=>{

const [childVisible, setchildVisible] = useState(false);
const hasChild = node.children ? true : false; 
return(
    <Fragment>
    <tr style={{backgroundColor:`rgb(${283-ident},${283-ident},${283-ident})`}}>
    <td  style={{}} onClick={()=>setchildVisible(v=> !v)}>{node.children.length>0 &&(
               <div className={`d-inline d-tree-toggler `} style={{marginLeft:'10px'}}>
                   {childVisible || Colap?(<AiOutlineMinus/>):(<GrAdd/>)}
                </div>
            )}</td>
        <td style={{minWidth:'105px'}} > { valor}{node.codigo}</td>
        <td>{node.descriEng}</td>
        <td>{node.descriSpa}</td>
        <td>{node.definicionEng}</td>
        <td>{node.definicionSpa}</td>
        <td><button className='btn btn-success' onClick={()=>EditRollOrganizacional(node.codigo,valor)}>Editar</button></td>
    </tr>
    { (hasChild && childVisible) || Colap? 
    (<TreeComponent data={node.children} valor={valor+1} ident={ident}/>):null}
    </Fragment>
)}
export default TreeComponent
