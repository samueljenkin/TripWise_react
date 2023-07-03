import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import DefaultLayout from "../../layout/DefaultLayout"

const LoginPage = ({ loggedInUser, setLoggedInUser }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (loggedInUser) return navigate('/')
  }, [])

  const handleSubmit = e => {
    e.preventDefault()
    const data = { email: email, password: password }

    fetch('/api/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          setError(res.error)
        } else {
          setLoggedInUser(res.username)
          navigate('/')
        }
      })
  }

  return (
    <DefaultLayout>
      <section className='log-in'>
        {error &&
          <p>{error}</p>
        }
        <h2>Login:</h2>
        <form action="" onSubmit={handleSubmit}>
          <fieldset>
            <label htmlFor="email">Email: </label>
            <input
              type="text"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </fieldset>
          <button>Log in</button>
        </form>
        <p>New here? Sign up <a href="/sign-up">here</a></p>
      </section>
    </DefaultLayout>
  )
}

export default LoginPage