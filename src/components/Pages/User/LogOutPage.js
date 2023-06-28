import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const LogOutPage = ({ setLoggedInUser }) => {
  const navigate = useNavigate()

  useEffect(() => {
    fetch('/api/sessions', {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          // handle error
          console.log(res.error)
        } else {
          setLoggedInUser(null)
          navigate('/')
        }
      })
  }, [])
}

export default LogOutPage