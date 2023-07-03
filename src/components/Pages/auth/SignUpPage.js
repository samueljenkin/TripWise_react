import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import DefaultLayout from "../../layout/DefaultLayout"

const SignUpPage = ({ loggedInUser, setLoggedInUser }) => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordStrength, setPasswordStrength] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (loggedInUser) return navigate('/')
  }, [])

  const checkPassword = () => {
    const passwordData = {}

    passwordData.hasLowerCase = /[a-z]/g.test(password)
    passwordData.hasUpperCase = /[A-Z]/g.test(password)
    passwordData.hasNumber = /\d/g.test(password)
    passwordData.hasNonAlphaNumeric = /[^a-zA-Z0-9]/g.test(password)
    passwordData.isOver8Char = /.{8,}/g.test(password)
    passwordData.isOver12Char = /.{12,}/g.test(password)
    passwordData.score = Object.values(passwordData)
      .reduce((score, value) => value ? (score++, score) : score, 0)

    switch (true) {
      case (passwordData.score < 3):
        setPasswordStrength('Weak')
        break
      case (passwordData.score < 5):
        setPasswordStrength('Moderate')
        break
      case (passwordData.score < 6):
        setPasswordStrength('Strong')
        break
      default:
        setPasswordStrength('Very Strong')
    }
  }

  useEffect(checkPassword, [password])

  const handleSubmit = e => {
    e.preventDefault()
    const data = { username: username, email: email, password: password }

    fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(username => {
        setLoggedInUser(username)
        navigate('/')
      })
  }

  return (
    <DefaultLayout>
      <section className='sign-up'>
        <h2>Sign Up:</h2>
        <form action="" onSubmit={handleSubmit}>
          <fieldset>
            <label htmlFor="">Username: </label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </fieldset>

          <fieldset>
            <label htmlFor="">Email: </label>
            <input
              type="text"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </fieldset>

          <fieldset>
            <label htmlFor="">Password: </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </fieldset>
          {password &&
            <p>Password Strength: {passwordStrength}</p>
          }
          <button disabled={!username || !email || !password}>Sign Up</button>
        </form>
        <p>Already have an account? Log in <a href="/login">here</a></p>
      </section>
    </DefaultLayout>
  )
}

export default SignUpPage