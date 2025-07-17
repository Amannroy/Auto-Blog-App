import React from 'react'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'

const Layout = () => {

    const navigate = useNavigate();

    const logout = () => {
        navigate('/');
    }
  return (
    <>
      <div className='flex items-center justify-between py-2 h-[85px] px-4 sm:px-6 border-b border-gray-200'>
        <div className="h-full flex items-center">
        <img src={assets.logo} alt="" className='w-32 sm:w-20 h-full object-contain cursor-pointer' 
        onClick={() => navigate('/')}/>
        </div>
        <button onClick={logout} className='text-sm px-8 py-2 bg-primary text-white rounded-full cursor-pointer'>Logout</button>
      </div>
    </>
  )
}

export default Layout