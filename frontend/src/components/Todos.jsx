import React, { useState, useEffect } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import Todo from './Todo';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos } from '../features/TodoSlice';

const Todos = () => {
    const [showSidebar, setShowSidebar] = useState(false);
    const [todoTxt, setTodoTxt] = useState('');
    const toggleShowSidebar = () => {
        setShowSidebar(!showSidebar)
    }
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(fetchTodos());
    }, [dispatch])

    const loadingImgUrl = 'https://www.gif-maniac.com/gifs/31/31241.gif'

    const {todos, loading, error} = useSelector((state) => state.todo)
  return (
    <div className="bg-violet-900 w-full h-screen">
        <Header toggleShow={toggleShowSidebar}/>
        <Sidebar show={showSidebar} toggleShow={toggleShowSidebar} />
        <div className="w-full h-screen flex justify-center mt-6">
            <div className="p-4 w-full sm:w-[70%]">
                <form action="" className="flex items-center">
                    <input type="text" placeholder="Enter new Todo" value={todoTxt} onChange={(e)=>setTodoTxt(e.target.value)} className="border border-white text-black bg-white w-full h-14 p-2 outline-none focus:bg-violet-600 text-xl" />
                    <button className="border border-white bg-violet-700 h-14 p-2 outline-none text-white font-bold pr-6 pl-6 focus:bg-violet-600 text-xl hover:text-black hover:bg-violet-400 transition duration-300 ease-in-out">Add</button>
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
                        <ul>
                            {
                            todos.map((todo, idx)=>{
                                return (<Todo key={idx} todoTxt={todo.todo_text} completed={todo.completed}/>)
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