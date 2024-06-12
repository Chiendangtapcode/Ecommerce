import React, { useEffect, useRef, useState } from 'react'
import { logo } from '../../assets/index'
import { allItems } from '../../constants';
import HeaderBottom from './HeaderBottom';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, signOut } from "firebase/auth";
import { userSignOut } from '../../redux/ecommerceSlice';

const Header = () => {
  const [showAll, setShowAll] = useState(false);
  const auth = getAuth();
  const ref = useRef()
  const dispatch = useDispatch()
  const products = useSelector((state) => state.ecommerce.products)
  const userInfo = useSelector((state)=> state.ecommerce.userInfo)
  useEffect(()=>{
    document.body.addEventListener("click",(e)=>{
      if(e.target.contains(ref.current)){
        showAll && setShowAll(false);
      }
    });
  },[ref,showAll])

  const handleLogOut = () =>{
    signOut(auth).then(() => {
      dispatch(userSignOut())
    }).catch((error) => {
      // An error happened.
    });
  }
  return (
    <div className='w-full sticky top-0 z-50'>
      <div className='w-full bg-amazon_blue text-white px-4 py-3 flex items-center gap-4'>
        <Link to='/'>
          <div className='headerHover'>
            <img className='w-24 mt-2' src={logo} alt='logo' />
          </div>
        </Link>
        <div className='headerHover items-center gap-1 hidden mdl:inline-flex'>
          <i className="fa-solid fa-location-dot"></i>
          <p className='text-sm text-lightText font-light flex flex-col'>
            Deliver to
            <span className='pLight'>
              Vietnam
            </span>
          </p>
        </div>

        <div className='h-10 rounded-md hidden lgl:flex flex-grow relative'>
          <span onClick={() => setShowAll(!showAll)} className='w-14 h-full bg-gray-200 hover:bg-gray-300 border-2 cursor-poiter duration-300 text-sm text-amazon_blue font-titleFont flex items-center justify-center rounded-tl-md rounded-bl-md'>
            All
            <i className="fa-solid fa-caret-down"></i>
          </span>
          {showAll && (

            <div>
              <ul className='absolute w-56 h-80 top-10 left-0 overflow-y-scroll overflow-x-hidden bg-white border-[1px] border-amazon_blue text-black p-2 flex-col gap-1 z-50'>
                {
                  allItems.map((item) => (
                    <li key={item._id} className='text-sm tracking-wide font-titleFont border-b-[1px] border-b-transparent hover:border-b-amazon_blue cursor-pointer duration-200'>{item.title}</li>
                  ))
                }
              </ul>
            </div>
          )}
          <input className='h-full text-base text-amazon_blue flex-grow outline-none border-none px-2' type='text' />
          <span className='w-12 h-full flex items-center justify-center bg-amazon_yellow hover:bg-[#f3a847] duration-300 text-amazon_blue cursor-pointer rounded-tr-md rounded-br-md'>
            <i className="fa-solid fa-magnifying-glass"></i>
          </span>
        </div>
        <div className='headerHover flex items-center gap-1'>
          <span className='w-12 h-full bg-gray-300 cursor-poiter duration-200 text-amazon_blue flex items-center justify-center'>
            <img src='https://cdn.countryflags.com/thumbs/vietnam/flag-400.png' />
          </span>
          <p>
            VN{" "}
            <i className="fa-solid fa-caret-down"></i>
          </p>
        </div>
        <Link to="/signin">
          <div className='flex flex-col items-start justify-center headerHover'>
            {
              userInfo?(

                <p className='text-sm text-gray-100 font-medium'>{userInfo.userName}</p>
              ):(
                <p className='text-sm mdl:text-xs text-white mdl:text-lightText font-light'>Hello, sign in</p>
              )
            }

            <p className='pLight hidden mdl:inline-flex'>Account & Lists{" "}
              <span>
                <i className="fa-solid fa-caret-down"></i>
              </span>
            </p>
          </div>
        </Link>
        <div className='hidden lgl:flex flex-col items-start justify-center headerHover'>
          <p className='text-xs text-lightText font-light'>Returns</p>
          <p className='pLight'>& Oeders</p>
        </div>
        <Link to='/cart'>
          <div className='flex items-start justify-center headerHover relative'>
            <i className="fa-solid fa-cart-shopping"></i>
            <p>Cart <span className='absolute text-xs -top-2 left-6 font-semibold p-1 h-4 bg-[#f3a847] text-amazon_blue rounded-full flex justify-center items-center'>{products.length > 0 ? products.length : 0}</span></p>
          </div>
        </Link>
        {
          userInfo &&(
            <div onClick={handleLogOut} className='flex flex-col justify-center headerHover relative'>
              <i className="fa-solid fa-right-from-bracket"></i>
              <p className='hidden mdl:inline-flex text-xs font-semibold text-whiteText'>Log out</p>
            </div>
          )
        }
      </div>
      <HeaderBottom />
    </div>
  )
}

export default Header