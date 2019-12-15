import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './index.scss'
import Login from './login'
import Main from './main'
function Index() {
  const [isLogged, setIsLogged] = useState(true)

  useEffect(() => {
    let tokenAdmin = localStorage.getItem('tokenAdmin') ?  localStorage.getItem('tokenAdmin') : 'shit'
    axios({
      method: 'POST',
      url: `http://localhost:8080/reviewbook/current?token=${tokenAdmin}`
    }).then((res) => {
      if(res.data.success === false)
      {
        setIsLogged(false)
      }
      else
      setIsLogged(true)
    })
  }, [])



  return (
    <>
      <div className='content_admin'>
        <div className='wrapper_admin'>
          {
            !isLogged ? (
              <Login checkAccount={() => setIsLogged(true)} />
            ) : <Main setIsLogged={() => setIsLogged(false)}/>
          }

        </div>
      </div>
        
    </>
  )
}

export default Index