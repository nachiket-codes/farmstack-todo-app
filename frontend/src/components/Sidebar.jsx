import { faRightFromBracket, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Sidebar = ({show, toggleShow}) => {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.setItem('token', '');
        navigate('/login');
    }
  return (
    <div className={`h-screen w-[400px] bg-white fixed text-4xl top-0 right-0 transition-translate duration-300 ease-linear ${ show ? '' : 'translate-x-[100%]'}`}>
        <div className="flex items-center justify-end">
            <FontAwesomeIcon className="hover:text-red-500 cursor-pointer p-6" icon={faXmark} onClick={toggleShow}/>
        </div>
        <ul>
            <li onClick={logout} className="flex items-center justify-center hover:bg-violet-900 hover:text-white cursor-pointer p-4">Logout <FontAwesomeIcon className='ml-4' icon={faRightFromBracket} /></li>
        </ul>
    </div>
  )
}

export default Sidebar