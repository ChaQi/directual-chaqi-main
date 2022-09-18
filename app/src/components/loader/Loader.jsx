import React from 'react'
import {ReactComponent as StarIcon} from "../../sources/icons/stars.svg"
import "./Loader.css"
const Loader = () => {
  return (
    <div className='container main_loader_container'>
        <div className='loader_wrapper'>
            <div className='star_wrapper'>
                <StarIcon />
            </div>
            <h1 className='loader_logo_text headerTwo-font'>Cha Qi</h1>
        </div>
    </div>
  )
}

export default Loader