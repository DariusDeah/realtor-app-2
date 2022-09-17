import type { NextPage } from 'next'
import Header from '../components/Header'
import HomeDisplays from '../components/HomeDisplays'
import Map from '../components/Map'


const Home: NextPage = () => {
  return (
   <div className='flex'>
    <Header/>
    <HomeDisplays/>
    <Map/>
   </div>
  )
}

export default Home
