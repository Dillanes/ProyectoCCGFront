import React from 'react'

function GlobalFilter({filter,setFilter}) {

  return (

        <div className=''><input className="form-control mt-3" placeholder='Buscar...' type="search" aria-label="Search" value={filter||''} onChange={e=>setFilter(e.target.value)} /></div>

  )
}

export default GlobalFilter
