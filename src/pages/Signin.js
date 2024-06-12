import React, { useState } from 'react'
import { dartLogo } from '../assets/index'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { RotatingLines } from 'react-loader-spinner'
import {useDispatch} from 'react-redux'
import { setUserInfo } from '../redux/ecommerceSlice';


const Signin = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [errEmail, setErrEmail] = useState("")
  const [errPassword, setErrPassword] = useState("")

  const [loading, setLoading] = useState(false)
  const [successMsg, setSuccessMsg] = useState("")

  const [userEmailErr, setUserEmailErr] = useState("")
  const [userPassErr, setUserPassErr] = useState("")

  const handleEmail = (e) => {
    setEmail(e.target.value)
    setErrEmail("")
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
    setErrPassword("")
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email) {
      setErrEmail("Enter your email or mobile phone number")
    } else if (!regex.test(email)) {
      setErrEmail("Wrong or Invalid email address or mobile phone number. Please correct and try again.")
    }

    if (!password) {
      setErrPassword("Enter your Password")
    } else if (password.length < 6) {
      setErrPassword("Minimum 6 characters required")
    }

    if (email && regex.test(email) && password) {
      setLoading(true)
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          dispatch(setUserInfo({
            _id:user.uid,
            userName:user.displayName,
            email:user.email,
          }))
          setLoading(false)
          setSuccessMsg("Logged in Successfully! Welcome you back!")
          setTimeout(() => {
            navigate("/")
          }, 1000)
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode.includes("auth/invalid-email")) {
            setUserEmailErr("Invalis Email")
          }
          if (errorCode.includes("auth/wrong-password")) {
            setUserPassErr("Wrong password! try again")
          }
        });
      setEmail("")
      setPassword("")
    }

  }
  return (
    <div className='w-full'>
      <div className='w-full bg-gray-100 pb-10'>
        <form className='w-[350px] mx-auto flex flex-col items-center'>
          <Link to='/'>
            <img className='w-32 mt-2' src={dartLogo} alt='logo' />
          </Link>
          <div className='w-full border border-zinc-200 p-6 mt-5'>
            <h2 className='font-titleFont text-3xl font-medium mb-4'>Sign In</h2>
            <div className='flex flex-col gap-3'>
              <div className='flex flex-col gap-2'>
                <p className='text-sm font-medium'>Email or mobile phone number</p>
                <input onChange={handleEmail} value={email} className='w-full py-1 border border-zinc-400 px-22 text-base rounded-sm outline-none focus-within:border-[#00a2e7] focus-within:shadow-ecommerceInput duration-100 p-2' type='email' />
                {
                  errEmail && (
                    <p className='text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5'>
                      <span className='italic font-titleFont font-extrabold text-base'>!</span> {errEmail}
                    </p>
                  )
                }
                {
                  userEmailErr && (
                    <p className='text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5'>
                      <span className='italic font-titleFont font-extrabold text-base'>!</span> {userEmailErr}
                    </p>
                  )
                }
              </div>
              <div className='flex flex-col gap-2'>
                <p className='text-sm font-medium'>Password</p>
                <input onChange={handlePassword} value={password} className='w-full py-1 border border-zinc-400 px-22 text-base rounded-sm outline-none focus-within:border-[#00a2e7] focus-within:shadow-ecommerceInput duration-100 p-2' type='password' />
                {
                  errPassword && (
                    <p className='text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5'>
                      <span className='italic font-titleFont font-extrabold text-base'>!</span> {errPassword}
                    </p>
                  )
                }
                {
                  userPassErr && (
                    <p className='text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5'>
                      <span className='italic font-titleFont font-extrabold text-base'>!</span> {userPassErr}
                    </p>
                  )
                }
              </div>
              <button onClick={handleSubmit} className='w-full py-1.5 text-sm font-normal rounded-sm bg-gradient-to-t from-[#f7dfa5] to-[#f0c14b] hover:bg-gradient-to-b border border-zinc-400 active:border-yellow-800 active:shadow-amazonInput'>Continue</button>
              {
                loading && (
                  <div className='flex justify-center'>
                    <RotatingLines
                      visible={true}
                      width="50"
                      color="#febd69"
                      strokeWidth="5"
                      animationDuration="0.75"
                      ariaLabel="rotating-lines-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  </div>
                )
              }
              {
                successMsg && (
                  <div>
                    <p className='text-base font-titleFont font-semibold text-green-500 border-[1px] border-green-500 px-2 text-center'>{successMsg}</p>
                  </div>
                )
              }

            </div>
            <p className='text-xs text-black leading-4 mt-4'>By Continuing, you agree to Amazon's{" "}
              <a className='text-blue-600 cursor-pointer' href='#'>Conditions of Use{" "}</a>and {" "}
              <a className='text-blue-600 cursor-pointer' href='#'>Privacy Notice.</a>
            </p>
            <p className='text-xs text-gray-600 mt-4 cursor-pointer group'>
              <i className="fa-solid fa-caret-right"></i>
              <a className='text-blue-600 group-hover:text-orange-700 group-hover:underline underline-offset-1' href='#'> Need help?</a>
            </p>
          </div>
          <p className='w-full text-xs text-gray-600 mt-4 flex items-center'>
            <span className='w-1/3 h-[1px] bg-zinc-400 inline-flex'></span>
            <span className='w-1/3 text-center'>New to Ecommerce?</span>
            <span className='w-1/3 h-[1px] bg-zinc-400 inline-flex'></span>
          </p>
          <Link className='w-full' to='/register'>
            <button className='w-full py-1.5 mt-4 text-sm font-normal rounded-sm bg-gradient-to-t from-slate-200 to-slate-100 hover:bg-gradient-to-b border border-zinc-400 active:border-yellow-800 active:shadow-amazonInput'>Create your Account</button>
          </Link>
        </form>
      </div>
      <div className='w-full bg-gradient-to-t from-white via-white to-zinc-200 flex flex-col gap-4 justify-center items-center py-10'>
        <div className='flex items-center gap-6'>
          <p className='text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100'>Conditions of Use</p>
          <p className='text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100'>Privacy Noitice</p>
          <p className='text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100'>Help</p>
        </div>
        <p className='text-xs text-gray-600'>
          © 1996-2023, Chiennguyen.com, Inc. or its affiliates</p>
      </div>
    </div>
  )
}

export default Signin