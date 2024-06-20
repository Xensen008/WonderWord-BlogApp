import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'
import {useNavigate} from 'react-router-dom'

function LogoutBtn() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
            navigate('/') // navigate to home page
        })
    }
  return (
    <button
    className='inline-block px-6 py-3 text-lg duration-200 hover:bg-blue-500 rounded-full'
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn