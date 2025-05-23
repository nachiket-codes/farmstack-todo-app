import React, { useState, useEffect } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import Todo from './Todo';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, fetchTodos } from '../features/TodoSlice';
import { useNavigate } from 'react-router-dom';

const Todos = () => {
    const navigate = useNavigate();
    const [showSidebar, setShowSidebar] = useState(false);
    const [todoTxt, setTodoTxt] = useState('');
    const [entryErr, setEntryErr] = useState('');
    let {todos, loading, error} = useSelector((state) => state.todo)
    const toggleShowSidebar = () => {
        setShowSidebar(!showSidebar)
    }
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(fetchTodos());
    }, [dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (todoTxt.trim() !== '') {
            const todo = {
                "todo_text": todoTxt,
                "completed": false
            }
            await dispatch(addTodo(todo));
            dispatch(fetchTodos())
            setTodoTxt('');
        }
        else {
            setEntryErr('Please enter a todo item in the input field');
        }
    }

    const loadingImgUrl = 'https://www.gif-maniac.com/gifs/31/31241.gif'
  return (
    <div className="bg-violet-900 w-full h-screen">
        <Header toggleShow={toggleShowSidebar}/>
        <Sidebar show={showSidebar} toggleShow={toggleShowSidebar} />
        <div className="w-full h-screen flex justify-center mt-6">
            <div className="p-4 w-full sm:w-[70%]">
                <form action="" className="flex items-center" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Enter new Todo" value={todoTxt} onChange={(e)=>setTodoTxt(e.target.value)} className="border border-white text-white bg-white w-full h-14 p-2 outline-none focus:bg-violet-600 text-xl" />
                    <button className="border border-white bg-violet-700 h-14 p-2 outline-none text-white font-bold pr-6 pl-6 focus:bg-violet-600 text-xl hover:text-black hover:bg-violet-400 transition duration-300 ease-in-out">Add</button>
                    {entryErr && <div className="text-red-500 text-2xl text-center">{entryErr} </div>}
                </form>
                <div className="w-full mt-10">
                    {
                        loading ? <div className="w-full h-screen flex justify-start items-center flex-col gap-4">
                            <img src={loadingImgUrl} alt="loading" className="w-40"/>
                            <h1 className="text-white font-semibold">Loading...</h1>
                        </div>
                        :
                        error ? <div className="text-red-500 text-2xl text-center">{error} </div>
                        :
                        <ul className="flex flex-col gap-4">
                            {
                            todos.map((todo, idx)=>{
                                return (<Todo key={idx} todo={todo}/>)
                            })}
                        </ul>
                    }
                    
                    
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default Todos