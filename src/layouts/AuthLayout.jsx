import React from 'react'
import { Outlet } from 'react-router-dom'


const AuthLayout = () => {
    return (

        <div className="min-h-screen bg-purple-100 font-sans antialiased">
            <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 px-4">
                <div>
                    <div className="lg:w-[400px] w-full sm:max-w-md mt-6 px-6 py-4 bg-white  shadow-lg  overflow-hidden sm:rounded-lg">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default AuthLayout