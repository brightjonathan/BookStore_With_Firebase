import React from 'react'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { provider, auth } from '../Firebase-config'

const Login = ({ setisAuth }) => {

    const navigate = useNavigate();
  
    //SignUp btn
    const SignInWithGoogle = () =>{
      signInWithPopup(auth, provider).then((result)=>{
       localStorage.setItem('isAuth', true); //storing in localstorage
       setisAuth(true); //setting it to true when signIn
       navigate('/')
      })
   }


  return (
    <div className='loginPage'>
    <p> Sign in with Google to continue </p>
    <button className='login-with-google-btn'  onClick={ SignInWithGoogle }> Sign in with Google </button>
  </div>
  )
}

export default Login
