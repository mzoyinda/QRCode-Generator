import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPlaceholders } from '../reducer/slice/placeholder.slice'

const Home = () => {
    const { album } = useSelector(state => state.placeholders)
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchPlaceholders())
    }, [])
    
  return (
    <main>
        <section>
          <h1>Welcome Home</h1>
          {album.slice(0,10).map((item)=>{
            return(
              <img src={item.thumbnailUrl} alt="item" />
            )
          })}
        </section>
    </main>
  )
}

export default Home