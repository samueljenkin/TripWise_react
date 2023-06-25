import { useState } from "react"
import DefaultLayout from "../Layout/DafaultLayout";

const SignUpPage = ({ updateLoggedInUser }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [authenticated, setAuthenticated] = useState(
        localStorage.getItem(localStorage.getItem('authenticated') || false)
    )
    
    const handleSubmit = e => {
        e.preventDefault()
        const data = {name: name, email: email, password: password}
        
        fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(user => updateLoggedInUser(user.name))
    }

    return (
        <DefaultLayout>
            <section className='sign-up'>
            <h2>Sign Up:</h2>
                <form action="" onSubmit={handleSubmit}>
                    <fieldset>
                        <label htmlFor="name">Name: </label>
                        <input 
                            type="text" 
                            name="name" 
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </fieldset>
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
                    <button>Sign Up</button>
                </form>
            </section>
        </DefaultLayout>
    )
}

export default SignUpPage