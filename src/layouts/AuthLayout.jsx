import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
   <div class="font-sans antialiased min-h-screen bg-cover bg-center {{ Request::is('users') ? 'md:overflow-hidden' : '' }} "
    style="background-image:url('{{ asset('images/whiteBg.jpg') }}');">
        <div class="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 ">
            <div>
                <a href="/">
                    <x-application-logo class="w-24 h-24 fill-current text-gray-500" />
                </a>
            </div>

            <div class="w-full sm:max-w-md mt-6 px-6 py-4 bg-white  shadow-lg border-3 overflow-hidden sm:rounded-lg">
                <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default AuthLayout