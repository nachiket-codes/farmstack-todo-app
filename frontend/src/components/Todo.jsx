import { faCircleNotch, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {useState} from 'react'

const Todo = ({todoTxt, completed}) => {
    const [editMode, setEditMode] = useState(false);
  return (
    <li className="p-6 shadow-[0px_0px_15px_5px_rgba(255,255,255,0.6)] hover:shadow-[0px_0px_20px_5px_rgba(255,215,0,0.8)] text-white text-2xl font-semibold flex items-center justify-between gap-4 transistion duration-300 ease-in-out">
        <div className="flex gap-4 items-center cursor-pointer ">
            <FontAwesomeIcon className="hover:text-green-500" icon={faCircleNotch}/>
            <p>{todoTxt}</p>
        </div>
        <div className="flex gap-4 items-center">
            <FontAwesomeIcon icon={faTrash} className='cursor-pointer hover:text-red-600 transition duration-300 bounce-in'/>
            <FontAwesomeIcon icon={faPenToSquare}  className='cursor-pointer hover:text-green-500 transition duration-300 bounce-in'/>
        </div>
    </li>
  )
}

export default Todo