import { useState } from "react"
import DefaultLayout from "../Layout/DafaultLayout"
// import CreateTripPage from "./CreateTripPage"
// import CreateBudgetPage from "./CreateBudgetPage"


const LoginPage = ({ updateLoggedInUser }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [authenticated, setAuthenticated] = useState(
        localStorage.getItem(localStorage.getItem('authenticated') || false)
    )

    const handleSubmit = e => {
        e.preventDefault()
        const data = {email: email, password: password}
      
        fetch('/api/sessions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    console.log(res.error)
                } else {
                    setAuthenticated(true)
                    localStorage.setItem('authenticated', true)
                    updateLoggedInUser(res.name)
                }
            })
    }

    return (
        <DefaultLayout>
            <section className='log-in'>
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
            </section>
        </DefaultLayout>
    )
}

export default LoginPage