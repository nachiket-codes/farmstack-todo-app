import React, { useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'

const Todos = () => {
    const [showSidebar, setShowSidebar] = useState(false);
    const toggleShowSidebar = () => {
        setShowSidebar(!showSidebar)
    }
  return (
    <div className="bg-violet-900 w-full h-screen">
        <Header toggleShow={toggleShowSidebar}/>
        <Sidebar show={showSidebar} toggleShow={toggleShowSidebar} />
    </div>
  )
}

export default Todos