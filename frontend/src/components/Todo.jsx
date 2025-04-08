import { faCheck, faCircleCheck, faCircleNotch, faPenToSquare, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { deleteTodo, editTodo, fetchTodos } from '../features/TodoSlice';

const Todo = ({todo}) => {
    const [editMode, setEditMode] = useState(false);
    const [editVal, setEditVal] = useState(todo.todo_text)
    const [completed, setCompleted] = useState(todo.completed)
    const dispatch = useDispatch();

    const handleDelete = async () => {
        await dispatch(deleteTodo(todo.todo_id))
        dispatch(fetchTodos());
    }

    const handleEditTodo = async (e) => {
        e.preventDefault();
        const newTodo = {
            todo_id: todo.todo_id,
            todo_text: editVal,
            completed: completed
        }
        await dispatch(editTodo(newTodo))
        dispatch(fetchTodos());
        setEditMode(false)
    }

    const toggleComplete = async () => {
            const newTodo = {
                todo_id: todo.todo_id,
                todo_text: editVal,
                completed: !completed
            };
            setCompleted(!completed); // for UI response
            await dispatch(editTodo(newTodo));
            dispatch(fetchTodos());
        }
    

   
    
  return (
    editMode ?
    <li className={`p-6 shadow-[0px_0px_15px_5px_rgba(0,0,0,0.6)] hover:shadow-[0px_0px_20px_5px_rgba(255,215,0,0.8)] text-violet-900 bg-white text-2xl font-bold flex items-center justify-between gap-4 `}>
        <form action="" className="w-full flex" onSubmit={handleEditTodo}>
            <input type="text" className="min-h-[100%] outline-none w-full" value={editVal} onChange={(e)=>setEditVal(e.target.value)} />
            <div className="flex items-center gap-4 text-3xl">
                <FontAwesomeIcon icon={faCheck} type="submit" className='cursor-pointer text-black hover:text-blue-600' onClick={handleEditTodo}/>
                <FontAwesomeIcon icon={faXmark} className='cursor-pointer text-black hover:text-red-600' onClick={()=>setEditMode(false)}/>
            </div>
        </form>
    </li>
    :
    <li className={`p-6 shadow-[0px_0px_15px_5px_rgba(255,255,255,0.6)] hover:shadow-[0px_0px_20px_5px_rgba(255,215,0,0.8)] text-white text-2xl font-semibold flex items-center justify-between gap-4 transistion duration-300 ease-in-out`}>
        <div className="flex gap-4 items-center cursor-pointer ">
            {
                completed ?
                <FontAwesomeIcon icon={faCircleCheck} onClick={toggleComplete} className='text-green-500 hover:text-white font-bold'/>
                :
                <FontAwesomeIcon className="hover:text-green-500" onClick={toggleComplete} icon={faCircleNotch}/>
            }
            
            <p className={`${todo.completed ? 'line-through font-normal' : ''}`}>{editVal}</p>
        </div>
        <div className="flex gap-4 items-center">
            <FontAwesomeIcon icon={faTrash} onClick={handleDelete} className='cursor-pointer hover:text-red-600 transition duration-300 bounce-in'/>
            <FontAwesomeIcon icon={faPenToSquare} onClick={()=>setEditMode(!editMode)} className='cursor-pointer hover:text-green-500 transition duration-300 bounce-in'/>
        </div>
    </li>
  )
}

export default Todo