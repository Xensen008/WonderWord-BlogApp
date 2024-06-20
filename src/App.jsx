import { useState, useEffect } from 'react'
import {useDispatch} from 'react-redux'
import './App.css'
import authService from './appwrite/auth'
import {login, logout} from './store/authSlice'
import {Footer,Header} from './components'
import {Outlet} from 'react-router-dom'


function App() {
  const [loading , setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      console.log(userData)
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    }).catch((error)=>{
      console.log(error)
    }).finally(()=>setLoading(false))
   },[])
  
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-900 text-white'>
      
      <div className='w-full block'>
        <Header/>
        <main>
            <Outlet/>
        </main>
        <Footer/>
      </div>
    </div>
  ): null
}

export default App
