import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Main from './pages/Main'

import BackgroundImage from "./images/Background.jpeg";
function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{
      backgroundImage:`url(${BackgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      width: '200%',
      height: '100%',
      overflow: 'hidden'/* Ensure content inside the div doesn't overflow */
      }}>
     <Main/>

    </div>
  )
}

export default App
