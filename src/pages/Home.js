import React from 'react'
import Banner from '../components/Home/Banner'
import Product from '../components/Home/Product'

const Home = () => {
  return (
    <div>
      <Banner />
      <div className='w-full -mt-10 xl:-mt-36 py-10'>
        <Product />
      </div>
    </div>
  )
}

export default Home