import React  from "react";
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Album from '../components/Home/Gallery'

const Home = () => {
  return (
    <main className='relative bg-gray-100 shadow-md 3xl:flex 3xl:items-center 3xl:flex-col 3xl:justify-center'>
       <div className='max-w-[2500px] w-full 3xl:px-4 mx-auto'>
          <Navbar/>
          <Header/>
          <Album/>
          <Footer/>
        </div>
    </main>
  )
}

export default Home