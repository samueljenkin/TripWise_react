import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const LogOutPage = ({ loggedInUser, setLoggedInUser }) => {
  const navigate = useNavigate()

  useEffect(() => {
		if (loggedInUser) return navigate('/')
	}, [])

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