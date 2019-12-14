import React, { useState, useEffect } from 'react'

import './index.scss'
import Login from './login'
import Main from './main'
function Index() {
  const [isLogged, setIsLogged] = useState(true)


  return (
    <>
      <div className='content_admin'>
        <div className='wrapper_admin'>
          {
            !isLogged ? (
              <Login checkAccount={() => setIsLogged(true)} />
            ) : <Main />
          }

        </div>
      </div>
        
    </>
  )
}

export default Index