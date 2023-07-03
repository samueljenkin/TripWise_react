import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const LogOutPage = ({ loggedInUser, setLoggedInUser }) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (loggedInUser) {
      fetch('/api/sessions', {method: 'DELETE'})
      setLoggedInUser(null)
    }
    navigate('/')
  }, [])
}

export default LogOutPage