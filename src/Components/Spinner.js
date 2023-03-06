import React from 'react'
import spinner from '../imgs/loading.gif'

function Spinner() {
  return (
    <>
    <div className="spinner">
        <img style={{width:"80px", marginTop:"50px"}} src={spinner}/>
    </div>
    </>
  )
}

export default Spinner