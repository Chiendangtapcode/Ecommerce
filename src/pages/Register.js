import React, { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { dartLogo } from '../assets/index'
import { Link, useNavigate } from 'react-router-dom'
import {RotatingLines} from 'react-loader-spinner'


const Register = () => {
    const navigate = useNavigate()
    const auth = getAuth();
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cfPassword, setcfPassword] = useState("")

    const [errUserName, setErrUserName] = useState("")
    const [errEmail, setErrEmail] = useState("")
    const [errPassword, setErrPassword] = useState("")
    const [errcfPassword, setErrcfPassword] = useState("")
    const [firebaseErr, setFirebaseErr] = useState("")

    const [loading, setLoading] = useState(false)
    const [successMsg, setSuccessMsg] = useState("")

    const handleName = (e) => {
        setUserName(e.target.value)
        setErrUserName("")
    }

    const handleEmail = (e) => {
        setEmail(e.target.value)
        setErrEmail("")
        setFirebaseErr("")
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
        setErrPassword("")
    }

    const handlecfPassword = (e) => {
        setcfPassword(e.target.value)
        setErrcfPassword("")
    }



    const handleSubmit = (e) => {
        e.preventDefault()
        var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!userName) {
            setErrUserName("Enter your Name")
        }

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

        if (!cfPassword) {
            setErrPassword("Confim your password")
        } else {
            if (cfPassword !== password) {
                setErrcfPassword("Type your password again")
            }
        }

        if (userName && email && regex.test(email) && password && cfPassword) {
            setLoading(true)
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    updateProfile(auth.currentUser, {
                        displayName: userName
                    })
                    const user = userCredential.user;
                    setLoading(false)
                    setSuccessMsg("Account Create Successfully!")
                    setTimeout(() => {
                        navigate("/signin")
                    }, 3000)
                })
                .catch((error) => {
                    const errorCode = error.code
                    //kiem tra su ton tai cua email
                    if (errorCode.includes("auth/email-already-in-use")) {
                        setFirebaseErr("Email Alrealy in use, Try another one")
                    }

                })
            setUserName("")
            setPassword("")
            setEmail("")
            setcfPassword("")
            setFirebaseErr("")
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
                        <h2 className='font-titleFont text-3xl font-medium mb-4'>Create account</h2>
                        <div className='flex flex-col gap-3'>
                            <div className='flex flex-col gap-2'>
                                <p className='text-sm font-medium'>Your name</p>
                                <input onInput={handleName}
                                    value={userName}
                                    className='w-full py-1 border border-zinc-400 px-22 text-base rounded-sm outline-none focus-within:border-[#00a2e7] focus-within:shadow-ecommerceInput duration-100 p-2' type='text' placeholder='Frist and last name' />
                                {
                                    errUserName && (
                                        <p className='text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5'>
                                            <span className='italic font-titleFont font-extrabold text-base'>!</span> {errUserName}
                                        </p>
                                    )
                                }
                            </div>
                            <div className='flex flex-col gap-2'>
                                <p className='text-sm font-medium'>Mobile number or email</p>
                                <input onChange={handleEmail}
                                    value={email}
                                    className='w-full py-1 border border-zinc-400 px-22 text-base rounded-sm outline-none focus-within:border-[#00a2e7] focus-within:shadow-ecommerceInput duration-100 p-2' type='email' />
                                {
                                    errEmail && (
                                        <p className='text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5'>
                                            <span className='italic font-titleFont font-extrabold text-base'>!</span> {errEmail}
                                        </p>
                                    )
                                }
                                {
                                    firebaseErr && (
                                        <p className='text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5'>
                                            <span className='italic font-titleFont font-extrabold text-base'>!</span> {firebaseErr}
                                        </p>
                                    )
                                }
                            </div>
                            <div className='flex flex-col gap-2'>
                                <p className='text-sm font-medium'>Password</p>
                                <input onChange={handlePassword}
                                    value={password}
                                    className='w-full py-1 border border-zinc-400 px-22 text-base rounded-sm outline-none focus-within:border-[#00a2e7] focus-within:shadow-ecommerceInput duration-100 p-2' type='password' placeholder='At least 6 charaters' />
                                {
                                    errPassword && (
                                        <p className='text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5'>
                                            <span className='italic font-titleFont font-extrabold text-base'>!</span> {errPassword}
                                        </p>
                                    )
                                }
                            </div>
                            <div className='flex flex-col gap-2 '>
                                <p className='text-sm font-medium'>Re-enter password</p>
                                <input onChange={handlecfPassword}
                                    value={cfPassword}
                                    className='w-full py-1 border border-zinc-400 px-22 text-base rounded-sm outline-none focus-within:border-[#00a2e7] focus-within:shadow-ecommerceInput duration-100 p-2' type='password' />
                                {
                                    errcfPassword && (
                                        <p className='text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5'>
                                            <span className='italic font-titleFont font-extrabold text-base'>!</span> {errcfPassword}
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
                            <p className='text-xs text-black leading-4 mt-4'>By Create an account, you agree to Amazon's{" "}
                                <a className='text-blue-600 cursor-pointer hover:text-orange-700 hover:underline underline-offset-1 ' href='#'>Conditions of Use{" "}</a>and {" "}
                                <a className='text-blue-600 cursor-pointer hover:text-orange-700 hover:underline underline-offset-1' href='#'>Privacy Notice.</a>
                            </p>
                            <span className='w-full h-[1px] bg-zinc-300 inline-flex'></span>
                            <div className='flex-col gap-2 inline-block '>
                                <p className='text-xs text-black leading-4'>Buying for work?</p>
                                <a className='text-xs text-blue-600 hover:text-orange-700 hover:underline underline-offset-1' href='#'>Create a free business account</a>
                            </div>
                            <span className='w-full h-[1px] bg-zinc-300 inline-flex'></span>
                            <p className='text-xs text-black'>
                                Already have an account?
                                <Link to='/signin'>
                                    <span className='text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100'>
                                        Sign in{" "}
                                        <i className="fa-solid fa-caret-right"></i>
                                    </span>
                                </Link>
                            </p>
                        </div>
                    </div>
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

export default Register