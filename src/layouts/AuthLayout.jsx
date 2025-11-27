import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            <div className="bg-black p-8 border-b border-[#292929] flex justify-center">
                 <div className="text-3xl font-bold flex items-center gap-2">
                    <div className="w-8 h-8 bg-white rounded-full"></div>
                    PurpleWave
                 </div>
            </div>
            <div className="flex-1 flex items-center justify-center p-4">
                <Outlet />
            </div>
        </div>
    )
}

export default AuthLayout   