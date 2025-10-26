import React from 'react'
import HeroSection from '../components/HeroSection'
import Toprated from '../components/Toprated'
import Upcoming from '../components/Upcoming'
import Popular from '../components/Popular'

const Home = () => {
  return (
    <div className='bg-gradient-to-br from-purple-950 to-black ' >
      <HeroSection/>
      <Toprated/>
      <Upcoming/>
      <Popular/>
      
    </div>
  )
}

export default Home