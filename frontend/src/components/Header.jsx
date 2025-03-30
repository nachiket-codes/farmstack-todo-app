import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Header = ({toggleShow}) => {
  return (
    <div className="flex items-center justify-between p-6 text-white text-4xl shadow-[0px_10px_10px_-5px_rgba(255,255,255,0.5)]">
        <div></div>
        <h1 className="font-bold text-center">John's Todo List</h1>
        <FontAwesomeIcon icon={faBars} className='cursor-pointer hover:scale-125 transition duration-300 ease-out' onClick={toggleShow}/>
    </div>
  )
}

export default Header