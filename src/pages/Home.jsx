import React from 'react'
import TreeComponent from '../components/TreeComponent'
import { Link } from 'react-router-dom'
const Home = () => {
  return (
    <div className='bg-white p-4 flex flex-col justify-center items-center rounded-lg shadow-md'>
      <p className='font-bold text-3xl text-green-700'>Wind Simulator</p>
      <TreeComponent/>
      <Link to='/init'>
      <p style={{ border:'solid 2px green' }} className=' cursor-pointer font-bold px-4 py-2 rounded-lg shadow-emerald-400 hover:bg-green-700 hover:text-white text-green-700'>Start</p>
      </Link>
    </div>
  )
}

export default Home