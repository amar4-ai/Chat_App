import React, { useContext, useState } from 'react'
import assets from '../assets/assets'
import { AuthContext } from '../../context/AuthContext'

const LoginPage = () => {
  const [currentState, setCurrentState] = useState("Sign up")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [bio, setBio] = useState("")
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);
  const {login} = useContext(AuthContext);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (currentState === 'Sign up' && !isDataSubmitted) {
      setIsDataSubmitted(true)
      return;
    }

    login(currentState=== "Sign up" ? 'signup' : 'login', {fullName,email,password,bio})
  }

  return (
    <div className='min-h-screen bg-cover bg-center flex items-center
    justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>

      {/* left */}

      <img src={assets.logo_big} alt="" className='w-[min(30vw,250px)]' />
      {/* right */}

      <form onSubmit={onSubmitHandler} className='border border-gray-700 bg-gray-900/80 backdrop-blur-md text-white p-6 flex 
      flex-col gap-6 rounded-lg shadow-xl'>

        <h2 className='font-medium text-2xl flex justify-between items-center'>
          {currentState}
          {isDataSubmitted && (
            <img
              onClick={() => setIsDataSubmitted(false)}
              src={assets.arrow_icon}
              alt="Back"
              className='w-5 cursor-pointer'
            />
          )}

        </h2>

        {currentState === "Sign up" && !isDataSubmitted && (
          <input
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
            type="text"
            placeholder='Full Name'
            required
            className='p-3 bg-gray-800 text-white border border-gray-600 rounded-md outline-none focus:outline-none focus:ring-2 focus:ring-purple-500'
          />
        )}

        {!isDataSubmitted && (
          <>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder='Email Address'
              required
              className='p-3 bg-gray-800 text-white border border-gray-600 rounded-md outline-none focus:outline-none focus:ring-2 focus:ring-indigo-500'
            />

            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder='Password'
              required
              className='p-3 bg-gray-800 text-white border border-gray-600 rounded-md outline-none focus:outline-none focus:ring-2 focus:ring-indigo-500'
            />
          </>
        )}

        {currentState === "Sign up" && isDataSubmitted && (
          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            rows={4}
            placeholder='provide a short bio....'
            required
            className='p-3 bg-gray-800 text-white border border-gray-600 rounded-md outline-none focus:outline-none focus:ring-2 focus:ring-indigo-500'
          />
        )}

        <button
          type='submit'
          className='py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer'
        >
          {currentState === "Sign up" ? "Create Account" : "Login Now"}
        </button>

        <div className='flex items-center gap-2 text-sm text-gray-500'>
          <input type="checkbox" />
          <p>Agree to the terms of use & privacy policy.</p>
        </div>

        <div className='flex flex-col gap-2'>
          {currentState === "Sign up" ? (
            <p className='text-sm text-gray-600'>
              Already have an account ? <span onClick={() => { setCurrentState("Login"); setIsDataSubmitted(false) }} className='font-medium text-violet-500 cursor-pointer'>Login here</span>
            </p>
          ) : (
            <p className='text-sm text-gray-600'>
              Create an account <span onClick={() => setCurrentState("Sign up")} className='font-medium text-violet-500 cursor-pointer'>Click here</span>
            </p>
          )}

        </div>

      </form>
    </div>
  )
}

export default LoginPage