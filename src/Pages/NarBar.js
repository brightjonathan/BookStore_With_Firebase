import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth' // mainly for signing out a user
import { auth } from '../Firebase-config'

const NarBar = ({ isAuth, setisAuth }) => {

    const navigate = useNavigate();

        //signOut btn
        const signUserOut = () =>{
            signOut(auth).then(()=>{
                localStorage.clear()
                setisAuth(false)
                navigate('/login')
            })
        }


  return (
    <nav>
    <Link to='/'> Home </Link>
    {!isAuth ? (<Link to='/login'> Login </Link>) : (
      <>
      <Link to='/create'> AddBook </Link>
      <button onClick={signUserOut}> Sign out </button> 
      </>
    )}
    
    
   </nav>
  )
}

export default NarBar
