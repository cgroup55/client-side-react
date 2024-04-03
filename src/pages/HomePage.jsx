import React from 'react'
import NavBar from './NavBar'

export default function HomePage() {
    
  return (
  <>
    {(location.pathname != "/") ? <NavBar/> : null}
    <>
    HomePage
    </>
  </>
  )
}
