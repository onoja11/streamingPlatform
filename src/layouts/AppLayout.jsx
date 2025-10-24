import React from 'react'
import Navbar from '../components/navbar'
import { Outlet } from 'react-router-dom'


const AppLayout = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <main className="pt-16">
        <Outlet />
      </main>
    </div>  )
}

export default AppLayout