import React from 'react'
import NavBar from '../components/NavBar'
import Map from '../components/Map'

export default function HomePage() {
  return (
    <>
      {(location.pathname != "/") ? <NavBar /> : null}

      <div className='container mt-5'>
        <Map mode={'map'} />
      </div>

    </>
  )
}
