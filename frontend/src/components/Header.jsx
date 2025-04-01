import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect , useState } from 'react'
import { fetchUser } from '../features/userSlice'
import { connect, useDispatch, useSelector } from 'react-redux'

const Header = ({toggleShow}) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchUser())
    }, [dispatch])

    const {username, loading} = useSelector((state) => {
        return state.user
    })
    
  return (
    
    <div className="flex items-center justify-between p-6 text-white text-4xl shadow-[0px_10px_10px_-5px_rgba(255,255,255,0.5)]">
        <div></div>
        {!loading && <h1 className="font-bold text-center">{username}'s Todo List</h1>}
        <FontAwesomeIcon icon={faBars} className='cursor-pointer hover:scale-125 transition duration-300 ease-out' onClick={toggleShow}/>
    </div>
  )
}

export default Header